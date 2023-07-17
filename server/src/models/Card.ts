import cards from "@/data/cards";
import shuffle from "lodash/shuffle";

export function getShuffledACard() {
    const ACards = cards.filter(({cardType, expansion}: {
        cardType: string,
        expansion: string
    }) => cardType === "A" && expansion === 'Base');
    return shuffle(ACards);
}

export function getShuffledQCard() {
    // TODO: return cards with more than 1 answer after we implement that feature
    let QCards = cards.filter(({
                                   cardType,
                                   expansion,
                                   numAnswers
                               }: {
        cardType: string,
        expansion: string,
        numAnswers: number
    }) => cardType === "Q" && expansion === 'Base' && numAnswers === 1);
    return shuffle(QCards);
}
