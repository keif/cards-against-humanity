import { Redis } from 'ioredis';
import logger from '@/utils/logger';

/**
 * Vote statistics for a card
 */
export interface VoteStats {
	upvotes: number;
	downvotes: number;
	duplicateFlags: number;
	netScore: number;
}

/**
 * User's vote on a card
 */
export interface UserVote {
	voted: boolean;
	voteType?: 'up' | 'down' | 'duplicate';
}

/**
 * Vote Service
 *
 * Manages community voting on pending user-submitted cards.
 *
 * Redis Data Structures:
 * - vote:{cardId}:up -> Set of sessionIDs who upvoted
 * - vote:{cardId}:down -> Set of sessionIDs who downvoted
 * - vote:{cardId}:duplicate -> Set of sessionIDs who flagged as duplicate
 * - vote:stats:{cardId} -> Hash with denormalized vote counts
 * - cards:pending:by_upvotes -> Sorted Set (score = upvotes)
 * - cards:pending:by_net_score -> Sorted Set (score = net_score)
 * - cards:pending:by_controversial -> Sorted Set (score = upvotes + downvotes)
 * - cards:pending:with_duplicate_flags -> Set of cardIds with duplicate flags
 */
export class VoteService {
	private redis: Redis;

	constructor(redis: Redis) {
		this.redis = redis;
	}

	/**
	 * Cast a vote on a card
	 * If user already voted, their previous vote is removed
	 */
	async castVote(
		cardId: number,
		sessionId: string,
		voteType: 'up' | 'down' | 'duplicate'
	): Promise<VoteStats> {
		logger.info('Casting vote', { cardId, sessionId, voteType });

		// Remove previous vote if exists
		await this.removeVote(cardId, sessionId);

		// Add new vote
		await this.redis.sadd(`vote:${cardId}:${voteType}`, sessionId);

		// Record user's vote for quick lookup
		await this.redis.hset(`votes:user:${sessionId}:${cardId}`, {
			voteType,
			votedAt: Date.now()
		});

		// Update denormalized stats
		const stats = await this.updateVoteStats(cardId);

		// Update sorted sets for moderator filtering
		await this.updateSortedSets(cardId, stats);

		logger.info('Vote cast successfully', { cardId, sessionId, voteType, stats });

		return stats;
	}

	/**
	 * Remove a user's vote on a card
	 */
	async removeVote(cardId: number, sessionId: string): Promise<void> {
		// Check all vote types and remove
		const types: Array<'up' | 'down' | 'duplicate'> = ['up', 'down', 'duplicate'];
		const pipeline = this.redis.pipeline();

		for (const type of types) {
			pipeline.srem(`vote:${cardId}:${type}`, sessionId);
		}

		// Remove from user vote history
		pipeline.del(`votes:user:${sessionId}:${cardId}`);

		await pipeline.exec();

		// Update stats after removing vote
		const stats = await this.updateVoteStats(cardId);
		await this.updateSortedSets(cardId, stats);
	}

	/**
	 * Get vote statistics for a card
	 */
	async getVoteStats(cardId: number): Promise<VoteStats> {
		const stats = await this.redis.hgetall(`vote:stats:${cardId}`);

		if (!stats || Object.keys(stats).length === 0) {
			// No stats yet, calculate from sets
			return this.calculateVoteStats(cardId);
		}

		return {
			upvotes: Number(stats.upvotes || 0),
			downvotes: Number(stats.downvotes || 0),
			duplicateFlags: Number(stats.duplicateFlags || 0),
			netScore: Number(stats.netScore || 0)
		};
	}

	/**
	 * Get user's vote on a card
	 */
	async getUserVote(cardId: number, sessionId: string): Promise<UserVote> {
		const userVote = await this.redis.hgetall(`votes:user:${sessionId}:${cardId}`);

		if (!userVote || !userVote.voteType) {
			return { voted: false };
		}

		return {
			voted: true,
			voteType: userVote.voteType as 'up' | 'down' | 'duplicate'
		};
	}

