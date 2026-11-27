import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { createHttpRateLimiter, mountHttpRateLimiter } from './rateLimiter';

const LIMIT = 3;

// Mirrors the order in index.ts: limiter mount, API routes, static build, SPA fallback
const buildApp = (distDir: string, trustProxy: number | false = false): Express => {
	const app = express();
	app.set('trust proxy', trustProxy);
	mountHttpRateLimiter(app, createHttpRateLimiter({ max: LIMIT, skipInTest: false }));
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
