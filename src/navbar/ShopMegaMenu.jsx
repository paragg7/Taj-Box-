// src/components/Navbar/ShopMegaMenu.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import categoryData from "@/products/cate";

const ShopMegaMenu = ({
  open,
  categories = [],
  onClose,
  viewAllHref = "/categories",
  limit = 8,
}) => {
  const [hovered, setHovered] = useState(0);
  const navigate = useNavigate();

  const items = useMemo(() => categories.slice(0, limit), [categories, limit]);

  const mergedItems = useMemo(() => {
    return items.map((item) => {
      const match = categoryData.find(
        (v) =>
          v.link === `/shop/${item.slug}` ||
          v.name.toLowerCase() === item.name?.toLowerCase(),
      );

      return {
        ...item,
        image: match?.image,
        desc: match?.desc,
      };
    });
  }, [items]);

  const activeCategory = mergedItems[hovered] || mergedItems[0];

  const goCategory = (c) => {
    const slug = c?.slug;
    if (!slug) return;
    onClose?.();
    navigate(`/shop/${slug}`);
  };

  if (!open) return null;

  return (
    <div
      className="
        absolute left-1/2 top-full -translate-x-1/2 mt-3
        w-[92vw] max-w-[860px]
        border border-black/[0.07]
        bg-white
        z-[9999]
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
      onMouseDown={(e) => e.preventDefault()}
      onMouseLeave={() => setHovered(0)}
      role="menu"
      aria-label="Shop categories"
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between px-9 py-5 border-b border-black/[0.07]">
        <h3 className="text-[11px] uppercase tracking-[0.08em] text-black/65">
          Browse categories
        </h3>

        <Link
          to={viewAllHref}
          onClick={() => onClose?.()}
          className="
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-black/45
            transition-colors duration-200
            hover:text-black/75
          "
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT SIDE */}
        <div className="border-r border-black/[0.07]">
          <ul className="grid grid-cols-1">
            {mergedItems.map((c, idx) => (
              <li
                key={c.slug || c.name}
                className="border-b border-black/[0.07] last:border-b-0"
              >
                <button
                  type="button"
                  onMouseEnter={() => setHovered(idx)}
                  onFocus={() => setHovered(idx)}
                  onClick={() => goCategory(c)}
                  className={`
                    w-full text-left px-9 py-[22px]
                    transition-colors duration-200
                    focus:outline-none
                    ${
                      hovered === idx
                        ? "bg-black/[0.025]"
                        : "hover:bg-black/[0.012]"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-5">
                    <span className="truncate text-[13px] tracking-[0.015em] text-black/90">
                      {c.name}
                    </span>

                    <span className="shrink-0 text-[9px] uppercase tracking-[0.18em] text-black/25">
                      {c.count} {c.count === 1 ? "product" : "products"}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex flex-col justify-center">
          {activeCategory && (
            <div className="px-9 py-6">
              <div className="overflow-hidden">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="h-[260px] w-full object-cover transition-transform duration-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopMegaMenu;
