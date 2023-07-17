import React, {useState} from 'react';
import "./PlayerList.css";

const PlayerList = (props) => {
    const {className, joined, onChange, players} = props;
    const [playerName, setPlayerName] = useState("");

    const handleOnChange = (event) => {
        const userInput = event.target.value;
        setPlayerName(userInput);
        onChange(userInput);
    };

    return (
        <div className={`${className}`}>
            <ol>
                {players.map(((player, index) => <li key={index}>{player}</li>))}
                {!joined &&
                    <li><input type="text" className="enterName" placeholder="Enter Name Here" id="playerName"
                               onChange={handleOnChange} value={playerName}/></li>}
            </ol>
        </div>
    );
};

export default PlayerList;
