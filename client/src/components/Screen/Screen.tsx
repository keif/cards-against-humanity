import React from 'react';

interface ScreenProps {
	children: React.ReactNode;
}

const Screen = ({children}: ScreenProps) => {
	return (
		<div className="h-full min-h-screen bg-table text-paper">
			{children}
		</div>
	);
};

export default Screen;
