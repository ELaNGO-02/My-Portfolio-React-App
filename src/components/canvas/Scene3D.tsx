import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════
   NEBULA STAR FIELD — Dense, vivid, scroll-reactive
   ═══════════════════════════════════════════════════ */
const NebulaStars = ({ count = 6000 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread far in a huge sphere
      const r = 3 + Math.pow(Math.random(), 0.4) * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      // Vivid purple-to-cyan gradient
      const t = Math.random();
      const c = new THREE.Color().setHSL(
        0.68 + t * 0.2,
        0.9,
        0.5 + Math.random() * 0.4
      );
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.008) * 0.06;
    // Twinkle effect via opacity
    (ref.current.material as THREE.PointsMaterial).opacity =
      0.65 + Math.sin(t * 0.5) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════
   ENERGY STREAMS — Animated particle trails
   ═══════════════════════════════════════════════════ */
const EnergyStream = ({ radius = 6, speed = 0.5, color = '#915eff', particleCount = 300 }: {
  radius?: number; speed?: number; color?: string; particleCount?: number;
}) => {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const i3 = i * 3;
      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = (Math.random() - 0.5) * 1.5;
      pos[i3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [particleCount, radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * speed;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    ref.current.rotation.z = Math.cos(t * 0.15) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={particleCount} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ═══════════════════════════════════════════════════
   FLOATING WIREFRAME SHAPES — More visible
   ═══════════════════════════════════════════════════ */
const FloatingShape = ({ position, children, speed = 0.3, rotSpeed = 1, color = '#915eff', opacity = 0.12 }: {
  position: [number, number, number]; children: React.ReactNode;
  speed?: number; rotSpeed?: number; color?: string; opacity?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = baseY + Math.sin(t * speed) * 1.2;
    ref.current.rotation.x += rotSpeed * 0.003;
    ref.current.rotation.y += rotSpeed * 0.004;
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════
   GLOWING ORB — Volumetric light at center
   ═══════════════════════════════════════════════════ */
const GlowingOrb = () => {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 0.8) * 0.15;
    ref.current.scale.setScalar(s);
  });

  return (
    <group ref={ref} position={[0, 0, -5]}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#915eff" transparent opacity={0.3} />
      </mesh>
      {/* Glow layers */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#915eff" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#6b3fa0" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#4a1d96" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

/* ═══════════════════════════════════════════════════
   SCROLL-REACTIVE CAMERA
   ═══════════════════════════════════════════════════ */
const InteractiveCamera = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      scroll.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = scroll.current;

    // Mouse parallax - stronger
    camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.015;
    camera.position.y += (mouse.current.y * 1.0 - camera.position.y) * 0.015;

    // Scroll: camera zooms in and rotates as user scrolls
    camera.position.z = 14 - s * 6;

    // Gentle automatic orbit
    const orbitX = Math.sin(t * 0.05) * 0.3;
    const orbitY = Math.cos(t * 0.04) * 0.2;
    camera.position.x += orbitX * 0.02;
    camera.position.y += orbitY * 0.02;

    camera.lookAt(0, 0, -2);
  });

  return null;
};

/* ═══════════════════════════════════════════════════
   ASSEMBLED SCENE
   ═══════════════════════════════════════════════════ */
const Scene = () => (
  <>
    <fog attach="fog" args={['#05060f', 6, 50]} />
    <ambientLight intensity={0.08} />

    {/* Strong lights */}
    <pointLight position={[8, 5, 4]} color="#915eff" intensity={1.2} distance={45} />
    <pointLight position={[-6, -4, 6]} color="#00bfff" intensity={0.9} distance={40} />
    <pointLight position={[0, 8, -5]} color="#b794f6" intensity={0.5} distance={35} />

    {/* Particle universe */}
    <NebulaStars count={6000} />

    {/* Energy streams — orbital trails */}
    <EnergyStream radius={5} speed={0.3} color="#915eff" particleCount={250} />
    <EnergyStream radius={8} speed={-0.2} color="#00bfff" particleCount={200} />
    <EnergyStream radius={12} speed={0.12} color="#b794f6" particleCount={180} />

    {/* Central glow */}
    <GlowingOrb />

    {/* Wireframe shapes — bolder */}
    <FloatingShape position={[-8, 4, -8]} speed={0.2} rotSpeed={0.8} color="#915eff" opacity={0.15}>
      <icosahedronGeometry args={[2.2, 1]} />
    </FloatingShape>
    <FloatingShape position={[9, -3, -12]} speed={0.28} rotSpeed={-0.6} color="#00bfff" opacity={0.12}>
      <torusGeometry args={[2, 0.4, 16, 50]} />
    </FloatingShape>
    <FloatingShape position={[-5, -5, -9]} speed={0.35} rotSpeed={0.5} color="#915eff" opacity={0.14}>
      <octahedronGeometry args={[1.6, 0]} />
    </FloatingShape>
    <FloatingShape position={[6, 6, -14]} speed={0.15} rotSpeed={-0.7} color="#00bfff" opacity={0.1}>
      <dodecahedronGeometry args={[1.8, 0]} />
    </FloatingShape>
    <FloatingShape position={[0, -7, -10]} speed={0.22} rotSpeed={0.4} color="#b794f6" opacity={0.13}>
      <torusKnotGeometry args={[1.2, 0.35, 80, 12]} />
    </FloatingShape>
    <FloatingShape position={[11, 1, -16]} speed={0.12} rotSpeed={0.6} color="#00bfff" opacity={0.1}>
      <icosahedronGeometry args={[1.5, 0]} />
    </FloatingShape>
    <FloatingShape position={[-11, 3, -18]} speed={0.18} rotSpeed={-0.4} color="#915eff" opacity={0.12}>
      <tetrahedronGeometry args={[1.8, 0]} />
    </FloatingShape>
    <FloatingShape position={[3, 9, -20]} speed={0.1} rotSpeed={0.35} color="#00bfff" opacity={0.08}>
      <dodecahedronGeometry args={[2.2, 0]} />
    </FloatingShape>

    <InteractiveCamera />
  </>
);

/* ═══════════════════════════════════════════════════
   CANVAS WRAPPER
   ═══════════════════════════════════════════════════ */
const Scene3D = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 640) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Scene3D;