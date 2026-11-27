import React, { lazy, Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, type MockInstance } from 'vitest';
import RouteErrorBoundary from './RouteErrorBoundary';

describe('RouteErrorBoundary', () => {
	let consoleError: MockInstance<typeof console.error>;

	beforeEach(() => {
		// React and the boundary both log caught errors; keep test output clean
		consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleError.mockRestore();
	});

	it('renders children when nothing fails', () => {
		render(
			<RouteErrorBoundary>
				<p>Lobby</p>
			</RouteErrorBoundary>
		);

		expect(screen.getByText('Lobby')).toBeInTheDocument();
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it('shows a readable error instead of a blank page when a lazy chunk fails to load', async () => {
		const Broken = lazy(() =>
			Promise.reject(new TypeError('Failed to fetch dynamically imported module: /assets/HomeScreen.js'))
		);

		render(
			<RouteErrorBoundary>
				<Suspense fallback={<div>Loading...</div>}>
					<Broken/>
				</Suspense>
			</RouteErrorBoundary>
		);

		const alert = await screen.findByRole('alert');
		expect(alert).toHaveTextContent("This page didn't load.");
		expect(alert).toHaveTextContent('NOPE');
		expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();
		expect(consoleError).toHaveBeenCalledWith('Route failed to render', expect.any(TypeError), expect.anything());
	});

	it('catches render errors from a screen too', () => {
		const Throws = () => {
			throw new Error('boom');
		};

		render(
			<RouteErrorBoundary>
				<Throws/>
			</RouteErrorBoundary>
		);

		expect(screen.getByRole('alert')).toBeInTheDocument();
	});

	it('reloads the page when Reload is pressed', async () => {
		const reload = vi.fn();
		const originalLocation = window.location;
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { ...originalLocation, reload },
		});

		const Throws = () => {
			throw new Error('boom');
		};

		try {
			render(
				<RouteErrorBoundary>
					<Throws/>
				</RouteErrorBoundary>
			);

			await userEvent.click(screen.getByRole('button', { name: 'Reload' }));
			expect(reload).toHaveBeenCalledTimes(1);
		} finally {
			Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
		}
	});
});
