import find from 'lodash/find';
import remove from 'lodash/remove';
import shuffle from 'lodash/shuffle';
import { JUDGE, JUDGE_SELECTING, JUDGE_WAITING, PLAYER, PLAYER_SELECTING, PLAYER_WAITING, VIEWING_WINNER } from '@/constants';
import { Card } from '@/data/types';
import { getShuffledACard, getShuffledQCard } from '@/models/Card';
import { CallbackType, GameInterface, PlayerInterface, RoundInterface } from '@/models/types';
import logger from '@/utils/logger';

class Game implements GameInterface {
	ACardDeck: Card[];
	active: boolean;
	partyCode: string;
	gameStartDate: Date;
	players: { [index: string]: any };
	QCardDeck: Card[];
	roundFinishedNotifier: CallbackType;
	roundLength: number;
	rounds: RoundInterface[];
	roundsIdle: number; // if at least |this.players.length.length| roundsIdle, then game state is inactive
	roundTimer: null | ReturnType<typeof setTimeout>;

	constructor(
		partyCode: string,
		roundLength: number = 10,
		roundFinishedNotifier: CallbackType
	) {
		console.group('Game constructor');
		console.log('partyCode:', partyCode);
		console.log('roundLength:', roundLength);
		console.log('roundFinishedNotifier:', roundFinishedNotifier);
		console.groupEnd();
		this.active = true;
		this.roundsIdle = 0; // if at least |this.players.length.length| roundsIdle, then game state is inactive
		this.partyCode = partyCode;
		this.gameStartDate = new Date();
		// Initialize decks as empty - will be populated in initialize()
		this.QCardDeck = [];
		this.ACardDeck = [];
		this.players = {};
		this.rounds = [];
		this.roundLength = roundLength;
		this.roundFinishedNotifier = roundFinishedNotifier;
		this.roundTimer = null;

		this.addNewPlayer = this.addNewPlayer.bind(this);
		this.endRound = this.endRound.bind(this);
		this.getLatestRound = this.getLatestRound.bind(this);
		this.getPlayer = this.getPlayer.bind(this);
		this.getPlayerRoundState = this.getPlayerRoundState.bind(this);
		this.playCard = this.playCard.bind(this);
	}

	/**
	 * Initialize the game with cards from Redis
	 * Must be called after constructor to load cards
	 */
	async initialize(expansion: string = 'Base'): Promise<void> {
		logger.info('Initializing game cards', { partyCode: this.partyCode, expansion });

		// Check for testing mode - filter to only multi-answer questions
		const testMultiAnswerOnly = process.env.TEST_MULTI_ANSWER_ONLY === 'true';
		const numAnswersFilter = testMultiAnswerOnly ? 0 : 1;

		if (testMultiAnswerOnly) {
			logger.warn('TEST MODE: Filtering deck to multi-answer questions only', {
				partyCode: this.partyCode,
				expansion
			});
		}

		this.QCardDeck = await getShuffledQCard(expansion, numAnswersFilter);
		this.ACardDeck = await getShuffledACard(expansion);

		logger.info('Game cards initialized', {
			partyCode: this.partyCode,
			qCards: this.QCardDeck.length,
			aCards: this.ACardDeck.length,
			testMode: testMultiAnswerOnly
		});
	}

	addNewPlayer(name: string, sessionID: string): void {
		console.group(`addNewPlayer: name: ${name} | sessionID: ${sessionID}`);
		if (name == undefined || sessionID == undefined) {
			console.log(`trying to add ${name} to ${this.partyCode}`);
		} else if (this.ACardDeck.length < 3) {
			console.log(`Cannot add new ${name} to deck, ACardDeck has ran out of cards!`);
		} else {
			console.log(`adding ${name} to ${this.partyCode}`);
			this.players[sessionID] = {
				name,
				pID: Object.keys(this.players).length,
				roundsWon: [],
				cards: this.ACardDeck.splice(0, 10),
				roundState: 'lobby'
			};
		}
		console.groupEnd();
	}

