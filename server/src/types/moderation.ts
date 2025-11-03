/**
 * Standardized rejection reasons for user-submitted cards
 */
export enum RejectionReason {
	OFFENSIVE = 'offensive',
	DUPLICATE = 'duplicate',
	POOR_GRAMMAR = 'poor_grammar',
	DOESNT_FIT_TONE = 'doesnt_fit_tone',
	TOO_OBSCURE = 'too_obscure',
	TOO_SIMILAR = 'too_similar',
	INAPPROPRIATE_LENGTH = 'inappropriate_length',
	SPAM = 'spam',
	CUSTOM = 'custom'
}

/**
 * Human-readable labels for rejection reasons
 */
export const REJECTION_REASON_LABELS: Record<RejectionReason, string> = {
	[RejectionReason.OFFENSIVE]: 'Offensive/Inappropriate',
	[RejectionReason.DUPLICATE]: 'Duplicate Card',
	[RejectionReason.POOR_GRAMMAR]: 'Poor Phrasing/Grammar',
	[RejectionReason.DOESNT_FIT_TONE]: "Doesn't Fit Game Tone",
	[RejectionReason.TOO_OBSCURE]: 'Too Specific/Obscure',
	[RejectionReason.TOO_SIMILAR]: 'Too Similar to Existing Card',
	[RejectionReason.INAPPROPRIATE_LENGTH]: 'Inappropriate Length',
	[RejectionReason.SPAM]: 'Spam/Low Effort',
	[RejectionReason.CUSTOM]: 'Custom Reason'
};

/**
 * Check if a string is a valid rejection reason
 */
export function isValidRejectionReason(reason: string): reason is RejectionReason {
	return Object.values(RejectionReason).includes(reason as RejectionReason);
}
