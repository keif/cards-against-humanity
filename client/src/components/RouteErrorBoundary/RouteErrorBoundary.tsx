import React, { Component, ErrorInfo, ReactNode } from 'react';
import Button from '../Button/Button';
import Screen from '../Screen/Screen';

interface RouteErrorBoundaryProps {
	children: ReactNode;
}

interface RouteErrorBoundaryState {
	hasError: boolean;
}

/**
 * Catches errors thrown while rendering a route, most commonly a lazy route
 * chunk that failed to download (dropped connection, a 429, or a deploy that
 * replaced the hashed asset). Without this, React unmounts the tree and the
 * player sees a blank page. Reloading fetches a fresh index.html and chunks.
 */
class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
	state: RouteErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): RouteErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error('Route failed to render', error, info.componentStack);
	}

	render() {
		if (!this.state.hasError) {
			return this.props.children;
		}

		return (
			<Screen>
			<div role="alert" className="flex flex-col min-h-screen justify-center gap-4 px-6 py-12 max-w-[560px] mx-auto">
				<span className="w-fit font-mono font-bold text-xs bg-error text-ink px-1.5 py-0.5 rounded-sm">NOPE</span>
				<h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.015em] [font-stretch:80%]">
					This page didn't load.
				</h1>
				<p className="font-sans text-lg leading-normal text-muted">
					Your connection may have dropped, or we just shipped an update. Reload to try again.
				</p>
				<Button text="Reload" onClick={() => window.location.reload()}/>
			</div>
			</Screen>
		);
	}
}

export default RouteErrorBoundary;
