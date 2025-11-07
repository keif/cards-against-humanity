import { useEffect, useMemo, useRef, useState } from 'react';

// Import SharedComponents
import Bottom from '@/components/Bottom/Bottom';
import CardCarousel from '@/components/CardCarousel/CardCarousel';
import DropCardSpace from '@/components/DropCardSpace/DropCardSpace';
import Footer from '@/components/Footer/Footer';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import Scoreboard from '@/components/Scoreboard/Scoreboard';
import Screen from '@/components/Screen/Screen';
import Status from '@/components/Status/Status';
import Top from '@/components/Top/Top';

// Import Helper Libraries
import { ROUTE_PARAM } from '@/App';
import { endRound, getPlayerRoundState, judgeSelectCard, newGameState, playCard, shuffleCards } from '@/api';
import { A, CardProps, Q } from '@/components/Card/Card';
import { JUDGE_SELECTING, JUDGE_WAITING, PLAYER_SELECTING, VIEWING_WINNER } from '@/constants/constants';
import { DndProvider } from 'react-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import { DraggedCard, PlayerInfo } from '@/types';
import { loadDndBackend } from '@/utils/dndBackend';
import type { BackendFactory } from 'dnd-core';

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
	winningCards?: CardProps[] | null, // All cards from winning player (for multi-card submissions)
	playerScores?: Array<{ name: string; score: number; pID: number }>;
}

interface ParamTypes {
	partyCode: string;
}

