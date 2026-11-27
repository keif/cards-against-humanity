import React from 'react';

interface TitleProps {
	text: string;
}

const Title = ({text}: TitleProps) => {
	return (
		<div className="text-center">
			<h1 className="font-display-tight text-[32px] leading-none my-4">{text}</h1>
		</div>
	);
};

export default Title;
