import { Redis } from 'ioredis';
import shuffle from 'lodash/shuffle';
import { Card } from '@/data/types';
import logger from '@/utils/logger';

/**
 * Normalize card text for duplicate detection
 * - Convert to lowercase
 * - Trim whitespace
 * - Collapse multiple spaces into single space
 * - Remove trailing punctuation for comparison
 */
function normalizeCardText(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/[.!?]+$/, ''); // Remove trailing punctuation
}

/**
 * Duplicate detection result
 */
export interface DuplicateInfo {
	isDuplicate: boolean;
	duplicateId?: number;
	duplicateText?: string;
	duplicateSource?: 'official' | 'user-pending' | 'user-approved' | 'user-rejected';
	duplicateExpansion?: string;
}

/**
 * Redis Card Service
 *
 * Redis Data Structure:
 * - cards:official:{expansion}:{type} -> Set of card IDs
 * - cards:user:{status}:{type} -> Sorted Set of card IDs (scored by timestamp)
 * - card:{id} -> Hash with card data
 * - cards:initialized -> String flag
 * - cards:stats:{id}:used -> Counter for usage stats
 * - cards:stats:{id}:won -> Counter for winning stats
 */
export class CardService {
	private redis: Redis;

	constructor(redis: Redis) {
		this.redis = redis;
	}

	/**
	 * Initialize cards in Redis from static data
	 */
	async seedOfficialCards(cards: Card[]): Promise<void> {
		const isInitialized = await this.redis.get('cards:initialized');

		if (isInitialized) {
			logger.info('Cards already initialized in Redis', { count: cards.length });
			return;
		}

		logger.info('Seeding cards to Redis...', { count: cards.length });

		const pipeline = this.redis.pipeline();

		for (const card of cards) {
			// Store card data as hash
			pipeline.hset(`card:${card.id}`, {
				id: card.id,
				cardType: card.cardType,
				text: card.text,
				numAnswers: card.numAnswers,
				expansion: card.expansion,
				source: 'official'
			});

			// Add card ID to expansion:type set
			pipeline.sadd(`cards:official:${card.expansion}:${card.cardType}`, card.id);
		}

		// Mark as initialized
		pipeline.set('cards:initialized', new Date().toISOString());

		await pipeline.exec();

		logger.info('Cards seeded successfully', { count: cards.length });
	}

