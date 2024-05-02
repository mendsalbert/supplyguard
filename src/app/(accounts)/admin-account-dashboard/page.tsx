import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  RectangleGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";

const AccountSavelists = () => {
  const renderSection1 = () => {
    return (
      <div className="space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="py-8 px-4 ring-1 ring-gray-300 bg-white rounded-lg shadow-sm ">
            <div className="text-base text-gray-400 ">Net Revenue</div>
            <div className="flex items-center justify-between pt-1">
              <div className="text-2xl font-bold text-gray-900 ">$106.50</div>
              <CurrencyDollarIcon className="w-9 h-9 text-gray-700" />
            </div>
          </div>
          <div className="py-8 px-4 ring-1 ring-gray-300 bg-white rounded-lg shadow-sm ">
            <div className="text-base text-gray-400 ">Customers</div>
            <div className="flex items-center justify-between pt-1">
              <div className="text-2xl font-bold text-gray-900 ">2</div>
              <UsersIcon className="w-9 h-9 text-gray-700" />
            </div>
          </div>

          <div className="py-8 px-4 ring-1 ring-gray-300 bg-white rounded-lg shadow-sm ">
            <div className="text-base text-gray-400 ">Total Products</div>
            <div className="flex items-center justify-between pt-1">
              <div className="text-2xl font-bold text-gray-900 ">3</div>
              <RectangleGroupIcon className="w-9 h-9 text-gray-700" />
            </div>
          </div>
          <div className="py-8 px-4 ring-1 ring-gray-300 bg-white rounded-lg shadow-sm ">
            <div className="text-base text-gray-400 ">Successful Orders</div>
            <div className="flex items-center justify-between pt-1">
              <div className="text-2xl font-bold text-gray-900 ">2</div>
              <CheckCircleIcon className="w-9 h-9 text-gray-700" />
            </div>
          </div>
          <div className="py-8 px-4 ring-1 ring-gray-300 bg-white rounded-lg shadow-sm ">
            <div className="text-base text-gray-400 ">Unsuccessful Orders</div>
            <div className="flex items-center justify-between pt-1">
              <div className="text-2xl font-bold text-gray-900 ">0</div>
              <XCircleIcon className="w-9 h-9 text-gray-700" />
            </div>
          </div>
        </div>
        <div className="flex !mt-20 justify-center items-center">
          {/* <ButtonSecondary loading>Show me more</ButtonSecondary> */}
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
