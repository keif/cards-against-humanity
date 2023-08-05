import React, { FC } from 'react';
import "./Title.css";

interface TitleProps {
	text: string;
}

const Title = ({text}: TitleProps) => {
	return (
		<div className="title">
			<h1>{text}</h1>
		</div>
	);
};

export default Title;
