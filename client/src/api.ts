import { RoundInterface } from "@/Screens/PlayerSelectionScreen/PlayerSelectionScreen";
import {
	CallbackType,
	LobbyStateResponse,
	CommunityCardsResponse,
	VoteType,
	VoteStats,
	UserVote,
	SortOption,
	CardTypeFilter,
	ModeratorStats,
	BatchOperationResult,
	RejectionReason
} from "@/types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

// Initialize session via HTTP request before connecting socket
// This ensures the session cookie is set before Socket.IO connects
let sessionInitialized = false;
const initializeSession = async () => {
	if (sessionInitialized) return;
	try {
		const response = await fetch(`${SERVER_URL}/session`, {
			credentials: 'include', // Send and receive cookies
			headers: {
				'Accept': 'application/json'
			}
		});
		const data = await response.json();
		console.log('🔑 Session initialized:', data.sessionID);
		sessionInitialized = true;
	} catch (error) {
		console.error('❌ Failed to initialize session:', error);
	}
};

// Lazy-load socket.io-client only when needed
let realSocket: any = null;
let initPromise: Promise<void> | null = null;

// Create a proxy that queues operations until the real socket is initialized
const socket = new Proxy({} as any, {
	get(_target, prop) {
		// If real socket exists, use it directly
		if (realSocket) {
			return realSocket[prop];
		}

		// For methods, return a function that queues the operation
		if (typeof prop === 'string' && ['emit', 'on', 'off', 'connect'].includes(prop)) {
			return (...args: any[]) => {
				// Start initialization if not already started
				if (!initPromise) {
					initPromise = initializeSocketConnection();
				}

				// If socket is ready, call immediately
				if (realSocket) {
					return realSocket[prop](...args);
				}

				// Otherwise, queue until ready
				initPromise.then(() => {
					if (realSocket) {
						realSocket[prop](...args);
					}
				});
			};
		}

		// For properties, return undefined or queue access
		return realSocket?.[prop];
	}
});

async function initializeSocketConnection() {
	// Dynamic import of socket.io-client (lazy-loaded)
	const { default: openSocket } = await import('socket.io-client');

	// Initialize session first
	await initializeSession();

	// Configure socket with credentials to enable cookie-based sessions
	realSocket = openSocket(SERVER_URL, {
		transports: ['polling', 'websocket'], // Start with polling to establish session, then upgrade to websocket
		withCredentials: true, // Enable sending cookies
		autoConnect: true
	});

	// Set up event listeners
	realSocket.on("connect", () => {
		console.log('✅ Connected to server with socket ID:', realSocket.id);
	});

	realSocket.on("connect_error", (err: any) => {
		console.error('❌ Connection error:', err.message);
	});

	realSocket.on("disconnect", (reason: any) => {
		console.log('🔌 Disconnected:', reason);
	});

	realSocket.on("error", (error: { message: string }) => {
		console.error('⚠️  Server error:', error.message);
	});
}

// StartGameScreen
export function joinParty({ partyCode, name }: { partyCode: string; name: string }) {
	socket.emit('joinParty', { partyCode, name });
}

export function getLobbyState(partyCode: string, cb: (response: LobbyStateResponse) => void) {
	socket.emit('getLobbyState', partyCode);
	socket.on('getLobbyState', (response: LobbyStateResponse) => cb(response));
}

export function newLobbyState(partyCode: string) {
	socket.on('newLobbyState', () => {
		socket.emit('getLobbyState', partyCode);
	});
}

export function startGame(partyCode: string) {
	socket.emit('startGame', partyCode);
}

export function onGameStarted(cb: (data: { partyCode: string }) => void) {
	socket.on('gameStarted', cb);
}

export function offGameStarted() {
	socket.off('gameStarted');
}

// PlayerSelectionScreen

export function getPlayerRoundState(partyCode: string, cb: (roundState: RoundInterface | null) => void) {
	socket.emit('getPlayerRoundState', partyCode);
	socket.on('getPlayerRoundState', (roundState: RoundInterface | null) => cb(roundState));
}

export function newGameState(partyCode: string) {
	socket.on('newGameState', () => {
		socket.emit('getPlayerRoundState', partyCode);
	});
}

export function playCard(partyCode: string, cardIDs: number | number[]) {
	socket.emit('playCard', partyCode, cardIDs);
}

export function judgeSelectCard(partyCode: string, cardID: number) {
	socket.emit('judgeSelectCard', partyCode, cardID);
}

export function shuffleCards(partyCode: string, sourceIdx: number, destIdx: number) {
	socket.emit('shuffleCards', partyCode, sourceIdx, destIdx);
}

export function endRound(partyCode: string) {
	socket.emit('endRound', partyCode);
}

// Community Voting API

/**
 * Fetch community cards with voting data
 * @param options - Filter and pagination options
 * @returns Promise with cards and metadata
 */
