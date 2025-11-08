import React, { useState } from 'react';
import { GameConfig, DEFAULT_GAME_CONFIG } from '../../types';

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
	const [config, setConfig] = useState<GameConfig>(initialConfig);

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

	const houseRules = [
		{
			name: 'rebootingTheUniverse' as const,
			label: 'Rebooting the Universe',
			description: 'At any time, players may trade in a point to return their entire hand and draw a new one.'
		},
		{
			name: 'packingHeat' as const,
			label: 'Packing Heat',
			description: 'For Pick 2s, all players draw an extra card before playing.'
		},
		{
			name: 'happyEnding' as const,
			label: 'Happy Ending',
			description: 'When the winner is declared, every player gives their cards to the person on their left.'
		},
		{
			name: 'neverHaveIEver' as const,
			label: 'Never Have I Ever',
			description: 'At any time, players may discard cards they don\'t understand, but must confess their ignorance.'
		},
		{
			name: 'godIsDead' as const,
			label: 'God is Dead',
			description: 'Play with no Card Czar. Each player picks their favorite card. Most votes wins.'
		},
		{
			name: 'survivalOfTheFittest' as const,
			label: 'Survival of the Fittest',
			description: 'After everyone plays, the first player to submit automatically wins.'
		},
		{
			name: 'seriousBusiness' as const,
			label: 'Serious Business',
			description: 'Instead of awarding a point, the Card Czar removes the worst card from play.'
		}
	];

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold m-0">Game Configuration</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
						aria-label="Close"
					>
						×
					</button>
				</div>

				<div className="px-6 py-4">
					{/* Basic Settings */}
					<section className="mb-6">
						<h3 className="text-xl font-semibold mb-4">Basic Settings</h3>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Winning Score (points needed to win)
								</label>
								<div className="flex items-center gap-4">
									<input
										type="range"
										min="1"
										max="50"
										value={config.winningScore}
										onChange={(e) => updateWinningScore(parseInt(e.target.value))}
										className="flex-1"
									/>
									<span className="font-bold text-lg w-12 text-center">{config.winningScore}</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Hand Size (cards per player)
								</label>
								<div className="flex items-center gap-4">
									<input
										type="range"
										min="5"
										max="20"
										value={config.handSize}
										onChange={(e) => updateHandSize(parseInt(e.target.value))}
										className="flex-1"
									/>
									<span className="font-bold text-lg w-12 text-center">{config.handSize}</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Round Timer (optional)
								</label>
								<div className="flex items-center gap-4">
									<select
										value={config.roundTimer ?? 'none'}
										onChange={(e) => updateRoundTimer(e.target.value === 'none' ? undefined : parseInt(e.target.value))}
										className="flex-1 border border-gray-300 rounded px-3 py-2"
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
						<h3 className="text-xl font-semibold mb-4">House Rules</h3>
						<p className="text-sm text-gray-600 mb-4">
							Enable optional rules to customize your game experience. These are based on the official Cards Against Humanity house rules.
						</p>

						<div className="space-y-3">
							{houseRules.map((rule) => (
								<div
									key={rule.name}
									className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
								>
									<label className="flex items-start gap-3 cursor-pointer">
										<input
											type="checkbox"
											checked={config.enabledRules[rule.name]}
											onChange={() => toggleRule(rule.name)}
											className="mt-1 w-5 h-5 cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-semibold">{rule.label}</div>
											<div className="text-sm text-gray-600 mt-1">{rule.description}</div>
										</div>
									</label>
								</div>
							))}
						</div>
					</section>
				</div>

				{/* Footer */}
				<div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
					<button
						onClick={handleReset}
						className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
					>
						Reset to Defaults
					</button>
					<div className="flex gap-3">
						<button
							onClick={onClose}
							className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 font-medium"
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 font-medium"
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
