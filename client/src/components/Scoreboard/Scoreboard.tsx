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
	isOpen?: boolean;
	onClose?: () => void;
}

const Scoreboard = ({ playerScores, currentPlayerName, isOpen = true, onClose }: ScoreboardProps) => {
	// Debug logging
	console.log('Scoreboard render - playerScores:', playerScores);
	console.log('Scoreboard render - currentPlayerName:', currentPlayerName);
	console.log('Scoreboard render - isOpen:', isOpen);

	// Don't render if not open in dropdown mode
	if (onClose && !isOpen) {
		return null;
	}

	if (!playerScores || playerScores.length === 0) {
		// Show scoreboard with placeholder when no scores yet
		return (
			<div className={`scoreboard ${onClose ? 'scoreboard-dropdown' : ''}`}>
				{onClose && (
					<button className="scoreboard-close" onClick={onClose} aria-label="Close scoreboard">
						✕
					</button>
				)}
				<h3 className="scoreboard-title">Scores</h3>
				<div className="scoreboard-list">
					<div className="scoreboard-item">
						<span className="player-name" style={{ opacity: 0.5 }}>Waiting for players...</span>
					</div>
				</div>
			</div>
		);
	}

	// Sort players by score (highest first)
	const sortedPlayers = [...playerScores].sort((a, b) => b.score - a.score);

	return (
		<div className={`scoreboard ${onClose ? 'scoreboard-dropdown' : ''}`}>
			{onClose && (
				<button className="scoreboard-close" onClick={onClose} aria-label="Close scoreboard">
					✕
				</button>
			)}
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
