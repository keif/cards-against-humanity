/**
 * Dynamically loads the appropriate DnD backend based on device type
 * This reduces initial bundle size by only loading the backend needed
 */

const isTouchDevice = () => !!("ontouchstart" in window);

// Touch backend options for better mobile support
export const touchBackendOptions = {
	enableMouseEvents: true, // Allow mouse events on hybrid devices
	delayTouchStart: 200, // Delay before drag starts (ms) - allows scrolling
	ignoreContextMenu: true, // Disable context menu on long press
	touchSlop: 5, // Pixels to move before registering as drag (allows taps)
};

export const loadDndBackend = async () => {
	if (isTouchDevice()) {
		const { TouchBackend } = await import('react-dnd-touch-backend');
		return TouchBackend;
	} else {
		const { HTML5Backend } = await import('react-dnd-html5-backend');
		return HTML5Backend;
	}
};
