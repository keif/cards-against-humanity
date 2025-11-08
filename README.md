# Cards Against Humanity - Online Multiplayer

A real-time multiplayer implementation of the popular party card game, built for mobile web browsers. Play with friends from any device with an internet connection.

**Based on:** [yusufameri/cards-against-humanity](https://github.com/yusufameri/cards-against-humanity)

**New contributors:** read the [Repository Guidelines](AGENTS.md) for structure, tooling, and workflow expectations.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tooling and HMR
- **Socket.IO Client** - Real-time game communication
- **React Router** - Client-side routing
- **React DnD** - Card drag-and-drop interactions
- **Vitest** - Unit and component testing (119 tests)

### Backend
- **Node.js (≥18.0.0)** with Express
- **Socket.IO** - Real-time bidirectional communication
- **Redis** - Session storage and game state management
- **TypeScript** - Type safety throughout
- **Winston** - Structured logging

### Infrastructure
- **pnpm** - Package management with workspaces
- **Redis Adapter** - Horizontal Socket.IO scaling support
- Session-based authentication with Redis store
- Rate limiting and security middleware

## Prerequisites

1. **Node.js** ≥18.0.0 (recommend using [nvm](https://github.com/nvm-sh/nvm))
2. **pnpm** - Install globally: `npm install -g pnpm`
3. **Redis** - Running locally or accessible instance

## Development Setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd cards-against-humanity
pnpm install
```

### 2. Configure Environment
```bash
# Server configuration
cp server/.env.example server/.env
# Edit server/.env with your settings

# Client configuration (optional)
cp client/.env.example client/.env
```

**Required environment variables:**
- `SESSION_SECRET` - Secure random string for session signing
- `ALLOWED_ORIGINS` - Comma-separated CORS origins (e.g., `http://localhost:5173`)
- `PORT` - Server port (default: 8080)
- `NODE_ENV` - `development` or `production`

### 3. Start Redis
```bash
# macOS with Homebrew
brew services start redis

# Or run directly
redis-server
```

### 4. Run Development Servers
```bash
# Start both client and server with hot reload
pnpm dev

# Or run separately
pnpm dev:client  # Frontend on http://localhost:5173
pnpm dev:server  # Backend on http://localhost:8080
```

## Building for Production

### Build All
```bash
pnpm build
```

### Build Individual Services
```bash
pnpm build:client  # Outputs to client/dist
pnpm build:server  # Outputs to server/dist
```

### Run Production Server
```bash
cd server
pnpm start  # Runs compiled JS from dist/
```

## Testing

### Client Tests (Frontend)
```bash
# Run all client tests
pnpm test:client

# Watch mode for development
cd client
pnpm test:watch

# Coverage report
pnpm test:coverage

# Interactive UI
pnpm test:ui
```

**Client test coverage:** 119 passing component tests

### Server Tests (Backend)
```bash
# Run all server tests
pnpm test:server

# Watch mode for development
cd server
pnpm test:watch

# Coverage report
pnpm test:coverage

# Interactive UI
pnpm test:ui
```

**Server test coverage:** 68 passing tests
- 10 authentication middleware tests
- 35 card routes API tests
- 23 Socket.IO event handler tests (validation & game flow)

### Run All Tests
```bash
# Run both client and server tests
pnpm test
```

**Total test coverage:** 187 tests (119 client + 68 server)

## Project Structure

```
cards-against-humanity/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Client utilities
│   └── dist/              # Production build output
│
├── server/                # Express + Socket.IO backend
│   ├── src/
│   │   ├── routes/        # REST API routes
│   │   ├── services/      # Business logic (GameService, CardService)
│   │   ├── models/        # Data models
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Server utilities
│   │   └── index.ts       # Server entry point
│   └── dist/              # Production build output
│
└── scripts/               # Utility scripts
    ├── submit-cards.sh    # Card submission tool
    └── example-cards.json # Sample card data
```

## Features

### Core Gameplay
- Real-time multiplayer game rooms
- Card Czar rotation system
- Drag-and-drop card selection
- Live scoring and winner announcement
- Mobile-optimized interface

### Card Management API
User-generated card submission and moderation system:

**Submission Endpoints:**
- `POST /api/cards/submit` - Submit single card
- `POST /api/cards/batch` - Batch submit (up to 100 cards)

**Moderation Endpoints** (requires moderator role):
- `GET /api/cards/pending` - View cards awaiting approval
- `POST /api/cards/approve/:id` - Approve card
- `POST /api/cards/reject/:id` - Reject card with optional reason

**Authentication Endpoints:**
- `GET /api/cards/auth/role` - Check current user's role
- `POST /api/cards/auth/promote` - Promote to moderator (requires `ADMIN_KEY`)

**Query Endpoints:**
- `GET /api/cards/approved` - List approved user cards
- `GET /api/cards/:id/stats` - Card usage statistics
- `GET /api/cards/expansions` - Available card packs

**Command-line submission tool:**
```bash
# Submit single card
./scripts/submit-cards.sh -s "Your card text" A

# Batch submit from JSON
./scripts/submit-cards.sh -b scripts/example-cards.json
```

### Game Management
- `1,322` official cards from base game and expansions
- Support for user-generated cards (pending moderation)
- Redis-backed session management
- Rate limiting for abuse prevention

## Deployment

### Production Checklist

1. **Environment Configuration**
   - Set strong `SESSION_SECRET`
   - Set strong `ADMIN_KEY` for moderator promotion
   - Configure `ALLOWED_ORIGINS` for your domains
   - Set `NODE_ENV=production`
   - Configure `LOG_LEVEL=info` or `warn`

2. **Redis Setup**
   - Ensure Redis is accessible from your server
   - Consider Redis persistence configuration
   - Optional: Redis Cluster for horizontal scaling

3. **Build and Deploy**
   ```bash
   pnpm install --production=false
   pnpm build

   # Serve client/dist/ with static file server (nginx, CDN, etc.)
   # Run server with: cd server && pnpm start
   ```

4. **Security Considerations**
   - Enable HTTPS/TLS in production
   - Configure appropriate CORS origins
   - Review rate limiting thresholds
   - Moderation endpoints protected with role-based authentication
   - Keep `ADMIN_KEY` secret and rotate periodically
   - Regular Redis backups for game state

### Scaling
- Redis Adapter enables horizontal Socket.IO scaling
- Multiple server instances can share Redis for session/game state
- Consider load balancer for multi-instance deployments

## Game Rules

For detailed game rules, see the [official Cards Against Humanity rulebook](https://s3.amazonaws.com/cah/CAH_Rules.pdf).

**Basic Rules:**
1. One player is the Card Czar each round
2. Card Czar reads a question card (black)
3. Other players submit their funniest answer card (white)
4. Card Czar picks the best answer
5. Winner gets a point, Card Czar rotates
6. First to reach point goal wins

## License & Attribution

**License:** MIT

**Original Project:** [yusufameri/cards-against-humanity](https://github.com/yusufameri/cards-against-humanity)

**Disclaimer:** Cards Against Humanity is licensed under [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). This project is for educational and personal use only. Not affiliated with or endorsed by Cards Against Humanity LLC. Do not use for commercial purposes.
