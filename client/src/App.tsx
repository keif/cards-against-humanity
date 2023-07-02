import React from 'react';

// Screens
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import JoinPartyScreen from "./Screens/JoinPartyScreen/JoinPartyScreen";
import StartGameScreen from "./Screens/StartGameScreen/StartGameScreen";
import PlayerSelectionScreen from './Screens/PlayerSelectionScreen/PlayerSelectionScreen';
import {BrowserRouter, Route, Routes} from "react-router-dom";

// Routing

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomeScreen/>}
                />
                <Route
                    path="/join/:partyCode"
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
