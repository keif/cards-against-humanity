import React, { useState } from 'react';

import Banner from 'react-js-banner';
import Bottom from "../../components/Bottom/Bottom";
import Button from "../../components/Button/Button";
import Card, { TITLE } from "../../components/Card/Card";
import Screen from "../../components/Screen/Screen";
import Title from "../../components/Title/Title";
import Top from "../../components/Top/Top";
import FooterSection from "../HomeScreen/FooterSection";


const JoinPartyScreen = () => {
	const [state, setState] = useState({
		partyCode: ""
	});

	const updatePartyCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			partyCode: event.target.value.toLowerCase()
		});
	}

	// Get app domain from env var, default to current host
	const appDomain = import.meta.env.VITE_APP_DOMAIN || window.location.host;

	return (
		<>
			<Screen>
				<Top>
					<Banner title="Ask your friend for the party code or create a game if you are the first player in the party!" />
					<Card cardType={TITLE} />
				</Top>
				<Bottom>
					<Title text={`Join an existing party`} />
					<div className="text-center">
						<p className="mb-0">Enter the Party Code</p>
						<input
							className="w-full border border-solid border-black rounded-sm px-2 py-1"
							type="text"
							name="partyCode"
							placeholder={`${appDomain}/<party_code>`}
							onChange={updatePartyCode}
						/>
					</div>
					<Button
						asLink
						className="center"
						disabled={state.partyCode.length === 0}
						link={`/join/${state.partyCode}`}
						text="Join Party"
					/>
				</Bottom>
			</Screen>
			<FooterSection />
		</>
	);
}

export default JoinPartyScreen;
