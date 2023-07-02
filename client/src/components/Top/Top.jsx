import React from 'react'
import "./Top.css"

const Top = ({className, children}) => {
  return (
    <div className={`${className} top`} id="top">
      {children}
  </div>
  );
}

export default Top;
