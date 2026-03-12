import React from "react";
import { Link } from "react-router-dom";
import categories from "@/products/cate";

const AllCategoriesPage = () => {
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.22em] text-[#1E2220]">
          All Categories
        </h1>

        <div className="text-[11px] uppercase tracking-[0.22em] text-[#1E2220]/60">
          Showing{" "}
          <span className="text-[#1E2220] font-medium">
            {categories.length}
          </span>{" "}
          categories
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {categories.map((item) => (
          <Link key={item.id} to={item.link} className="block group">
            <div className="relative w-full overflow-hidden border border-[#1E2220]/10 h-[240px] sm:h-[280px] lg:h-[300px]">
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-white/60 backdrop-blur-sm text-[#1E2220] text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 py-2">
                  {item.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AllCategoriesPage;