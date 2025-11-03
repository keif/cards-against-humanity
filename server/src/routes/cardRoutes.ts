import { Router, Request, Response } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { getCardService } from '@/models/Card';
import { getVoteService } from '@/models/Vote';
import { InputValidator } from '@/utils/validation';
import logger from '@/utils/logger';
import { requireModerator } from '@/middleware/auth';
import { promotionRateLimiter, submissionRateLimiter, votingRateLimiter } from '@/middleware/rateLimiter';
import { checkForSimilarSubmissions, recordSubmission } from '@/services/spamDetection';
import { RejectionReason, isValidRejectionReason } from '@/types/moderation';

// Factory function to create router with Socket.IO instance
export function createCardRouter(io: SocketIOServer): Router {
	const router = Router();

// ========== Community Voting Endpoints ==========

/**
 * Get pending cards for community review
 * GET /api/cards/community?type=A&sort=newest&limit=20&offset=0
 * Query params:
 *   - type: 'A' | 'Q' | 'all' (default: 'all')
 *   - sort: 'newest' | 'oldest' | 'upvoted' | 'controversial' (default: 'newest')
 *   - limit: number (default 20, max 100)
 *   - offset: number (default 0, for pagination)
 */
router.get('/community', async (req: Request, res: Response) => {
	try {
		const type = req.query.type as 'A' | 'Q' | 'all' | undefined;
		const sort = (req.query.sort as string) || 'newest';
		const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
		const offset = parseInt(req.query.offset as string) || 0;

		if (type && !['A', 'Q', 'all'].includes(type)) {
			return res.status(400).json({ error: 'Type must be "A", "Q", or "all"' });
		}

		if (!['newest', 'oldest', 'upvoted', 'controversial'].includes(sort)) {
			return res.status(400).json({ error: 'Invalid sort parameter' });
		}

		const cardService = getCardService();
		const voteService = getVoteService();

		if (!cardService || !voteService) {
			return res.status(503).json({ error: 'Service unavailable' });
		}

		// Get pending cards
		const cards = await cardService.getPendingUserCards(
			type === 'all' ? undefined : (type as 'A' | 'Q'),
			limit + offset // Get extra for offset
		);

		// Get vote stats for all cards
		const cardIds = cards.map(c => c.id);
		const voteStatsMap = await voteService.getBulkVoteStats(cardIds);

		// Attach vote stats to cards
		const cardsWithVotes = cards.map(card => ({
			...card,
			votes: voteStatsMap.get(card.id) || {
				upvotes: 0,
				downvotes: 0,
				duplicateFlags: 0,
				netScore: 0
			}
		}));

		// Sort cards based on sort parameter
		let sortedCards = [...cardsWithVotes];
		switch (sort) {
			case 'upvoted':
				sortedCards.sort((a, b) => b.votes.upvotes - a.votes.upvotes);
				break;
			case 'controversial':
				sortedCards.sort((a, b) => {
					const aControversy = a.votes.upvotes + a.votes.downvotes;
					const bControversy = b.votes.upvotes + b.votes.downvotes;
					return bControversy - aControversy;
				});
				break;
			case 'oldest':
				// Cards are already sorted by timestamp (oldest first) from Redis
				sortedCards.reverse();
				break;
			case 'newest':
			default:
				// Cards come from Redis in order (newest first for pending queue)
				break;
		}

		// Apply pagination
		const paginatedCards = sortedCards.slice(offset, offset + limit);

		res.json({
			success: true,
			count: paginatedCards.length,
			total: cards.length,
			cards: paginatedCards,
			pagination: {
				limit,
				offset,
				hasMore: offset + limit < cards.length
			}
		});
	} catch (error) {
		logger.error('Error getting community cards', {
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to get community cards' });
	}
});

/**
 * Cast a vote on a pending card
 * POST /api/cards/:id/vote
 * Body: { voteType: 'up' | 'down' | 'duplicate' }
 * Returns: Updated vote counts
 * Rate limited: 30 votes per minute per session
 */
router.post('/:id/vote', votingRateLimiter, async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);
		const { voteType } = req.body;
		const sessionId = req.session.id;

		if (!sessionId) {
			return res.status(401).json({ error: 'Session required to vote' });
		}

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		if (!voteType || !['up', 'down', 'duplicate'].includes(voteType)) {
			return res.status(400).json({ error: 'Vote type must be "up", "down", or "duplicate"' });
		}

		const voteService = getVoteService();
		if (!voteService) {
			return res.status(503).json({ error: 'Vote service unavailable' });
		}

		// Cast vote
		const stats = await voteService.castVote(cardId, sessionId, voteType);

		// Emit real-time vote update to all connected clients
		io.emit('voteUpdated', { cardId, votes: stats });

		logger.info('Vote cast', { cardId, sessionId, voteType, stats });

		res.json({
			success: true,
			cardId,
			voteType,
			votes: stats
		});
	} catch (error) {
		logger.error('Error casting vote', {
			cardId: req.params.id,
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to cast vote' });
	}
});

/**
 * Remove your vote on a card
 * DELETE /api/cards/:id/vote
 */
router.delete('/:id/vote', async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);
		const sessionId = req.session.id;

		if (!sessionId) {
			return res.status(401).json({ error: 'Session required' });
		}

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		const voteService = getVoteService();
		if (!voteService) {
			return res.status(503).json({ error: 'Vote service unavailable' });
		}

		await voteService.removeVote(cardId, sessionId);

		// Get updated stats
		const stats = await voteService.getVoteStats(cardId);

		// Emit real-time vote update to all connected clients
		io.emit('voteUpdated', { cardId, votes: stats });

		logger.info('Vote removed', { cardId, sessionId });

		res.json({
			success: true,
			cardId,
			votes: stats
		});
	} catch (error) {
		logger.error('Error removing vote', {
			cardId: req.params.id,
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to remove vote' });
	}
});

/**
 * Get your vote on a card
 * GET /api/cards/:id/my-vote
 * Returns: { voted: boolean, voteType?: 'up' | 'down' | 'duplicate' }
 */
router.get('/:id/my-vote', async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);
		const sessionId = req.session.id;

		if (!sessionId) {
			return res.json({ voted: false });
		}

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		const voteService = getVoteService();
		if (!voteService) {
			return res.status(503).json({ error: 'Vote service unavailable' });
		}

		const userVote = await voteService.getUserVote(cardId, sessionId);

		res.json({
			success: true,
			cardId,
			...userVote
		});
	} catch (error) {
		logger.error('Error getting user vote', {
			cardId: req.params.id,
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to get user vote' });
	}
});

