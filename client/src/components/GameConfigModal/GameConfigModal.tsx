import React, { useState } from 'react';
import { GameConfig, DEFAULT_GAME_CONFIG } from '../../types';
import { getWinnerMode, setWinnerMode, WinnerMode } from '@/utils/gameConfig';

interface GameConfigModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (config: GameConfig) => void;
	initialConfig?: GameConfig;
}

const GameConfigModal: React.FC<GameConfigModalProps> = ({
	isOpen,
	onClose,
	onSave,
	initialConfig = DEFAULT_GAME_CONFIG
}) => {
	const [config, setConfig] = useState<GameConfig>(() => setWinnerMode(initialConfig, getWinnerMode(initialConfig.enabledRules)));

	if (!isOpen) return null;

	const handleSave = () => {
		onSave(config);
		onClose();
	};

	const handleReset = () => {
		setConfig(DEFAULT_GAME_CONFIG);
	};

	const toggleRule = (ruleName: keyof GameConfig['enabledRules']) => {
		setConfig({
			...config,
			enabledRules: {
				...config.enabledRules,
				[ruleName]: !config.enabledRules[ruleName]
			}
		});
	};

	const updateWinningScore = (value: number) => {
		setConfig({ ...config, winningScore: Math.max(1, Math.min(50, value)) });
	};

	const updateHandSize = (value: number) => {
		setConfig({ ...config, handSize: Math.max(5, Math.min(20, value)) });
	};

	const updateRoundTimer = (value: number | undefined) => {
		setConfig({ ...config, roundTimer: value });
	};

	// Only one of these can decide a round, so they're a single choice rather than checkboxes.
	const winnerModes: { mode: WinnerMode; label: string; description: string }[] = [
		{
			mode: 'czar',
			label: 'Card Czar picks',
			description: 'Standard play. The judge role rotates, and the judge picks the winning card.'
		},
		{
			mode: 'godIsDead',
			label: 'God is Dead',
			description: 'Play with no Card Czar. Each player picks their favorite card. Most votes wins.'
		},
		{
			mode: 'survivalOfTheFittest',
			label: 'Survival of the Fittest',
			description: 'Players eliminate one white card at a time. The last card standing wins.'
		}
	];
	const winnerMode = getWinnerMode(config.enabledRules);

	const houseRules = [
		{
			name: 'rebootingTheUniverse' as const,
			label: 'Rebooting the Universe',
			description: 'At any time, players may trade in a point to return their entire hand and draw a new one.'
		},
		{
			name: 'packingHeat' as const,
			label: 'Packing Heat',
			description: 'Before playing a multi-choice card (Pick 2, Pick 3, etc.), all players (except the Card Czar, duh) draw an extra card for more options.'
		},
		{
			name: 'happyEnding' as const,
			label: 'Happy Ending',
			description: 'To finish the game, play the "Make a Haiku" black card. The haiku doesn\'t need 5-7-5 format but should be read dramatically!'
		},
		{
			name: 'neverHaveIEver' as const,
			label: 'Never Have I Ever',
			description: 'At any time, players may discard cards they don\'t understand, but must confess their ignorance.'
		},
		{
			name: 'seriousBusiness' as const,
			label: 'Serious Business',
			description: 'Instead of awarding a point, the Card Czar removes the worst card from play.'
		}
	];

	return (
		<div className="fixed inset-0 bg-ink/70 flex items-center justify-center z-50 p-4">
			<div className="bg-paper text-ink rounded-lg shadow-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-paper border-b-2 border-paper-shade px-6 py-4 flex items-center justify-between">
					<h2 className="font-display-tight text-[32px] leading-none m-0">Game Configuration</h2>
					<button
						onClick={onClose}
						className="text-ink-muted hover:text-ink text-2xl leading-none w-11 h-11"
						aria-label="Close"
					>
						×
					</button>
				</div>

				<div className="px-6 py-4">
					{/* Basic Settings */}
					<section className="mb-6">
						<h3 className="font-display font-bold text-[22px] mb-4">Basic Settings</h3>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-bold mb-2">
									Winning Score (points needed to win)
								</label>
								<div className="flex items-center gap-4">
									<input
										type="range"
										min="1"
										max="50"
										value={config.winningScore}
										onChange={(e) => updateWinningScore(parseInt(e.target.value))}
										className="flex-1 accent-pink"
									/>
									<span className="font-mono font-bold text-lg w-12 text-center">{config.winningScore}</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-bold mb-2">
									Hand Size (cards per player)
								</label>
								<div className="flex items-center gap-4">
									<input
										type="range"
										min="5"
										max="20"
										value={config.handSize}
										onChange={(e) => updateHandSize(parseInt(e.target.value))}
										className="flex-1 accent-pink"
									/>
									<span className="font-mono font-bold text-lg w-12 text-center">{config.handSize}</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-bold mb-2">
									Round Timer (optional)
								</label>
								<div className="flex items-center gap-4">
									<select
										value={config.roundTimer ?? 'none'}
										onChange={(e) => updateRoundTimer(e.target.value === 'none' ? undefined : parseInt(e.target.value))}
										className="flex-1 border-2 border-paper-shade bg-white rounded-lg px-3 min-h-[44px]"
									>
										<option value="none">No Timer</option>
										<option value="30">30 seconds</option>
										<option value="60">60 seconds</option>
										<option value="90">90 seconds</option>
										<option value="120">2 minutes</option>
									</select>
								</div>
							</div>
						</div>
					</section>

					{/* House Rules */}
					<section className="mb-6">
						<h3 className="font-display font-bold text-[22px] mb-4">House Rules</h3>
						<p className="text-sm text-ink-muted mb-4">
							Enable optional rules to customize your game experience. These are based on the official Cards Against Humanity house rules.
						</p>

						<fieldset className="mb-6 border-0 p-0 m-0">
							<legend className="font-bold mb-3">How the winner is picked</legend>
							<div className="space-y-3">
								{winnerModes.map((option) => (
									<label
										key={option.mode}
										className={`flex items-start gap-3 cursor-pointer border-2 rounded-lg p-4 transition-colors ${winnerMode === option.mode ? 'border-pink' : 'border-paper-shade hover:border-ink-muted'}`}
									>
										<input
											type="radio"
											name="winnerMode"
											value={option.mode}
											checked={winnerMode === option.mode}
											onChange={() => setConfig(setWinnerMode(config, option.mode))}
											className="mt-1 w-5 h-5 cursor-pointer accent-pink"
										/>
										<div className="flex-1">
											<div className="font-bold">{option.label}</div>
											<div className="text-sm text-ink-muted mt-1">{option.description}</div>
										</div>
									</label>
								))}
							</div>
						</fieldset>

						<div className="space-y-3">
							{houseRules.map((rule) => {
								// Serious Business changes what the Card Czar does, so it needs one.
								const needsCzar = rule.name === 'seriousBusiness' && winnerMode !== 'czar';
								return (
									<div
										key={rule.name}
										className={`border-2 border-paper-shade rounded-lg p-4 transition-colors ${needsCzar ? 'opacity-45' : 'hover:border-ink-muted'}`}
									>
										<label className={`flex items-start gap-3 ${needsCzar ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
											<input
												type="checkbox"
												checked={config.enabledRules[rule.name]}
												disabled={needsCzar}
												aria-describedby={needsCzar ? `${rule.name}-needs-czar` : undefined}
												onChange={() => toggleRule(rule.name)}
												className="mt-1 w-5 h-5 cursor-pointer accent-pink disabled:cursor-not-allowed"
											/>
											<div className="flex-1">
												<div className="font-bold">{rule.label}</div>
												<div className="text-sm text-ink-muted mt-1">{rule.description}</div>
												{needsCzar && (
													<div id={`${rule.name}-needs-czar`} className="text-sm font-bold mt-1">Needs a Card Czar.</div>
												)}
											</div>
										</label>
									</div>
								);
							})}
						</div>
					</section>
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-paper border-t-2 border-paper-shade px-6 py-4 flex items-center justify-between">
					<button
						onClick={handleReset}
						className="px-4 min-h-[44px] text-ink-muted hover:text-ink font-bold underline underline-offset-4"
					>
						Reset to Defaults
					</button>
					<div className="flex gap-3">
						<button
							onClick={onClose}
							className="px-6 min-h-[48px] border-2 border-ink rounded-lg hover:bg-paper-shade font-bold"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="px-6 min-h-[48px] bg-pink text-ink rounded-lg shadow-press hover:bg-pink-hover active:translate-y-0.5 active:shadow-none font-bold"
						>
							Save Configuration
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameConfigModal;
