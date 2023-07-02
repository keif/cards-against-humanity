import React from 'react';
import {Droppable} from "react-beautiful-dnd";
import Card from "../Card/Card";
import "./DropCardSpace.css";

// Draggable player IFF
// player-selecting & player  (show status)
// judge-selecting % judge    (don't show status)

// --> Draggable
// Not Draggable IFF
// player-waiting & player    (show status)
// judge-selecting & player   (don't show status)
// judge-waiting & judge    (show status)
const DropCardSpace = (props) => {
    const {cardsIn, roundRole, roundState, QCard, playerChoice} = props;
    let status = (cardsIn > 0 && roundState !== 'viewing-winner') ? `${cardsIn} Cards In` : "";
    // draggable
    if ((roundRole === 'player' && roundState === 'player-selecting') ||
        (roundRole === 'judge' && roundState === 'judge-selecting') ||
        (roundState === 'viewing-winner')) {
        return (
            <div className="drop-space">
                <Card {...QCard} status={roundState !== 'judge-selecting' && status}/>
                <Droppable droppableId="top" direction="horizontal">
                    {
                        (provider) => (
                            <div
                                ref={provider.innerRef}
                                {...provider.droppableProps}
                            >
                                {(playerChoice && <Card {...playerChoice} index={0}/>) ||
                                    <Card cardType="placeholder"/>}
                                {provider.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </div>
        );
    }
    // not draggable
    else if ((roundRole === 'player' && roundState === 'judge-selecting') ||
        (roundRole === 'player' && roundState === 'player-waiting') ||
        (roundRole === 'judge' && roundState === 'judge-waiting')) {
        return (
            <div className="drop-space">
                <Card {...QCard} status={roundState !== 'judge-selecting' && status}/>
            </div>
        );
    }
    // unknown combo of roundStand and roundRole
    else {
        return (`invalid combination of roundState(${roundState}) and roundRole(${roundRole})`);
    }
};

export default DropCardSpace;