// ========== Authentication & Authorization ==========

/**
 * Get current user's role
 * GET /api/cards/auth/role
 */
router.get('/auth/role', async (req: Request, res: Response) => {
	try {
		const session = req.session;

		if (!session || !session.id) {
			return res.status(401).json({ error: 'Not authenticated' });
		}

		// Initialize role to 'user' if not set
		if (!session.role) {
			session.role = 'user';
		}

		res.json({
			success: true,
			sessionId: session.id,
			role: session.role,
			name: session.name || null
		});
	} catch (error) {
		logger.error('Error getting user role', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to get user role' });
	}
});

/**
 * Promote user to moderator role
 * POST /api/cards/auth/promote
 * Body: { adminKey: string }
 * Sets the current session's role to 'moderator'
 * Rate limited: 5 failed attempts per 15 minutes per IP
 */
router.post('/auth/promote', promotionRateLimiter, async (req: Request, res: Response) => {
	try {
		const { adminKey } = req.body;
		const session = req.session;

		if (!session || !session.id) {
			return res.status(401).json({ error: 'Not authenticated' });
		}

		// Check admin key from environment
		const expectedAdminKey = process.env.ADMIN_KEY;

		if (!expectedAdminKey) {
			logger.error('ADMIN_KEY not configured in environment');
			return res.status(500).json({ error: 'Server configuration error' });
		}

		if (adminKey !== expectedAdminKey) {
			logger.warn('Invalid admin key attempt', {
				sessionId: session.id,
				ip: req.ip,
				userAgent: req.get('User-Agent'),
				timestamp: new Date().toISOString(),
				endpoint: '/auth/promote'
			});
			return res.status(403).json({ error: 'Invalid admin key' });
		}

		// Promote user to moderator
		session.role = 'moderator';

		// Save session to persist the role
		session.save((err) => {
			if (err) {
				logger.error('Failed to save session', { error: err.message });
				return res.status(500).json({ error: 'Failed to save session' });
			}

			logger.info('User promoted to moderator', {
				sessionId: session.id,
				name: session.name
			});

			res.json({
				success: true,
				message: 'Successfully promoted to moderator',
				role: session.role,
				sessionId: session.id
			});
		});
	} catch (error) {
		logger.error('Error promoting user', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to promote user' });
	}
});

/**
 * Submit a user-generated card
 * POST /api/cards/submit
 * Body: { text: string, cardType: 'A' | 'Q', numAnswers?: number }
 * Rate limited: 10 submissions per hour per session
 * Spam protected: Rejects similar submissions within 5 minutes
 */
router.post('/submit', submissionRateLimiter, async (req: Request, res: Response) => {
	try {
		const { text, cardType, numAnswers } = req.body;
		const userId = req.session.id || 'anonymous';

		// Validate inputs
		if (!text || typeof text !== 'string' || text.trim().length === 0) {
			return res.status(400).json({ error: 'Card text is required' });
		}

		if (!cardType || !['A', 'Q'].includes(cardType)) {
			return res.status(400).json({ error: 'Card type must be "A" or "Q"' });
		}

		if (text.length > 500) {
			return res.status(400).json({ error: 'Card text must be 500 characters or less' });
		}

		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		// Check for similar recent submissions (spam detection)
		const similarityCheck = checkForSimilarSubmissions(text.trim(), userId);
		if (similarityCheck.isSimilar) {
			logger.info('Similar submission rejected', {
				userId,
				cardType,
				similarity: similarityCheck.similarity
			});

			return res.status(429).json({
				error: 'You recently submitted a very similar card. Please wait before submitting similar content.',
				similarCard: similarityCheck.similarText,
				similarity: similarityCheck.similarity
			});
		}

		// Check for duplicates
		const duplicateCheck = await cardService.checkForDuplicate(text.trim(), cardType as 'A' | 'Q');

		if (duplicateCheck.isDuplicate) {
			logger.info('Duplicate card submission rejected', {
				userId,
				cardType,
				duplicateId: duplicateCheck.duplicateId,
				duplicateSource: duplicateCheck.duplicateSource
			});

			return res.status(409).json({
				error: 'This card already exists',
				duplicate: {
					id: duplicateCheck.duplicateId,
					text: duplicateCheck.duplicateText,
					source: duplicateCheck.duplicateSource,
					expansion: duplicateCheck.duplicateExpansion
				}
			});
		}

		const cardId = await cardService.submitUserCard({
			text: text.trim(),
			cardType: cardType as 'A' | 'Q',
			numAnswers: cardType === 'Q' ? (numAnswers || 1) : 0,
			expansion: 'user-generated',
			userId
		});

		// Record submission for spam detection
		recordSubmission(text.trim(), userId);

		// Emit real-time notification about new card submission
		io.emit('cardSubmitted', { cardId });

		logger.info('User card submitted via API', { cardId, userId, cardType });

		res.status(201).json({
			success: true,
			cardId,
			status: 'pending',
			message: 'Card submitted successfully and is pending moderation'
		});
	} catch (error) {
		logger.error('Error submitting card', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to submit card' });
	}
});

/**
 * Get pending cards for moderation (ENHANCED with vote data)
 * GET /api/cards/pending?type=A&sort=upvoted&filter=duplicate_flags&limit=50
 * Query params:
 *   - type: 'A' | 'Q' | 'all' (default: 'all')
 *   - sort: 'newest' | 'oldest' | 'upvoted' | 'downvoted' | 'net_score' | 'controversial' (default: 'newest')
 *   - filter: 'has_duplicate_flags' | 'low_score' | 'high_score' (optional)
 *   - limit: number (default 50, max 500)
 * Requires: moderator or admin role
 */
router.get('/pending', requireModerator, async (req: Request, res: Response) => {
	try {
		const type = req.query.type as 'A' | 'Q' | 'all' | undefined;
		const sort = (req.query.sort as string) || 'newest';
		const filter = req.query.filter as string | undefined;
		const limit = Math.min(parseInt(req.query.limit as string) || 50, 500);

		if (type && !['A', 'Q', 'all'].includes(type)) {
			return res.status(400).json({ error: 'Type must be "A", "Q", or "all"' });
		}

		if (!['newest', 'oldest', 'upvoted', 'downvoted', 'net_score', 'controversial'].includes(sort)) {
			return res.status(400).json({ error: 'Invalid sort parameter' });
		}

		const cardService = getCardService();
		const voteService = getVoteService();

		if (!cardService || !voteService) {
			return res.status(503).json({ error: 'Service unavailable' });
		}

		// Get pending cards
		const cards = await cardService.getPendingUserCards(
			type === 'all' ? undefined : (type as 'A' | 'Q'),
			limit
		);

		// Get vote stats for all cards
		const cardIds = cards.map(c => c.id);
		const voteStatsMap = await voteService.getBulkVoteStats(cardIds);

		// Attach vote stats to cards
		let cardsWithVotes = cards.map(card => ({
			...card,
			votes: voteStatsMap.get(card.id) || {
				upvotes: 0,
				downvotes: 0,
				duplicateFlags: 0,
				netScore: 0
			}
		}));

		// Apply filters
		if (filter === 'has_duplicate_flags') {
			cardsWithVotes = cardsWithVotes.filter(c => c.votes.duplicateFlags > 0);
		} else if (filter === 'low_score') {
			cardsWithVotes = cardsWithVotes.filter(c => c.votes.netScore < 0);
		} else if (filter === 'high_score') {
			cardsWithVotes = cardsWithVotes.filter(c => c.votes.netScore > 5);
		}

		// Sort cards
		switch (sort) {
			case 'upvoted':
				cardsWithVotes.sort((a, b) => b.votes.upvotes - a.votes.upvotes);
				break;
			case 'downvoted':
				cardsWithVotes.sort((a, b) => b.votes.downvotes - a.votes.downvotes);
				break;
			case 'net_score':
				cardsWithVotes.sort((a, b) => b.votes.netScore - a.votes.netScore);
				break;
			case 'controversial':
				cardsWithVotes.sort((a, b) => {
					const aControversy = a.votes.upvotes + a.votes.downvotes;
					const bControversy = b.votes.upvotes + b.votes.downvotes;
					return bControversy - aControversy;
				});
				break;
			case 'oldest':
				cardsWithVotes.reverse();
				break;
			case 'newest':
			default:
				// Already in newest-first order
				break;
		}

		res.json({
			success: true,
			count: cardsWithVotes.length,
			cards: cardsWithVotes
		});
	} catch (error) {
		logger.error('Error getting pending cards', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to get pending cards' });
	}
});

/**
 * Approve a pending card
 * POST /api/cards/approve/:id
 * Body: { moderatorId?: string }
 * Requires: moderator or admin role
 */
router.post('/approve/:id', requireModerator, async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);
		const moderatorId = req.body.moderatorId || req.session.id || 'system';

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		const cardService = getCardService();
		const voteService = getVoteService();

		if (!cardService || !voteService) {
			return res.status(503).json({ error: 'Service unavailable' });
		}

		await cardService.approveUserCard(cardId, moderatorId);

		// Clean up vote data
		await voteService.cleanupVoteData(cardId);

		logger.info('Card approved via API', { cardId, moderatorId });

		res.json({
			success: true,
			message: 'Card approved successfully'
		});
	} catch (error) {
		logger.error('Error approving card', {
			cardId: req.params.id,
			error: error instanceof Error ? error.message : String(error)
		});

		if (error instanceof Error && error.message.includes('not found')) {
			return res.status(404).json({ error: error.message });
		}

		res.status(500).json({ error: 'Failed to approve card' });
	}
});

/**
 * Reject a pending card (ENHANCED with structured reasons)
 * POST /api/cards/reject/:id
 * Body: {
 *   reason: 'offensive' | 'duplicate' | 'poor_grammar' | 'doesnt_fit_tone' | 'too_obscure' | 'too_similar' | 'inappropriate_length' | 'spam' | 'custom',
 *   customReason?: string (required if reason is 'custom'),
 *   moderatorId?: string
 * }
 * Requires: moderator or admin role
 */
router.post('/reject/:id', requireModerator, async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);
		const { reason, customReason, moderatorId } = req.body;
		const modId = moderatorId || req.session.id || 'system';

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		// Validate rejection reason
		if (!reason) {
			return res.status(400).json({ error: 'Rejection reason is required' });
		}

		if (!isValidRejectionReason(reason)) {
			return res.status(400).json({
				error: 'Invalid rejection reason',
				validReasons: Object.values(RejectionReason)
			});
		}

		// If custom reason, require customReason text
		if (reason === RejectionReason.CUSTOM && (!customReason || customReason.trim().length === 0)) {
			return res.status(400).json({ error: 'Custom reason text is required when using custom rejection' });
		}

		const cardService = getCardService();
		const voteService = getVoteService();

		if (!cardService || !voteService) {
			return res.status(503).json({ error: 'Service unavailable' });
		}

		// Build final reason string
		const finalReason = reason === RejectionReason.CUSTOM ? customReason : reason;

		await cardService.rejectUserCard(cardId, modId, finalReason);

		// Clean up vote data
		await voteService.cleanupVoteData(cardId);

		logger.info('Card rejected via API', { cardId, moderatorId: modId, reason, customReason });

		res.json({
			success: true,
			message: 'Card rejected successfully',
			reason: finalReason
		});
	} catch (error) {
		logger.error('Error rejecting card', {
			cardId: req.params.id,
			error: error instanceof Error ? error.message : String(error)
		});

		if (error instanceof Error && error.message.includes('not found')) {
			return res.status(404).json({ error: error.message });
		}

		res.status(500).json({ error: 'Failed to reject card' });
	}
});

