import React from "react";

type TableProps = {
	children: React.ReactNode;
	className?: string;
};

const Table: React.FC<TableProps> = ({ children, className = "" }) => (
	<table className={`min-w-full ${className}`}>{children}</table>
);

export default Table;
