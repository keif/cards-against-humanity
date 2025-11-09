import { JUDGE, JUDGE_SELECTING, JUDGE_WAITING, PLAYER, PLAYER_SELECTING, PLAYER_WAITING, VIEWING_WINNER } from '@/constants/constants';
import { ItemTypes, DraggedCard } from "@/types";
import { useDrop } from "react-dnd";
import Card, { CardProps, PLACEHOLDER } from "../Card/Card";

// Draggable player IFF
// player-selecting & player  (show status)
// judge-selecting % judge    (don't show status)

// --> Draggable
// Not Draggable IFF
// player-waiting & player    (show status)
// judge-selecting & player   (don't show status)
// judge-waiting & judge    (show status)

// Helper function to calculate fan position styles
const getFanStyle = (index: number, total: number, isMobile: boolean = false): React.CSSProperties => {
	// Fan configurations for different card counts [translateX, rotate]
	const desktopConfigs: Record<number, Array<[number, number]>> = {
		2: [[-100, -12], [100, 12]],
		3: [[-150, -15], [0, 0], [150, 15]],
		4: [[-200, -18], [-70, -8], [70, 8], [200, 18]]
	};

	const mobileConfigs: Record<number, Array<[number, number]>> = {
		2: [[-70, -10], [70, 10]],
		3: [[-100, -12], [0, 0], [100, 12]],
		4: [[-130, -15], [-50, -6], [50, 6], [130, 15]]
	};

	const configs = isMobile ? mobileConfigs : desktopConfigs;
	const config = configs[total];

	if (!config || index >= config.length) {
		return {};
	}

	const [translateX, rotate] = config[index];
	const zIndex = total === 3 && index === 1 ? 2 : (total === 4 && (index === 1 || index === 2) ? 2 : 1);

	return {
		transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
		zIndex
	};
};

interface DropCardSpaceProps {
	cardsIn: number;
	dropHandler: (card: DraggedCard) => void;
	roundRole: string;
	roundState: string;
	QCard: CardProps;
	playerChoice: CardProps | null;
	winningCards?: CardProps[] | null;
	droppedCards?: CardProps[];
}

const DropCardSpace = ({ cardsIn, roundRole, roundState, QCard, playerChoice, dropHandler, winningCards, droppedCards = [] }: DropCardSpaceProps) => {
	// Detect mobile viewport
	const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

	const [, drop] = useDrop(
		() => ({
			accept: ItemTypes.CARD,
			canDrop: () => true,
			drop: (item: DraggedCard) => {
				if (dropHandler) {
					dropHandler(item);
				}
				return { dropEffect: 'copy' };
			}
		}),
		[dropHandler]);
	const status = (cardsIn > 0 && roundState !== VIEWING_WINNER) ? `${cardsIn} Cards In` : undefined;

	// Determine which cards to display
	const getCardsToDisplay = (): CardProps[] => {
		if (roundState === VIEWING_WINNER && winningCards && winningCards.length > 0) {
			return winningCards;
		} else if (roundState === PLAYER_SELECTING && droppedCards.length > 0) {
			return droppedCards;
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

		// Check if we should show fanning effect (player selecting with dropped cards)
		const shouldFan = roundState === PLAYER_SELECTING && roundRole === PLAYER && droppedCards.length > 1;

		return (
			<div className="flex w-full flex-nowrap overflow-hidden pl-[5%] pr-[5%] pt-[5%] gap-8">
				<div className="flex-shrink-0">
					<Card {...QCard} status={roundState !== JUDGE_SELECTING ? status : undefined} />
				</div>
				<div
					ref={drop}
					className={shouldFan ? `relative flex justify-center items-center ${isMobile ? 'min-h-[200px]' : 'min-h-[280px]'} flex-1` : "flex gap-2.5 flex-wrap justify-center flex-1"}
				>
					{cardsToDisplay.map((card, index) => {
						const fanStyle = shouldFan ? getFanStyle(index, cardsToDisplay.length, isMobile) : {};
						return (
							<Card
								key={card.id ?? `card-${index}`}
								{...card}
								index={index}
								className={shouldFan ? "absolute transition-all duration-300 ease-in-out cursor-grab hover:!translate-y-[-20px] hover:!scale-105 hover:!z-10 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]" : ""}
								style={fanStyle}
							/>
						);
					})}
				</div>
			</div>
		);
	}
	// not draggable
	else if ((roundRole === PLAYER && roundState === JUDGE_SELECTING) ||
		(roundRole === PLAYER && roundState === PLAYER_WAITING) ||
		(roundRole === JUDGE && roundState === JUDGE_WAITING)) {
		return (
			<div className="flex w-full justify-around flex-nowrap overflow-hidden pl-[1%] pr-[1%] pt-[5%]">
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
