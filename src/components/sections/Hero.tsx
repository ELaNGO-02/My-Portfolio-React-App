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
      

      if (sphereRef.current) {
        sphereRef.current.rotation.x = elapsedTime * 0.1;
        sphereRef.current.rotation.y = elapsedTime * 0.15;
        sphereRef.current.scale.x = 1 + Math.sin(elapsedTime * 2) * 0.05;
        sphereRef.current.scale.y = 1 + Math.sin(elapsedTime * 2) * 0.05;
        sphereRef.current.scale.z = 1 + Math.sin(elapsedTime * 2) * 0.05;
      }

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