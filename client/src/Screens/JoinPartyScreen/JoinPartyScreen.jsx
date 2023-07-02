import React, {useState} from 'react';

import Screen from "../../components/Screen/Screen"
import Top from "../../components/Top/Top"
import Title from "../../components/Title/Title"
import Bottom from "../../components/Bottom/Bottom"
import Button from "../../components/Button/Button"
import Card from "../../components/Card/Card"
import Footer from "../../components/Footer/Footer"
import Banner from 'react-js-banner';
import "./JoinPartyScreen.css"


const JoinPartyScreen = () => {
  console.group("JoinPartyScreen: constructor()");
  console.groupEnd();
  const [state, setState] = useState({
      partyCode: ""
  });

  const updatePartyCode = (e) => {
    setState({
      ...state,
      partyCode: e.target.value.toLowerCase()
    });
  }


    return (
      <Screen>
        <Top>
          <Banner title = "Ask your friend for the party code or create a game if you are the first player in the party!"/>
          <Card cardType="Title" />
        </Top>
        <Bottom>
          <Title text={`Join an existing party`} />
          <div className="enterCode center">
            <p className="label">Enter the Party Code</p>
            <input className="input" type="text" name="partyCode" placeholder="cardiparty.co/<party_code>" onChange={updatePartyCode} />
          </div>
          <Button text="Join Party" className="center" disabled={state.partyCode.length === 0} link={`/join/${state.partyCode}`} />
          <Footer>
            {/*Like us on <a href="http://www.facebook.com/yusufameri"> Facebook!</a>*/}
          </Footer>
        </Bottom>
      </Screen>
    );
}

export default JoinPartyScreen;
