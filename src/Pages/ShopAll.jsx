// ShopAll.jsx
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { products } from "../products/Item";
import { Link } from "react-router-dom";
import Products from "@/components/Products";
import ShopFilters from "@/util/ShopFilters";
import { Menu, X } from "lucide-react";

const ShopAll = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    categories: [],
  });

  const totalCount = products.length;

  const filteredProducts = useMemo(() => {
    const { categories } = appliedFilters;

    if (!categories || categories.length === 0) return products;

    return products.filter((p) => categories.includes((p.category || "").trim()));
  }, [appliedFilters]);

  const handleApplyFilters = useCallback((filters) => {
    setAppliedFilters(filters);
    setIsMobileFilterOpen(false);
  }, []);

  // ✅ close on ESC + lock scroll (mobile filters)
  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileFilterOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileFilterOpen]);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile Filters Bar */}
      <div className="mb-6 lg:hidden">
        <div className="px-1 sm:px-1">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full h-12 border border-gray-300 bg-white px-4 flex items-center justify-between"
            aria-label="Open filters"
          >
            <span className="text-sm uppercase tracking-widest text-gray-900">
              Filters
            </span>
            <span className="text-lg leading-none">
              <Menu className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <ShopFilters value={appliedFilters} onFilterChange={handleApplyFilters} />
          </div>
        </aside>

        {/* Products Section */}
        <section>
          {/* Product Count */}
          <div className="mb-6 text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900">{totalCount}</span>{" "}
            products
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                >
                  <Products
                    image1={product.image1}
                    image2={product.image2}
                    name={product.name}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    isNew={product.isNew}
                    discount={product.discount}
                    colors={product.colors}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 bg-white p-10 text-center">
              <div className="text-base font-semibold text-gray-900">
                No products found
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Try removing some filters to see more results.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filters - Sheet (no shadows, no blur) */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-label="Close filters backdrop"
          />

          {/* Panel */}
          <div className="absolute inset-x-0 bottom-0 h-[92vh] bg-white border-t border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div className="text-sm uppercase tracking-widest text-gray-900">
                Filters
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="h-10 w-10 grid place-items-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-6 overflow-y-auto h-[calc(92vh-72px)]">
              <ShopFilters value={appliedFilters} onFilterChange={handleApplyFilters} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ShopAll;
