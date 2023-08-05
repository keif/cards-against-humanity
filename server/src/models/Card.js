"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShuffledQCard = exports.getShuffledACard = void 0;
var cards_1 = require("../data/cards");
var shuffle_1 = require("lodash/shuffle");
function getShuffledACard() {
    var ACards = cards_1.default.filter(function (_a) {
        var cardType = _a.cardType, expansion = _a.expansion;
        return cardType === "A" && expansion === 'Base';
    });
    return (0, shuffle_1.default)(ACards);
}
exports.getShuffledACard = getShuffledACard;
function getShuffledQCard() {
    // TODO: return cards with more than 1 answer after we implement that feature
    var QCards = cards_1.default.filter(function (_a) {
        var cardType = _a.cardType, expansion = _a.expansion, numAnswers = _a.numAnswers;
        return cardType === "Q" && expansion === 'Base' && numAnswers === 1;
    });
    return (0, shuffle_1.default)(QCards);
}
exports.getShuffledQCard = getShuffledQCard;
