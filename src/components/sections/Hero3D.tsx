import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";

const Hero3D = () => {
  return (
    <Canvas camera={{ position: [0, 1.5, 10], fov: 50 }}>
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[-2, 0.5, -2]} rotation={[0.1, 0.5, 0]}>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial color="#00BFFF" metalness={0.5} roughness={0.2} />
        </mesh>

        <mesh position={[2, 1, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#915EFF" metalness={0.5} roughness={0.2} />
        </mesh>

        <mesh position={[0, -1, 2]} rotation={[0.2, 0.1, 0]}>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshStandardMaterial color="#00BFFF" metalness={0.5} roughness={0.2} />
        </mesh>
      </Float>

      {/* Floating digital particles */}
      {[...Array(30)].map((_, i) => (
        <mesh key={i} position={[Math.random() * 10 - 5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" />
        </mesh>
      ))}

      {/* Camera controls */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default Hero3D;

