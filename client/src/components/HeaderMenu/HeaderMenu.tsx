import React from 'react';

interface HeaderMenuProps {
	text: string;
	timeLeft: number;
	playerName?: string;
	playerScore?: number;
	onScoreClick?: () => void;
}

const HeaderMenu = ({text, timeLeft, playerName, playerScore, onScoreClick}: HeaderMenuProps) => (
	<div className="w-full h-[60px] bg-white flex items-center" data-qa="header-menu">
		<div className="flex flex-nowrap justify-between items-center px-[30px] py-0 leading-[50%] text-[21px] w-full" data-qa="inner-header-menu">
			<div
				className={`flex items-center gap-2 transition-opacity hover:opacity-80 ${onScoreClick ? 'cursor-pointer' : 'cursor-default'}`}
				onClick={onScoreClick}
			>
				<span className="font-normal player-name-text">{playerName || ''}</span>
				{playerScore !== undefined && (
					<span
						className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 py-0.5 bg-[#4CAF50] text-white rounded-xl text-sm font-bold shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform hover:scale-110 hover:shadow-[0_3px_6px_rgba(0,0,0,0.3)] score-badge"
						title="Click to view scoreboard"
					>
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
