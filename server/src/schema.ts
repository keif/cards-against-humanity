import Game from './models/Game';
import { CallbackType, GameInterface, LobbyInterface, RoundInterface } from "./models/types";

let games: { [index: string]: any } = {};

const getGame = (partyCode: string): GameInterface => {
    return games[partyCode];
};

const createGame = (partyCode: string, roundLength: number, cb: CallbackType): GameInterface => {
    games[partyCode] = new Game(partyCode, roundLength, cb);
    console.group('created game:');
    console.log('partyCode:', partyCode);
    console.log('cb:', cb);
    console.log('games[partyCode].active:', games[partyCode].active);
    console.log('games[partyCode].partyCode:', games[partyCode].partyCode);
    console.log('games[partyCode].players:', games[partyCode].players);
    console.groupEnd();
    return games[partyCode];
};

const getOrCreateGame = (partyCode: string, cb?: CallbackType): GameInterface => {
    const existingGame = getGame(partyCode);
    if (existingGame) {
        console.log('game exists:', !!existingGame);
        return existingGame;
    } else {
        createGame(partyCode, 60, cb!);
    }
    return games[partyCode];
};

export const joinGame = (partyCode: string, sessionID: string, name: string): void => {
    console.log("joinGame", partyCode, sessionID, name);
    let game = getOrCreateGame(partyCode);
    game.addNewPlayer(name, sessionID);
};

// returns the players in the game []
export const getLobbyState = (partyCode: string, sessionID: string, cb: CallbackType): LobbyInterface => {
    console.log("getLobbyState", partyCode, sessionID, cb);
    const game = getOrCreateGame(partyCode, cb);
    const currentPlayer = game.getPlayer(sessionID);
    let players = [];
    for (let [key, value] of Object.entries(game.players)) {
        players.push(value?.name);
    }

    return {
        players,
        currentPlayer: currentPlayer || null
    };
};

export const getPlayerRoundState = (partyCode: string, sessionID: string): RoundInterface | null => {
    let game = getOrCreateGame(partyCode);
    return game.getPlayerRoundState(sessionID);
};

export const playCard = (partyCode: string, cardID: number, sessionID: string, cb: CallbackType) => {
    let game = getOrCreateGame(partyCode);
    game.playCard(cardID, sessionID, cb);
};

export const judgeSelectCard = (partyCode: string, cardID: number, sessionID: string, cb: CallbackType) => {
    let game = getOrCreateGame(partyCode);
    game.judgeSelectCard(sessionID, cardID, cb);
};

export const shuffleCards = (partyCode: string, sourceIdx: number, destIdx: number, sessionID: string, cb: CallbackType) => {
    let game = getOrCreateGame(partyCode);
    game.shuffleCard(sessionID, sourceIdx, destIdx, cb);
};

export const endRound = (partyCode: string, cb: CallbackType) => {
    let game = getOrCreateGame(partyCode);
    game.endRound(cb);
};

export default {joinGame, getLobbyState, getPlayerRoundState, playCard, judgeSelectCard, shuffleCards, endRound};