import openSocket from 'socket.io-client';

const socket = openSocket();

// StartGameScreen

export function joinParty({partyCode, name}) {
    socket.emit('joinParty', {partyCode, name});
}

export function getLobbyState(partyCode, cb) {
    socket.emit('getLobbyState', partyCode);
    socket.on('getLobbyState', (response) => cb(response));
}

export function newLobbyState(partyCode) {
    console.log('newLobbyState', partyCode);
    socket.on('newLobbyState', () => {
        socket.emit('getLobbyState', partyCode);
    });
}

// PlayerSelectionScreen

export function getPlayerRoundState(partyCode, cb) {
    console.group('getPlayerRoundState');
    console.log('partyCode:', partyCode);
    console.log('cb:', cb);
    console.groupEnd();
    socket.emit('getPlayerRoundState', partyCode);
    socket.on('getPlayerRoundState', (roundState) => cb(roundState));
}

export function newGameState(partyCode) {
    socket.on('newGameState', () => {
        console.log('server telling me to get newGameState');
        socket.emit('getPlayerRoundState', partyCode);
    });
}

export function playCard(partyCode, cardID) {
    socket.emit('playCard', partyCode, cardID);
}

export function judgeSelectCard(partyCode, cardID) {
    socket.emit('judgeSelectCard', partyCode, cardID);
}

export function shuffleCards(partyCode, sourceIdx, destIdx) {
    socket.emit('shuffleCards', partyCode, sourceIdx, destIdx);
}

export function endRound(partyCode) {
    socket.emit('endRound', partyCode);
}
