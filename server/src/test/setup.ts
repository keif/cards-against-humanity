import { beforeAll, afterAll, vi } from 'vitest';
import { Test } from 'supertest';

// supertest starts each app with `listen(0)`, which binds the dual-stack `::`
// address, then always dials 127.0.0.1:<port>. macOS allocates IPv6 ephemeral
// ports without checking IPv4 listeners, so that port can also be held on IPv4
// by another process (another test worker, or any local dev server). The
// request then reaches that server instead: stray 404s/401s, wrong rate-limit
// buckets, hung requests, depending on which files run at the same time.
// Dialing the loopback address of the family the server actually bound always
// reaches our own socket.
const testProto = Test.prototype as any;
const serverAddress = testProto.serverAddress;
testProto.serverAddress = function (app: any, path: string) {
  const url: string = serverAddress.call(this, app, path);
  return app.address()?.family === 'IPv6' ? url.replace('//127.0.0.1:', '//[::1]:') : url;
};

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.ADMIN_KEY = 'test-admin-key';
process.env.REDIS_URL = 'redis://localhost:6379';

// Mock logger to avoid console spam during tests
vi.mock('@/utils/logger', () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

beforeAll(() => {
  // Setup code that runs once before all tests
});

afterAll(() => {
  // Cleanup code that runs once after all tests
});
