// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';

// export default function Hero3DBanner() {
//   const mountRef = useRef(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.fog = new THREE.FogExp2(0x0a0a0f, 0.02);
    
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       1000
//     );
    
//     const renderer = new THREE.WebGLRenderer({ 
//       antialias: true, 
//       alpha: true 
//     });
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     mountRef.current.appendChild(renderer.domElement);

//     // Create holographic code sphere
//     const sphereGeometry = new THREE.SphereGeometry(2.5, 64, 64);
//     const sphereMaterial = new THREE.MeshStandardMaterial({
//       color: 0x00ffff,
//       wireframe: true,
//       transparent: true,
//       opacity: 0.15,
//       emissive: 0x00ffff,
//       emissiveIntensity: 0.5
//     });
//     const holosphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     holosphere.position.set(0, 0, -2);
//     scene.add(holosphere);

//     // Inner rotating wireframe
//     const innerSphere = new THREE.Mesh(
//       new THREE.IcosahedronGeometry(2.2, 1),
//       new THREE.MeshBasicMaterial({
//         color: 0xff00ff,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.3
//       })
//     );
//     innerSphere.position.copy(holosphere.position);
//     scene.add(innerSphere);

//     // Create DNA helix-like structure
//     const helixPoints = [];
//     const helixRadius = 3;
//     const helixHeight = 8;
//     for (let i = 0; i < 200; i++) {
//       const t = (i / 200) * Math.PI * 4;
//       const x = Math.cos(t) * helixRadius;
//       const y = (i / 200) * helixHeight - helixHeight / 2;
//       const z = Math.sin(t) * helixRadius;
//       helixPoints.push(new THREE.Vector3(x, y, z - 5));
//     }
//     const helixGeometry = new THREE.BufferGeometry().setFromPoints(helixPoints);
//     const helixMaterial = new THREE.LineBasicMaterial({ 
//       color: 0x00ff88,
//       transparent: true,
//       opacity: 0.6
//     });
//     const helix = new THREE.Line(helixGeometry, helixMaterial);
//     scene.add(helix);

//     // Create second helix strand
//     const helix2Points = helixPoints.map(p => 
//       new THREE.Vector3(-p.x, p.y, p.z)
//     );
//     const helix2Geometry = new THREE.BufferGeometry().setFromPoints(helix2Points);
//     const helix2 = new THREE.Line(helix2Geometry, helixMaterial.clone());
//     scene.add(helix2);

//     // Create floating code fragments with text-like appearance
//     const codeFragments = [];
//     const fragmentColors = [
//       0x00ffff, 0xff00ff, 0xffff00, 0x00ff88, 
//       0xff0088, 0x0088ff, 0x88ff00, 0xff8800
//     ];

//     for (let i = 0; i < 40; i++) {
//       const geometry = new THREE.BoxGeometry(
//         Math.random() * 0.4 + 0.2,
//         Math.random() * 0.4 + 0.2,
//         0.05
//       );
//       const color = fragmentColors[Math.floor(Math.random() * fragmentColors.length)];
//       const material = new THREE.MeshStandardMaterial({
//         color: color,
//         emissive: color,
//         emissiveIntensity: 0.5,
//         metalness: 0.8,
//         roughness: 0.2
//       });
//       const fragment = new THREE.Mesh(geometry, material);
      
//       const radius = Math.random() * 12 + 5;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.random() * Math.PI;
      
//       fragment.position.x = radius * Math.sin(phi) * Math.cos(theta);
//       fragment.position.y = radius * Math.sin(phi) * Math.sin(theta);
//       fragment.position.z = radius * Math.cos(phi) - 8;
      
//       fragment.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
      
//       fragment.userData = {
//         originalPos: fragment.position.clone(),
//         speed: Math.random() * 0.02 + 0.01,
//         rotSpeed: (Math.random() - 0.5) * 0.03,
//         orbit: Math.random() * Math.PI * 2
//       };
      
//       codeFragments.push(fragment);
//       scene.add(fragment);
//     }