	/**
	 * Get shuffled answer cards for a specific expansion
	 */
	async getShuffledAnswerCards(expansion: string = 'Base'): Promise<Card[]> {
		try {
			const cardIds = await this.redis.smembers(`cards:official:${expansion}:A`);

			if (cardIds.length === 0) {
				logger.warn('No answer cards found for expansion', { expansion });
				return [];
			}

			const cards = await this.getCardsByIds(cardIds.map(Number));
			return shuffle(cards);
		} catch (error) {
			logger.error('Error getting shuffled answer cards', {
				expansion,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	}

	/**
	 * Get shuffled question cards for a specific expansion
	 */
	async getShuffledQuestionCards(expansion: string = 'Base', numAnswers: number = 1): Promise<Card[]> {
		try {
			const cardIds = await this.redis.smembers(`cards:official:${expansion}:Q`);

			if (cardIds.length === 0) {
				logger.warn('No question cards found for expansion', { expansion });
				return [];
			}

			const cards = await this.getCardsByIds(cardIds.map(Number));

			// Filter by numAnswers
			const filteredCards = cards.filter(card => card.numAnswers === numAnswers);

			return shuffle(filteredCards);
		} catch (error) {
			logger.error('Error getting shuffled question cards', {
				expansion,
				numAnswers,
				error: error instanceof Error ? error.message : String(error)
			});
			throw error;
		}
	}

	/**
	 * Get cards by array of IDs
	 */
	private async getCardsByIds(ids: number[]): Promise<Card[]> {
		if (ids.length === 0) return [];

		const pipeline = this.redis.pipeline();
		ids.forEach(id => pipeline.hgetall(`card:${id}`));

		const results = await pipeline.exec();

		if (!results) return [];

		return results
			.map(([err, data]) => {
				if (err || !data) return null;
				return {
					id: Number((data as any).id),
					cardType: (data as any).cardType,
					text: (data as any).text,
					numAnswers: Number((data as any).numAnswers),
					expansion: (data as any).expansion,
					createdAt: (data as any).createdAt
				} as Card;
			})
			.filter((card): card is Card => card !== null);
	}

	/**
	 * Get available expansions
	 */
	async getAvailableExpansions(): Promise<string[]> {
		const keys = await this.redis.keys('cards:official:*:A');
		const expansions = keys.map(key => {
			const parts = key.split(':');
			return parts[2]; // Extract expansion name
		});
		return [...new Set(expansions)].sort();
	}

	/**
	 * Get card statistics
	 */
	async getCardStats(cardId: number): Promise<{ used: number; won: number }> {
		const [used, won] = await Promise.all([
			this.redis.get(`cards:stats:${cardId}:used`),
			this.redis.get(`cards:stats:${cardId}:won`)
		]);

		return {
			used: used ? parseInt(used) : 0,
			won: won ? parseInt(won) : 0
		};
	}

	/**
	 * Increment card usage stat
	 */
	async incrementCardUsed(cardId: number): Promise<void> {
		await this.redis.incr(`cards:stats:${cardId}:used`);
	}

	/**
	 * Increment card won stat
	 */
	async incrementCardWon(cardId: number): Promise<void> {
		await this.redis.incr(`cards:stats:${cardId}:won`);
	}

	// ========== User-Generated Cards ==========

	/**
	 * Check if a card text is a duplicate
	 * Checks against official cards and all user-submitted cards
	 */
	async checkForDuplicate(text: string, cardType: 'A' | 'Q'): Promise<DuplicateInfo> {
		const normalizedText = normalizeCardText(text);

		try {
			// 1. Check official cards across all expansions
			const expansions = await this.getAvailableExpansions();

			for (const expansion of expansions) {
				const officialCardIds = await this.redis.smembers(`cards:official:${expansion}:${cardType}`);

				for (const idStr of officialCardIds) {
					const cardData = await this.redis.hgetall(`card:${idStr}`);
					if (cardData && cardData.text) {
						const normalizedExistingText = normalizeCardText(cardData.text);
						if (normalizedExistingText === normalizedText) {
							return {
								isDuplicate: true,
								duplicateId: Number(idStr),
								duplicateText: cardData.text,
								duplicateSource: 'official',
								duplicateExpansion: expansion
							};
						}
					}
				}
			}

			// 2. Check user cards (pending, approved, rejected)
			const userStatuses: Array<{ status: 'pending' | 'approved' | 'rejected'; source: 'user-pending' | 'user-approved' | 'user-rejected' }> = [
				{ status: 'pending', source: 'user-pending' },
				{ status: 'approved', source: 'user-approved' },
				{ status: 'rejected', source: 'user-rejected' }
			];

			for (const { status, source } of userStatuses) {
				const userCardIds = await this.redis.zrange(`cards:user:${status}:${cardType}`, 0, -1);

				for (const idStr of userCardIds) {
					const cardData = await this.redis.hgetall(`card:${idStr}`);
					if (cardData && cardData.text) {
						const normalizedExistingText = normalizeCardText(cardData.text);
						if (normalizedExistingText === normalizedText) {
							return {
								isDuplicate: true,
								duplicateId: Number(idStr),
								duplicateText: cardData.text,
								duplicateSource: source
							};
						}
					}
				}
			}

			// No duplicate found
			return { isDuplicate: false };

		} catch (error) {
			logger.error('Error checking for duplicate card', {
				error: error instanceof Error ? error.message : String(error)
			});
			// In case of error, allow submission (fail open)
			return { isDuplicate: false };
		}
	}

	/**
	 * Submit a user-generated card
	 */
	async submitUserCard(card: Omit<Card, 'id'> & { userId: string }): Promise<number> {
		const cardId = await this.getNextCardId();
		const timestamp = Date.now();

		// Store card data
		await this.redis.hset(`card:${cardId}`, {
			id: cardId,
			cardType: card.cardType,
			text: card.text,
			numAnswers: card.numAnswers,
			expansion: 'user-generated',
			source: 'user',
			userId: card.userId,
			status: 'pending',
			createdAt: timestamp
		});

		// Add to pending queue (sorted by timestamp)
		await this.redis.zadd(`cards:user:pending:${card.cardType}`, timestamp, cardId);

		logger.info('User card submitted', { cardId, userId: card.userId, type: card.cardType });

		return cardId;
	}

	/**
	 * Approve a user-generated card
	 */
	async approveUserCard(cardId: number, moderatorId: string): Promise<void> {
		const cardData = await this.redis.hgetall(`card:${cardId}`);

		if (!cardData || cardData.source !== 'user') {
			throw new Error(`Card ${cardId} not found or not a user card`);
		}

		const cardType = cardData.cardType;

		// Update status
		await this.redis.hset(`card:${cardId}`, 'status', 'approved');
		await this.redis.hset(`card:${cardId}`, 'approvedBy', moderatorId);
		await this.redis.hset(`card:${cardId}`, 'approvedAt', Date.now());

		// Move from pending to approved
		await this.redis.zrem(`cards:user:pending:${cardType}`, cardId);
		await this.redis.zadd(`cards:user:approved:${cardType}`, Date.now(), cardId);

		logger.info('User card approved', { cardId, moderatorId });
	}

	/**
	 * Reject a user-generated card
	 */
	async rejectUserCard(cardId: number, moderatorId: string, reason?: string): Promise<void> {
		const cardData = await this.redis.hgetall(`card:${cardId}`);

		if (!cardData || cardData.source !== 'user') {
			throw new Error(`Card ${cardId} not found or not a user card`);
		}

		const cardType = cardData.cardType;

		// Update status
		await this.redis.hset(`card:${cardId}`, 'status', 'rejected');
		await this.redis.hset(`card:${cardId}`, 'rejectedBy', moderatorId);
		await this.redis.hset(`card:${cardId}`, 'rejectedAt', Date.now());
		if (reason) {
			await this.redis.hset(`card:${cardId}`, 'rejectionReason', reason);
		}

		// Move from pending to rejected
		await this.redis.zrem(`cards:user:pending:${cardType}`, cardId);
		await this.redis.zadd(`cards:user:rejected:${cardType}`, Date.now(), cardId);

		logger.info('User card rejected', { cardId, moderatorId, reason });
	}

	/**
	 * Get pending user cards for moderation
	 */
	async getPendingUserCards(cardType?: 'A' | 'Q', limit: number = 50): Promise<Card[]> {
		const types = cardType ? [cardType] : ['A', 'Q'];
		const allCardIds: number[] = [];

		for (const type of types) {
			const cardIds = await this.redis.zrange(`cards:user:pending:${type}`, 0, limit - 1);
			allCardIds.push(...cardIds.map(Number));
		}

		return this.getCardsByIds(allCardIds);
	}

	/**
	 * Get approved user cards (for including in games)
	 */
	async getApprovedUserCards(cardType: 'A' | 'Q'): Promise<Card[]> {
		const cardIds = await this.redis.zrange(`cards:user:approved:${cardType}`, 0, -1);
		return this.getCardsByIds(cardIds.map(Number));
	}

	/**
	 * Get next card ID (for user-generated cards)
	 */
	private async getNextCardId(): Promise<number> {
		return await this.redis.incr('cards:nextId');
	}

	/**
	 * Reset all cards (useful for development/testing)
	 */
	async resetAllCards(): Promise<void> {
		logger.warn('Resetting all cards in Redis');

		const keys = await this.redis.keys('card:*');
		const cardKeys = await this.redis.keys('cards:*');

		if (keys.length > 0) {
			await this.redis.del(...keys);
		}
		if (cardKeys.length > 0) {
			await this.redis.del(...cardKeys);
		}

		logger.info('All cards reset');
	}
}
