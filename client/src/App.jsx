import React from 'react';

// Screens
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import JoinPartyScreen from "./Screens/JoinPartyScreen/JoinPartyScreen";
import StartGameScreen from "./Screens/StartGameScreen/StartGameScreen";
import PlayerSelectionScreen from './Screens/PlayerSelectionScreen/PlayerSelectionScreen';

// Routing
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact path="/"
                    element={<HomeScreen/>}
                />
                <Route
                    exact path="/join/:partyCode"
                    element={<StartGameScreen />}
                />
                <Route
                    path="/join"
                    element={<JoinPartyScreen />}
                />
                <Route
                    path="/:partyCode"
                    element={<PlayerSelectionScreen />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
