// Only use module-alias in production (dev uses tsconfig-paths)
if (process.env.NODE_ENV === 'production') {
	require('module-alias/register');
}
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import crypto from 'crypto';
import express, { Express } from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createServer } from 'http';
import * as os from 'os';
import * as path from 'path';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { RoundInterface } from '@/models/types';
import game from '@/schema';
import { InputValidator } from '@/utils/validation';
import logger, { loggerStream } from '@/utils/logger';
import morgan from 'morgan';
import { checkSocketRateLimit, httpRateLimiter } from '@/middleware/rateLimiter';
import { CardService } from '@/services/cardService';
import { initializeCardService } from '@/models/Card';
import { VoteService } from '@/services/voteService';
import { initializeVoteService } from '@/models/Vote';
import cards from '@/data/cards';
import { createCardRouter } from '@/routes/cardRoutes';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const SESSION_NAME = 'cah_cookie_session';
// Secure session secret generation
const generateSessionSecret = (): string => {
	if (process.env.SESSION_SECRET) {
		return process.env.SESSION_SECRET;
	}

	console.warn('⚠️  WARNING: SESSION_SECRET not set in environment. Using auto-generated secret.');
	console.warn('   This will invalidate all sessions on server restart!');
	console.warn('   Set SESSION_SECRET environment variable for production.');

	return crypto.randomBytes(64).toString('hex');
};

const SESSION_SECRET = generateSessionSecret();
const COOKIE_MAX_AGE = 6 * 60 * 60 * 1000 // 6 hours
const app: Express = express();
const server = createServer(app);
// Configure CORS for Socket.IO
const getAllowedOrigins = (): string[] => {
	if (process.env.ALLOWED_ORIGINS) {
		return process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
	}

	// Development defaults
	if (process.env.NODE_ENV !== 'production') {
		return [
			'http://localhost:3000',
			'http://localhost:5173', // Vite dev server
			'http://127.0.0.1:3000',
			'http://127.0.0.1:5173'
		];
	}

	// Production - must be explicitly set
	console.error('❌ ALLOWED_ORIGINS environment variable must be set in production');
	process.exit(1);
};

// Initialize Socket.IO server
const io: Server = new Server(server, {
	cors: {
		origin: getAllowedOrigins(),
		methods: ['GET', 'POST'],
		credentials: true
	},
	transports: ['polling', 'websocket'], // Allow polling first to establish session with cookies
	// Additional security options
	allowEIO3: false, // Force latest Engine.IO version
	pingTimeout: 60000,
	pingInterval: 25000
});

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = Number(process.env.REDIS_PORT || 6379);

// Redis clients for Socket.IO adapter
const pubClient = new Redis({ host: redisHost, port: redisPort });
const subClient = pubClient.duplicate();

// Redis client for session store
const redisClient = new Redis({ host: redisHost, port: redisPort });

// Set up Socket.IO Redis adapter
io.adapter(createAdapter(pubClient, subClient));
logger.info('Socket.IO Redis adapter configured');

redisClient.on('connect', () => {
  logger.info('Redis session store connected');
});

redisClient.on('error', (err) => {
  logger.error('Redis session store error', { error: err.message });
});

// Initialize CardService and seed cards
const cardService = new CardService(redisClient);
initializeCardService(cardService);

// Initialize VoteService
const voteService = new VoteService(redisClient);
initializeVoteService(voteService);

// Seed cards on startup (only runs once)
cardService.seedOfficialCards(cards).catch((err) => {
	logger.error('Failed to seed cards', { error: err.message });
	process.exit(1);
});

// Middleware to parse JSON bodies
app.use(morgan('combined', { stream: loggerStream }));

// Apply HTTP rate limiting
app.use(httpRateLimiter);

// Socket.IO rate limiting middleware
io.use((socket, next) => {
	const clientIP = socket.handshake.address;

	if (!checkSocketRateLimit(clientIP)) {
		return next(new Error('Rate limit exceeded'));
	}

	next();
});

