import React from 'react';

// Screens
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import JoinPartyScreen from "./Screens/JoinPartyScreen/JoinPartyScreen";
import StartGameScreen from "./Screens/StartGameScreen/StartGameScreen";
import PlayerSelectionScreen from './Screens/PlayerSelectionScreen/PlayerSelectionScreen';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Routing
export const enum ROUTE_PARAM {
	PARTY_CODE = 'partyCode',
}

export const enum ROUTE_PATH {
	HOME = '/',
	JOIN_PARTY = '/join',
	START_GAME = `/join/:${ROUTE_PARAM.PARTY_CODE}`,
	PLAYER_SELECTION = `/:${ROUTE_PARAM.PARTY_CODE}`,
}

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={`${ROUTE_PATH.HOME}`}
					element={<HomeScreen/>}
				/>
				<Route
					path={`${ROUTE_PATH.START_GAME}`}
					element={<StartGameScreen/>}
				/>
				<Route
					path={`${ROUTE_PATH.JOIN_PARTY}`}
					element={<JoinPartyScreen/>}
				/>
				<Route
					path={`${ROUTE_PATH.PLAYER_SELECTION}`}
					element={<PlayerSelectionScreen/>}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
