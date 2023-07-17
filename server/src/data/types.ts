export interface Card {
    id: number;
    cardType: string;
    text: string;
    numAnswers: number;
    expansion: string;
    owner?: {
        name: string;
        pID: number;
    }
}

