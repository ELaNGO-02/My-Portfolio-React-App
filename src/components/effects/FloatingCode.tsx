import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * A floating terminal-style code snippet that drifts across the viewport.
 * Used as decoration in multiple sections.
 */

const CODE_SNIPPETS = [
  `const dev = {\n  name: "Elango",\n  role: "Full Stack",\n  stack: ["React", "TS"]\n};`,
  `async function deploy() {\n  await build();\n  await test();\n  return "🚀 Live!";\n}`,
  `import { magic } from\n  "@elango/portfolio";\n\nmagic.create(\n  "awesome-app"\n);`,
  `// TODO: Ship it!\nconst app = new App({\n  theme: "dark",\n  mode: "pro"\n});`,
  `export default function\n  Hero() {\n  return (\n    <Canvas3D />\n  );\n}`,
  `git commit -m\n  "feat: add 3D hero"\ngit push origin main\n// CI/CD running...`,
];

interface FloatingCodeProps {
  count?: number;
}

const FloatingCode = ({ count = 4 }: FloatingCodeProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Don't show on mobile
    if (window.innerWidth < 768) return;
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const snippet = CODE_SNIPPETS[i % CODE_SNIPPETS.length];
        const left = 5 + Math.random() * 80;
        const top = 10 + Math.random() * 70;
        const driftX = (Math.random() - 0.5) * 120;
        const driftY = (Math.random() - 0.5) * 80;
        const duration = 30 + Math.random() * 20;

        return (
          <motion.div
            key={i}
            className="absolute font-mono text-[10px] leading-tight whitespace-pre text-[#915EFF]/[0.07] select-none"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{
              x: [0, driftX, 0],
              y: [0, driftY, 0],
              opacity: [0.04, 0.08, 0.04],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 3,
            }}
          >
            {snippet}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingCode;
