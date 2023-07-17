import React from 'react';
import "./HeaderMenu.css";

const HeaderMenu = ({text, timeLeft}) => (
    <div className="headerMenu">
        <div className="innerHeaderMenu">
            {/* <HamburgerMenu/> temporarily removing this since the side menu is not implemented yet*/}
            <p></p>
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
