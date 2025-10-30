import { ItemTypes, DraggedCard } from "@/types";
import { useDrop } from "react-dnd";
import Card, { CardProps } from "../Card/Card";
import "./CardCarousel.css";

interface CardCarouselProps {
	cards: CardProps[];
	dropHandler: (card: DraggedCard) => void;
}

const CardCarousel = ({ cards, dropHandler }: CardCarouselProps) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
			drop: (item, monitor) => {
				return true;
			},
			hover(item, monitor) {
				// maybe replace with dropHandler???
				// vibrate when dragging card
				if (window.navigator.vibrate) {
					window.navigator.vibrate(100);
				};
				const dragIndex = item.id;
				dropHandler(item);
				// current element where the dragged element is hovered on
				// const hoverIndex = index;
				// If the dragged element is hovered in the same place, then do nothing
				// if (dragIndex === hoverIndex) {
				// 	return;
				// }
			}
		}),
		[]);

	return (
		<div
			className="scrolling-wrapper"
			ref={drop}
		>
			{cards.map((card, index) => <Card {...card} index={index} key={card.id} />)}
		</div>
		// <Droppable droppableId={'bottom'} direction="horizontal">
		//     {
		//         (provider) => (
		//             <div
		//                 ref={provider.innerRef}
		//                 {...provider.droppableProps}
		//                 className="scrolling-wrapper"
		//             >
		//                 {cards.map((card, index) => <Card {...card} key={card.id} index={index}/>)}
		//                 {provider.placeholder}
		//             </div>
		//         )
		//     }
		// </Droppable>
	);
}

export default CardCarousel;
