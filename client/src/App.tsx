import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load screens for code splitting
const HomeScreen = lazy(() => import("./Screens/HomeScreen/HomeScreen"));
const JoinPartyScreen = lazy(() => import("./Screens/JoinPartyScreen/JoinPartyScreen"));
const StartGameScreen = lazy(() => import("./Screens/StartGameScreen/StartGameScreen"));
const PlayerSelectionScreen = lazy(() => import('./Screens/PlayerSelectionScreen/PlayerSelectionScreen'));

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
			<Suspense fallback={<div>Loading...</div>}>
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
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
