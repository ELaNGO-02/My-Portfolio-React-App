import React, { useEffect, useRef, useState } from "react";

/**
 * Magnetic Cursor — a small dot that follows the mouse instantly
 * plus a glowing ring that lags behind with spring physics,
 * and a subtle particle trail on movement.
 */
const FluidCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
    setIsTouchDevice(hasTouch);
    if (hasTouch) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    const glow = { x: mouse.x, y: mouse.y };
    let hovering = false;
    let clicking = false;
    let speed = 0;
    let lastX = mouse.x;
    let lastY = mouse.y;

    // Trail particles
    const canvas = canvasRef.current!;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const particles: { x: number; y: number; size: number; alpha: number; vx: number; vy: number; color: string }[] = [];
    const trailColors = ['#915eff', '#00bfff', '#b794f6'];

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Calculate speed
      const dx = mouse.x - lastX;
      const dy = mouse.y - lastY;
      speed = Math.sqrt(dx * dx + dy * dy);
      lastX = mouse.x;
      lastY = mouse.y;

      // Spawn trail particles on fast movement
      if (speed > 5 && particles.length < 80) {
        const count = Math.min(Math.floor(speed / 8), 3);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: mouse.x + (Math.random() - 0.5) * 8,
            y: mouse.y + (Math.random() - 0.5) * 8,
            size: Math.random() * 3 + 1.5,
            alpha: 0.7,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            color: trailColors[Math.floor(Math.random() * trailColors.length)],
          });
        }
      }
    };

    const onEnterInteractive = () => { hovering = true; };
    const onLeaveInteractive = () => { hovering = false; };
    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };

    const onResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('resize', onResize);

    // Observe interactive elements for magnetic effect
    const attachHoverListeners = () => {
      const elements = document.querySelectorAll('a, button, [data-cursor-hover], input, textarea');
      elements.forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
      return elements;
    };

    let elements = attachHoverListeners();
    const mutObs = new MutationObserver(() => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      elements = attachHoverListeners();
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%) scale(${clicking ? 0.6 : hovering ? 1.4 : 1})`;
        dotRef.current.style.background = hovering ? '#00bfff' : '#915eff';
      }

      // Ring follows with spring
      const springFactor = hovering ? 0.08 : 0.12;
      ring.x += (mouse.x - ring.x) * springFactor;
      ring.y += (mouse.y - ring.y) * springFactor;

      if (ringRef.current) {
        const ringScale = clicking ? 0.7 : hovering ? 1.5 : 1;
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = hovering ? 'rgba(0, 191, 255, 0.5)' : 'rgba(145, 94, 255, 0.35)';
      }

      // Glow follows slowest
      glow.x += (mouse.x - glow.x) * 0.04;
      glow.y += (mouse.y - glow.y) * 0.04;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.x}px, ${glow.y}px) translate(-50%, -50%)`;
        glowRef.current.style.opacity = String(Math.min(speed * 0.008 + 0.15, 0.5));
      }

      // Render trail particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.015;
          p.size *= 0.97;
          if (p.alpha <= 0 || p.size < 0.3) {
            particles.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', onResize);
      mutObs.disconnect();
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[998]"
      />
      {/* Ambient glow blob */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-[997]"
        style={{
          background: 'radial-gradient(circle, rgba(145,94,255,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[999]"
        style={{
          border: '1.5px solid rgba(145,94,255,0.35)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[1000]"
        style={{
          background: '#915eff',
          boxShadow: '0 0 10px rgba(145,94,255,0.6), 0 0 20px rgba(145,94,255,0.3)',
          transition: 'background 0.2s, transform 0.15s ease-out',
        }}
      />
    </>
  );
};

export default FluidCursor;
