import { useEffect, useRef } from 'react';

/**
 * Matrix-style code rain rendered on a full-screen canvas.
 * Only runs on non-touch / larger screens for performance.
 */
const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const chars =
      'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZconst let var function return import export class async await=>{}[];.()';
    const charArr = chars.split('');
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 6, 15, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient brightness – leading char is brighter
        const brightness = Math.random();
        if (brightness > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 15;
        } else if (brightness > 0.9) {
          ctx.fillStyle = 'rgba(145, 94, 255, 0.9)';
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(0, 255, 180, ${0.15 + Math.random() * 0.15})`;
          ctx.shadowBlur = 0;
        }

        ctx.font = `${fontSize}px "Fira Code", "Courier New", monospace`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default CodeRain;
