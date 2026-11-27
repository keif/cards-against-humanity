import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import express, { Express } from 'express';
import session from 'express-session';
import request from 'supertest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {
	API_PATHS,
	checkSocketRateLimit,
	createHttpRateLimiter,
	getSocketClientIP,
	mountHttpRateLimiter,
	pruneSocketRateLimiter,
	socketRateLimiter,
} from './rateLimiter';

const LIMIT = 3;

// Mirrors the order in index.ts: limiter, session on API paths, API routes, static build, SPA fallback
const buildApp = (distDir: string, trustProxy: number | false = false): Express => {
	const app = express();
	app.set('trust proxy', trustProxy);
	mountHttpRateLimiter(app, createHttpRateLimiter({ max: LIMIT, skipInTest: false }));
	app.use(API_PATHS, session({ secret: 'test-only', resave: false, saveUninitialized: true }));
	app.get('/api/cards/health', (req, res) => res.json({ ok: true }));
	app.get('/session', (req, res) => res.json({ sessionID: 'x' }));
	app.use(express.static(distDir));
	app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')));
	return app;
};

describe('HTTP rate limiter', () => {
	let distDir: string;

	beforeAll(() => {
		distDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cah-dist-'));
		fs.mkdirSync(path.join(distDir, 'assets'));
		fs.writeFileSync(path.join(distDir, 'index.html'), '<html></html>');
		fs.writeFileSync(path.join(distDir, 'assets', 'index.js'), 'console.log(1)');
		fs.writeFileSync(path.join(distDir, 'assets', 'font.woff2'), 'font');
	});

	afterAll(() => {
		fs.rmSync(distDir, { recursive: true, force: true });
	});

	it('does not count static assets or the SPA fallback toward the budget', async () => {
		const app = buildApp(distDir);
		const paths = ['/', '/assets/index.js', '/assets/font.woff2', '/join/ABCD'];

		// Several full page loads' worth of assets, well past the API limit
		for (let i = 0; i < LIMIT * 3; i++) {
			for (const p of paths) {
				const res = await request(app).get(p);
				expect(res.status).toBe(200);
			}
		}

		// API budget is untouched
		const api = await request(app).get('/api/cards/health');
		expect(api.status).toBe(200);
		expect(api.headers['ratelimit-remaining']).toBe(String(LIMIT - 1));
	});

	it('limits API routes and returns 429 past the limit', async () => {
		const app = buildApp(distDir);

		for (let i = 0; i < LIMIT; i++) {
			expect((await request(app).get('/api/cards/health')).status).toBe(200);
		}

		const blocked = await request(app).get('/api/cards/health');
		expect(blocked.status).toBe(429);
		expect(blocked.body).toEqual({ error: 'Too many requests, please try again later' });

		// /session shares the same budget
		expect((await request(app).get('/session')).status).toBe(429);
	});

	it('keeps serving the client after the API limit is hit', async () => {
		const app = buildApp(distDir);

		for (let i = 0; i <= LIMIT; i++) {
			await request(app).get('/api/cards/health');
		}

		expect((await request(app).get('/api/cards/health')).status).toBe(429);
		expect((await request(app).get('/assets/index.js')).status).toBe(200);
		expect((await request(app).get('/')).status).toBe(200);
	});

	it('does not create sessions for static assets or the SPA fallback', async () => {
		const app = buildApp(distDir);

		for (const p of ['/', '/assets/index.js', '/join/ABCD']) {
			const res = await request(app).get(p);
			expect(res.status).toBe(200);
			expect(res.headers['set-cookie']).toBeUndefined();
		}

		// API paths still establish a session
		const res = await request(app).get('/session');
		expect(res.headers['set-cookie']?.[0]).toMatch(/^connect\.sid=/);
	});

	it('gives each client behind one trusted proxy hop its own bucket', async () => {
		const app = buildApp(distDir, 1);
		const hit = (ip: string) =>
			request(app).get('/api/cards/health').set('X-Forwarded-For', ip);

		for (let i = 0; i < LIMIT; i++) {
			expect((await hit('203.0.113.1')).status).toBe(200);
		}
		expect((await hit('203.0.113.1')).status).toBe(429);
		expect((await hit('203.0.113.2')).status).toBe(200);
	});

	it('ignores X-Forwarded-For when no proxy is trusted', async () => {
		const app = buildApp(distDir, false);

		for (let i = 0; i < LIMIT; i++) {
			await request(app).get('/api/cards/health').set('X-Forwarded-For', `198.51.100.${i}`);
		}

		// Rotating the header does not reset the budget
		const spoofed = await request(app).get('/api/cards/health').set('X-Forwarded-For', '198.51.100.99');
		expect(spoofed.status).toBe(429);
	});
});

describe('Socket.IO client IP', () => {
	const NGINX = '172.18.0.3';
	const handshake = (xff?: string) => ({
		address: NGINX,
		headers: xff === undefined ? {} : { 'x-forwarded-for': xff },
	});

	it('uses the X-Forwarded-For entry nginx appended when one hop is trusted', () => {
		expect(getSocketClientIP(handshake('203.0.113.7'), 1)).toBe('203.0.113.7');
	});

	it('ignores client-supplied entries ahead of the one nginx appended', () => {
		// A client sends its own header; nginx appends the real peer address last
		expect(getSocketClientIP(handshake('1.2.3.4, 203.0.113.7'), 1)).toBe('203.0.113.7');
	});

	it('ignores X-Forwarded-For when no proxy is trusted', () => {
		expect(getSocketClientIP(handshake('203.0.113.7'), 0)).toBe(NGINX);
	});

	it('falls back to the socket address when the header is missing or empty', () => {
		expect(getSocketClientIP(handshake(), 1)).toBe(NGINX);
		expect(getSocketClientIP(handshake(''), 1)).toBe(NGINX);
		expect(getSocketClientIP(handshake(' , '), 1)).toBe(NGINX);
	});

	it('gives players behind the same proxy separate connection budgets', () => {
		socketRateLimiter.clear();
		const alice = getSocketClientIP(handshake('203.0.113.1'), 1);
		const bob = getSocketClientIP(handshake('203.0.113.2'), 1);

		for (let i = 0; i < 100; i++) {
			expect(checkSocketRateLimit(alice)).toBe(true);
		}
		expect(checkSocketRateLimit(alice)).toBe(false);
		expect(checkSocketRateLimit(bob)).toBe(true);
	});
});

describe('Socket.IO limiter pruning', () => {
	beforeEach(() => socketRateLimiter.clear());

	it('drops expired windows and keeps active ones', () => {
		const now = Date.now();
		socketRateLimiter.set('expired', { count: 5, resetTime: now - 1 });
		socketRateLimiter.set('active', { count: 5, resetTime: now + 60000 });

		pruneSocketRateLimiter(now);

		expect(socketRateLimiter.has('expired')).toBe(false);
		expect(socketRateLimiter.get('active')?.count).toBe(5);
	});
});
