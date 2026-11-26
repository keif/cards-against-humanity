import React, { useEffect, useState } from 'react';

import Bottom from '@/components/Bottom/Bottom';
import Button from '@/components/Button/Button';
import Card, { LINK } from '@/components/Card/Card';
import Footer from '@/components/Footer/Footer';
import PlayerList from '@/components/PlayerList/PlayerList';
import Screen from '@/components/Screen/Screen';
import Title from '@/components/Title/Title';
import Top from '@/components/Top/Top';
import FooterSection from '../HomeScreen/FooterSection';
import GameConfigModal from '@/components/GameConfigModal/GameConfigModal';

import { getLobbyState, joinParty, newLobbyState, startGame, onGameStarted, offGameStarted } from '@/api';
import { useParams, useNavigate } from 'react-router-dom';
import { LobbyStateResponse, GameConfig, DEFAULT_GAME_CONFIG } from '@/types';

interface GameState {
	currentPlayerName: string;
	joined: boolean;
	players: string[];
}

const StartGameScreen = () => {
	const { partyCode } = useParams();
	const navigate = useNavigate();
	const [state, setState] = useState<GameState>({
		currentPlayerName: '',
		joined: false,
		players: [],
	});
	const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
	const [gameConfig, setGameConfig] = useState<GameConfig>(DEFAULT_GAME_CONFIG);
	const [isHost, setIsHost] = useState(false);

	useEffect(() => {
		if (partyCode) {
			getLobbyState(partyCode, (response: LobbyStateResponse) => {
				const currentPlayerIndex = response?.players?.indexOf(response?.currentPlayer?.name || '') ?? -1;
				const isFirstPlayer = currentPlayerIndex === 0;

				setState({
					...state,
					currentPlayerName: response?.currentPlayer?.name || '',
					joined: !!response?.currentPlayer,
					players: response?.players || []
				});
				setIsHost(isFirstPlayer);
			});
			newLobbyState(partyCode);

			// Listen for game start event
			onGameStarted((data) => {
				navigate(`/${data.partyCode}`);
			});
		}

		// Cleanup listener on unmount
		return () => {
			offGameStarted();
		};
	}, []);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
		event.preventDefault();
		if (!state.joined && partyCode) {
			const name = state.currentPlayerName;
			// Store party info in localStorage for session persistence
			localStorage.setItem('cah_player_name', name);
			localStorage.setItem('cah_party_code', partyCode);
			// First player in the party (no existing players) becomes host and sets config
			const isFirstPlayer = state.players.length === 0;
			const configToSend = isFirstPlayer ? gameConfig : undefined;
			console.log('🚀 Joining Party:', {
				isFirstPlayer,
				playersCount: state.players.length,
				configToSend,
				rebootingEnabled: configToSend?.enabledRules?.rebootingTheUniverse
			});
			joinParty({ name, partyCode, gameConfig: configToSend });
		}
	}

	// TODO: REFACTOR: need to pass this to the PlayerList Component
	// to retrieve the user input (nested)
	const updatePlayerName = (playerName: string) => {
		setState({
			...state,
			currentPlayerName: playerName
		});
	};

	const handleStartGame = () => {
		if (partyCode) {
			startGame(partyCode);
		}
	};

	const handleSaveConfig = (config: GameConfig) => {
		console.log('⚙️ Config Saved:', config);
		setGameConfig(config);
		// TODO: Send config to server when starting the game
	};

	const renderButton = () => {
		const isFirstPlayer = state.players.length === 0;
		const hasConfiguredRules = gameConfig.enabledRules.rebootingTheUniverse ||
			gameConfig.enabledRules.packingHeat ||
			gameConfig.enabledRules.happyEnding ||
			gameConfig.enabledRules.neverHaveIEver ||
			gameConfig.enabledRules.godIsDead ||
			gameConfig.enabledRules.survivalOfTheFittest ||
			gameConfig.enabledRules.seriousBusiness;

		return (
			<div className="flex flex-col gap-3 w-full">
				{isFirstPlayer && (
					<>
						<button
							type="button"
							onClick={() => setIsConfigModalOpen(true)}
							className="min-h-[48px] px-6 border-2 border-table-line rounded-lg text-paper hover:border-muted font-bold text-center flex items-center justify-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-5 h-5"
							>
								<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
								<circle cx="12" cy="12" r="3" />
							</svg>
							{hasConfiguredRules ? 'House rules set' : 'Set house rules (optional)'}
						</button>
						<p className="text-sm text-muted -mt-1">
							House rules lock once you join.
						</p>
					</>
				)}
				<Button
					className="center"
					disabled={state.currentPlayerName?.length === 0}
					onClick={(event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => handleFormSubmit(event)}
					type="submit"
					text={'Join party'}
				/>
			</div>
		);
	}

	const renderStartButton = () => (
		<div className="flex flex-col gap-3 w-full">
			{isHost && (
				<button
					onClick={() => setIsConfigModalOpen(true)}
					className="min-h-[48px] px-6 border-2 border-table-line rounded-lg text-paper hover:border-muted font-bold text-center flex items-center justify-center gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="w-5 h-5"
					>
						<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
						<circle cx="12" cy="12" r="3" />
					</svg>
					House rules
				</button>
			)}
			<Button
				className="center"
				disabled={state.players?.length < 3}
				onClick={handleStartGame}
				text={'Start the game'}
			/>
		</div>
	)

	return (
		<div className="flex flex-col flex-1">
			<div className="flex-1">
				<Screen>
					<Top>
						<p className="m-0 px-4 pt-4 text-center text-sm font-bold text-muted">
							Send the code or this page's link to your friends. You need at least 3 people to play.
						</p>
						<Card cardType={LINK} link={partyCode} />
					</Top>
					<Bottom>
						<Title text="Players Joined" />
						<form className="mx-auto text-center max-w-[20rem]" onSubmit={handleFormSubmit}>
							<PlayerList players={state.players} joined={state.joined} className="center"
								onChange={updatePlayerName} />
							{state.joined ? renderStartButton() : renderButton()}
						</form>
						<Footer>
							{state.players.length < 3 ? 'Need at least 3 players to start game' : 'Ready to start Game!'}
						</Footer>
					</Bottom>
				</Screen>
			</div>
			<FooterSection />
			<GameConfigModal
				isOpen={isConfigModalOpen}
				onClose={() => setIsConfigModalOpen(false)}
				onSave={handleSaveConfig}
				initialConfig={gameConfig}
			/>
		</div>
	);
};

export default StartGameScreen;
