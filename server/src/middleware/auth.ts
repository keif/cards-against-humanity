import { Request, Response, NextFunction } from 'express';
import logger from '@/utils/logger';

/**
 * Middleware to require moderator or admin role for accessing routes
 * Returns 401 if user is not authenticated
 * Returns 403 if user lacks required role
 */
export const requireModerator = (req: Request, res: Response, next: NextFunction): void => {
	const session = req.session;

	// Check if session exists
	if (!session || !session.id) {
		logger.warn('Unauthorized access attempt - no session', {
			path: req.path,
			method: req.method,
			ip: req.ip
		});
		res.status(401).json({
			error: 'Authentication required',
			message: 'You must be logged in to access this resource'
		});
		return;
	}

	// Initialize role to 'user' if not set
	if (!session.role) {
		session.role = 'user';
	}

	// Check if user has moderator or admin role
	if (session.role !== 'moderator' && session.role !== 'admin') {
		logger.warn('Forbidden access attempt - insufficient permissions', {
			path: req.path,
			method: req.method,
			sessionId: session.id,
			role: session.role,
			ip: req.ip
		});
		res.status(403).json({
			error: 'Forbidden',
			message: 'You do not have permission to access this resource. Moderator or admin role required.'
		});
		return;
	}

	// User has required permissions
	logger.info('Authorized moderator access', {
		path: req.path,
		method: req.method,
		sessionId: session.id,
		role: session.role
	});

	next();
};

/**
 * Middleware to require admin role for accessing routes
 * Returns 401 if user is not authenticated
 * Returns 403 if user is not an admin
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
	const session = req.session;

	// Check if session exists
	if (!session || !session.id) {
		logger.warn('Unauthorized access attempt - no session', {
			path: req.path,
			method: req.method,
			ip: req.ip
		});
		res.status(401).json({
			error: 'Authentication required',
			message: 'You must be logged in to access this resource'
		});
		return;
	}

	// Initialize role to 'user' if not set
	if (!session.role) {
		session.role = 'user';
	}

	// Check if user has admin role
	if (session.role !== 'admin') {
		logger.warn('Forbidden access attempt - admin required', {
			path: req.path,
			method: req.method,
			sessionId: session.id,
			role: session.role,
			ip: req.ip
		});
		res.status(403).json({
			error: 'Forbidden',
			message: 'You do not have permission to access this resource. Admin role required.'
		});
		return;
	}

	// User has required permissions
	logger.info('Authorized admin access', {
		path: req.path,
		method: req.method,
		sessionId: session.id,
		role: session.role
	});

	next();
};
