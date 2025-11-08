// external imports
import { useState } from "react";
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
	disableDrag?: boolean;
	expansion?: string;
	id?: number;
	index?: number;
	isSelected?: boolean;
	link?: string;
	numAnswers?: number;
	onClick?: (id: number) => void;
	onDiscard?: (id: number) => void;
	owner?: {
		name: string;
		pID: number;
	}
	status?: string;
	style?: React.CSSProperties;
	text?: string;
}

const Card = ({ cardType, className, disableDrag, id, isSelected, link, numAnswers, onClick, onDiscard, status, style, text }: CardProps) => {
	const [copied, setCopied] = useState(false);

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	if (cardType === "Q" && text) {
		const formattedText = text.replaceAll("_", "__________");
		return (
			<div data-qa="card">
				<div className={`w-40 h-[220px] max-[380px]:w-28 max-[380px]:h-[154px] font-['Helvetica_Neue'] text-[22px] max-[380px]:text-[17px] font-bold rounded-lg border border-[#979797] p-3 cursor-pointer break-words relative z-[1] select-none bg-black text-[#F7F7F7] ${className}`}>
					{numAnswers && numAnswers > 1 && (
						<div className="absolute top-2.5 right-2.5 max-[380px]:top-2 max-[380px]:right-2 bg-[#FF9800] text-white px-2 py-1 max-[380px]:px-1.5 max-[380px]:py-0.5 rounded text-sm max-[380px]:text-xs font-bold z-[2]">
							Pick {numAnswers}
						</div>
					)}
					<p dangerouslySetInnerHTML={{ __html: formattedText }} />
				</div>
				{
					status &&
					<div className={`bg-white rounded-b-lg -mt-[11px] h-[35px] max-[380px]:w-28 max-[380px]:text-[15px] leading-[45px] text-center border border-[#979797] z-0 relative w-[98%] mx-auto ${className}`}>
						<span>{status}</span>
					</div>
				}
			</div>
		);
	} else if (cardType === TITLE) {
		return (
			<div className={`w-60 h-[330px] font-['Helvetica_Neue'] text-[26px] font-bold rounded-lg border-0 p-3 cursor-pointer break-words relative z-[1] select-none bg-black text-[#F7F7F7] flex flex-col mx-auto mt-5 leading-[0.2] opacity-50 pl-[25px] pt-10 shadow-[-20px_8px_2px_0px_rgba(0,0,0,0.5)] ${className}`}>
				<h3 className="mt-0 leading-tight">{SITE_NAME}</h3>
			</div>
		);
	} else if (cardType === PLACEHOLDER) {
		return (
			<div className={`w-40 h-[220px] max-[380px]:w-28 max-[380px]:h-[154px] font-['Helvetica_Neue'] text-[22px] max-[380px]:text-[17px] font-bold rounded-lg p-3 cursor-pointer break-words relative z-[1] select-none bg-transparent border-[3px] border-dashed border-[#6F6F6F] text-[#6F6F6F] flex items-center text-center leading-none ${className}`}>
				Drop Card Here
			</div>
		);
	} else if (cardType === LINK && link) {
		// Extract party code from URL (last segment)
		const partyCode = window.location.pathname.split('/').filter(Boolean).pop() || '';

		return (
			<div className={`w-60 h-[330px] font-['Helvetica_Neue'] text-[26px] font-bold rounded-lg border-0 p-3 cursor-pointer break-words relative z-[1] select-none bg-black text-[#F7F7F7] flex flex-col mx-auto mt-5 leading-[0.2] opacity-50 pl-[25px] pt-10 shadow-[-20px_8px_2px_0px_rgba(0,0,0,0.5)] ${className}`}>
				<h3 className="mt-0 leading-tight">Invite friends</h3>
				<h3 className="mt-0 leading-tight">with party code:</h3>
				<h6
					className="leading-none mt-[40%] flex items-center gap-2 justify-center cursor-pointer"
					onClick={handleCopyLink}
					title="Click to copy invite link"
				>
					{partyCode}
					{copied ? (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					) : (
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					)}
				</h6>
				{copied && (
					<p className="text-[#4CAF50] text-sm font-bold text-center mt-2.5">
						Link copied!
					</p>
				)}
			</div>
		)
	} else {
		const [{ isDragging }, drag] = useDrag({
			type: ItemTypes.CARD,
			item: { id: id },
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
			}),
			canDrag: () => !disableDrag,
		});

		const handleClick = () => {
			if (onClick && id !== undefined) {
				onClick(id);
			}
		};

		const handleDiscard = (e: React.MouseEvent) => {
			e.stopPropagation(); // Prevent onClick from firing
			if (onDiscard && id !== undefined) {
				onDiscard(id);
			}
		};

		const cursorStyle = disableDrag ? 'default' : (onClick ? 'pointer' : 'move');
		const opacityValue = isDragging ? 0.5 : 1;

		return (
			<div
				className={`w-40 h-[220px] max-[380px]:w-28 max-[380px]:h-[154px] font-['Helvetica_Neue'] text-[22px] max-[380px]:text-[17px] font-bold rounded-lg border p-3 break-words relative z-[1] select-none bg-[#F7F7F7] text-black border-[#979797] ${isSelected ? 'border-[3px] border-[#2196F3] -translate-y-2.5 shadow-[0_8px_16px_rgba(33,150,243,0.4)] transition-[transform_0.2s_ease,box-shadow_0.2s_ease]' : ''} ${className}`}
				ref={disableDrag ? undefined : drag}
				onClick={handleClick}
				data-qa="card"
				style={{
					cursor: cursorStyle,
					opacity: opacityValue,
					...style
				}}
			>
				{onDiscard && (
					<button
						onClick={handleDiscard}
						className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold cursor-pointer border-0 transition-colors z-10"
						title="Discard this card (Never Have I Ever)"
						aria-label="Discard card"
					>
						×
					</button>
				)}
				<p dangerouslySetInnerHTML={{ __html: text || '' }} />
			</div>
		);
	}
}

export default Card;
