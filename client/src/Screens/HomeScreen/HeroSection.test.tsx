import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection';

const renderHero = () => render(<MemoryRouter><HeroSection /></MemoryRouter>);

describe('HeroSection', () => {
	it('keeps the same new-party link while the player types a code', async () => {
		renderHero();
		const startLink = screen.getByRole('link', { name: 'Start a party' });
		const before = startLink.getAttribute('href');

		await userEvent.type(screen.getByLabelText('Party code'), 'abc');

		expect(before).toMatch(/^\/join\/.+/);
		expect(startLink.getAttribute('href')).toBe(before);
	});

	it('shows an error for input that is not a party code', async () => {
		renderHero();
		await userEvent.type(screen.getByLabelText('Party code'), '<script>');
		await userEvent.click(screen.getByRole('button', { name: 'Join' }));

		expect(screen.getByRole('alert')).toHaveTextContent('doesn\'t look like a party code');
	});
});