// Create Redis session store
const redisStore = new RedisStore({
	client: redisClient,
	prefix: 'cah:sess:',
	ttl: COOKIE_MAX_AGE / 1000 // TTL in seconds
});

// Create session middleware with proper configuration
const sessionMiddleware = session({
	store: redisStore,
	cookie: {
		httpOnly: true,
		maxAge: COOKIE_MAX_AGE,
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		secure: process.env.NODE_ENV === 'production'
	},
	name: SESSION_NAME,
	resave: false,
	rolling: true, // Refresh session on each request
	saveUninitialized: true, // Create session even if nothing stored
	secret: SESSION_SECRET,
	genid: () => crypto.randomUUID(), // Generate unique session IDs
});

// Apply middleware
app.use(express.json());
app.use(cookieParser());

// CORS middleware for regular HTTP endpoints
app.use((req, res, next) => {
	const origin = req.headers.origin;
	const allowedOrigins = getAllowedOrigins();

	if (origin && allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
	}

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
});

app.use(sessionMiddleware);

// API routes - Create router with Socket.IO instance for real-time updates
app.use('/api/cards', createCardRouter(io));

// Serve production build
app.use(express.static(path.join(__dirname, '../../client', 'dist')));

// Convert Express session middleware to Socket.IO middleware
const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// Socket.IO session middleware - ensure session exists and initialize it
io.use((socket, next) => {
	const req = socket.request as any;
	const session = req.session;

	logger.info('Socket handshake attempt', {
		socketId: socket.id,
		hasCookies: !!req.headers.cookie,
		cookies: req.headers.cookie,
		hasSession: !!session,
		sessionID: session?.id,
		initialized: session?.initialized
	});

	if (session) {
		// Initialize the session by storing a flag
		// This ensures the session is saved and the cookie is set properly
		if (!session.initialized) {
			session.initialized = true;
			session.save((err: any) => {
				if (err) {
					logger.error('Failed to save session', { error: err.message });
					return next(err);
				}
				logger.info('Socket session established and initialized', {
					socketId: socket.id,
					sessionID: session.id
				});
				next();
			});
		} else {
			logger.info('Socket session established (existing)', {
				socketId: socket.id,
				sessionID: session.id
			});
			next();
		}
	} else {
		next(new Error('Session not found'));
	}
});

// Helper function to get persistent sessionID from socket
const getSessionID = (socket: any): string => {
	const session = socket.request.session;
	return session.id; // Use the session.id directly
};

// Map to track socket.id -> sessionID mapping for reverse lookups
const socketToSession = new Map<string, string>();

app.get('/session', (req, res) => {
	logger.info('Session endpoint accessed', {
		sessionID: req.session.id,
		hasCookie: !!req.headers.cookie,
		cookieHeader: req.headers.cookie
	});
	res.json({
		sessionID: req.session.id,
		name: req.session.name || null
	});
});

