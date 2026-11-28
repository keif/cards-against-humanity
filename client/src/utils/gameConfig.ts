import { GameConfig } from '@/types';

/**
 * How a round's winner is picked. Only one can be active: combining God is Dead and
 * Survival of the Fittest softlocked rounds (the server enforces the same rule in
 * server/src/utils/gameConfig.ts).
 */
export type WinnerMode = 'czar' | 'godIsDead' | 'survivalOfTheFittest';

// Same precedence as the server: God is Dead, then Survival of the Fittest.
export const getWinnerMode = (rules: GameConfig['enabledRules']): WinnerMode => {
	if (rules.godIsDead) return 'godIsDead';
	if (rules.survivalOfTheFittest) return 'survivalOfTheFittest';
	return 'czar';
};

// Serious Business needs a Card Czar, so it switches off in the judge-less modes.
export const setWinnerMode = (config: GameConfig, mode: WinnerMode): GameConfig => ({
	...config,
	enabledRules: {
		...config.enabledRules,
		godIsDead: mode === 'godIsDead',
		survivalOfTheFittest: mode === 'survivalOfTheFittest',
		seriousBusiness: mode === 'czar' ? config.enabledRules.seriousBusiness : false,
	},
});
