import { ItemTypes } from "@/types";
import { useDrag, useDrop } from "react-dnd";
import Card, { CardProps } from "../Card/Card";
import "./CardCarousel.css";

export interface CardGroup {
	playerID: number;
	playerName?: string;
	cards: CardProps[];
}

interface CardCarouselProps {
	cards?: CardProps[];
	cardGroups?: CardGroup[];
	onCardClick?: (id: number) => void;
	selectedCards?: number[];
}

// Draggable wrapper for card groups
interface DraggableCardGroupProps {
	group: CardGroup;
	groupIndex: number;
	onCardClick?: (id: number) => void;
	selectedCards: number[];
}

const DraggableCardGroup = ({ group, groupIndex, onCardClick, selectedCards }: DraggableCardGroupProps) => {
	// Use the first card's ID to represent the group
	const representativeCardId = group.cards[0]?.id;

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.CARD,
			item: { id: representativeCardId, type: ItemTypes.CARD },
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[representativeCardId]
	);

	return (
		<div
			ref={drag}
			key={`group-${group.playerID}`}
			className={`card-group ${isDragging ? 'dragging' : ''}`}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: 'grab'
			}}
		>
			{group.cards.map((card, cardIndex) => (
				<Card
					{...card}
					index={groupIndex * 100 + cardIndex}
					key={card.id}
					onClick={onCardClick}
					isSelected={card.id !== undefined && selectedCards.includes(card.id)}
					disableDrag={true}
				/>
			))}
		</div>
	);
};

const CardCarousel = ({ cards, cardGroups, onCardClick, selectedCards = [] }: CardCarouselProps) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
			drop: (item, monitor) => {
				// Return undefined - cards dropped here are returned to hand
				return undefined;
			},
			hover(item, monitor) {
				// Vibrate when dragging card over carousel
				if (window.navigator.vibrate) {
					window.navigator.vibrate(100);
				}
			}
		}),
		[]);

	// Render grouped cards for judge selection
	if (cardGroups) {
		return (
			<div className="scrolling-wrapper" ref={drop}>
				{cardGroups.map((group, groupIndex) => (
					<DraggableCardGroup
						key={`group-${group.playerID}`}
						group={group}
						groupIndex={groupIndex}
						onCardClick={onCardClick}
						selectedCards={selectedCards}
					/>
				))}
			</div>
		);
	}

	// Render flat list for regular hand
	return (
		<div
			className="scrolling-wrapper"
			ref={drop}
		>
			{cards?.map((card, index) => (
				<Card
					{...card}
					index={index}
					key={card.id}
					onClick={onCardClick}
					isSelected={card.id !== undefined && selectedCards.includes(card.id)}
				/>
			))}
		</div>
	);
}

export default CardCarousel;
