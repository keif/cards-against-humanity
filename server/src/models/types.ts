import {Card} from "@/data/types";

export type CallbackType = (success: boolean, message: string) => void;

// Game Configuration Types
export interface GameConfig {
	winningScore: number; // Points needed to win (default: 10)
	handSize: number; // Cards per player (default: 10)
	roundTimer?: number; // seconds, undefined = no timer (default: undefined)
	enabledRules: {
		rebootingTheUniverse: boolean; // Discard hand and draw new cards
		packingHeat: boolean; // Draw extra card before multi-choice cards
		happyEnding: boolean; // End game with "Make a Haiku" card
		neverHaveIEver: boolean; // Discard cards you don't understand
		godIsDead: boolean; // Play without Card Czar
		survivalOfTheFittest: boolean; // First player submits wins
		seriousBusiness: boolean; // Point penalties for terrible answers
	};
}

export const DEFAULT_GAME_CONFIG: GameConfig = {
	winningScore: 10,
	handSize: 10,
	roundTimer: undefined,
	enabledRules: {
		rebootingTheUniverse: false,
		packingHeat: false,
		happyEnding: false,
		neverHaveIEver: false,
		godIsDead: false,
		survivalOfTheFittest: false,
		seriousBusiness: false,
	},
};

export interface GameInterface {
    ACardDeck: Card[];
    active: boolean;
    addNewPlayer: (name: string, sessionID: string) => void;
    discardCard: (sessionID: string, cardID: number, cb: CallbackType) => void;
    endGameWithHaiku: (sessionID: string, cb: CallbackType) => void;
    endRound: (cb: CallbackType) => void;
    gameConfig: GameConfig;
    gameStartDate: Date;
    getLatestRound: () => RoundInterface | null;
    getPlayer: (sessionID: string) => PlayerInterface | null;
    getPlayerRoundState: (sessionID: string) => RoundInterface | null;
    judgeSelectCard: (sessionID: string, cardID: number, cb: CallbackType) => void;
    partyCode: string;
    playCard: (cardIDs: number | number[], sessionID: string, cb: CallbackType) => void;
    players: { [index: string]: any };
    QCardDeck: Card[];
    rebootHand: (sessionID: string, cb: CallbackType) => void;
    roundLength: number;
    roundFinishedNotifier: CallbackType;
    rounds: RoundInterface[];
    roundsIdle: number; // if at least |this.players.length.length| roundsIdle, then game state is inactive
    roundTimer: null | ReturnType<typeof setTimeout>;
    setRoundFinishedNotifier: (cb: CallbackType) => void;
    shuffleCard: (sessionID: string, sourceIdx: number, destIdx: number, cb: CallbackType) => void;
}

export interface LobbyInterface {
    players: string[];
    currentPlayer: PlayerInterface | null;
}

export interface RoundInterface {
    active?: boolean;
    cards?: Card[];
    currentPlayerName?: string;
    gameConfig?: GameConfig;
    gameStartDate?: Date;
    otherPlayerCards: Card[] | undefined;
    partyCode?: string;
    playerChoice?: Card | null;
    players?: { [key: string]: PlayerInterface };
    QCard?: Card;
    QCardDeck?: Card[];
    roundEndTime?: Date;
    roundFinishedNotifier?: () => void;
    roundJudge: PlayerInterface | null | undefined;
    roundLength?: number;
    roundNum?: number;
    roundRole?: string;
    rounds?: RoundInterface[];
    roundsIdle?: number;
    roundStartTime?: Date;
    roundState?: string;
    roundTimer?: number;
    timeLeft?: number;
    votes?: { [sessionID: string]: number }; // God is Dead: map of sessionID -> cardID votes
    eliminationVotes?: { [sessionID: string]: number }; // Survival of the Fittest: votes to eliminate
    eliminatedCards?: number[]; // Survival of the Fittest: eliminated card IDs
    eliminationRound?: number; // Survival of the Fittest: current elimination round number
    winner?: string;
    winningCard?: Card | null;
    winningCards?: Card[] | null; // All cards from winning player (for multi-card submissions)
    playerScores?: Array<{ name: string; score: number; pID: number }>;
}

export interface PlayerInterface {
    cards: Card[];
    name: string;
    pID: number;
    roundState: string;
    roundsWon: [];
    type: string;
}
