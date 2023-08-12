import React from 'react';
import Card from "../Card/Card";
import "./DropCardSpace.css";
import { JUDGE, JUDGE_SELECTING, JUDGE_WAITING, PLAYER, PLAYER_SELECTING, PLAYER_WAITING, VIEWING_WINNER } from '@/constants/constants';
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/types";

// Draggable player IFF
// player-selecting & player  (show status)
// judge-selecting % judge    (don't show status)

// --> Draggable
// Not Draggable IFF
// player-waiting & player    (show status)
// judge-selecting & player   (don't show status)
// judge-waiting & judge    (show status)

interface DropCardSpaceProps {
	cardsIn: number;
	dropHandler: (card: any) => void; // TODO: fix any types
	roundRole: string;
	roundState: string;
	QCard: any; // TODO: fix any types
	playerChoice: any; // TODO: fix any types
}

const DropCardSpace = ({cardsIn, roundRole, roundState, QCard, playerChoice}: DropCardSpaceProps) => {
	const [{isOver, canDrop}, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			canDrop: () => {
				console.log('can drop')
				return true;
			},
			drop: () => {
				console.log('moving card')
				return true;
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			})
		}),
		[]);
	let status = (cardsIn > 0 && roundState !== VIEWING_WINNER) ? `${cardsIn} Cards In` : "";

	// draggable
	if ((roundRole === PLAYER && roundState === PLAYER_SELECTING) ||
		(roundRole === JUDGE && roundState === JUDGE_SELECTING) ||
		(roundState === VIEWING_WINNER)) {
		return (
			<div className="drop-space">
				<Card {...QCard} status={roundState !== JUDGE_SELECTING && status}/>
				<div
					ref={drop}
				>
					{(playerChoice && <Card {...playerChoice} index={0}/>) ||
                        <Card cardType="placeholder"/>}
				</div>
				{/*<Droppable droppableId="top" direction="horizontal">*/}
				{/*    {*/}
				{/*        (provider) => (*/}
				{/*            <div*/}
				{/*                ref={provider.innerRef}*/}
				{/*                {...provider.droppableProps}*/}
				{/*            >*/}
				{/*                {(playerChoice && <Card {...playerChoice} index={0}/>) ||*/}
				{/*                    <Card cardType="placeholder"/>}*/}
				{/*                {provider.placeholder}*/}
				{/*            </div>*/}
				{/*        )*/}
				{/*    }*/}
				{/*</Droppable>*/}
			</div>
		);
	}
	// not draggable
	else if ((roundRole === PLAYER && roundState === JUDGE_SELECTING) ||
		(roundRole === PLAYER && roundState === PLAYER_WAITING) ||
		(roundRole === JUDGE && roundState === JUDGE_WAITING)) {
		return (
			<div className="drop-space">
				<Card {...QCard} status={roundState !== JUDGE_SELECTING && status}/>
			</div>
		);
	}
	// unknown combo of roundStand and roundRole
	else {
		return (`invalid combination of roundState(${roundState}) and roundRole(${roundRole})`);
	}
};

export default DropCardSpace;
