const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const game = require("./schema");
const path = require('path');
const os = require('os');

// serve production build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// session
const session = require('express-session'); // for express
const sharedsession = require("express-socket.io-session"); // for socket.io

// create a session
const iosession = session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    name: "cah_cookie_session"
});

app.use(iosession);
io.use(sharedsession(iosession, {autoSave: true}));

app.get('/session', (req, res) => {
    if (req.session.name) {
        res.json(`welcome: ${req.session.name}`);
    } else {
        req.session.name = "Yusuf";
        res.json(`welcome for the first time!`);
    }
});

io.on('connect', (client) => {
    console.log(`host ${os.hostname()} | client | ${client.handshake.sessionID}`);

    // StartGameScreen

    client.on('getLobbyState', (partyCode) => {
        client.join(partyCode);

        let response = game.getLobbyState(partyCode, client.handshake.sessionID, (success, message) => {
            // console.log(`Round ended, going to judge-selecting ${success} | ${message}`)
            io.to(partyCode).emit('newGameState');
        });
        client.emit("getLobbyState", response);
    });

    client.on('joinParty', ({partyCode, name}) => {
        console.log(`${client.handshake.sessionID} | joinParty`);
        game.joinGame(partyCode, client.handshake.sessionID, name);
        io.to(partyCode).emit('newLobbyState');
    });

    // PlayerSelectionScreen

    client.on('getPlayerRoundState', (partyCode) => {
        // console.log(`${client.handshake.sessionID} | getPlayerRoundState`)
        client.join(partyCode);
        let gameState = game.getPlayerRoundState(partyCode, client.handshake.sessionID);
        client.emit('getPlayerRoundState', gameState);
    });

    client.on('playCard', (partyCode, cardID) => {
        game.playCard(partyCode, cardID, client.handshake.sessionID, (success, message) => {
            console.log(`playCard | ${success} | ${message}`);
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });

    client.on('judgeSelectCard', (partyCode, cardID) => {
        game.judgeSelectCard(partyCode, cardID, client.handshake.sessionID, (success, message) => {
            console.log(`judgeSelectCard | ${success} | ${message} | ${client.handshake.sessionID}`);
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });

    client.on('shuffleCards', (partyCode, sourceIdx, destIdx) => {
        game.shuffleCards(partyCode, sourceIdx, destIdx, client.handshake.sessionID, (success, message) => {
            console.log(`shuffleCards | ${client.handshake.sessionID} | ${success} | ${message}`);
            if (success) {
                client.emit('newGameState');
            }
        });
    });

    client.on('endRound', partyCode => {
        game.endRound(partyCode, (success, message) => {
            console.log(`endRound | ${success} | ${message} | ${client.handshake.sessionID}`);
            if (success) {
                io.to(partyCode).emit('newGameState');
            }
        });
    });

    client.on('disconnect', function () {
        console.log(`client DISCONNECTED: session(${client.handshake.sessionID})`);
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
