import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const normalize = (s) => String(s || "").toLowerCase().trim();

const SearchBar = ({
  products = [],
  placeholder = "Search by name or category…",
  className = "",
  inputClassName = "",
  onPick,
  maxResults = 6,
}) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const query = normalize(q);
    if (!query) return [];

    const scored = (products || [])
      .map((p) => {
        const name = normalize(p?.name);
        const cat = normalize(p?.category);
        // basic scoring: name match > category match
        let score = 0;
        if (name.includes(query)) score += 2;
        if (cat.includes(query)) score += 1;
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((x) => x.p);

    return scored;
  }, [q, products, maxResults]);

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
    setOpen(false);
    inputRef.current?.focus();
  };

  const pick = (product) => {
    const url = `/product/${product.id}`;
    onPick?.(product);
    setOpen(false);
    // keep text or clear—premium usually clears
    setQ("");
    navigate(url);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
    if (e.key === "Enter") {
      if (results.length > 0) pick(results[0]);
    }
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/50" />

        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          type="search"
          placeholder={placeholder}
          className={`w-full h-11 pl-9 pr-10 border border-black/10 bg-white text-sm outline-none focus:border-black transition ${inputClassName}`}
        />

        {q && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 grid place-items-center border border-black/10 hover:bg-black/5 transition"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && q.trim() && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-black/10">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-black/60">
              No results for “{q}”
            </div>
          ) : (
            <ul className="divide-y divide-black/10">
              {results.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => pick(p)}
                    className="w-full text-left px-4 py-3 hover:bg-black/5 transition"
                  >
                    <div className="text-sm text-black">{p.name}</div>
                    <div className="text-xs text-black/60 uppercase tracking-wider mt-0.5">
                      {p.category || "Category"}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Optional “View all results” */}
          {results.length > 0 && (
            <div className="border-t border-black/10">
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-xs uppercase tracking-wider text-black/70 hover:text-black hover:bg-black/5 transition"
              >
                View all products
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
