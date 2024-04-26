import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export interface PricesProps {
  className?: string;
  price?: number;
  contentClass?: string;
  art?: boolean;
  qualitySelected?: any;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 33,
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
  art,
  qualitySelected,
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        {art ? (
          <span className="text-green-500 !leading-none">
            {String(price)} ETH
          </span>
        ) : (
          // <div className="text-green-500 flex items-center flex-row space-x-1 w-full">
          <span className="text-green-500 !leading-none">
            ${Number(price) * qualitySelected || Number(price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Prices;
