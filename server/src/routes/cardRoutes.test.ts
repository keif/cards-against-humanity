import { describe, it, expect, beforeEach, vi } from 'vitest';
import express from 'express';
import cardRoutes from './cardRoutes';
import { createTestApp, createTestAgent } from '@/test/testUtils';
import type { CardService } from '@/services/cardService';

// Mock the Card model
const mockCardService: Partial<CardService> = {
  submitUserCard: vi.fn(),
  getPendingUserCards: vi.fn(),
  approveUserCard: vi.fn(),
  rejectUserCard: vi.fn(),
  getApprovedUserCards: vi.fn(),
  getCardStats: vi.fn(),
  getAvailableExpansions: vi.fn(),
};

vi.mock('@/models/Card', () => ({
  getCardService: () => mockCardService,
}));

describe('Card Routes', () => {
  let app: express.Express;
  let agent: ReturnType<typeof createTestAgent>;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Create test app
    app = createTestApp(cardRoutes);
    agent = createTestAgent(app);
  });

  describe('POST /api/cards/submit', () => {
    it('should submit a valid answer card', async () => {
      const mockCardId = 1001;
      (mockCardService.submitUserCard as any).mockResolvedValue(mockCardId);

      const res = await agent.post('/submit', {
        text: 'Test answer card',
        cardType: 'A',
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        success: true,
        cardId: mockCardId,
        status: 'pending',
        message: 'Card submitted successfully and is pending moderation',
      });

      expect(mockCardService.submitUserCard).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Test answer card',
          cardType: 'A',
          numAnswers: 0,
          expansion: 'user-generated',
        })
      );
    });

    it('should submit a valid question card', async () => {
      const mockCardId = 1002;
      (mockCardService.submitUserCard as any).mockResolvedValue(mockCardId);

      const res = await agent.post('/submit', {
        text: 'Test question card?',
        cardType: 'Q',
        numAnswers: 2,
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(mockCardService.submitUserCard).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Test question card?',
          cardType: 'Q',
          numAnswers: 2,
        })
      );
    });

    it('should reject empty text', async () => {
      const res = await agent.post('/submit', {
        text: '',
        cardType: 'A',
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Card text is required');
      expect(mockCardService.submitUserCard).not.toHaveBeenCalled();
    });

    it('should reject invalid card type', async () => {
      const res = await agent.post('/submit', {
        text: 'Test card',
        cardType: 'X',
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Card type must be "A" or "Q"');
    });

    it('should reject text over 500 characters', async () => {
      const longText = 'a'.repeat(501);
      const res = await agent.post('/submit', {
        text: longText,
        cardType: 'A',
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Card text must be 500 characters or less');
    });

    it('should trim whitespace from card text', async () => {
      const mockCardId = 1003;
      (mockCardService.submitUserCard as any).mockResolvedValue(mockCardId);

      await agent.post('/submit', {
        text: '  Test card with spaces  ',
        cardType: 'A',
      });

      expect(mockCardService.submitUserCard).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Test card with spaces',
        })
      );
    });
  });

  describe('GET /api/cards/auth/role', () => {
    it('should return default user role', async () => {
      const res = await agent.get('/auth/role');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
        role: 'user',
      });
      expect(res.body.sessionId).toBeDefined();
    });

    it('should maintain role across requests', async () => {
      // Set role to moderator
      await agent.post('/auth/promote', {
        adminKey: 'test-admin-key',
      });

      // Check role
      const res = await agent.get('/auth/role');

      expect(res.status).toBe(200);
      expect(res.body.role).toBe('moderator');
    });
  });

  describe('POST /api/cards/auth/promote', () => {
    it('should promote user with valid admin key', async () => {
      const res = await agent.post('/auth/promote', {
        adminKey: 'test-admin-key',
      });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
        message: 'Successfully promoted to moderator',
        role: 'moderator',
      });
    });

    it('should reject invalid admin key', async () => {
      const res = await agent.post('/auth/promote', {
        adminKey: 'wrong-key',
      });

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Invalid admin key');
    });
  });

  describe('GET /api/cards/pending', () => {
    const mockPendingCards = [
      { id: 1, text: 'Pending card 1', cardType: 'A' },
      { id: 2, text: 'Pending card 2', cardType: 'A' },
    ];

    it('should deny access without moderator role', async () => {
      const res = await agent.get('/pending');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden');
    });

    it('should return pending cards for moderator', async () => {
      (mockCardService.getPendingUserCards as any).mockResolvedValue(mockPendingCards);

      // Promote to moderator first
      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });

      const res = await agent.get('/pending');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        count: 2,
        cards: mockPendingCards,
      });
    });

    it('should filter by card type', async () => {
      (mockCardService.getPendingUserCards as any).mockResolvedValue(mockPendingCards);

      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.get('/pending?type=A');

      expect(res.status).toBe(200);
      expect(mockCardService.getPendingUserCards).toHaveBeenCalledWith('A', 50);
    });

    it('should respect custom limit', async () => {
      (mockCardService.getPendingUserCards as any).mockResolvedValue([]);

      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      await agent.get('/pending?limit=10');

      expect(mockCardService.getPendingUserCards).toHaveBeenCalledWith(undefined, 10);
    });

    it('should reject invalid type parameter', async () => {
      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.get('/pending?type=X');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Type must be "A" or "Q"');
    });

    it('should reject limit out of range', async () => {
      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.get('/pending?limit=1000');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Limit must be between 1 and 500');
    });
  });

  describe('POST /api/cards/approve/:id', () => {
    it('should deny access without moderator role', async () => {
      const res = await agent.post('/approve/1');

      expect(res.status).toBe(403);
    });

    it('should approve card with moderator role', async () => {
      (mockCardService.approveUserCard as any).mockResolvedValue(undefined);

      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.post('/approve/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Card approved successfully',
      });
      expect(mockCardService.approveUserCard).toHaveBeenCalledWith(
        1,
        expect.any(String)
      );
    });

    it('should reject invalid card ID', async () => {
      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.post('/approve/invalid');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid card ID');
    });

    it('should handle card not found', async () => {
      (mockCardService.approveUserCard as any).mockRejectedValue(
        new Error('Card 999 not found or not a user card')
      );

      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.post('/approve/999');

      expect(res.status).toBe(404);
      expect(res.body.error).toContain('not found');
    });
  });

  describe('POST /api/cards/reject/:id', () => {
    it('should deny access without moderator role', async () => {
      const res = await agent.post('/reject/1');

      expect(res.status).toBe(403);
    });

    it('should reject card with reason', async () => {
      (mockCardService.rejectUserCard as any).mockResolvedValue(undefined);

      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.post('/reject/1', {
        reason: 'Inappropriate content',
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Card rejected successfully');
      expect(mockCardService.rejectUserCard).toHaveBeenCalledWith(
        1,
        expect.any(String),
        'Inappropriate content'
      );
    });

    it('should reject card without reason', async () => {
      (mockCardService.rejectUserCard as any).mockResolvedValue(undefined);

      await agent.post('/auth/promote', { adminKey: 'test-admin-key' });
      const res = await agent.post('/reject/1');

      expect(res.status).toBe(200);
      expect(mockCardService.rejectUserCard).toHaveBeenCalledWith(
        1,
        expect.any(String),
        undefined
      );
    });
  });

  describe('GET /api/cards/approved', () => {
    const mockApprovedCards = [
      { id: 10, text: 'Approved card 1', cardType: 'A' },
      { id: 11, text: 'Approved card 2', cardType: 'A' },
    ];

    it('should require type parameter', async () => {
      const res = await agent.get('/approved');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Type parameter ("A" or "Q") is required');
    });

    it('should return approved answer cards', async () => {
      (mockCardService.getApprovedUserCards as any).mockResolvedValue(mockApprovedCards);

      const res = await agent.get('/approved?type=A');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        count: 2,
        cards: mockApprovedCards,
      });
      expect(mockCardService.getApprovedUserCards).toHaveBeenCalledWith('A');
    });

    it('should reject invalid type', async () => {
      const res = await agent.get('/approved?type=X');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Type parameter ("A" or "Q") is required');
    });
  });

  describe('GET /api/cards/:id/stats', () => {
    it('should return card statistics', async () => {
      (mockCardService.getCardStats as any).mockResolvedValue({
        used: 10,
        won: 3,
      });

      const res = await agent.get('/1/stats');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        cardId: 1,
        stats: { used: 10, won: 3 },
      });
    });

    it('should reject invalid card ID', async () => {
      const res = await agent.get('/invalid/stats');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid card ID');
    });
  });

  describe('GET /api/cards/expansions', () => {
    it('should return available expansions', async () => {
      const mockExpansions = ['Base', 'Expansion1', 'Expansion2'];
      (mockCardService.getAvailableExpansions as any).mockResolvedValue(mockExpansions);

      const res = await agent.get('/expansions');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        count: 3,
        expansions: mockExpansions,
      });
    });
  });

  describe('POST /api/cards/batch', () => {
    it('should submit multiple valid cards', async () => {
      (mockCardService.submitUserCard as any)
        .mockResolvedValueOnce(1001)
        .mockResolvedValueOnce(1002);

      const res = await agent.post('/batch', {
        cards: [
          { text: 'Card 1', cardType: 'A' },
          { text: 'Card 2', cardType: 'Q', numAnswers: 1 },
        ],
      });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        success: true,
        submitted: 2,
        failed: 0,
      });
      expect(res.body.results.submitted).toEqual([1001, 1002]);
    });

    it('should reject empty cards array', async () => {
      const res = await agent.post('/batch', { cards: [] });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Cards array is required');
    });

    it('should reject over 100 cards', async () => {
      const cards = Array(101).fill({ text: 'Card', cardType: 'A' });
      const res = await agent.post('/batch', { cards });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Maximum 100 cards per batch');
    });

    it('should handle partial failures', async () => {
      (mockCardService.submitUserCard as any).mockResolvedValue(1001);

      const res = await agent.post('/batch', {
        cards: [
          { text: 'Valid card', cardType: 'A' },
          { text: '', cardType: 'A' }, // Invalid - empty text
          { text: 'Another valid card', cardType: 'Q' },
        ],
      });

      expect(res.status).toBe(201);
      expect(res.body.submitted).toBe(2);
      expect(res.body.failed).toBe(1);
      expect(res.body.results.failed[0]).toMatchObject({
        index: 1,
        error: 'Card text is required',
      });
    });

    it('should validate card type in batch', async () => {
      const res = await agent.post('/batch', {
        cards: [{ text: 'Card', cardType: 'X' }],
      });

      expect(res.status).toBe(201);
      expect(res.body.submitted).toBe(0);
      expect(res.body.failed).toBe(1);
      expect(res.body.results.failed[0].error).toBe('Card type must be "A" or "Q"');
    });

    it('should validate text length in batch', async () => {
      const longText = 'a'.repeat(501);
      const res = await agent.post('/batch', {
        cards: [{ text: longText, cardType: 'A' }],
      });

      expect(res.status).toBe(201);
      expect(res.body.submitted).toBe(0);
      expect(res.body.failed).toBe(1);
      expect(res.body.results.failed[0].error).toBe('Card text must be 500 characters or less');
    });
  });
});
