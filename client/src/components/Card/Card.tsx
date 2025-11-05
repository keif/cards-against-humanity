import "./Card.css";

// external imports
import { SITE_NAME } from "@/constants/constants";
import { ItemTypes } from "@/types";
import { useDrag } from "react-dnd";


export type CardType = "Q" | "A" | "Title" | "placeholder" | "Link";
export const Q: CardType = "Q";
export const A: CardType = "A";
export const TITLE: CardType = "Title";
export const PLACEHOLDER: CardType = "placeholder";
export const LINK: CardType = "Link";

export interface CardProps {
	cardType: CardType;
	className?: string;
	expansion?: string;
	id?: number;
	index?: number;
	isSelected?: boolean;
	link?: string;
	numAnswers?: number;
	onClick?: (id: number) => void;
	owner?: {
		name: string;
		pID: number;
	}
	status?: string;
	text?: string;
}

const Card = ({ cardType, className, id, index, isSelected, link, numAnswers, onClick, status, text }: CardProps) => {
	if (cardType === "Q" && text) {
		const formattedText = text.replaceAll("_", "__________");
		return (
			<div>
				<div className={`card Q ${className}`}>
					{numAnswers && numAnswers > 1 && (
						<div className="multi-answer-badge">
							Pick {numAnswers}
						</div>
					)}
					<p dangerouslySetInnerHTML={{ __html: formattedText }} />
				</div>
				{
					status &&
					<div className={`status ${className}`}>
						<span>{status}</span>
					</div>
				}
			</div>
		);
	} else if (cardType === TITLE) {
		return (
			<div className={`card Title ${className}`}>
				<h3>{SITE_NAME}</h3>
			</div>
		);
	} else if (cardType === PLACEHOLDER) {
		return (
			<div className={`card placeholder ${className}`}>
				Drop Card Here
			</div>
		);
	} else if (cardType === LINK && link) {
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

		const handleClick = () => {
			if (onClick && id !== undefined) {
				onClick(id);
			}
		};

		const selectedClass = isSelected ? 'selected' : '';

		return (
			<div
				className={`card A ${className} ${selectedClass}`}
				ref={drag}
				onClick={handleClick}
				style={{
					cursor: onClick ? 'pointer' : 'move',
					opacity: isDragging ? 0.5 : 1,
				}}
			>
				<p dangerouslySetInnerHTML={{ __html: text || '' }} />
			</div>
		);
	}
}

export default Card;
