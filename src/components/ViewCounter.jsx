import useViewCount from "../hooks/useViewCount";

export default function ViewCounter({ pageKey }) {
  const count = useViewCount(pageKey);

  return (
    <p className="text-xs font-mono text-black/60 text-center sm:text-right">
      Views{" "}
      <span className="tabular-nums font-semibold text-black/70">
        {count === null ? "…" : Number(count).toLocaleString()}
      </span>
    </p>
  );
}