//     // Create data streams (lines shooting through space)
//     const streams = [];
//     for (let i = 0; i < 15; i++) {
//       const points = [];
//       const startPos = new THREE.Vector3(
//         (Math.random() - 0.5) * 20,
//         (Math.random() - 0.5) * 20,
//         -20
//       );
//       for (let j = 0; j < 50; j++) {
//         points.push(new THREE.Vector3(
//           startPos.x + (Math.random() - 0.5) * 0.5,
//           startPos.y + (Math.random() - 0.5) * 0.5,
//           startPos.z + j * 0.8
//         ));
//       }
//       const streamGeometry = new THREE.BufferGeometry().setFromPoints(points);
//       const streamMaterial = new THREE.LineBasicMaterial({
//         color: fragmentColors[i % fragmentColors.length],
//         transparent: true,
//         opacity: 0.6
//       });
//       const stream = new THREE.Line(streamGeometry, streamMaterial);
//       stream.userData = { speed: Math.random() * 0.1 + 0.05 };
//       streams.push(stream);
//       scene.add(stream);
//     }

//     // Enhanced particle system
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 2000;
//     const positions = new Float32Array(particlesCount * 3);
//     const colors = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 60;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      
//       const color = new THREE.Color(fragmentColors[i % fragmentColors.length]);
//       colors[i * 3] = color.r;
//       colors[i * 3 + 1] = color.g;
//       colors[i * 3 + 2] = color.b;
//     }

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.08,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.8,
//       blending: THREE.AdditiveBlending
//     });
//     const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particles);

//     // Dynamic lighting
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
//     scene.add(ambientLight);

//     const lights = [];
//     const lightColors = [0x00ffff, 0xff00ff, 0x00ff88];
//     lightColors.forEach((color, i) => {
//       const light = new THREE.PointLight(color, 2, 30);
//       light.userData = { 
//         angle: (i / lightColors.length) * Math.PI * 2,
//         radius: 8
//       };
//       lights.push(light);
//       scene.add(light);
//     });

//     camera.position.z = 12;
//     camera.position.y = 0;

//     // Mouse interaction
//     let mouseX = 0;
//     let mouseY = 0;
//     let targetX = 0;
//     let targetY = 0;

//     const handleMouseMove = (e) => {
//       mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//       mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     // Animation
//     let time = 0;
//     const animate = () => {
//       requestAnimationFrame(animate);
//       time += 0.01;

//       // Rotate holographic sphere
//       holosphere.rotation.y += 0.003;
//       holosphere.rotation.x += 0.002;
//       innerSphere.rotation.y -= 0.005;
//       innerSphere.rotation.x -= 0.003;

//       // Pulse holosphere
//       const scale = 1 + Math.sin(time * 2) * 0.05;
//       holosphere.scale.set(scale, scale, scale);

//       // Rotate helixes
//       helix.rotation.y += 0.005;
//       helix2.rotation.y += 0.005;

//       // Animate code fragments in orbit
//       codeFragments.forEach((fragment, i) => {
//         fragment.userData.orbit += fragment.userData.speed;
//         const radius = 6 + Math.sin(time + i) * 2;
        
//         fragment.position.x = Math.cos(fragment.userData.orbit) * radius;
//         fragment.position.z = Math.sin(fragment.userData.orbit) * radius - 5;
//         fragment.position.y = Math.sin(time * 2 + i) * 3;
        
//         fragment.rotation.x += fragment.userData.rotSpeed;
//         fragment.rotation.y += fragment.userData.rotSpeed * 0.5;
//       });

//       // Animate data streams
//       streams.forEach(stream => {
//         stream.position.z += stream.userData.speed;
//         if (stream.position.z > 20) {
//           stream.position.z = -20;
//         }
//       });

//       // Rotate particle cloud
//       particles.rotation.y += 0.0003;
//       particles.rotation.x = Math.sin(time * 0.3) * 0.1;

