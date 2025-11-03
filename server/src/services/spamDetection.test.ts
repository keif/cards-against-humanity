import { describe, it, expect, beforeEach } from 'vitest';
import {
	checkForSimilarSubmissions,
	recordSubmission,
	getSubmissionStats,
	clearSessionSubmissions
} from './spamDetection';

describe('Spam Detection Service', () => {
	const sessionId = 'test-session-123';

	beforeEach(() => {
		// Clear submissions before each test
		clearSessionSubmissions(sessionId);
	});

	describe('checkForSimilarSubmissions', () => {
		it('should return false for first submission', () => {
			const result = checkForSimilarSubmissions('Test card text', sessionId);

			expect(result.isSimilar).toBe(false);
		});

		it('should detect identical submissions', () => {
			const text = 'Test card text';

			// First submission
			recordSubmission(text, sessionId);

			// Try to submit identical card
			const result = checkForSimilarSubmissions(text, sessionId);

			expect(result.isSimilar).toBe(true);
			expect(result.similarity).toBeGreaterThan(0.9);
		});

		it('should detect similar submissions with different casing', () => {
			recordSubmission('Test Card Text', sessionId);

			const result = checkForSimilarSubmissions('test card text', sessionId);

			expect(result.isSimilar).toBe(true);
		});

		it('should detect similar submissions with extra whitespace', () => {
			recordSubmission('Test card text', sessionId);

			const result = checkForSimilarSubmissions('Test   card   text', sessionId);

			expect(result.isSimilar).toBe(true);
		});

		it('should detect similar submissions with punctuation differences', () => {
			recordSubmission('Test card text!', sessionId);

			const result = checkForSimilarSubmissions('Test card text', sessionId);

			expect(result.isSimilar).toBe(true);
		});

		it('should allow completely different submissions', () => {
			recordSubmission('Test card text', sessionId);

			const result = checkForSimilarSubmissions('Completely different card', sessionId);

			expect(result.isSimilar).toBe(false);
		});

		it('should allow submissions with minor differences', () => {
			recordSubmission('A large black cat', sessionId);

			const result = checkForSimilarSubmissions('A large white cat', sessionId);

			// Should not be flagged as similar (only one word different)
			expect(result.isSimilar).toBe(false);
		});

		it('should isolate submissions by session', () => {
			const session1 = 'session-1';
			const session2 = 'session-2';

			recordSubmission('Test card', session1);

			// Session 2 should not see session 1's submissions
			const result = checkForSimilarSubmissions('Test card', session2);

			expect(result.isSimilar).toBe(false);
		});

		it('should track multiple submissions per session', () => {
			recordSubmission('First card', sessionId);
			recordSubmission('Second card', sessionId);
			recordSubmission('Third card', sessionId);

			// Should detect similarity with any of them
			const result1 = checkForSimilarSubmissions('First card', sessionId);
			const result2 = checkForSimilarSubmissions('Second card', sessionId);
			const result3 = checkForSimilarSubmissions('Third card', sessionId);

			expect(result1.isSimilar).toBe(true);
			expect(result2.isSimilar).toBe(true);
			expect(result3.isSimilar).toBe(true);
		});
	});

	describe('recordSubmission', () => {
		it('should record a submission', () => {
			recordSubmission('Test card', sessionId);

			const stats = getSubmissionStats(sessionId);
			expect(stats.recentCount).toBe(1);
		});

		it('should record multiple submissions', () => {
			recordSubmission('Card 1', sessionId);
			recordSubmission('Card 2', sessionId);
			recordSubmission('Card 3', sessionId);

			const stats = getSubmissionStats(sessionId);
			expect(stats.recentCount).toBe(3);
		});

		it('should handle recording same card multiple times', () => {
			const text = 'Same card';

			recordSubmission(text, sessionId);
			recordSubmission(text, sessionId);
			recordSubmission(text, sessionId);

			const stats = getSubmissionStats(sessionId);
			expect(stats.recentCount).toBe(3);
		});
	});

	describe('getSubmissionStats', () => {
		it('should return zero for session with no submissions', () => {
			const stats = getSubmissionStats(sessionId);

			expect(stats.recentCount).toBe(0);
			expect(stats.oldestTimestamp).toBeNull();
		});

		it('should return correct count for session with submissions', () => {
			recordSubmission('Card 1', sessionId);
			recordSubmission('Card 2', sessionId);

			const stats = getSubmissionStats(sessionId);

			expect(stats.recentCount).toBe(2);
			expect(stats.oldestTimestamp).toBeTypeOf('number');
			expect(stats.oldestTimestamp).toBeGreaterThan(0);
		});
	});

	describe('clearSessionSubmissions', () => {
		it('should clear all submissions for a session', () => {
			recordSubmission('Card 1', sessionId);
			recordSubmission('Card 2', sessionId);

			clearSessionSubmissions(sessionId);

			const stats = getSubmissionStats(sessionId);
			expect(stats.recentCount).toBe(0);
		});

		it('should not affect other sessions', () => {
			const session1 = 'session-1';
			const session2 = 'session-2';

			recordSubmission('Card 1', session1);
			recordSubmission('Card 2', session2);

			clearSessionSubmissions(session1);

			const stats1 = getSubmissionStats(session1);
			const stats2 = getSubmissionStats(session2);

			expect(stats1.recentCount).toBe(0);
			expect(stats2.recentCount).toBe(1);
		});
	});
});
