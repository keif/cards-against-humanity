import React from 'react';
import "./HeaderMenu.css";

interface HeaderMenuProps {
	text: string;
	timeLeft: number;
	playerName?: string;
}

const HeaderMenu = ({text, timeLeft, playerName}: HeaderMenuProps) => (
	<div className="headerMenu">
		<div className="innerHeaderMenu">
			<p>{playerName || ''}</p>
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
