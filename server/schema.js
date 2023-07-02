import Game from "./models/Game";

let games = {};

function getOrCreateGame(partyCode, cb) {
    if (games[partyCode]) {
        return games[partyCode];
    } else {
        games[partyCode] = new Game(partyCode, 60, cb);
    }
    return games[partyCode];
}

export function joinGame(partyCode, sessionID, name) {
    let game = getOrCreateGame(partyCode);
    game.addNewPlayer(name, sessionID);
}

// returns the players in the game []
export function getLobbyState(partyCode, sessionID, cb) {
    let game = getOrCreateGame(partyCode, cb);
    let currentPlayer = game.getPlayer(sessionID);
    let players = game.players.map((player) => player.name);

    let response = {
        players,
        currentPlayer: currentPlayer || null
    };

    return response;
}

export function getPlayerRoundState(partyCode, sessionID, cb) {
    let game = getOrCreateGame(partyCode);
    return game.getPlayerRoundState(sessionID);
}

export function playCard(partyCode, cardID, sessionID, cb) {
    let game = getOrCreateGame(partyCode);
    game.playCard(sessionID, cardID, cb);
}

export function judgeSelectCard(partyCode, cardID, sessionID, cb) {
    let game = getOrCreateGame(partyCode);
    game.judgeSelectCard(sessionID, cardID, cb);
}

export function shuffleCards(partyCode, sourceIdx, destIdx, sessionID, cb) {
    let game = getOrCreateGame(partyCode);
    game.shuffleCard(sessionID, sourceIdx, destIdx, cb);
}

export function endRound(partyCode, cb) {
    let game = getOrCreateGame(partyCode);
    game.endRound(cb);
}
