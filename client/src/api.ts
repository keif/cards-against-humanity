import { RoundInterface } from "@/Screens/PlayerSelectionScreen/PlayerSelectionScreen";
import { CallbackType } from "@/types";
import openSocket from 'socket.io-client';


const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';


const socket = openSocket(SERVER_URL, {
	transports: ['websocket']
});

socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});

// StartGameScreen
export function joinParty({ partyCode, name }: { partyCode: string; name: string }) {
	socket.emit('joinParty', { partyCode, name });
}

export function getLobbyState(partyCode: string, cb: CallbackType) {
	socket.emit('getLobbyState', partyCode);
	socket.on('getLobbyState', (response) => cb(response));
}

export function newLobbyState(partyCode: string) {
	socket.on('newLobbyState', () => {
		socket.emit('getLobbyState', partyCode);
	});
}

// PlayerSelectionScreen

export function getPlayerRoundState(partyCode: string, cb: (roundState: RoundInterface | null) => void) {
	socket.emit('getPlayerRoundState', partyCode);
	socket.on('getPlayerRoundState', (roundState) => cb(roundState));
}

export function newGameState(partyCode: string) {
	socket.on('newGameState', () => {
		socket.emit('getPlayerRoundState', partyCode);
	});
}

export function playCard(partyCode: string, cardID: number) {
	socket.emit('playCard', partyCode, cardID);
}

export function judgeSelectCard(partyCode: string, cardID: number) {
	socket.emit('judgeSelectCard', partyCode, cardID);
}

export function shuffleCards(partyCode: string, sourceIdx: number, destIdx: number) {
	socket.emit('shuffleCards', partyCode, sourceIdx, destIdx);
}

export function endRound(partyCode: string) {
	socket.emit('endRound', partyCode);
}
