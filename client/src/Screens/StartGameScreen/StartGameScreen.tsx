import React, { useEffect, useState } from 'react';

import Bottom from '@/components/Bottom/Bottom';
import Button from '@/components/Button/Button';
import Card, { LINK } from '@/components/Card/Card';
import Footer from '@/components/Footer/Footer';
import PlayerList from '@/components/PlayerList/PlayerList';
import Screen from '@/components/Screen/Screen';
import Title from '@/components/Title/Title';
import Top from '@/components/Top/Top';
import Banner from 'react-js-banner';
import './StartGameScreen.css';

import { getLobbyState, joinParty, newLobbyState, startGame, onGameStarted, offGameStarted } from '@/api';
import { useParams, useNavigate } from 'react-router-dom';

interface GameState {
	currentPlayerName: string;
	joined: boolean;
	players: any[]; // TODO: fix any type
}

const StartGameScreen = () => {
	const { partyCode } = useParams();
	const navigate = useNavigate();
	const [state, setState] = useState<GameState>({
		currentPlayerName: '',
		joined: false,
		players: [],
	});

	useEffect(() => {
		if (partyCode) {
			// TODO: fix any type
			getLobbyState(partyCode, (response: any) => {
				setState({
					...state,
					currentPlayerName: response?.currentPlayer?.name,
					joined: !!response?.currentPlayer,
					players: response?.players
				});
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
			joinParty({ name, partyCode });
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

	const renderButton = () => (
		<Button
			className="center"
			disabled={state.currentPlayerName?.length === 0}
			onClick={(event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => handleFormSubmit(event)}
			type="submit"
			text={'Join Party'}
		/>
	)
	const renderStartButton = () => (
		<Button
			className="center"
			disabled={state.players?.length < 3}
			onClick={handleStartGame}
			text={'Start Game'}
		/>
	)
	return (
		<Screen>
			<Top>
				<Banner
					title="Share the current url / link with your friends to get started! You need at least 3 people to play this game!" />
				<Card cardType={LINK} link={partyCode} />
			</Top>
			<Bottom>
				<Title text="Players Joined" />
				<form className={'join-form'} onSubmit={handleFormSubmit}>
					<PlayerList players={state.players} joined={state.joined} className="center"
						onChange={updatePlayerName} />
					{state.joined ? renderStartButton() : renderButton()}
				</form>
				<Footer>
					{state.players.length < 3 ? 'Need at least 3 players to start game' : 'Ready to start Game!'}
				</Footer>
			</Bottom>
		</Screen>
	);
};

export default StartGameScreen;