	// return the player in the game, if exists, else return null
	getPlayer(sessionID: string): PlayerInterface | null {
		console.group(`getPlayer: sessionID: ${sessionID}`);
		console.log(this.players[sessionID] ? 'VALID player returned' : 'INVALID player - null return')
		console.groupEnd();
		return this.players[sessionID] ? this.players[sessionID] : null;
	}

	// get the latest active round or create a new empty round (if it's the first round)
	getLatestRound(): RoundInterface | null {
		const playerSize = Object.keys(this.players).length;
		if (playerSize < 3) {
			console.log('Cannot getLatestRound. not enough players to start a game');
			return null;
		} else if (this.rounds.length === 0 || !(this.rounds.slice(-1)[0].active)) {
			console.log('creating new round, since old round was not active (or this is the first round)');

			this.ACardDeck = shuffle(this.ACardDeck);

			let round: RoundInterface = {
				active: true,
				otherPlayerCards: [],
				QCard: (this.QCardDeck.splice(0, 1))[0],
				roundEndTime: undefined,
				roundJudge: find(this.players, player => player.pID === (this.rounds.length % playerSize)),
				roundNum: this.rounds.length + 1,
				roundState: 'players-selecting',
				roundStartTime: new Date(),
				winner: '',
				winningCard: null,
			};

			this.roundTimer = setTimeout(() => {
				// TODO: if otherPlayerCards.length === 0, endRound()
				console.group('roundTimer');
				console.log('round.otherPlayerCards.length:', round?.otherPlayerCards?.length);
				if (round?.otherPlayerCards?.length === 0) {
					this.endRound((success: boolean, message: string) => {
						console.log('Had to end round, since no player choose a card');
						console.log(`endRound prematurely | ${success} | ${message}`);
						this.roundsIdle += 1;
						console.log(`Rounds Idle: ${this.roundsIdle}`);
						console.log('this.roundFinishedNotifier:', this.roundFinishedNotifier);
						this.roundFinishedNotifier(true, 'Skipping judge!');
					});
				} else {
					this.roundsIdle = 0;
					round.roundState = JUDGE_SELECTING;
					console.log('Judge-selection time!');
					this.roundFinishedNotifier(true, 'Judge-selection time!');
				}
				console.groupEnd();
			}, this.roundLength * 1000);

			this.rounds.push(round);
			return round;
		} else {
			console.log(`returning latest active round`);
			return this.rounds.slice(-1)[0];
		}
	}

	// return true if player with session id is round judge
	isRoundJudge(sessionID: string, round: RoundInterface | null): boolean {
		let player = this.getPlayer(sessionID);
		return !!(player && round?.roundJudge?.pID === player?.pID);
	}

