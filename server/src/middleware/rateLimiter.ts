import rateLimit from 'express-rate-limit';
import logger from '@/utils/logger';

// Rate limiter for Socket.IO connections
export const socketRateLimiter = new Map<string, { count: number; resetTime: number }>();

export const checkSocketRateLimit = (clientIP: string): boolean => {
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 100; // Max 100 events per minute per IP

    if (!socketRateLimiter.has(clientIP)) {
        socketRateLimiter.set(clientIP, { count: 1, resetTime: now + windowMs });
        return true;
    }

    const limit = socketRateLimiter.get(clientIP)!;

    // Reset if window expired
    if (now > limit.resetTime) {
        limit.count = 1;
        limit.resetTime = now + windowMs;
        return true;
    }

    // Check if over limit
    if (limit.count >= maxRequests) {
        logger.warn('Socket rate limit exceeded', { clientIP, count: limit.count });
        return false;
    }

    limit.count++;
    return true;
};

// HTTP rate limiter - general API protection
export const httpRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('HTTP rate limit exceeded', {
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
        res.status(429).json({ error: 'Too many requests, please try again later' });
    }
});

/**
 * Strict rate limiter for admin promotion endpoint
 * Prevents brute force attacks on ADMIN_KEY
 *
 * Configuration:
 * - 5 attempts per 15 minutes per IP address
 * - Only counts failed attempts (skipSuccessfulRequests: true)
 * - 15-minute lockout after hitting the limit
 * - Enhanced security logging
 */
export const promotionRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 failed requests per windowMs
    message: {
        error: 'Too many promotion attempts. Please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers

    // Only count failed attempts (when status >= 400)
    skipSuccessfulRequests: true,

    // Use default key generator (IP address with IPv6 support)
    // Removing custom keyGenerator to use express-rate-limit's built-in IPv6-safe implementation

    // Handler when rate limit is exceeded
    handler: (req, res) => {
        const ip = req.ip || 'unknown';
        const sessionId = req.session?.id || 'no-session';

        logger.warn('Rate limit exceeded for promotion endpoint', {
            ip,
            sessionId,
            endpoint: '/auth/promote',
            limitType: 'promotion_attempts',
            message: 'Too many failed promotion attempts - possible brute force attack'
        });

        res.status(429).json({
            error: 'Too many promotion attempts. Please try again later.',
            retryAfter: '15 minutes'
        });
    }
});

/**
 * Rate limiter for card submissions
 * Prevents spam and abuse of the card submission system
 *
 * Configuration:
 * - 10 submissions per hour per session
 * - Prevents rapid-fire card submission spam
 * - Session-based tracking (not just IP)
 */
export const submissionRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each session to 10 submissions per hour
    message: {
        error: 'Too many card submissions. Please try again later.',
        retryAfter: '1 hour',
        limit: 10
    },
    standardHeaders: true,
    legacyHeaders: false,

    // Use session ID as key (more accurate than IP for logged-in users)
    // Note: We use session ID instead of IP to avoid IPv6 complexity
    // Sessions are more reliable for tracking user-specific rate limits anyway
    keyGenerator: (req) => {
        const sessionId = req.session?.id;
        // Always use session ID if available
        // If no session, use a generic key (general rate limiter will catch IP-based abuse)
        return sessionId || 'no-session';
    },

    // Handler when rate limit is exceeded
    handler: (req, res) => {
        const sessionId = req.session?.id || 'no-session';
        const ip = req.ip || 'unknown';

        logger.warn('Card submission rate limit exceeded', {
            sessionId,
            ip,
            endpoint: req.path,
            limitType: 'card_submissions',
            message: 'Too many card submissions - possible spam'
        });

        res.status(429).json({
            error: 'Too many card submissions. Please try again later.',
            retryAfter: '1 hour',
            limit: 10
        });
    },

    // Skip rate limiting for trusted moderators/admins
    skip: (req) => {
        const role = req.session?.role;
        return role === 'moderator' || role === 'admin';
    }
});
