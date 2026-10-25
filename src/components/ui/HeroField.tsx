import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Ripple {
  x: number;
  y: number;
  r: number;
}

const SPACING = 38;
const MOUSE_R = 170;
const LINK_R = 64;
const IDLE_MS = 2200;

/**
 * Reactive dot-matrix field. A slow brightness wave travels across the grid at
 * all times; the cursor (or, when idle / on touch, a ghost cursor on a
 * Lissajous path) displaces and lights nearby dots and links them together.
 * Clicks release a shockwave ripple. Pauses offscreen; static under reduced motion.
 */
export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let dots: Dot[] = [];
    const ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999, last: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offX + c * SPACING;
          const y = offY + r * SPACING;
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Pointer: real cursor if recently moved, else a ghost tracing a slow path.
      const idle = t - mouse.last > IDLE_MS;
      const px = idle ? w * (0.5 + 0.34 * Math.sin(t * 0.00031)) : mouse.x;
      const py = idle ? h * (0.5 + 0.3 * Math.sin(t * 0.00047 + 1.2)) : mouse.y;
      const power = idle ? 0.55 : 1;

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 7;
        if (ripples[i].r > Math.hypot(w, h)) ripples.splice(i, 1);
      }

      const near: Dot[] = [];
      const vignetteR = Math.hypot(w, h) * 0.55;

      for (const d of dots) {
        // Ambient travelling wave
        let glow = 0.14 + 0.1 * Math.sin(d.ox * 0.007 + d.oy * 0.005 - t * 0.0011);
        let size = 1.15;

        const dx = d.x - px;
        const dy = d.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_R && dist > 0.5) {
          const f = 1 - dist / MOUSE_R;
          d.vx += (dx / dist) * f * 1.5 * power;
          d.vy += (dy / dist) * f * 1.5 * power;
          glow += f * 0.75 * power;
          size += f * 2.2 * power;
          if (f > 0.12) near.push(d);
        }

        for (const rp of ripples) {
          const rd = Math.hypot(d.x - rp.x, d.y - rp.y);
          const band = Math.abs(rd - rp.r);
          if (band < 46 && rd > 0.5) {
            const f = 1 - band / 46;
            d.vx += ((d.x - rp.x) / rd) * f * 1.8;
            d.vy += ((d.y - rp.y) / rd) * f * 1.8;
            glow += f * 0.6;
            size += f * 1.6;
          }
        }

        if (!reduced) {
          d.vx += (d.ox - d.x) * 0.07;
          d.vy += (d.oy - d.y) * 0.07;
          d.vx *= 0.8;
          d.vy *= 0.8;
          d.x += d.vx;
          d.y += d.vy;
        }

        // Fade toward the edges so the field sits inside the hero, not on it
        const edge = Math.hypot(d.ox - w / 2, d.oy - h / 2) / vignetteR;
        const alpha = Math.min(1, glow) * Math.max(0, 1 - edge * edge * 0.8);
        if (alpha < 0.02) continue;

        const hue = 262 - (d.ox / w) * 78; // violet -> cyan across the width
        ctx.fillStyle = `hsla(${hue}, 90%, ${62 + glow * 18}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Links between lit dots around the pointer
      ctx.lineWidth = 0.8;
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i];
          const b = near[j];
          const dd = Math.hypot(a.x - b.x, a.y - b.y);
          if (dd < LINK_R) {
            const hue = 262 - (a.ox / w) * 78;
            ctx.strokeStyle = `hsla(${hue}, 90%, 72%, ${(1 - dd / LINK_R) * 0.5 * power})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = (t: number) => {
      if (visible) frame(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.last = performance.now();
    };
    const onLeave = () => {
      mouse.last = 0;
    };
    const onClick = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0 });
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    host.addEventListener('click', onClick);

    // Opening shockwave from behind the portrait
    if (!reduced) ripples.push({ x: w * 0.72, y: h * 0.5, r: 0 });

    if (reduced) frame(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      host.removeEventListener('click', onClick);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
}
