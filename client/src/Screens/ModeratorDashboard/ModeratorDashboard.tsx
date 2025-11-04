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
import './ModeratorDashboard.css';

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
			<div className="moderator-dashboard">
				<div className="auth-screen">
					<div className="auth-card">
						<h1>Moderator Access</h1>
						<p>Enter the admin key to access the moderator dashboard</p>

						{authError && (
							<div className="error-banner">
								{authError}
							</div>
						)}

						<form onSubmit={handleAuthenticate}>
							<div className="form-group">
								<label htmlFor="admin-key">Admin Key:</label>
								<input
									id="admin-key"
									type="password"
									value={adminKey}
									onChange={(e) => setAdminKey(e.target.value)}
									placeholder="Enter admin key"
									disabled={isAuthenticating}
									autoFocus
								/>
							</div>

							<button
								type="submit"
								className="auth-button"
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
		<div className="moderator-dashboard">
			<header className="dashboard-header">
				<h1>Moderator Dashboard</h1>
				<p>Manage community-submitted cards</p>
			</header>

			{error && (
				<div className="error-banner">
					{error}
				</div>
			)}

			{successMessage && (
				<div className="success-banner">
					{successMessage}
				</div>
			)}

			<ModeratorStatsDisplay stats={stats} />

			<div className="dashboard-content">
				<div className="content-header">
					<h2>Pending Cards ({cards.length})</h2>
					<div className="batch-actions">
						{selectedCards.size > 0 && (
							<>
								<span className="selection-count">
									{selectedCards.size} selected
								</span>
								<button
									className="btn-select-action"
									onClick={clearSelection}
									disabled={isBatchProcessing}
								>
									Clear
								</button>
							</>
						)}
						{cards.length > 0 && (
							<button
								className="btn-select-action"
								onClick={selectAllCards}
								disabled={isBatchProcessing}
							>
								Select All
							</button>
						)}
					</div>
				</div>

				{isLoading ? (
					<div className="loading">Loading pending cards...</div>
				) : cards.length === 0 ? (
					<div className="no-cards">
						<p>No pending cards to review!</p>
						<p>All caught up!</p>
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
