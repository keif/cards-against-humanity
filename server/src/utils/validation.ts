import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

export interface ValidationResult {
    isValid: boolean;
    sanitizedValue?: string;
    error?: string;
}

export class InputValidator {

    static validatePlayerName(name: unknown): ValidationResult {
        // Type check
        if (typeof name !== 'string') {
            return { isValid: false, error: 'Name must be a string' };
        }

        // Length check
        if (name.length === 0) {
            return { isValid: false, error: 'Name cannot be empty' };
        }

        if (name.length > 50) {
            return { isValid: false, error: 'Name too long (max 50 characters)' };
        }

        // Sanitize HTML and dangerous characters
        const sanitized = DOMPurify.sanitize(name, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        }).trim();

        // Check if sanitization removed content (potential XSS attempt)
        if (sanitized.length === 0 && name.length > 0) {
            return { isValid: false, error: 'Name contains invalid characters' };
        }

        // Basic character validation - allow letters, numbers, spaces, basic punctuation
        if (!/^[a-zA-Z0-9\s\-_\.]{1,50}$/.test(sanitized)) {
            return { isValid: false, error: 'Name contains invalid characters' };
        }

        return { isValid: true, sanitizedValue: sanitized };
    }

    static validatePartyCode(partyCode: unknown): ValidationResult {
        // Type check
        if (typeof partyCode !== 'string') {
            return { isValid: false, error: 'Party code must be a string' };
        }

        // Length check
        if (partyCode.length === 0) {
            return { isValid: false, error: 'Party code cannot be empty' };
        }

        if (partyCode.length > 20) {
            return { isValid: false, error: 'Party code too long (max 20 characters)' };
        }

        // Sanitize
        const sanitized = validator.escape(partyCode).trim();

        // Party codes should be alphanumeric with optional hyphens/underscores
        if (!/^[a-zA-Z0-9\-_]{1,20}$/.test(sanitized)) {
            return { isValid: false, error: 'Invalid party code format' };
        }

        return { isValid: true, sanitizedValue: sanitized };
    }

    static validateCardId(cardId: unknown): ValidationResult {
        // Type check - should be number
        if (typeof cardId !== 'number') {
            return { isValid: false, error: 'Card ID must be a number' };
        }

        // Range check
        if (!Number.isInteger(cardId) || cardId < 0 || cardId > 999999) {
            return { isValid: false, error: 'Invalid card ID range' };
        }

        return { isValid: true, sanitizedValue: cardId.toString() };
    }

    static validateIndex(index: unknown): ValidationResult {
        // Type check
        if (typeof index !== 'number') {
            return { isValid: false, error: 'Index must be a number' };
        }

        // Range check
        if (!Number.isInteger(index) || index < 0 || index > 50) {
            return { isValid: false, error: 'Invalid index range' };
        }

        return { isValid: true, sanitizedValue: index.toString() };
    }
}