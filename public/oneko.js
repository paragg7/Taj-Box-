(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  if (isReducedMotion) return;

  if (document.getElementById("oneko")) return;

  const nekoEl = document.createElement("div");

  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let frameCount = 0;
  let idleAnimationFrame = 0;

  const baseSpeed = 10;
  let isResting = false;
  let manualSleep = false;

  // Edge scratch state
  let edgeScratchFrames = 0;
  let edgeScratchSprite = null;

  // Only two cat colors
  const catColors = {
    classic: "none",
    grayTom: "brightness(50%) contrast(120%)",
  };
  let currentColor = "grayTom";

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    S: [[-6, -3], [-7, -2]],
    E: [[-3, 0], [-3, -1]],
    W: [[-4, -2], [-4, -3]],
    NE: [[0, -2], [0, -3]],
    NW: [[-1, 0], [-1, -1]],
    SE: [[-5, -1], [-5, -2]],
    SW: [[-5, -3], [-6, -1]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
  };

  // --- Inject tiny heart animation CSS (premium, minimal) ---
  function injectStyles() {
    if (document.getElementById("oneko-style")) return;
    const style = document.createElement("style");
    style.id = "oneko-style";
    style.textContent = `
      .oneko-heart {
        position: fixed;
        z-index: 2147483647;
        pointer-events: none;
        font-size: 14px;
        line-height: 1;
        transform: translate(-50%, 0);
        opacity: 0;
        animation: onekoHeartPop 1000ms ease forwards;
        filter: drop-shadow(0 0 0 rgba(0,0,0,0)); /* no visible shadow */
      }
      @keyframes onekoHeartPop {
        0%   { transform: translate(-50%, 8px) scale(0.85); opacity: 0; }
        15%  { transform: translate(-50%, 0px) scale(1); opacity: 1; }
        70%  { transform: translate(-50%, -10px) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -16px) scale(0.95); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  function isTypingTarget(el) {
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      el.isContentEditable
    );
  }

  function isImportantUI(el) {
    if (!el || el === nekoEl) return false;
    if (el.closest?.("#oneko")) return false;
    if (el.classList?.contains("oneko-heart")) return false;
    if (el.id === "oneko-hint") return false;

    const tag = el.tagName?.toLowerCase();
    if (
      tag === "button" ||
      tag === "a" ||
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      tag === "label"
    )
      return true;

    const role = el.getAttribute?.("role");
    if (role === "button" || role === "link") return true;

    // clickable/interactive patterns
    if (typeof el.onclick === "function") return true;
    if (el.closest?.("button,a,input,textarea,select,[role='button'],[role='link']"))
      return true;

    return false;
  }

  function getSiteTuning() {
    const path = (location?.pathname || "").toLowerCase();

    // defaults
    let speedMul = 1;
    let autoSleepRadius = 50;

    if (path.startsWith("/shop")) {
      speedMul = 1.25; // faster on shop
    }
    if (path.startsWith("/contact")) {
      autoSleepRadius = 80; // sleeps sooner on contact
    }
    return { speedMul, autoSleepRadius };
  }

  function setColor(color) {
    if (catColors[color]) {
      currentColor = color;
      nekoEl.style.filter = catColors[color];
    }
  }

  function showHint() {
    const hint = document.createElement("div");
    hint.id = "oneko-hint";
    hint.textContent = "Press 1 / 2 to change color • Click ❤️ • Double-click to sleep";
    hint.style.position = "fixed";
    hint.style.left = `${nekoPosX + 18}px`;
    hint.style.top = `${nekoPosY - 18}px`;
    hint.style.zIndex = 2147483647;
    hint.style.padding = "8px 10px";
    hint.style.fontSize = "12px";
    hint.style.lineHeight = "1.2";
    hint.style.letterSpacing = "0.12em";
    hint.style.textTransform = "uppercase";
    hint.style.background = "rgba(255,255,255,0.85)";
    hint.style.border = "1px solid rgba(0,0,0,0.12)";
    hint.style.color = "rgba(0,0,0,0.75)";
    hint.style.pointerEvents = "none";
    hint.style.whiteSpace = "nowrap";
    hint.style.transition = "opacity 600ms ease";
    hint.style.opacity = "1";

    document.body.appendChild(hint);

    setTimeout(() => {
      hint.style.opacity = "0";
      setTimeout(() => hint.remove(), 700);
    }, 4000);

    let followFrames = 40;
    const follow = () => {
      if (!document.body.contains(hint)) return;
      hint.style.left = `${nekoPosX + 18}px`;
      hint.style.top = `${nekoPosY - 18}px`;
      followFrames--;
      if (followFrames > 0) requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);
  }

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "oneko-heart";
    heart.textContent = "❤️";

    // above the cat
    heart.style.left = `${nekoPosX}px`;
    heart.style.top = `${nekoPosY - 18}px`;

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1100);
  }

  function init() {
    injectStyles();

    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;
    nekoEl.style.backgroundImage = `url("/oneko.gif")`;
    nekoEl.style.userSelect = "none";
    nekoEl.style.webkitUserSelect = "none";
    setColor(currentColor);

    document.body.appendChild(nekoEl);
    showHint();

    const onMove = (x, y) => {
      mousePosX = x;
      mousePosY = y;

      if (
        !manualSleep &&
        isResting &&
        (mousePosX !== lastMouseX || mousePosY !== lastMouseY)
      ) {
        isResting = false;
        idleAnimationFrame = 0;
      }

      lastMouseX = mousePosX;
      lastMouseY = mousePosY;
    };

    document.addEventListener("mousemove", (event) => {
      onMove(event.clientX, event.clientY);
    });

    // Mobile/touch
    document.addEventListener(
      "touchmove",
      (event) => {
        const t = event.touches?.[0];
        if (!t) return;
        onMove(t.clientX, t.clientY);
      },
      { passive: true }
    );

    // ✅ Single click = pet (heart)
    nekoEl.addEventListener("click", () => {
      spawnHeart();
      // tiny playful scratchSelf once
      edgeScratchFrames = 8;
      edgeScratchSprite = "scratchSelf";
    });

    // ✅ double-click = manual sleep toggle
    nekoEl.addEventListener("dblclick", () => {
      manualSleep = !manualSleep;
      isResting = manualSleep;
      idleAnimationFrame = 0;
    });

    // Keypress: switch colors (ignore while typing)
    document.addEventListener("keydown", (e) => {
      if (isTypingTarget(e.target)) return;
      if (e.key === "1") setColor("classic");
      if (e.key === "2") setColor("grayTom");
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name] || spriteSets.idle;
    const cell = sprite[frame % sprite.length];
    nekoEl.style.backgroundPosition = `${cell[0] * 32}px ${cell[1] * 32}px`;
  }

  function maybeAvoidUI() {
    // point at cat center
    const cx = nekoPosX;
    const cy = nekoPosY;

    const el = document.elementFromPoint(cx, cy);
    if (!isImportantUI(el)) return false;

    // step aside away from element's center (premium “respect UI”)
    const rect = el.getBoundingClientRect?.();
    if (!rect) return false;

    const ex = rect.left + rect.width / 2;
    const ey = rect.top + rect.height / 2;

    let dx = cx - ex;
    let dy = cy - ey;
    const len = Math.hypot(dx, dy) || 1;

    // stronger push so it clears buttons/inputs
    const push = 28;
    dx = (dx / len) * push;
    dy = (dy / len) * push;

    nekoPosX = Math.min(Math.max(16, nekoPosX + dx), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY + dy), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    // quick alert sprite
    setSprite("alert", frameCount);
    return true;
  }

  function startEdgeScratch(which) {
    edgeScratchFrames = 14; // short scratch burst
    edgeScratchSprite = which; // scratchWallN/S/E/W
  }

  function frame() {
    frameCount++;

    const { speedMul, autoSleepRadius } = getSiteTuning();

    // If currently doing scratch animation (edge or click)
    if (edgeScratchFrames > 0 && edgeScratchSprite) {
      setSprite(edgeScratchSprite, frameCount);
      edgeScratchFrames--;
      return;
    }

    // Resting animation
    if (isResting) {
      if (idleAnimationFrame < 8) {
        setSprite("tired", 0);
      } else {
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
      }
      idleAnimationFrame++;
      return;
    }

    // If mouse not moved yet, just idle
    if (!mousePosX && !mousePosY) {
      setSprite("idle", frameCount);
      return;
    }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    // Auto rest when close (site-aware)
    if (!manualSleep && distance < autoSleepRadius) {
      isResting = true;
      idleAnimationFrame = 0;
      return;
    }

    // Avoid NaN when distance is 0
    if (distance === 0) {
      setSprite("alert", 0);
      return;
    }

    // ✅ Avoid important UI elements (premium)
    // Do it before movement so the cat steps aside early
    if (maybeAvoidUI()) return;

    // Direction sprite
    let direction = "";
    direction += diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction || "alert", frameCount);

    // Speed easing: slower near cursor, faster far away + site speed multiplier
    const eased = Math.max(4, Math.min(baseSpeed, distance / 18));
    const speed = eased * speedMul;

    const nextX = nekoPosX - (diffX / distance) * speed;
    const nextY = nekoPosY - (diffY / distance) * speed;

    // Edge detection BEFORE clamp (so we can scratch)
    const hitLeft = nextX < 16;
    const hitRight = nextX > window.innerWidth - 16;
    const hitTop = nextY < 16;
    const hitBottom = nextY > window.innerHeight - 16;

    if (hitTop) startEdgeScratch("scratchWallN");
    else if (hitBottom) startEdgeScratch("scratchWallS");
    else if (hitRight) startEdgeScratch("scratchWallE");
    else if (hitLeft) startEdgeScratch("scratchWallW");

    // Clamp position
    nekoPosX = Math.min(Math.max(16, nextX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nextY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();
