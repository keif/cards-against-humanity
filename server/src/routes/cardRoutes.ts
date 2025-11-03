import { Router, Request, Response } from 'express';
import { getCardService } from '@/models/Card';
import { InputValidator } from '@/utils/validation';
import logger from '@/utils/logger';
import { requireModerator } from '@/middleware/auth';
import { promotionRateLimiter, submissionRateLimiter } from '@/middleware/rateLimiter';
import { checkForSimilarSubmissions, recordSubmission } from '@/services/spamDetection';

const router = Router();

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
 * Get pending cards for moderation
 * GET /api/cards/pending?type=A&limit=50
 * Requires: moderator or admin role
 */
router.get('/pending', requireModerator, async (req: Request, res: Response) => {
	try {
		const type = req.query.type as 'A' | 'Q' | undefined;
		const limit = parseInt(req.query.limit as string) || 50;

		if (type && !['A', 'Q'].includes(type)) {
			return res.status(400).json({ error: 'Type must be "A" or "Q"' });
		}

		if (limit < 1 || limit > 500) {
			return res.status(400).json({ error: 'Limit must be between 1 and 500' });
		}

		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		const cards = await cardService.getPendingUserCards(type, limit);

		res.json({
			success: true,
			count: cards.length,
			cards
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
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		await cardService.approveUserCard(cardId, moderatorId);

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
 * Reject a pending card
 * POST /api/cards/reject/:id
 * Body: { reason?: string, moderatorId?: string }
 * Requires: moderator or admin role
 */
router.post('/reject/:id', requireModerator, async (req: Request, res: Response) => {
	try {
		const cardId = parseInt(req.params.id);
		const { reason, moderatorId } = req.body;
		const modId = moderatorId || req.session.id || 'system';

		if (isNaN(cardId)) {
			return res.status(400).json({ error: 'Invalid card ID' });
		}

		const cardService = getCardService();
		if (!cardService) {
			return res.status(503).json({ error: 'Card service unavailable' });
		}

		await cardService.rejectUserCard(cardId, modId, reason);

		logger.info('Card rejected via API', { cardId, moderatorId: modId, reason });

		res.json({
			success: true,
			message: 'Card rejected successfully'
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

export default router;
