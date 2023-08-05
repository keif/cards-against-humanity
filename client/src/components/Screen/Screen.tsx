import React from 'react';
import "./Screen.css";

interface ScreenProps {
	children: React.ReactNode;
}

const Screen = ({children}: ScreenProps) => {
	return (
		<div className="screen">
			{children}
		</div>
	);
};

export default Screen;
