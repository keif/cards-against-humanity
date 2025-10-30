import { ItemTypes } from "@/types";
import { useDrop } from "react-dnd";
import Card, { CardProps } from "../Card/Card";
import "./CardCarousel.css";

interface CardCarouselProps {
	cards: CardProps[];
}

const CardCarousel = ({ cards }: CardCarouselProps) => {
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
				// Vibrate when dragging card over carousel
				if (window.navigator.vibrate) {
					window.navigator.vibrate(100);
				}
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
	);
}

export default CardCarousel;
