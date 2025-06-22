import React from "react";

type TableCellProps = {
	children: React.ReactNode;
	align?: "left" | "right" | "center";
	className?: string;
};

const TableCell: React.FC<TableCellProps> = ({
	children,
	align = "left",
	className = "",
}) => (
	<td
		className={`px-4 py-3 text-${align} text-gray-900 dark:text-gray-100 ${className}`}
	>
		{children}
	</td>
);

export default TableCell;
