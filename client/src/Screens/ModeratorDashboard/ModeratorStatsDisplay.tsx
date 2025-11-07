import React from 'react';
import { ModeratorStats } from '@/types';

interface ModeratorStatsDisplayProps {
	stats: ModeratorStats | null;
}

const ModeratorStatsDisplay: React.FC<ModeratorStatsDisplayProps> = ({ stats }) => {
	// Defensive check - should never happen with proper flow, but prevents crash
	if (!stats) {
		return (
			<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-8">
				<div className="text-center py-12 text-xl text-gray-600">Loading statistics...</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-8 md:grid-cols-1">
			<div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
				<div className="mb-4">
					<h3 className="text-xl text-gray-800">Pending Review</h3>
				</div>
				<div className="text-center">
					<div className="text-5xl font-bold text-black mb-2">{stats.pending.total}</div>
					<div className="flex flex-col gap-1 text-sm text-gray-600">
						<span>{stats.pending.answerCards} Answer Cards</span>
						<span>{stats.pending.questionCards} Question Cards</span>
					</div>
				</div>
			</div>

			<div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
				<div className="mb-4">
					<h3 className="text-xl text-gray-800">Approved Cards</h3>
				</div>
				<div className="text-center">
					<div className="text-5xl font-bold text-black mb-2">{stats.approved.total}</div>
					<div className="flex flex-col gap-1 text-sm text-gray-600">
						<span>{stats.approved.answerCards} Answer Cards</span>
						<span>{stats.approved.questionCards} Question Cards</span>
					</div>
				</div>
			</div>

			<div className="bg-white border-2 border-gray-300 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
				<div className="mb-4">
					<h3 className="text-xl text-gray-800">Total Submissions</h3>
				</div>
				<div className="text-center">
					<div className="text-5xl font-bold text-black mb-2">{stats.totalSubmissions}</div>
					<div className="flex flex-col gap-1 text-sm text-gray-600">
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
