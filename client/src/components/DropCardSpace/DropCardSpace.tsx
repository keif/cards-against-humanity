import { JUDGE, JUDGE_SELECTING, JUDGE_WAITING, PLAYER, PLAYER_SELECTING, PLAYER_WAITING, VIEWING_WINNER } from '@/constants/constants';
import { ItemTypes, DraggedCard } from "@/types";
import { useDrop } from "react-dnd";
import Card, { CardProps, PLACEHOLDER } from "../Card/Card";
import "./DropCardSpace.css";

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
	dropHandler: (card: DraggedCard) => void;
	roundRole: string;
	roundState: string;
	QCard: CardProps;
	playerChoice: CardProps | null;
	winningCards?: CardProps[] | null;
}

const DropCardSpace = ({ cardsIn, roundRole, roundState, QCard, playerChoice, dropHandler, winningCards }: DropCardSpaceProps) => {
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			canDrop: () => true,
			drop: (item: DraggedCard) => {
				if (dropHandler) {
					dropHandler(item);
				}
				return { dropEffect: 'copy' };
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			})
		}),
		[dropHandler]);
	let status = (cardsIn > 0 && roundState !== VIEWING_WINNER) ? `${cardsIn} Cards In` : undefined;

	// Determine which cards to display
	const getCardsToDisplay = (): CardProps[] => {
		if (roundState === VIEWING_WINNER && winningCards && winningCards.length > 0) {
			return winningCards;
		} else if (playerChoice) {
			return [playerChoice];
		} else {
			return [{ cardType: PLACEHOLDER } as CardProps];
		}
	};

	// draggable
	if ((roundRole === PLAYER && roundState === PLAYER_SELECTING) ||
		(roundRole === JUDGE && roundState === JUDGE_SELECTING) ||
		(roundState === VIEWING_WINNER)) {
		const cardsToDisplay = getCardsToDisplay();

		return (
			<div className="drop-space">
				<Card {...QCard} status={roundState !== JUDGE_SELECTING ? status : undefined} />
				<div
					ref={drop}
					style={{
						display: 'flex',
						gap: '10px',
						flexWrap: 'wrap',
						justifyContent: 'center'
					}}
				>
					{cardsToDisplay.map((card, index) => (
						<Card
							key={card.id ?? `card-${index}`}
							{...card}
							index={index}
						/>
					))}
				</div>
			</div>
		);
	}
	// not draggable
	else if ((roundRole === PLAYER && roundState === JUDGE_SELECTING) ||
		(roundRole === PLAYER && roundState === PLAYER_WAITING) ||
		(roundRole === JUDGE && roundState === JUDGE_WAITING)) {
		return (
			<div className="drop-space">
				<Card {...QCard} status={roundState !== JUDGE_SELECTING ? status : undefined} />
			</div>
		);
	}
	// unknown combo of roundStand and roundRole
	else {
		return (`invalid combination of roundState(${roundState}) and roundRole(${roundRole})`);
	}
};

export default DropCardSpace;
