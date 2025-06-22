"use client";

import React, { useState, useEffect } from "react";

interface PriceCellProps {
	price: number;
	priceChange: number;
	previousPrice?: number;
}

const PriceCell: React.FC<PriceCellProps> = ({
	price,
	priceChange,
	previousPrice,
}) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [displayPrice, setDisplayPrice] = useState(price);

	useEffect(() => {
		if (previousPrice !== undefined && previousPrice !== price) {
			setIsUpdating(true);
			setDisplayPrice(price);

			// Reset the updating state after animation
			const timer = setTimeout(() => {
				setIsUpdating(false);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [price, previousPrice]);

	const getPriceChangeColor = (change: number) => {
		if (change >= 0) {
			return "text-green-600 dark:text-green-400";
		}
		return "text-red-600 dark:text-red-400";
	};

	const getPriceChangeBg = (change: number) => {
		if (change >= 0) {
			return "bg-green-50 dark:bg-green-900/20";
		}
		return "bg-red-50 dark:bg-red-900/20";
	};

	return (
		<div className="space-y-1">
			<div
				className={`text-right transition-all duration-500 ${
					isUpdating ? getPriceChangeBg(priceChange) : ""
				}`}
			>
				<span
					className={`text-gray-900 dark:text-white ${
						isUpdating ? "font-semibold" : ""
					}`}
				>
					$
					{displayPrice.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
			</div>
			<div
				className={`text-right font-medium transition-colors duration-300 ${getPriceChangeColor(
					priceChange
				)}`}
			>
				{priceChange >= 0 ? "+" : ""}
				{priceChange.toFixed(2)}%
			</div>
		</div>
	);
};

export default PriceCell;
