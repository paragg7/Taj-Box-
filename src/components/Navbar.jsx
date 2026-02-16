// Navbar.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { products } from "@/products/Item";

const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [searchOpen, setSearchOpen] = useState(false); // tablet search overlay

  // lock scroll + esc to close (mobile menu)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // esc to close (tablet search overlay)
  useEffect(() => {
    if (!searchOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const linkClass = ({ isActive }) =>
    `relative transition-colors ${
      isActive ? "text-black" : "text-black/80 hover:text-black"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full ${
      isActive ? "after:w-full" : ""
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-4 border-b border-black/10 text-sm uppercase tracking-wider transition ${
      isActive ? "text-black" : "text-black/80 hover:text-black"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg xs:text-xl md:text-2xl font-bold uppercase font-playfair text-black tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
          >
            Boxix
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center font-semibold gap-8 text-xs lg:text-sm uppercase">
            <li>
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={linkClass}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Desktop Full Search (lg only) */}
          <div className="hidden lg:block w-[460px]">
            <PremiumSearch products={products} onNavigate={() => setOpen(false)} />
          </div>

          {/* Tablet Search Icon (md only, lg hidden) */}
          <div className="hidden md:flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="h-11 w-11 border border-black/10 flex items-center justify-center hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              aria-label="Open search"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 border border-black/10 text-black hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/20"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute inset-x-0 top-0 bg-white border-b border-black/10">
            <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-black/60">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-11 w-11 border border-black/10 text-black hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <div className="border-t border-black/10" />

            {/* Mobile Search */}
            <div className="px-4 sm:px-6 py-4 border-b border-black/10">
              <PremiumSearch products={products} onNavigate={() => setOpen(false)} />
            </div>

            <ul className="flex flex-col">
              <li>
                <NavLink
                  to="/"
                  end
                  className={mobileLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={mobileLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Shop All
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={mobileLinkClass}
                  onClick={() => setOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="h-3" />
          </div>
        </div>
      )}

      {/* Tablet Search Overlay (md only) */}
      {searchOpen && (
        <div className="hidden md:block lg:hidden fixed inset-0 z-[80]">
          {/* Overlay */}
          <button
            type="button"
            className="absolute inset-0 bg-black/20"
            aria-label="Close search overlay"
            onClick={() => setSearchOpen(false)}
          />

          {/* Search Container */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[520px] max-w-[90%] bg-white border border-black/10">
            <div className="flex items-center justify-between px-4 h-14 border-b border-black/10">
              <span className="text-xs uppercase tracking-[0.22em] text-black/60">
                Search
              </span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="h-9 w-9 border border-black/10 flex items-center justify-center hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <PremiumSearch
                products={products}
                onNavigate={() => {
                  setSearchOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* ---------------- PREMIUM SEARCH ---------------- */

const normalize = (s) => String(s || "").toLowerCase().trim();

function PremiumSearch({ products = [], onNavigate }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1); // keyboard nav index
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // build categories list + counts
  const categories = useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => {
      const c = (p?.category || "").trim();
      if (!c) return;
      map.set(c, (map.get(c) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  // grouped results (ranking + min chars for products)
  const grouped = useMemo(() => {
    const query = normalize(q);
    if (!query) return { products: [], categories: [] };

    const canSearchProducts = query.length >= 2;

    const scoreText = (text, q) => {
      const t = normalize(text);
      if (!t) return 0;
      if (t === q) return 100;
      if (t.startsWith(q)) return 80;
      const words = t.split(/\s+/);
      if (words.some((w) => w.startsWith(q))) return 60;
      if (t.includes(q)) return 30;
      return 0;
    };

    const prod = canSearchProducts
      ? (products || [])
          .map((p, idx) => {
            const nameScore = scoreText(p?.name, query);
            const catScore = scoreText(p?.category, query);
            const score = nameScore * 2 + catScore; // name priority
            return { p, score, idx };
          })
          .filter((x) => x.score > 0)
          .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.idx - b.idx))
          .slice(0, 6)
          .map((x) => x.p)
      : [];

    const catRes = categories
      .map((c) => ({ ...c, score: scoreText(c.name, query) }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ score, ...rest }) => rest);

    return { products: prod, categories: catRes };
  }, [q, products, categories]);

  // flat list for keyboard nav
  const flat = useMemo(() => {
    const list = [];
    grouped.categories.forEach((c) => list.push({ type: "category", data: c }));
    grouped.products.forEach((p) => list.push({ type: "product", data: p }));
    return list;
  }, [grouped]);

  // close on outside click
  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const clear = () => {
    setQ("");
    setActive(-1);
    setOpen(false);
    inputRef.current?.focus();
  };

  const goProduct = (p) => {
    setOpen(false);
    setQ("");
    setActive(-1);
    onNavigate?.();
    navigate(`/product/${p.id}`);
  };

  const goCategory = (c) => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
    navigate(`/shop?category=${encodeURIComponent(c.name)}`);
    setQ("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
      inputRef.current?.blur();
      return;
    }

    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, flat.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, -1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && flat[active]) {
        const item = flat[active];
        if (item.type === "product") goProduct(item.data);
        else goCategory(item.data);
      } else {
        if (grouped.products[0]) goProduct(grouped.products[0]);
        else if (grouped.categories[0]) goCategory(grouped.categories[0]);
      }
    }
  };

  const hasAny = grouped.products.length > 0 || grouped.categories.length > 0;

  return (
    <div ref={wrapRef} className="relative">
      {/* Search input */}
      <div
        className={`relative border border-black/10 bg-white transition ${
          open ? "border-black/30" : "hover:border-black/20"
        }`}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-4 h-4 text-black/50" />
        </div>

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          type="search"
          placeholder="Search by name or category…"
          className="w-full h-11 pl-9 pr-24 text-sm bg-transparent outline-none"
        />

        {/* Right actions */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {q ? (
            <button
              type="button"
              onClick={clear}
              className="h-8 w-8 grid place-items-center border border-black/10 hover:bg-black/5 transition"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          <div className="hidden lg:block text-[10px] uppercase tracking-[0.22em] text-black/40 pr-1">
            Enter
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-black/10 z-[70]">
          {/* Top meta row */}
          <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.22em] text-black/50">
              Search results
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-black/40">
              ↑ ↓ to navigate • Enter to open
            </div>
          </div>

          {!q.trim() ? (
            <div className="px-4 py-6">
              <div className="text-sm text-black/70">
                Try searching “MDF” or “BOX”.
              </div>
              <div className="mt-2 text-xs text-black/50">
                You can search by{" "}
                <span className="text-black/70">product name</span> or{" "}
                <span className="text-black/70">category</span>.
              </div>
            </div>
          ) : q.trim().length === 1 ? (
            <div className="px-4 py-6">
              <div className="text-sm text-black/70">Keep typing…</div>
              <div className="mt-2 text-xs text-black/50">
                Minimum <span className="text-black/70">2 letters</span> for
                product results.
              </div>
            </div>
          ) : !hasAny ? (
            <div className="px-4 py-6">
              <div className="text-sm text-black/70">
                No results for “{q}”
              </div>
              <div className="mt-2 text-xs text-black/50">
                Try a different name or category.
              </div>
            </div>
          ) : (
            <div className="py-1">
              {/* Categories */}
              {grouped.categories.length > 0 && (
                <div className="px-1">
                  <div className="px-3 pt-3 pb-2 text-[10px] uppercase tracking-[0.22em] text-black/50">
                    Categories
                  </div>
                  <ul className="px-1">
                    {grouped.categories.map((c, idx) => {
                      const flatIndex = idx;
                      const isActive = active === flatIndex;
                      return (
                        <li key={c.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(flatIndex)}
                            onClick={() => goCategory(c)}
                            className={`w-full text-left px-3 py-3 transition ${
                              isActive ? "bg-black/5" : "hover:bg-black/5"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-black">{c.name}</div>
                              <div className="text-xs text-black/50">
                                {c.count}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Products */}
              {grouped.products.length > 0 && (
                <div className="px-1">
                  <div className="px-3 pt-3 pb-2 text-[10px] uppercase tracking-[0.22em] text-black/50">
                    Products
                  </div>

                  <ul className="px-1">
                    {grouped.products.map((p, idx) => {
                      const flatIndex = grouped.categories.length + idx;
                      const isActive = active === flatIndex;

                      return (
                        <li key={p.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(flatIndex)}
                            onClick={() => goProduct(p)}
                            className={`w-full text-left px-3 py-3 transition ${
                              isActive ? "bg-black/5" : "hover:bg-black/5"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 border border-black/10 overflow-hidden flex-shrink-0 bg-white">
                                <img
                                  src={p.image1}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <div className="min-w-0">
                                <div className="text-sm text-black truncate">
                                  {p.name}
                                </div>
                                <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-black/50">
                                  {p.category || "Category"}
                                </div>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Footer action */}
          <div className="border-t border-black/10">
            <Link
              to="/shop"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="block px-4 py-3 text-xs uppercase tracking-[0.22em] text-black/70 hover:text-black hover:bg-black/5 transition"
            >
              View all products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
