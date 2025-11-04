import { CardProps } from './components/Card/Card';

export type CallbackType = (message: string) => void;

export const ItemTypes = {
	CARD: 'card',
}

// Drag and Drop Types
export interface DraggedCard {
	id: number;
	type?: string;
}

// API Response Types
export interface LobbyStateResponse {
	currentPlayer: {
		name: string;
		pID: number;
	} | null;
	players: string[];
}

export interface PlayerInfo {
	cards: CardProps[];
	name: string;
	pID: number;
	roundState: string;
	roundsWon: number[];
	type: string;
}

// Community Voting Types
export type VoteType = 'up' | 'down' | 'duplicate';
export type SortOption = 'newest' | 'oldest' | 'upvoted' | 'controversial';
export type CardTypeFilter = 'all' | 'A' | 'Q';

export interface VoteStats {
	upvotes: number;
	downvotes: number;
	duplicateFlags: number;
	netScore: number;
}

export interface UserVote {
	voted: boolean;
	voteType?: VoteType;
}

export interface PendingCard {
	id: number;
	text: string;
	cardType: 'A' | 'Q';
	createdAt: string;
	votes?: VoteStats;
}

export interface CommunityCardsResponse {
	cards: PendingCard[];
	total: number;
	hasMore: boolean;
}

// Moderator Types
export interface ModeratorStats {
	pending: {
		total: number;
		answerCards: number;
		questionCards: number;
	};
	approved: {
		total: number;
		answerCards: number;
		questionCards: number;
	};
	totalSubmissions: number;
	approvalRate: number;
}

export interface BatchOperationResult {
	success: boolean;
	processed: number;
	failed: number;
	errors?: Array<{ cardId: number; error: string }>;
}

export type RejectionReason = 'inappropriate' | 'duplicate' | 'low-quality' | 'other';
