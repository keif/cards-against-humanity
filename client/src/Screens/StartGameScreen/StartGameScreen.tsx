import React, { useEffect, useState } from 'react';

import Screen from '@/components/Screen/Screen';
import Top from '@/components/Top/Top';
import Title from '@/components/Title/Title';
import Bottom from '@/components/Bottom/Bottom';
import Card from '@/components/Card/Card';
import Button from '@/components/Button/Button';
import Footer from '@/components/Footer/Footer';
import PlayerList from '@/components/PlayerList/PlayerList';
import Banner from 'react-js-banner';
import './StartGameScreen.css';

import { getLobbyState, joinParty, newLobbyState } from '@/api';
import { useParams } from 'react-router-dom';

interface GameState {
	currentPlayerName: string;
	joined: boolean;
	players: any[]; // TODO: fix any type
}

const StartGameScreen = () => {
	console.group('StartGameScreen');
	console.groupEnd();
	const {partyCode} = useParams();
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
		}
	}, []);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
		event.preventDefault();
		if (!state.joined && partyCode) {
			const name = state.currentPlayerName;
			joinParty({name, partyCode});
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

	const renderButton = () => (
		<Button
			className="center"
			disabled={state.currentPlayerName?.length === 0}
			onClick={(event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => handleFormSubmit(event)}
			type="submit"
			text={'Join Party'}
		/>
	)
	const renderLink = () => (
		<Button
			asLink
			className="center"
			disabled={state.players?.length < 3}
			link={`/${partyCode}`}
			text={'Start Game'}
		/>
	)
	return (
		<Screen>
			<Top>
				<Banner
					title="Share the current url / link with your friends to get started! You need at least 3 people to play this game!"/>
				<Card cardType="Link" link={partyCode}/>
			</Top>
			<Bottom>
				<Title text="Players Joined"/>
				<form className={'join-form'} onSubmit={handleFormSubmit}>
					<PlayerList players={state.players} joined={state.joined} className="center"
					            onChange={updatePlayerName}/>
					{state.joined ? renderLink() : renderButton()}
				</form>
				<Footer>
					{state.players.length < 3 ? 'Need at least 3 players to start game' : 'Ready to start Game!'}
				</Footer>
			</Bottom>
		</Screen>
	);
};

export default StartGameScreen;
