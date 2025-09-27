// components/filters/FilterSidebar.tsx
"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

// Props Interfaces
interface FilterOption {
  name: string;
  count: number;
}
interface Filters {
  priceRange: [number, number];
  brands: string[];
  categories: string[];
}

interface FilterSidebarProps {
  brands: FilterOption[];
  categories: FilterOption[];
  filters: Filters;
  onFilterChange: (type: string, value: string | [number, number]) => void;
}

// Reusable Filter Section Component
const FilterSection = ({
  title,
  options,
  filterKey,
  filters,
  onFilterChange,
}: {
  title: string;
  options: FilterOption[];
  filterKey: "brands" | "categories";
  filters: Filters;
  onFilterChange: (type: string, value: string | [number, number]) => void;
}) => (
  <Disclosure defaultOpen>
    {({ open }) => (
      <div>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200">
          <span>{title}</span>
          <ChevronUp
            className={`${
              open ? "rotate-180 transform" : ""
            } h-5 w-5 text-gray-500 transition-transform`}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    id={`${filterKey}-${option.name}`}
                    type="checkbox"
                    checked={filters[filterKey].includes(option.name)}
                    onChange={() => onFilterChange(filterKey, option.name)}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor={`${filterKey}-${option.name}`}
                    className="ml-3 text-gray-600 cursor-pointer"
                  >
                    {option.name}
                  </label>
                </div>
                <span className="text-xs px-2 bg-gray-200 rounded-3xl text-gray-500">{option.count}</span>
              </div>
            ))}
          </div>
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
);

// Price Filter Component
const PriceFilter = ({
  filters,
  onFilterChange,
}: {
  filters: Filters;
  onFilterChange: (type: string, value: string | [number, number]) => void;
}) => {
  const maxPrice = 20000;

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200">
            <span>Price</span>
            <ChevronUp
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-gray-500 transition-transform`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFilterChange("priceRange", [
                    filters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>৳0</span>
                <span>Up to ৳{filters.priceRange[1].toLocaleString()}</span>
                <span>৳{maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const FilterSidebar = ({
  brands,
  categories,
  filters,
  onFilterChange,
}: FilterSidebarProps) => {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-bold border-b pb-2">Filter By</h2>

      <PriceFilter filters={filters} onFilterChange={onFilterChange} />
      <FilterSection
        title="Product Categories"
        options={categories}
        filterKey="categories"
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <FilterSection
        title="Brands"
        options={brands}
        filterKey="brands"
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default FilterSidebar;