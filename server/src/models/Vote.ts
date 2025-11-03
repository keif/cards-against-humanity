import { VoteService } from '@/services/voteService';
import logger from '@/utils/logger';

// Singleton VoteService instance (set during server initialization)
let voteService: VoteService | null = null;

/**
 * Initialize the vote service with a Redis client
 */
export function initializeVoteService(service: VoteService): void {
	voteService = service;
	logger.info('Vote model initialized with VoteService');
}

/**
 * Get the VoteService instance
 */
export function getVoteService(): VoteService | null {
	return voteService;
}
