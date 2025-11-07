import React from 'react'

interface BottomProps {
	children: React.ReactNode
}

const Bottom = ({children}: BottomProps) => {
	return (
		<div className="h-[45%] z-[1] bg-white relative px-[15px] py-0 flex flex-col justify-between transition-all duration-1000" id="bottom">
			{children}
		</div>
	);
}

export default Bottom;
