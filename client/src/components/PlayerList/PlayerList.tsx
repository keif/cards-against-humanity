import React, { useState } from 'react';

interface PlayerListProps {
	className: string;
	joined: boolean;
	onChange: (playerName: string) => void;
	onEnter?: () => void;
	players: string[];
}

const PlayerList = ({className, joined, onChange, players}: PlayerListProps) => {
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
							className="w-full text-xl font-bold px-4 py-2 rounded-lg border-2 border-gray-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder:text-gray-400 placeholder:font-normal hover:border-gray-400"
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
