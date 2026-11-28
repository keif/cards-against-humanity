import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_GAME_CONFIG, GameConfig } from '@/types';
import GameConfigModal from './GameConfigModal';

const renderModal = (initialConfig: GameConfig = DEFAULT_GAME_CONFIG) => {
	const onSave = vi.fn();
	render(<GameConfigModal isOpen onClose={vi.fn()} onSave={onSave} initialConfig={initialConfig} />);
	return onSave;
};

const save = () => userEvent.click(screen.getByRole('button', { name: 'Save Configuration' }));

describe('GameConfigModal winner mode', () => {
	it('offers the three winner modes as one choice, with the Card Czar selected by default', () => {
		renderModal();
		expect(screen.getByRole('group', { name: 'How the winner is picked' })).toBeInTheDocument();
		expect(screen.getAllByRole('radio')).toHaveLength(3);
		expect(screen.getByRole('radio', { name: /Card Czar picks/ })).toBeChecked();
		// No longer offered as independent checkboxes.
		expect(screen.queryByRole('checkbox', { name: /God is Dead/ })).toBeNull();
		expect(screen.queryByRole('checkbox', { name: /Survival of the Fittest/ })).toBeNull();
	});

	it('saves only one judge-less mode even after switching between them', async () => {
		const onSave = renderModal();
		await userEvent.click(screen.getByRole('radio', { name: /God is Dead/ }));
		await userEvent.click(screen.getByRole('radio', { name: /Survival of the Fittest/ }));
		await save();
		const saved: GameConfig = onSave.mock.calls[0][0];
		expect(saved.enabledRules.godIsDead).toBe(false);
		expect(saved.enabledRules.survivalOfTheFittest).toBe(true);
	});

	it('disables and clears Serious Business without a Card Czar', async () => {
		const onSave = renderModal();
		await userEvent.click(screen.getByRole('checkbox', { name: /Serious Business/ }));
		await userEvent.click(screen.getByRole('radio', { name: /God is Dead/ }));

		const serious = screen.getByRole('checkbox', { name: /Serious Business/ });
		expect(serious).toBeDisabled();
		expect(serious).not.toBeChecked();
		expect(screen.getByText('Needs a Card Czar.')).toBeInTheDocument();

		await save();
		expect(onSave.mock.calls[0][0].enabledRules.seriousBusiness).toBe(false);
	});

	it('cleans up a saved config that has both judge-less modes on', async () => {
		const conflicting = {
			...DEFAULT_GAME_CONFIG,
			enabledRules: { ...DEFAULT_GAME_CONFIG.enabledRules, godIsDead: true, survivalOfTheFittest: true, seriousBusiness: true },
		};
		const onSave = renderModal(conflicting);
		expect(screen.getByRole('radio', { name: /God is Dead/ })).toBeChecked();
		await save();
		const saved: GameConfig = onSave.mock.calls[0][0];
		expect(saved.enabledRules).toMatchObject({ godIsDead: true, survivalOfTheFittest: false, seriousBusiness: false });
	});

	it('keeps the other house rules as independent checkboxes', async () => {
		const onSave = renderModal();
		await userEvent.click(screen.getByRole('checkbox', { name: /Never Have I Ever/ }));
		await userEvent.click(screen.getByRole('radio', { name: /Survival of the Fittest/ }));
		await save();
		expect(onSave.mock.calls[0][0].enabledRules.neverHaveIEver).toBe(true);
	});
});
