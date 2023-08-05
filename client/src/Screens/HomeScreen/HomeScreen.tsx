import React from 'react';

import Button from "../../components/Button/Button";
import Top from "../../components/Top/Top";
import Title from "../../components/Title/Title";
import Card from "../../components/Card/Card";
import Screen from "../../components/Screen/Screen";
import Bottom from "../../components/Bottom/Bottom";
import Footer from "../../components/Footer/Footer";
import "./HomeScreen.css";

function CreateGame() {
    // TODO: call backend api to create a game and return the party code,
    // mocking the response for now...
    let partyCodeFromServer = Math.random().toString(36).slice(2).substring(5).toLowerCase();
    console.log(`partyCodeFromServer ${partyCodeFromServer}`);

    return partyCodeFromServer;
}

const HomeScreen = () => {
    console.group('HomeScreen');
    console.groupEnd();
    return (
        <Screen>
            <Top>
                <Card cardType="Title"/>
            </Top>
            <Bottom>
                <Title text="A party game for horrible people"/>
                <Button
                    asLink
                    className="center"
                    link={`/join/${CreateGame()}`}
                    text="Create Party"
                />
                <div className="orDiv">
                  <span className="orText">or</span>
                </div>
                <Button
                    asLink
                    className="center"
                    link="/join"
                    text="Join Party"
                />
                <Footer>
                    Like us on <a href="https://www.instagram.com/cardipartygame/"> Instagram!</a>
                </Footer>
            </Bottom>
        </Screen>
    );
}

export default HomeScreen;
