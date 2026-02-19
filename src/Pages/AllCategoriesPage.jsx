import React from "react";
import { Link } from "react-router-dom";

const AllCategoriesPage = () => {
  const items = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&auto=format&fit=crop&q=60",
      name: "MDF BOX",
      link: "/shop/mdf-box",
      desc: "Rigid luxury boxes with premium finishing options.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1728034261578-afe827e282a2?w=600&auto=format&fit=crop&q=60",
      name: "FILE BOX",
      link: "/shop/file-box",
      desc: "Structured packaging designed for elegance and order.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "DHOLLU",
      link: "/shop/dhollu",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 4,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "CAKE BOX",
       link: "/shop/cake-box",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 5,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "PLATTER BOX",
      link: "/shop/platter-box",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 6,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "SWEETS BOX",
      link: "/shop/sweets-box",
      desc: "Classic styles with traditional wedding presentation.",
    },{
      id: 7,
      image:
        "https://images.unsplash.com/photo-1700107650924-d42d35552841?w=600&auto=format&fit=crop&q=60",
      name: "HAMPER BOX",
      link: "/shop/hamper-box",
      desc: "Classic styles with traditional wedding presentation.",
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
