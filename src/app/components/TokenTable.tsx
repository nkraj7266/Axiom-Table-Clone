"use client";

import React, { useState, useMemo, useEffect } from "react";
import { dummyTokens, Token } from "../dummyTokens";
import { useWebSocket } from "../hooks/useWebSocket";
import Table from "./Table";
import TableHeader, { TableColumn } from "./TableHeader";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import AuditPopover from "./AuditPopover";
import TradeTooltip from "./TradeTooltip";
import TradeModal from "./TradeModal";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorBoundary from "./ErrorBoundary";
import PriceCell from "./PriceCell";

const columns: TableColumn[] = [
	{ key: "name", label: "Pair Info", sortable: true, align: "left" },
	{ key: "marketCap", label: "Market Cap", sortable: true, align: "right" },
	{ key: "liquidity", label: "Liquidity", sortable: true, align: "right" },
	{ key: "volume", label: "Volume", sortable: true, align: "right" },
	{ key: "txns", label: "TXNS", sortable: true, align: "right" },
	{ key: "audit", label: "Audit", sortable: false, align: "center" },
	{ key: "price", label: "Price", sortable: true, align: "right" },
	{ key: "priceChange", label: "24h %", sortable: true, align: "right" },
	{ key: "action", label: "Action", sortable: false, align: "center" },
];

type SortDirection = "asc" | "desc";

function sortTokens(
	tokens: Token[],
	key: string,
	direction: SortDirection
): Token[] {
	return [...tokens].sort((a, b) => {
		if (key === "name") {
			return direction === "asc"
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		}
		if (
			typeof a[key as keyof Token] === "number" &&
			typeof b[key as keyof Token] === "number"
		) {
			return direction === "asc"
				? (a[key as keyof Token] as number) -
						(b[key as keyof Token] as number)
				: (b[key as keyof Token] as number) -
						(a[key as keyof Token] as number);
		}
		return 0;
	});
}

const TokenTable: React.FC = () => {
	const [sortKey, setSortKey] = useState<string>("marketCap");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [tradeModalOpen, setTradeModalOpen] = useState(false);
	const [selectedToken, setSelectedToken] = useState<Token | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [previousTokens, setPreviousTokens] = useState<Token[]>([]);

	// WebSocket hook for real-time updates
	const { tokens: realTimeTokens, error } = useWebSocket(dummyTokens);

	// Simulate initial loading
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	// Store previous tokens for price change animations
	useEffect(() => {
		if (realTimeTokens.length > 0) {
			setPreviousTokens(realTimeTokens);
		}
	}, [realTimeTokens]);

	const handleSort = (key: string) => {
		if (sortKey === key) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(key);
			setSortDirection("desc");
		}
	};

	const handleTradeClick = (token: Token) => {
		setSelectedToken(token);
		setTradeModalOpen(true);
	};

	const sortedTokens = useMemo(
		() => sortTokens(realTimeTokens, sortKey, sortDirection),
		[realTimeTokens, sortKey, sortDirection]
	);

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
				<div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
					<svg
						className="w-8 h-8 text-red-600 dark:text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
					Connection Error
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-4">
					Failed to connect to real-time data feed. Please check your
					connection.
				</p>
				<button
					onClick={() => window.location.reload()}
					className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded transition-colors"
				>
					Retry Connection
				</button>
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					{/* Fixed Header */}
					<div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
						<Table>
							<TableHeader
								columns={columns}
								sortKey={sortKey}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
						</Table>
					</div>

					{/* Scrollable Body */}
					<div className="max-h-[calc(100vh-300px)] overflow-y-auto">
						{isLoading ? (
							<LoadingSkeleton />
						) : (
							<Table>
								<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
									{sortedTokens.map((token) => {
										const previousToken =
											previousTokens.find(
												(t) => t.id === token.id
											);
										return (
											<TableRow
												key={token.id}
												className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
											>
												<TableCell align="left">
													<span className="font-semibold text-gray-900 dark:text-white">
														{token.name}
													</span>
													<span className="block text-xs text-gray-400 dark:text-gray-500">
														{token.pair}
													</span>
												</TableCell>
												<TableCell align="right">
													<span className="text-gray-900 dark:text-white">
														$
														{token.marketCap.toLocaleString()}
													</span>
												</TableCell>
												<TableCell align="right">
													<span className="text-gray-900 dark:text-white">
														$
														{token.liquidity.toLocaleString()}
													</span>
												</TableCell>
												<TableCell align="right">
													<span className="text-gray-900 dark:text-white">
														$
														{token.volume.toLocaleString()}
													</span>
												</TableCell>
												<TableCell align="right">
													<span className="text-gray-900 dark:text-white">
														{token.txns.toLocaleString()}
													</span>
												</TableCell>
												<TableCell align="center">
													<AuditPopover
														audited={token.audit}
													/>
												</TableCell>
												<TableCell align="right">
													<PriceCell
														price={token.price}
														priceChange={
															token.priceChange
														}
														previousPrice={
															previousToken?.price
														}
													/>
												</TableCell>
												<TableCell align="center">
													<TradeTooltip>
														<button
															className="px-3 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs rounded transition-colors"
															onClick={() =>
																handleTradeClick(
																	token
																)
															}
														>
															Trade
														</button>
													</TradeTooltip>
												</TableCell>
											</TableRow>
										);
									})}
								</tbody>
							</Table>
						)}
					</div>
				</div>
				<TradeModal
					open={tradeModalOpen}
					onOpenChange={setTradeModalOpen}
					token={selectedToken}
				/>
			</div>
		</ErrorBoundary>
	);
};

export default TokenTable;
