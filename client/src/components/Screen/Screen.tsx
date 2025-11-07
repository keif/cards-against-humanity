import React from 'react';

interface ScreenProps {
	children: React.ReactNode;
}

const Screen = ({children}: ScreenProps) => {
	return (
		<div className="h-full">
			{children}
		</div>
	);
};

export default Screen;
