// ShopFilters.jsx
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { products } from "../products/Item";

const EMPTY = { categories: [] };

const ShopFilters = ({ onFilterChange, value }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
  });

  // ✅ local (draft) filters for checkboxes
  const [selectedFilters, setSelectedFilters] = useState(value ?? EMPTY);

  // ✅ search within categories
  const [categoryQuery, setCategoryQuery] = useState("");

  useEffect(() => {
    setSelectedFilters(value ?? EMPTY);
  }, [value]);

  // ✅ build categories + exact counts from products
  const categories = useMemo(() => {
    const map = new Map();

    (products || []).forEach((p) => {
      const cat = (p?.category || "").trim();
      if (!cat) return;
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, categoryQuery]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterSelect = (filterName) => {
    setSelectedFilters((prev) => {
      const current = prev.categories || [];
      const isSelected = current.includes(filterName);

      return {
        categories: isSelected
          ? current.filter((f) => f !== filterName)
          : [...current, filterName],
      };
    });
  };

  const applyFilters = () => {
    onFilterChange?.(selectedFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters(EMPTY);
    setCategoryQuery("");
    onFilterChange?.(EMPTY);
  };

  const totalFiltersCount = (selectedFilters.categories || []).length;

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-normal text-gray-900">Filters</h2>
      </div>

      {/* Done + Clear */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={applyFilters}
          className="flex-1 bg-black text-white py-3 rounded-sm text-sm font-semibold hover:bg-black/90 transition"
        >
          Done
        </button>

        <button
          onClick={clearAllFilters}
          disabled={totalFiltersCount === 0}
          className={`flex-1 border py-3 rounded-sm text-sm font-semibold transition ${
            totalFiltersCount === 0
              ? "border-gray-300 text-gray-400 opacity-40 cursor-not-allowed"
              : "border-gray-300 text-gray-900 hover:bg-gray-100"
          }`}
        >
          Clear
        </button>
      </div>

      {/* Active Filters (chips) */}
      {totalFiltersCount > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.categories.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterSelect(filter)}
                className="inline-flex items-center gap-2 bg-black text-white text-xs px-3 py-1.5 hover:bg-gray-800 transition-colors"
              >
                {filter}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 mb-6" />

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("categories")}
          className="w-full flex justify-between items-center mb-4 group"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Categories
            </h3>
            {totalFiltersCount > 0 && (
              <span className="text-xs text-gray-500">
                ({totalFiltersCount})
              </span>
            )}
          </div>

          {openSections.categories ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {openSections.categories && (
          <>
            {/* Search */}
            <div className="mb-4">
              <input
                value={categoryQuery}
                onChange={(e) => setCategoryQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-full h-11 border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
              />
            </div>

            {/* Scrollable list (better UX when many categories) */}
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {filteredCategories.map((category) => (
                <label
                  key={category.name}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.categories.includes(category.name)}
                    onChange={() => handleFilterSelect(category.name)}
                    className="w-4 h-4 border-2 border-gray-300 rounded-sm text-black focus:ring-0 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-gray-900 group-hover:text-black">
                    {category.name}
                    <span className="text-gray-500 ml-1">
                      ({category.count})
                    </span>
                  </span>
                </label>
              ))}

              {filteredCategories.length === 0 && (
                <div className="text-sm text-gray-500 py-2">
                  No categories match “{categoryQuery}”.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default ShopFilters;
