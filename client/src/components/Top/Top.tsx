import React from 'react'
import "./Top.css"

interface TopProps {
	className?: string;
	children: React.ReactNode;
}

const Top = ({className, children}: TopProps) => {
	return (
		<div className={`${className} top`} id="top">
			{children}
		</div>
	);
}

export default Top;
