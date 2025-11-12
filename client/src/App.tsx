import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Lazy load screens for code splitting
const HomeScreen = lazy(() => import("./Screens/HomeScreen/HomeScreen"));
const JoinPartyScreen = lazy(() => import("./Screens/JoinPartyScreen/JoinPartyScreen"));
const StartGameScreen = lazy(() => import("./Screens/StartGameScreen/StartGameScreen"));
const PlayerSelectionScreen = lazy(() => import('./Screens/PlayerSelectionScreen/PlayerSelectionScreen'));
const CommunityVotingScreen = lazy(() => import('./Screens/CommunityVotingScreen/CommunityVotingScreen'));
const ModeratorDashboard = lazy(() => import('./Screens/ModeratorDashboard/ModeratorDashboard'));

// Documentation screens
const HowToPlayScreen = lazy(() => import('./Screens/HowToPlayScreen/HowToPlayScreen'));
const GameRulesScreen = lazy(() => import('./Screens/GameRulesScreen/GameRulesScreen'));
const SubmitCardsScreen = lazy(() => import('./Screens/SubmitCardsScreen/SubmitCardsScreen'));
const PrivacyScreen = lazy(() => import('./Screens/PrivacyScreen/PrivacyScreen'));
const ContentPolicyScreen = lazy(() => import('./Screens/ContentPolicyScreen/ContentPolicyScreen'));
const ModerationGuidelinesScreen = lazy(() => import('./Screens/ModerationGuidelinesScreen/ModerationGuidelinesScreen'));
const LicenseScreen = lazy(() => import('./Screens/LicenseScreen/LicenseScreen'));
const ProductsScreen = lazy(() => import('./Screens/ProductsScreen/ProductsScreen'));

// Routing
export const enum ROUTE_PARAM {
	PARTY_CODE = 'partyCode',
}

export const enum ROUTE_PATH {
	HOME = '/',
	JOIN_PARTY = '/join',
	START_GAME = `/join/:${ROUTE_PARAM.PARTY_CODE}`,
	PLAYER_SELECTION = `/:${ROUTE_PARAM.PARTY_CODE}`,
	COMMUNITY_VOTING = '/community/cards',
	MODERATOR_DASHBOARD = '/moderator',
	HOW_TO_PLAY = '/how-to-play',
	GAME_RULES = '/game-rules',
	SUBMIT_CARDS = '/submit-cards',
	PRIVACY = '/privacy',
	CONTENT_POLICY = '/content-policy',
	MODERATION_GUIDELINES = '/moderation-guidelines',
	LICENSE = '/license',
	PRODUCTS = '/products',
}

const App = () => {
	return (
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<div className="flex flex-col flex-1">
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
						path={`${ROUTE_PATH.COMMUNITY_VOTING}`}
						element={<CommunityVotingScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.MODERATOR_DASHBOARD}`}
						element={<ModeratorDashboard/>}
					/>
					<Route
						path={`${ROUTE_PATH.HOW_TO_PLAY}`}
						element={<HowToPlayScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.GAME_RULES}`}
						element={<GameRulesScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.SUBMIT_CARDS}`}
						element={<SubmitCardsScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.PRIVACY}`}
						element={<PrivacyScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.CONTENT_POLICY}`}
						element={<ContentPolicyScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.MODERATION_GUIDELINES}`}
						element={<ModerationGuidelinesScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.LICENSE}`}
						element={<LicenseScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.PRODUCTS}`}
						element={<ProductsScreen/>}
					/>
					<Route
						path={`${ROUTE_PATH.PLAYER_SELECTION}`}
						element={<PlayerSelectionScreen/>}
					/>
				</Routes>
			</Suspense>
			</div>
		</BrowserRouter>
	);
}

export default App;
