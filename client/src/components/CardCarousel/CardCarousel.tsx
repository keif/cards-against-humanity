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
	eliminatedCards?: number[];
}

// Draggable wrapper for card groups
interface DraggableCardGroupProps {
	group: CardGroup;
	groupIndex: number;
	onCardClick?: (id: number) => void;
	selectedCards: number[];
	eliminatedCards?: number[];
}

const DraggableCardGroup = ({ group, groupIndex, onCardClick, selectedCards, eliminatedCards = [] }: DraggableCardGroupProps) => {
	// Use the first non-eliminated card's ID to represent the group
	const representativeCard = group.cards.find(card =>
		card.id !== undefined && !eliminatedCards.includes(card.id)
	);
	const representativeCardId = representativeCard?.id;

	// Check if ALL cards in the group are eliminated
	const isGroupEliminated = group.cards.every(card =>
		card.id !== undefined && eliminatedCards.includes(card.id)
	);

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.CARD,
			item: { id: representativeCardId, type: ItemTypes.CARD },
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			canDrag: !isGroupEliminated && representativeCardId !== undefined, // Can't drag if all cards eliminated
		}),
		[representativeCardId, isGroupEliminated]
	);

	const handleGroupClick = (clickedCardId?: number) => {
		// If a specific card was clicked, use that ID; otherwise use representative
		const targetCardId = clickedCardId ?? representativeCardId;

		// Check if the clicked card is eliminated
		const isCardEliminated = targetCardId !== undefined && eliminatedCards.includes(targetCardId);

		console.log('🖱️ Card clicked in group', { targetCardId, isCardEliminated, hasOnCardClick: !!onCardClick });
		if (onCardClick && targetCardId !== undefined && !isCardEliminated) {
			console.log('✅ Calling onCardClick with', targetCardId);
			onCardClick(targetCardId);
		} else {
			console.log('❌ Click blocked', { hasOnCardClick: !!onCardClick, targetCardId, isCardEliminated });
		}
	};

	// Check if this group has any selected cards
	const isGroupSelected = group.cards.some(card =>
		card.id !== undefined && selectedCards.includes(card.id)
	);

	return (
		<div
			ref={drag}
			key={`group-${group.playerID}`}
			className={`relative flex flex-row gap-2 p-3 mr-5 rounded-xl shrink-0 transition-all duration-200 ease-in-out ${
				isGroupEliminated
					? 'bg-table border-2 border-table-line opacity-40 cursor-not-allowed'
					: isGroupSelected
						? 'bg-table border-[3px] border-pink'
						: 'bg-table/40 border-2 border-table-line hover:border-muted hover:-translate-y-0.5'
			} ${!isGroupEliminated && onCardClick ? 'cursor-pointer' : !isGroupEliminated && isDragging ? 'cursor-grabbing' : !isGroupEliminated ? 'cursor-grab' : ''}`}
			style={{
				opacity: isDragging ? 0.5 : isGroupEliminated ? 0.5 : 1
			}}
		>
			{isGroupEliminated && (
				<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
					<span className="font-mono font-bold text-sm tracking-[0.06em] bg-error text-ink px-3 py-1.5 rounded-sm">ELIMINATED</span>
				</div>
			)}
			{group.cards.map((card, cardIndex) => {
				const isCardEliminated = card.id !== undefined && eliminatedCards.includes(card.id);
				const isCardSelected = card.id !== undefined && selectedCards.includes(card.id);

				return (
					<div
						key={card.id}
						className="relative"
						onClick={(e) => {
							e.stopPropagation();
							handleGroupClick(card.id);
						}}
					>
						{isCardEliminated && (
							<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none bg-table/60 rounded-lg">
								<span className="font-mono font-bold text-xs bg-error text-ink px-2 py-1 rounded-sm">OUT</span>
							</div>
						)}
						<Card
							{...card}
							index={groupIndex * 100 + cardIndex}
							onClick={undefined} // Handle click at div level
							isSelected={isCardSelected}
							disableDrag={true}
							className={`${isCardEliminated ? 'opacity-50 grayscale' : ''} pointer-events-none`}
						/>
					</div>
				);
			})}
		</div>
	);
};

const CardCarousel = ({ cards, cardGroups, onCardClick, onCardDiscard, onCardRemove, selectedCards = [], eliminatedCards = [] }: CardCarouselProps) => {
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
			<div className="flex flex-nowrap overflow-x-auto overflow-y-visible pt-5 pb-2.5 scroll-smooth -mx-[15px] px-[15px]" ref={drop}>
				{cardGroups.map((group, groupIndex) => (
					<DraggableCardGroup
						key={`group-${group.playerID}`}
						group={group}
						groupIndex={groupIndex}
						onCardClick={onCardClick}
						selectedCards={selectedCards}
						eliminatedCards={eliminatedCards}
					/>
				))}
			</div>
		);
	}

	// Render flat list for regular hand
	return (
		<div
			className="flex flex-nowrap overflow-x-auto overflow-y-visible pt-5 pb-2.5 scroll-smooth -mx-[15px] px-[15px]"
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
					className="mr-[11px] flex-shrink-0"
				/>
			))}
		</div>
	);
}

export default CardCarousel;