const PlayerSelectionScreen = () => {
	const { partyCode } = useParams<ROUTE_PARAM>();
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(0);
	const [dndBackend, setDndBackend] = useState<BackendFactory | null>(null);
	const [selectedCards, setSelectedCards] = useState<number[]>([]);
	const [droppedCards, setDroppedCards] = useState<CardProps[]>([]); // Cards in drop zone
	const [scoreboardOpen, setScoreboardOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const previousRoundRef = useRef<{ roundNum: number; roundState: string }>({ roundNum: 0, roundState: '' });

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
		playerScores: [],
	});

	// Load DnD backend dynamically based on device type
	useEffect(() => {
		loadDndBackend().then(backend => {
			// Wrap in function to prevent React from treating it as a state updater
			setDndBackend(() => backend);
		});
	}, []);

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
					const numCards = roundState.QCard?.numAnswers || 1;
					directions = numCards > 1 ? `Pick ${numCards} Cards` : 'Choose one Card';
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
				winningCards: roundState.winningCards,
				playerScores: roundState.playerScores,
				directions
			});

			// Only clear selected cards when round number or round state actually changes
			const roundChanged = roundState.roundNum !== previousRoundRef.current.roundNum;
			const stateChanged = roundState.roundState !== previousRoundRef.current.roundState;

			if (roundChanged || stateChanged) {
				setSelectedCards([]);
				setDroppedCards([]); // Clear dropped cards on round change
				previousRoundRef.current = {
					roundNum: roundState.roundNum ?? 0,
					roundState: roundState.roundState ?? ''
				};
			}

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

	// Copy party URL to clipboard
	const handleCopyLink = async () => {
		const url = window.location.href;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	// Toggle card selection for multi-card questions
	const toggleCardSelection = (cardId: number) => {
		const numCardsRequired = state.QCard?.numAnswers || 1;

		// For single-card questions, submit immediately (backward compatibility)
		if (numCardsRequired === 1) {
			if (partyCode) {
				playCard(partyCode, cardId);
			}
			return;
		}

		// Multi-card selection logic
		setSelectedCards(prev => {
			if (prev.includes(cardId)) {
				// Deselect card
				return prev.filter(id => id !== cardId);
			} else if (prev.length < numCardsRequired) {
				// Add card to selection
				return [...prev, cardId];
			} else {
				// Already at max, don't add more
				return prev;
			}
		});
	};

	// Submit dropped cards
	const handleSubmitCards = () => {
		if (!partyCode || droppedCards.length === 0) {
			return;
		}

		const numCardsRequired = state.QCard?.numAnswers || 1;
		if (droppedCards.length !== numCardsRequired) {
			return;
		}

		// Submit cards (extract IDs)
		const cardIds = droppedCards.map(c => c.id).filter((id): id is number => id !== undefined);
		playCard(partyCode, cardIds);
		// Clear dropped cards
		setDroppedCards([]);
	};

	// Group cards by player for judge view - returns structured groups
	const groupCardsByPlayerStructured = (cards: CardProps[]) => {
		const grouped: { [pID: number]: CardProps[] } = {};

		// Group cards by player ID
		cards.forEach(card => {
			const pID = card.owner?.pID;
			if (pID !== undefined) {
				if (!grouped[pID]) {
					grouped[pID] = [];
				}
				grouped[pID].push(card);
			}
		});

		// Convert to array of CardGroup objects
		return Object.keys(grouped).map(pIDStr => {
			const pID = parseInt(pIDStr);
			return {
				playerID: pID,
				playerName: grouped[pID][0]?.owner?.name,
				cards: grouped[pID]
			};
		});
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
			const numCardsRequired = state.QCard?.numAnswers || 1;

			// Find the card from hand
			const card = state.cards.find(c => c.id === item.id);
			if (!card) return;

			if (numCardsRequired > 1) {
				// Multi-card: add to drop zone if not already there and not at max
				setDroppedCards(prev => {
					if (prev.some(c => c.id === item.id)) {
						return prev; // Already dropped
					}
					if (prev.length >= numCardsRequired) {
						return prev; // Already at max
					}
					return [...prev, card];
				});
			} else {
				// Single card - submit immediately
				playCard(partyCode, item.id);
			}
		}
	};

	// Handler for removing card from drop zone (drag back to hand)
	const handleCardRemove = (item: DraggedCard) => {
		if (!item || !item.id) {
			return;
		}
		setDroppedCards(prev => prev.filter(c => c.id !== item.id));
	};

	// Filter cards in hand to exclude dropped cards
	const cardsInHand = useMemo(() => {
		return state.cards.filter(card =>
			!droppedCards.some(dropped => dropped.id === card.id)
		);
	}, [state.cards, droppedCards]);

	// Don't render until DnD backend is loaded
	if (!dndBackend) {
		return <div>Loading...</div>;
	}

	return (
		<Screen>
			{dndBackend && (
			<DndProvider backend={dndBackend}>
				<Top className={state.roundState === VIEWING_WINNER ? 'winner' : ''}>
					<HeaderMenu
						text={state.headerText}
						timeLeft={timeLeft}
						playerName={state.currentPlayerName}
						playerScore={state.playerScores?.find(p => p.name === state.currentPlayerName)?.score}
						onScoreClick={() => setScoreboardOpen(!scoreboardOpen)}
					/>
					<Scoreboard
						playerScores={state.playerScores || []}
						currentPlayerName={state.currentPlayerName}
						isOpen={scoreboardOpen}
						onClose={() => setScoreboardOpen(false)}
					/>
					<DropCardSpace
						cardsIn={state.otherPlayerCards.length}
						dropHandler={handleCardDrop}
						playerChoice={state.roundState === VIEWING_WINNER ? state.winningCard : state.playerChoice}
						winningCards={state.roundState === VIEWING_WINNER ? state.winningCards : null}
						droppedCards={droppedCards}
						QCard={state.QCard}
						roundRole={state.roundRole}
						roundState={state.roundState}
					/>
					{state.roundState === VIEWING_WINNER && (
						<div className="text-center mt-5">
							<button
								onClick={restoreScreen}
								className="px-8 py-3 text-lg font-bold bg-[#4CAF50] text-white border-0 rounded cursor-pointer shadow-lg hover:bg-[#45a049] transition-colors"
							>
								Next Round
							</button>
						</div>
					)}
				</Top>
				<Bottom>
					<Status message={state.directions} />
					{state.roundState === PLAYER_SELECTING && state.roundRole === 'player' && (state.QCard?.numAnswers || 1) > 1 && (
						<div className="text-center p-2.5">
							{droppedCards.length > 0 && (
								<span className="mr-2.5 text-white">
									Cards Played: {droppedCards.length} / {state.QCard?.numAnswers || 1}
								</span>
							)}
							{droppedCards.length === (state.QCard?.numAnswers || 1) && (
								<button
									onClick={handleSubmitCards}
									className="px-5 py-2.5 text-base font-bold bg-[#2196F3] text-white border-0 rounded cursor-pointer hover:bg-[#1976D2] transition-colors"
								>
									Submit Cards
								</button>
							)}
						</div>
					)}
					<CardCarousel
						cards={
							state.roundState === JUDGE_SELECTING
								? undefined
								: state.roundState === JUDGE_WAITING
									? []
									: cardsInHand
						}
						cardGroups={
							state.roundState === JUDGE_SELECTING
								? groupCardsByPlayerStructured(state.otherPlayerCards)
								: undefined
						}
						onCardRemove={handleCardRemove}
					/>
					<Footer>
						<div className="flex items-center justify-center gap-2.5">
							<span>Share Link or Party Code: {partyCode}</span>
							<button
								onClick={handleCopyLink}
								className="bg-transparent border-0 cursor-pointer p-1.5 flex items-center transition-transform hover:scale-110"
								title="Copy link to clipboard"
							>
								{copied ? (
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								) : (
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
									</svg>
								)}
							</button>
							{copied && (
								<span className="text-[#4CAF50] text-sm font-bold">
									Copied!
								</span>
							)}
						</div>
					</Footer>
				</Bottom>
			</DndProvider>
			)}
		</Screen>
	);
};

export default PlayerSelectionScreen;
