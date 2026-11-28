import { afterEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_GAME_CONFIG, GameConfig } from '@/models/types';
import logger from '@/utils/logger';
import { normalizeGameConfig } from './gameConfig';

const withRules = (rules: Partial<GameConfig['enabledRules']>): GameConfig => ({
	...DEFAULT_GAME_CONFIG,
	enabledRules: { ...DEFAULT_GAME_CONFIG.enabledRules, ...rules },
});

describe('normalizeGameConfig', () => {
	afterEach(() => vi.restoreAllMocks());

	it('returns the defaults when no config is sent', () => {
		expect(normalizeGameConfig(undefined)).toEqual(DEFAULT_GAME_CONFIG);
	});

	it('keeps God is Dead and drops Survival of the Fittest when both are on', () => {
		const { enabledRules } = normalizeGameConfig(withRules({ godIsDead: true, survivalOfTheFittest: true }));
		expect(enabledRules.godIsDead).toBe(true);
		expect(enabledRules.survivalOfTheFittest).toBe(false);
	});

	it('drops Serious Business in either judge-less mode', () => {
		expect(normalizeGameConfig(withRules({ godIsDead: true, seriousBusiness: true })).enabledRules.seriousBusiness).toBe(false);
		expect(normalizeGameConfig(withRules({ survivalOfTheFittest: true, seriousBusiness: true })).enabledRules.seriousBusiness).toBe(false);
	});

	it('keeps Serious Business with a Card Czar', () => {
		expect(normalizeGameConfig(withRules({ seriousBusiness: true })).enabledRules.seriousBusiness).toBe(true);
	});

	it('leaves the other rules and settings alone', () => {
		const config = { ...withRules({ godIsDead: true, survivalOfTheFittest: true, neverHaveIEver: true, happyEnding: true }), winningScore: 7, handSize: 12 };
		const result = normalizeGameConfig(config);
		expect(result.enabledRules.neverHaveIEver).toBe(true);
		expect(result.enabledRules.happyEnding).toBe(true);
		expect(result.winningScore).toBe(7);
		expect(result.handSize).toBe(12);
	});

	it('fills in rules a client left out', () => {
		const partial = { ...DEFAULT_GAME_CONFIG, enabledRules: { godIsDead: true } } as unknown as GameConfig;
		const { enabledRules } = normalizeGameConfig(partial);
		expect(enabledRules.godIsDead).toBe(true);
		expect(enabledRules.survivalOfTheFittest).toBe(false);
		expect(enabledRules.neverHaveIEver).toBe(false);
	});

	it('logs which rules it turned off, and stays quiet when nothing conflicts', () => {
		const warn = vi.spyOn(logger, 'warn').mockImplementation(() => logger);
		normalizeGameConfig(withRules({ godIsDead: true, survivalOfTheFittest: true, seriousBusiness: true }), 'p1');
		expect(warn).toHaveBeenCalledWith('Conflicting house rules turned off', { partyCode: 'p1', turnedOff: ['survivalOfTheFittest', 'seriousBusiness'] });

		warn.mockClear();
		normalizeGameConfig(withRules({ survivalOfTheFittest: true }), 'p1');
		expect(warn).not.toHaveBeenCalled();
	});
});
