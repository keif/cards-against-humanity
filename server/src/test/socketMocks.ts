import { vi } from 'vitest';

/**
 * Mock Socket.IO socket for testing
 */
export class MockSocket {
	id: string;
	rooms = new Set<string>();
	handlers = new Map<string, Function>();
	request: any;
	handshake: any;

	constructor(sessionId: string = 'mock-session-id') {
		this.id = `socket-${sessionId}`;
		this.request = {
			session: {
				id: sessionId,
				initialized: true,
				save: vi.fn((cb?: Function) => cb && cb()),
				destroy: vi.fn((cb?: Function) => cb && cb())
			},
			headers: {
				cookie: `session=${sessionId}`
			}
		};
		this.handshake = {
			address: '127.0.0.1',
			headers: {
				'user-agent': 'test-agent'
			}
		};
	}

	emit = vi.fn();
	on = vi.fn((event: string, handler: Function) => {
		this.handlers.set(event, handler);
		return this;
	});
	off = vi.fn();
	join = vi.fn((room: string) => {
		this.rooms.add(room);
		return this;
	});
	leave = vi.fn((room: string) => {
		this.rooms.delete(room);
		return this;
	});
	to = vi.fn(() => this);
	in = vi.fn(() => this);

	/**
	 * Helper to trigger events - simulates client emitting event
	 */
	trigger(event: string, ...args: any[]) {
		const handler = this.handlers.get(event);
		if (handler) {
			return handler(...args);
		}
	}

	/**
	 * Reset all mocks for this socket
	 */
	reset() {
		this.emit.mockClear();
		this.on.mockClear();
		this.join.mockClear();
		this.leave.mockClear();
		this.to.mockClear();
		this.in.mockClear();
		this.rooms.clear();
		this.handlers.clear();
	}
}

/**
 * Mock Socket.IO server for testing
 */
export class MockIO {
	sockets = new Map<string, MockSocket>();
	handlers = new Map<string, Function>();
	middlewares: Function[] = [];

	on = vi.fn((event: string, handler: Function) => {
		this.handlers.set(event, handler);
		return this;
	});
	to = vi.fn((room: string) => this);
	in = vi.fn((room: string) => this);
	emit = vi.fn();
	use = vi.fn((middleware: Function) => {
		this.middlewares.push(middleware);
		return this;
	});
	adapter = vi.fn();

	/**
	 * Helper to simulate a client connection
	 */
	simulateConnection(socket: MockSocket = new MockSocket()) {
		this.sockets.set(socket.id, socket);
		const connectionHandler = this.handlers.get('connection');
		if (connectionHandler) {
			connectionHandler(socket);
		}
		return socket;
	}

	/**
	 * Helper to simulate client disconnection
	 */
	simulateDisconnection(socketId: string) {
		const socket = this.sockets.get(socketId);
		if (socket) {
			socket.trigger('disconnect');
			this.sockets.delete(socketId);
		}
	}

	/**
	 * Reset all mocks for this IO server
	 */
	reset() {
		this.on.mockClear();
		this.to.mockClear();
		this.in.mockClear();
		this.emit.mockClear();
		this.use.mockClear();
		this.sockets.clear();
		this.handlers.clear();
		this.middlewares = [];
	}
}
