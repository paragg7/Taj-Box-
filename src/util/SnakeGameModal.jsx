import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * VISUAL STYLE TARGET (matches your screenshot)
 * - Thick black walls + thick outer frame
 * - White canvas / lots of whitespace
 * - Square line caps (not rounded)
 * - Minimal tiny UI marks (3 dots top-left, finish checker bottom-right)
 */

const GRID = 17; // density similar to screenshot (try 17/19/21)
const CELL = 34; // corridor size (visual scale)
const STROKE = 10; // wall thickness (this is the "look")
const PAD = 42; // big whitespace around board (like image)
const TOP_UI_H = 18; // space for the 3 dots above frame
const FINISH_MARK_W = 34;
const FINISH_MARK_H = 10;

const DIRS = {
  ArrowUp: { x: 0, y: -1, k: "N" },
  ArrowDown: { x: 0, y: 1, k: "S" },
  ArrowLeft: { x: -1, y: 0, k: "W" },
  ArrowRight: { x: 1, y: 0, k: "E" },
  w: { x: 0, y: -1, k: "N" },
  s: { x: 0, y: 1, k: "S" },
  a: { x: -1, y: 0, k: "W" },
  d: { x: 1, y: 0, k: "E" },
};
const OPP = { N: "S", S: "N", E: "W", W: "E" };

function generateMaze(size) {
  const cells = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      cells.push({
        x,
        y,
        visited: false,
        walls: { N: true, E: true, S: true, W: true },
      });
    }
  }

  const idx = (x, y) => y * size + x;
  const inb = (x, y) => x >= 0 && y >= 0 && x < size && y < size;

  const stack = [];
  const start = cells[idx(0, 0)];
  start.visited = true;
  stack.push(start);

  const unvisited = (c) => {
    const { x, y } = c;
    const list = [];
    if (inb(x, y - 1)) list.push({ dir: "N", cell: cells[idx(x, y - 1)] });
    if (inb(x + 1, y)) list.push({ dir: "E", cell: cells[idx(x + 1, y)] });
    if (inb(x, y + 1)) list.push({ dir: "S", cell: cells[idx(x, y + 1)] });
    if (inb(x - 1, y)) list.push({ dir: "W", cell: cells[idx(x - 1, y)] });
    return list.filter((n) => !n.cell.visited);
  };

  while (stack.length) {
    const cur = stack[stack.length - 1];
    const ns = unvisited(cur);

    if (!ns.length) {
      stack.pop();
      continue;
    }

    const pick = ns[(Math.random() * ns.length) | 0];
    const next = pick.cell;

    cur.walls[pick.dir] = false;
    next.walls[OPP[pick.dir]] = false;

    next.visited = true;
    stack.push(next);
  }

  for (const c of cells) c.visited = false;
  return { size, cells };
}

function canMove(maze, x, y, dirKey) {
  const size = maze.size;
  const idx = (xx, yy) => yy * size + xx;
  if (x < 0 || y < 0 || x >= size || y >= size) return false;

  const cur = maze.cells[idx(x, y)];
  if (cur.walls[dirKey]) return false;

  const d =
    dirKey === "N"
      ? { x: 0, y: -1 }
      : dirKey === "S"
      ? { x: 0, y: 1 }
      : dirKey === "E"
      ? { x: 1, y: 0 }
      : { x: -1, y: 0 };

  const nx = x + d.x;
  const ny = y + d.y;
  return nx >= 0 && ny >= 0 && nx < size && ny < size;
}

function fmtMs(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m > 0 ? `${m}:${String(r).padStart(2, "0")}` : `${r}s`;
}

