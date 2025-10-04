import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

const Stars = () => {
  const ref = useRef<THREE.Points>(null);

  // Generate star positions in a circle/disk
  const [positions] = useState<Float32Array>(() => {
    const numPoints = 2666; // 2666 points
    const arr = new Float32Array(numPoints * 3);

    const radius = 1.5;
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * Math.PI * 2; // full circle
      const r = Math.sqrt(Math.random()) * radius; // uniform in disk
      arr[i * 3] = r * Math.cos(angle);           // x
      arr[i * 3 + 1] = r * Math.sin(angle);       // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // small Z variance
    }

    return arr;
  });

  // Generate star colors
  const [colors, setColors] = useState<Float32Array>(new Float32Array(0));
  useEffect(() => {
    const arr = new Float32Array(positions.length);
    for (let i = 0; i < positions.length; i += 3) {
      const t = Math.random();
      const color = new THREE.Color().setHSL(0.6 + t * 0.2, 0.8, 0.6);
      arr[i] = color.r;
      arr[i + 1] = color.g;
      arr[i + 2] = color.b;
    }
    setColors(arr);
  }, [positions]);

  // Rotate the star field slowly
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta / 10; // rotate around Z for circular effect
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          {colors.length > 0 && (
            <bufferAttribute
              attach="attributes-color"
              count={colors.length / 3}
              array={colors}
              itemSize={3}
            />
          )}
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          size={0.012}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 2] }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
