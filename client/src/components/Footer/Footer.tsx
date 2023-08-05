import React from 'react'
import "./Footer.css"

interface FooterProps {
	children: React.ReactNode;
}

const Footer = ({children}: FooterProps) => {
	return (
		<div className="footer">
			{children}
		</div>
	);
}

export default Footer;
