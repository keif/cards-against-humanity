import { useEffect, useState } from 'react';
import './PlayerSelectionScreen.css';

// Import SharedComponents
import Bottom from '@/components/Bottom/Bottom';
import CardCarousel from '@/components/CardCarousel/CardCarousel';
import DropCardSpace from '@/components/DropCardSpace/DropCardSpace';
import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import Screen from '@/components/Screen/Screen';
import Status from '@/components/Status/Status';
import Top from '@/components/Top/Top';

// Import Helper Libraries
import { ROUTE_PARAM } from '@/App';
import { endRound, getPlayerRoundState, judgeSelectCard, newGameState, playCard, shuffleCards } from '@/api';
import { A, CardProps, Q } from '@/components/Card/Card';
import { JUDGE_SELECTING, JUDGE_WAITING, PLAYER_SELECTING, VIEWING_WINNER } from '@/constants/constants';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useNavigate, useParams } from 'react-router-dom';
import { DraggedCard, PlayerInfo } from '@/types';

type RoundTypes = 'judge-selecting' | 'judge-waiting' | 'player-selecting' | 'player-waiting' | 'viewing-winner';
type RoleTypes = 'player' | 'judge';

export interface RoundInterface {
	cards: CardProps[];
	currentPlayerName?: string;
	directions: string;
	headerText: string;
	otherPlayerCards: CardProps[],
	playerChoice: CardProps | null;
	QCard: CardProps;
	roundState: RoundTypes;
	roundRole: RoleTypes;
	roundJudge: PlayerInfo;
	roundNum: number;
	ticker?: number;
	timeLeft?: number;
	winner: string,
	winningCard: CardProps | null,
}

interface ParamTypes {
	partyCode: string;
}

