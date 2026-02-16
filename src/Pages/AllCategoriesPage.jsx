import React from "react";
import { Link } from "react-router-dom";

const AllCategoriesPage = () => {
  const items = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&auto=format&fit=crop&q=60",
      name: "MDF Boxes",
      link: "/shop/mdf-box", // ✅ matches Home.jsx
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1728034261578-afe827e282a2?w=600&auto=format&fit=crop&q=60",
      name: "File Boxes",
      link: "/shop/file-box", // ✅ matches Home.jsx
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "Dhollu",
      link: "/shop/dhollu", // ✅ matches Home.jsx
    },
  ];

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-semibold uppercase text-gray-900">
          All Categories
        </h1>

        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {items.length}
          </span>{" "}
          categories
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {items.map((item) => (
          <Link key={item.id} to={item.link} className="block group">
            <div className="relative w-full overflow-hidden border border-black/10 h-[240px] sm:h-[280px] lg:h-[300px]">
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-white/60 backdrop-blur-sm text-black text-[11px] sm:text-xs font-bold uppercase tracking-wider px-4 py-2">
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
