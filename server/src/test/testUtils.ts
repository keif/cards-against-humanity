import express, { Express } from 'express';
import session from 'express-session';
import request from 'supertest';
import { vi } from 'vitest';

/**
 * Create a test Express app with session middleware configured
 * This mimics the production setup but uses memory store for sessions
 */
export function createTestApp(router: express.Router): Express {
  const app = express();

  // Parse JSON bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session middleware (using memory store for tests)
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'test-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Mount the router
  app.use(router);

  return app;
}

/**
 * Create a mock Redis client for testing
 */
export function createMockRedis() {
  const store = new Map<string, any>();

  return {
    get: vi.fn(async (key: string) => {
      return store.get(key) || null;
    }),
    set: vi.fn(async (key: string, value: any) => {
      store.set(key, value);
      return 'OK';
    }),
    del: vi.fn(async (key: string) => {
      store.delete(key);
      return 1;
    }),
    keys: vi.fn(async (pattern: string) => {
      return Array.from(store.keys()).filter(key => {
        // Simple pattern matching for 'card:*' patterns
        if (pattern.endsWith('*')) {
          const prefix = pattern.slice(0, -1);
          return key.startsWith(prefix);
        }
        return key === pattern;
      });
    }),
    incr: vi.fn(async (key: string) => {
      const current = store.get(key) || 0;
      const newValue = parseInt(current) + 1;
      store.set(key, newValue.toString());
      return newValue;
    }),
    hgetall: vi.fn(async (key: string) => {
      return store.get(key) || {};
    }),
    hset: vi.fn(async (key: string, field: string, value: any) => {
      const hash = store.get(key) || {};
      hash[field] = value;
      store.set(key, hash);
      return 1;
    }),
    hmset: vi.fn(async (key: string, obj: Record<string, any>) => {
      store.set(key, obj);
      return 'OK';
    }),
    expire: vi.fn(async () => 1),
    quit: vi.fn(async () => 'OK'),
    disconnect: vi.fn(),
    clear: () => store.clear(),
    _store: store, // Expose for debugging
  };
}

/**
 * Helper to make authenticated requests with a session
 */
export class SessionTestAgent {
  private agent: ReturnType<typeof request.agent>;
  private cookies: string[] = [];

  constructor(app: Express) {
    this.agent = request.agent(app);
  }

  /**
   * Make a GET request
   */
  async get(url: string) {
    const req = this.agent.get(url);
    if (this.cookies.length > 0) {
      req.set('Cookie', this.cookies.join('; '));
    }
    const res = await req;
    this.updateCookies(res);
    return res;
  }

  /**
   * Make a POST request
   */
  async post(url: string, body?: any) {
    const req = this.agent.post(url);
    if (this.cookies.length > 0) {
      req.set('Cookie', this.cookies.join('; '));
    }
    if (body) {
      req.send(body);
    }
    const res = await req;
    this.updateCookies(res);
    return res;
  }

  /**
   * Make a DELETE request
   */
  async delete(url: string) {
    const req = this.agent.delete(url);
    if (this.cookies.length > 0) {
      req.set('Cookie', this.cookies.join('; '));
    }
    const res = await req;
    this.updateCookies(res);
    return res;
  }

  /**
   * Update stored cookies from response
   */
  private updateCookies(res: request.Response) {
    const setCookies = res.headers['set-cookie'];
    if (setCookies) {
      this.cookies = Array.isArray(setCookies) ? setCookies : [setCookies];
    }
  }

  /**
   * Clear session cookies
   */
  clearSession() {
    this.cookies = [];
  }
}

/**
 * Create a test agent for making authenticated requests
 */
export function createTestAgent(app: Express): SessionTestAgent {
  return new SessionTestAgent(app);
}
