import React from 'react';
import "./HeaderMenu.css";

interface HeaderMenuProps {
	text: string;
	timeLeft: number;
	playerName?: string;
	playerScore?: number;
	onScoreClick?: () => void;
}

const HeaderMenu = ({text, timeLeft, playerName, playerScore, onScoreClick}: HeaderMenuProps) => (
	<div className="headerMenu">
		<div className="innerHeaderMenu">
			<div
				className="player-info"
				onClick={onScoreClick}
				style={{ cursor: onScoreClick ? 'pointer' : 'default' }}
			>
				<span className="player-name-text">{playerName || ''}</span>
				{playerScore !== undefined && (
					<span className="score-badge" title="Click to view scoreboard">
						{playerScore}
					</span>
				)}
			</div>
			<p>{text}</p>
			<p>{timeLeft}</p>
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
