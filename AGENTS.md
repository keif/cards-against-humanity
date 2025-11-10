# Repository Guidelines

## Project Structure & Module Organization
This pnpm workspace keeps the React + Vite client under `client/` and the Express + Socket.IO server under `server/`. Client code groups UI in `components/`, screens in `Screens/`, and shared helpers in `utils/` and `constants/`. Server logic is split into `routes/` (HTTP), `services/` (game + Redis orchestration), `middleware/` (auth, rate limiting), and `models/` (persisted state).

## Build, Test, and Development Commands
- `pnpm install` – install workspace dependencies; rerun after lockfile changes.
- `pnpm dev` – boot client (`5173`) and server (`8080`) with hot reload; `pnpm dev:client` and `pnpm dev:server` run each side alone.
- `pnpm build` – type-check and emit production bundles to `client/dist` and `server/dist`; start compiled server with `cd server && pnpm start`.
- `pnpm test`, `pnpm test:client`, `pnpm test:server` – run Vitest suites; workspace-specific watch/coverage/UI scripts exist for faster loops.
- `./scripts/clear-redis-cards.sh` – wipe and reseed Redis cards before gameplay migrations; ensure `redis-server` is running locally.

## Coding Style & Naming Conventions
Author changes in TypeScript, React function components, and Tailwind utilities for modern UI. Use tabs for indentation, single quotes for strings, and keep semicolons. Components stay in PascalCase, hooks in `useCamelCase`, and shared types belong in `client/src/types.ts` or `server/src/models/types.ts` instead of duplicating. Tests should mirror the file under test and use `*.test.ts` or `*.test.tsx`.

## Testing Guidelines
Vitest powers both layers, with frontend tests colocated beside components (e.g., `client/src/components/Card/Card.test.tsx`) and backend suites inside `server/src/**`. Add or update tests for every new route, Socket.IO event, or UI interaction and keep the total suite (`pnpm test`) green to preserve current 275 passing cases (122 frontend + 153 backend). Prefer descriptive `describe` blocks tied to user-facing behavior and run coverage (`pnpm --filter pc_ui test:coverage`) for larger refactors.

## Commit & Pull Request Guidelines
Commits follow Conventional Commit prefixes (`feat:`, `fix:`, `refactor:`) plus an optional scope, mirroring `git log`. Keep patches focused and reference the subsystem (`fix(server): countdown timer`). Pull requests should summarize gameplay impact, link issues, include screenshots or terminal output for UX/CLI work, and enumerate any required scripts (e.g., `./scripts/clear-redis-cards.sh`) so reviewers can reproduce results.

## Security & Environment
Copy `.env.example` files into `server/.env` and `client/.env`, set `SESSION_SECRET`, `ALLOWED_ORIGINS`, Redis coordinates, and moderator/admin keys before running services or tests. Never commit secrets. Redis must be reachable for local dev, socket tests, and card seeding, and rate-limiter settings in `server/src/middleware/rateLimiter.ts` should be reviewed before exposing new endpoints.
