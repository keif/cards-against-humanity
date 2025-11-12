import React from 'react';

interface AffiliateDisclosureProps {
  className?: string;
}

export const AffiliateDisclosure: React.FC<AffiliateDisclosureProps> = ({ className = '' }) => {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            Support This Project
          </h3>
          <p className="text-sm text-blue-800">
            As an Amazon Associate, this project earns from qualifying purchases.
            These affiliate links help support the development and hosting of this free game.
            Your support is greatly appreciated!
          </p>
        </div>
      </div>
    </div>
  );
};
