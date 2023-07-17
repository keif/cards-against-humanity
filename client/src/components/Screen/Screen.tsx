import React from 'react';
import "./Screen.css";

const Screen = ({children}) => {
    return (
        <div className="screen">
            {children}
        </div>
    );
};


export default Screen;
