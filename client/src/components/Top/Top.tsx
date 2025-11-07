import React from 'react'

interface TopProps {
	className?: string;
	children: React.ReactNode;
}

const Top = ({className, children}: TopProps) => {
	return (
		<div className={`w-full h-[55%] bg-[#D8D8D8] z-0 overflow-hidden transition-all duration-1000 ${className || ''}`} id="top">
			{children}
		</div>
	);
}

export default Top;
