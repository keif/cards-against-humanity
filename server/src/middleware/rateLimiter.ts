import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';

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

// HTTP rate limiter
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
