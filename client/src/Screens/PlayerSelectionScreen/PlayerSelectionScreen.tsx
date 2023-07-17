import React, { useEffect, useState } from 'react';
import "./PlayerSelectionScreen.css";

// Import SharedComponents
import Screen from "@/components/Screen/Screen";
import Top from "@/components/Top/Top";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import DropCardSpace from "@/components/DropCardSpace/DropCardSpace";
import Bottom from "@/components/Bottom/Bottom";
import CardCarousel from "@/components/CardCarousel/CardCarousel";
import Footer from "@/components/Footer/Footer";
import Status from "@/components/Status/Status";

// Import Helper Libraries
import { OnDragEndResponder } from "react-beautiful-dnd";
import { endRound, getPlayerRoundState, judgeSelectCard, newGameState, playCard, shuffleCards } from "@/api";
import { useNavigate, useParams } from 'react-router-dom';
import { JUDGE_SELECTING, VIEWING_WINNER } from '@/constants/constants';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardProps } from "@/components/Card/Card";

type RoundTypes = 'judge-selecting' | 'judge-waiting' | 'player-selecting' | 'player-waiting' | 'viewing-winner';
type RoleTypes = 'player' | 'judge';

interface RoundInterface {
	cards: CardProps[];
	directions: string;
	headerText: string;
	otherPlayerCards: CardProps[],
	playerChoice: CardProps | null;
	QCard: CardProps;
	roundState: RoundTypes;
	roundRole: RoleTypes;
	roundJudge: string;
	roundNum: number;
	ticker?: number;
	timeLeft?: number;
	winner: string,
	winningCard: CardProps | null,
}

