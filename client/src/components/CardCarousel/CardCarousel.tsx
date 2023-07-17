import React from 'react'
import "./CardCarousel.css"
import Card, { CardProps } from "../Card/Card"
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/types";

interface CardCarouselProps {
	cards: CardProps[]
}

const CardCarousel = ({cards}: CardCarouselProps) => {
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

	return (
		<div
			className="scrolling-wrapper"
			ref={drop}
		>
			{cards.map((card, index) => <Card {...card} key={card.id} index={index}/>)}
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
