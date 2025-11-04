import React from 'react';
import { ModeratorStats } from '@/types';
import './ModeratorDashboard.css';

interface ModeratorStatsDisplayProps {
	stats: ModeratorStats | null;
}

const ModeratorStatsDisplay: React.FC<ModeratorStatsDisplayProps> = ({ stats }) => {
	// Defensive check - should never happen with proper flow, but prevents crash
	if (!stats) {
		return (
			<div className="stats-container">
				<div className="loading">Loading statistics...</div>
			</div>
		);
	}

	return (
		<div className="stats-container">
			<div className="stat-card">
				<div className="stat-header">
					<h3>Pending Review</h3>
				</div>
				<div className="stat-content">
					<div className="stat-value">{stats.pending.total}</div>
					<div className="stat-breakdown">
						<span>{stats.pending.answerCards} Answer Cards</span>
						<span>{stats.pending.questionCards} Question Cards</span>
					</div>
				</div>
			</div>

			<div className="stat-card">
				<div className="stat-header">
					<h3>Approved Cards</h3>
				</div>
				<div className="stat-content">
					<div className="stat-value">{stats.approved.total}</div>
					<div className="stat-breakdown">
						<span>{stats.approved.answerCards} Answer Cards</span>
						<span>{stats.approved.questionCards} Question Cards</span>
					</div>
				</div>
			</div>

			<div className="stat-card">
				<div className="stat-header">
					<h3>Total Submissions</h3>
				</div>
				<div className="stat-content">
					<div className="stat-value">{stats.totalSubmissions}</div>
					<div className="stat-breakdown">
						<span>
							Approval Rate: {stats.approvalRate.toFixed(1)}%
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModeratorStatsDisplay;