const PlayerSelectionScreen = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(0);
	console.group("PlayerSelectionScreen");
	console.log('params:', params);
	console.log('timeLeft:', timeLeft);
	console.groupEnd();

	// roundRole: player
	// roundState:
	//    player-selecting -> player-waiting -> judge-selecting -> viewing-winner -> [player-selecting | judge-selecting]
	//
	// roundRole: judge
	// roundState
	//    judge-waiting -> judge-selecting -> viewing-winner -> [player-selecting]

	const [state, setState] = useState<RoundInterface>({
		// get these on getRoundState
		roundState: "viewing-winner",  // player-selecting | player-waiting | judge-selecting | viewing-winner
		roundRole: "judge", // player | judge
		roundJudge: "Keith",
		roundNum: 0,
		QCard: {
			cardType: "Q",
			text: `Join the game with party code ${params.partyCode} before playing`,
			id: 69
		},
		cards: [
			{
				cardType: "A",
				id: 0,
				text: "Hey dummy!",
			},
			{
				cardType: "A",
				id: 1,
				text: "Join the game from the home screen before starting!",
			}
		],
		// these should be set implicitly based on above state
		directions: "Waiting for other Players",
		headerText: "Join game before playing",

		// this is set when user selects a card
		playerChoice: null,

		// these are set for everyone as everyone is selecting their own cards
		otherPlayerCards: [
			{
				cardType: "A",
				text: "(Salman's Card)",
				id: 10,
				owner: {
					name: "Salman",
					pID: 2
				}
			},
			{
				cardType: "A",
				text: "(Reza's Card)",
				id: 11,
				owner: {
					name: "Reza",
					pID: 1
				}
			}
		],
		winner: '',
		// this is set when judge selects a card
		winningCard: { // type=Card || null
			cardType: "A",
			id: 42,
			text: `Go to localhost:3000/game/${params.partyCode}`,
		},
	});

	useEffect(() => {
		console.log("PlayerSelectionScreen: useEffect()");
		let partyCode = params.partyCode;
		const newState = (roundState: RoundInterface | null) => {
			console.group("PlayerSelectionScreen: newState()");
			console.log("roundState:", roundState);
			console.groupEnd();
			if (roundState == null) {
				// redirect them to join
				if (partyCode === 'join') {
					navigate(`/join`);
				} else {
					navigate(`/join/${partyCode}`);
				}
				return;
			}
			console.log(`${new Date().getMinutes()}:${new Date().getSeconds()}`);
			console.log('RoundState:', roundState);
			let headerText = '';
			let directions = '';
			if (roundState.roundState === VIEWING_WINNER) {
				headerText = `${roundState.winner} Won!`;
				directions = '';
			} else if (roundState.roundRole === 'judge') {
				headerText = `You are the Judge`;
				if (roundState.roundState === 'judge-waiting') directions = 'Waiting for players to choose Cards';
				else if (roundState.roundState === JUDGE_SELECTING) directions = 'Choose your favorite card';
			} else {
				headerText = `${roundState.roundJudge} is the Judge`;
				if (roundState.roundState === 'player-selecting') directions = 'Choose one Card';
				else if (roundState.roundState === 'player-waiting') directions = 'Waiting for other players';
				else if (roundState.roundState === JUDGE_SELECTING) directions = `${roundState.roundJudge} is choosing their favorite`;
			}

			setState({
				...state,
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

			if (state.ticker) {
				console.log('updated timeLeft!, deleting ticker');
				clearInterval(state.ticker);
			}
			console.log('timeLeft:', timeLeft);
			let ticker = window.setInterval(() => {
				if (timeLeft <= 0) {
					console.log('clearing interval timeout!', ticker);
					clearInterval(ticker);
				} else {
					console.group('tick: ', ticker);
					console.log('roundState.timeLeft:', roundState.timeLeft);
					console.log('timeLeft:', timeLeft);
					console.log('timeLeft - 1:', timeLeft - 1);
					console.groupEnd();
					setState({
						...state,
						ticker
					});
					if (roundState && roundState?.timeLeft && roundState?.timeLeft > -1) {
						setTimeLeft(roundState.timeLeft - 1);
					}
				}
			}, 1000);
		};

		// ask server to send current gameStateEvents
		getPlayerRoundState(partyCode, newState);
		// subscribe to newGameState events
		newGameState(partyCode);
		return () => {
			console.log("PlayerSelectionScreen: componentWillUnmount()");
			clearInterval(state.ticker);
		};
	}, []);

	// called after viewing-winner, resets state and gets new state from server. Begins new round
	const restoreScreen = () => {
		let partyCode = params.partyCode;
		endRound(partyCode);
		console.log("restoring screen");
	};

	// choosing card logic (drag-and-drop)
	const chooseCardHandler = (result: OnDragEndResponder) => {
		const {destination, source} = result;
		console.log(result);

		if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
			return;
		}

		if (source.droppableId === destination.droppableId) {
			// shift/move cards in correct order @ CardCarousel
			console.log("swapping!");
			let partyCode = params.partyCode;
			shuffleCards(partyCode, source.index, destination.index);
		} else if (source.droppableId === "bottom" && destination.droppableId === "top" && state.playerChoice == null) {
			if (state.roundState === JUDGE_SELECTING && state.roundRole === 'judge') {
				// judge-selecting card
				console.log(`winner card chosen: ${JSON.stringify(state.otherPlayerCards[source.index])}`);
				let partyCode = params.partyCode;
				judgeSelectCard(partyCode, state.otherPlayerCards[source.index].id);
			} else {
				// player-selecting card
				console.log("player chose a card!");
				let partyCode = params.partyCode;
				playCard(partyCode, state.cards[source.index].id);
			}
		}
	};

	// vibrate when dragging card
	const onDragStart = () => {
		if (window.navigator.vibrate) {
			window.navigator.vibrate(100);
		}

	};

	return (
		<Screen>
			{/*<DragDropContext onDragEnd={chooseCardHandler} onDragStart={onDragStart}>*/}
			<DndProvider backend={HTML5Backend}>
				<Top className={state.roundState === VIEWING_WINNER ? 'winner' : ''}>
					<HeaderMenu
						text={state.headerText}
						timeLeft={timeLeft}
					/>
					<DropCardSpace
						QCard={state.QCard}
						playerChoice={state.roundState === VIEWING_WINNER ? state.winningCard : state.playerChoice}
						cardsIn={state.otherPlayerCards.length}
						roundState={state.roundState}
						roundRole={state.roundRole}
					/>
					<div className={state.roundState === VIEWING_WINNER ? 'continueMsg' : ''} id="continueMsg"
					     onClick={restoreScreen}>
						{state.roundState === VIEWING_WINNER ? "Tap anywhere to Continue" : ""}
					</div>
				</Top>
				<Bottom>
					<Status message={state.directions}/>
					<CardCarousel
						cards={
							state.roundState === JUDGE_SELECTING ? state.otherPlayerCards :
								state.roundState === 'judge-waiting' ? [] : state.cards
						}/>
					<Footer>
						Share Link or Party Code: {params.partyCode}
					</Footer>
				</Bottom>
			</DndProvider>
			{/*</DragDropContext>*/}
		</Screen>
	);
};

export default PlayerSelectionScreen;
