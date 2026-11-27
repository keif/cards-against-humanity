import { describe, expect, it } from 'vitest';
import { parsePartyCode } from './partyCode';

describe('parsePartyCode', () => {
	it('returns a bare code unchanged', () => {
		expect(parsePartyCode('k7qx')).toBe('k7qx');
	});

	it('preserves case, because the server treats codes as case-sensitive', () => {
		expect(parsePartyCode('K7qX')).toBe('K7qX');
	});

	it('trims surrounding whitespace', () => {
		expect(parsePartyCode('  k7qx \n')).toBe('k7qx');
	});

	it('takes the last path segment of a pasted invite link', () => {
		expect(parsePartyCode('https://phuckingcards.com/k7qx')).toBe('k7qx');
		expect(parsePartyCode('phuckingcards.com/join/k7qx/')).toBe('k7qx');
	});

	it('ignores a query string or hash on a pasted link', () => {
		expect(parsePartyCode('https://phuckingcards.com/k7qx?ref=chat#top')).toBe('k7qx');
	});

	it('allows hyphens and underscores like the server does', () => {
		expect(parsePartyCode('late-night_crew')).toBe('late-night_crew');
	});

	it('returns null for empty, whitespace-only, null or undefined input', () => {
		expect(parsePartyCode('')).toBeNull();
		expect(parsePartyCode('   ')).toBeNull();
		expect(parsePartyCode(null)).toBeNull();
		expect(parsePartyCode(undefined)).toBeNull();
	});

	it('returns null for codes longer than 20 characters', () => {
		expect(parsePartyCode('a'.repeat(20))).toBe('a'.repeat(20));
		expect(parsePartyCode('a'.repeat(21))).toBeNull();
	});

	it('rejects markup and script injection', () => {
		expect(parsePartyCode('<script>alert(1)</script>')).toBeNull();
		expect(parsePartyCode('"><img src=x onerror=alert(1)>')).toBeNull();
		expect(parsePartyCode('javascript:alert(1)')).toBeNull();
	});

	it('never returns a path: traversal collapses to its last segment', () => {
		const code = parsePartyCode('../../etc/passwd');
		expect(code).toBe('passwd');
		expect(code).not.toMatch(/[./]/);
	});

	it('rejects SQL-shaped input', () => {
		expect(parsePartyCode("k7qx' OR '1'='1")).toBeNull();
		expect(parsePartyCode('k7qx;DROP TABLE parties')).toBeNull();
	});

	it('rejects spaces and non-ASCII characters inside the code', () => {
		expect(parsePartyCode('k7 qx')).toBeNull();
		expect(parsePartyCode('kåqx')).toBeNull();
	});
});
