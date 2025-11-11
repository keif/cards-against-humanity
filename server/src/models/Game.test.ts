import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import Game from './Game';
import { CallbackType, DEFAULT_GAME_CONFIG } from './types';
import { JUDGE_SELECTING, PLAYER_SELECTING } from '@/constants';
import { initializeCardService } from './Card';
import Redis from 'ioredis';
import cards from '@/data/cards';

// Initialize card service before tests
const redis = new Redis({
	host: process.env.REDIS_HOST || 'localhost',
	port: Number(process.env.REDIS_PORT || 6379)
});

beforeEach(async () => {
	await initializeCardService(redis, cards);
});

describe('Game - Round Timer and Timeout Handling', () => {
	let game: Game;
	let callbackMock: ReturnType<typeof vi.fn<CallbackType>>;
	const partyCode = 'TEST123';
	const roundLength = 1; // 1 second for fast tests

	beforeEach(async () => {
		vi.useFakeTimers();
		callbackMock = vi.fn<CallbackType>();
		game = new Game(partyCode, roundLength, callbackMock, DEFAULT_GAME_CONFIG);
		await game.initialize();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	describe('setRoundFinishedNotifier', () => {
		it('should update the round finished notifier callback', () => {
			const newCallback = vi.fn<CallbackType>();
			game.setRoundFinishedNotifier(newCallback);

			expect(game.roundFinishedNotifier).toBe(newCallback);
		});

		it('should use updated callback when timer expires', async () => {
			// Add players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			// Start a round by getting player round state (which internally calls getLatestRound)
			const round = game.getLatestRound();
			expect(round).toBeDefined();

			// Update the callback after round is created
			const updatedCallback = vi.fn<CallbackType>();
			game.setRoundFinishedNotifier(updatedCallback);

			// Find a non-judge player and submit their card
			const nonJudgeSession = Object.keys(game.players).find(
				sessionID => game.players[sessionID].pID !== round!.roundJudge?.pID
			);
			expect(nonJudgeSession).toBeDefined();

			const player = game.players[nonJudgeSession!];
			game.playCard(player.cards[0].id, nonJudgeSession!, vi.fn());

			// Fast-forward time to trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// The UPDATED callback should be called, not the original
			expect(updatedCallback).toHaveBeenCalledWith(true, 'Judge-selection time!');
			expect(callbackMock).not.toHaveBeenCalled();
		});
	});

	describe('Round timer with partial submissions', () => {
		it('should transition to JUDGE_SELECTING when timer expires with at least one card submitted', async () => {
			// Add 3 players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			// Start a round
			const round = game.getLatestRound();
			expect(round).toBeDefined();
			const judge = round!.roundJudge;

			// Find a non-judge player and submit their card
			const nonJudgeSession = Object.keys(game.players).find(
				sessionID => game.players[sessionID].pID !== judge?.pID
			);
			expect(nonJudgeSession).toBeDefined();

			const submittingPlayer = game.players[nonJudgeSession!];
			game.playCard(submittingPlayer.cards[0].id, nonJudgeSession!, vi.fn());

			// Verify one card was submitted
			expect(round!.otherPlayerCards?.length).toBe(1);

			// Fast-forward time to trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Verify callback was called with success
			expect(callbackMock).toHaveBeenCalledWith(true, 'Judge-selection time!');

			// Verify round state transitioned to JUDGE_SELECTING
			expect(round!.roundState).toBe(JUDGE_SELECTING);
		});

		it('should transition to JUDGE_SELECTING when timer expires with multiple partial submissions', async () => {
			// Add 4 players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');
			game.addNewPlayer('Player 4', 'session4');

			const round = game.getLatestRound();
			expect(round).toBeDefined();
			const judge = round!.roundJudge;

			// Find non-judge players and submit 2 out of 3 cards
			const nonJudgeSessions = Object.keys(game.players).filter(
				sessionID => game.players[sessionID].pID !== judge?.pID
			);
			expect(nonJudgeSessions.length).toBe(3);

			// Submit cards for only 2 players
			for (let i = 0; i < 2; i++) {
				const player = game.players[nonJudgeSessions[i]];
				game.playCard(player.cards[0].id, nonJudgeSessions[i], vi.fn());
			}

			// Verify 2 cards were submitted
			expect(round!.otherPlayerCards?.length).toBe(2);

			// Fast-forward time to trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Verify callback was called
			expect(callbackMock).toHaveBeenCalledWith(true, 'Judge-selection time!');

			// Verify round state transitioned to JUDGE_SELECTING
			expect(round!.roundState).toBe(JUDGE_SELECTING);
		});

		it('should end round when timer expires with zero submissions', async () => {
			// Add 3 players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			const round = game.getLatestRound();
			expect(round).toBeDefined();

			// Don't submit any cards
			expect(round!.otherPlayerCards?.length).toBe(0);

			// Fast-forward time to trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Verify callback was called with skip message
			expect(callbackMock).toHaveBeenCalledWith(true, 'Skipping judge!');

			// Verify roundsIdle was incremented
			expect(game.roundsIdle).toBe(1);
		});

		it('should allow judge to select from partial submissions after timeout', async () => {
			// Add 3 players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			const round = game.getLatestRound();
			expect(round).toBeDefined();
			const judge = round!.roundJudge;
			expect(judge).toBeDefined();

			// Find judge's session
			const judgeSession = Object.keys(game.players).find(
				sessionID => game.players[sessionID].pID === judge?.pID
			);
			expect(judgeSession).toBeDefined();

			// Find a non-judge player and submit their card
			const nonJudgeSession = Object.keys(game.players).find(
				sessionID => game.players[sessionID].pID !== judge?.pID
			);
			expect(nonJudgeSession).toBeDefined();

			const submittingPlayer = game.players[nonJudgeSession!];
			game.playCard(submittingPlayer.cards[0].id, nonJudgeSession!, vi.fn());

			const submittedCard = round!.otherPlayerCards?.[0];
			expect(submittedCard).toBeDefined();

			// Fast-forward time to trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Verify round is in JUDGE_SELECTING state
			expect(round!.roundState).toBe(JUDGE_SELECTING);

			// Judge should be able to select the submitted card
			const judgeCallback = vi.fn<CallbackType>();
			game.judgeSelectCard(judgeSession!, submittedCard!.id, judgeCallback);

			// Verify judge selection succeeded
			expect(judgeCallback).toHaveBeenCalledWith(true, expect.any(String));
		});
	});

	describe('Multiple clients connecting with different callbacks', () => {
		it('should use the most recently set callback', async () => {
			// Add players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			// Start round
			const round = game.getLatestRound();
			expect(round).toBeDefined();

			// Simulate multiple clients connecting (each sets a new callback)
			const callback1 = vi.fn<CallbackType>();
			const callback2 = vi.fn<CallbackType>();
			const callback3 = vi.fn<CallbackType>();

			game.setRoundFinishedNotifier(callback1);
			game.setRoundFinishedNotifier(callback2);
			game.setRoundFinishedNotifier(callback3); // Most recent

			// Submit one card
			const nonJudgeSession = Object.keys(game.players).find(
				sessionID => game.players[sessionID].pID !== round!.roundJudge?.pID
			);
			const player = game.players[nonJudgeSession!];
			game.playCard(player.cards[0].id, nonJudgeSession!, vi.fn());

			// Trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Only the most recent callback should be called
			expect(callback3).toHaveBeenCalledWith(true, 'Judge-selection time!');
			expect(callback2).not.toHaveBeenCalled();
			expect(callback1).not.toHaveBeenCalled();
		});
	});

	describe('Player state after timeout with partial submissions', () => {
		it('should show correct state for player who submitted before timeout', async () => {
			// Add 3 players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			const round = game.getLatestRound();
			expect(round).toBeDefined();

			// Player 1 submits (not judge)
			const nonJudgeSession = Object.keys(game.players).find(
				sessionID => game.players[sessionID].pID !== round!.roundJudge?.pID
			);
			const player = game.players[nonJudgeSession!];
			game.playCard(player.cards[0].id, nonJudgeSession!, vi.fn());

			// Trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Get player's round state
			const playerState = game.getPlayerRoundState(nonJudgeSession!);

			// Player who submitted should be in waiting state with 0 time left
			expect(playerState?.timeLeft).toBe(0);
			expect(playerState?.roundState).toBe(JUDGE_SELECTING);
		});

		it('should show correct state for player who did not submit before timeout', async () => {
			// Add 3 players
			game.addNewPlayer('Player 1', 'session1');
			game.addNewPlayer('Player 2', 'session2');
			game.addNewPlayer('Player 3', 'session3');

			const round = game.getLatestRound();
			expect(round).toBeDefined();

			// Find two non-judge sessions
			const nonJudgeSessions = Object.keys(game.players).filter(
				sessionID => game.players[sessionID].pID !== round!.roundJudge?.pID
			);

			// Only first player submits
			const player1 = game.players[nonJudgeSessions[0]];
			game.playCard(player1.cards[0].id, nonJudgeSessions[0], vi.fn());

			// Second player does NOT submit
			const player2Session = nonJudgeSessions[1];

			// Trigger timeout
			vi.advanceTimersByTime(roundLength * 1000);

			// Get player 2's round state
			const player2State = game.getPlayerRoundState(player2Session);

			// Player who didn't submit should now see JUDGE_SELECTING state
			// This allows them to see the round has progressed even though they didn't submit
			expect(player2State?.timeLeft).toBe(0);
			expect(player2State?.roundState).toBe(JUDGE_SELECTING);
		});
	});
});
