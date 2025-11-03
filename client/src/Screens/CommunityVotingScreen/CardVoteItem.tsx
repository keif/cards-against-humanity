import React from 'react';
import { PendingCard, VoteType, UserVote } from '@/types';
import './CommunityVotingScreen.css';

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
		<div className="card-vote-item">
			<div className={`card-display ${card.cardType}`}>
				<div className="card-type-badge">{card.cardType === 'Q' ? 'Question' : 'Answer'}</div>
				<p className="card-text">{card.text}</p>
			</div>

			<div className="vote-section">
				<div className="vote-stats">
					<span className="vote-stat upvotes">
						👍 {card.votes?.upvotes || 0}
					</span>
					<span className="vote-stat downvotes">
						👎 {card.votes?.downvotes || 0}
					</span>
					<span className="vote-stat net-score">
						Net: {card.votes?.netScore || 0}
					</span>
					{(card.votes?.duplicateFlags || 0) > 0 && (
						<span className="vote-stat duplicate-flags">
							⚠️ {card.votes?.duplicateFlags}
						</span>
					)}
				</div>

				<div className="vote-buttons">
					<button
						className={`vote-btn upvote ${isUpvoted ? 'active' : ''}`}
						onClick={() => handleVoteClick('up')}
						disabled={isVoting}
						title="Upvote this card"
					>
						👍 Good
					</button>
					<button
						className={`vote-btn downvote ${isDownvoted ? 'active' : ''}`}
						onClick={() => handleVoteClick('down')}
						disabled={isVoting}
						title="Downvote this card"
					>
						👎 Bad
					</button>
					<button
						className={`vote-btn duplicate ${isDuplicateFlagged ? 'active' : ''}`}
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
