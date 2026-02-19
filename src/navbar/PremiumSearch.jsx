// src/components/Navbar/PremiumSearch.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { toSlug } from "@/hooks/useCategories";

const normalize = (s) => String(s || "").toLowerCase().trim();

const PremiumSearch = ({ products = [], categories = [], onNavigate }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
            const score = nameScore * 2 + catScore;
            return { p, score, idx };
          })
          .filter((x) => x.score > 0)
          .sort((a, b) =>
            b.score !== a.score ? b.score - a.score : a.idx - b.idx
          )
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

  const flat = useMemo(() => {
    const list = [];
    grouped.categories.forEach((c) => list.push({ type: "category", data: c }));
    grouped.products.forEach((p) => list.push({ type: "product", data: p }));
    return list;
  }, [grouped]);

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
    setQ("");
    setActive(-1);
    onNavigate?.();
    navigate(`/shop/${c.slug || toSlug(c.name)}`);
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
      {/* Input */}
      <div
        className={`relative flex items-center gap-2 border bg-white px-3 h-11 transition ${
          open ? "border-black/30" : "border-black/10 hover:border-black/20"
        }`}
      >
        <Search className="w-4 h-4 text-black/45 shrink-0" />
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
          placeholder="Search products or categories…"
          className="w-full bg-transparent outline-none text-sm placeholder:text-black/40"
        />

        {q ? (
          <button
            type="button"
            onClick={clear}
            className="h-8 w-8 grid place-items-center border border-black/10 hover:bg-black/5 transition"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-black/35">
            <span>Enter</span>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white border border-black/10 z-[9999]"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
              {q.trim() ? "Results" : "Quick categories"}
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setActive(-1);
                inputRef.current?.blur();
              }}
              className="text-[11px] uppercase tracking-[0.22em] text-black/45 hover:text-black transition"
            >
              Close
            </button>
          </div>

          {!q.trim() ? (
            <div className="p-2">
              <div className="px-2 py-2 text-xs text-black/60">
                Browse categories
              </div>

              <ul className="p-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                {categories.slice(0, 8).map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => goCategory(c)}
                      className="w-full flex items-center justify-between px-3 py-3 hover:bg-black/5 transition text-left"
                    >
                      <div className="min-w-0">
                        <div className="text-sm text-black truncate">{c.name}</div>
                        <div className="text-[11px] text-black/45">
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
                  to="/shop"
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block text-center border border-black/10 py-3 text-xs uppercase tracking-[0.22em] text-black/70 hover:bg-black/5 transition"
                >
                  View all products
                </Link>
              </div>
            </div>
          ) : !hasAny ? (
            <div className="px-4 py-6">
              <div className="text-sm text-black/70">No results for “{q}”</div>
              <div className="mt-2 text-xs text-black/50">
                Try a different name or category.
              </div>
            </div>
          ) : (
            <div className="max-h-[380px] overflow-auto">
              {grouped.categories.length > 0 && (
                <div className="p-2">
                  <div className="px-2 pt-2 pb-1 text-[11px] uppercase tracking-[0.22em] text-black/45">
                    Categories
                  </div>

                  <ul className="p-1 space-y-1">
                    {grouped.categories.map((c, idx) => {
                      const isActive = active === idx;
                      return (
                        <li key={c.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(idx)}
                            onClick={() => goCategory(c)}
                            className={`w-full px-3 py-3 transition text-left ${
                              isActive ? "bg-black/5" : "hover:bg-black/5"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="text-sm text-black truncate">{c.name}</div>
                                <div className="text-[11px] text-black/45">
                                  {c.count} {c.count === 1 ? "product" : "products"}
                                </div>
                              </div>
                              <div className="text-xs text-black/35">→</div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {grouped.products.length > 0 && (
                <div className="p-2 border-t border-black/10">
                  <div className="px-2 pt-2 pb-1 text-[11px] uppercase tracking-[0.22em] text-black/45">
                    Products
                  </div>

                  <ul className="p-1 space-y-1">
                    {grouped.products.map((p, idx) => {
                      const flatIndex = grouped.categories.length + idx;
                      const isActive = active === flatIndex;

                      return (
                        <li key={p.id}>
                          <button
                            type="button"
                            onMouseEnter={() => setActive(flatIndex)}
                            onClick={() => goProduct(p)}
                            className={`w-full px-3 py-3 transition text-left ${
                              isActive ? "bg-black/5" : "hover:bg-black/5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 border border-black/10 overflow-hidden bg-white shrink-0">
                                <img
                                  src={p.image1}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="text-sm text-black truncate">{p.name}</div>
                                <div className="mt-0.5 text-[11px] text-black/45 truncate">
                                  {p.category}
                                </div>
                              </div>

                              <div className="text-xs text-black/35">↵</div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="p-2 border-t border-black/10">
                <Link
                  to="/shop"
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block text-center border border-black/10 py-3 text-xs uppercase tracking-[0.22em] text-black/70 hover:bg-black/5 transition"
                >
                  View all products
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PremiumSearch;
