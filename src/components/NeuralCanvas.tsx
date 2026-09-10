import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

/**
 * Lightweight animated neural-network style canvas: drifting nodes connected
 * by edges whose opacity depends on distance, with periodic signal pulses.
 * Respects prefers-reduced-motion and theme via a prop.
 */
export function NeuralCanvas({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = Math.max(parent.clientWidth, 1);
      height = Math.max(parent.clientHeight, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(Math.floor((width * height) / 16000), 90);
      nodes = Array.from({ length: Math.max(density, 24) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const linkDist = 130;

    const draw = () => {
      if (!running) return;
      const isDark = darkRef.current;
      ctx.clearRect(0, 0, width, height);

      const nodeColor = isDark ? '120, 170, 255' : '30, 96, 241';
      const edgeColor = isDark ? '120, 170, 255' : '30, 96, 241';
      const accentColor = isDark ? '52, 211, 153' : '16, 185, 129';

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * (isDark ? 0.22 : 0.14);
            ctx.strokeStyle = `rgba(${edgeColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.02;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        const glow = (Math.sin(n.pulse) + 1) * 0.5;
        const radius = Math.max(0.5, n.r + glow * 0.8);

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${0.5 + glow * 0.4})`;
        ctx.fill();

        if (glow > 0.85) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentColor}, 0.10)`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    // Re-measure after layout settles so the canvas isn't 0×0 on first paint
    const layoutTimer = window.setTimeout(resize, 50);
    draw();
    window.addEventListener('resize', resize);
    return () => {
      running = false;
      window.clearTimeout(layoutTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
