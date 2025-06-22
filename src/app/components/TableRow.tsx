import React from "react";

type TableRowProps = {
	children: React.ReactNode;
	className?: string;
};

const TableRow: React.FC<TableRowProps> = ({ children, className = "" }) => (
	<tr className={className}>{children}</tr>
);

export default TableRow;