	// Return the round state for the player with given sessionID
	// if the player is not in the game, return null
	getPlayerRoundState(sessionID: string): RoundInterface | null {
		let player = this.getPlayer(sessionID);
		if (player == null) return null;

		let latestRound = this.getLatestRound();
		let roundRole = this.isRoundJudge(sessionID, latestRound) ? JUDGE : PLAYER;
		let playerChoice = find(latestRound?.otherPlayerCards, card => card?.owner?.pID === player?.pID) || null;
		let otherPlayerCards = latestRound?.otherPlayerCards;
		let cards = player.cards;
		let QCard = latestRound?.QCard;
		let roundNum = latestRound?.roundNum;
		let roundJudge = latestRound?.roundJudge;
		let winningCard = latestRound?.winningCard;
		let winner = latestRound?.winner;
		// timeRemaining in seconds
		let timeLeft = Math.max(...[0, Math.floor(this.roundLength - ((Number(new Date()) - Number(latestRound?.roundStartTime)) / 1000))]);
		let roundState;
		console.group(`getPlayerRoundState for ${player.name} in round ${roundNum}`);
		console.log(`roundRole: ${roundRole}`);
		console.log(`playerChoice: ${playerChoice ? playerChoice.text : null}`);
		console.log(`otherPlayerCards: ${otherPlayerCards?.length}`);
		console.log(`cards: ${cards.length}`);
		console.log(`QCard: ${QCard?.text}`);
		console.log(`roundNum: ${roundNum}`);
		console.log(`roundJudge: `, roundJudge);
		console.log(`winningCard: ${winningCard ? winningCard.text : null}`);
		console.log(`winner: ${winner ? winner : null}`);
		console.log(`timeLeft: ${timeLeft}`);
		console.groupEnd();

		if (latestRound?.roundState === JUDGE_SELECTING || latestRound?.roundState === VIEWING_WINNER) {
			timeLeft = 0;
			roundState = latestRound.roundState;
		} else if (roundRole == JUDGE) {
			roundState = JUDGE_WAITING;
		} else if (playerChoice != null) {
			roundState = PLAYER_WAITING;
		} else {
			roundState = PLAYER_SELECTING;
		}

		return {
			cards,
			currentPlayerName: player.name,
			otherPlayerCards,
			playerChoice,
			QCard,
			roundState,
			roundRole,
			roundJudge,
			roundNum,
			timeLeft,
			winner,
			winningCard,
		};
	}

	playCard(cardIDs: number | number[], sessionID: string, cb: CallbackType): void {
		// Normalize to array
		const cardIDArray = Array.isArray(cardIDs) ? cardIDs : [cardIDs];

		// Validate player exists
		let player = this.getPlayer(sessionID);
		if (player === null) {
			logger.warn('Invalid playCard attempt', {
				sessionID,
				cardIDs: cardIDArray,
				reason: 'player_not_found',
				partyCode: this.partyCode
			});
			cb(false, 'You are not a player in this game');
			return;
		}

		// Validate game state
		let latestRound = this.getLatestRound();
		if (!latestRound) {
			logger.warn('Invalid playCard attempt', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				reason: 'no_active_round',
				partyCode: this.partyCode
			});
			cb(false, 'No active round found');
			return;
		}

