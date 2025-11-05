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
 * @param numAnswers - Filter by number of answers:
 *   - 0: get all cards with numAnswers > 1 (multi-answer only)
 *   - positive number: exact match
 */
function getShuffledQCardStatic(numAnswers: number = 1): Card[] {
    let QCards = cards.filter(({
                                   cardType,
                                   expansion,
                                   numAnswers: cardNumAnswers
                               }: {
        cardType: string,
        expansion: string,
        numAnswers: number
    }) => {
        if (cardType !== "Q" || expansion !== 'Base') return false;

        // numAnswers = 0 means "any multi-answer card (>1)"
        return numAnswers === 0
            ? cardNumAnswers > 1
            : cardNumAnswers === numAnswers;
    });
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
 * @param expansion - Card expansion pack (default: 'Base')
 * @param numAnswers - Filter by number of answers:
 *   - 0: get all cards with numAnswers > 1 (multi-answer only)
 *   - positive number: exact match (default: 1)
 */
export async function getShuffledQCard(expansion: string = 'Base', numAnswers: number = 1): Promise<Card[]> {
    if (cardService) {
        try {
            return await cardService.getShuffledQuestionCards(expansion, numAnswers);
        } catch (error) {
            logger.error('Failed to get cards from Redis, falling back to static', {
                error: error instanceof Error ? error.message : String(error)
            });
            return getShuffledQCardStatic(numAnswers);
        }
    }

    logger.warn('CardService not initialized, using static cards');
    return getShuffledQCardStatic(numAnswers);
}

/**
 * Get the CardService instance (for advanced operations)
 */
export function getCardService(): CardService | null {
    return cardService;
}
