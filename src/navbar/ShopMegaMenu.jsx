// src/components/Navbar/ShopMegaMenu.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShopMegaMenu = ({
  open,
  categories = [], // expects: [{ name, count, slug }]
  onClose,
  viewAllHref = "/categories",
  limit = 8,
}) => {
  const [hovered, setHovered] = useState(-1);
  const navigate = useNavigate();

  const items = useMemo(() => categories.slice(0, limit), [categories, limit]);

  const goCategory = (c) => {
    const slug = c?.slug;
    if (!slug) return;
    onClose?.();
    navigate(`/shop/${slug}`);
  };

  if (!open) return null;

  return (
    <div
      className="absolute left-1/2 top-full -translate-x-1/2 mt-4 w-[92vw] max-w-[760px] border border-black/10 bg-white z-[9999]"
      onMouseDown={(e) => e.preventDefault()}
      onMouseLeave={() => setHovered(-1)}
      role="menu"
      aria-label="Shop categories"
    >
      <div className="px-5 py-4 border-b border-black/10 flex items-center justify-between gap-4">
        <div>
          
          <h3 className="mt-1 text-sm  sm:text-[15px]  text-black">
            Browse categories
          </h3>
        </div>

        <Link
          to={viewAllHref}
          onClick={() => onClose?.()}
           className="
              group
              relative
              text-xs xs:text-sm
              uppercase
              tracking-widest
              text-black
              transition
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-black/30
            "
        >
          View all
           <span className="block h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-1" />
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2" role="none">
        {items.map((c, idx) => (
          <li
            key={c.slug || c.name}
            className="border-b border-black/10 md:[&:nth-last-child(-n+2)]:border-b-0 md:border-r-0 odd:md:border-r odd:md:border-black/10"
            role="none"
          >
            <button
              type="button"
              role="menuitem"
              onMouseEnter={() => setHovered(idx)}
              onFocus={() => setHovered(idx)}
              onClick={() => goCategory(c)}
              className={`group w-full px-5 py-4 text-left transition-colors duration-200 focus:outline-none focus:bg-black/[0.04] ${
                hovered === idx ? "bg-black/[0.04]" : "hover:bg-black/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm sm:text-[15px]  text-black truncate">
                    {c.name}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/40">
                    {c.count} {c.count === 1 ? "product" : "products"}
                  </div>
                </div>

                
              </div>
            </button>
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default ShopMegaMenu;