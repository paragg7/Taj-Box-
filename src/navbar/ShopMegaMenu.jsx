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
    // ✅ must have slug from useCategories
    const slug = c?.slug;
    if (!slug) return;

    onClose?.(); // close menu
    navigate(`/shop/${slug}`); // go to category page
  };

  if (!open) return null;

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-white border border-black/10 z-[9999]"
      onMouseDown={(e) => e.preventDefault()}
      onMouseLeave={() => setHovered(-1)}
    >
      <div className="p-2">
        <div className="px-2 py-2 text-xs text-black/60">Browse categories</div>

        <ul className="p-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
          {items.map((c, idx) => (
            <li key={c.name}>
              <button
                type="button"
                onMouseEnter={() => setHovered(idx)}
                onClick={() => goCategory(c)}
                className={`w-full flex items-center justify-between px-3 py-3 transition text-left ${
                  hovered === idx ? "bg-black/5" : "hover:bg-black/5"
                }`}
              >
                <div className="min-w-0">
                  <div className="text-sm font-normal truncate">{c.name}</div>
                  <div className="text-[11px] text-black/45 font-normal ">
                    {c.count} {c.count === 1 ? "product" : "products"}
                  </div>
                </div>
                <div className="text-xs text-black/35">→</div>
              </button>
            </li>
          ))}
        </ul>

        <div className="p-2">
          <Link
            to={viewAllHref}
            onClick={() => onClose?.()}
            className="block text-center border border-black/10 py-3 text-xs uppercase tracking-[0.22em] text-black/70 hover:bg-black/5 transition"
          >
            View all products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShopMegaMenu;
