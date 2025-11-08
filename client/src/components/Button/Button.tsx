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

const baseButtonClasses = 'bg-[#979797] rounded-lg border-0 w-[182px] h-[50px] leading-[50px] text-center font-bold text-[23px] cursor-pointer text-black no-underline hover:text-black hover:no-underline';

const Button = ({asLink = false, disabled = false, className = '', link, onClick, text, type = 'button'}: ButtonProps) => {
	const buttonClasses = `${baseButtonClasses} ${className}`;
	const disabledClasses = `${baseButtonClasses} opacity-50 ${className}`;

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
