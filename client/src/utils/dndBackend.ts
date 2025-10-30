/**
 * Dynamically loads the appropriate DnD backend based on device type
 * This reduces initial bundle size by only loading the backend needed
 */

const isTouchDevice = () => !!("ontouchstart" in window);

export const loadDndBackend = async () => {
	if (isTouchDevice()) {
		const { TouchBackend } = await import('react-dnd-touch-backend');
		return TouchBackend;
	} else {
		const { HTML5Backend } = await import('react-dnd-html5-backend');
		return HTML5Backend;
	}
};