const PlayerSelectionScreen = () => {
	const { partyCode } = useParams<ROUTE_PARAM>();
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(0);

	if (!partyCode) {
		navigate(`/join`);
	}

	// roundRole: player
	// roundState:
	//    player-selecting -> player-waiting -> judge-selecting -> viewing-winner -> [player-selecting | judge-selecting]
	//
	// roundRole: judge
	// roundState
	//    judge-waiting -> judge-selecting -> viewing-winner -> [player-selecting]

	const [state, setState] = useState<RoundInterface>({
		// get these on getRoundState
		currentPlayerName: '',
		roundState: 'viewing-winner',  // player-selecting | player-waiting | judge-selecting | viewing-winner
		roundRole: 'judge', // player | judge
		roundJudge: {
			cards: [],
			name: 'Keith',
			pID: 0,
			roundState: '',
			roundsWon: [],
			type: '',
		},
		roundNum: 0,
		QCard: {
			cardType: Q,
			text: `Join the game with party code ${partyCode} before playing`,
			id: 69
		},
		cards: [
			{
				cardType: A,
				id: 0,
				text: 'Hey dummy!',
			},
			{
				cardType: A,
				id: 1,
				text: 'Join the game from the home screen before starting!',
			}
		],
		// these should be set implicitly based on above state
		directions: 'Waiting for other Players',
		headerText: 'Join game before playing',

		// this is set when user selects a card
		playerChoice: null,

		// these are set for everyone as everyone is selecting their own cards
		otherPlayerCards: [
			{
				cardType: A,
				text: '(Salman\'s Card)',
				id: 10,
				owner: {
					name: 'Salman',
					pID: 2
				}
			},
			{
				cardType: A,
				text: '(Reza\'s Card)',
				id: 11,
				owner: {
					name: 'Reza',
					pID: 1
				}
			}
		],
		winner: '',
		// this is set when judge selects a card
		winningCard: { // type=Card || null
			cardType: A,
			id: 42,
			text: `Go to localhost:3000/game/${partyCode}`,
		},
	});

	useEffect(() => {
		const newState = (roundState: RoundInterface | null) => {
			if (roundState == null) {
				// Check if player was previously in this game
				const storedPartyCode = localStorage.getItem('cah_party_code');
				const storedName = localStorage.getItem('cah_player_name');

				// If they were in this party, redirect to lobby to check status
				if (storedPartyCode === partyCode && storedName) {
					navigate(`/join/${partyCode}`);
				} else if (partyCode === 'join') {
					navigate(`/join`);
				} else {
					navigate(`/join/${partyCode}`);
				}
				return;
			}
			let headerText;
			let directions = '';
			if (roundState.roundState === VIEWING_WINNER) {
				headerText = `${roundState.winner} Won!`;
				directions = '';
			} else if (roundState.roundRole === 'judge') {
				headerText = `You are the Judge`;
				if (roundState.roundState === 'judge-waiting') directions = 'Waiting for players to choose Cards';
				else if (roundState.roundState === JUDGE_SELECTING) directions = 'Choose your favorite card';
			} else {
				headerText = `${roundState.roundJudge.name} is the Judge`;
				if (roundState.roundState === 'player-selecting') {
					directions = 'Choose one Card';
				} else if (roundState.roundState === 'player-waiting') {
					directions = 'Waiting for other players';
				} else if (roundState.roundState === JUDGE_SELECTING) {
					directions = `${roundState.roundJudge.name} is choosing their favorite`;
				}
			}

			setState({
				...state,
				currentPlayerName: roundState.currentPlayerName,
				QCard: roundState.QCard,
				cards: roundState.cards,
				otherPlayerCards: roundState.otherPlayerCards,
				roundNum: roundState.roundNum,
				roundRole: roundState.roundRole,
				roundJudge: roundState.roundJudge,
				headerText,
				roundState: roundState.roundState,
				winner: roundState.winner,
				winningCard: roundState.winningCard,
				directions
			});

			// Clear existing ticker if any
			if (state.ticker) {
				clearInterval(state.ticker);
			}

			// Initialize timeLeft from server
			if (roundState?.timeLeft !== undefined) {
				setTimeLeft(roundState.timeLeft);
			}

			// Create countdown timer
			let ticker = window.setInterval(() => {
				setTimeLeft(prevTime => {
					if (prevTime <= 0) {
						clearInterval(ticker);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);

			// Store ticker in state for cleanup
			setState(prevState => ({
				...prevState,
				ticker
			}));
		};

		if (partyCode) {
			// ask server to send current gameStateEvents
			getPlayerRoundState(partyCode, newState);
			// subscribe to newGameState events
			newGameState(partyCode);
		}
		return () => {
			clearInterval(state.ticker);
		};
	}, []);

	// called after viewing-winner, resets state and gets new state from server. Begins new round
	const restoreScreen = () => {
		if (partyCode) {
			endRound(partyCode);
		}
	};

	// Legacy handler for card shuffling in carousel (not used for actual card selection)
	const chooseCardHandler = (item: DraggedCard) => {
		// This handler is called from CardCarousel on hover
		// The actual card selection is handled by handleCardDrop
		// This could be used for card reordering/shuffling if needed in the future
		if (!partyCode || !item) {
			return;
		}
	};

	// Drop handler for react-dnd (receives dropped item with id)
	const handleCardDrop = (item: DraggedCard) => {
		if (!partyCode || !item || !item.id) {
			return;
		}

		// Check if player can drop a card
		if (state.playerChoice != null) {
			return; // Already selected a card
		}

		if (state.roundState === JUDGE_SELECTING && state.roundRole === 'judge') {
			// Judge selecting winner card
			judgeSelectCard(partyCode, item.id);
		} else if (state.roundState === PLAYER_SELECTING && state.roundRole === 'player') {
			// Player selecting card to play
			playCard(partyCode, item.id);
		}
	};

	const isTouchDevice = () => !!("ontouchstart" in window);
	// Assigning backend based on touch support on the device
	const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;


	return (
		<Screen>
			<DndProvider backend={backendForDND}>
				<Top className={state.roundState === VIEWING_WINNER ? 'winner' : ''}>
					<HeaderMenu
						text={state.headerText}
						timeLeft={timeLeft}
						playerName={state.currentPlayerName}
					/>
					<DropCardSpace
						cardsIn={state.otherPlayerCards.length}
						dropHandler={handleCardDrop}
						playerChoice={state.roundState === VIEWING_WINNER ? state.winningCard : state.playerChoice}
						QCard={state.QCard}
						roundRole={state.roundRole}
						roundState={state.roundState}
					/>
					<div
						className={state.roundState === VIEWING_WINNER ? 'continueMsg' : ''}
						id="continueMsg"
						onClick={restoreScreen}
					>
						{state.roundState === VIEWING_WINNER ? 'Tap anywhere to Continue' : ''}
					</div>
				</Top>
				<Bottom>
					<Status message={state.directions} />
					<CardCarousel
						cards={
							state.roundState === JUDGE_SELECTING ? state.otherPlayerCards :
								state.roundState === JUDGE_WAITING ? [] : state.cards
						}
						dropHandler={chooseCardHandler}
					/>
					<Footer>
						Share Link or Party Code: {partyCode}
					</Footer>
				</Bottom>
			</DndProvider>
		</Screen>
	);
};

export default PlayerSelectionScreen;
