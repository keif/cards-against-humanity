import { ItemTypes } from "@/types";
import { useDrag, useDrop } from "react-dnd";
import Card, { CardProps } from "../Card/Card";

export interface CardGroup {
	playerID: number;
	playerName?: string;
	cards: CardProps[];
}

interface CardCarouselProps {
	cards?: CardProps[];
	cardGroups?: CardGroup[];
	onCardClick?: (id: number) => void;
	onCardDiscard?: (id: number) => void;
	onCardRemove?: (item: { id: number }) => void;
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
			className={`flex flex-row gap-2 p-3 mr-5 bg-white/5 border-2 border-white/10 rounded-xl shrink-0 transition-all duration-200 ease-in-out hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] active:cursor-grabbing ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
			style={{
				opacity: isDragging ? 0.5 : 1
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
					className="pointer-events-none"
				/>
			))}
		</div>
	);
};

const CardCarousel = ({ cards, cardGroups, onCardClick, onCardDiscard, onCardRemove, selectedCards = [] }: CardCarouselProps) => {
	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			drop: (item) => {
				// Call onCardRemove to remove card from drop zone
				if (onCardRemove && item && typeof item === 'object' && 'id' in item) {
					onCardRemove(item as { id: number });
				}
				return undefined;
			},
			hover() {
				// Vibrate when dragging card over carousel
				if (window.navigator.vibrate) {
					window.navigator.vibrate(100);
				}
			}
		}),
		[onCardRemove]);

	// Render grouped cards for judge selection
	if (cardGroups) {
		return (
			<div className="flex flex-nowrap overflow-x-auto overflow-y-visible pt-5 pb-2.5" ref={drop}>
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
			className="flex flex-nowrap overflow-x-auto overflow-y-visible pt-5 pb-2.5"
			ref={drop}
		>
			{cards?.map((card, index) => (
				<Card
					{...card}
					index={index}
					key={card.id}
					onClick={onCardClick}
					onDiscard={onCardDiscard}
					isSelected={card.id !== undefined && selectedCards.includes(card.id)}
					className="mr-[11px]"
				/>
			))}
		</div>
	);
}

export default CardCarousel;
