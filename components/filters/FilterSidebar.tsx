// components/filters/FilterSidebar.tsx
"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

// Props-এর জন্য টাইপ ডিফাইন করা হলো
interface FilterSidebarProps {
  brands: string[];
  genders: string[];
  mainCategories: string[];
  subCategories: string[];
  sizes: string[];
  filters: {
    priceRange: [number, number];
    brands: string[];
    genders: string[];
    mainCategories: string[];
    subCategories: string[];
    sizes: string[];
  };
  onFilterChange: (type: string, value: string | [number, number]) => void;
}

const FilterSidebar = ({
  brands,
  genders,
  mainCategories,
  subCategories,
  sizes,
  filters,
  onFilterChange,
}: FilterSidebarProps) => {
  return (
    <aside className="border rounded-md w-full md:w-1/4 lg:w-1/5">
      {/* Price Filter */}
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-4">PRICE</h3>
        <Slider
          range
          min={0}
          max={100000}
          value={filters.priceRange}
          onChange={(value) =>
            onFilterChange("priceRange", value as [number, number])
          }
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm mt-2">
          <span>৳{filters.priceRange[0].toLocaleString()}</span>
          <span>৳{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Main Category Filter */}
      {mainCategories.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-2">CATEGORY</h3>
          <div className="space-y-1 text-sm h-48 overflow-y-auto">
            {mainCategories.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={filters.mainCategories.includes(category)}
                  onChange={(e) =>
                    onFilterChange("mainCategories", e.target.value)
                  }
                />
                <label htmlFor={category} className="ml-2 uppercase">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Category Filter */}
      {subCategories.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-2">SUB CATEGORY</h3>
          <div className="space-y-1 text-sm h-48 overflow-y-auto">
            {subCategories.map((subCategory) => (
              <div key={subCategory}>
                <input
                  type="checkbox"
                  id={subCategory}
                  value={subCategory}
                  checked={filters.subCategories.includes(subCategory)}
                  onChange={(e) =>
                    onFilterChange("subCategories", e.target.value)
                  }
                />
                <label htmlFor={subCategory} className="ml-2 uppercase">
                  {subCategory}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gender Filter */}
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-2">GENDER</h3>
        <div className="space-y-1 text-sm">
          {genders.map((gender) => (
            <div key={gender}>
              <input
                type="checkbox"
                id={gender}
                value={gender}
                checked={filters.genders.includes(gender)}
                onChange={(e) => onFilterChange("genders", e.target.value)}
              />
              <label htmlFor={gender} className="ml-2 uppercase">
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-2">BRANDS</h3>
        <div className="space-y-1 text-sm h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand}>
              <input
                type="checkbox"
                id={brand}
                value={brand}
                checked={filters.brands.includes(brand)}
                onChange={(e) => onFilterChange("brands", e.target.value)}
              />
              <label htmlFor={brand} className="ml-2 uppercase">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      {sizes.length > 0 && (
        <div className="p-4">
          <h3 className="font-semibold mb-2">SIZE</h3>
          <div className="space-y-1 text-sm h-48 overflow-y-auto">
            {sizes.map((size) => (
              <div key={size}>
                <input
                  type="checkbox"
                  id={size}
                  value={size}
                  checked={filters.sizes.includes(size)}
                  onChange={(e) => onFilterChange("sizes", e.target.value)}
                />
                <label htmlFor={size} className="ml-2 uppercase">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
export default FilterSidebar;
