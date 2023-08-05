"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var schema_1 = require("./schema");
var path = require("path");
var os = require("os");
var express_session_1 = require("express-session");
var express_socket_io_session_1 = require("express-socket.io-session");
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
// const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);
var io = new socket_io_1.Server(server);
// serve production build
app.use(express_1.default.static(path.join(__dirname, 'client', 'build')));
// create a session
var ioSession = (0, express_session_1.default)({
    name: 'cah_cookie_session',
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
});
app.use(ioSession);
io.use((0, express_socket_io_session_1.default)(ioSession, { autoSave: true }));
app.get('/session', function (req, res) {
    if (req.session.name) {
        res.json("welcome: ".concat(req.session.name));
    }
    else {
        req.session.name = 'Yusuf';
        res.json("welcome for the first time!");
    }
});
io.on('connection', function (socket) {
    // @ts-ignore
    console.log("host ".concat(os.hostname(), " | client | ").concat(socket.handshake.sessionID));
    console.log('socket.data:', socket.data);
    console.log('socket.handshake:', socket.handshake);
    // StartGameScreen
    socket.on('getLobbyState', function (partyCode) {
        // @ts-ignore
        console.group("".concat(socket.handshake.sessionID, " | getLobbyState"));
        socket.join(partyCode);
        // @ts-ignore
        var response = schema_1.default.getLobbyState(partyCode, socket.handshake.sessionID, function (success, message) {
            console.log("Round ended, going to judge-selecting ".concat(success, " | ").concat(message));
            io.to(partyCode).emit('newGameState');
        });
        console.log('response:', response);
        console.groupEnd();
        socket.emit('getLobbyState', response);
    });
    socket.on('joinParty', function (_a) {
        var partyCode = _a.partyCode, name = _a.name;
        // @ts-ignore
        console.group("".concat(socket.handshake.sessionID, " | joinParty"));
        console.log("partyCode: ".concat(partyCode));
        console.log("name: ".concat(name));
        console.groupEnd();
        // @ts-ignore
        schema_1.default.joinGame(partyCode, socket.handshake.sessionID, name);
        io.to(partyCode).emit('newLobbyState');
    });
    // PlayerSelectionScreen
    socket.on('getPlayerRoundState', function (partyCode) {
        // @ts-ignore
        console.log("".concat(socket.handshake.sessionID, " | getPlayerRoundState"));
        socket.join(partyCode);
        // @ts-ignore
        var gameState = schema_1.default.getPlayerRoundState(partyCode, socket.handshake.sessionID);
        socket.emit('getPlayerRoundState', gameState);
    });
    socket.on('playCard', function (partyCode, cardID) {
        // @ts-ignore
        console.log("".concat(socket.handshake.sessionID, " | playCard"));
        // @ts-ignore
        schema_1.default.playCard(partyCode, cardID, socket.handshake.sessionID, function (success, message) {
            console.log("playCard | ".concat(success, " | ").concat(message));
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });
    socket.on('judgeSelectCard', function (partyCode, cardID) {
        // @ts-ignore
        console.log("".concat(socket.handshake.sessionID, " | judgeSelectCard"));
        // @ts-ignore
        schema_1.default.judgeSelectCard(partyCode, cardID, socket.handshake.sessionID, function (success, message) {
            // @ts-ignore
            console.log("judgeSelectCard | ".concat(success, " | ").concat(message, " | ").concat(socket.handshake.sessionID));
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });
    socket.on('shuffleCards', function (partyCode, sourceIdx, destIdx) {
        // @ts-ignore
        schema_1.default.shuffleCards(partyCode, sourceIdx, destIdx, socket.handshake.sessionID, function (success, message) {
            // @ts-ignore
            console.log("shuffleCards | ".concat(socket.handshake.sessionID, " | ").concat(success, " | ").concat(message));
            if (success) {
                socket.emit('newGameState');
            }
        });
    });
    socket.on('endRound', function (partyCode) {
        schema_1.default.endRound(partyCode, function (success, message) {
            // @ts-ignore
            console.log("endRound | ".concat(success, " | ").concat(message, " | ").concat(socket.handshake.sessionID));
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });
    socket.on('disconnect', function () {
        // @ts-ignore
        console.log("client DISCONNECTED: session(".concat(socket.handshake.sessionID, ")"));
    });
});
// serve routing to build
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
// open server
var PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
    console.log("Listening on port ".concat(PORT));
});
