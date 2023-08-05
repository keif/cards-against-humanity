import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

interface ButtonProps {
	asLink?: boolean;
	disabled?: boolean;
	className?: string;
	link?: string;
	onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
	text: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({asLink = false, disabled = false, className = '', link, onClick, text, type = 'button'}: ButtonProps) => {
	// disabled btn
	if (disabled) {
		return (
			<button disabled type={type} className={`menuButton disabled ${className}`} data-qa={'button-disabled'}>
				{text}
			</button>
		);
	}
	// link btn
	if (asLink && link) {
		return (
			<Link to={link ? link : '/404'} className={`menuButton ${className}`} data-qa={'link'}>
				{text}
			</Link>
		);
	}
	// onClick btn
	if (onClick) {
		return (
			<button type={type} className={`menuButton button ${className}`} data-qa={'button-clickable'}
			        onClick={onClick}>
				{text}
			</button>
		);
	}
};

export default Button;