export default function MazeGameModal({ open, onClose }) {
  const [maze, setMaze] = useState(() => generateMaze(GRID));

  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);

  const [moves, setMoves] = useState(0);
  const movesRef = useRef(0);

  const [elapsed, setElapsed] = useState(0);
  const startTsRef = useRef(0);
  const rafRef = useRef(null);

  const [bestMs, setBestMs] = useState(() => {
    const v = Number(localStorage.getItem("maze_best_ms") || 0);
    return Number.isFinite(v) ? v : 0;
  });

  const playerRef = useRef({ x: 0, y: 0 });
  const [player, setPlayer] = useState({ x: 0, y: 0 });

  const [hintVisible, setHintVisible] = useState(true);

  // subtle "blocked" shake (still minimal, same style)
  const [shake, setShake] = useState(false);
  const shakeTimer = useRef(null);

  // responsive scale
  const [vp, setVp] = useState({ w: 1200, h: 800 });

  // swipe (one move per swipe)
  const swipeRef = useRef({ active: false, x0: 0, y0: 0 });

  const goal = useMemo(() => ({ x: maze.size - 1, y: maze.size - 1 }), [maze]);

  const boardPx = useMemo(() => maze.size * CELL, [maze]);
  const canvasW = useMemo(() => PAD * 2 + boardPx, [boardPx]);
  const canvasH = useMemo(() => PAD * 2 + boardPx + TOP_UI_H, [boardPx]);

  const scale = useMemo(() => {
    const maxW = vp.w * 0.88;
    const maxH = vp.h * 0.82;
    const cap = 620; // feels like screenshot sizing on desktop
    const target = Math.min(maxW, maxH, cap);
    return Math.min(1, target / (canvasW || 1));
  }, [vp, canvasW]);

  const reset = () => {
    setRunning(false);
    setWon(false);
    setElapsed(0);
    startTsRef.current = 0;

    movesRef.current = 0;
    setMoves(0);

    playerRef.current = { x: 0, y: 0 };
    setPlayer({ x: 0, y: 0 });

    setHintVisible(true);
  };

  const regenerate = () => {
    setMaze(generateMaze(GRID));
  };

  const nudge = () => {
    setShake(true);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setShake(false), 140);
  };

  const win = (finalMs) => {
    setRunning(false);
    setWon(true);
    setBestMs((b) => {
      const nb = b === 0 ? finalMs : Math.min(b, finalMs);
      localStorage.setItem("maze_best_ms", String(nb));
      return nb;
    });
  };

  const moveOnce = (dirKey) => {
    if (won) return;

    if (!running) {
      setRunning(true);
      startTsRef.current = 0;
    }

    const { x, y } = playerRef.current;
    if (!canMove(maze, x, y, dirKey)) {
      nudge();
      return;
    }

    const d =
      dirKey === "N"
        ? { x: 0, y: -1 }
        : dirKey === "S"
        ? { x: 0, y: 1 }
        : dirKey === "E"
        ? { x: 1, y: 0 }
        : { x: -1, y: 0 };

    const nx = x + d.x;
    const ny = y + d.y;

    playerRef.current = { x: nx, y: ny };
    setPlayer({ x: nx, y: ny });

    movesRef.current += 1;
    setMoves(movesRef.current);

    if (hintVisible) setHintVisible(false);

    if (nx === goal.x && ny === goal.y) {
      const finalMs =
        startTsRef.current === 0 ? 0 : performance.now() - startTsRef.current;
      win(finalMs);
    }
  };

  // timer
  useEffect(() => {
    if (!open) return;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      if (!running || won) return;
      const now = performance.now();
      if (!startTsRef.current) startTsRef.current = now;
      setElapsed(now - startTsRef.current);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [open, running, won]);

  // viewport resize
  useEffect(() => {
    if (!open) return;
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  // open reset
  useEffect(() => {
    if (!open) return;
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, maze]);

  // keyboard
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (won) return;
        setRunning((r) => !r);
        return;
      }

      if (e.key.toLowerCase() === "r") {
        reset();
        return;
      }

      if (e.key.toLowerCase() === "g") {
        regenerate();
        return;
      }

      const d = DIRS[e.key] || DIRS[e.key.toLowerCase()];
      if (d) moveOnce(d.k);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, maze, won, hintVisible]);

  // swipe (one move per swipe)
  const onPointerDown = (e) => {
    swipeRef.current.active = true;
    swipeRef.current.x0 = e.clientX;
    swipeRef.current.y0 = e.clientY;
  };
  const onPointerUp = (e) => {
    if (!swipeRef.current.active) return;
    swipeRef.current.active = false;

    const dx = e.clientX - swipeRef.current.x0;
    const dy = e.clientY - swipeRef.current.y0;
    const TH = 22;

    if (Math.abs(dx) < TH && Math.abs(dy) < TH) return;

    if (Math.abs(dx) > Math.abs(dy)) moveOnce(dx > 0 ? "E" : "W");
    else moveOnce(dy > 0 ? "S" : "N");
  };

  // Build thick wall segments (skip boundary walls because frame draws it)
  const wallLines = useMemo(() => {
    const size = maze.size;
    const set = new Set();
    const lines = [];

    const px = (n) => PAD + n * CELL;
    const yOffset = TOP_UI_H; // shift board down a bit (for top-left dots)

    const add = (x1, y1, x2, y2) => {
      const a = `${x1},${y1}`;
      const b = `${x2},${y2}`;
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (set.has(key)) return;
      set.add(key);
      lines.push({ x1, y1, x2, y2, key });
    };

    const idx = (x, y) => y * size + x;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const c = maze.cells[idx(x, y)];
        const left = px(x);
        const top = yOffset + px(y);
        const right = px(x + 1);
        const bottom = yOffset + px(y + 1);

        // internal walls only (no boundary duplication)
        if (c.walls.N && y !== 0) add(left, top, right, top);
        if (c.walls.S && y !== size - 1) add(left, bottom, right, bottom);
        if (c.walls.W && x !== 0) add(left, top, left, bottom);
        if (c.walls.E && x !== size - 1) add(right, top, right, bottom);
      }
    }

    return lines;
  }, [maze]);

  const playerDot = useMemo(() => {
    const cx = PAD + player.x * CELL + CELL / 2;
    const cy = TOP_UI_H + PAD + player.y * CELL + CELL / 2;
    return { cx, cy };
  }, [player]);

  const goalDot = useMemo(() => {
    const cx = PAD + goal.x * CELL + CELL / 2;
    const cy = TOP_UI_H + PAD + goal.y * CELL + CELL / 2;
    return { cx, cy };
  }, [goal]);

  const frame = useMemo(() => {
    const x = PAD;
    const y = TOP_UI_H + PAD;
    const w = boardPx;
    const h = boardPx;
    return { x, y, w, h };
  }, [boardPx]);

  const status = won ? "Solved" : running ? "Running" : "Paused";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center bg-white p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="select-none"
          >
            {/* tiny top info (kept minimal like screenshot, not a big UI) */}
            <div className="mb-4 flex items-center justify-between font-mono text-xs text-black/70">
              <div className="flex items-center gap-4">
                <span>Status: {status}</span>
                <span>Moves: {moves}</span>
                <span>Time: {fmtMs(elapsed)}</span>
                <span>Best: {bestMs ? fmtMs(bestMs) : "--"}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setRunning((r) => !r)}
                  className="h-8 px-3 border border-black text-black active:bg-black/10"
                >
                  {won ? "Solved" : running ? "Pause" : "Start"}
                </button>
                <button
                  onClick={reset}
                  className="h-8 px-3 border border-black text-black active:bg-black/10"
                >
                  Reset
                </button>
                <button
                  onClick={regenerate}
                  className="h-8 px-3 border border-black text-black active:bg-black/10"
                >
                  New
                </button>
              </div>
            </div>

            {/* exact-looking canvas */}
            <motion.div
              className="bg-white"
              animate={shake ? { x: [-1, 1, -1, 1, 0] } : { x: 0 }}
              transition={{ duration: 0.14 }}
              style={{
                width: canvasW,
                height: canvasH,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <svg
                width={canvasW}
                height={canvasH}
                viewBox={`0 0 ${canvasW} ${canvasH}`}
                shapeRendering="crispEdges"
              >
                {/* Mac-like 3 dots in top-left */}
                <g transform={`translate(${PAD - 18}, ${6})`}>
                  <circle cx="6" cy="6" r="2.2" fill="#ef4444" />
                  <circle cx="14" cy="6" r="2.2" fill="#f59e0b" />
                  <circle cx="22" cy="6" r="2.2" fill="#22c55e" />
                </g>

                {/* outer thick frame */}
                <rect
                  x={frame.x}
                  y={frame.y}
                  width={frame.w}
                  height={frame.h}
                  fill="none"
                  stroke="black"
                  strokeWidth={STROKE}
                  strokeLinejoin="miter"
                />

                {/* maze walls (thick, square ends) */}
                <g stroke="black" strokeWidth={STROKE} strokeLinecap="square">
                  {wallLines.map((l) => (
                    <line
                      key={l.key}
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                    />
                  ))}
                </g>

                {/* start + goal markers (same minimal red) */}
                <circle
                  cx={PAD + CELL / 2}
                  cy={TOP_UI_H + PAD + CELL / 2}
                  r="3.2"
                  fill="#b91c1c"
                />
                <circle cx={goalDot.cx} cy={goalDot.cy} r="3.2" fill="#b91c1c" />

                {/* player dot (black) */}
                <motion.circle
                  r="4.2"
                  fill="black"
                  animate={{ cx: playerDot.cx, cy: playerDot.cy }}
                  initial={false}
                  transition={{ type: "tween", ease: "linear", duration: 0.06 }}
                />

                {/* finish checkered mark (bottom-right, outside frame) */}
                <g
                  transform={`translate(${frame.x + frame.w - FINISH_MARK_W}, ${
                    frame.y + frame.h + 10
                  })`}
                >
                  {Array.from({ length: 16 }).map((_, i) => {
                    const cols = 8;
                    const x = (i % cols) * (FINISH_MARK_W / cols);
                    const y = Math.floor(i / cols) * (FINISH_MARK_H / 2);
                    const on = (i + Math.floor(i / cols)) % 2 === 0;
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={y}
                        width={FINISH_MARK_W / cols}
                        height={FINISH_MARK_H / 2}
                        fill={on ? "black" : "white"}
                        stroke="black"
                        strokeWidth="0.4"
                      />
                    );
                  })}
                </g>

                {/* tiny bottom-right micro text (optional, same vibe) */}
                <text
                  x={frame.x + frame.w - 2}
                  y={frame.y + frame.h + 28}
                  textAnchor="end"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
                  fontSize="7"
                  fill="black"
                  opacity="0.55"
                >
                  FINISH
                </text>

                {/* hint text (fades out after first move) */}
                <AnimatePresence>
                  {hintVisible && !won && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <text
                        x={frame.x + 10}
                        y={frame.y - 14}
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
                        fontSize="11"
                        fill="black"
                        opacity="0.55"
                      >
                        Arrows/WASD • Swipe
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>

              {/* invisible input layer for swipe */}
              <div
                className="absolute"
                style={{
                  left: PAD,
                  top: TOP_UI_H + PAD,
                  width: boardPx,
                  height: boardPx,
                }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={() => (swipeRef.current.active = false)}
              />
            </motion.div>

            {/* mobile buttons (minimal, same style) */}
            <div className="mt-4 flex items-center justify-center gap-2 sm:hidden font-mono">
              <button
                onClick={() => setRunning((r) => !r)}
                className="h-9 px-3 border border-black text-black active:bg-black/10"
              >
                {won ? "Solved" : running ? "Pause" : "Start"}
              </button>
              <button
                onClick={reset}
                className="h-9 px-3 border border-black text-black active:bg-black/10"
              >
                Reset
              </button>
              <button
                onClick={regenerate}
                className="h-9 px-3 border border-black text-black active:bg-black/10"
              >
                New
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}