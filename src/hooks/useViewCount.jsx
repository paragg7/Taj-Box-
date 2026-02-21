import { useEffect, useState } from "react";
import { bumpView } from "../lib/views";

export default function useViewCount(pageKey) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function run() {
      const latest = await bumpView(pageKey);
      if (!ignore) setCount(latest);
    }

    if (pageKey) run();

    return () => {
      ignore = true;
    };
  }, [pageKey]);

  return count;
}