import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

/* ────────────── Typing animation hook ────────────── */
const useTypingEffect = (strings: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) => {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    } else {
      timeout = setTimeout(
        () => setText(isDeleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1)),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseTime]);
  return text;
};

/* ────────────── Terminal Window ────────────── */
const TerminalWindow = ({ children, title = 'terminal' }: { children: React.ReactNode; title?: string }) => (
  <div className="rounded-2xl border border-white/[0.08] bg-[#0d1117]/60 backdrop-blur-2xl shadow-[0_8px_60px_rgba(145,94,255,0.12)] overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22]/50 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <span className="ml-2 text-[11px] text-gray-500 font-mono">{title}</span>
    </div>
    <div className="p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed">{children}</div>
  </div>
);

/* ════════════════════════════════════════════════════
   HERO — Spectacular 3-D Scene
   ════════════════════════════════════════════════════ */
const HeroBanner: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const typed = useTypingEffect(
    ['Full Stack Developer', 'BigCommerce Expert', 'React & Next.js', 'E-Commerce Architect', 'UI/UX Enthusiast'],
    90, 50, 2200
  );
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTerminal(true), 600);
    return () => clearTimeout(t);
  }, []);

  /* ─── Three.js scene ──────────────────────────── */
  useEffect(() => {
    if (!mountRef.current) return;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060f, 0.008);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, isMobile ? 28 : 22);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
    mountRef.current.appendChild(renderer.domElement);

    /* ═══ CENTERPIECE: TorusKnot ═══ */
    const knotGeo = new THREE.TorusKnotGeometry(3.8, 1.05, 220, 36, 2, 3);

    const knotWire = new THREE.Mesh(
      knotGeo,
      new THREE.MeshBasicMaterial({ color: 0x915eff, wireframe: true, transparent: true, opacity: 0.18 })
    );
    scene.add(knotWire);

    const knotSolid = new THREE.Mesh(
      knotGeo,
      new THREE.MeshPhongMaterial({
        color: 0x4a1d96,
        emissive: 0x915eff,
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
      })
    );
    scene.add(knotSolid);

    /* ═══ ENERGY CORE ═══ */
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(2.8, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x915eff, transparent: true, opacity: 0.045 })
    );
    scene.add(core);

    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(5.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x915eff, transparent: true, opacity: 0.018, side: THREE.BackSide })
    );
    scene.add(shell);

    /* ═══ GALAXY SPIRAL ═══ */
    const gCount = isMobile ? 5000 : 12000;
    const gGeo = new THREE.BufferGeometry();
    const gPos = new Float32Array(gCount * 3);
    const gCol = new Float32Array(gCount * 3);
    const arms = 4;
    const armAngle = (Math.PI * 2) / arms;

    for (let i = 0; i < gCount; i++) {
      const i3 = i * 3;
      const armIdx = i % arms;
      const radius = Math.pow(Math.random(), 0.55) * 50 + 3;
      const spin = radius * 0.22;
      const branch = armAngle * armIdx;
      const scatter = radius * 0.08;

      gPos[i3]     = Math.cos(branch + spin) * radius + (Math.random() - 0.5) * scatter * 2;
      gPos[i3 + 1] = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * 2.5;
      gPos[i3 + 2] = Math.sin(branch + spin) * radius + (Math.random() - 0.5) * scatter * 2;

      const c = new THREE.Color();
      c.lerpColors(new THREE.Color(0x915eff), new THREE.Color(0x00bfff), Math.min(radius / 50, 1));
      gCol[i3] = c.r; gCol[i3 + 1] = c.g; gCol[i3 + 2] = c.b;
    }

    gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    gGeo.setAttribute('color', new THREE.BufferAttribute(gCol, 3));

    const galaxy = new THREE.Points(gGeo, new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.13,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }));
    galaxy.rotation.x = Math.PI * 0.1;
    scene.add(galaxy);

    /* ═══ ORBITAL RINGS ═══ */
    const ringData = [
      { r: 6,   color: 0x915eff, speed:  0.004,  tX: 1.1, tY: 0.6 },
      { r: 7.8, color: 0x00bfff, speed: -0.003,  tX: 0.7, tY: 1.4 },
      { r: 10,  color: 0x915eff, speed:  0.002,  tX: 1.9, tY: 0.2 },
      { r: 12,  color: 0x00bfff, speed: -0.0015, tX: 0.3, tY: 1.7 },
      { r: 14.5,color: 0x915eff, speed:  0.001,  tX: 1.4, tY: 1.0 },
    ];

    const rings = ringData.map((d) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, 0.025, 16, 220),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.2 })
      );
      mesh.rotation.set(d.tX, d.tY, 0);
      scene.add(mesh);
      return { mesh, speed: d.speed };
    });

    /* ═══ DEBRIS FIELD ═══ */
    const debrisGeos = [
      new THREE.TetrahedronGeometry(0.18, 0),
      new THREE.OctahedronGeometry(0.14, 0),
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.IcosahedronGeometry(0.12, 0),
    ];
    const debrisCount = isMobile ? 12 : 40;
    const debris: THREE.Mesh[] = [];

    for (let i = 0; i < debrisCount; i++) {
      const geo = debrisGeos[i % debrisGeos.length];
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.68 + Math.random() * 0.22, 0.9, 0.52),
        emissive: new THREE.Color().setHSL(0.68 + Math.random() * 0.22, 0.9, 0.18),
        transparent: true,
        opacity: 0.65,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 18
      );
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      debris.push(m);
      scene.add(m);
    }

    /* ═══ LIGHTING ═══ */
    scene.add(new THREE.AmbientLight(0x1a1a3e, 0.35));

    const coreLight = new THREE.PointLight(0x915eff, 4, 35);
    scene.add(coreLight);

    const accent1 = new THREE.PointLight(0x00bfff, 2.5, 45);
    accent1.position.set(12, 6, 6);
    scene.add(accent1);

    const accent2 = new THREE.PointLight(0x915eff, 2, 40);
    accent2.position.set(-10, -5, 9);
    scene.add(accent2);

    /* ═══ MOUSE ═══ */
    let mouseX = 0, mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    /* ═══ ANIMATION LOOP ═══ */
    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // TorusKnot morph
      knotWire.rotation.x = t * 0.07;
      knotWire.rotation.y = t * 0.11;
      knotSolid.rotation.copy(knotWire.rotation);
      const breathe = 1 + Math.sin(t * 0.7) * 0.045;
      knotWire.scale.setScalar(breathe);
      knotSolid.scale.setScalar(breathe);

      // Core pulse
      (core.material as THREE.MeshBasicMaterial).opacity = 0.035 + Math.sin(t * 1.8) * 0.025;
      coreLight.intensity = 3 + Math.sin(t * 1.8) * 2;

      // Shell breathe
      const sb = 1 + Math.sin(t * 0.4) * 0.12;
      shell.scale.setScalar(sb);

      // Galaxy rotation
      galaxy.rotation.y = t * 0.012;

      // Rings
      rings.forEach((r) => { r.mesh.rotation.z += r.speed; });

      // Debris
      debris.forEach((d, i) => {
        d.rotation.x += 0.003 + i * 0.00008;
        d.rotation.y += 0.004 + i * 0.00008;
        d.position.y += Math.sin(t * 0.25 + i * 0.8) * 0.002;
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.018;
      camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.018;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  /* ═══════════ JSX ═══════════ */
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Depth overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05060f]/30 via-transparent to-[#05060f]/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6">
        <div className="max-w-5xl w-full mx-auto">
          {/* Status bar */}
          <motion.div
            className="flex items-center gap-3 mb-6 sm:mb-8 font-mono text-[10px] sm:text-xs text-[#915EFF]/80 tracking-widest"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            <span>AVAILABLE FOR WORK</span>
            <span className="hidden sm:inline mx-2 text-white/10">|</span>
            <span className="hidden sm:inline text-white/30">portfolio@v3.0</span>
          </motion.div>

          {/* Name & tagline */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
              <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">Hi, I'm</span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] via-[#b794f6] to-[#00bfff] drop-shadow-[0_0_40px_rgba(145,94,255,0.4)]">
                  ELANGO T
                </span>
                <span className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-[#915EFF]/15 to-[#00bfff]/15 blur-3xl -z-10 rounded-3xl animate-pulse" />
              </span>
            </h1>
            <div className="mt-4 sm:mt-6 flex items-center gap-2 font-mono text-base sm:text-xl md:text-2xl text-gray-300">
              <span className="text-[#915EFF]">{'>'}</span>
              <span>{typed}</span>
              <span className="inline-block w-[2px] h-5 sm:h-7 bg-[#915EFF] animate-[blink_1s_step-end_infinite]" />
            </div>
          </motion.div>

          {/* Terminal preview */}
          <AnimatePresence>
            {showTerminal && (
              <motion.div
                className="mt-8 sm:mt-10 max-w-xl"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <TerminalWindow title="~/elango — zsh">
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <span className="text-emerald-400">elango</span>
                      <span className="text-white/40">@</span>
                      <span className="text-[#00bfff]">dev</span>
                      <span className="text-white/40"> ~ $ </span>
                      <span className="text-white">whoami</span>
                    </p>
                    <p className="text-gray-400">Full Stack Developer | React & BigCommerce Specialist</p>
                    <p className="mt-2">
                      <span className="text-emerald-400">elango</span>
                      <span className="text-white/40">@</span>
                      <span className="text-[#00bfff]">dev</span>
                      <span className="text-white/40"> ~ $ </span>
                      <span className="text-white">cat stack.json</span>
                    </p>
                    <div className="text-gray-400">
                      <span className="text-[#915EFF]">{'{'}</span>{' '}
                      <span className="text-[#00bfff]">"frontend"</span>:{' '}
                      <span className="text-emerald-400">"React, Next.js, TS"</span>,
                      <br />
                      {'  '}
                      <span className="text-[#00bfff]">"backend"</span>:{' '}
                      <span className="text-emerald-400">"Node.js, GraphQL"</span>,
                      <br />
                      {'  '}
                      <span className="text-[#00bfff]">"ecommerce"</span>:{' '}
                      <span className="text-emerald-400">"BigCommerce, Sitecore"</span>{' '}
                      <span className="text-[#915EFF]">{'}'}</span>
                    </div>
                  </div>
                </TerminalWindow>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              className="group relative overflow-hidden rounded-xl px-7 py-3.5 font-semibold text-sm shadow-[0_0_30px_rgba(145,94,255,0.25)]"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#00bfff] transition-all duration-300 group-hover:opacity-90" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                View Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button
              className="group rounded-xl border border-white/10 px-7 py-3.5 font-semibold text-sm text-gray-300 hover:text-white hover:border-[#915EFF]/40 hover:bg-[#915EFF]/5 hover:shadow-[0_0_20px_rgba(145,94,255,0.1)] transition-all duration-300 backdrop-blur-sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center">
              <motion.div className="w-1 h-2 mt-1.5 rounded-full bg-[#915EFF]" animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </div>
            <span className="text-[10px] font-mono text-white/20 tracking-widest">SCROLL</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;