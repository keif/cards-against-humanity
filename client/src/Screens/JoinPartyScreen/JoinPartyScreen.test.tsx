import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter, Route, Routes, useParams } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import JoinPartyScreen from './JoinPartyScreen';

const PartyStub = () => <p data-testid="party">{useParams().code}</p>;

const renderJoin = () => render(
	<DndProvider backend={HTML5Backend}>
		<MemoryRouter initialEntries={['/join']}>
			<Routes>
				<Route path="/join" element={<JoinPartyScreen />} />
				<Route path="/join/:code" element={<PartyStub />} />
			</Routes>
		</MemoryRouter>
	</DndProvider>
);

const join = async (value: string) => {
	await userEvent.type(screen.getByLabelText('Party code or invite link'), value);
	await userEvent.click(screen.getByRole('button', { name: 'Join party' }));
};

describe('JoinPartyScreen', () => {
	it('keeps the code\'s case, because the server treats codes as case-sensitive', async () => {
		renderJoin();
		await join('K7qX');
		expect(screen.getByTestId('party')).toHaveTextContent('K7qX');
	});

	it('accepts a pasted invite link', async () => {
		renderJoin();
		await join('https://phuckingcards.com/join/late-night_crew?ref=chat');
		expect(screen.getByTestId('party')).toHaveTextContent('late-night_crew');
	});

	it('shows an error and stays put for input that is not a code', async () => {
		renderJoin();
		await join('<img src=x onerror=alert(1)>');
		expect(screen.getByRole('alert')).toHaveTextContent('doesn\'t look like a party code');
		expect(screen.queryByTestId('party')).toBeNull();
	});

	it('disables Join until something is typed', () => {
		renderJoin();
		expect(screen.getByRole('button', { name: 'Join party' })).toBeDisabled();
	});

	it('submits with Enter', async () => {
		renderJoin();
		await userEvent.type(screen.getByLabelText('Party code or invite link'), 'k7qx{Enter}');
		expect(screen.getByTestId('party')).toHaveTextContent('k7qx');
	});
});
