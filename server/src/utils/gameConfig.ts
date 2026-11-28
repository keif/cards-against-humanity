import { DEFAULT_GAME_CONFIG, GameConfig } from '@/models/types';
import logger from '@/utils/logger';

/**
 * God is Dead, Survival of the Fittest and the default Card Czar each decide the
 * winner differently, so only one can be active. With both judge-less modes on,
 * rounds entered elimination voting while votes were routed to God is Dead, which
 * rejected every vote and softlocked the party.
 *
 * Precedence when a client sends conflicting rules: God is Dead, then Survival of
 * the Fittest. Serious Business needs a Card Czar, so it is turned off in either
 * judge-less mode.
 */
export const normalizeGameConfig = (config: GameConfig | undefined, partyCode?: string): GameConfig => {
	if (!config) {
		return DEFAULT_GAME_CONFIG;
	}

	// Fill rules a client left out so every flag is a real boolean.
	const rules = { ...DEFAULT_GAME_CONFIG.enabledRules, ...config.enabledRules };
	const requested = { ...rules };

	if (rules.godIsDead) {
		rules.survivalOfTheFittest = false;
	}
	if (rules.godIsDead || rules.survivalOfTheFittest) {
		rules.seriousBusiness = false;
	}

	const changed = (Object.keys(rules) as (keyof typeof rules)[]).filter((rule) => rules[rule] !== requested[rule]);
	if (changed.length > 0) {
		logger.warn('Conflicting house rules turned off', { partyCode, turnedOff: changed });
	}

	return { ...config, enabledRules: rules };
};
