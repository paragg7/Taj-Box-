import useViewCount from "../hooks/useViewCount";

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default function ViewCounter({ pageKey }) {
  const count = useViewCount(pageKey) ?? 0;

  const formatted = Number(count).toLocaleString();
  const suffix = getOrdinal(Number(count));

  return (
    <p className="text-xs font-mono text-[#1E2220]/60 text-center sm:text-right">
      You're the{" "}
      <span className="tabular-nums font-semibold text-[#1E2220]/70">
        {formatted}{suffix}
      </span>{" "}
      visitor
    </p>
  );
}