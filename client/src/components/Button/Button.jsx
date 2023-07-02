import React from 'react'
import "./Button.css"
import { Link } from "react-router-dom";

const Button = ({ disabled, className, link, onClick, text}) => {
  // disabled btn
  if (disabled) {
    return (
      <button disabled type="button" className={`menuButton disabled ${className}`}>
        {text}
      </button>
    );
  }
  // link btn
  if (link) {
    console.log(`btn link`);
    return (
      <Link to={link ? link : "/404"} className={`menuButton ${className}`}>
        {text}
      </Link>
    );
  }
  // onClick btn
  else if (onClick) {
    console.log(`btn click`);
    return (
      <button type="button" className={`menuButton ${className}`} onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button;
