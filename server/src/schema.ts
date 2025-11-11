import Game from '@/models/Game';
import { CallbackType, GameInterface, LobbyInterface, RoundInterface, GameConfig, DEFAULT_GAME_CONFIG } from "@/models/types";

let games: { [index: string]: any } = {};

const createGame = async (partyCode: string, roundLength: number, cb: CallbackType, gameConfig: GameConfig = DEFAULT_GAME_CONFIG): Promise<GameInterface> => {
    console.log('🎲 Creating game with config:', {
        partyCode,
        rebootingEnabled: gameConfig.enabledRules.rebootingTheUniverse,
        fullConfig: gameConfig
    });

    games[partyCode] = new Game(partyCode, roundLength, cb, gameConfig);

    // Initialize game with cards from Redis
    await games[partyCode].initialize();

    console.group('created game:');
    console.log('partyCode:', partyCode);
    console.log('cb:', cb);
    console.log('gameConfig:', gameConfig);
    console.log('games[partyCode].gameConfig:', games[partyCode].gameConfig);
    console.log('games[partyCode].active:', games[partyCode].active);
    console.log('games[partyCode].partyCode:', games[partyCode].partyCode);
    console.log('games[partyCode].players:', games[partyCode].players);
    console.groupEnd();
    return games[partyCode];
};

const getGame = async (partyCode: string, cb?: CallbackType, gameConfig?: GameConfig): Promise<GameInterface> => {
    const existingGame = games[partyCode];
    if (existingGame) {
        console.log('🔄 Game exists, returning existing (config preserved):', {
            partyCode,
            existingConfig: existingGame.gameConfig.enabledRules.rebootingTheUniverse,
            ignoringNewConfig: gameConfig !== undefined
        });
        return existingGame;
    } else {
        console.log('🆕 Game does not exist, creating new game');
        // if game doesn't exist, create a new one
        // Provide a default callback if none was supplied
        const defaultCallback: CallbackType = (success, message) => {
            console.log(`Game event (no callback provided): ${success} | ${message}`);
        };
        await createGame(partyCode, 60, cb || defaultCallback, gameConfig || DEFAULT_GAME_CONFIG);
    }
    return games[partyCode];
};

export const joinGame = async (partyCode: string, sessionID: string, name: string, gameConfig?: GameConfig): Promise<void> => {
    console.log("joinGame", partyCode, sessionID, name, gameConfig);
    console.log('🎯 joinGame config details:', {
        hasConfig: !!gameConfig,
        rebootingEnabled: gameConfig?.enabledRules?.rebootingTheUniverse,
        fullConfig: gameConfig
    });
    let game = await getGame(partyCode, undefined, gameConfig);
    game.addNewPlayer(name, sessionID);
};

// returns the players in the game []
export const getLobbyState = async (partyCode: string, sessionID: string, cb: CallbackType, gameConfig?: GameConfig): Promise<LobbyInterface> => {
    console.log("getLobbyState", partyCode, sessionID, cb, gameConfig);

    // Check if game exists - don't create one if it doesn't
    const existingGame = games[partyCode];
    if (!existingGame) {
        console.log('📋 No game exists yet for lobby state');
        return {
            players: [],
            currentPlayer: null
        };
    }

    // Update the round finished notifier to ensure Socket.IO events are emitted correctly
    // This is critical for timeout handling - when multiple clients connect, we need the
    // latest callback that has access to the Socket.IO server instance
    existingGame.setRoundFinishedNotifier(cb);

    const currentPlayer = existingGame.getPlayer(sessionID);
    let players: string[] = [];
    for (let [key, value] of Object.entries(existingGame.players)) {
        players.push((value as any)?.name);
    }

    return {
        players,
        currentPlayer: currentPlayer || null
    };
};

export const getPlayerRoundState = async (partyCode: string, sessionID: string): Promise<RoundInterface | null> => {
    // Check if game exists - don't create one if it doesn't
    const existingGame = games[partyCode];
    if (!existingGame) {
        return null;  // Game doesn't exist yet, player needs to join first
    }
    return existingGame.getPlayerRoundState(sessionID);
};

export const playCard = async (partyCode: string, cardIDs: number | number[], sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.playCard(cardIDs, sessionID, cb);
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

export const discardCard = async (partyCode: string, cardID: number, sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.discardCard(sessionID, cardID, cb);
};

export const rebootHand = async (partyCode: string, sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.rebootHand(sessionID, cb);
};

export const endGameWithHaiku = async (partyCode: string, sessionID: string, cb: CallbackType): Promise<void> => {
    let game = await getGame(partyCode);
    game.endGameWithHaiku(sessionID, cb);
};

export const checkAllGamesForAdvancement = async (connectedSessionIDs: Set<string>): Promise<void> => {
    // Iterate through all active games
    for (const partyCode in games) {
        const game = games[partyCode];
        if (game) {
            game.checkAndAdvanceIfAllConnectedPlayersSubmitted(connectedSessionIDs);
        }
    }
};

export default { joinGame, getLobbyState, getPlayerRoundState, playCard, judgeSelectCard, shuffleCards, endRound, discardCard, rebootHand, endGameWithHaiku };