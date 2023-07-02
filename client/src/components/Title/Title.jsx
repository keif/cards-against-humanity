import React from 'react';
import "./Title.css";

const Title = ({text}) => {
    return (
        <div className="title">
            <h1>{text}</h1>
        </div>
    );
};

export default Title;