//       // Animate lights in circular motion
//       lights.forEach(light => {
//         light.userData.angle += 0.01;
//         light.position.x = Math.cos(light.userData.angle) * light.userData.radius;
//         light.position.z = Math.sin(light.userData.angle) * light.userData.radius;
//         light.position.y = Math.sin(time + light.userData.angle) * 3;
//       });

//       // Smooth camera movement
//       targetX += (mouseX * 4 - targetX) * 0.05;
//       targetY += (mouseY * 3 - targetY) * 0.05;
      
//       camera.position.x = targetX;
//       camera.position.y = targetY;
//       camera.lookAt(0, 0, -5);

//       renderer.render(scene, camera);
//     };

//     animate();
//     setIsLoaded(true);

//     // Handle resize
//     const handleResize = () => {
//       if (!mountRef.current) return;
//       camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       if (mountRef.current?.contains(renderer.domElement)) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
      
//       scene.traverse((object) => {
//         if (object.geometry) object.geometry.dispose();
//         if (object.material) {
//           if (Array.isArray(object.material)) {
//             object.material.forEach(mat => mat.dispose());
//           } else {
//             object.material.dispose();
//           }
//         }
//       });
      
//       renderer.dispose();
//     };
//   }, []);

//   return (
//     <div className="relative w-full h-screen bg-black overflow-hidden">
//       {/* Animated gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-purple-950/50 to-black animate-gradient-shift" />
      
//       {/* 3D Canvas */}
//       <div 
//         ref={mountRef} 
//         className={`absolute inset-0 transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
//       />
      
//       {/* Scanline effect */}
//       <div className="absolute inset-0 pointer-events-none opacity-10">
//         <div className="h-full w-full bg-[repeating-linear-gradient(0deg,#0ff_0px,transparent_2px,transparent_4px)] animate-scan" />
//       </div>
      
//       {/* Content Overlay */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
//         <div className="max-w-5xl text-center space-y-8">
//           {/* Glitch effect badge */}
//           <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/50 rounded-full text-cyan-400 text-sm font-mono mb-6 backdrop-blur-xl shadow-lg shadow-cyan-500/20">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
//             </span>
//             LIVE_STATUS: ONLINE
//           </div>
          
//           <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
//             <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
//               NEXT-GEN
//             </span>
//             <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x" style={{ animationDelay: '0.5s' }}>
//               DEVELOPER
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light tracking-wide">
//             Building the <span className="text-cyan-400 font-semibold">future</span> with 
//             <span className="text-purple-400 font-semibold"> immersive</span> digital experiences
//           </p>
          
//           <div className="flex flex-wrap gap-4 justify-center pt-8">
//             <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50">
//               <span className="relative z-10">Explore Projects</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>
//             <button className="px-10 py-4 bg-white/5 backdrop-blur-xl rounded-full font-bold text-lg border-2 border-white/20 hover:border-cyan-400/80 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
//               Get In Touch
//             </button>
//           </div>
          
//           <div className="flex gap-3 justify-center pt-10 flex-wrap">
//             {[
//               { name: 'React', color: 'cyan' },
//               { name: 'Three.js', color: 'purple' },
//               { name: 'Node.js', color: 'green' },
//               { name: 'TypeScript', color: 'blue' },
//               { name: 'WebGL', color: 'pink' },
//               { name: 'AI/ML', color: 'yellow' }
//             ].map((tech) => (
//               <span 
//                 key={tech.name}
//                 className={`px-5 py-2 bg-${tech.color}-500/10 backdrop-blur-xl rounded-lg text-sm font-mono border border-${tech.color}-500/30 hover:border-${tech.color}-400 hover:bg-${tech.color}-500/20 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg`}
//               >
//                 {tech.name}
//               </span>
//             ))}
//           </div>
//         </div>
        
//         {/* Animated scroll indicator */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
//           <div className="flex flex-col items-center gap-2 animate-bounce">
//             <div className="w-8 h-12 border-2 border-cyan-400/50 rounded-full flex justify-center p-2">
//               <div className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-scroll" />
//             </div>
//             <span className="text-cyan-400/70 text-xs font-mono">SCROLL</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Corner accents */}
//       <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30" />
//       <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-500/30" />
//       <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-purple-500/30" />
//       <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30" />
      
