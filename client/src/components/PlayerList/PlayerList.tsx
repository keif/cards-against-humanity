import React, { useState } from 'react';

interface PlayerListProps {
	className: string;
	joined: boolean;
	onChange: (playerName: string) => void;
	onEnter?: () => void;
	players: string[];
}

const PlayerList = ({className, joined, onChange, onEnter, players}: PlayerListProps) => {
	const [playerName, setPlayerName] = useState("");

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const userInput = event.target.value;
		setPlayerName(userInput);
		onChange(userInput);
	};

	return (
		<div className={className}>
			<ol className="flex flex-col m-0 min-w-[15rem]">
				{players.map(((player, index) => <li key={index} className="text-xl font-bold mb-2 text-left">{player}</li>))}
				{!joined &&
                    <li className="text-xl font-bold mb-2 text-left">
						<input
							type="text"
							className="rounded-2xl p-1"
							placeholder="Enter Name Here"
							id="playerName"
							onChange={handleOnChange}
							value={playerName}
						/>
					</li>}
			</ol>
		</div>
	);
};

export default PlayerList;
