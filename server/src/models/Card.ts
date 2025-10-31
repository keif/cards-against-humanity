import cards from "@/data/cards";
import shuffle from "lodash/shuffle";
import { Card } from "@/data/types";
import { CardService } from "@/services/cardService";
import logger from "@/utils/logger";

// Singleton CardService instance (set during server initialization)
let cardService: CardService | null = null;

/**
 * Initialize the card service with a Redis client
 */
export function initializeCardService(service: CardService): void {
    cardService = service;
    logger.info('Card model initialized with CardService');
}

/**
 * Fallback to static cards if Redis is unavailable
 */
function getShuffledACardStatic(): Card[] {
    const ACards = cards.filter(({cardType, expansion}: {
        cardType: string,
        expansion: string
    }) => cardType === "A" && expansion === 'Base');
    return shuffle(ACards);
}

/**
 * Fallback to static cards if Redis is unavailable
 */
function getShuffledQCardStatic(): Card[] {
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

/**
 * Get shuffled answer cards (uses Redis if available, falls back to static)
 */
export async function getShuffledACard(expansion: string = 'Base'): Promise<Card[]> {
    if (cardService) {
        try {
            return await cardService.getShuffledAnswerCards(expansion);
        } catch (error) {
            logger.error('Failed to get cards from Redis, falling back to static', {
                error: error instanceof Error ? error.message : String(error)
            });
            return getShuffledACardStatic();
        }
    }

    logger.warn('CardService not initialized, using static cards');
    return getShuffledACardStatic();
}

/**
 * Get shuffled question cards (uses Redis if available, falls back to static)
 */
export async function getShuffledQCard(expansion: string = 'Base', numAnswers: number = 1): Promise<Card[]> {
    if (cardService) {
        try {
            return await cardService.getShuffledQuestionCards(expansion, numAnswers);
        } catch (error) {
            logger.error('Failed to get cards from Redis, falling back to static', {
                error: error instanceof Error ? error.message : String(error)
            });
            return getShuffledQCardStatic();
        }
    }

    logger.warn('CardService not initialized, using static cards');
    return getShuffledQCardStatic();
}

/**
 * Get the CardService instance (for advanced operations)
 */
export function getCardService(): CardService | null {
    return cardService;
}
