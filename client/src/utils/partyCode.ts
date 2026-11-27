// Mirrors server/src/utils/validation.ts validatePartyCode. Codes are case-sensitive.
const PARTY_CODE = /^[a-zA-Z0-9_-]{1,20}$/;

/**
 * Turns what a player typed or pasted (a bare code or a full invite link)
 * into a valid party code, or null if it can't be one.
 */
export const parsePartyCode = (input: string | null | undefined): string | null => {
	if (!input) return null;
	const lastSegment = input.trim().split(/[?#]/)[0].split('/').filter(Boolean).pop() ?? '';
	return PARTY_CODE.test(lastSegment) ? lastSegment : null;
};
