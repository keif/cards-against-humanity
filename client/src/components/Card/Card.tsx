import "./Card.css";

// external imports
import { SITE_NAME } from "@/constants/constants";
import { ItemTypes } from "@/types";
import { useDrag } from "react-dnd";


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

const Card = ({ cardType, className, id, index, link, status, text }: CardProps) => {
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
				<h3>{SITE_NAME}</h3>
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
				<h3>Invite friends</h3>
				<h3>with party code:</h3>
				<h6 className="link" onClick={() => navigator.clipboard.writeText(window.location.href)}>
					(Click to copy) {window.location.href}
				</h6>
			</div>
		)
	} else {
		const [{ isDragging }, drag] = useDrag({
			type: ItemTypes.CARD,
			item: { id: id },
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
