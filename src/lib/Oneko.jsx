import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    // Prevent duplicate cat
    if (document.getElementById("oneko")) return;

    const script = document.createElement("script");
    script.src = "/oneko.js";
    script.dataset.cat = "/oneko.gif";
    script.async = true;

    document.body.appendChild(script);

    // ❌ NO CLEANUP — KEEP CAT ALIVE BETWEEN PAGES
  }, []);

  return null;
}
