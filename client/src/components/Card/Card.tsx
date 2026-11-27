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

// Card print number shown in the footer ("Nº 0412"), per DESIGN.md.
const printNumber = (id?: number) => (id === undefined ? '' : `Nº ${String(id).padStart(4, '0')}`);

/**
 * Tailwind text-size classes for an answer card, based on how long its text is.
 * DESIGN.md: card copy never truncates. Base size is 20px (17px under 380px wide),
 * stepping down for long answers so they fit a 128x154 card.
 * Deck lengths: median 21 chars, p90 54, p95 69, p99 94, max 129.
 */
export const answerTextSize = (text?: string): string => {
	// TODO: step down the size for long answers (e.g. past ~55 and ~90 chars).
	void text;
	return 'text-[20px] leading-[1.18] max-[380px]:text-[17px] max-[380px]:leading-[1.15]';
};

const CardFoot =({ id, label = 'PC' }: { id?: number; label?: string }) => (
	<span className="flex justify-between items-baseline font-mono font-bold text-[11px] max-[380px]:text-[10px] tracking-[0.06em] opacity-70" aria-hidden="true">
		<span>{label}</span>
		<span>{printNumber(id)}</span>
	</span>
);

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
			<div data-qa="card" className="relative inline-block">
				{numAnswers && numAnswers > 1 && (
					<div className="absolute -top-2.5 -right-2 bg-ink text-riso-yellow px-2 py-1 rounded-sm font-mono text-xs font-bold z-[3]">
						PICK {numAnswers}
					</div>
				)}
				<div className={`w-[200px] h-[275px] max-[380px]:w-[144px] max-[380px]:h-[198px] card-text text-[20px] leading-[1.18] max-[380px]:text-[17px] max-[380px]:leading-[1.15] rounded-lg p-4 max-[380px]:p-[11px] break-words relative z-[1] select-none bg-pink text-ink shadow-card flex flex-col justify-between ${className}`}>
					<p className="m-0" dangerouslySetInnerHTML={{ __html: formattedText }} />
					<CardFoot id={id} label="PHUCKING CARDS" />
				</div>
				{
					status &&
					<div className={`bg-paper text-ink rounded-b-lg -mt-2 pt-2 h-[38px] max-[380px]:w-[136px] w-[188px] mx-auto text-center font-mono font-bold text-sm max-[380px]:text-xs leading-[30px] z-0 relative ${className}`}>
						<span>{status}</span>
					</div>
				}
			</div>
		);
	} else if (cardType === TITLE) {
		return (
			<div className={`w-60 h-[330px] max-[380px]:w-48 max-[380px]:h-[264px] rounded-lg p-5 relative z-[1] select-none bg-pink text-ink flex flex-col justify-between mx-auto mt-6 -rotate-3 shadow-[-6px_5px_0_rgba(0,120,191,0.55)] ${className}`}>
				<h3 className="m-0 font-display-tight text-[44px] max-[380px]:text-[36px] leading-[0.95]">{SITE_NAME}</h3>
				<CardFoot label="PHUCKING CARDS" />
			</div>
		);
	} else if (cardType === PLACEHOLDER) {
		return (
			<div className={`w-40 h-[220px] max-[380px]:w-28 max-[380px]:h-[154px] card-text text-[20px] max-[380px]:text-[15px] rounded-lg p-3 break-words relative z-[1] select-none bg-transparent border-[3px] border-dashed border-muted text-muted flex items-center justify-center text-center leading-none ${className}`}>
				Drop Card Here
			</div>
		);
	} else if (cardType === LINK && link) {
		// Extract party code from URL (last segment)
		const partyCode = window.location.pathname.split('/').filter(Boolean).pop() || '';

		return (
			<div className={`w-60 h-[330px] max-[380px]:w-48 max-[380px]:h-[264px] rounded-lg p-5 relative z-[1] select-none bg-paper text-ink flex flex-col mx-auto mt-6 -rotate-2 shadow-card ${className}`}>
				<h3 className="m-0 card-text text-[26px] max-[380px]:text-[21px] leading-[1.1]">Invite friends with this party code:</h3>
				<button
					type="button"
					className={`mt-auto mb-2 min-h-[48px] flex items-center gap-2 justify-center font-mono font-bold ${partyCode.length > 8 ? 'text-[18px] max-[380px]:text-[15px] tracking-[0.06em]' : 'text-[28px] max-[380px]:text-[22px] tracking-[0.14em]'} bg-table text-paper rounded-lg px-3 py-2 border-0 cursor-pointer`}
					onClick={handleCopyLink}
					title="Click to copy invite link"
					aria-label={`Copy invite link for party ${partyCode}`}
				>
					{/* Codes can be up to 20 chars (server limit): long ones shrink and wrap instead of overflowing. */}
					<span className="min-w-0 break-all">{partyCode}</span>
					{copied ? (
						<svg className="shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3DDC84" strokeWidth="3" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					) : (
						<svg className="shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					)}
				</button>
				<p className="m-0 text-sm font-bold text-center text-ink-muted min-h-[20px]" aria-live="polite">
					{copied ? 'Link copied. Paste it in the group chat.' : 'Tap the code to copy the invite link.'}
				</p>
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
				className={`w-44 h-[220px] max-[380px]:w-32 max-[380px]:h-[154px] card-text ${answerTextSize(text)} rounded-lg p-3 max-[380px]:p-2.5 break-words relative z-[1] select-none bg-paper text-ink shadow-card flex flex-col justify-between transition-transform duration-[180ms] ease-out-expo ${isSelected ? 'outline outline-[3px] outline-pink outline-offset-[3px] -translate-y-3.5' : ''} ${className}`}
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
						className="absolute top-1 right-1 w-8 h-8 bg-error text-ink rounded-full flex items-center justify-center text-base font-bold cursor-pointer border-0 z-10"
						title="Discard this card (Never Have I Ever)"
						aria-label="Discard card"
					>
						×
					</button>
				)}
				<p className="m-0" dangerouslySetInnerHTML={{ __html: text || '' }} />
				<CardFoot id={id} />
			</div>
		);
	}
}

export default Card;
