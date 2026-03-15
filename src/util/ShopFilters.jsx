import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { products } from "../products/Item";

const EMPTY = { categories: [] };

const ShopFilters = ({ onFilterChange, value }) => {
  const [selectedFilters, setSelectedFilters] = useState(value ?? EMPTY);

  useEffect(() => {
    setSelectedFilters(value ?? EMPTY);
  }, [value]);

  const categories = useMemo(() => {
    const map = new Map();

    (products || []).forEach((p) => {
      const cat = (p?.category || "").trim();
      if (!cat) return;
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name]) => ({ name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const updateFilters = (nextFilters) => {
    setSelectedFilters(nextFilters);
    onFilterChange?.(nextFilters);
  };

  const handleFilterSelect = (filterName) => {
    const current = selectedFilters.categories || [];
    const isSelected = current.includes(filterName);

    const nextFilters = {
      categories: isSelected
        ? current.filter((f) => f !== filterName)
        : [...current, filterName],
    };

    updateFilters(nextFilters);
  };

  const clearAllFilters = () => {
    updateFilters(EMPTY);
  };

  const totalFiltersCount = (selectedFilters.categories || []).length;

  return (
    <aside className="w-full bg-[#FAF9F6] text-[#1E2220]">
      {/* Header */}
      <div className=" flex items-baseline justify-between border-b border-[#EAE8E2] pb-4">
        <h2 className="text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.18em] text-[#1E2220]">
          Filters
        </h2>

        {totalFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#1E2220]/60 transition-colors duration-200 hover:text-[#1E2220]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Section Heading
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[13px] sm:text-[15px] font-medium uppercase tracking-[0.22em] text-[#1E2220]">
          Categories
        </h3>

        {totalFiltersCount > 0 && (
          <span className="text-[11px] text-[#1E2220]/40">
            {totalFiltersCount}
          </span>
        )}
      </div> */}

      {/* Category List */}
      <div>
        {categories.map((category) => {
          const checked = selectedFilters.categories.includes(category.name);

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => handleFilterSelect(category.name)}
              className="group w-full flex items-center justify-between py-[11px] border-b border-[#EAE8E2] text-left transition-colors duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Checkbox */}
                {/* Checkbox */}
                <span
                  className={`relative flex h-[16px] w-[16px] items-center justify-center border transition-all duration-200 ${
                    checked
                      ? "border-[#1E2220]"
                      : "border-[#1E2220]/30 group-hover:border-[#1E2220]"
                  }`}
                >
                  <span
                    className={`absolute inset-0 transition-all duration-200 ${
                      checked ? "bg-[#1E2220] scale-100" : "scale-0"
                    }`}
                  />
                </span>

                {/* Category Name */}
                <span
                  className={`truncate text-[12px] sm:text-[13px] uppercase tracking-[0.09em] transition-all duration-200 ${
                    checked
                      ? "text-[#1E2220]"
                      : "text-[#1E2220]/60 group-hover:text-[#1E2220]"
                  }`}
                >
                  {category.name}
                </span>
              </div>

              {/* Remove Icon */}
              <span
                className={`ml-4 shrink-0 transition-all duration-200 ${
                  checked
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-1"
                }`}
              >
                <X className="h-[18px] w-[18px] text-[#1E2220]/50" />
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default ShopFilters;