	/**
	 * Get vote stats for multiple cards (bulk operation)
	 */
	async getBulkVoteStats(cardIds: number[]): Promise<Map<number, VoteStats>> {
		if (cardIds.length === 0) {
			return new Map();
		}

		const pipeline = this.redis.pipeline();
		cardIds.forEach(id => pipeline.hgetall(`vote:stats:${id}`));

		const results = await pipeline.exec();
		const statsMap = new Map<number, VoteStats>();

		if (!results) {
			return statsMap;
		}

		results.forEach(([err, data], index) => {
			const cardId = cardIds[index];
			if (err || !data || Object.keys(data).length === 0) {
				statsMap.set(cardId, {
					upvotes: 0,
					downvotes: 0,
					duplicateFlags: 0,
					netScore: 0
				});
			} else {
				const stats = data as any;
				statsMap.set(cardId, {
					upvotes: Number(stats.upvotes || 0),
					downvotes: Number(stats.downvotes || 0),
					duplicateFlags: Number(stats.duplicateFlags || 0),
					netScore: Number(stats.netScore || 0)
				});
			}
		});

		return statsMap;
	}

	/**
	 * Clean up vote data when card is moderated
	 */
	async cleanupVoteData(cardId: number): Promise<void> {
		logger.info('Cleaning up vote data', { cardId });

		const pipeline = this.redis.pipeline();

		// Delete vote sets
		pipeline.del(`vote:${cardId}:up`);
		pipeline.del(`vote:${cardId}:down`);
		pipeline.del(`vote:${cardId}:duplicate`);

		// Delete vote stats
		pipeline.del(`vote:stats:${cardId}`);

		// Remove from sorted sets
		pipeline.zrem('cards:pending:by_upvotes', cardId);
		pipeline.zrem('cards:pending:by_net_score', cardId);
		pipeline.zrem('cards:pending:by_controversial', cardId);
		pipeline.srem('cards:pending:with_duplicate_flags', cardId);

		await pipeline.exec();

		logger.info('Vote data cleaned up', { cardId });
	}

	/**
	 * Calculate vote stats from Redis sets (used when stats don't exist)
	 */
	private async calculateVoteStats(cardId: number): Promise<VoteStats> {
		const [upvotes, downvotes, duplicateFlags] = await Promise.all([
			this.redis.scard(`vote:${cardId}:up`),
			this.redis.scard(`vote:${cardId}:down`),
			this.redis.scard(`vote:${cardId}:duplicate`)
		]);

		const netScore = upvotes - downvotes;

		return { upvotes, downvotes, duplicateFlags, netScore };
	}

	/**
	 * Update denormalized vote stats in Redis
	 */
	private async updateVoteStats(cardId: number): Promise<VoteStats> {
		const stats = await this.calculateVoteStats(cardId);

		await this.redis.hset(`vote:stats:${cardId}`, {
			upvotes: stats.upvotes,
			downvotes: stats.downvotes,
			duplicateFlags: stats.duplicateFlags,
			netScore: stats.netScore,
			lastVoteAt: Date.now()
		});

		return stats;
	}

	/**
	 * Update sorted sets for moderator filtering
	 */
	private async updateSortedSets(cardId: number, stats: VoteStats): Promise<void> {
		const pipeline = this.redis.pipeline();

		// Update sort by upvotes
		pipeline.zadd('cards:pending:by_upvotes', stats.upvotes, cardId);

		// Update sort by net score
		pipeline.zadd('cards:pending:by_net_score', stats.netScore, cardId);

		// Update sort by controversial (upvotes + downvotes)
		const controversial = stats.upvotes + stats.downvotes;
		pipeline.zadd('cards:pending:by_controversial', controversial, cardId);

		// Add to/remove from duplicate flags set
		if (stats.duplicateFlags > 0) {
			pipeline.sadd('cards:pending:with_duplicate_flags', cardId);
		} else {
			pipeline.srem('cards:pending:with_duplicate_flags', cardId);
		}

		await pipeline.exec();
	}
}
