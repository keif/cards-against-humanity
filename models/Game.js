import { getShuffledACard, getShuffledQCard } from "./Card"
import _ from "lodash"

class Game {
  constructor(partyCode, roundLength = 10, roundFinishedNotifier = () => {}) {
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
    this.roundTimer = 0;

    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getLatestRound = this.getLatestRound.bind(this);
    this.getPlayerRoundState = this.getPlayerRoundState.bind(this);
    this.endRound = this.endRound.bind(this);
  }

  addNewPlayer(name, sessionID) {
    if (name == undefined || sessionID == undefined) {
      console.log(`trying to addNewPlayer to ${this.partyCode}`)
    }
    else if (this.ACardDeck.length < 3) {
      console.log('Cannot add new player to deck, ACardDeck has ran out of cards!')
    }
    else {
      this.players[sessionID] = {
        name,
        pID: this.players.constructor === Object ? Object.keys(this.players).length : this.players.length,
        roundsWon: [],
        cards: this.ACardDeck.splice(0, 10),
        roundState: "lobby"
      };
    }
  }

  // return the player in the game, if exists, else return null
  getPlayer(sessionID) {
    return this.players[sessionID] ? this.players[sessionID] : null;
  }

  // get the latest active round or create a new empty round (if its the first round)
  getLatestRound() {
    const playerSize = this.players.constructor === Object ? Object.keys(this.players).length : this.players.length;
    if (playerSize < 3) {
      // console.log("Cannot getLatestRound. not enough players to start a game")
      return null;
    }
    else if (this.rounds.length === 0 || !(this.rounds.slice(-1)[0].active)) {
      // console.log('creating new round, since old round was not active (or this is the first round)')

      this.ACardDeck = _.shuffle(this.ACardDeck);

      let round = {
        active: true,
        roundNum: this.rounds.length + 1,
        roundState: "players-selecting",
        roundStartTime: new Date(),
        roundEndTime: null,
        roundJudge: _.find(this.players, player => player.pID === (this.rounds.length % playerSize)),
        QCard: (this.QCardDeck.splice(0,1))[0],
        otherPlayerCards: [],
        winningCard: null,
        winner: null,
      }

      this.roundTimer = setTimeout(() => {
        // TODO: if otherPlayerCards.length === 0, endRound()
        if(round.otherPlayerCards.length === 0) {
          this.endRound((success, message) => {
            console.log('Had to end round, since no player choose a card')
            console.log(`endRound prematurely | ${success} | ${message}`)
            this.roundsIdle += 1;
            console.log(`Rounds Idle: ${this.roundsIdle}`)
            this.roundFinishedNotifier(true, 'Skipping judge!')
          });
        }
        else {
          this.roundsIdle = 0;
          round.roundState = 'judge-selecting'
          console.log('Judge-selection time!')
          this.roundFinishedNotifier(true, 'Judge-selection time!')
        }
      }, this.roundLength * 1000);

      this.rounds.push(round);
      return round;
    }
    else {
      // console.log(`returning latest active round`)
      return this.rounds.slice(-1)[0]
    }
  }

  // return true if player with session id is round judge
  isRoundJudge(sessionID, round) {
    let player = this.getPlayer(sessionID);
    return player && round.roundJudge.pID === player.pID;
  }

  // Return the round state for the player with given sessionID
  // if the player is not in the game, return null
  getPlayerRoundState(sessionID) {
    let player = this.getPlayer(sessionID)
    if (player == null) return null;
    let latestRound = this.getLatestRound()
    let roundRole = this.isRoundJudge(sessionID, latestRound) ? 'judge' : 'player'
    let playerChoice = _.find(latestRound.otherPlayerCards, card => card.owner.pID === player.pID) || null;
    let otherPlayerCards = latestRound.otherPlayerCards;
    let cards = player.cards;
    let QCard = latestRound.QCard;
    let roundNum = latestRound.roundNum;
    let roundJudge = latestRound.roundJudge.name;
    let winningCard = latestRound.winningCard;
    let winner = latestRound.winner;
    // timeRemaining in seconds
    let timeLeft = Math.max(...[0, Math.floor(this.roundLength - ((new Date() - latestRound.roundStartTime) / 1000))]);
    let roundState;
    console.group(`getPlayerRoundState for ${player.name} in round ${roundNum}`);
    console.log(`roundRole: ${roundRole}`)
    console.log(`playerChoice: ${playerChoice ? playerChoice.text : null}`)
    console.log(`otherPlayerCards: ${otherPlayerCards.length}`)
    console.log(`cards: ${cards.length}`)
    console.log(`QCard: ${QCard.text}`)
    console.log(`roundNum: ${roundNum}`)
    console.log(`roundJudge: ${roundJudge}`)
    console.log(`winningCard: ${winningCard ? winningCard.text : null}`)
    console.log(`winner: ${winner ? winner.name : null}`)
    console.log(`timeLeft: ${timeLeft}`)
    console.groupEnd();

    if (latestRound.roundState === 'judge-selecting' || latestRound.roundState === 'viewing-winner') {
      timeLeft = 0
      roundState = latestRound.roundState
    }
    else if (roundRole == 'judge') {
      roundState = 'judge-waiting'
    }
    else if (playerChoice != null) {
      roundState = 'player-waiting'
    }
    else {
      roundState = 'player-selecting'
    }

    return {
      roundState,
      roundRole,
      roundJudge,
      roundNum,
      QCard,
      cards,
      otherPlayerCards,
      playerChoice,
      winningCard,
      winner,
      timeLeft
    }
  }

