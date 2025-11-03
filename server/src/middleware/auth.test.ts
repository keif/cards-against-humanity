import { describe, it, expect, beforeEach } from 'vitest';
import express, { Request, Response } from 'express';
import { requireModerator, requireAdmin } from './auth';
import { createTestApp, createTestAgent } from '@/test/testUtils';

describe('Authentication Middleware', () => {
  let app: express.Express;
  let agent: ReturnType<typeof createTestAgent>;

  beforeEach(() => {
    const router = express.Router();

    // Test route for moderator access
    router.get('/moderator-only', requireModerator, (req: Request, res: Response) => {
      res.json({ success: true, message: 'Moderator access granted' });
    });

    // Test route for admin access
    router.get('/admin-only', requireAdmin, (req: Request, res: Response) => {
      res.json({ success: true, message: 'Admin access granted' });
    });

    // Helper route to set role in session
    router.post('/test/set-role', (req: Request, res: Response) => {
      const { role } = req.body;
      if (req.session) {
        req.session.role = role;
        req.session.save((err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to save session' });
          }
          res.json({ success: true, role: req.session.role });
        });
      } else {
        res.status(500).json({ error: 'No session' });
      }
    });

    app = createTestApp(router);
    agent = createTestAgent(app);
  });

  describe('requireModerator middleware', () => {
    it('should deny access with default user role', async () => {
      // With memory store, a session is auto-created with 'user' role
      const res = await agent.get('/moderator-only');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden');
    });

    it('should deny access for user role', async () => {
      // Initialize session
      await agent.post('/test/set-role', { role: 'user' });

      // Try to access moderator route
      const res = await agent.get('/moderator-only');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden');
    });

    it('should grant access for moderator role', async () => {
      // Set role to moderator
      await agent.post('/test/set-role', { role: 'moderator' });

      // Access moderator route
      const res = await agent.get('/moderator-only');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Moderator access granted',
      });
    });

    it('should grant access for admin role', async () => {
      // Set role to admin
      await agent.post('/test/set-role', { role: 'admin' });

      // Access moderator route (admin has moderator access)
      const res = await agent.get('/moderator-only');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Moderator access granted',
      });
    });
  });

  describe('requireAdmin middleware', () => {
    it('should deny access with default user role', async () => {
      // With memory store, a session is auto-created with 'user' role
      const res = await agent.get('/admin-only');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden');
    });

    it('should deny access for user role', async () => {
      await agent.post('/test/set-role', { role: 'user' });

      const res = await agent.get('/admin-only');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden');
    });

    it('should deny access for moderator role', async () => {
      await agent.post('/test/set-role', { role: 'moderator' });

      const res = await agent.get('/admin-only');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Forbidden');
    });

    it('should grant access for admin role', async () => {
      await agent.post('/test/set-role', { role: 'admin' });

      const res = await agent.get('/admin-only');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Admin access granted',
      });
    });
  });

  describe('Session persistence', () => {
    it('should maintain role across multiple requests', async () => {
      // Set role to moderator
      const setRoleRes = await agent.post('/test/set-role', { role: 'moderator' });
      expect(setRoleRes.status).toBe(200);

      // First request
      const res1 = await agent.get('/moderator-only');
      expect(res1.status).toBe(200);

      // Second request (should still have moderator access)
      const res2 = await agent.get('/moderator-only');
      expect(res2.status).toBe(200);
    });

    it('should create separate sessions for different agents', async () => {
      // Agent 1: Set role to moderator
      await agent.post('/test/set-role', { role: 'moderator' });

      // Agent 1: Should have access
      const res1 = await agent.get('/moderator-only');
      expect(res1.status).toBe(200);

      // Create a new agent (new session)
      const newAgent = createTestAgent(app);

      // New agent should have default user role (no access)
      const res2 = await newAgent.get('/moderator-only');
      expect(res2.status).toBe(403);
      expect(res2.body.error).toBe('Forbidden');
    });
  });
});
