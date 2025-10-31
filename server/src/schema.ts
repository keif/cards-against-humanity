import Game from '@/models/Game';
import { CallbackType, GameInterface, LobbyInterface, RoundInterface } from "@/models/types";

let games: { [index: string]: any } = {};

const createGame = async (partyCode: string, roundLength: number, cb: CallbackType): Promise<GameInterface> => {
    games[partyCode] = new Game(partyCode, roundLength, cb);

    // Initialize game with cards from Redis
    await games[partyCode].initialize();

    console.group('created game:');
    console.log('partyCode:', partyCode);
    console.log('cb:', cb);
    console.log('games[partyCode].active:', games[partyCode].active);
    console.log('games[partyCode].partyCode:', games[partyCode].partyCode);
    console.log('games[partyCode].players:', games[partyCode].players);
    console.groupEnd();
    return games[partyCode];
};

const getGame = async (partyCode: string, cb?: CallbackType): Promise<GameInterface> => {
    const existingGame = games[partyCode];
    if (existingGame) {
        console.log('game exists:', !!existingGame);
        return existingGame;
    } else {
        // if game doesn't exist, create a new one
        await createGame(partyCode, 60, cb!);
    }
    return games[partyCode];
};

export const joinGame = async (partyCode: string, sessionID: string, name: string): Promise<void> => {
    console.log("joinGame", partyCode, sessionID, name);
    let game = await getGame(partyCode);
    game.addNewPlayer(name, sessionID);
};

// returns the players in the game []
export const getLobbyState = async (partyCode: string, sessionID: string, cb: CallbackType): Promise<LobbyInterface> => {
    console.log("getLobbyState", partyCode, sessionID, cb);
    const game = await getGame(partyCode, cb);
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

export const getPlayerRoundState = async (partyCode: string, sessionID: string): Promise<RoundInterface | null> => {
    let game = await getGame(partyCode);
    return game.getPlayerRoundState(sessionID);
};

export const playCard = async (partyCode: string, cardID: number, sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.playCard(cardID, sessionID, cb);
};

export const judgeSelectCard = async (partyCode: string, cardID: number, sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.judgeSelectCard(sessionID, cardID, cb);
};

export const shuffleCards = async (partyCode: string, sourceIdx: number, destIdx: number, sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.shuffleCard(sessionID, sourceIdx, destIdx, cb);
};

export const endRound = async (partyCode: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.endRound(cb);
};

export default { joinGame, getLobbyState, getPlayerRoundState, playCard, judgeSelectCard, shuffleCards, endRound };