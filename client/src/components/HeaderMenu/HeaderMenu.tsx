import React from 'react';
import { GameConfig } from '@/types';

interface HeaderMenuProps {
	text: string;
	timeLeft: number;
	playerName?: string;
	playerScore?: number;
	onScoreClick?: () => void;
	gameConfig?: GameConfig;
	onEndGameWithHaiku?: () => void;
}

const HeaderMenu = ({text, timeLeft, playerName, playerScore, onScoreClick, gameConfig, onEndGameWithHaiku}: HeaderMenuProps) => (
	<div className="w-full h-[60px] bg-table text-paper border-b-2 border-table-line flex items-center" data-qa="header-menu">
		<div className="flex flex-nowrap justify-between items-center px-4 md:px-[30px] py-0 leading-tight text-[17px] md:text-[19px] font-bold w-full gap-3" data-qa="inner-header-menu">
			<div
				className={`flex items-center gap-2 transition-opacity hover:opacity-80 ${onScoreClick ? 'cursor-pointer' : 'cursor-default'}`}
				onClick={onScoreClick}
			>
				<span className="player-name-text">{playerName || ''}</span>
				{playerScore !== undefined && (
					<span
						className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 py-0.5 bg-riso-yellow text-ink rounded-sm font-mono text-sm font-bold transition-transform hover:scale-110 score-badge"
						title="Click to view scoreboard"
					>
						{playerScore}
					</span>
				)}
			</div>
			<p>{text}</p>
			<div className="flex items-center gap-4">
				{gameConfig?.enabledRules?.happyEnding && onEndGameWithHaiku && (
					<button
						onClick={onEndGameWithHaiku}
						className="px-3 py-1.5 min-h-[40px] text-sm font-bold bg-pink text-ink border-0 rounded-lg cursor-pointer hover:bg-pink-hover transition-colors"
						title="End the game with a dramatic haiku reading"
					>
						End game with a haiku
					</button>
				)}
				{/* The server sends 0 when no countdown is running (e.g. while the judge picks); a bare "0" reads as "time's up". */}
				{timeLeft > 0 && (
					<p className="font-mono text-riso-yellow tabular-nums" role="timer" aria-label={`${timeLeft} seconds left`}>
						{timeLeft}
					</p>
				)}
			</div>
		</div>
	</div>
);

// function HamburgerMenu() {
//   // Todo: add change class to bar* for animation
//   return (
//     <div className="hamburgerMenu">
//       <div className="bar1"></div>
//       <div className="bar2"></div>
//       <div className="bar3"></div>
//     </div>
//   );
// }

export default HeaderMenu;
