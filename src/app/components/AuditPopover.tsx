import * as Popover from "@radix-ui/react-popover";
import React from "react";

const AuditPopover: React.FC<{ audited: boolean }> = ({ audited }) => (
	<Popover.Root>
		<Popover.Trigger asChild>
			<button
				className={`inline-block px-2 py-1 text-xs rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
					audited
						? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
						: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
				}`}
				tabIndex={0}
				aria-label="Show audit details"
			>
				{audited ? "Yes" : "No"}
			</button>
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content
				sideOffset={8}
				className="z-50 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-4 text-sm text-gray-700 dark:text-gray-300 w-56"
			>
				<div className="font-semibold mb-1 text-gray-900 dark:text-white">
					Audit Status
				</div>
				<div>
					{audited
						? "This token has passed a third-party smart contract audit."
						: "This token has not passed a third-party smart contract audit. Trade with caution."}
				</div>
				<Popover.Arrow className="fill-white dark:fill-gray-800" />
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
);

export default AuditPopover;
