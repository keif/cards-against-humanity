const cards = require("../data/cards");
const _ = require("lodash");

export function getShuffledACard() {
    const ACards = cards.filter(({cardType, expansion}) => cardType === "A" && expansion === 'Base');
    return _.shuffle(ACards);
}

export function getShuffledQCard() {
    // TODO: return cards with more than 1 answer after we implement that feature
    let QCards = cards.filter(({
                                   cardType,
                                   expansion,
                                   numAnswers
                               }) => cardType === "Q" && expansion === 'Base' && numAnswers === 1);
    return _.shuffle(QCards);
}
