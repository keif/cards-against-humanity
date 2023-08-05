"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endRound = exports.shuffleCards = exports.judgeSelectCard = exports.playCard = exports.getPlayerRoundState = exports.getLobbyState = exports.joinGame = void 0;
var Game_1 = require("./models/Game");
var games = {};
var getGame = function (partyCode) {
    return games[partyCode];
};
var createGame = function (partyCode, roundLength, cb) {
    games[partyCode] = new Game_1.default(partyCode, roundLength, cb);
    console.group('created game:');
    console.log('partyCode:', partyCode);
    console.log('cb:', cb);
    console.log('games[partyCode].active:', games[partyCode].active);
    console.log('games[partyCode].partyCode:', games[partyCode].partyCode);
    console.log('games[partyCode].players:', games[partyCode].players);
    console.groupEnd();
    return games[partyCode];
};
var getOrCreateGame = function (partyCode, cb) {
    var existingGame = getGame(partyCode);
    if (existingGame) {
        console.log('game exists:', !!existingGame);
        return existingGame;
    }
    else {
        createGame(partyCode, 60, cb);
    }
    return games[partyCode];
};
var joinGame = function (partyCode, sessionID, name) {
    console.log("joinGame", partyCode, sessionID, name);
    var game = getOrCreateGame(partyCode);
    game.addNewPlayer(name, sessionID);
};
exports.joinGame = joinGame;
// returns the players in the game []
var getLobbyState = function (partyCode, sessionID, cb) {
    console.log("getLobbyState", partyCode, sessionID, cb);
    var game = getOrCreateGame(partyCode, cb);
    var currentPlayer = game.getPlayer(sessionID);
    var players = [];
    for (var _i = 0, _a = Object.entries(game.players); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        players.push(value === null || value === void 0 ? void 0 : value.name);
    }
    return {
        players: players,
        currentPlayer: currentPlayer || null
    };
};
exports.getLobbyState = getLobbyState;
var getPlayerRoundState = function (partyCode, sessionID) {
    var game = getOrCreateGame(partyCode);
    return game.getPlayerRoundState(sessionID);
};
exports.getPlayerRoundState = getPlayerRoundState;
var playCard = function (partyCode, cardID, sessionID, cb) {
    var game = getOrCreateGame(partyCode);
    game.playCard(cardID, sessionID, cb);
};
exports.playCard = playCard;
var judgeSelectCard = function (partyCode, cardID, sessionID, cb) {
    var game = getOrCreateGame(partyCode);
    game.judgeSelectCard(sessionID, cardID, cb);
};
exports.judgeSelectCard = judgeSelectCard;
var shuffleCards = function (partyCode, sourceIdx, destIdx, sessionID, cb) {
    var game = getOrCreateGame(partyCode);
    game.shuffleCard(sessionID, sourceIdx, destIdx, cb);
};
exports.shuffleCards = shuffleCards;
var endRound = function (partyCode, cb) {
    var game = getOrCreateGame(partyCode);
    game.endRound(cb);
};
exports.endRound = endRound;
exports.default = { joinGame: exports.joinGame, getLobbyState: exports.getLobbyState, getPlayerRoundState: exports.getPlayerRoundState, playCard: exports.playCard, judgeSelectCard: exports.judgeSelectCard, shuffleCards: exports.shuffleCards, endRound: exports.endRound };
