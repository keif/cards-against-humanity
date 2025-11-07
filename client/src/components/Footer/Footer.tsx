import React from 'react'

interface FooterProps {
	children: React.ReactNode;
}

const Footer = ({children}: FooterProps) => {
	return (
		<div className="text-[15px] font-bold mt-4 mb-2 text-center">
			{children}
		</div>
	);
}

export default Footer;
