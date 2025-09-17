import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import crypto from 'crypto';
import express, { Express } from 'express';
import session from 'express-session';
import { createServer } from 'http';
import * as os from 'os';
import * as path from 'path';
import { Server } from 'socket.io';
import { RoundInterface } from './models/types';
import game from './schema';
import { InputValidator } from './utils/validation';
import logger from './utils/logger';
import { checkSocketRateLimit, httpRateLimiter } from './middleware/rateLimiter';

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
	transports: ['websocket'],
	// Additional security options
	allowEIO3: false, // Force latest Engine.IO version
	pingTimeout: 60000,
	pingInterval: 25000
});

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

// create a session
const sessionMiddleware = session({
	cookie: {
		httpOnly: true,
		maxAge: COOKIE_MAX_AGE,
		sameSite: process.env.NODE_ENV === "production" ? "none" : true,
		secure: process.env.NODE_ENV === 'production'
	},
	name: SESSION_NAME,
	resave: true,
	// rolling: true,
	saveUninitialized: true,
	secret: SESSION_SECRET,
});

const sessionCookie = cookieSession({
	name: SESSION_NAME,
	keys: [SESSION_SECRET],
	maxAge: COOKIE_MAX_AGE,
})

// serve production build
app.use(express.static(path.join(__dirname, '../../client', 'dist')));
app.use(cookieParser(),);
app.use(sessionCookie);
io.engine.use(sessionMiddleware);

// convert a connect middleware to a Socket.IO middleware
// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// io.use(wrap(sessionMiddleware));

app.get('/session', (req, res) => {
	console.group('session');
	console.groupEnd();
	if (req.session.name) {
		res.json(`welcome: ${req.session.name}`);
	} else {
		req.session.name = 'Yusuf';
		res.json(`welcome for the first time!`);
	}
});

// io.use((socket, next) => {
// 	const session = socket.request.session;
// 	console.group('io.use');
// 	console.log('session:', session);
// 	console.groupEnd();
// });

io.on('connection', (socket) => {
	logger.info('User connected', {
  		socketId: socket.id,
  		host: os.hostname(),
  		userAgent: socket.request.headers['user-agent'],
  		ip: socket.handshake.address
  	});

	// StartGameScreen
	socket.on('getLobbyState', (partyCode) => {
		// @ts-ignore
		console.group(`${socket.id} | getLobbyState`);
		console.log("socket handshake: ", socket.handshake);
		socket.join(partyCode);

		// @ts-ignore
		let response = game.getLobbyState(partyCode, socket.id, (success, message) => {
			console.log(`Round ended, going to judge-selecting ${success} | ${message}`)
			io.to(partyCode).emit('newGameState');
		});
		console.log('response:', response);
		console.groupEnd();
		socket.emit('getLobbyState', response);
	});

	socket.on('joinParty', ({ partyCode, name }) => {
		// @ts-ignore
		console.group(`${socket.id} | joinParty`);
		console.log('socket.id', socket.id);
		console.log('socket.request.sessionID', socket.request.sessionID);
		console.log(`partyCode: ${partyCode}`);
		console.log(`name: ${name}`);
		console.groupEnd();
		// @ts-ignore
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
			// @ts-ignore
			game.joinGame(sanitizedPartyCode, socket.id, sanitizedName);
			io.to(sanitizedPartyCode).emit('newLobbyState');
		} catch (error) {
			socket.emit('error', { message: 'Failed to join party' });
		}
	});

	// PlayerSelectionScreen

	socket.on('getPlayerRoundState', (partyCode) => {
		// @ts-ignore
		console.log(`${socket.id} | getPlayerRoundState`)
		socket.join(partyCode);
		// @ts-ignore
		let gameState: RoundInterface | null = game.getPlayerRoundState(partyCode, socket.id);
		socket.emit('getPlayerRoundState', gameState);
	});

	socket.on('playCard', (partyCode, cardID) => {
		// @ts-ignore
		console.log(`${socket.id} | playCard`);
		// @ts-ignore
		const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
		const cardIdValidation = InputValidator.validateCardId(cardID);

		if (!partyCodeValidation.isValid || !cardIdValidation.isValid) {
			socket.emit('error', { message: 'Invalid input parameters' });
			return;
		}

		// @ts-ignore
		game.playCard(partyCodeValidation.sanitizedValue!, parseInt(cardIdValidation.sanitizedValue!), socket.id, (success, message) => {
			if (success) {
				io.to(partyCodeValidation.sanitizedValue!).emit('newGameState');
			} else {
				socket.emit('error', { message });
			}
		});
	});

	socket.on('judgeSelectCard', (partyCode, cardID) => {
		// @ts-ignore
		console.log(`${socket.id} | judgeSelectCard`);
		// @ts-ignore
		game.judgeSelectCard(partyCode, cardID, socket.id, (success, message) => {
			// @ts-ignore
			console.log(`judgeSelectCard | ${success} | ${message} | ${socket.id}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});

	socket.on('shuffleCards', (partyCode, sourceIdx, destIdx) => {
		// @ts-ignore
		game.shuffleCards(partyCode, sourceIdx, destIdx, socket.id, (success, message) => {
			// @ts-ignore
			console.log(`shuffleCards | ${socket.id} | ${success} | ${message}`);
			if (success) {
				socket.emit('newGameState');
			}
		});
	});

	socket.on('endRound', partyCode => {
		game.endRound(partyCode, (success, message) => {
			// @ts-ignore
			console.log(`endRound | ${success} | ${message} | ${socket.id}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});

	socket.on('disconnect', function () {
		logger.info('Client disconnected', { sessionId: socket.id });
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
