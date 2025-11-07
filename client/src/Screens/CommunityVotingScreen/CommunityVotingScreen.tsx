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
		<div className="max-w-[1200px] mx-auto p-8 min-h-screen md:p-4">
			<header className="text-center mb-8">
				<h1 className="text-4xl mb-2 text-black md:text-[1.8rem]">Community Card Review</h1>
				<p className="text-lg text-gray-600">Vote on submitted cards to help moderators decide what to approve!</p>
			</header>

			{error && (
				<div className="bg-[#f44336] text-white p-4 rounded-lg mb-4 text-center font-bold">
					{error}
				</div>
			)}

			<div className="flex gap-8 justify-center mb-8 p-6 bg-gray-100 rounded-xl md:flex-col md:gap-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="card-type-filter" className="font-bold text-sm text-gray-800">Card Type:</label>
					<select
						id="card-type-filter"
						value={cardType}
						onChange={(e) => setCardType(e.target.value as CardTypeFilter)}
						className="px-4 py-2 text-base border-2 border-gray-300 rounded-md bg-white cursor-pointer transition-colors hover:border-gray-600 focus:outline-none focus:border-black"
					>
						<option value="all">All Cards</option>
						<option value="Q">Question Cards</option>
						<option value="A">Answer Cards</option>
					</select>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="sort-select" className="font-bold text-sm text-gray-800">Sort By:</label>
					<select
						id="sort-select"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as SortOption)}
						className="px-4 py-2 text-base border-2 border-gray-300 rounded-md bg-white cursor-pointer transition-colors hover:border-gray-600 focus:outline-none focus:border-black"
					>
						<option value="newest">Newest First</option>
						<option value="oldest">Oldest First</option>
						<option value="upvoted">Most Upvoted</option>
						<option value="controversial">Most Controversial</option>
					</select>
				</div>
			</div>

			{isLoading ? (
				<div className="text-center py-12 text-xl text-gray-600">Loading cards...</div>
			) : cards.length === 0 ? (
				<div className="text-center py-12 text-xl text-gray-600">
					<p className="my-2">No cards to review right now.</p>
					<p className="my-2">Check back later!</p>
				</div>
			) : (
				<>
					<div className="flex flex-col gap-6">
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
						<div className="text-center mt-8 py-8">
							<button
								className="px-8 py-4 text-lg font-bold bg-black text-white border-none rounded-lg cursor-pointer transition-all hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
