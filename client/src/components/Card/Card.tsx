import "./Card.css";

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
	owner?: {
		name: string;
		pID: number;
	}
	status?: string;
	text?: string;
}

const Card = ({ cardType, className, disableDrag, id, index, isSelected, link, numAnswers, onClick, status, text }: CardProps) => {
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
			<div>
				<div className={`card Q ${className}`}>
					{numAnswers && numAnswers > 1 && (
						<div className="multi-answer-badge">
							Pick {numAnswers}
						</div>
					)}
					<p dangerouslySetInnerHTML={{ __html: formattedText }} />
				</div>
				{
					status &&
					<div className={`status ${className}`}>
						<span>{status}</span>
					</div>
				}
			</div>
		);
	} else if (cardType === TITLE) {
		return (
			<div className={`card Title ${className}`}>
				<h3>{SITE_NAME}</h3>
			</div>
		);
	} else if (cardType === PLACEHOLDER) {
		return (
			<div className={`card placeholder ${className}`}>
				Drop Card Here
			</div>
		);
	} else if (cardType === LINK && link) {
		// Extract party code from URL (last segment)
		const partyCode = window.location.pathname.split('/').filter(Boolean).pop() || '';

		return (
			<div className={`card Title Link ${className}`}>
				<h3>Invite friends</h3>
				<h3>with party code:</h3>
				<h6
					className="link"
					onClick={handleCopyLink}
					style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', cursor: 'pointer' }}
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
					<p style={{ color: '#4CAF50', fontSize: '14px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0 0 0' }}>
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

		const selectedClass = isSelected ? 'selected' : '';

		return (
			<div
				className={`card A ${className} ${selectedClass}`}
				ref={disableDrag ? undefined : drag}
				onClick={handleClick}
				style={{
					cursor: disableDrag ? 'default' : (onClick ? 'pointer' : 'move'),
					opacity: isDragging ? 0.5 : 1,
				}}
			>
				<p dangerouslySetInnerHTML={{ __html: text || '' }} />
			</div>
		);
	}
}

export default Card;
