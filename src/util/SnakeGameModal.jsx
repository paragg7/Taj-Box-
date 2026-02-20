import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GRID = 25;
const CELL = 25;

const START_STEP_MS = 160; // start slow
const MIN_STEP_MS = 55; // max speed cap
const SPEED_UP_BY = 7; // speed up every point

const DIRS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

const same = (a, b) => a.x === b.x && a.y === b.y;

function randFood(snake) {
  while (true) {
    const f = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
    if (!snake.some((p) => same(p, f))) return f;
  }
}

export default function SnakeGameModal({ open, onClose }) {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  const [best, setBest] = useState(() => {
    const v = Number(localStorage.getItem("snake_best") || 0);
    return Number.isFinite(v) ? v : 0;
  });

  // step for smooth motion duration + loop
  const [stepMs, setStepMs] = useState(START_STEP_MS);
  const stepMsRef = useRef(START_STEP_MS);

  // loop refs
  const runningRef = useRef(false);
  const pausedRef = useRef(false);

  const dirRef = useRef({ x: 1, y: 0 });
  const queuedDirRef = useRef(null);

  const snakeRef = useRef([]);
  const foodRef = useRef({ x: 0, y: 0 });

  // render state
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 0, y: 0 });

  // raf loop
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const accRef = useRef(0);

  const reset = () => {
    const mid = Math.floor(GRID / 2);
    const s = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ];

    snakeRef.current = s;
    dirRef.current = { x: 1, y: 0 };
    queuedDirRef.current = null;

    foodRef.current = randFood(s);

    runningRef.current = false;
    pausedRef.current = false;

    stepMsRef.current = START_STEP_MS;
    setStepMs(START_STEP_MS);

    lastRef.current = 0;
    accRef.current = 0;

    scoreRef.current = 0;
    setScore(0);

    setSnake(s);
    setFood(foodRef.current);
  };

  const gameOver = () => {
    runningRef.current = false;
    pausedRef.current = false;

    const finalScore = scoreRef.current;
    setBest((b) => {
      const nb = Math.max(b, finalScore);
      localStorage.setItem("snake_best", String(nb));
      return nb;
    });
  };

  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    pausedRef.current = false;
    lastRef.current = 0;
    accRef.current = 0;
  };

  const togglePause = () => {
    if (!runningRef.current) return;
    pausedRef.current = !pausedRef.current;
  };

  const setDirectionSafe = (next) => {
    if (!next) return;
    const cur = dirRef.current;
    if (next.x === -cur.x && next.y === -cur.y) return; // no reverse
    queuedDirRef.current = next; // buffer for next tick
  };

  // keyboard
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (!runningRef.current) start();
        else togglePause();
        return;
      }

      if (e.key.toLowerCase() === "r") {
        reset();
        return;
      }

      const d = DIRS[e.key] || DIRS[e.key.toLowerCase()];
      if (d) setDirectionSafe(d);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  // main loop (depends only on open)
  useEffect(() => {
    if (!open) return;

    reset();

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);

      if (!runningRef.current || pausedRef.current) return;

      const now = performance.now();
      if (!lastRef.current) lastRef.current = now;

      const dt = now - lastRef.current;
      lastRef.current = now;

      accRef.current += Math.min(dt, 120);

      while (accRef.current >= stepMsRef.current) {
        accRef.current -= stepMsRef.current;

        // apply buffered direction
        if (queuedDirRef.current) {
          const next = queuedDirRef.current;
          const cur = dirRef.current;
          if (!(next.x === -cur.x && next.y === -cur.y)) dirRef.current = next;
          queuedDirRef.current = null;
        }

        const s = snakeRef.current;
        const head = s[0];
        const d = dirRef.current;

        const newHead = { x: head.x + d.x, y: head.y + d.y };

        // walls
        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= GRID ||
          newHead.y >= GRID
        ) {
          gameOver();
          return;
        }

        // self collision
        if (s.some((p) => same(p, newHead))) {
          gameOver();
          return;
        }

        const ate = same(newHead, foodRef.current);

        const nextSnake = [newHead, ...s];
        if (!ate) nextSnake.pop();

        snakeRef.current = nextSnake;
        setSnake(nextSnake);

        if (ate) {
          // score
          scoreRef.current += 1;
          setScore(scoreRef.current);

          // speed up every point
          const nextStep = Math.max(MIN_STEP_MS, stepMsRef.current - SPEED_UP_BY);
          stepMsRef.current = nextStep;
          setStepMs(nextStep);

          // new food
          foodRef.current = randFood(nextSnake);
          setFood(foodRef.current);
        }
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const boardStyle = useMemo(
    () => ({ width: GRID * CELL, height: GRID * CELL }),
    []
  );

  // smooth slide transition (duration follows speed)
  const moveTransition = useMemo(
    () => ({ type: "tween", ease: "linear", duration: stepMs / 1000 }),
    [stepMs]
  );

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
            {/* Minimal top info */}
            <div className="mb-4 flex items-center justify-between text-black text-sm font-mono">
              <div className="flex items-center gap-6">
                <span>Score: {score}</span>
                <span>Best: {best}</span>
              </div>
              <div className="hidden sm:block text-black/50">
                Space start/pause • R reset • Esc close
              </div>
            </div>

            {/* Play Area (sharp edges, white bg, black snake) */}
            <div
              className="relative border border-black overflow-hidden"
              style={boardStyle}
            >
              {/* Food */}
              <motion.div
                className="absolute bg-black"
                animate={{ x: food.x * CELL, y: food.y * CELL }}
                transition={moveTransition}
                style={{ width: CELL, height: CELL }}
              />

              {/* Snake */}
              {snake.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-black"
                  animate={{ x: p.x * CELL, y: p.y * CELL }}
                  transition={moveTransition}
                  style={{ width: CELL, height: CELL }}
                />
              ))}

              {/* Overlay */}
              {(!runningRef.current || pausedRef.current) && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center text-black font-mono">
                    {!runningRef.current ? (
                      <>
                        <div className="text-xl mb-2">SNAKE</div>
                        <div className="text-black/60">
                          Press <span className="text-black">Space</span> to
                          start
                        </div>
                      </>
                    ) : (
                      <div className="text-black/60">
                        Paused — press <span className="text-black">Space</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
              <button
                onClick={() => setDirectionSafe(DIRS.ArrowLeft)}
                className="w-12 h-12 border border-black text-black active:bg-black/10"
              >
                ←
              </button>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setDirectionSafe(DIRS.ArrowUp)}
                  className="w-12 h-12 border border-black text-black active:bg-black/10"
                >
                  ↑
                </button>
                <button
                  onClick={() => setDirectionSafe(DIRS.ArrowDown)}
                  className="w-12 h-12 border border-black text-black active:bg-black/10"
                >
                  ↓
                </button>
              </div>
              <button
                onClick={() => setDirectionSafe(DIRS.ArrowRight)}
                className="w-12 h-12 border border-black text-black active:bg-black/10"
              >
                →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
