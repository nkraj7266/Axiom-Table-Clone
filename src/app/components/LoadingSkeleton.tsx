"use client";

import React from "react";

const LoadingSkeleton: React.FC = () => {
	return (
		<div className="animate-pulse">
			{Array.from({ length: 10 }).map((_, index) => (
				<div
					key={index}
					className="flex items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700"
				>
					{/* Pair Info */}
					<div className="flex-1">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
						<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
					</div>

					{/* Market Cap */}
					<div className="w-20 text-right">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
					</div>

					{/* Liquidity */}
					<div className="w-20 text-right">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
					</div>

					{/* Volume */}
					<div className="w-20 text-right">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
					</div>

					{/* TXNS */}
					<div className="w-16 text-right">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div>
					</div>

					{/* Audit */}
					<div className="w-16 text-center">
						<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
					</div>

					{/* Price */}
					<div className="w-20 text-right">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto"></div>
					</div>

					{/* 24h % */}
					<div className="w-16 text-right">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div>
					</div>

					{/* Action */}
					<div className="w-16 text-center">
						<div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
					</div>
				</div>
			))}
		</div>
	);
};

export default LoadingSkeleton;
