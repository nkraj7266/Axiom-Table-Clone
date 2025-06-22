"use client";

import { useEffect, useState, useRef } from "react";
import { Token } from "../dummyTokens";

export const useWebSocket = (tokens: Token[]) => {
	const [updatedTokens, setUpdatedTokens] = useState<Token[]>(tokens);
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Simulate WebSocket connection
		setIsConnected(true);
		setError(null);

		// Mock real-time price updates every 3 seconds
		intervalRef.current = setInterval(() => {
			setUpdatedTokens((prevTokens) =>
				prevTokens.map((token) => {
					// Generate random price change between -5% and +5%
					const priceChangePercent = (Math.random() - 0.5) * 10;
					const newPrice =
						token.price * (1 + priceChangePercent / 100);
					const newPriceChange =
						token.priceChange + (Math.random() - 0.5) * 2;

					return {
						...token,
						price: newPrice,
						priceChange: Math.max(
							-99,
							Math.min(99, newPriceChange)
						), // Clamp between -99% and +99%
						volume:
							token.volume +
							Math.floor(Math.random() * 1000000) -
							500000, // Random volume change
						txns: token.txns + Math.floor(Math.random() * 100) - 50, // Random transaction change
					};
				})
			);
		}, 3000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			setIsConnected(false);
		};
	}, []);

	return {
		tokens: updatedTokens,
		isConnected,
		error,
	};
};
