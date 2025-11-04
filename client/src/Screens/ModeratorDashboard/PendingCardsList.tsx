import React, { useState } from 'react';
import { PendingCard, RejectionReason } from '@/types';
import './ModeratorDashboard.css';

interface PendingCardsListProps {
	cards: PendingCard[];
	selectedCards: Set<number>;
	onToggleSelection: (cardId: number) => void;
	onBatchApprove: () => void;
	onBatchReject: (reason: RejectionReason, customReason?: string) => void;
	isBatchProcessing: boolean;
}

const PendingCardsList: React.FC<PendingCardsListProps> = ({
	cards,
	selectedCards,
	onToggleSelection,
	onBatchApprove,
	onBatchReject,
	isBatchProcessing
}) => {
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [rejectionReason, setRejectionReason] = useState<RejectionReason>('low-quality');
	const [customReason, setCustomReason] = useState('');

	const handleRejectClick = () => {
		if (selectedCards.size === 0) return;
		setShowRejectModal(true);
	};

	const handleConfirmReject = () => {
		const finalCustomReason = rejectionReason === 'other' ? customReason : undefined;
		onBatchReject(rejectionReason, finalCustomReason);
		setShowRejectModal(false);
		setCustomReason('');
		setRejectionReason('low-quality');
	};

	const handleCancelReject = () => {
		setShowRejectModal(false);
		setCustomReason('');
		setRejectionReason('low-quality');
	};

	return (
		<>
			<div className="batch-action-bar">
				<button
					className="btn-approve"
					onClick={onBatchApprove}
					disabled={selectedCards.size === 0 || isBatchProcessing}
				>
					{isBatchProcessing ? 'Processing...' : `Approve Selected (${selectedCards.size})`}
				</button>
				<button
					className="btn-reject"
					onClick={handleRejectClick}
					disabled={selectedCards.size === 0 || isBatchProcessing}
				>
					Reject Selected ({selectedCards.size})
				</button>
			</div>

			<div className="cards-grid">
				{cards.map(card => {
					const isSelected = selectedCards.has(card.id);
					const isDuplicate = (card.votes?.duplicateFlags || 0) > 0;

					return (
						<div
							key={card.id}
							className={`moderator-card ${isSelected ? 'selected' : ''} ${isDuplicate ? 'duplicate-flagged' : ''}`}
							onClick={() => onToggleSelection(card.id)}
						>
							<div className="card-checkbox">
								<input
									type="checkbox"
									checked={isSelected}
									onChange={() => onToggleSelection(card.id)}
									onClick={(e) => e.stopPropagation()}
								/>
							</div>

							<div className={`card-display ${card.cardType}`}>
								<div className="card-type-badge">
									{card.cardType === 'Q' ? 'Question' : 'Answer'}
								</div>
								<p className="card-text">{card.text}</p>
							</div>

							<div className="card-metadata">
								<div className="card-votes">
									<span className="vote-stat upvotes">
										👍 {card.votes?.upvotes || 0}
									</span>
									<span className="vote-stat downvotes">
										👎 {card.votes?.downvotes || 0}
									</span>
									<span className="vote-stat net-score">
										Net: {card.votes?.netScore || 0}
									</span>
								</div>

								{isDuplicate && (
									<div className="duplicate-warning">
										⚠️ {card.votes?.duplicateFlags} duplicate flag(s)
									</div>
								)}

								<div className="card-date">
									Submitted: {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'Unknown'}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{showRejectModal && (
				<div className="modal-overlay" onClick={handleCancelReject}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h2>Reject Cards</h2>
						<p>Select a reason for rejecting {selectedCards.size} card(s):</p>

						<div className="form-group">
							<label>
								<input
									type="radio"
									value="inappropriate"
									checked={rejectionReason === 'inappropriate'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
								/>
								Inappropriate Content
							</label>

							<label>
								<input
									type="radio"
									value="duplicate"
									checked={rejectionReason === 'duplicate'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
								/>
								Duplicate Card
							</label>

							<label>
								<input
									type="radio"
									value="low-quality"
									checked={rejectionReason === 'low-quality'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
								/>
								Low Quality
							</label>

							<label>
								<input
									type="radio"
									value="other"
									checked={rejectionReason === 'other'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
								/>
								Other
							</label>

							{rejectionReason === 'other' && (
								<div className="custom-reason-input">
									<label htmlFor="custom-reason">Custom Reason:</label>
									<textarea
										id="custom-reason"
										value={customReason}
										onChange={(e) => setCustomReason(e.target.value)}
										placeholder="Enter reason for rejection..."
										rows={3}
									/>
								</div>
							)}
						</div>

						<div className="modal-actions">
							<button
								className="btn-cancel"
								onClick={handleCancelReject}
								disabled={isBatchProcessing}
							>
								Cancel
							</button>
							<button
								className="btn-confirm-reject"
								onClick={handleConfirmReject}
								disabled={isBatchProcessing || (rejectionReason === 'other' && !customReason.trim())}
							>
								{isBatchProcessing ? 'Processing...' : 'Confirm Reject'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PendingCardsList;
