import React, {useEffect, useState} from 'react';
import "./PlayerSelectionScreen.css"

// Import SharedComponents
import Screen from "../../components/Screen/Screen"
import Top from "../../components/Top/Top"
import HeaderMenu from "../../components/HeaderMenu/HeaderMenu"
import DropCardSpace from "../../components/DropCardSpace/DropCardSpace"
import Bottom from "../../components/Bottom/Bottom"
import CardCarousel from "../../components/CardCarousel/CardCarousel"
import Footer from "../../components/Footer/Footer"
import Status from "../../components/Status/Status"

// Import Helper Libraries
import { DragDropContext } from "react-beautiful-dnd";
import { getPlayerRoundState, newGameState, playCard, judgeSelectCard, shuffleCards, endRound } from "../../api"
import {useNavigate, useParams} from 'react-router-dom';

const PlayerSelectionScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
    console.group("PlayerSelectionScreen: constructor()");
    console.groupEnd();

    // roundRole: player
    // roundState:
    //    player-selecting -> player-waiting -> judge-selecting -> viewing-winner -> [player-selecting | judge-selecting]
    // 
    // roundRole: judge
    // roundState
    //    judge-waiting -> judge-selecting -> viewing-winner -> [player-selecting]

    const [state, setState] = useState({
      // get these on getRoundState
      roundState: "viewing-winner",  // player-selecting | player-waiting | judge-selecting | viewing-winner
      roundRole: "judge", // player | judge
      roundJudge: "Yusuf",
      roundNum: null, // Number
      QCard: {
        cardType: "Q",
        text: `Join the game with party code ${params.partyCode} before playing`,
        id: 69
      },
      cards: [
        {
          type: "A",
          text: "Hey dummy!",
          id: 0
        },
        {
          type: "A",
          text: "Join the game from the home screen before starting!",
          id: 1
        }
      ],

      // these should be set implicitely based on above state
      directions: "Waiting for other Players",
      headerText: `Join game before playing`,

      // this is set when user selects a card
      playerChoice: null, // type=Card

      // these are set for everyone as everyone is selecting their own cards
      otherPlayerCards: [
        {
          type: "A",
          text: "(Salmans Card)",
          id: 10,
          owner: {
            name: "Salman",
            pID: 2
          }
        },
        {
          type: "A",
          text: "(Reza's Card)",
          id: 11,
          owner: {
            name: "Reza",
            pID: 1
          }
        }
      ],

      // this is set when judge selects a card
      winningCard: { // type=Card || null
        cardType: "A",
        text: `Go to localhost:3000/game/${params.partyCode}`,
        id: 42
      },
    });

  useEffect(() => {
    console.log("PlayerSelectionScreen: componentDidMount()")
    let partyCode = params.partyCode
    let newState = (roundState) => {
      console.group("PlayerSelectionScreen: newState()")
      console.log("roundState:", roundState);
      console.groupEnd();
      if(roundState == null) {
        // redirect them to join
        if(partyCode === 'join') {
          navigate(`/join`)
        }
        else {
          navigate(`/join/${partyCode}`)
        }
        return;
      }
      console.log(`${new Date().getMinutes()}:${new Date().getSeconds()}`)
      console.log('RoundState:', roundState)
      let headerText = ''
      let directions = ''
      if (roundState.roundState === 'viewing-winner') {
        headerText = `${roundState.winner} Won!`
        directions = '';
      }
      else if (roundState.roundRole === 'judge') {
        headerText = `You are the Judge`
        if (roundState.roundState === 'judge-waiting') directions = 'Waiting for players to choose Cards';
        else if (roundState.roundState === 'judge-selecting') directions = 'Choose your favorite card';
      }
      else {
        headerText = `${roundState.roundJudge} is the Judge`
        if (roundState.roundState === 'player-selecting') directions = 'Choose one Card';
        else if (roundState.roundState === 'player-waiting') directions = 'Waiting for other players';
        else if (roundState.roundState === 'judge-selecting') directions = `${roundState.roundJudge} is choosing their favorite`
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
        timeLeft: roundState.timeLeft,
        directions
      });

      if (state.ticker) {
        console.log('updated timeLeft!, deleting ticker')
        clearInterval(state.ticker)
      }
      let ticker = setInterval(() => {
        if (state.timeLeft <= 0) {
          console.log('clearing interval timeout!', ticker)
          clearInterval(ticker)
        }
        else {
          console.log('tick');
          setState({
            ...state,
            timeLeft: state.timeLeft - 1,
            ticker
          });
        }
      }, 1000);
    };

    // ask server to send current gameStateEvents
    getPlayerRoundState(partyCode, newState);
    // subscribe to newGameState events
    newGameState(partyCode);
    return () => {
      console.log("PlayerSelectionScreen: componentWillUnmount()")
      clearInterval(state.ticker);
    }
  }, []);

  // called after viewing-winner, resets state and gets new state from server. Begins new round
  const restoreScreen = () => {
    let partyCode = params.partyCode
    endRound(partyCode);
    console.log("restoring screen");
  }

  // choosing card logic (drag-and-drop)
  const chooseCardHandler = (result) => {
    const { destination, source } = result;
    // console.log(result);
    
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // shift/move cards in correct order @ CardCarousel
      console.log("swapping!")
      let partyCode = params.partyCode
      shuffleCards(partyCode, source.index, destination.index)
    }
    else if (source.droppableId === "bottom" && destination.droppableId === "top" && state.playerChoice == null) {
      if (state.roundState === 'judge-selecting' && state.roundRole === 'judge') {
        // judge-selecting card
        console.log(`winner card chosen: ${JSON.stringify(state.otherPlayerCards[source.index])}`);
        let partyCode = params.partyCode
        judgeSelectCard(partyCode, state.otherPlayerCards[source.index].id);
      }
      else {
        // player-selecting card
        console.log("player chose a card!");
        let partyCode = params.partyCode
        playCard(partyCode, state.cards[source.index].id)
      }
    }
  }

  // vibrate when dragging card
  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    };
  }

    return (
      <Screen>
        <DragDropContext onDragEnd={chooseCardHandler} onDragStart={onDragStart}>
          <Top className={state.roundState === 'viewing-winner' ? 'winner' : ''}>
            <HeaderMenu
              text={state.headerText}
              timeLeft={state.timeLeft}
            />
            <DropCardSpace
              QCard={state.QCard}
              playerChoice={state.roundState === 'viewing-winner' ? state.winningCard : state.playerChoice}
              cardsIn={state.otherPlayerCards.length}
              roundState={state.roundState}
              roundRole={state.roundRole}
            />
            <div className={state.roundState === 'viewing-winner' ? 'continueMsg' : ''} id="continueMsg" onClick={restoreScreen}>
              {state.roundState === 'viewing-winner' ? "Tap anywhere to Continue" : ""}
            </div>
          </Top>
          <Bottom>
            <Status message={state.directions} />
            <CardCarousel
              cards={
                state.roundState === 'judge-selecting' ? state.otherPlayerCards :
                  state.roundState === 'judge-waiting' ? [] : state.cards
              } />
            <Footer>
              Share Link or Party Code: {params.partyCode}
            </Footer>
          </Bottom >
        </DragDropContext >
      </Screen >
    );
}

export default PlayerSelectionScreen;
