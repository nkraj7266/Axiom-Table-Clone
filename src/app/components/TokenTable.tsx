"use client";

import React, { useState, useMemo } from "react";
import { dummyTokens, Token } from "../dummyTokens";
import Table from "./Table";
import TableHeader, { TableColumn } from "./TableHeader";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import AuditPopover from "./AuditPopover";
import TradeTooltip from "./TradeTooltip";
import TradeModal from "./TradeModal";

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
		() => sortTokens(dummyTokens, sortKey, sortDirection),
		[sortKey, sortDirection]
	);

	return (
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
					<Table>
						<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
							{sortedTokens.map((token) => (
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
											${token.marketCap.toLocaleString()}
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="text-gray-900 dark:text-white">
											${token.liquidity.toLocaleString()}
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="text-gray-900 dark:text-white">
											${token.volume.toLocaleString()}
										</span>
									</TableCell>
									<TableCell align="right">
										<span className="text-gray-900 dark:text-white">
											{token.txns.toLocaleString()}
										</span>
									</TableCell>
									<TableCell align="center">
										<AuditPopover audited={token.audit} />
									</TableCell>
									<TableCell align="right">
										<span className="text-gray-900 dark:text-white">
											$
											{token.price.toLocaleString(
												undefined,
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												}
											)}
										</span>
									</TableCell>
									<TableCell
										align="right"
										className={
											token.priceChange >= 0
												? "text-green-600 dark:text-green-400 font-medium"
												: "text-red-600 dark:text-red-400 font-medium"
										}
									>
										{token.priceChange}%
									</TableCell>
									<TableCell align="center">
										<TradeTooltip>
											<button
												className="px-3 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs rounded transition-colors"
												onClick={() =>
													handleTradeClick(token)
												}
											>
												Trade
											</button>
										</TradeTooltip>
									</TableCell>
								</TableRow>
							))}
						</tbody>
					</Table>
				</div>
			</div>
			<TradeModal
				open={tradeModalOpen}
				onOpenChange={setTradeModalOpen}
				token={selectedToken}
			/>
		</div>
	);
};

export default TokenTable;
