// src/components/Navbar/ShopMegaMenu.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShopMegaMenu = ({
  open,
  categories = [],
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
      className="
        absolute left-1/2 top-full -translate-x-1/2 mt-3
        w-[84vw] max-w-[500px]
        border border-black/[0.07]
        bg-white
        z-[9999]
      "
      onMouseDown={(e) => e.preventDefault()}
      onMouseLeave={() => setHovered(-1)}
      role="menu"
      aria-label="Shop categories"
    >
      <div className="flex items-center justify-between px-7 py-4 border-b border-black/[0.07]">
        <h3 className="text-[11px] tracking-[0.03em] text-black/65">
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
            focus:outline-none
          "
        >
          View all
        </Link>
      </div>

      <ul className="grid grid-cols-1" role="none">
        {items.map((c, idx) => (
          <li
            key={c.slug || c.name}
            className="border-b border-black/[0.07] last:border-b-0"
            role="none"
          >
            <button
              type="button"
              role="menuitem"
              onMouseEnter={() => setHovered(idx)}
              onFocus={() => setHovered(idx)}
              onClick={() => goCategory(c)}
              className={`
                w-full text-left px-7 py-[18px]
                transition-colors duration-200
                focus:outline-none
                ${hovered === idx ? "bg-black/[0.012]" : "hover:bg-black/[0.012]"}
              `}
            >
              <div className="flex items-center justify-between gap-5">
                <span className="truncate text-[13px] tracking-[0.015em] text-black/92">
                  {c.name}
                </span>

                <span className="shrink-0 text-[9px] uppercase tracking-[0.19em] text-black/24">
                  {c.count} {c.count === 1 ? "product" : "products"}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopMegaMenu;