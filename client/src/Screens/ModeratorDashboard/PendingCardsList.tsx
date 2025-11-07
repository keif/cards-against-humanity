import React, { useState } from 'react';
import { PendingCard, RejectionReason } from '@/types';

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
			<div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg md:flex-col">
				<button
					className="px-6 py-3 text-base font-bold border-none rounded-lg cursor-pointer transition-all bg-green-600 text-white hover:bg-[#45a049] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(76,175,80,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					onClick={onBatchApprove}
					disabled={selectedCards.size === 0 || isBatchProcessing}
				>
					{isBatchProcessing ? 'Processing...' : `Approve Selected (${selectedCards.size})`}
				</button>
				<button
					className="px-6 py-3 text-base font-bold border-none rounded-lg cursor-pointer transition-all bg-[#f44336] text-white hover:bg-[#da190b] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(244,67,54,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
					onClick={handleRejectClick}
					disabled={selectedCards.size === 0 || isBatchProcessing}
				>
					Reject Selected ({selectedCards.size})
				</button>
			</div>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 md:grid-cols-1">
				{cards.map(card => {
					const isSelected = selectedCards.has(card.id);
					const isDuplicate = (card.votes?.duplicateFlags || 0) > 0;

					return (
						<div
							key={card.id}
							className={`bg-white border-2 rounded-xl p-4 cursor-pointer transition-all relative ${
								isSelected
									? 'border-[#2196F3] bg-[#E3F2FD]'
									: isDuplicate
									? 'border-[#FF9800] border-[3px]'
									: 'border-gray-300'
							} hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5`}
							onClick={() => onToggleSelection(card.id)}
						>
							<div className="absolute top-4 left-4 z-10">
								<input
									type="checkbox"
									checked={isSelected}
									onChange={() => onToggleSelection(card.id)}
									onClick={(e) => e.stopPropagation()}
									className="w-5 h-5 cursor-pointer"
								/>
							</div>

							<div className={`min-h-[280px] p-6 rounded-lg flex flex-col gap-4 relative ml-8 w-40 ${
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

							<div className="mt-4 pt-4 border-t border-gray-200">
								<div className="flex flex-wrap gap-2 mb-2">
									<span className="inline-flex items-center gap-1 text-[0.85rem] font-semibold px-2 py-1 rounded bg-gray-50 text-green-600">
										👍 {card.votes?.upvotes || 0}
									</span>
									<span className="inline-flex items-center gap-1 text-[0.85rem] font-semibold px-2 py-1 rounded bg-gray-50 text-[#f44336]">
										👎 {card.votes?.downvotes || 0}
									</span>
									<span className="inline-flex items-center gap-1 text-[0.85rem] font-semibold px-2 py-1 rounded bg-gray-50 text-[#2196F3]">
										Net: {card.votes?.netScore || 0}
									</span>
								</div>

								{isDuplicate && (
									<div className="text-[#FF9800] font-bold text-sm p-2 bg-[#FFF3E0] rounded mb-2">
										⚠️ {card.votes?.duplicateFlags} duplicate flag(s)
									</div>
								)}

								<div className="text-[0.85rem] text-gray-600">
									Submitted: {card.createdAt ? new Date(Number(card.createdAt)).toLocaleDateString() : 'Unknown'}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{showRejectModal && (
				<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center z-[1000] animate-[fadeIn_0.2s_ease]" onClick={handleCancelReject}>
					<div className="bg-white rounded-xl p-8 max-w-[500px] w-[90%] shadow-[0_8px_24px_rgba(0,0,0,0.2)] animate-[slideUp_0.3s_ease] md:w-[95%] md:p-6" onClick={(e) => e.stopPropagation()}>
						<h2 className="mb-4 text-black">Reject Cards</h2>
						<p className="mb-6 text-gray-600">Select a reason for rejecting {selectedCards.size} card(s):</p>

						<div className="flex flex-col gap-3 mb-6">
							<label className="flex items-center gap-2 px-3 py-3 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-600">
								<input
									type="radio"
									value="inappropriate"
									checked={rejectionReason === 'inappropriate'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
									className="w-[18px] h-[18px] cursor-pointer"
								/>
								Inappropriate Content
							</label>

							<label className="flex items-center gap-2 px-3 py-3 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-600">
								<input
									type="radio"
									value="duplicate"
									checked={rejectionReason === 'duplicate'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
									className="w-[18px] h-[18px] cursor-pointer"
								/>
								Duplicate Card
							</label>

							<label className="flex items-center gap-2 px-3 py-3 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-600">
								<input
									type="radio"
									value="low-quality"
									checked={rejectionReason === 'low-quality'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
									className="w-[18px] h-[18px] cursor-pointer"
								/>
								Low Quality
							</label>

							<label className="flex items-center gap-2 px-3 py-3 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-600">
								<input
									type="radio"
									value="other"
									checked={rejectionReason === 'other'}
									onChange={(e) => setRejectionReason(e.target.value as RejectionReason)}
									className="w-[18px] h-[18px] cursor-pointer"
								/>
								Other
							</label>

							{rejectionReason === 'other' && (
								<div className="mt-2 flex flex-col gap-2">
									<label htmlFor="custom-reason" className="font-bold text-gray-800">Custom Reason:</label>
									<textarea
										id="custom-reason"
										value={customReason}
										onChange={(e) => setCustomReason(e.target.value)}
										placeholder="Enter reason for rejection..."
										rows={3}
										className="w-full px-3 py-3 text-base border-2 border-gray-300 rounded-lg resize-y font-inherit focus:outline-none focus:border-black"
									/>
								</div>
							)}
						</div>

						<div className="flex gap-4 justify-end md:flex-col">
							<button
								className="px-6 py-3 text-base font-bold border-none rounded-lg cursor-pointer transition-all bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed md:w-full"
								onClick={handleCancelReject}
								disabled={isBatchProcessing}
							>
								Cancel
							</button>
							<button
								className="px-6 py-3 text-base font-bold border-none rounded-lg cursor-pointer transition-all bg-[#f44336] text-white hover:bg-[#da190b] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(244,67,54,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none md:w-full"
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