io.on('connection', (socket) => {
	const sessionID = getSessionID(socket);

	// Track this socket's session
	socketToSession.set(socket.id, sessionID);

	logger.info('User connected', {
  		socketId: socket.id,
		sessionID,
  		host: os.hostname(),
  		userAgent: socket.request.headers['user-agent'],
  		ip: socket.handshake.address
  	});

	// Clean up on disconnect
	socket.on('disconnect', () => {
		socketToSession.delete(socket.id);
		logger.info('User disconnected', { socketId: socket.id, sessionID });
	});

	// StartGameScreen
	socket.on('getLobbyState', async (partyCode) => {
		console.group(`${sessionID} | getLobbyState`);
		console.log("partyCode:", partyCode);
		socket.join(partyCode);

		let response = await game.getLobbyState(partyCode, sessionID, (success, message) => {
			console.log(`Round ended, going to judge-selecting ${success} | ${message}`)
			io.to(partyCode).emit('newGameState');
		});
		console.log('response:', response);
		console.groupEnd();
		socket.emit('getLobbyState', response);
	});

	socket.on('joinParty', async ({ partyCode, name }) => {
		console.group(`${sessionID} | joinParty`);
		console.log('sessionID:', sessionID);
		console.log('partyCode:', partyCode);
		console.log('name:', name);
		console.groupEnd();

		// Validate and sanitize inputs
		const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
		if (!partyCodeValidation.isValid) {
			socket.emit('error', { message: `Invalid party code: ${partyCodeValidation.error}` });
			return;
		}

		const nameValidation = InputValidator.validatePlayerName(name);
		if (!nameValidation.isValid) {
			socket.emit('error', { message: `Invalid name: ${nameValidation.error}` });
			return;
		}

		const sanitizedPartyCode = partyCodeValidation.sanitizedValue!;
		const sanitizedName = nameValidation.sanitizedValue!;

		try {
			await game.joinGame(sanitizedPartyCode, sessionID, sanitizedName);
			socket.join(sanitizedPartyCode);
			io.to(sanitizedPartyCode).emit('newLobbyState');
		} catch (error) {
			socket.emit('error', { message: 'Failed to join party' });
		}
	});

	socket.on('startGame', (partyCode) => {
		console.log(`${sessionID} | startGame`);
		console.log('partyCode:', partyCode);

		// Validate party code
		const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
		if (!partyCodeValidation.isValid) {
			socket.emit('error', { message: `Invalid party code: ${partyCodeValidation.error}` });
			return;
		}

		const sanitizedPartyCode = partyCodeValidation.sanitizedValue!;

		// Notify all clients in the party to navigate to game view
		logger.info('Game started', { partyCode: sanitizedPartyCode, startedBy: sessionID });
		io.to(sanitizedPartyCode).emit('gameStarted', { partyCode: sanitizedPartyCode });
	});

	// PlayerSelectionScreen

	socket.on('getPlayerRoundState', async (partyCode) => {
		console.log(`${sessionID} | getPlayerRoundState`)
		socket.join(partyCode);
		let gameState: RoundInterface | null = await game.getPlayerRoundState(partyCode, sessionID);
		socket.emit('getPlayerRoundState', gameState);
	});

	socket.on('playCard', async (partyCode, cardID) => {
		console.log(`${sessionID} | playCard`);
		const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
		const cardIdValidation = InputValidator.validateCardId(cardID);

		if (!partyCodeValidation.isValid || !cardIdValidation.isValid) {
			socket.emit('error', { message: 'Invalid input parameters' });
			return;
		}

		await game.playCard(partyCodeValidation.sanitizedValue!, parseInt(cardIdValidation.sanitizedValue!), sessionID, (success, message) => {
			if (success) {
				io.to(partyCodeValidation.sanitizedValue!).emit('newGameState');
			} else {
				socket.emit('error', { message });
			}
		});
	});

	socket.on('judgeSelectCard', async (partyCode, cardID) => {
		console.log(`${sessionID} | judgeSelectCard`);
		await game.judgeSelectCard(partyCode, cardID, sessionID, (success, message) => {
			console.log(`judgeSelectCard | ${success} | ${message} | ${sessionID}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});

	socket.on('shuffleCards', async (partyCode, sourceIdx, destIdx) => {
		await game.shuffleCards(partyCode, sourceIdx, destIdx, sessionID, (success, message) => {
			console.log(`shuffleCards | ${sessionID} | ${success} | ${message}`);
			if (success) {
				socket.emit('newGameState');
			}
		});
	});

	socket.on('endRound', async partyCode => {
		await game.endRound(partyCode, (success, message) => {
			console.log(`endRound | ${success} | ${message} | ${sessionID}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});
});

// serve routing to build
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client', 'dist', 'index.html'));
});

// open server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	logger.info('Server started', {
  		port: PORT,
  		environment: process.env.NODE_ENV || 'development',
  		host: os.hostname()
  	});
});
