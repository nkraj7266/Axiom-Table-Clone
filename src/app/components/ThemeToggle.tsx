"use client";

import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="fixed top-4 right-4 flex items-center gap-3 z-50">
			{/* Connection Status */}
			<div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
				<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
				<span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
					LIVE
				</span>
			</div>

			{/* Theme Toggle */}
			<button
				onClick={toggleTheme}
				className="p-2 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200"
				aria-label="Toggle theme"
			>
				{theme === "light" ? (
					<svg
						className="w-5 h-5 text-gray-800"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				) : (
					<svg
						className="w-5 h-5 text-yellow-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				)}
			</button>
		</div>
	);
};

export default ThemeToggle;
