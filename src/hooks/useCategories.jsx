// src/hooks/useCategories.js
import React from "react";

const toSlug = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export { toSlug };

export default function useCategories(products) {
  return React.useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => {
      const c = (p?.category || "").trim();
      if (!c) return;
      map.set(c, (map.get(c) || 0) + 1);
    });

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count, slug: toSlug(name) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);
}
