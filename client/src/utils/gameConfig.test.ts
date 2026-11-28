import { describe, expect, it } from 'vitest';
import { DEFAULT_GAME_CONFIG, GameConfig } from '@/types';
import { getWinnerMode, setWinnerMode } from './gameConfig';

const withRules = (rules: Partial<GameConfig['enabledRules']>): GameConfig => ({
	...DEFAULT_GAME_CONFIG,
	enabledRules: { ...DEFAULT_GAME_CONFIG.enabledRules, ...rules },
});

describe('getWinnerMode', () => {
	it('defaults to the Card Czar', () => {
		expect(getWinnerMode(DEFAULT_GAME_CONFIG.enabledRules)).toBe('czar');
	});

	it('reads each judge-less mode', () => {
		expect(getWinnerMode(withRules({ godIsDead: true }).enabledRules)).toBe('godIsDead');
		expect(getWinnerMode(withRules({ survivalOfTheFittest: true }).enabledRules)).toBe('survivalOfTheFittest');
	});

	it('picks God is Dead when a config has both, matching the server', () => {
		expect(getWinnerMode(withRules({ godIsDead: true, survivalOfTheFittest: true }).enabledRules)).toBe('godIsDead');
	});
});

describe('setWinnerMode', () => {
	it('turns on exactly one mode', () => {
		const { enabledRules } = setWinnerMode(withRules({ godIsDead: true }), 'survivalOfTheFittest');
		expect(enabledRules.godIsDead).toBe(false);
		expect(enabledRules.survivalOfTheFittest).toBe(true);
	});

	it('clears Serious Business when leaving the Card Czar, and keeps it when staying', () => {
		const serious = withRules({ seriousBusiness: true });
		expect(setWinnerMode(serious, 'godIsDead').enabledRules.seriousBusiness).toBe(false);
		expect(setWinnerMode(serious, 'czar').enabledRules.seriousBusiness).toBe(true);
	});

	it('leaves the other rules and settings alone', () => {
		const config = { ...withRules({ neverHaveIEver: true, happyEnding: true }), winningScore: 7 };
		const result = setWinnerMode(config, 'godIsDead');
		expect(result.enabledRules.neverHaveIEver).toBe(true);
		expect(result.enabledRules.happyEnding).toBe(true);
		expect(result.winningScore).toBe(7);
	});
});
