import React, { useState, useEffect, useCallback } from 'react';
import {
	promoteToModerator,
	getModeratorStats,
	getCommunityCards,
	batchApproveCards,
	batchRejectCards,
	onCardModerated,
	offCardModerated,
	onVoteUpdated,
	offVoteUpdated
} from '@/api';
import {
	ModeratorStats,
	PendingCard,
	RejectionReason,
	VoteStats
} from '@/types';
import ModeratorStatsDisplay from './ModeratorStatsDisplay';
import PendingCardsList from './PendingCardsList';

const ModeratorDashboard: React.FC = () => {
	// Authentication state
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [adminKey, setAdminKey] = useState('');
	const [authError, setAuthError] = useState<string | null>(null);
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	// Dashboard state
	const [stats, setStats] = useState<ModeratorStats | null>(null);
	const [cards, setCards] = useState<PendingCard[]>([]);
	const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	// Batch operation state
	const [isBatchProcessing, setIsBatchProcessing] = useState(false);

	// Fetch stats
	const fetchStats = useCallback(async () => {
		try {
			const statsData = await getModeratorStats();
			setStats(statsData);
		} catch (err) {
			console.error('Failed to fetch stats:', err);
			// If stats fetch fails, might not be authenticated
			if (err instanceof Error && err.message.includes('Authentication')) {
				setIsAuthenticated(false);
			}
		}
	}, []);

	// Fetch pending cards
	const fetchPendingCards = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await getCommunityCards({
				type: 'all',
				sort: 'newest',
				limit: 100 // Get more cards for moderation
			});
			setCards(response.cards);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load cards');
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Handle authentication
	const handleAuthenticate = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsAuthenticating(true);
		setAuthError(null);

		try {
			// Initialize session first to ensure cookies are set
			const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:8080';
			await fetch(`${SERVER_URL}/session`, {
				credentials: 'include',
				headers: {
					'Accept': 'application/json'
				}
			});

			// Now attempt to promote to moderator
			await promoteToModerator(adminKey);
			setAdminKey(''); // Clear the key from state

			// Fetch data after successful authentication, THEN set authenticated
			await Promise.all([fetchStats(), fetchPendingCards()]);
			setIsAuthenticated(true);
		} catch (err) {
			setAuthError(err instanceof Error ? err.message : 'Authentication failed');
		} finally {
			setIsAuthenticating(false);
		}
	};

	// Toggle card selection
	const toggleCardSelection = (cardId: number) => {
		setSelectedCards(prev => {
			const newSet = new Set(prev);
			if (newSet.has(cardId)) {
				newSet.delete(cardId);
			} else {
				newSet.add(cardId);
			}
			return newSet;
		});
	};

	// Select all cards
	const selectAllCards = () => {
		setSelectedCards(new Set(cards.map(card => card.id)));
	};

	// Clear selection
	const clearSelection = () => {
		setSelectedCards(new Set());
	};

	// Handle batch approve
	const handleBatchApprove = async () => {
		if (selectedCards.size === 0) return;

		setIsBatchProcessing(true);
		setError(null);

		try {
			const result = await batchApproveCards(Array.from(selectedCards));

			setSuccessMessage(`Successfully approved ${result.processed} card(s)`);
			setTimeout(() => setSuccessMessage(null), 3000);

			// Refresh data
			await Promise.all([fetchStats(), fetchPendingCards()]);
			clearSelection();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to approve cards');
			setTimeout(() => setError(null), 5000);
		} finally {
			setIsBatchProcessing(false);
		}
	};

	// Handle batch reject
	const handleBatchReject = async (reason: RejectionReason, customReason?: string) => {
		if (selectedCards.size === 0) return;

		setIsBatchProcessing(true);
		setError(null);

		try {
			const result = await batchRejectCards(Array.from(selectedCards), reason, customReason);

			setSuccessMessage(`Successfully rejected ${result.processed} card(s)`);
			setTimeout(() => setSuccessMessage(null), 3000);

			// Refresh data
			await Promise.all([fetchStats(), fetchPendingCards()]);
			clearSelection();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to reject cards');
			setTimeout(() => setError(null), 5000);
		} finally {
			setIsBatchProcessing(false);
		}
	};

	// Subscribe to real-time updates
	useEffect(() => {
		if (!isAuthenticated) return;

		const handleCardModerated = () => {
			// Refresh data when a card is moderated
			fetchStats();
			fetchPendingCards();
		};

		const handleVoteUpdate = (data: { cardId: number; votes: VoteStats }) => {
			// Update vote counts in real-time
			setCards(prev => prev.map(card =>
				card.id === data.cardId
					? { ...card, votes: data.votes }
					: card
			));
		};

		onCardModerated(handleCardModerated);
		onVoteUpdated(handleVoteUpdate);

		return () => {
			offCardModerated();
			offVoteUpdated();
		};
	}, [isAuthenticated, fetchStats, fetchPendingCards]);

	// Authentication screen
	if (!isAuthenticated) {
		return (
			<div className="max-w-[1400px] mx-auto p-8 min-h-screen bg-gray-100">
				<div className="flex justify-center items-center min-h-screen">
					<div className="bg-white border-2 border-gray-300 rounded-xl p-12 max-w-[500px] w-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
						<h1 className="text-3xl mb-2 text-black text-center">Moderator Access</h1>
						<p className="text-center text-gray-600 mb-8">Enter the admin key to access the moderator dashboard</p>

						{authError && (
							<div className="bg-[#f44336] text-white p-4 rounded-lg mb-4 text-center font-bold animate-[slideIn_0.3s_ease]">
								{authError}
							</div>
						)}

						<form onSubmit={handleAuthenticate}>
							<div className="mb-6">
								<label htmlFor="admin-key" className="block font-bold mb-2 text-gray-800">Admin Key:</label>
								<input
									id="admin-key"
									type="password"
									value={adminKey}
									onChange={(e) => setAdminKey(e.target.value)}
									placeholder="Enter admin key"
									disabled={isAuthenticating}
									autoFocus
									className="w-full px-3 py-3 text-base border-2 border-gray-300 rounded-lg transition-colors focus:outline-none focus:border-black"
								/>
							</div>

							<button
								type="submit"
								className="w-full px-4 py-4 text-lg font-bold bg-black text-white border-none rounded-lg cursor-pointer transition-all hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
								disabled={isAuthenticating || !adminKey.trim()}
							>
								{isAuthenticating ? 'Authenticating...' : 'Access Dashboard'}
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}

	// Main dashboard
	return (
		<div className="max-w-[1400px] mx-auto p-8 min-h-screen bg-gray-100 md:p-4">
			<header className="text-center mb-8 bg-white p-8 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
				<h1 className="text-4xl mb-2 text-black md:text-[1.8rem]">Moderator Dashboard</h1>
				<p className="text-lg text-gray-600">Manage community-submitted cards</p>
			</header>

			{error && (
				<div className="bg-[#f44336] text-white p-4 rounded-lg mb-4 text-center font-bold animate-[slideIn_0.3s_ease]">
					{error}
				</div>
			)}

			{successMessage && (
				<div className="bg-green-600 text-white p-4 rounded-lg mb-4 text-center font-bold animate-[slideIn_0.3s_ease]">
					{successMessage}
				</div>
			)}

			<ModeratorStatsDisplay stats={stats} />

			<div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
				<div className="flex justify-between items-center mb-6 flex-wrap gap-4 md:flex-col md:items-start">
					<h2 className="text-[1.8rem] text-black">Pending Cards ({cards.length})</h2>
					<div className="flex gap-3 items-center">
						{selectedCards.size > 0 && (
							<>
								<span className="font-bold text-[#2196F3] px-4 py-2 bg-[#E3F2FD] rounded-md">
									{selectedCards.size} selected
								</span>
								<button
									className="px-4 py-2 text-[0.95rem] font-bold bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-md cursor-pointer transition-all hover:bg-gray-200 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
									onClick={clearSelection}
									disabled={isBatchProcessing}
								>
									Clear
								</button>
							</>
						)}
						{cards.length > 0 && (
							<button
								className="px-4 py-2 text-[0.95rem] font-bold bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-md cursor-pointer transition-all hover:bg-gray-200 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
								onClick={selectAllCards}
								disabled={isBatchProcessing}
							>
								Select All
							</button>
						)}
					</div>
				</div>

				{isLoading ? (
					<div className="text-center py-12 text-xl text-gray-600">Loading pending cards...</div>
				) : cards.length === 0 ? (
					<div className="text-center py-12 text-xl text-gray-600">
						<p className="my-2">No pending cards to review!</p>
						<p className="my-2">All caught up!</p>
					</div>
				) : (
					<PendingCardsList
						cards={cards}
						selectedCards={selectedCards}
						onToggleSelection={toggleCardSelection}
						onBatchApprove={handleBatchApprove}
						onBatchReject={handleBatchReject}
						isBatchProcessing={isBatchProcessing}
					/>
				)}
			</div>
		</div>
	);
};

export default ModeratorDashboard;
