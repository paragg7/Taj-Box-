import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { toSlug } from "@/hooks/useCategories";

const normalize = (s) => String(s || "").toLowerCase().trim();

const PremiumSearch = ({ products = [], categories = [], onNavigate }) => {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState(""); // ✅ debounced value
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /* =========================
     ✅ DEBOUNCE (200ms)
  ========================== */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 200);
    return () => clearTimeout(t);
  }, [q]);

  /* =========================
     SEARCH LOGIC (uses debouncedQ)
  ========================== */
  const grouped = useMemo(() => {
    const query = normalize(debouncedQ);
    if (!query) return { products: [], categories: [] };

    const scoreText = (text, q2) => {
      const t = normalize(text);
      if (!t) return 0;
      if (t === q2) return 100;
      if (t.startsWith(q2)) return 80;
      const words = t.split(/\s+/);
      if (words.some((w) => w.startsWith(q2))) return 60;
      if (t.includes(q2)) return 30;
      return 0;
    };

    const prod = (products || [])
      .map((p, idx) => {
        const nameScore = scoreText(p?.name, query);
        const catScore = scoreText(p?.category, query);
        const score = nameScore * 2 + catScore;
        return { p, score, idx };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => (b.score !== a.score ? b.score - a.score : a.idx - b.idx))
      .slice(0, 6)
      .map((x) => x.p);

    const catRes = (categories || [])
      .map((c) => ({ ...c, score: scoreText(c.name, query) }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(({ score, ...rest }) => rest);

    return { products: prod, categories: catRes };
  }, [debouncedQ, products, categories]);

  const flat = useMemo(() => {
    const list = [];
    grouped.categories.forEach((c) => list.push({ type: "category", data: c }));
    grouped.products.forEach((p) => list.push({ type: "product", data: p }));
    return list;
  }, [grouped]);

  const hasAny = grouped.products.length > 0 || grouped.categories.length > 0;

  /* =========================
     CLOSE ON OUTSIDE CLICK
  ========================== */
  useEffect(() => {
    const onDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* =========================
     ACTIONS
  ========================== */
  const clear = () => {
    setQ("");
    setDebouncedQ("");
    setActive(-1);
    setOpen(false);
    inputRef.current?.focus();
  };

  const goProduct = (p) => {
    setOpen(false);
    setQ("");
    setDebouncedQ("");
    setActive(-1);
    onNavigate?.();
    navigate(`/product/${p.id}`);
  };

  const goCategory = (c) => {
    setOpen(false);
    setQ("");
    setDebouncedQ("");
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
        item.type === "product" ? goProduct(item.data) : goCategory(item.data);
      } else if (grouped.products[0]) {
        goProduct(grouped.products[0]);
      } else if (grouped.categories[0]) {
        goCategory(grouped.categories[0]);
      }
    }
  };

  /* =========================
     UI
  ========================== */
  const isTyping = q.trim().length > 0;
  const isDebouncing = normalize(q) !== normalize(debouncedQ); // ✅ show subtle state if you want

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
            const val = e.target.value;
            setQ(val);
            setOpen(!!val.trim()); // ✅ open only when typing
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          type="search"
          placeholder="Search products or categories…"
          className="w-full bg-transparent outline-none text-sm placeholder:text-black/40"
        />

        {q && (
          <button
            type="button"
            onClick={clear}
            className="h-8 w-8 grid place-items-center border border-black/10 hover:bg-black/5 transition"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown (uses debounced results) */}
      {open && isTyping && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white border border-black/10 z-[9999]"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
              Results {isDebouncing ? "…" : ""}
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setActive(-1);
              }}
              className="text-[11px] uppercase tracking-[0.22em] text-black/45 hover:text-black transition"
            >
              Close
            </button>
          </div>

          <div className="max-h-[380px] overflow-auto">
            {!hasAny && !isDebouncing ? (
              <div className="p-6 text-center">
                <div className="text-sm text-black">No results found</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-black/45">
                  Try a different keyword
                </div>
              </div>
            ) : !hasAny && isDebouncing ? (
              <div className="p-6 text-center">
                <div className="text-sm text-black/70">Searching…</div>
              </div>
            ) : (
              <>
                {/* Categories */}
                {grouped.categories.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 pt-2 pb-1 text-[11px] uppercase tracking-[0.22em] text-black/45">
                      Categories
                    </div>

                    <ul className="p-1 space-y-1">
                      {grouped.categories.map((c, idx) => {
                        const isActive = active === idx;
                        return (
                          <li key={c.slug || c.name}>
                            <button
                              type="button"
                              onMouseEnter={() => setActive(idx)}
                              onClick={() => goCategory(c)}
                              className={`w-full px-3 py-3 transition text-left ${
                                isActive ? "bg-black/5" : "hover:bg-black/5"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-black truncate">
                                  {c.name}
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

                {/* Products */}
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
                                  <div className="text-sm text-black truncate">
                                    {p.name}
                                  </div>
                                  <div className="text-[11px] text-black/45 truncate">
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
                    onClick={() => setOpen(false)}
                    className="block text-center border border-black/10 py-3 text-xs uppercase tracking-[0.22em] text-black/70 hover:bg-black/5 transition"
                  >
                    View all products
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumSearch;
