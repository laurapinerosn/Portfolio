"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Abstract visual: data becoming an idea —
 * curves, trajectories, soft distributions, nodes.
 */
export default function ThinkingCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    const points: Pt[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (points.length === 0) {
        for (let i = 0; i < 28; i++) {
          points.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: 1.2 + Math.random() * 2.2,
          });
        }
      }
    };

    const drawCurve = (
      w: number,
      h: number,
      phase: number,
      amp: number,
      y0: number,
      color: string,
      width: number
    ) => {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y =
          y0 +
          Math.sin(x * 0.012 + phase) * amp +
          Math.sin(x * 0.004 + phase * 0.6) * (amp * 0.35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    const drawBell = (cx: number, cy: number, scale: number, phase: number) => {
      ctx.beginPath();
      for (let i = -60; i <= 60; i++) {
        const x = cx + i * scale;
        const z = i / 18;
        const y = cy - Math.exp(-0.5 * z * z) * 42 * (0.85 + 0.15 * Math.sin(phase));
        if (i === -60) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(232, 90, 27, 0.55)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };

    const drawFootballArc = (w: number, h: number, phase: number) => {
      const x0 = w * 0.12;
      const y0 = h * 0.72;
      const x1 = w * 0.88;
      const y1 = h * 0.38;
      ctx.beginPath();
      for (let i = 0; i <= 1.001; i += 0.02) {
        const x = x0 + (x1 - x0) * i;
        const lift = Math.sin(i * Math.PI) * (70 + Math.sin(phase) * 8);
        const y = y0 + (y1 - y0) * i - lift;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(28, 27, 25, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      const p = (Math.sin(phase * 0.7) + 1) / 2;
      const bx = x0 + (x1 - x0) * p;
      const lift = Math.sin(p * Math.PI) * (70 + Math.sin(phase) * 8);
      const by = y0 + (y1 - y0) * p - lift;
      ctx.beginPath();
      ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#e85a1b";
      ctx.fill();
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // soft field
      ctx.fillStyle = "rgba(250, 247, 241, 0.35)";
      ctx.fillRect(0, 0, w, h);

      // coordinate whisper
      ctx.strokeStyle = "rgba(28, 27, 25, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 40; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 40; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      drawCurve(w, h, t * 0.35, 28, h * 0.42, "rgba(28, 27, 25, 0.22)", 1.3);
      drawCurve(w, h, t * 0.28 + 1.2, 18, h * 0.55, "rgba(232, 90, 27, 0.35)", 1.1);
      drawBell(w * 0.72, h * 0.62, 2.1, t * 0.4);
      drawFootballArc(w, h, t * 0.45);

      // nodes + links
      for (const p of points) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(28, 27, 25, 0.45)";
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(232, 90, 27, ${0.18 * (1 - d / 90)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // annotation
      ctx.fillStyle = "rgba(140, 133, 122, 0.9)";
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("θ → idea", w * 0.08, h * 0.14);
      ctx.fillStyle = "#e85a1b";
      ctx.beginPath();
      ctx.arc(w * 0.08 - 8, h * 0.14 - 3, 2.2, 0, Math.PI * 2);
      ctx.fill();

      if (!reduce) {
        t += 0.016;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
