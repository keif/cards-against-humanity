# Session Management Implementation

## Overview
Implemented persistent session management using express-session and cookies to maintain player identity across browser refreshes.

## How It Works

### Server-Side (`server/src/index.ts`)

1. **Session Middleware Setup**
   - Uses `express-session` with crypto.randomUUID() for session ID generation
   - Session cookie configured with 6-hour expiration
   - Rolling sessions (refresh on each request)
   - Session data stored in memory (can be configured to use Redis for production)

2. **Socket.IO Session Integration**
   - Express session middleware wrapped for Socket.IO compatibility
   - Each socket connection extracts sessionID from the HTTP session
   - Helper function `getSessionID(socket)` retrieves persistent session ID
   - Map tracks socket.id → sessionID for connection management

3. **Player Identification**
   - All game operations use sessionID instead of transient socket.id
   - Players maintain identity even when socket.id changes on reconnect
   - Session persists across browser refreshes via HTTP cookie

### Client-Side

1. **Socket Configuration (`client/src/api.ts`)**
   - Socket.IO client configured with `withCredentials: true`
   - Enables automatic cookie transmission with socket requests
   - Connection event handlers for debugging

2. **Local Storage (`StartGameScreen.tsx`, `PlayerSelectionScreen.tsx`)**
   - Stores player name and party code in localStorage
   - Used for graceful navigation after refresh
   - Helps determine if player should be in game vs lobby

## Testing Session Persistence

1. **Join a game:**
   - Navigate to `/join/{partyCode}`
   - Enter your name and join the party
   - Start the game (need 3+ players)

2. **Refresh the browser:**
   - The session cookie is sent automatically
   - Server recognizes you by sessionID
   - You should remain in the game with your cards

3. **Check browser console:**
   - Look for session establishment logs
   - Check for "Socket session established" messages
   - Verify sessionID remains constant across refreshes

## What Happens on Refresh

1. Browser sends session cookie with Socket.IO connection
2. Server middleware extracts sessionID from cookie
3. Socket handlers use sessionID to look up player in game
4. Player's game state is retrieved and sent to client
5. Client renders appropriate screen based on game state

## Known Behaviors

- If round state is null (game not started), user redirected to lobby
- If player not in game, redirected to join screen
- LocalStorage helps provide better UX during edge cases

## Production Considerations

### Session Store
Currently sessions are stored in memory. For production:
- Use Redis session store with connect-redis
- Share sessions across multiple server instances
- Persist sessions across server restarts

### Cookie Security
- `httpOnly: true` - prevents JavaScript access to cookie
- `secure: true` in production - requires HTTPS
- `sameSite` configured based on environment
- Session secret should be set via SESSION_SECRET env var

### Environment Variables
See `.env.example` for required configuration:
- `SESSION_SECRET` - cryptographic secret for signing cookies
- `REDIS_HOST` / `REDIS_PORT` - if using Redis session store
- `ALLOWED_ORIGINS` - CORS configuration

## Files Modified

### Server
- `server/src/index.ts` - Session middleware and Socket.IO integration
- `server/package.json` - Updated dev script for tsconfig-paths
- `server/tsconfig.json` - Added path aliases

### Client
- `client/src/api.ts` - Socket configuration with credentials
- `client/src/Screens/StartGameScreen/StartGameScreen.tsx` - localStorage persistence
- `client/src/Screens/PlayerSelectionScreen/PlayerSelectionScreen.tsx` - Reconnection handling

## Debugging

### Server Logs
Look for:
- "Socket session established" with sessionID
- "User connected" / "User disconnected" with both socket.id and sessionID
- Event handler logs showing sessionID instead of socket.id

### Client Logs
Look for:
- "✅ Connected to server" with socket ID
- "🎮 PlayerSelectionScreen - Received round state"
- "⚠️ Round state is null" messages with stored data

### Common Issues

1. **Session not persisting**
   - Check browser allows cookies
   - Verify CORS credentials are enabled
   - Check SESSION_SECRET is set

2. **Player kicked out on refresh**
   - Check round state is not null
   - Verify player exists in game.players
   - Ensure socket joins the room

3. **Different sessionID on each request**
   - Check session middleware is properly configured
   - Verify cookie is being sent by client
   - Check cookie domain/path settings
