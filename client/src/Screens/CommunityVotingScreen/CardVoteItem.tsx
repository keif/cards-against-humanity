import React from 'react';
import { PendingCard, VoteType, UserVote } from '@/types';

interface CardVoteItemProps {
	card: PendingCard;
	userVote: UserVote | null;
	onVote: (cardId: number, voteType: VoteType) => void;
	onRemoveVote: (cardId: number) => void;
	isVoting: boolean;
}

const CardVoteItem: React.FC<CardVoteItemProps> = ({
	card,
	userVote,
	onVote,
	onRemoveVote,
	isVoting
}) => {
	const handleVoteClick = (voteType: VoteType) => {
		if (isVoting) return;

		// If user already voted with this type, remove the vote
		if (userVote?.voted && userVote.voteType === voteType) {
			onRemoveVote(card.id);
		} else {
			// Otherwise, cast or change the vote
			onVote(card.id, voteType);
		}
	};

	const isUpvoted = userVote?.voted && userVote.voteType === 'up';
	const isDownvoted = userVote?.voted && userVote.voteType === 'down';
	const isDuplicateFlagged = userVote?.voted && userVote.voteType === 'duplicate';

	return (
		<div className="bg-white border-2 border-gray-300 rounded-xl p-6 flex gap-8 items-stretch transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] md:flex-col">
			<div className={`flex-1 min-h-[150px] p-6 rounded-lg flex flex-col gap-4 relative ${
				card.cardType === 'Q'
					? 'bg-black text-white'
					: 'bg-white text-black border-2 border-black'
			}`}>
				<div className={`absolute top-2 right-2 px-3 py-1 rounded-xl text-xs font-bold ${
					card.cardType === 'Q'
						? 'bg-white/20 text-white'
						: 'bg-black/10 text-black'
				}`}>
					{card.cardType === 'Q' ? 'Question' : 'Answer'}
				</div>
				<p className="text-lg leading-relaxed m-0">{card.text}</p>
			</div>

			<div className="flex flex-col gap-4 min-w-[250px] md:min-w-full">
				<div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
					<span className="inline-flex items-center gap-1 text-[0.95rem] font-semibold px-2 py-1 rounded bg-white text-green-600">
						👍 {card.votes?.upvotes || 0}
					</span>
					<span className="inline-flex items-center gap-1 text-[0.95rem] font-semibold px-2 py-1 rounded bg-white text-[#f44336]">
						👎 {card.votes?.downvotes || 0}
					</span>
					<span className="inline-flex items-center gap-1 text-[0.95rem] font-semibold px-2 py-1 rounded bg-white text-[#2196F3]">
						Net: {card.votes?.netScore || 0}
					</span>
					{(card.votes?.duplicateFlags || 0) > 0 && (
						<span className="inline-flex items-center gap-1 text-[0.95rem] font-semibold px-2 py-1 rounded bg-white text-[#FF9800]">
							⚠️ {card.votes?.duplicateFlags}
						</span>
					)}
				</div>

				<div className="flex flex-col gap-2 md:flex-row">
					<button
						className={`px-4 py-3 text-base font-bold border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 ${
							isUpvoted
								? 'bg-green-600 text-white border-green-600'
								: 'bg-white border-gray-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
						} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
						onClick={() => handleVoteClick('up')}
						disabled={isVoting}
						title="Upvote this card"
					>
						👍 Good
					</button>
					<button
						className={`px-4 py-3 text-base font-bold border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 ${
							isDownvoted
								? 'bg-[#f44336] text-white border-[#f44336]'
								: 'bg-white border-gray-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
						} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
						onClick={() => handleVoteClick('down')}
						disabled={isVoting}
						title="Downvote this card"
					>
						👎 Bad
					</button>
					<button
						className={`px-4 py-3 text-base font-bold border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center gap-2 ${
							isDuplicateFlagged
								? 'bg-[#FF9800] text-white border-[#FF9800]'
								: 'bg-white border-gray-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
						} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
						onClick={() => handleVoteClick('duplicate')}
						disabled={isVoting}
						title="Flag as duplicate"
					>
						⚠️ Duplicate
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardVoteItem;
