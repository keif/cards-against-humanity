import React, {useEffect, useState} from 'react';

import Screen from "../../components/Screen/Screen";
import Top from "../../components/Top/Top";
import Title from "../../components/Title/Title";
import Bottom from "../../components/Bottom/Bottom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import PlayerList from "../../components/PlayerList/PlayerList";
import Banner from 'react-js-banner';
import "./StartGameScreen.css";

import {getLobbyState, joinParty, newLobbyState} from "../../api";
import {useParams} from 'react-router-dom';

const StartGameScreen = (props) => {
    console.group("StartGameScreen: constructor()");
    console.groupEnd();
    const params = useParams();
    const [state, setState] = useState({
        players: [],
        joined: false,
        currentPlayerName: "",
    });
    console.log(`params:`, params);

    useEffect(() => {
        let partyCode = params.partyCode;
        getLobbyState(partyCode, (response) => {
            console.log(`getLobbyState ${JSON.stringify(response)}`);
            setState({
                ...state,
                joined: response.currentPlayer ? true : false,
                players: response.players
            });
        });
        newLobbyState(partyCode);
    }, []);

    const handleOnClick = () => {
        console.log('joinParty');
        if (!state.joined) {
            let name = state.currentPlayerName;
            let partyCode = params.partyCode;
            console.log(`requesting to join party:${partyCode}`);
            joinParty({name, partyCode});
        }
    };

    // TODO: REFACTOR: need to pass this to the PlayerList Component
    // to retrieve the user input (nested)
    const updatePlayerName = (e) => {
        console.log('updatePlayerName');
        setState({
            ...state,
            currentPlayerName: e.target.value
        });
    };

    const btnText = (!state.joined) ? "Join Party" : "Start Game";
    const btnDisabled = (!state.joined) ? (state.currentPlayerName.length === 0) : (state.players.length < 3);
    const btnOnClick = (!state.joined) ? () => handleOnClick() : null;
    const btnLink = (!state.joined) ? null : `/${params.partyCode}`;
    return (
        <Screen>
            <Top>
                <Banner
                    title="Share the current url / link with your friends to get started! You need at least 3 people to play this game!"/>
                <Card cardType="Link" link={params.partyCode}/>
            </Top>
            <Bottom>
                <Title text="Players Joined"/>
                <PlayerList players={state.players} joined={state.joined} className="center"
                            onChange={updatePlayerName}/>
                <Button text={btnText} className="center" disabled={btnDisabled}
                    onClick={() => btnOnClick()} link={btnLink}/>
                <Footer>
                    {state.players.length < 3 ? "Need at least 3 players to start game" : "Ready to start Game!"}
                </Footer>
            </Bottom>
        </Screen>
    );
};

export default StartGameScreen;
