import React from 'react'
import "./Status.css"

const Status = ({className, message}) => {
  return (
    <div className={`statusModal center ${className}`}>
      {message}
    </div>
  );
}

export default Status;
