import React from 'react'
import "./Card.css"

// external imports
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import { ItemTypes } from "@/types";


export type CardType = "Q" | "A" | "Title" | "placeholder" | "Link";

export interface CardProps {
	cardType: CardType;
	className?: string;
	expansion?: string;
	id?: number;
	index?: number;
	link?: string;
	numAnswers?: number;
	owner?: {
		name: string;
		pID: number;
	}
	status?: string;
	text?: string;
}

const Card = ({cardType, className, id, index, link, status, text}: CardProps) => {
	if (cardType === "Q" && text) {
		return (
			<div>
				<div className={`card Q ${className}`}>
					<p>{text.replace("_", "__________")}</p>
				</div>
				{
					status &&
                    <div className={`status ${className}`}>
                        <span>{status}</span>
                    </div>
				}
			</div>
		);
	} else if (cardType === "Title") {
		return (
			<div className={`card Title ${className}`}>
				<h3>Cardi</h3>
				<h3>Party</h3>
			</div>
		);
	} else if (cardType === "placeholder") {
		return (
			<div className={`card placeholder ${className}`}>
				Drop Card Here
			</div>
		);
	} else if (cardType === "Link" && link) {
		return (
			<div className={`card Title Link ${className}`}>
				<h3>Invite</h3>
				<h3>Friends</h3>
				<h3>with party code:</h3>
				<h6 className="link">
					<Link to={link}>
						{`${link}`}
					</Link>
				</h6>
			</div>
		)
	} else {
		const [{isDragging}, drag] = useDrag({
			type: ItemTypes.CARD,
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
		});

		return (
			<div
				className={`card A ${className}`}
				ref={drag}
				style={{
					cursor: 'move',
					opacity: isDragging ? 0.5 : 1,
				}}
			>
				<p>{text}</p>
			</div>
			// <Draggable draggableId={`${id}`} index={index}>
			//     {
			//         (provider) => (
			//             <div
			//                 className={`card A ${className}`}
			//                 {...provider.draggableProps}
			//                 {...provider.dragHandleProps}
			//                 ref={provider.innerRef}
			//             >
			//                 <p>{text}</p>
			//             </div>
			//         )
			//     }
			// </Draggable>
		);
	}
}

export default Card;
