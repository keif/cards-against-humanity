import express, {Express, Request, Response} from "express";
import * as http from "http";
import SocketIO from "socket.io";
import game from "./schema";
import * as path from "path";
import * as os from "os";
import session from 'express-session';
import sharedsession from "express-socket.io-session";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    getLobbyState: (partyCode: string, sessionID: string, cb: (lobbyState: any) => void) => void;
    getPlayerRoundState: (partyCode: string, sessionID: string, cb: (playerRoundState: any) => void) => void;
    joinParty: ({partyCode, name}: { partyCode: string, name: string }) => void;
    newGameState: () => void;
    newLobbyState: (lobbyState: any) => void;
    playCard: (partyCode: string, cardID: number, sessionID: string, cb: (success: boolean, message: string) => void) => void;
}

interface ClientToServerEvents {
    endRound: (partyCode: string, cb: (success: boolean, message: string) => void) => void;
    getLobbyState: (partyCode: string, sessionID: string, cb: (lobbyState: any) => void) => void;
    getPlayerRoundState: (partyCode: string, sessionID: string, cb: (playerRoundState: any) => void) => void;
    joinParty: ({partyCode, name}: { partyCode: string, name: string }) => void;
    judgeSelectCard: (partyCode: string, cardID: number, sessionID: string, cb: (success: boolean, message: string) => void) => void;
    playCard: (partyCode: string, cardID: number, sessionID: string, cb: (success: boolean, message: string) => void) => void;
    shuffleCards: (partyCode: string, sourceIdx: number, destIdx: number, sessionID: string, cb: (success: boolean, message: string) => void) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

const app: Express = express();
const server = http.createServer(app);
const io = new SocketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);

// serve production build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// create a session
const ioSession = session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    name: "cah_cookie_session"
});

app.use(ioSession);
io.use(sharedsession(ioSession, {autoSave: true}));

app.get('/session', (req: Request, res: Response) => {
    if (req.session.name) {
        res.json(`welcome: ${req.session.name}`);
    } else {
        req.session.name = "Yusuf";
        res.json(`welcome for the first time!`);
    }
});

io.on('connect', (socket) => {
    console.log(`host ${os.hostname()} | client | ${socket.handshake.sessionID}`);

    // StartGameScreen

    socket.on('getLobbyState', (partyCode) => {
        console.group(`${socket.handshake.sessionID} | getLobbyState`);
        socket.join(partyCode);

        let response = game.getLobbyState(partyCode, socket.handshake.sessionID, (success, message) => {
            console.log(`Round ended, going to judge-selecting ${success} | ${message}`)
            io.to(partyCode).emit('newGameState');
        });
        console.log('response:', response);
        console.groupEnd();
        socket.emit("getLobbyState", response);
    });

    socket.on('joinParty', ({partyCode, name}) => {
        console.group(`${socket.handshake.sessionID} | joinParty`);
        console.log(`partyCode: ${partyCode}`);
        console.log(`name: ${name}`);
        console.groupEnd();
        game.joinGame(partyCode, socket.handshake.sessionID, name);
        io.to(partyCode).emit('newLobbyState');
    });

    // PlayerSelectionScreen

    socket.on('getPlayerRoundState', (partyCode) => {
        console.log(`${socket.handshake.sessionID} | getPlayerRoundState`)
        socket.join(partyCode);
        let gameState = game.getPlayerRoundState(partyCode, socket.handshake.sessionID);
        socket.emit('getPlayerRoundState', gameState);
    });

    socket.on('playCard', (partyCode, cardID) => {
        console.log(`${socket.handshake.sessionID} | playCard`);
        game.playCard(partyCode, cardID, socket.handshake.sessionID, (success, message) => {
            console.log(`playCard | ${success} | ${message}`);
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });

    socket.on('judgeSelectCard', (partyCode, cardID) => {
        console.log(`${socket.handshake.sessionID} | judgeSelectCard`);
        game.judgeSelectCard(partyCode, cardID, socket.handshake.sessionID, (success, message) => {
            console.log(`judgeSelectCard | ${success} | ${message} | ${socket.handshake.sessionID}`);
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });

    socket.on('shuffleCards', (partyCode, sourceIdx, destIdx) => {
        game.shuffleCards(partyCode, sourceIdx, destIdx, socket.handshake.sessionID, (success, message) => {
            console.log(`shuffleCards | ${socket.handshake.sessionID} | ${success} | ${message}`);
            if (success) {
                socket.emit('newGameState');
            }
        });
    });

    socket.on('endRound', partyCode => {
        game.endRound(partyCode, (success, message) => {
            console.log(`endRound | ${success} | ${message} | ${socket.handshake.sessionID}`);
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });

    socket.on('disconnect', function () {
        console.log(`client DISCONNECTED: session(${socket.handshake.sessionID})`);
    });
});

// serve routing to build
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// open server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
