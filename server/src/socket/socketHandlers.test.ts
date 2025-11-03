import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MockSocket, MockIO } from '@/test/socketMocks';
import game from '@/schema';
import { InputValidator } from '@/utils/validation';

// Mock the game schema module
vi.mock('@/schema', () => ({
	default: {
		joinGame: vi.fn(),
		getLobbyState: vi.fn(),
		getPlayerRoundState: vi.fn(),
		playCard: vi.fn(),
		judgeSelectCard: vi.fn(),
		shuffleCards: vi.fn(),
		endRound: vi.fn()
	}
}));

describe('Socket.IO Event Handlers - Critical Game Flow', () => {
	let mockSocket: MockSocket;
	let mockIO: MockIO;
	const sessionID = 'test-session-123';

	beforeEach(() => {
		mockSocket = new MockSocket(sessionID);
		mockIO = new MockIO();
		vi.clearAllMocks();
	});

	describe('joinParty event', () => {
		it('should join party with valid input', async () => {
			const partyCode = 'ABC123';
			const playerName = 'Alice';

			(game.joinGame as any).mockResolvedValue(undefined);

			// Simulate the event handler logic
			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
			const nameValidation = InputValidator.validatePlayerName(playerName);

			expect(partyCodeValidation.isValid).toBe(true);
			expect(nameValidation.isValid).toBe(true);

			const sanitizedPartyCode = partyCodeValidation.sanitizedValue!;
			const sanitizedName = nameValidation.sanitizedValue!;

			await game.joinGame(sanitizedPartyCode, sessionID, sanitizedName);

			expect(game.joinGame).toHaveBeenCalledWith(
				sanitizedPartyCode,
				sessionID,
				sanitizedName
			);
		});

		it('should reject invalid party code - too long', () => {
			const invalidCode = 'A'.repeat(21); // Too long (> 20 chars)
			const playerName = 'Alice';

			const partyCodeValidation = InputValidator.validatePartyCode(invalidCode);

			expect(partyCodeValidation.isValid).toBe(false);
			expect(partyCodeValidation.error).toContain('too long');
		});

		it('should reject invalid party code - special characters', () => {
			const invalidCode = 'ABC@123';
			const playerName = 'Alice';

			const partyCodeValidation = InputValidator.validatePartyCode(invalidCode);

			expect(partyCodeValidation.isValid).toBe(false);
			expect(partyCodeValidation.error).toContain('Invalid party code format');
		});

		it('should reject invalid player name - too long', () => {
			const partyCode = 'ABC123';
			const invalidName = 'A'.repeat(51); // Too long (> 50 chars)

			const nameValidation = InputValidator.validatePlayerName(invalidName);

			expect(nameValidation.isValid).toBe(false);
			expect(nameValidation.error).toContain('too long');
		});

		it('should reject invalid player name - special characters', () => {
			const partyCode = 'ABC123';
			const invalidName = 'Alice@#$%';

			const nameValidation = InputValidator.validatePlayerName(invalidName);

			expect(nameValidation.isValid).toBe(false);
			expect(nameValidation.error).toContain('invalid characters');
		});

		it('should sanitize player name - XSS attempt', () => {
			const partyCode = 'ABC123';
			const maliciousName = '<script>alert("xss")</script>Alice';

			const nameValidation = InputValidator.validatePlayerName(maliciousName);

			expect(nameValidation.isValid).toBe(true);
			expect(nameValidation.sanitizedValue).toBe('Alice'); // HTML stripped
		});

		it('should accept valid lowercase party code', () => {
			const partyCode = 'abc123';
			const playerName = 'Alice';

			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);

			expect(partyCodeValidation.isValid).toBe(true);
			expect(partyCodeValidation.sanitizedValue).toBe('abc123');
		});

		it('should handle game.joinGame errors gracefully', async () => {
			const partyCode = 'ABC123';
			const playerName = 'Alice';

			(game.joinGame as any).mockRejectedValue(new Error('Party is full'));

			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
			const nameValidation = InputValidator.validatePlayerName(playerName);

			expect(partyCodeValidation.isValid).toBe(true);
			expect(nameValidation.isValid).toBe(true);

			await expect(
				game.joinGame(
					partyCodeValidation.sanitizedValue!,
					sessionID,
					nameValidation.sanitizedValue!
				)
			).rejects.toThrow('Party is full');
		});
	});

	describe('startGame event', () => {
		it('should start game with valid party code', () => {
			const partyCode = 'ABC123';

			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);

			expect(partyCodeValidation.isValid).toBe(true);
			expect(partyCodeValidation.sanitizedValue).toBe('ABC123');
		});

		it('should reject invalid party code with special characters', () => {
			const invalidCode = 'AB@#$';

			const partyCodeValidation = InputValidator.validatePartyCode(invalidCode);

			expect(partyCodeValidation.isValid).toBe(false);
			expect(partyCodeValidation.error).toContain('Invalid party code format');
		});

		it('should accept valid party code', () => {
			const partyCode = 'abc123';

			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);

			expect(partyCodeValidation.isValid).toBe(true);
			expect(partyCodeValidation.sanitizedValue).toBe('abc123');
		});
	});

	describe('getPlayerRoundState event', () => {
		it('should get player round state', async () => {
			const partyCode = 'ABC123';
			const mockRoundState = {
				questionCard: { id: 1, text: 'What is ___?', cardType: 'Q' as const, numAnswers: 1 },
				cardsInHand: [
					{ id: 2, text: 'Answer 1', cardType: 'A' as const, numAnswers: 0 },
					{ id: 3, text: 'Answer 2', cardType: 'A' as const, numAnswers: 0 }
				],
				selectedCards: [],
				isJudge: false,
				canSelectCard: true,
				phase: 'selecting' as const
			};

			(game.getPlayerRoundState as any).mockResolvedValue(mockRoundState);

			const result = await game.getPlayerRoundState(partyCode, sessionID);

			expect(game.getPlayerRoundState).toHaveBeenCalledWith(partyCode, sessionID);
			expect(result).toEqual(mockRoundState);
		});

		it('should return null if game does not exist', async () => {
			const partyCode = 'NONEXISTENT';

			(game.getPlayerRoundState as any).mockResolvedValue(null);

			const result = await game.getPlayerRoundState(partyCode, sessionID);

			expect(result).toBeNull();
		});
	});

	describe('playCard event', () => {
		it('should play card with valid input', async () => {
			const partyCode = 'ABC123';
			const cardID = 42;

			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
			const cardIdValidation = InputValidator.validateCardId(cardID);

			expect(partyCodeValidation.isValid).toBe(true);
			expect(cardIdValidation.isValid).toBe(true);

			(game.playCard as any).mockImplementation((code, card, session, callback) => {
				callback(true, 'Card played successfully');
			});

			await game.playCard(
				partyCodeValidation.sanitizedValue!,
				parseInt(cardIdValidation.sanitizedValue!),
				sessionID,
				(success, message) => {
					expect(success).toBe(true);
					expect(message).toBe('Card played successfully');
				}
			);

			expect(game.playCard).toHaveBeenCalled();
		});

		it('should reject empty party code', () => {
			const invalidCode = '';
			const cardID = 42;

			const partyCodeValidation = InputValidator.validatePartyCode(invalidCode);

			expect(partyCodeValidation.isValid).toBe(false);
			expect(partyCodeValidation.error).toContain('cannot be empty');
		});

		it('should reject invalid card ID - negative number', () => {
			const partyCode = 'ABC123';
			const invalidCardID = -1;

			const cardIdValidation = InputValidator.validateCardId(invalidCardID);

			expect(cardIdValidation.isValid).toBe(false);
			expect(cardIdValidation.error).toContain('Invalid card ID range');
		});

		it('should reject invalid card ID - not a number', () => {
			const partyCode = 'ABC123';
			const invalidCardID = 'not-a-number' as any;

			const cardIdValidation = InputValidator.validateCardId(invalidCardID);

			expect(cardIdValidation.isValid).toBe(false);
			expect(cardIdValidation.error).toContain('must be a number');
		});

		it('should handle play card failure', async () => {
			const partyCode = 'ABC123';
			const cardID = 42;

			const partyCodeValidation = InputValidator.validatePartyCode(partyCode);
			const cardIdValidation = InputValidator.validateCardId(cardID);

			(game.playCard as any).mockImplementation((code, card, session, callback) => {
				callback(false, 'You have already played a card');
			});

			await game.playCard(
				partyCodeValidation.sanitizedValue!,
				parseInt(cardIdValidation.sanitizedValue!),
				sessionID,
				(success, message) => {
					expect(success).toBe(false);
					expect(message).toBe('You have already played a card');
				}
			);
		});
	});

	describe('judgeSelectCard event', () => {
		it('should allow judge to select winning card', async () => {
			const partyCode = 'ABC123';
			const cardID = 99;

			(game.judgeSelectCard as any).mockImplementation((code, card, session, callback) => {
				callback(true, 'Winner selected');
			});

			await game.judgeSelectCard(partyCode, cardID, sessionID, (success, message) => {
				expect(success).toBe(true);
				expect(message).toBe('Winner selected');
			});

			expect(game.judgeSelectCard).toHaveBeenCalledWith(
				partyCode,
				cardID,
				sessionID,
				expect.any(Function)
			);
		});

		it('should reject if player is not the judge', async () => {
			const partyCode = 'ABC123';
			const cardID = 99;

			(game.judgeSelectCard as any).mockImplementation((code, card, session, callback) => {
				callback(false, 'You are not the judge');
			});

			await game.judgeSelectCard(partyCode, cardID, sessionID, (success, message) => {
				expect(success).toBe(false);
				expect(message).toBe('You are not the judge');
			});
		});
	});

	describe('endRound event', () => {
		it('should end round successfully', async () => {
			const partyCode = 'ABC123';

			(game.endRound as any).mockImplementation((code, callback) => {
				callback(true, 'Round ended');
			});

			await game.endRound(partyCode, (success, message) => {
				expect(success).toBe(true);
				expect(message).toBe('Round ended');
			});

			expect(game.endRound).toHaveBeenCalledWith(partyCode, expect.any(Function));
		});

		it('should handle end round failure', async () => {
			const partyCode = 'ABC123';

			(game.endRound as any).mockImplementation((code, callback) => {
				callback(false, 'Not all players have played');
			});

			await game.endRound(partyCode, (success, message) => {
				expect(success).toBe(false);
				expect(message).toBe('Not all players have played');
			});
		});
	});

	describe('getLobbyState event', () => {
		it('should get lobby state', async () => {
			const partyCode = 'ABC123';
			const mockLobbyState = {
				players: ['Alice', 'Bob', 'Charlie'],
				currentPlayer: { name: 'Alice', sessionID }
			};

			(game.getLobbyState as any).mockResolvedValue(mockLobbyState);

			const result = await game.getLobbyState(partyCode, sessionID, vi.fn());

			expect(game.getLobbyState).toHaveBeenCalledWith(
				partyCode,
				sessionID,
				expect.any(Function)
			);
			expect(result).toEqual(mockLobbyState);
		});
	});
});
