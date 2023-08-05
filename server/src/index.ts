import express, { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import game from './schema';
import * as path from 'path';
import * as os from 'os';
import session from 'express-session';
import sharedsession from 'express-socket.io-session';
import { RoundInterface } from './models/types';

const app: Express = express();
const server = createServer(app);
// const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);
const io: Server = new Server(server);

// serve production build
app.use(express.static(path.join(__dirname, '../../client', 'dist')));

// create a session
const ioSession = session({
	name: 'cah_cookie_session',
	resave: true,
	saveUninitialized: true,
	secret: 'keyboard cat',
});

app.use(ioSession);
io.use(sharedsession(ioSession, {autoSave: true}));

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
	console.group('connection');
	// @ts-ignore
	console.log(`host ${os.hostname()} | client | ${socket.handshake.sessionID}`);
	console.groupEnd();

	// StartGameScreen
	socket.on('getLobbyState', (partyCode) => {
		// @ts-ignore
		console.group(`${socket.handshake.sessionID} | getLobbyState`);
		socket.join(partyCode);

		// @ts-ignore
		let response = game.getLobbyState(partyCode, socket.handshake.sessionID, (success, message) => {
			console.log(`Round ended, going to judge-selecting ${success} | ${message}`)
			io.to(partyCode).emit('newGameState');
		});
		console.log('response:', response);
		console.groupEnd();
		socket.emit('getLobbyState', response);
	});

	socket.on('joinParty', ({partyCode, name}) => {
		// @ts-ignore
		console.group(`${socket.handshake.sessionID} | joinParty`);
		console.log(`partyCode: ${partyCode}`);
		console.log(`name: ${name}`);
		console.groupEnd();
		// @ts-ignore
		game.joinGame(partyCode, socket.handshake.sessionID, name);
		io.to(partyCode).emit('newLobbyState');
	});

	// PlayerSelectionScreen

	socket.on('getPlayerRoundState', (partyCode) => {
		// @ts-ignore
		console.log(`${socket.handshake.sessionID} | getPlayerRoundState`)
		socket.join(partyCode);
		// @ts-ignore
		let gameState: RoundInterface | null = game.getPlayerRoundState(partyCode, socket.handshake.sessionID);
		socket.emit('getPlayerRoundState', gameState);
	});

	socket.on('playCard', (partyCode, cardID) => {
		// @ts-ignore
		console.log(`${socket.handshake.sessionID} | playCard`);
		// @ts-ignore
		game.playCard(partyCode, cardID, socket.handshake.sessionID, (success, message) => {
			console.log(`playCard | ${success} | ${message}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});

	socket.on('judgeSelectCard', (partyCode, cardID) => {
		// @ts-ignore
		console.log(`${socket.handshake.sessionID} | judgeSelectCard`);
		// @ts-ignore
		game.judgeSelectCard(partyCode, cardID, socket.handshake.sessionID, (success, message) => {
			// @ts-ignore
			console.log(`judgeSelectCard | ${success} | ${message} | ${socket.handshake.sessionID}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});

	socket.on('shuffleCards', (partyCode, sourceIdx, destIdx) => {
		// @ts-ignore
		game.shuffleCards(partyCode, sourceIdx, destIdx, socket.handshake.sessionID, (success, message) => {
			// @ts-ignore
			console.log(`shuffleCards | ${socket.handshake.sessionID} | ${success} | ${message}`);
			if (success) {
				socket.emit('newGameState');
			}
		});
	});

	socket.on('endRound', partyCode => {
		game.endRound(partyCode, (success, message) => {
			// @ts-ignore
			console.log(`endRound | ${success} | ${message} | ${socket.handshake.sessionID}`);
			if (success) {
				io.to(partyCode).emit('newGameState');
			}
		});
	});

	socket.on('disconnect', function () {
		// @ts-ignore
		console.log(`client DISCONNECTED: session(${socket.handshake.sessionID})`);
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
