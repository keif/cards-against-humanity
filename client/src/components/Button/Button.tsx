import React from 'react';
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

// DESIGN.md button-primary: pink with ink text, 3px press offset that collapses on press.
const baseButtonClasses = 'flex w-fit items-center justify-center min-w-[182px] h-[52px] px-6 bg-pink text-ink rounded-lg border-0 shadow-press font-sans font-bold text-[17px] cursor-pointer no-underline transition-transform duration-100 hover:bg-pink-hover hover:text-ink hover:no-underline active:translate-y-0.5 active:shadow-none';

const Button = ({asLink = false, disabled = false, className = '', link, onClick, text, type = 'button'}: ButtonProps) => {
	const buttonClasses = `${baseButtonClasses} ${className}`;
	const disabledClasses = `${baseButtonClasses} opacity-45 cursor-not-allowed active:translate-y-0 ${className}`;

	// disabled btn
	if (disabled) {
		return (
			<button disabled type={type} className={disabledClasses} data-qa={'button-disabled'}>
				{text}
			</button>
		);
	}
	// link btn
	if (asLink && link) {
		return (
			<Link to={link ? link : '/404'} className={buttonClasses} data-qa={'link'}>
				{text}
			</Link>
		);
	}
	// onClick btn
	if (onClick) {
		return (
			<button
				type={type}
				className={buttonClasses}
				data-qa={'button-clickable'}
				onClick={onClick}
			>
				{text}
			</button>
		);
	}

	return (
		<button type={type} className={buttonClasses} data-qa={'button-default'}>
			{text}
		</button>
	);
};

export default Button;
