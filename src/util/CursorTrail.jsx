import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const points = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const lerp = (start, end, t) => start + (end - start) * t;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.15);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.15);

      points.current.push({
        x: smooth.current.x,
        y: smooth.current.y,
      });

      // Limit trail length
      if (points.current.length > 60) {
        points.current.shift();
      }

      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";

      ctx.beginPath();

      for (let i = 0; i < points.current.length - 1; i++) {
        const p1 = points.current[i];
        const p2 = points.current[i + 1];

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }

      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default CursorTrail;
