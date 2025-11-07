import React from 'react';

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

	const baseClasses = "bg-black/70 rounded-lg p-[15px] min-w-[200px] max-w-[300px] md:min-w-[150px] md:max-w-[250px] md:p-2.5";
	const dropdownClasses = onClose ? "fixed top-[70px] left-5 z-[1000] m-0 shadow-[0_8px_16px_rgba(0,0,0,0.4)] animate-slideDown md:m-0" : "m-2.5 md:m-[5px]";

	if (!playerScores || playerScores.length === 0) {
		// Show scoreboard with placeholder when no scores yet
		return (
			<div className={`${baseClasses} ${dropdownClasses}`}>
				{onClose && (
					<button
						className="absolute top-2 right-2 bg-transparent border-0 text-white text-xl cursor-pointer w-7 h-7 flex items-center justify-center rounded transition-colors hover:bg-white/20 p-0"
						onClick={onClose}
						aria-label="Close scoreboard"
					>
						✕
					</button>
				)}
				<h3 className="text-white text-lg md:text-base font-bold m-0 mb-2.5 text-center border-b-2 border-[#4CAF50] pb-2">
					Scores
				</h3>
				<div className="flex flex-col gap-1.5">
					<div className="flex justify-between items-center px-3 py-2 md:px-2.5 md:py-1.5 bg-white/10 rounded-[5px]">
						<span className="text-white flex-1 mx-2.5 text-sm md:text-[13px] opacity-50">
							Waiting for players...
						</span>
					</div>
				</div>
			</div>
		);
	}

	// Sort players by score (highest first)
	const sortedPlayers = [...playerScores].sort((a, b) => b.score - a.score);

	return (
		<div className={`${baseClasses} ${dropdownClasses}`}>
			{onClose && (
				<button
					className="absolute top-2 right-2 bg-transparent border-0 text-white text-xl cursor-pointer w-7 h-7 flex items-center justify-center rounded transition-colors hover:bg-white/20 p-0"
					onClick={onClose}
					aria-label="Close scoreboard"
				>
					✕
				</button>
			)}
			<h3 className="text-white text-lg md:text-base font-bold m-0 mb-2.5 text-center border-b-2 border-[#4CAF50] pb-2">
				Scores
			</h3>
			<div className="flex flex-col gap-1.5">
				{sortedPlayers.map((player, index) => (
					<div
						key={player.pID}
						className={`flex justify-between items-center px-3 py-2 md:px-2.5 md:py-1.5 bg-white/10 rounded-[5px] transition-colors hover:bg-white/15 ${
							player.name === currentPlayerName ? 'bg-[#4CAF50]/30 border border-[#4CAF50] hover:bg-[#4CAF50]/40' : ''
						}`}
					>
						<span className="text-[#FFD700] font-bold text-base md:text-sm min-w-[25px]">
							{index + 1}
						</span>
						<span className="text-white flex-1 mx-2.5 text-sm md:text-[13px]">
							{player.name}
						</span>
						<span className="text-[#4CAF50] font-bold text-base md:text-sm min-w-[30px] text-right">
							{player.score}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Scoreboard;
