import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express, { Express } from 'express';
import session from 'express-session';
import { createServer } from 'http';
import * as os from 'os';
import * as path from 'path';
import { Server } from 'socket.io';
import { RoundInterface } from './models/types';
import game from './schema';

const SESSION_NAME = 'cah_cookie_session';
const SESSION_SECRET = 'keyboard cat';
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000 // 24 hours
const app: Express = express();
const server = createServer(app);
const io: Server = new Server(server);

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

io.on('connection', (socket) => {
	console.group('User has connected');
	// @ts-ignore
	console.log(`host ${os.hostname()} | client | ${socket.id}`);
	console.log("user-agent: ", socket.request.headers['user-agent']);
	console.groupEnd();

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
		game.joinGame(partyCode, socket.id, name);
		io.to(partyCode).emit('newLobbyState');
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
		game.playCard(partyCode, cardID, socket.id, (success, message) => {
			console.log(`playCard | ${success} | ${message}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
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
		// @ts-ignore
		console.log(`client DISCONNECTED: session(${socket.id})`);
	});
});

// serve routing to build
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client', 'dist', 'index.html'));
});

// open server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
