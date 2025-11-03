import React, { useState, useEffect, useCallback } from 'react';
import {
	getCommunityCards,
	castVote,
	removeVote,
	getUserVote,
	onVoteUpdated,
	offVoteUpdated
} from '@/api';
import {
	PendingCard,
	VoteType,
	UserVote,
	SortOption,
	CardTypeFilter,
	VoteStats
} from '@/types';
import CardVoteItem from './CardVoteItem';
import './CommunityVotingScreen.css';

const CommunityVotingScreen: React.FC = () => {
	// State
	const [cards, setCards] = useState<PendingCard[]>([]);
	const [userVotes, setUserVotes] = useState<Map<number, UserVote>>(new Map());
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isVoting, setIsVoting] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(false);

	// Filters and sorting
	const [cardType, setCardType] = useState<CardTypeFilter>('all');
	const [sortBy, setSortBy] = useState<SortOption>('newest');
	const [offset, setOffset] = useState(0);
	const limit = 20;

	// Fetch cards
	const fetchCards = useCallback(async (reset: boolean = false) => {
		try {
			if (reset) {
				setIsLoading(true);
				setOffset(0);
			} else {
				setIsLoadingMore(true);
			}

			const currentOffset = reset ? 0 : offset;

			const response = await getCommunityCards({
				type: cardType,
				sort: sortBy,
				limit,
				offset: currentOffset
			});

			if (reset) {
				setCards(response.cards);
			} else {
				setCards(prev => [...prev, ...response.cards]);
			}

			setHasMore(response.hasMore);

			// Fetch user votes for all cards
			const votes = new Map<number, UserVote>();
			for (const card of response.cards) {
				try {
					const userVote = await getUserVote(card.id);
					votes.set(card.id, userVote);
				} catch (err) {
					// If fetching user vote fails, just skip it
					console.error(`Failed to fetch vote for card ${card.id}:`, err);
				}
			}
			setUserVotes(prev => new Map([...prev, ...votes]));

			if (!reset) {
				setOffset(currentOffset + response.cards.length);
			} else {
				setOffset(response.cards.length);
			}

			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load cards');
		} finally {
			setIsLoading(false);
			setIsLoadingMore(false);
		}
	}, [cardType, sortBy, offset, limit]);

	// Initial load
	useEffect(() => {
		fetchCards(true);
	}, [cardType, sortBy]); // Re-fetch when filters change

	// Subscribe to real-time vote updates
	useEffect(() => {
		const handleVoteUpdate = (data: { cardId: number; votes: VoteStats }) => {
			setCards(prev => prev.map(card =>
				card.id === data.cardId
					? { ...card, votes: data.votes }
					: card
			));
		};

		onVoteUpdated(handleVoteUpdate);

		return () => {
			offVoteUpdated();
		};
	}, []);

	// Handle voting
	const handleVote = async (cardId: number, voteType: VoteType) => {
		setIsVoting(cardId);

		try {
			const updatedVotes = await castVote(cardId, voteType);

			// Update card votes
			setCards(prev => prev.map(card =>
				card.id === cardId
					? { ...card, votes: updatedVotes }
					: card
			));

			// Update user vote
			setUserVotes(prev => new Map(prev).set(cardId, { voted: true, voteType }));
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to cast vote');
			setTimeout(() => setError(null), 3000);
		} finally {
			setIsVoting(null);
		}
	};

	// Handle removing vote
	const handleRemoveVote = async (cardId: number) => {
		setIsVoting(cardId);

		try {
			const updatedVotes = await removeVote(cardId);

			// Update card votes
			setCards(prev => prev.map(card =>
				card.id === cardId
					? { ...card, votes: updatedVotes }
					: card
			));

			// Update user vote
			setUserVotes(prev => {
				const newVotes = new Map(prev);
				newVotes.set(cardId, { voted: false });
				return newVotes;
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to remove vote');
			setTimeout(() => setError(null), 3000);
		} finally {
			setIsVoting(null);
		}
	};

	// Handle load more
	const handleLoadMore = () => {
		if (!isLoadingMore && hasMore) {
			fetchCards(false);
		}
	};

	return (
		<div className="community-voting-screen">
			<header className="voting-header">
				<h1>Community Card Review</h1>
				<p>Vote on submitted cards to help moderators decide what to approve!</p>
			</header>

			{error && (
				<div className="error-banner">
					{error}
				</div>
			)}

			<div className="voting-controls">
				<div className="filter-group">
					<label htmlFor="card-type-filter">Card Type:</label>
					<select
						id="card-type-filter"
						value={cardType}
						onChange={(e) => setCardType(e.target.value as CardTypeFilter)}
					>
						<option value="all">All Cards</option>
						<option value="Q">Question Cards</option>
						<option value="A">Answer Cards</option>
					</select>
				</div>

				<div className="filter-group">
					<label htmlFor="sort-select">Sort By:</label>
					<select
						id="sort-select"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as SortOption)}
					>
						<option value="newest">Newest First</option>
						<option value="oldest">Oldest First</option>
						<option value="upvoted">Most Upvoted</option>
						<option value="controversial">Most Controversial</option>
					</select>
				</div>
			</div>

			{isLoading ? (
				<div className="loading">Loading cards...</div>
			) : cards.length === 0 ? (
				<div className="no-cards">
					<p>No cards to review right now.</p>
					<p>Check back later!</p>
				</div>
			) : (
				<>
					<div className="cards-list">
						{cards.map(card => (
							<CardVoteItem
								key={card.id}
								card={card}
								userVote={userVotes.get(card.id) || null}
								onVote={handleVote}
								onRemoveVote={handleRemoveVote}
								isVoting={isVoting === card.id}
							/>
						))}
					</div>

					{hasMore && (
						<div className="load-more-section">
							<button
								className="load-more-btn"
								onClick={handleLoadMore}
								disabled={isLoadingMore}
							>
								{isLoadingMore ? 'Loading...' : 'Load More Cards'}
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default CommunityVotingScreen;
