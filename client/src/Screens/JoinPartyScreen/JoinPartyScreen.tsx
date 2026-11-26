import React, { useState } from 'react';

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
		<div className="flex flex-col flex-1">
			<div className="flex-1">
				<Screen>
					<Top>
						<p className="m-0 px-4 pt-4 text-center text-sm font-bold text-muted">Ask a friend for the party code, or start a party if you're first.</p>
						<Card cardType={TITLE} />
					</Top>
					<Bottom>
						<Title text={`Join an existing party`} />
						<div className="text-center">
							<label htmlFor="partyCode" className="block mb-2 font-bold">Party code</label>
							<input
								id="partyCode"
								autoComplete="off"
								className="w-full max-w-[20rem] mb-4 min-h-[52px] font-mono font-bold text-xl tracking-[0.14em] bg-table text-paper border-2 border-table-line rounded-lg px-4 placeholder:text-muted placeholder:tracking-normal placeholder:font-normal placeholder:text-base"
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
			</div>
			<FooterSection />
		</div>
	);
}

export default JoinPartyScreen;
