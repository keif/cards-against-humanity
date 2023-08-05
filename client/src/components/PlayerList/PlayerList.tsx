import React, { useState } from 'react';
import "./PlayerList.css";

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
		<div className={`player-list ${className}`}>
			<ol>
				{players.map(((player, index) => <li key={index}>{player}</li>))}
				{!joined &&
                    <li><input type="text" className="enterName" placeholder="Enter Name Here" id="playerName"
                               onChange={handleOnChange} value={playerName}/></li>}
			</ol>
		</div>
	);
};

export default PlayerList;
