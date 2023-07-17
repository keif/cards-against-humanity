import React from 'react';
import "./Button.css";
import {Link} from "react-router-dom";

const Button = ({disabled, className, link, onClick, text}) => {
    // disabled btn
    if (disabled) {
        return (
            <button disabled type="button" className={`menuButton disabled ${className}`} data-qa={'button-disabled'}>
                {text}
            </button>
        );
    }
    // link btn
    if (link) {
        return (
            <Link to={link ? link : "/404"} className={`menuButton ${className}`} data-qa={'link'}>
                {text}
            </Link>
        );
    }
    // onClick btn
    if (onClick) {
        return (
            <button type="button" className={`menuButton button ${className}`} data-qa={'button-clickable'}
                    onClick={onClick}>
                {text}
            </button>
        );
    }
};

export default Button;
