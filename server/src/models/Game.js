"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("./Card");
var shuffle_1 = require("lodash/shuffle");
var find_1 = require("lodash/find");
var remove_1 = require("lodash/remove");
var constants_1 = require("@/constants");
var Game = /** @class */ (function () {
    function Game(partyCode, roundLength, roundFinishedNotifier) {
        if (roundLength === void 0) { roundLength = 10; }
        console.group('Game constructor');
        console.log('partyCode:', partyCode);
        console.log('roundLength:', roundLength);
        console.log('roundFinishedNotifier:', roundFinishedNotifier);
        this.active = true;
        this.roundsIdle = 0; // if at least |this.players.length.length| roundsIdle, then game state is inactive
        this.partyCode = partyCode;
        this.gameStartDate = new Date();
        this.QCardDeck = (0, Card_1.getShuffledQCard)();
        this.ACardDeck = (0, Card_1.getShuffledACard)();
        this.players = {};
        this.rounds = [];
        this.roundLength = roundLength;
        this.roundFinishedNotifier = roundFinishedNotifier;
        this.roundTimer = 0;
        this.addNewPlayer = this.addNewPlayer.bind(this);
        this.endRound = this.endRound.bind(this);
        this.getLatestRound = this.getLatestRound.bind(this);
        this.getPlayer = this.getPlayer.bind(this);
        this.getPlayerRoundState = this.getPlayerRoundState.bind(this);
        this.playCard = this.playCard.bind(this);
        console.groupEnd();
    }
    Game.prototype.addNewPlayer = function (name, sessionID) {
        console.group('addNewPlayer');
        console.log('this.players[sessionID]:', this.players[sessionID]);
        console.log('this.roundFinishedNotifier:', this.roundFinishedNotifier);
        if (name == undefined || sessionID == undefined) {
            console.log("trying to add ".concat(name, " to ").concat(this.partyCode));
        }
        else if (this.ACardDeck.length < 3) {
            console.log('Cannot add new player to deck, ACardDeck has ran out of cards!');
        }
        else {
            console.log("adding ".concat(name, " to ").concat(this.partyCode));
            this.players[sessionID] = {
                name: name,
                pID: Object.keys(this.players).length,
                roundsWon: [],
                cards: this.ACardDeck.splice(0, 10),
                roundState: "lobby"
            };
            console.log('this.players[sessionID]:', this.players[sessionID]);
        }
        console.groupEnd();
    };
    // return the player in the game, if exists, else return null
    Game.prototype.getPlayer = function (sessionID) {
        return this.players[sessionID] ? this.players[sessionID] : null;
    };
    // get the latest active round or create a new empty round (if it's the first round)
    Game.prototype.getLatestRound = function () {
        var _this = this;
        var playerSize = Object.keys(this.players).length;
        if (playerSize < 3) {
            console.log("Cannot getLatestRound. not enough players to start a game");
            return null;
        }
        else if (this.rounds.length === 0 || !(this.rounds.slice(-1)[0].active)) {
            console.log('creating new round, since old round was not active (or this is the first round)');
            this.ACardDeck = (0, shuffle_1.default)(this.ACardDeck);
            var round_1 = {
                active: true,
                otherPlayerCards: [],
                QCard: (this.QCardDeck.splice(0, 1))[0],
                roundEndTime: undefined,
                roundJudge: (0, find_1.default)(this.players, function (player) { return player.pID === (_this.rounds.length % playerSize); }),
                roundNum: this.rounds.length + 1,
                roundState: "players-selecting",
                roundStartTime: new Date(),
                winner: '',
                winningCard: null,
            };
            this.roundTimer = window.setTimeout(function () {
                var _a, _b;
                // TODO: if otherPlayerCards.length === 0, endRound()
                console.log('round.otherPlayerCards.length:', (_a = round_1 === null || round_1 === void 0 ? void 0 : round_1.otherPlayerCards) === null || _a === void 0 ? void 0 : _a.length);
                if (((_b = round_1 === null || round_1 === void 0 ? void 0 : round_1.otherPlayerCards) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                    _this.endRound(function (success, message) {
                        console.log('Had to end round, since no player choose a card');
                        console.log("endRound prematurely | ".concat(success, " | ").concat(message));
                        _this.roundsIdle += 1;
                        console.log("Rounds Idle: ".concat(_this.roundsIdle));
                        console.log('this.roundFinishedNotifier:', _this.roundFinishedNotifier);
                        _this.roundFinishedNotifier(true, 'Skipping judge!');
                    });
                }
                else {
                    _this.roundsIdle = 0;
                    round_1.roundState = constants_1.JUDGE_SELECTING;
                    console.log('Judge-selection time!');
                    _this.roundFinishedNotifier(true, 'Judge-selection time!');
                }
            }, this.roundLength * 1000);
            this.rounds.push(round_1);
            return round_1;
        }
        else {
            console.log("returning latest active round");
            return this.rounds.slice(-1)[0];
        }
    };
    // return true if player with session id is round judge
    Game.prototype.isRoundJudge = function (sessionID, round) {
        var _a;
        var player = this.getPlayer(sessionID);
        return !!(player && ((_a = round === null || round === void 0 ? void 0 : round.roundJudge) === null || _a === void 0 ? void 0 : _a.pID) === (player === null || player === void 0 ? void 0 : player.pID));
    };
    // Return the round state for the player with given sessionID
    // if the player is not in the game, return null
    Game.prototype.getPlayerRoundState = function (sessionID) {
        var player = this.getPlayer(sessionID);
        if (player == null)
            return null;
        var latestRound = this.getLatestRound();
        var roundRole = this.isRoundJudge(sessionID, latestRound) ? constants_1.JUDGE : constants_1.PLAYER;
        var playerChoice = (0, find_1.default)(latestRound === null || latestRound === void 0 ? void 0 : latestRound.otherPlayerCards, function (card) { var _a; return ((_a = card === null || card === void 0 ? void 0 : card.owner) === null || _a === void 0 ? void 0 : _a.pID) === (player === null || player === void 0 ? void 0 : player.pID); }) || null;
        var otherPlayerCards = latestRound === null || latestRound === void 0 ? void 0 : latestRound.otherPlayerCards;
        var cards = player.cards;
        var QCard = latestRound === null || latestRound === void 0 ? void 0 : latestRound.QCard;
        var roundNum = latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundNum;
        var roundJudge = latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundJudge;
        var winningCard = latestRound === null || latestRound === void 0 ? void 0 : latestRound.winningCard;
        var winner = latestRound === null || latestRound === void 0 ? void 0 : latestRound.winner;
        // timeRemaining in seconds
        var timeLeft = Math.max.apply(Math, [0, Math.floor(this.roundLength - ((Number(new Date()) - Number(latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundStartTime)) / 1000))]);
        var roundState;
        console.group("getPlayerRoundState for ".concat(player.name, " in round ").concat(roundNum));
        console.log("roundRole: ".concat(roundRole));
        console.log("playerChoice: ".concat(playerChoice ? playerChoice.text : null));
        console.log("otherPlayerCards: ".concat(otherPlayerCards === null || otherPlayerCards === void 0 ? void 0 : otherPlayerCards.length));
        console.log("cards: ".concat(cards.length));
        console.log("QCard: ".concat(QCard === null || QCard === void 0 ? void 0 : QCard.text));
        console.log("roundNum: ".concat(roundNum));
        console.log("roundJudge: ".concat(roundJudge));
        console.log("winningCard: ".concat(winningCard ? winningCard.text : null));
        console.log("winner: ".concat(winner ? winner : null));
        console.log("timeLeft: ".concat(timeLeft));
        console.groupEnd();
        if ((latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundState) === constants_1.JUDGE_SELECTING || (latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundState) === 'viewing-winner') {
            timeLeft = 0;
            roundState = latestRound.roundState;
        }
        else if (roundRole == constants_1.JUDGE) {
            roundState = constants_1.JUDGE_WAITING;
        }
        else if (playerChoice != null) {
            roundState = constants_1.PLAYER_WAITING;
        }
        else {
            roundState = constants_1.PLAYER_SELECTING;
        }
        return {
            cards: cards,
            otherPlayerCards: otherPlayerCards,
            playerChoice: playerChoice,
            QCard: QCard,
            roundState: roundState,
            roundRole: roundRole,
            roundJudge: roundJudge,
            roundNum: roundNum,
            timeLeft: timeLeft,
            winner: winner,
            winningCard: winningCard,
        };
    };
    Game.prototype.playCard = function (cardID, sessionID, cb) {
        var _a, _b;
        var player = this.getPlayer(sessionID);
        if (player === null) {
            cb(false, "Cannot playCard: ".concat(sessionID, " is not a player in game ").concat(this.partyCode));
            return;
        }
        var card = (0, find_1.default)(player === null || player === void 0 ? void 0 : player.cards, function (c) { return (c === null || c === void 0 ? void 0 : c.id) === cardID; });
        if (card === undefined)
            cb(false, "Player ".concat(player.name, "[").concat(sessionID, "] attempting to play card (").concat(cardID, ") they do not own!"));
        var latestRound = this.getLatestRound();
        if ((latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundState) !== 'players-selecting') {
            cb(false, "Cannot play card!, judge is currently selecting!");
            return;
        }
        if (this.isRoundJudge(sessionID, latestRound)) {
            cb(false, "".concat(player.name, " cannot play a card this round since. ").concat(player.name, " is the round judge"));
            return;
        }
        if (card) {
            var playerSize = Object.keys(this.players).length;
            (0, remove_1.default)(player.cards, function (c) { return c.id === cardID; });
            (_a = latestRound === null || latestRound === void 0 ? void 0 : latestRound.otherPlayerCards) === null || _a === void 0 ? void 0 : _a.push(__assign(__assign({}, card), { owner: { "name": player.name, "pID": player.pID } }));
            player.cards = player.cards.concat(this.ACardDeck.splice(0, 1));
            if (((_b = latestRound === null || latestRound === void 0 ? void 0 : latestRound.otherPlayerCards) === null || _b === void 0 ? void 0 : _b.length) === (playerSize - 1)) {
                latestRound.roundState = constants_1.JUDGE_SELECTING;
                clearTimeout(this.roundTimer);
                this.roundFinishedNotifier(true, 'all players have played their cards, going to judge-selecting!');
                cb(true, "".concat(player.name, " was last player to play cards, going to judge-selecting!"));
            }
            else {
                cb(true, "".concat(player.name, " played their card!"));
            }
        }
    };
    Game.prototype.judgeSelectCard = function (sessionID, cardID, cb) {
        var _a;
        var latestRound = this.getLatestRound();
        if (this.isRoundJudge(sessionID, latestRound) && (latestRound === null || latestRound === void 0 ? void 0 : latestRound.roundState) === constants_1.JUDGE_SELECTING) {
            var winningCard_1 = (0, find_1.default)(latestRound.otherPlayerCards, function (card) { return card.id === cardID; });
            if (winningCard_1) {
                latestRound.roundState = 'viewing-winner';
                latestRound.winningCard = winningCard_1;
                latestRound.winner = (_a = winningCard_1.owner) === null || _a === void 0 ? void 0 : _a.name;
                latestRound.roundEndTime = new Date();
                var winningPlayer = (0, find_1.default)(this.players, function (player) { var _a; return player.pID === ((_a = winningCard_1 === null || winningCard_1 === void 0 ? void 0 : winningCard_1.owner) === null || _a === void 0 ? void 0 : _a.pID); });
                winningPlayer.roundsWon.push({
                    roundNum: latestRound.roundNum,
                    ACard: winningCard_1,
                    QCard: latestRound.QCard
                });
                this.roundsIdle = 0;
                cb(true, "".concat(latestRound.winner, " won with card ").concat(latestRound.winningCard.text));
            }
            else {
                cb(false, "".concat(sessionID, " attempted to play a winning card ").concat(cardID, " that was not played!"));
            }
        }
        else {
            cb(false, 'you are not the round judge! you cannot choose the winner!');
        }
    };
    Game.prototype.endRound = function (cb) {
        var _a;
        var latestRound = this.getLatestRound();
        if (latestRound) {
            clearTimeout(this.roundTimer);
            latestRound.active = false;
            var cardsPlayed_1 = [];
            (_a = latestRound === null || latestRound === void 0 ? void 0 : latestRound.otherPlayerCards) === null || _a === void 0 ? void 0 : _a.forEach(function (card) { return cardsPlayed_1.push(__assign({}, card)); });
            cardsPlayed_1.map(function (card) { return delete card.owner; });
            this.ACardDeck = this.ACardDeck.concat(cardsPlayed_1);
            this.QCardDeck = (latestRound.QCard) ? this.QCardDeck.concat(latestRound.QCard) : this.QCardDeck;
            cb(true, "Round ".concat(latestRound.roundNum, " successfully finished"));
        }
        else {
            cb(false, "Cannot endRound(), since no rounds exist for the following game!");
        }
    };
    Game.prototype.shuffleCard = function (sessionID, srcCardIDIndex, destCardIDIndex, cb) {
        var player = this.getPlayer(sessionID);
        if (player === null) {
            cb(false, "cannot shuffle card! ".concat(sessionID, " not a player in game!"));
            return;
        }
        var newCardOrder = __spreadArray([], player.cards, true);
        newCardOrder.splice(srcCardIDIndex, 1);
        newCardOrder.splice(destCardIDIndex, 0, player.cards[srcCardIDIndex]);
        player.cards = newCardOrder;
        cb(true, "shuffled ".concat(srcCardIDIndex, " <=> ").concat(destCardIDIndex, " for ").concat(player.name));
    };
    return Game;
}());
exports.default = Game;
