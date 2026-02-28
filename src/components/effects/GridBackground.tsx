import { motion } from 'framer-motion';

/**
 * Animated perspective grid + floating orbs that sit behind every section.
 * Pure CSS / SVG — no Three.js overhead.
 */
const GridBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {/* Perspective grid */}
    <div className="absolute inset-0 opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#915EFF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    {/* Floating gradient orbs */}
    <motion.div
      className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#915EFF]/[0.04] blur-[120px]"
      animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px]"
      animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -bottom-32 left-1/3 w-[350px] h-[350px] rounded-full bg-emerald-500/[0.03] blur-[100px]"
      animate={{ x: [0, 40, 0], y: [0, -50, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export default GridBackground;
