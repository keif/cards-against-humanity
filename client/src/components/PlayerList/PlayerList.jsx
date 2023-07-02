import React from 'react';
import "./PlayerList.css";

const PlayerList = (props) => {
    const {className, joined, onChange, players} = props;
    return (
        <div className={`${className}`}>
            <ol>
                {players.map(((player, index) => <li key={index}>{player}</li>))}
                {!joined &&
                    <li><input type="text" className="enterName" placeholder="Enter Name Here" id="playerName"
                               onChange={onChange}/></li>}
            </ol>
        </div>
    );
};

export default PlayerList;
