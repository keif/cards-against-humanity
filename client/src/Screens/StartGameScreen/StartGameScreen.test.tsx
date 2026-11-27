import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import type { LobbyStateResponse } from '@/types';

// Capture the lobby callback so tests can replay server broadcasts.
let lobbyCallback: ((response: LobbyStateResponse) => void) | undefined;
const joinParty = vi.fn();

vi.mock('@/api', () => ({
	getLobbyState: (_code: string, cb: (response: LobbyStateResponse) => void) => { lobbyCallback = cb; },
	newLobbyState: vi.fn(),
	joinParty: (...args: unknown[]) => joinParty(...args),
	startGame: vi.fn(),
	onGameStarted: vi.fn(),
	offGameStarted: vi.fn(),
}));

const { default: StartGameScreen } = await import('./StartGameScreen');

const renderLobby = () => render(
	<DndProvider backend={HTML5Backend}>
		<MemoryRouter initialEntries={['/join/qaround1']}>
			<Routes>
				<Route path="/join/:partyCode" element={<StartGameScreen />} />
			</Routes>
		</MemoryRouter>
	</DndProvider>
);

const broadcast = (response: LobbyStateResponse) => act(() => lobbyCallback?.(response));

describe('StartGameScreen lobby', () => {
	beforeEach(() => {
		lobbyCallback = undefined;
		joinParty.mockClear();
	});

	it('keeps the typed name when another player joins before you do', async () => {
		renderLobby();
		broadcast({ currentPlayer: null, players: ['Alice'] });

		await userEvent.type(screen.getByPlaceholderText('Enter Name Here'), 'Cat');
		broadcast({ currentPlayer: null, players: ['Alice', 'Bob'] });

		const join = screen.getByRole('button', { name: 'Join party' });
		expect(join).toBeEnabled();
		await userEvent.click(join);
		expect(joinParty).toHaveBeenCalledWith(expect.objectContaining({ name: 'Cat', partyCode: 'qaround1' }));
	});

	it('keeps Join disabled until a name is typed, even after broadcasts', () => {
		renderLobby();
		broadcast({ currentPlayer: null, players: ['Alice', 'Bob'] });
		expect(screen.getByRole('button', { name: 'Join party' })).toBeDisabled();
	});

	it('uses the server\'s name once the player has joined', () => {
		renderLobby();
		broadcast({ currentPlayer: { name: 'Cat', pID: 3 }, players: ['Alice', 'Bob', 'Cat'] });
		expect(screen.getByText('Cat')).toBeInTheDocument();
		expect(screen.queryByPlaceholderText('Enter Name Here')).toBeNull();
	});
});
