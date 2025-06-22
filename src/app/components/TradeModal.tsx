import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import type { Token } from "../dummyTokens";

interface TradeModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	token: Token | null;
}

const TradeModal: React.FC<TradeModalProps> = ({
	open,
	onOpenChange,
	token,
}) => (
	<Dialog.Root open={open} onOpenChange={onOpenChange}>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
			<Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 focus:outline-none border border-gray-200 dark:border-gray-700">
				<Dialog.Title className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
					Trade {token?.name}
				</Dialog.Title>
				<Dialog.Description className="mb-4 text-gray-500 dark:text-gray-400">
					This is a placeholder for trading actions for{" "}
					<span className="font-semibold text-gray-900 dark:text-white">
						{token?.symbol}
					</span>
					.
				</Dialog.Description>
				<div className="mb-4">
					<div className="text-sm text-gray-700 dark:text-gray-300">
						Pair: {token?.pair}
					</div>
					<div className="text-sm text-gray-700 dark:text-gray-300">
						Price: $
						{token?.price.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</div>
				</div>
				<button
					className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded transition-colors"
					onClick={() => onOpenChange(false)}
				>
					Close
				</button>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default TradeModal;
