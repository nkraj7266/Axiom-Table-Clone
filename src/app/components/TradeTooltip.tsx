import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

type TradeTooltipProps = {
	children: React.ReactNode;
};

const TradeTooltip: React.FC<TradeTooltipProps> = ({ children }) => (
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					sideOffset={6}
					className="z-50 rounded bg-gray-900 dark:bg-gray-700 text-white px-3 py-1 text-xs shadow-lg select-none"
				>
					Trade this token
					<Tooltip.Arrow className="fill-gray-900 dark:fill-gray-700" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	</Tooltip.Provider>
);

export default TradeTooltip;
