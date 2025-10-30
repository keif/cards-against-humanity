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
