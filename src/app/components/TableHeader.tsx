import React from "react";

type SortDirection = "asc" | "desc";

export type TableColumn = {
	key: string;
	label: string;
	sortable?: boolean;
	align?: "left" | "right" | "center";
};

type TableHeaderProps = {
	columns: TableColumn[];
	sortKey: string;
	sortDirection: SortDirection;
	onSort: (key: string) => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({
	columns,
	sortKey,
	sortDirection,
	onSort,
}) => (
	<thead>
		<tr className="bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
			{columns.map((col) => (
				<th
					key={col.key}
					className={`px-4 py-3 text-${
						col.align || "left"
					} select-none ${
						col.sortable
							? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
							: "cursor-default"
					}`}
					onClick={() => col.sortable && onSort(col.key)}
				>
					<span className="flex items-center gap-1">
						{col.label}
						{col.sortable && sortKey === col.key && (
							<span className="text-blue-600 dark:text-blue-400">
								{sortDirection === "asc" ? "▲" : "▼"}
							</span>
						)}
					</span>
				</th>
			))}
		</tr>
	</thead>
);

export default TableHeader;
