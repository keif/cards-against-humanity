import {Card} from "@/data/types";

export type CallbackType = (success: boolean, message: string) => void;

export interface GameInterface {
    ACardDeck: Card[];
    active: boolean;
    addNewPlayer: (name: string, sessionID: string) => void;
    endRound: (cb: CallbackType) => void;
    gameStartDate: Date;
    getLatestRound: () => RoundInterface | null;
    getPlayer: (sessionID: string) => PlayerInterface | null;
    getPlayerRoundState: (sessionID: string) => RoundInterface | null;
    judgeSelectCard: (sessionID: string, cardID: number, cb: CallbackType) => void;
    partyCode: string;
    playCard: (cardID: number, sessionID: string, cb: CallbackType) => void;
    players: { [index: string]: any };
    QCardDeck: Card[];
    roundLength: number;
    roundFinishedNotifier: CallbackType;
    rounds: RoundInterface[];
    roundsIdle: number; // if at least |this.players.length.length| roundsIdle, then game state is inactive
    roundTimer: null | ReturnType<typeof setTimeout>;
    shuffleCard: (sessionID: string, sourceIdx: number, destIdx: number, cb: CallbackType) => void;
}

export interface LobbyInterface {
    players: PlayerInterface[];
    currentPlayer: PlayerInterface | null;
}

export interface RoundInterface {
    active?: boolean;
    cards?: Card[];
    currentPlayerName?: string;
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
    winner?: string;
    winningCard?: Card | null;
}

export interface PlayerInterface {
    cards: Card[];
    name: string;
    pID: number;
    roundState: string;
    roundsWon: [];
    type: string;
}
