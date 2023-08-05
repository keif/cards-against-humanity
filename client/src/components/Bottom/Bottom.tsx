import React from 'react'
import "./Bottom.css"

interface BottomProps {
	children: React.ReactNode
}

const Bottom = ({children}: BottomProps) => {
	return (
		<div className="bottom" id="bottom">
			{children}
		</div>
	);
}

export default Bottom;
