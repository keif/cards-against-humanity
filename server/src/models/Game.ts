import { getShuffledACard, getShuffledQCard } from './Card';
import shuffle from 'lodash/shuffle';
import find from 'lodash/find';
import remove from 'lodash/remove';
import { JUDGE, JUDGE_SELECTING, JUDGE_WAITING, PLAYER, PLAYER_SELECTING, PLAYER_WAITING, VIEWING_WINNER } from '../constants';
import { Card } from '../data/types';
import { CallbackType, GameInterface, PlayerInterface, RoundInterface } from './types';

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
		this.active = true;
		this.roundsIdle = 0; // if at least |this.players.length.length| roundsIdle, then game state is inactive
		this.partyCode = partyCode;
		this.gameStartDate = new Date();
		this.QCardDeck = getShuffledQCard();
		this.ACardDeck = getShuffledACard();
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
		console.groupEnd();
	}

	addNewPlayer(name: string, sessionID: string): void {
		console.group('addNewPlayer');
		console.log('this.players[sessionID]:', this.players[sessionID]);
		console.log('this.roundFinishedNotifier:', this.roundFinishedNotifier);
		if (name == undefined || sessionID == undefined) {
			console.log(`trying to add ${name} to ${this.partyCode}`);
		} else if (this.ACardDeck.length < 3) {
			console.log('Cannot add new player to deck, ACardDeck has ran out of cards!');
		} else {
			console.log(`adding ${name} to ${this.partyCode}`);
			this.players[sessionID] = {
				name,
				pID: Object.keys(this.players).length,
				roundsWon: [],
				cards: this.ACardDeck.splice(0, 10),
				roundState: 'lobby'
			};
			console.log('this.players[sessionID]:', this.players[sessionID]);
		}
		console.groupEnd();
	}

	// return the player in the game, if exists, else return null
	getPlayer(sessionID: string): PlayerInterface | null {
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
		console.log(`roundJudge: ${roundJudge}`);
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

	playCard(cardID: number, sessionID: string, cb: CallbackType): void {
		let player = this.getPlayer(sessionID);
		if (player === null) {
			cb(false, `Cannot playCard: ${sessionID} is not a player in game ${this.partyCode}`);
			return;
		}

		let card = find(player?.cards, (c): boolean => c?.id === cardID);
		if (card === undefined) cb(false, `Player ${player.name}[${sessionID}] attempting to play card (${cardID}) they do not own!`);
		let latestRound = this.getLatestRound();

		if (latestRound?.roundState !== 'players-selecting') {
			cb(false, 'Cannot play card!, judge is currently selecting!');
			return;
		}

		if (this.isRoundJudge(sessionID, latestRound)) {
			cb(false, `${player.name} cannot play a card this round since. ${player.name} is the round judge`);
			return;
		}

		if (card) {
			const playerSize = Object.keys(this.players).length;
			remove(player.cards, c => c.id === cardID);
			latestRound?.otherPlayerCards?.push({...card, owner: {'name': player.name, 'pID': player.pID}});
			player.cards = player.cards.concat(this.ACardDeck.splice(0, 1));
			if (latestRound?.otherPlayerCards?.length === (playerSize - 1)) {
				latestRound.roundState = JUDGE_SELECTING;
				clearTimeout(this.roundTimer as ReturnType<typeof setTimeout>);
				this.roundFinishedNotifier(true, 'all players have played their cards, going to judge-selecting!');
				cb(true, `${player.name} was last player to play cards, going to judge-selecting!`);
			} else {
				cb(true, `${player.name} played their card!`);
			}
		}
	}

	judgeSelectCard(sessionID: string, cardID: number, cb: CallbackType) {
		let latestRound: RoundInterface | null = this.getLatestRound();
		if (this.isRoundJudge(sessionID, latestRound) && latestRound?.roundState === JUDGE_SELECTING) {
			let winningCard = find(latestRound.otherPlayerCards, card => card.id === cardID);
			if (winningCard) {
				latestRound.roundState = VIEWING_WINNER;
				latestRound.winningCard = winningCard;
				latestRound.winner = winningCard.owner?.name;
				latestRound.roundEndTime = new Date();
				let winningPlayer = find(this.players, player => player.pID === winningCard?.owner?.pID);
				winningPlayer.roundsWon.push({
					roundNum: latestRound.roundNum,
					ACard: winningCard,
					QCard: latestRound.QCard
				});
				this.roundsIdle = 0;
				cb(true, `${latestRound.winner} won with card ${latestRound.winningCard.text}`);
			} else {
				cb(false, `${sessionID} attempted to play a winning card ${cardID} that was not played!`);
			}
		} else {
			cb(false, 'you are not the round judge! you cannot choose the winner!');
		}
	}

	endRound(cb: CallbackType) {
		let latestRound = this.getLatestRound();
		if (latestRound) {
			clearTimeout(this.roundTimer as ReturnType<typeof setTimeout>);
			latestRound.active = false;
			let cardsPlayed: Card[] = [];
			latestRound?.otherPlayerCards?.forEach((card) => cardsPlayed.push({...card}));
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
