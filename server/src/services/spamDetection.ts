import logger from '@/utils/logger';

/**
 * Spam Detection Service
 * Tracks recent submissions to detect and prevent spam patterns
 */

interface SubmissionRecord {
	text: string;
	normalizedText: string;
	timestamp: number;
	sessionId: string;
}

/**
 * In-memory storage for recent submissions
 * Key: sessionId, Value: array of recent submissions
 */
const recentSubmissions = new Map<string, SubmissionRecord[]>();

/**
 * Time window for similarity checking (5 minutes)
 */
const SIMILARITY_WINDOW_MS = 5 * 60 * 1000;

/**
 * Maximum submissions to track per session
 */
const MAX_TRACKED_PER_SESSION = 20;

/**
 * Similarity threshold (0-1, where 1 is identical)
 */
const SIMILARITY_THRESHOLD = 0.85;

/**
 * Normalize text for similarity comparison
 */
function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, '') // Remove special characters
		.replace(/\s+/g, ' ') // Collapse whitespace
		.trim();
}

/**
 * Calculate similarity between two strings using simple character-based approach
 * Returns a value between 0 and 1, where 1 means identical
 */
function calculateSimilarity(str1: string, str2: string): number {
	const s1 = normalizeText(str1);
	const s2 = normalizeText(str2);

	if (s1 === s2) return 1.0;

	// If one string is empty, they're completely different
	if (s1.length === 0 || s2.length === 0) return 0.0;

	// Calculate character overlap
	const maxLength = Math.max(s1.length, s2.length);
	const minLength = Math.min(s1.length, s2.length);

	// If length difference is too large, they're not similar
	if (maxLength / minLength > 2) return 0.0;

	// Count common characters (order-independent)
	const chars1 = s1.split('');
	const chars2 = s2.split('');
	let commonCount = 0;

	// Simple character overlap check
	for (const char of chars1) {
		const index = chars2.indexOf(char);
		if (index !== -1) {
			commonCount++;
			chars2.splice(index, 1); // Remove to avoid double-counting
		}
	}

	return commonCount / maxLength;
}

/**
 * Clean up old submissions from memory
 */
function cleanupOldSubmissions(): void {
	const now = Date.now();

	for (const [sessionId, submissions] of recentSubmissions.entries()) {
		// Remove submissions older than the window
		const filtered = submissions.filter(
			(sub) => now - sub.timestamp < SIMILARITY_WINDOW_MS
		);

		if (filtered.length === 0) {
			recentSubmissions.delete(sessionId);
		} else {
			recentSubmissions.set(sessionId, filtered);
		}
	}
}

/**
 * Check if a submission is similar to recent submissions
 */
export function checkForSimilarSubmissions(
	text: string,
	sessionId: string
): { isSimilar: boolean; similarText?: string; similarity?: number } {
	try {
		// Clean up old submissions periodically
		cleanupOldSubmissions();

		const normalizedNew = normalizeText(text);
		const sessionSubmissions = recentSubmissions.get(sessionId) || [];

		// Check each recent submission for similarity
		for (const submission of sessionSubmissions) {
			const similarity = calculateSimilarity(normalizedNew, submission.normalizedText);

			if (similarity >= SIMILARITY_THRESHOLD) {
				logger.info('Similar submission detected', {
					sessionId,
					similarity: similarity.toFixed(2),
					newText: text.substring(0, 50),
					existingText: submission.text.substring(0, 50)
				});

				return {
					isSimilar: true,
					similarText: submission.text,
					similarity
				};
			}
		}

		return { isSimilar: false };
	} catch (error) {
		logger.error('Error checking for similar submissions', {
			error: error instanceof Error ? error.message : String(error)
		});
		// Fail open - allow submission if error occurs
		return { isSimilar: false };
	}
}

/**
 * Record a successful submission
 */
export function recordSubmission(text: string, sessionId: string): void {
	try {
		const submission: SubmissionRecord = {
			text,
			normalizedText: normalizeText(text),
			timestamp: Date.now(),
			sessionId
		};

		const sessionSubmissions = recentSubmissions.get(sessionId) || [];
		sessionSubmissions.push(submission);

		// Keep only the most recent submissions
		if (sessionSubmissions.length > MAX_TRACKED_PER_SESSION) {
			sessionSubmissions.shift(); // Remove oldest
		}

		recentSubmissions.set(sessionId, sessionSubmissions);
	} catch (error) {
		logger.error('Error recording submission', {
			error: error instanceof Error ? error.message : String(error)
		});
	}
}

/**
 * Get submission stats for a session
 */
export function getSubmissionStats(sessionId: string): {
	recentCount: number;
	oldestTimestamp: number | null;
} {
	cleanupOldSubmissions();

	const submissions = recentSubmissions.get(sessionId) || [];
	return {
		recentCount: submissions.length,
		oldestTimestamp: submissions.length > 0 ? submissions[0].timestamp : null
	};
}

/**
 * Clear submissions for a session (useful for testing)
 */
export function clearSessionSubmissions(sessionId: string): void {
	recentSubmissions.delete(sessionId);
}

/**
 * Get total tracked sessions (for monitoring)
 */
export function getTrackedSessionCount(): number {
	cleanupOldSubmissions();
	return recentSubmissions.size;
}