//       {/* Vignette effect */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      
//       <style jsx>{`
//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//         @keyframes scan {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100%); }
//         }
//         @keyframes scroll {
//           0% { transform: translateY(0); opacity: 0; }
//           50% { opacity: 1; }
//           100% { transform: translateY(16px); opacity: 0; }
//         }
//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradient-x 3s ease infinite;
//         }
//         .animate-scan {
//           animation: scan 8s linear infinite;
//         }
//         .animate-scroll {
//           animation: scroll 2s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const HeroBanner: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [glitchText, setGlitchText] = useState(false);
  const frameRef = useRef<number>(0);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light1 = new THREE.DirectionalLight(0x00ffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0xff00ff, 1);
    light2.position.set(-1, -1, 1);
    scene.add(light2);
    
    const ambientLight = new THREE.AmbientLight(0x0066ff, 0.5);
    scene.add(ambientLight);

    // Create main holographic sphere with vertex shader effects
    const sphereGeometry = new THREE.IcosahedronGeometry(4, 30);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      emissive: 0x1a1a2e,
      emissiveIntensity: 0.5,
      shininess: 100,
      specular: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Inner glowing core
    const coreGeometry = new THREE.SphereGeometry(3.5, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.1,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sphere.add(core);

    // Create particle field
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 1, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    starsRef.current = stars;
    scene.add(stars);

    // Create orbiting rings
    const createRing = (radius: number, color: number, speed: number) => {
      const ringGeometry = new THREE.TorusGeometry(radius, 0.05, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      return { mesh: ring, speed };
    };

    const rings = [
      createRing(5, 0x00ffff, 0.002),
      createRing(6, 0xff00ff, -0.003),
      createRing(7, 0xffff00, 0.004),
    ];
    
    rings.forEach(r => scene.add(r.mesh));

    // Data visualization elements - floating code blocks
    const codeBlocks: THREE.Mesh[] = [];
    const blockGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    
    for (let i = 0; i < 20; i++) {
      const blockMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 1, 0.5),
        emissive: new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 1, 0.3),
        transparent: true,
        opacity: 0.6,
      });
      const block = new THREE.Mesh(blockGeometry, blockMaterial);
      block.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      block.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      codeBlocks.push(block);
      scene.add(block);
    }

    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Animate main sphere
      if (sphereRef.current) {
        sphereRef.current.rotation.x = elapsedTime * 0.1;
        sphereRef.current.rotation.y = elapsedTime * 0.15;
        sphereRef.current.scale.x = 1 + Math.sin(elapsedTime * 2) * 0.05;
        sphereRef.current.scale.y = 1 + Math.sin(elapsedTime * 2) * 0.05;
        sphereRef.current.scale.z = 1 + Math.sin(elapsedTime * 2) * 0.05;
      }
      
      // Animate core
      core.rotation.x = -elapsedTime * 0.5;
      core.rotation.y = -elapsedTime * 0.7;
      
      // Animate rings
      rings.forEach((ring) => {
        ring.mesh.rotation.x += ring.speed;
        ring.mesh.rotation.y += ring.speed * 0.5;
        ring.mesh.rotation.z += ring.speed * 0.3;
      });
      
      // Animate code blocks
      codeBlocks.forEach((block, i) => {
        block.position.y += Math.sin(elapsedTime + i) * 0.002;
        block.position.x += Math.cos(elapsedTime + i) * 0.001;
        block.rotation.x += 0.01;
        block.rotation.y += 0.01;
        
        // Pulse effect
        const scale = 1 + Math.sin(elapsedTime * 3 + i) * 0.1;
        block.scale.set(scale, scale, scale);
      });
      
      // Rotate stars
      if (starsRef.current) {
        starsRef.current.rotation.x = elapsedTime * 0.05;
        starsRef.current.rotation.y = elapsedTime * 0.075;
      }
      
      // Mouse interaction
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Glitch effect timer
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 5000);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0 opacity-90" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Terminal-style header */}
          <div className="mb-8 font-mono text-xs text-cyan-400 opacity-70 tracking-wider">
            <span className="animate-pulse">[SYSTEM INITIALIZED]</span>
            <span className="mx-4">|</span>
            <span>PORTFOLIO.v2.0</span>
          </div>
          
          {/* Glitch effect name */}
          <div className="relative mb-6">
            <h1 
              className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter ${
                glitchText ? 'glitch' : ''
              }`}
            >
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  ELANGO T
                </span>
                <span className="absolute top-0 left-0 text-red-500 opacity-50 animate-glitch-1" aria-hidden="true">
                  ELANGO T
                </span>
                <span className="absolute top-0 left-0 text-cyan-500 opacity-50 animate-glitch-2" aria-hidden="true">
                  ELANGO T
                </span>
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-white">
                Code. Design. Innovate
              </span>
            </h1>
          </div>
          
          {/* Animated role with typewriter effect */}
          <div className="mb-8">
            <div className="inline-block px-6 py-2 border border-cyan-500/30 bg-cyan-500/5 rounded-full mb-4">
              <p className="text-cyan-400 font-mono text-sm tracking-widest">
                &lt;FULLSTACK_DEVELOPER /&gt;
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative px-4 py-2 bg-black border border-gray-800 rounded-lg">
                  <span className="text-purple-400 font-mono">BigCommerce Expert</span>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative px-4 py-2 bg-black border border-gray-800 rounded-lg">
                  <span className="text-cyan-400 font-mono">E-Commerce Developer</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tech stack with neon effect */}
          <div className="mb-10 space-y-2">
            <div className="text-gray-500 text-xs font-mono mb-3">TECH_STACK.init()</div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { name: 'React', color: 'from-cyan-500 to-blue-500' },
                { name: 'TypeScript', color: 'from-blue-500 to-indigo-500' },
                { name: 'Node.js', color: 'from-green-500 to-emerald-500' },
                { name: 'BigCommerce', color: 'from-purple-500 to-pink-500' },
                { name: 'Next.js', color: 'from-gray-400 to-gray-600' },
                { name: 'MongoDB', color: 'from-green-600 to-lime-500' },
                { name: 'GraphQL', color: 'from-pink-500 to-rose-500' },
                { name: 'AWS', color: 'from-orange-500 to-yellow-500' }
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="group relative cursor-pointer"
                >
                  <span className={`absolute inset-0 bg-gradient-to-r ${tech.color} rounded blur-md opacity-50 group-hover:opacity-100 transition-opacity`}></span>
                  <span className="relative block px-3 py-1 bg-black/80 border border-gray-800 rounded text-xs text-gray-300 hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons with cyber effect */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 overflow-hidden">
              <div className="absolute inset-0 w-full h-full transition duration-300 group-hover:rotate-180">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur-sm"></div>
              </div>
              <span className="relative flex items-center gap-2 px-8 py-3 bg-black border border-cyan-500/50 rounded-lg text-cyan-400 font-bold hover:text-white transition-colors">
                EXPLORE PROJECTS
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group relative px-8 py-3 border border-gray-700 rounded-lg text-gray-400 font-bold hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 bg-black/50 backdrop-blur-sm">
              <span className="relative z-10">INITIALIZE CONTACT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/5 to-cyan-600/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></div>
            </button>
          </div>
          
          <div className="mt-12 font-mono text-xs text-green-500/50 overflow-hidden">
            <div className="animate-matrix-rain">
              {`01001000 01001001 01010010 01000101 00100000 01001101 01000101`}
            </div>
          </div>
        </div>
      </div>

      <div className="scanline"></div>
      
      <style>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        @keyframes matrix-rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite reverse;
        }
        
        .animate-matrix-rain {
          animation: matrix-rain 20s linear infinite;
        }
        
        .glitch {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                      -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                      0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch-effect 0.5s infinite;
        }
        
        @keyframes glitch-effect {
          0%, 100% { text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75); }
          50% { text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75); }
        }
        
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.4), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
        }
        
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;