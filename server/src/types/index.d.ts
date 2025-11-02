import "express-session";

declare module 'express-session' {
	export interface SessionData {
		name?: string;
		sessionID?: string;
		role?: 'user' | 'moderator' | 'admin';
	}
}

declare module 'socket.io' {
	export interface Handshake {
		sessionID: string;
	}
}