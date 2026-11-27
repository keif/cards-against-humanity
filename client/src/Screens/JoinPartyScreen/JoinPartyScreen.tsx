import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Bottom from "../../components/Bottom/Bottom";
import Button from "../../components/Button/Button";
import Card, { TITLE } from "../../components/Card/Card";
import Screen from "../../components/Screen/Screen";
import Title from "../../components/Title/Title";
import Top from "../../components/Top/Top";
import FooterSection from "../HomeScreen/FooterSection";
import { parsePartyCode } from '@/utils/partyCode';


const JoinPartyScreen = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState('');
	const [error, setError] = useState('');

	// Same rules as the home page field: keep the case (codes are case-sensitive) and accept a pasted invite link.
	const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const partyCode = parsePartyCode(input);
		if (!partyCode) {
			setError('That doesn\'t look like a party code. Check it with whoever sent it.');
			return;
		}
		navigate(`/join/${encodeURIComponent(partyCode)}`);
	};

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
						<form className="text-center" onSubmit={handleJoin} noValidate>
							<label htmlFor="partyCode" className="block mb-2 font-bold">Party code or invite link</label>
							<input
								id="partyCode"
								autoComplete="off"
								autoCapitalize="off"
								spellCheck={false}
								aria-invalid={error ? true : undefined}
								aria-describedby={error ? 'partyCode-error' : undefined}
								className="w-full max-w-[20rem] mb-4 min-h-[52px] font-mono font-bold text-xl tracking-[0.14em] bg-table text-paper border-2 border-table-line rounded-lg px-4 placeholder:text-muted placeholder:tracking-normal placeholder:font-normal placeholder:text-base"
								type="text"
								name="partyCode"
								placeholder={`${appDomain}/<party_code>`}
								value={input}
								onChange={(event) => { setInput(event.target.value); setError(''); }}
							/>
							{error && (
								<p id="partyCode-error" role="alert" className="mt-0 mb-4 mx-auto max-w-[20rem] flex items-start gap-2 text-left text-sm">
									<span className="font-mono font-bold text-xs bg-error text-ink px-1.5 py-0.5 rounded-sm">NOPE</span>
									{error}
								</p>
							)}
							<Button
								className="center"
								disabled={input.trim().length === 0}
								type="submit"
								text="Join party"
							/>
						</form>
					</Bottom>
				</Screen>
			</div>
			<FooterSection />
		</div>
	);
}

export default JoinPartyScreen;
