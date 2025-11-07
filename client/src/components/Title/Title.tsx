import React, { FC } from 'react';

interface TitleProps {
	text: string;
}

const Title = ({text}: TitleProps) => {
	return (
		<div className="text-center">
			<h1>{text}</h1>
		</div>
	);
};

export default Title;