  playCard(sessionID, cardID, cb) {
    let player = this.getPlayer(sessionID);
    if (player == null) cb(false, `Cannot playCard: ${sessionID} is not a player in game ${this.partyCode}`)
    let card = _.find(player.cards, c => c.id === cardID)
    if(card === undefined) cb(false, `Player ${player.name}[${sessionID}] attempting to play card (${cardID}) they do not own!`);
    let latestRound = this.getLatestRound()

    if (latestRound.roundState !== 'players-selecting') {
      cb(false, "Cannot play card!, judge is currently selecting!")
    }
    if (this.isRoundJudge(sessionID, latestRound)) {
      cb(false, `${player.name} cannot play a card this round since. ${player.name} is the round judge`)
    }

    if (card) {
      const playerSize = this.players.constructor === Object ? Object.keys(this.players).length : this.players.length;
      _.remove(player.cards, c => c.id === cardID)
      latestRound.otherPlayerCards.push({ ...card, owner: { "name": player.name, "pID": player.pID } })
      player.cards = player.cards.concat(this.ACardDeck.splice(0, 1))
      if (latestRound.otherPlayerCards.length === (playerSize - 1)) {
        latestRound.roundState = 'judge-selecting'
        clearTimeout(this.roundTimer)
        this.roundFinishedNotifier(true, 'all players have played their cards, going to judge-selecting!')
        cb(true, `${player.name} was last player to play cards, going to judge-selecting!`)
      } else {
        cb(true, `${player.name} played their card!`)
      }
    }
  }

  judgeSelectCard(sessionID, cardID, cb) {
    let latestRound = this.getLatestRound();
    if (this.isRoundJudge(sessionID, latestRound) && latestRound.roundState === 'judge-selecting') {
      let winningCard = _.find(latestRound.otherPlayerCards, card => card.id === cardID);
      if (winningCard) {
        latestRound.roundState = 'viewing-winner';
        latestRound.winningCard = winningCard;
        latestRound.winner = winningCard.owner.name;
        latestRound.roundEndTime = new Date();
        let winningPlayer = _.find(this.players, player => player.pID === winningCard.owner.pID);
        winningPlayer.roundsWon.push({
          roundNum: latestRound.roundNum,
          ACard: winningCard,
          QCard: latestRound.QCard
        });
        this.roundsIdle = 0;
        cb(true, `${latestRound.winner} won with card ${latestRound.winningCard.text}`)
      }
      else {
        cb(false, `${sessionID} attempted to play a winning card ${cardID} that was not played!`)
      }
    }
    else {
      cb(false, 'you are not the round judge! you cannot choose the winner!')
    }
  }

  endRound(cb) {
    let latestRound = this.getLatestRound();
    if (latestRound) {
      clearTimeout(this.roundTimer)
      latestRound.active = false;
      let cardsPlayed = []
      latestRound.otherPlayerCards.forEach((card) => cardsPlayed.push({ ...card }));
      cardsPlayed.map(card => delete card.owner)
      this.ACardDeck = this.ACardDeck.concat(cardsPlayed)
      this.QCardDeck = this.QCardDeck.concat(latestRound.QCard)
      cb(true, `Round ${latestRound.roundNum} successfully finished`)
    }
    else {
      cb(false, `Cannot endRound(), since no rounds exist for the following game!`)
    }
  }

  shuffleCard(sessionID, srcCardIDIndex, destCardIDIndex, cb) {
    let player = this.getPlayer(sessionID);
    if (player == null) cb(false, `cannot shuffle card! ${sessionID} not a player in game!`);
    let newCardOrder = [...player.cards]
    newCardOrder.splice(srcCardIDIndex, 1)
    newCardOrder.splice(destCardIDIndex, 0, player.cards[srcCardIDIndex])
    player.cards = newCardOrder;
    cb(true, `shuffled ${srcCardIDIndex} <=> ${destCardIDIndex} for ${player.name}`)
  }
}

export default Game;
