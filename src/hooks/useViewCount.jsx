import { useEffect, useRef, useState } from "react";
import { getCount, incrementAndGet } from "../lib/views";

export default function useViewCount(pageKey) {
  const [count, setCount] = useState(null);

  // ✅ StrictMode/dev double-effect guard (in-memory)
  const ranRef = useRef(false);

  useEffect(() => {
    if (!pageKey) return;

    // ✅ prevents double-run in dev StrictMode
    if (ranRef.current) return;
    ranRef.current = true;

    let ignore = false;

    async function run() {
      try {
        const storageKey = `viewed:${pageKey}`;
        const alreadyViewed = localStorage.getItem(storageKey);

        if (!alreadyViewed) {
          // ✅ set immediately (prevents double increment if effect runs twice)
          localStorage.setItem(storageKey, "1");

          const latest = await incrementAndGet(pageKey);
          if (!ignore) setCount(latest);
        } else {
          const latest = await getCount(pageKey);
          if (!ignore) setCount(latest);
        }
      } catch (err) {
        console.error("useViewCount error:", err);
        if (!ignore) setCount(0);
      }
    }

    run();

    return () => {
      ignore = true;
    };
  }, [pageKey]);

  return count;
}