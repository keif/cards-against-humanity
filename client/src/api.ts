import { RoundInterface } from "@/Screens/PlayerSelectionScreen/PlayerSelectionScreen";
import { CallbackType } from "@/types";
import openSocket from 'socket.io-client';


const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';

// Initialize session via HTTP request before connecting socket
// This ensures the session cookie is set before Socket.IO connects
let sessionInitialized = false;
const initializeSession = async () => {
	if (sessionInitialized) return;
	try {
		const response = await fetch(`${SERVER_URL}/session`, {
			credentials: 'include', // Send and receive cookies
			headers: {
				'Accept': 'application/json'
			}
		});
		const data = await response.json();
		console.log('🔑 Session initialized:', data.sessionID);
		sessionInitialized = true;
	} catch (error) {
		console.error('❌ Failed to initialize session:', error);
	}
};

// Initialize session immediately
initializeSession();

// Configure socket with credentials to enable cookie-based sessions
const socket = openSocket(SERVER_URL, {
	transports: ['polling', 'websocket'], // Start with polling to establish session, then upgrade to websocket
	withCredentials: true, // Enable sending cookies
	autoConnect: false // Don't auto-connect, wait for session initialization
});

// Connect socket after session is initialized
initializeSession().then(() => {
	socket.connect();
});

socket.on("connect", () => {
	console.log('✅ Connected to server with socket ID:', socket.id);
});

socket.on("connect_error", (err) => {
	console.error('❌ Connection error:', err.message);
});

socket.on("disconnect", (reason) => {
	console.log('🔌 Disconnected:', reason);
});

socket.on("error", (error: { message: string }) => {
	console.error('⚠️  Server error:', error.message);
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

export function startGame(partyCode: string) {
	socket.emit('startGame', partyCode);
}

export function onGameStarted(cb: (data: { partyCode: string }) => void) {
	socket.on('gameStarted', cb);
}

export function offGameStarted() {
	socket.off('gameStarted');
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