/**
 * Get approved user cards
 * GET /api/cards/approved?type=A
 */
router.get('/approved', async (req: Request, res: Response) => {
	try {
		const type = req.query.type as 'A' | 'Q' | undefined;

		if (!type || !['A', 'Q'].includes(type)) {
			return res.status(400).json({ error: 'Type parameter ("A" or "Q") is required' });
		}

		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		const cards = await cardService.getApprovedUserCards(type);

		res.json({
			success: true,
			count: cards.length,
			cards
		});
	} catch (error) {
		logger.error('Error getting approved cards', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to get approved cards' });
	}
});

/**
 * Get card statistics
 * GET /api/cards/:id/stats
 */
router.get('/:id/stats', async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		const stats = await cardService.getCardStats(cardId);

		res.json({
			success: true,
			cardId,
			stats
		});
	} catch (error) {
		logger.error('Error getting card stats', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to get card stats' });
	}
});

/**
 * Get available expansions
 * GET /api/cards/expansions
 */
router.get('/expansions', async (req: Request, res: Response) => {
	try {
		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		const expansions = await cardService.getAvailableExpansions();

		res.json({
			success: true,
			count: expansions.length,
			expansions
		});
	} catch (error) {
		logger.error('Error getting expansions', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to get expansions' });
	}
});

/**
 * Batch submit cards
 * POST /api/cards/batch
 * Body: { cards: Array<{ text: string, cardType: 'A' | 'Q', numAnswers?: number }> }
 * Rate limited: 10 submissions per hour per session (counts each card in batch)
 * Spam protected: Rejects similar cards within batch and recent submissions
 */
router.post('/batch', submissionRateLimiter, async (req: Request, res: Response) => {
	try {
		const { cards } = req.body;
		const userId = req.session.id || 'batch-import';

		if (!Array.isArray(cards) || cards.length === 0) {
			return res.status(400).json({ error: 'Cards array is required' });
		}

		if (cards.length > 100) {
			return res.status(400).json({ error: 'Maximum 100 cards per batch' });
		}

		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		const results = {
			submitted: [] as number[],
			failed: [] as { index: number; error: string; card: any }[]
		};

		for (let i = 0; i < cards.length; i++) {
			const card = cards[i];

			// Validate each card
			if (!card.text || typeof card.text !== 'string' || card.text.trim().length === 0) {
				results.failed.push({ index: i, error: 'Card text is required', card });
				continue;
			}

			if (!card.cardType || !['A', 'Q'].includes(card.cardType)) {
				results.failed.push({ index: i, error: 'Card type must be "A" or "Q"', card });
				continue;
			}

			if (card.text.length > 500) {
				results.failed.push({ index: i, error: 'Card text must be 500 characters or less', card });
				continue;
			}

			// Check for similar recent submissions (spam detection)
			const similarityCheck = checkForSimilarSubmissions(card.text.trim(), userId);
			if (similarityCheck.isSimilar) {
				results.failed.push({
					index: i,
					error: 'Similar card recently submitted',
					card
				});
				continue;
			}

			// Check for duplicates
			const duplicateCheck = await cardService.checkForDuplicate(card.text.trim(), card.cardType as 'A' | 'Q');
			if (duplicateCheck.isDuplicate) {
				results.failed.push({
					index: i,
					error: `Duplicate card (exists as ${duplicateCheck.duplicateSource})`,
					card
				});
				continue;
			}

			try {
				const cardId = await cardService.submitUserCard({
					text: card.text.trim(),
					cardType: card.cardType as 'A' | 'Q',
					numAnswers: card.cardType === 'Q' ? (card.numAnswers || 1) : 0,
					expansion: 'user-generated',
					userId
				});

				// Record submission for spam detection
				recordSubmission(card.text.trim(), userId);

				results.submitted.push(cardId);
			} catch (error) {
				results.failed.push({
					index: i,
					error: error instanceof Error ? error.message : 'Unknown error',
					card
				});
			}
		}

		logger.info('Batch card submission completed', {
			userId,
			submitted: results.submitted.length,
			failed: results.failed.length
		});

		res.status(201).json({
			success: true,
			submitted: results.submitted.length,
			failed: results.failed.length,
			results
		});
	} catch (error) {
		logger.error('Error in batch submission', { error: error instanceof Error ? error.message : String(error) });
		res.status(500).json({ error: 'Failed to process batch submission' });
	}
});

// ========== Batch Moderation Endpoints ==========

/**
 * Batch approve cards
 * POST /api/cards/moderator/batch-approve
 * Body: { cardIds: number[] }
 * Requires: moderator or admin role
 */
router.post('/moderator/batch-approve', requireModerator, async (req: Request, res: Response) => {
	try {
		const { cardIds } = req.body;
		const moderatorId = req.session.id || 'system';

		if (!Array.isArray(cardIds) || cardIds.length === 0) {
			return res.status(400).json({ error: 'cardIds array is required' });
		}

		if (cardIds.length > 100) {
			return res.status(400).json({ error: 'Maximum 100 cards per batch operation' });
		}

		// Validate all IDs are numbers
		if (!cardIds.every(id => typeof id === 'number' && !isNaN(id))) {
			return res.status(400).json({ error: 'All card IDs must be valid numbers' });
		}

		const cardService = getCardService();
		const voteService = getVoteService();

		if (!cardService || !voteService) {
			return res.status(503).json({ error: 'Service unavailable' });
		}

		const results = {
			approved: [] as number[],
			failed: [] as { cardId: number; error: string }[]
		};

		for (const cardId of cardIds) {
			try {
				await cardService.approveUserCard(cardId, moderatorId);
				await voteService.cleanupVoteData(cardId);
				results.approved.push(cardId);
			} catch (error) {
				results.failed.push({
					cardId,
					error: error instanceof Error ? error.message : 'Unknown error'
				});
			}
		}

		logger.info('Batch approval completed', {
			moderatorId,
			approved: results.approved.length,
			failed: results.failed.length
		});

		res.json({
			success: true,
			approved: results.approved.length,
			failed: results.failed.length,
			results
		});
	} catch (error) {
		logger.error('Error in batch approval', {
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to process batch approval' });
	}
});

/**
 * Batch reject cards
 * POST /api/cards/moderator/batch-reject
 * Body: {
 *   cardIds: number[],
 *   reason: RejectionReason,
 *   customReason?: string
 * }
 * Requires: moderator or admin role
 */
router.post('/moderator/batch-reject', requireModerator, async (req: Request, res: Response) => {
	try {
		const { cardIds, reason, customReason } = req.body;
		const moderatorId = req.session.id || 'system';

		if (!Array.isArray(cardIds) || cardIds.length === 0) {
			return res.status(400).json({ error: 'cardIds array is required' });
		}

		if (cardIds.length > 100) {
			return res.status(400).json({ error: 'Maximum 100 cards per batch operation' });
		}

		// Validate all IDs are numbers
		if (!cardIds.every(id => typeof id === 'number' && !isNaN(id))) {
			return res.status(400).json({ error: 'All card IDs must be valid numbers' });
		}

		// Validate rejection reason
		if (!reason || !isValidRejectionReason(reason)) {
			return res.status(400).json({
				error: 'Valid rejection reason is required',
				validReasons: Object.values(RejectionReason)
			});
		}

		if (reason === RejectionReason.CUSTOM && (!customReason || customReason.trim().length === 0)) {
			return res.status(400).json({ error: 'Custom reason text is required when using custom rejection' });
		}

		const cardService = getCardService();
		const voteService = getVoteService();

		if (!cardService || !voteService) {
			return res.status(503).json({ error: 'Service unavailable' });
		}

		const finalReason = reason === RejectionReason.CUSTOM ? customReason : reason;

		const results = {
			rejected: [] as number[],
			failed: [] as { cardId: number; error: string }[]
		};

		for (const cardId of cardIds) {
			try {
				await cardService.rejectUserCard(cardId, moderatorId, finalReason);
				await voteService.cleanupVoteData(cardId);
				results.rejected.push(cardId);
			} catch (error) {
				results.failed.push({
					cardId,
					error: error instanceof Error ? error.message : 'Unknown error'
				});
			}
		}

		logger.info('Batch rejection completed', {
			moderatorId,
			reason,
			rejected: results.rejected.length,
			failed: results.failed.length
		});

		res.json({
			success: true,
			rejected: results.rejected.length,
			failed: results.failed.length,
			results
		});
	} catch (error) {
		logger.error('Error in batch rejection', {
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to process batch rejection' });
	}
});

/**
 * Get moderation statistics
 * GET /api/cards/moderator/stats
 * Returns aggregate statistics about card submissions and moderation
 * Requires: moderator or admin role
 */
router.get('/moderator/stats', requireModerator, async (req: Request, res: Response) => {
	try {
		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		// Get counts for each status
		const [pendingA, pendingQ, approvedA, approvedQ] = await Promise.all([
			cardService.getPendingUserCards('A', 10000), // Get all
			cardService.getPendingUserCards('Q', 10000),
			cardService.getApprovedUserCards('A'),
			cardService.getApprovedUserCards('Q')
		]);

		const stats = {
			pending: {
				total: pendingA.length + pendingQ.length,
				answerCards: pendingA.length,
				questionCards: pendingQ.length
			},
			approved: {
				total: approvedA.length + approvedQ.length,
				answerCards: approvedA.length,
				questionCards: approvedQ.length
			},
			// Note: We don't track rejected count in current implementation
			// but it could be added by creating a getRejectedUserCards method
			totalSubmissions: pendingA.length + pendingQ.length + approvedA.length + approvedQ.length,
			approvalRate: 0
		};

		// Calculate approval rate
		if (stats.totalSubmissions > 0) {
			stats.approvalRate = (stats.approved.total / stats.totalSubmissions) * 100;
		}

		res.json({
			success: true,
			stats
		});
	} catch (error) {
		logger.error('Error getting moderation stats', {
			error: error instanceof Error ? error.message : String(error)
		});
		res.status(500).json({ error: 'Failed to get moderation statistics' });
	}
});

	return router;
}

// Default export for backward compatibility (for tests that don't need Socket.IO)
// In production, use createCardRouter(io) instead
export default createCardRouter({
	emit: () => {},
	to: () => ({ emit: () => {} })
} as any);
