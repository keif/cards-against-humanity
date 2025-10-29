import winston from 'winston';

// Define log levels and colors
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

// Add colors to winston
winston.addColors(logColors);

// Define format for production (JSON) vs development (colorized)
const developmentFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let metaStr = '';
        if (Object.keys(meta).length > 0) {
            metaStr = ` ${JSON.stringify(meta)}`;
        }
        return `${timestamp} [${level}]: ${message}${metaStr}`;
    })
);

const productionFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
);

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
    levels: logLevels,
    format: process.env.NODE_ENV === 'production' ? productionFormat : developmentFormat,
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error']
        })
    ],
    // Don't exit on uncaught exceptions in production
    exitOnError: process.env.NODE_ENV !== 'production',
});

// Create a stream for HTTP logging (Morgan integration)
export const loggerStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export default logger;

// Helper function to safely log objects without sensitive data
export const sanitizeLogData = (data: any): any => {
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    const sensitiveKeys = ['password', 'secret', 'token', 'auth', 'session', 'cookie'];
    const sanitized = { ...data };

    for (const key of Object.keys(sanitized)) {
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
            sanitized[key] = '[REDACTED]';
        }
    }

    return sanitized;
};