export async function getCommunityCards(options: {
	type?: CardTypeFilter;
	sort?: SortOption;
	limit?: number;
	offset?: number;
}): Promise<CommunityCardsResponse> {
	const params = new URLSearchParams();
	if (options.type) params.append('type', options.type);
	if (options.sort) params.append('sort', options.sort);
	if (options.limit) params.append('limit', options.limit.toString());
	if (options.offset) params.append('offset', options.offset.toString());

	const response = await fetch(`${SERVER_URL}/api/cards/community?${params.toString()}`, {
		credentials: 'include',
		headers: {
			'Accept': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch community cards');
	}

	return response.json();
}

/**
 * Cast a vote on a card
 * @param cardId - Card ID to vote on
 * @param voteType - Type of vote ('up', 'down', 'duplicate')
 * @returns Promise with updated vote stats
 */
export async function castVote(cardId: number, voteType: VoteType): Promise<VoteStats> {
	const response = await fetch(`${SERVER_URL}/api/cards/${cardId}/vote`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ voteType })
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to cast vote');
	}

	const data = await response.json();
	return data.votes;
}

/**
 * Remove your vote from a card
 * @param cardId - Card ID to remove vote from
 * @returns Promise with updated vote stats
 */
export async function removeVote(cardId: number): Promise<VoteStats> {
	const response = await fetch(`${SERVER_URL}/api/cards/${cardId}/vote`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Accept': 'application/json'
		}
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || 'Failed to remove vote');
	}

	const data = await response.json();
	return data.votes;
}

/**
 * Check if you've voted on a card
 * @param cardId - Card ID to check
 * @returns Promise with user vote status
 */
export async function getUserVote(cardId: number): Promise<UserVote> {
	const response = await fetch(`${SERVER_URL}/api/cards/${cardId}/my-vote`, {
		credentials: 'include',
		headers: {
			'Accept': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error('Failed to get user vote');
	}

	return response.json();
}

/**
 * Subscribe to real-time vote updates
 * @param callback - Function called when vote is updated
 */
export function onVoteUpdated(callback: (data: { cardId: number; votes: VoteStats }) => void) {
	socket.on('voteUpdated', callback);
}

/**
 * Unsubscribe from vote updates
 */
export function offVoteUpdated() {
	socket.off('voteUpdated');
}

/**
 * Subscribe to new card submissions
 * @param callback - Function called when new card submitted
 */
export function onCardSubmitted(callback: (data: { cardId: number }) => void) {
	socket.on('cardSubmitted', callback);
}

/**
 * Unsubscribe from card submission updates
 */
export function offCardSubmitted() {
	socket.off('cardSubmitted');
}

// Moderator API

/**
 * Promote current user to moderator role
 * @param adminKey - Admin key for authentication
 * @returns Promise with promotion result
 */
export async function promoteToModerator(adminKey: string): Promise<{ success: boolean; message: string }> {
	const response = await fetch(`${SERVER_URL}/api/cards/auth/promote`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ adminKey })
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to promote to moderator');
	}

	return response.json();
}

/**
 * Get moderation statistics
 * @returns Promise with moderator stats
 */
export async function getModeratorStats(): Promise<ModeratorStats> {
	const response = await fetch(`${SERVER_URL}/api/cards/moderator/stats`, {
		credentials: 'include',
		headers: {
			'Accept': 'application/json'
		}
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to fetch moderator stats');
	}

	const data = await response.json();
	return data.stats; // Unwrap stats from { success: true, stats: {...} }
}

/**
 * Batch approve cards
 * @param cardIds - Array of card IDs to approve
 * @returns Promise with batch operation result
 */
export async function batchApproveCards(cardIds: number[]): Promise<BatchOperationResult> {
	const response = await fetch(`${SERVER_URL}/api/cards/moderator/batch-approve`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ cardIds })
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to approve cards');
	}

	return response.json();
}

/**
 * Batch reject cards
 * @param cardIds - Array of card IDs to reject
 * @param reason - Rejection reason
 * @param customReason - Optional custom reason text
 * @returns Promise with batch operation result
 */
export async function batchRejectCards(
	cardIds: number[],
	reason: RejectionReason,
	customReason?: string
): Promise<BatchOperationResult> {
	const response = await fetch(`${SERVER_URL}/api/cards/moderator/batch-reject`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ cardIds, reason, customReason })
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Failed to reject cards');
	}

	return response.json();
}

/**
 * Subscribe to card moderation events (approval/rejection)
 * @param callback - Function called when card is moderated
 */
export function onCardModerated(callback: (data: { cardId: number; status: string }) => void) {
	socket.on('cardModerated', callback);
}

/**
 * Unsubscribe from card moderation events
 */
export function offCardModerated() {
	socket.off('cardModerated');
}
