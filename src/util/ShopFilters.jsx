// ShopFilters.jsx
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
    <aside className="w-full text-black">
      {/* Header */}
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-black">
          Filters
        </h2>

        {totalFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-black/40 transition-colors duration-200 hover:text-black"
          >
            Clear
          </button>
        )}
      </div>

      {/* Section Heading */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-black/45">
          Categories
        </h3>

        {totalFiltersCount > 0 && (
          <span className="text-[10px] text-black/28">{totalFiltersCount}</span>
        )}
      </div>

      {/* Category List */}
      <div className="space-y-1">
        {categories.map((category) => {
          const checked = selectedFilters.categories.includes(category.name);

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => handleFilterSelect(category.name)}
              className="group w-full flex items-center justify-between py-[11px] text-left"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`relative block h-[13px] w-[13px] border transition-all duration-200 ${
                    checked
                      ? "border-black"
                      : "border-black/15 group-hover:border-black/35"
                  }`}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                      checked ? "bg-black scale-100" : "bg-black scale-0"
                    }`}
                  />
                </span>

                <span
                  className={`truncate text-[12px] sm:text-[13px] uppercase tracking-[0.09em] transition-all duration-200 ${
                    checked
                      ? "text-black"
                      : "text-black/60 group-hover:text-black/82"
                  }`}
                >
                  {category.name}
                </span>
              </div>

              <span
                className={`ml-4 shrink-0 transition-all duration-200 ${
                  checked
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-1"
                }`}
              >
                <X className="h-[12px] w-[12px] text-black/55" />
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default ShopFilters;