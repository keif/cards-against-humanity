import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Redis from 'ioredis';
import { VoteService } from './voteService';

describe('VoteService', () => {
	let redis: Redis;
	let voteService: VoteService;

	beforeEach(async () => {
		// Use in-memory Redis mock or real Redis for testing
		redis = new Redis();
		voteService = new VoteService(redis);

		// Clean up test data
		const keys = await redis.keys('vote:*');
		const voteKeys = await redis.keys('votes:*');
		const cardKeys = await redis.keys('cards:pending:*');

		if (keys.length > 0) await redis.del(...keys);
		if (voteKeys.length > 0) await redis.del(...voteKeys);
		if (cardKeys.length > 0) await redis.del(...cardKeys);
	});

	afterEach(async () => {
		// Clean up after each test
		const keys = await redis.keys('vote:*');
		const voteKeys = await redis.keys('votes:*');
		const cardKeys = await redis.keys('cards:pending:*');

		if (keys.length > 0) await redis.del(...keys);
		if (voteKeys.length > 0) await redis.del(...voteKeys);
		if (cardKeys.length > 0) await redis.del(...cardKeys);

		await redis.quit();
	});

	describe('castVote', () => {
		it('should cast an upvote successfully', async () => {
			const stats = await voteService.castVote(123, 'session-1', 'up');

			expect(stats.upvotes).toBe(1);
			expect(stats.downvotes).toBe(0);
			expect(stats.duplicateFlags).toBe(0);
			expect(stats.netScore).toBe(1);
		});

		it('should cast a downvote successfully', async () => {
			const stats = await voteService.castVote(123, 'session-1', 'down');

			expect(stats.upvotes).toBe(0);
			expect(stats.downvotes).toBe(1);
			expect(stats.duplicateFlags).toBe(0);
			expect(stats.netScore).toBe(-1);
		});

		it('should cast a duplicate flag successfully', async () => {
			const stats = await voteService.castVote(123, 'session-1', 'duplicate');

			expect(stats.upvotes).toBe(0);
			expect(stats.downvotes).toBe(0);
			expect(stats.duplicateFlags).toBe(1);
			expect(stats.netScore).toBe(0);
		});

		it('should handle multiple votes from different sessions', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'up');
			const stats = await voteService.castVote(123, 'session-3', 'down');

			expect(stats.upvotes).toBe(2);
			expect(stats.downvotes).toBe(1);
			expect(stats.netScore).toBe(1);
		});

		it('should change vote when user votes again', async () => {
			// First vote up
			await voteService.castVote(123, 'session-1', 'up');
			let stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(1);
			expect(stats.downvotes).toBe(0);

			// Change to down
			stats = await voteService.castVote(123, 'session-1', 'down');
			expect(stats.upvotes).toBe(0);
			expect(stats.downvotes).toBe(1);
			expect(stats.netScore).toBe(-1);
		});

		it('should prevent duplicate votes from same session', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-1', 'up'); // Vote again

			const stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(1); // Should still be 1
		});

		it('should update sorted sets for moderation', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'up');
			await voteService.castVote(123, 'session-3', 'up');

			// Check that card was added to sorted sets
			const byUpvotes = await redis.zscore('cards:pending:by_upvotes', 123);
			expect(byUpvotes).toBe('3');

			const byNetScore = await redis.zscore('cards:pending:by_net_score', 123);
			expect(byNetScore).toBe('3');
		});

		it('should track duplicate flags in set', async () => {
			await voteService.castVote(123, 'session-1', 'duplicate');

			const isDuplicate = await redis.sismember('cards:pending:with_duplicate_flags', 123);
			expect(isDuplicate).toBe(1);
		});

		it('should record user vote for lookup', async () => {
			await voteService.castVote(123, 'session-1', 'up');

			const userVote = await redis.hgetall('votes:user:session-1:123');
			expect(userVote.voteType).toBe('up');
			expect(userVote.votedAt).toBeDefined();
		});
	});

	describe('removeVote', () => {
		it('should remove a vote', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.removeVote(123, 'session-1');

			const stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(0);
		});

		it('should update stats after removing vote', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'up');
			await voteService.removeVote(123, 'session-1');

			const stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(1);
			expect(stats.netScore).toBe(1);
		});

		it('should remove user vote history', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.removeVote(123, 'session-1');

			const userVote = await redis.hgetall('votes:user:session-1:123');
			expect(Object.keys(userVote).length).toBe(0);
		});
	});

	describe('getVoteStats', () => {
		it('should return zero stats for card with no votes', async () => {
			const stats = await voteService.getVoteStats(999);

			expect(stats.upvotes).toBe(0);
			expect(stats.downvotes).toBe(0);
			expect(stats.duplicateFlags).toBe(0);
			expect(stats.netScore).toBe(0);
		});

		it('should return correct stats for voted card', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'up');
			await voteService.castVote(123, 'session-3', 'down');

			const stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(2);
			expect(stats.downvotes).toBe(1);
			expect(stats.netScore).toBe(1);
		});
	});

	describe('getUserVote', () => {
		it('should return no vote for user who hasnt voted', async () => {
			const userVote = await voteService.getUserVote(123, 'session-1');

			expect(userVote.voted).toBe(false);
			expect(userVote.voteType).toBeUndefined();
		});

		it('should return users upvote', async () => {
			await voteService.castVote(123, 'session-1', 'up');

			const userVote = await voteService.getUserVote(123, 'session-1');
			expect(userVote.voted).toBe(true);
			expect(userVote.voteType).toBe('up');
		});

		it('should return users downvote', async () => {
			await voteService.castVote(123, 'session-1', 'down');

			const userVote = await voteService.getUserVote(123, 'session-1');
			expect(userVote.voted).toBe(true);
			expect(userVote.voteType).toBe('down');
		});

		it('should return users duplicate flag', async () => {
			await voteService.castVote(123, 'session-1', 'duplicate');

			const userVote = await voteService.getUserVote(123, 'session-1');
			expect(userVote.voted).toBe(true);
			expect(userVote.voteType).toBe('duplicate');
		});
	});

	describe('getBulkVoteStats', () => {
		it('should return empty map for empty array', async () => {
			const stats = await voteService.getBulkVoteStats([]);
			expect(stats.size).toBe(0);
		});

		it('should return stats for multiple cards', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(456, 'session-1', 'down');
			await voteService.castVote(789, 'session-1', 'duplicate');

			const stats = await voteService.getBulkVoteStats([123, 456, 789]);

			expect(stats.size).toBe(3);
			expect(stats.get(123)?.upvotes).toBe(1);
			expect(stats.get(456)?.downvotes).toBe(1);
			expect(stats.get(789)?.duplicateFlags).toBe(1);
		});

		it('should return zero stats for cards with no votes', async () => {
			await voteService.castVote(123, 'session-1', 'up');

			const stats = await voteService.getBulkVoteStats([123, 456, 789]);

			expect(stats.size).toBe(3);
			expect(stats.get(123)?.upvotes).toBe(1);
			expect(stats.get(456)?.upvotes).toBe(0);
			expect(stats.get(789)?.upvotes).toBe(0);
		});
	});

	describe('cleanupVoteData', () => {
		it('should remove all vote data for a card', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'down');
			await voteService.castVote(123, 'session-3', 'duplicate');

			await voteService.cleanupVoteData(123);

			// Check that all vote sets are gone
			const upvotes = await redis.scard('vote:123:up');
			const downvotes = await redis.scard('vote:123:down');
			const duplicateFlags = await redis.scard('vote:123:duplicate');

			expect(upvotes).toBe(0);
			expect(downvotes).toBe(0);
			expect(duplicateFlags).toBe(0);

			// Check that stats are gone
			const stats = await redis.hgetall('vote:stats:123');
			expect(Object.keys(stats).length).toBe(0);

			// Check that sorted sets are updated
			const byUpvotes = await redis.zscore('cards:pending:by_upvotes', 123);
			expect(byUpvotes).toBeNull();
		});

		it('should not affect other cards', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(456, 'session-1', 'up');

			await voteService.cleanupVoteData(123);

			const stats456 = await voteService.getVoteStats(456);
			expect(stats456.upvotes).toBe(1);
		});
	});

	describe('complex scenarios', () => {
		it('should handle controversial card correctly', async () => {
			// Simulate a controversial card with many up and down votes
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'up');
			await voteService.castVote(123, 'session-3', 'up');
			await voteService.castVote(123, 'session-4', 'down');
			await voteService.castVote(123, 'session-5', 'down');

			const stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(3);
			expect(stats.downvotes).toBe(2);
			expect(stats.netScore).toBe(1);

			// Check controversial score
			const controversialScore = await redis.zscore('cards:pending:by_controversial', 123);
			expect(controversialScore).toBe('5'); // 3 + 2
		});

		it('should handle vote changes correctly', async () => {
			// User votes up, then down, then duplicate, then removes vote
			await voteService.castVote(123, 'session-1', 'up');
			let stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(1);

			await voteService.castVote(123, 'session-1', 'down');
			stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(0);
			expect(stats.downvotes).toBe(1);

			await voteService.castVote(123, 'session-1', 'duplicate');
			stats = await voteService.getVoteStats(123);
			expect(stats.downvotes).toBe(0);
			expect(stats.duplicateFlags).toBe(1);

			await voteService.removeVote(123, 'session-1');
			stats = await voteService.getVoteStats(123);
			expect(stats.duplicateFlags).toBe(0);
		});

		it('should calculate net score correctly with mixed votes', async () => {
			await voteService.castVote(123, 'session-1', 'up');
			await voteService.castVote(123, 'session-2', 'up');
			await voteService.castVote(123, 'session-3', 'up');
			await voteService.castVote(123, 'session-4', 'up');
			await voteService.castVote(123, 'session-5', 'down');
			await voteService.castVote(123, 'session-6', 'duplicate');

			const stats = await voteService.getVoteStats(123);
			expect(stats.upvotes).toBe(4);
			expect(stats.downvotes).toBe(1);
			expect(stats.duplicateFlags).toBe(1);
			expect(stats.netScore).toBe(3); // 4 - 1
		});
	});
});
