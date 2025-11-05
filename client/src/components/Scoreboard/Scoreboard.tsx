import React from 'react';
import './Scoreboard.css';

interface PlayerScore {
	name: string;
	score: number;
	pID: number;
}

interface ScoreboardProps {
	playerScores: PlayerScore[];
	currentPlayerName?: string;
}

const Scoreboard = ({ playerScores, currentPlayerName }: ScoreboardProps) => {
	if (!playerScores || playerScores.length === 0) {
		return null;
	}

	// Sort players by score (highest first)
	const sortedPlayers = [...playerScores].sort((a, b) => b.score - a.score);

	return (
		<div className="scoreboard">
			<h3 className="scoreboard-title">Scores</h3>
			<div className="scoreboard-list">
				{sortedPlayers.map((player, index) => (
					<div
						key={player.pID}
						className={`scoreboard-item ${player.name === currentPlayerName ? 'current-player' : ''}`}
					>
						<span className="player-rank">{index + 1}</span>
						<span className="player-name">{player.name}</span>
						<span className="player-score">{player.score}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Scoreboard;