		// Validate round state
		if (latestRound.roundState !== 'players-selecting') {
			logger.warn('Invalid playCard attempt', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				reason: 'wrong_round_state',
				currentState: latestRound.roundState,
				partyCode: this.partyCode
			});
			cb(false, 'Cannot play card in current game phase');
			return;
		}

		// Validate player is not the judge
		if (this.isRoundJudge(sessionID, latestRound)) {
			logger.warn('Invalid playCard attempt', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				reason: 'judge_cannot_play',
				partyCode: this.partyCode
			});
			cb(false, 'Judge cannot play cards');
			return;
		}

		// Validate correct number of cards
		const requiredCards = latestRound.QCard?.numAnswers || 1;
		if (cardIDArray.length !== requiredCards) {
			logger.warn('Invalid playCard attempt', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				reason: 'wrong_card_count',
				required: requiredCards,
				provided: cardIDArray.length,
				partyCode: this.partyCode
			});
			cb(false, `This question requires exactly ${requiredCards} card${requiredCards > 1 ? 's' : ''}`);
			return;
		}

		// Validate card ownership for all cards
		const cards: typeof player.cards = [];
		for (const cardID of cardIDArray) {
			const card = find(player?.cards, (c): boolean => c?.id === cardID);
			if (card === undefined) {
				logger.warn('Invalid playCard attempt', {
					sessionID,
					cardIDs: cardIDArray,
					playerName: player.name,
					reason: 'card_not_owned',
					missingCardID: cardID,
					playerCards: player.cards.map(c => c.id),
					partyCode: this.partyCode
				});
				cb(false, 'You do not own one or more of these cards');
				return;
			}
			cards.push(card);
		}

		// Validate player hasn't already played
		const existingCard = find(latestRound.otherPlayerCards, card => card?.owner?.pID === player?.pID);
		if (existingCard) {
			logger.warn('Invalid playCard attempt', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				reason: 'already_played',
				partyCode: this.partyCode
			});
			cb(false, 'You have already played a card this round');
			return;
		}

		// All validations passed - execute the card play
		try {
			const playerSize = Object.keys(this.players).length;

			// Remove cards from player's hand
			for (const cardID of cardIDArray) {
				remove(player.cards, c => c.id === cardID);
			}

			// Add all cards to round (with same owner)
			for (const card of cards) {
				latestRound?.otherPlayerCards?.push({
					...card,
					owner: { 'name': player.name, 'pID': player.pID }
				});
			}

			// Give player replacement cards (same number as played)
			const replacementCount = Math.min(cardIDArray.length, this.ACardDeck.length);
			if (replacementCount > 0) {
				player.cards = player.cards.concat(this.ACardDeck.splice(0, replacementCount));
			}

			logger.info('Cards played successfully', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				cardsPlayed: cardIDArray.length,
				totalPlayers: playerSize,
				partyCode: this.partyCode
			});

			// Check if all players have played (count unique players who submitted)
			const uniquePlayersPIDs = new Set(
				latestRound?.otherPlayerCards?.map(card => card.owner?.pID).filter(pID => pID !== undefined)
			);
			const allPlayersSubmitted = uniquePlayersPIDs.size === (playerSize - 1);

			if (allPlayersSubmitted) {
				latestRound.roundState = JUDGE_SELECTING;
				clearTimeout(this.roundTimer as ReturnType<typeof setTimeout>);
				this.roundFinishedNotifier(true, 'All players have played - judge selection phase');
				cb(true, 'Cards played - all players ready, judge is selecting');
			} else {
				cb(true, `${cardIDArray.length} card${cardIDArray.length > 1 ? 's' : ''} played successfully`);
			}
		} catch (error) {
			let errorMessage = 'Unknown error';
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			logger.error('Error playing cards', {
				sessionID,
				cardIDs: cardIDArray,
				playerName: player.name,
				error: errorMessage,
				partyCode: this.partyCode
			});
			cb(false, 'Failed to play cards');
		}
	}

	judgeSelectCard(sessionID: string, cardID: number, cb: CallbackType) {
  		// Validate player exists
  		let player = this.getPlayer(sessionID);
  		if (player === null) {
  			logger.warn('Invalid judgeSelectCard attempt', {
  				sessionID,
  				cardID,
  				reason: 'player_not_found',
  				partyCode: this.partyCode
  			});
  			cb(false, 'You are not a player in this game');
  			return;
  		}

  		// Validate game state
  		let latestRound: RoundInterface | null = this.getLatestRound();
  		if (!latestRound) {
  			logger.warn('Invalid judgeSelectCard attempt', {
  				sessionID,
  				cardID,
  				playerName: player.name,
  				reason: 'no_active_round',
  				partyCode: this.partyCode
  			});
  			cb(false, 'No active round found');
  			return;
  		}

  		// Validate player is the judge
  		if (!this.isRoundJudge(sessionID, latestRound)) {
  			logger.warn('Invalid judgeSelectCard attempt', {
  				sessionID,
  				cardID,
  				playerName: player.name,
  				reason: 'not_judge',
  				actualJudge: latestRound.roundJudge?.name,
  				partyCode: this.partyCode
  			});
  			cb(false, 'You are not the judge for this round');
  			return;
  		}

  		// Validate round state
  		if (latestRound.roundState !== JUDGE_SELECTING) {
  			logger.warn('Invalid judgeSelectCard attempt', {
  				sessionID,
  				cardID,
  				playerName: player.name,
  				reason: 'wrong_round_state',
  				currentState: latestRound.roundState,
  				partyCode: this.partyCode
  			});
  			cb(false, 'Cannot select winner in current game phase');
  			return;
  		}

  		// Validate selected card exists in played cards
  		let winningCard = find(latestRound.otherPlayerCards, card => card.id === cardID);
  		if (!winningCard) {
  			logger.warn('Invalid judgeSelectCard attempt', {
  				sessionID,
  				cardID,
  				playerName: player.name,
  				reason: 'card_not_found',
  				availableCards: latestRound?.otherPlayerCards?.map(c => c.id),
  				partyCode: this.partyCode
  			});
  			cb(false, 'Selected card was not played this round');
  			return;
  		}

  		// All validations passed - execute the selection
  		try {
  			// Find ALL cards from the winning player (for multi-card submissions)
  			const winningPlayerPID = winningCard.owner?.pID;
  			const allWinningCards = latestRound.otherPlayerCards?.filter(
  				card => card.owner?.pID === winningPlayerPID
  			) || [];

  			latestRound.roundState = VIEWING_WINNER;
  			latestRound.winningCard = winningCard; // First card clicked (for backwards compatibility)
  			latestRound.winningCards = allWinningCards; // All cards from winning player
  			latestRound.winner = winningCard.owner?.name;
  			latestRound.roundEndTime = new Date();

  			let winningPlayer = find(this.players, player => player.pID === winningCard?.owner?.pID);
  			if (winningPlayer) {
  				winningPlayer.roundsWon.push({
  					roundNum: latestRound.roundNum,
  					ACard: winningCard,
  					QCard: latestRound.QCard
  				});
  			}

  			this.roundsIdle = 0;

  			logger.info('Judge selected winning card(s)', {
  				sessionID,
  				cardID,
  				judgeName: player.name,
  				winnerName: latestRound.winner,
  				winningCardText: winningCard.text,
  				totalWinningCards: allWinningCards.length,
  				roundNum: latestRound.roundNum,
  				partyCode: this.partyCode
  			});

  			cb(true, `${latestRound.winner} won this round!`);
  		} catch (error) {
			let errorMessage = 'Unknown error';
			if (error instanceof Error) {
				errorMessage = error.message;
			}
  			logger.error('Error in judge selection', {
  				sessionID,
  				cardID,
  				judgeName: player.name,
  				error: errorMessage,
  				partyCode: this.partyCode
  			});
  			cb(false, 'Failed to select winning card');
  		}
  	}
	
	endRound(cb: CallbackType) {
		let latestRound = this.getLatestRound();
		if (latestRound) {
			clearTimeout(this.roundTimer as ReturnType<typeof setTimeout>);
			latestRound.active = false;
			let cardsPlayed: Card[] = [];
			latestRound?.otherPlayerCards?.forEach((card) => cardsPlayed.push({ ...card }));
			cardsPlayed.map(card => delete card.owner);
			this.ACardDeck = this.ACardDeck.concat(cardsPlayed);
			this.QCardDeck = (latestRound.QCard) ? this.QCardDeck.concat(latestRound.QCard) : this.QCardDeck;
			cb(true, `Round ${latestRound.roundNum} successfully finished`);
		} else {
			cb(false, `Cannot endRound(), since no rounds exist for the following game!`);
		}
	}

	shuffleCard(sessionID: string, srcCardIDIndex: number, destCardIDIndex: number, cb: CallbackType): void {
		let player: PlayerInterface | null = this.getPlayer(sessionID);
		if (player === null) {
			cb(false, `cannot shuffle card! ${sessionID} not a player in game!`);
			return;
		}
		let newCardOrder = [...player.cards];
		newCardOrder.splice(srcCardIDIndex, 1);
		newCardOrder.splice(destCardIDIndex, 0, player.cards[srcCardIDIndex]);
		player.cards = newCardOrder;
		cb(true, `shuffled ${srcCardIDIndex} <=> ${destCardIDIndex} for ${player.name}`);
	}
}

export default Game;
