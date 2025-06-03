"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Enhanced nebula cloud effect for solar system background
export function NebulaEffect() {
  const particlesCount = 2000;
  const particlesRef = useRef<THREE.Points>(null);

  // Initialize particle data with useMemo for better performance
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Create particles in a cloud-like formation with more variation
      const radius = 30 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      // Create a more dynamic and interesting distribution
      const distortFactor = Math.random() * 0.2;
      const x = radius * Math.sin(phi) * Math.cos(theta) * (1 + distortFactor);
      const y = (Math.random() - 0.5) * 20; // Flattened on Y axis
      const z = radius * Math.sin(phi) * Math.sin(theta) * (1 + distortFactor);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Create a better blue-purple nebula color scheme with more variance
      const colorType = Math.random(); // Random color selector
      let hue, saturation, lightness;

      if (colorType < 0.5) {
        // Blue-cyan range
        hue = 0.55 + Math.random() * 0.15;
        saturation = 0.7 + Math.random() * 0.3;
        lightness = 0.5 + Math.random() * 0.3;
      } else if (colorType < 0.8) {
        // Purple range
        hue = 0.7 + Math.random() * 0.1;
        saturation = 0.6 + Math.random() * 0.4;
        lightness = 0.4 + Math.random() * 0.4;
      } else {
        // Occasional bright yellow-white accents
        hue = 0.15 + Math.random() * 0.05;
        saturation = 0.5 + Math.random() * 0.3;
        lightness = 0.7 + Math.random() * 0.3;
      }

      const color = new THREE.Color().setHSL(hue, saturation, lightness);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // More varied particle sizes
      sizes[i] = 0.3 + Math.random() * Math.random() * 3.5;
    }

    return { positions, colors, sizes };
  }, []);

  // Material for nebula particles with optimized rendering
  const particleMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime() * 0.05;

      // Slow rotation of the entire particle system with subtle wobble
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.02;
      particlesRef.current.rotation.z = Math.cos(time * 0.08) * 0.01;

      // Pulsate the overall size slightly for a breathing effect
      const pulseScale = 1 + Math.sin(time * 0.2) * 0.01;
      particlesRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <primitive object={particleMaterial} attach="material" />
    </points>
  );
}

// Enhanced orbit trails effect for planets
interface OrbitTrailsProps {
  orbitRadius: number;
  color?: string;
}

export function OrbitTrails({
  orbitRadius,
  color = "#4299E1",
}: OrbitTrailsProps) {
  const trailRef = useRef<THREE.Points>(null);
  const particlesCount = 150; // More particles for denser trails

  // Use useMemo to prevent recreating data on each render
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    const baseColor = new THREE.Color(color);
    const colorObj = { r: baseColor.r, g: baseColor.g, b: baseColor.b };

    for (let i = 0; i < particlesCount; i++) {
      const angle = (i / particlesCount) * Math.PI * 2;

      // Add slight vertical variation for 3D appearance
      const verticalVariation = (Math.random() - 0.5) * 0.1;

      // Add slight radial variation for a more natural look
      const radialVariation = 1 + (Math.random() - 0.5) * 0.1;

      positions[i * 3] = Math.sin(angle) * orbitRadius * radialVariation;
      positions[i * 3 + 1] = verticalVariation;
      positions[i * 3 + 2] = Math.cos(angle) * orbitRadius * radialVariation;

      // Create a gradient effect along the orbit
      const gradientPosition = i / particlesCount;
      const intensity = 0.3 + 0.7 * (1 - Math.abs(gradientPosition * 2 - 1));

      colors[i * 3] = colorObj.r * intensity;
      colors[i * 3 + 1] = colorObj.g * intensity;
      colors[i * 3 + 2] = colorObj.b * intensity;

      // Varying sizes with pattern
      sizes[i] = 0.2 + Math.sin(i * 0.2) * 0.15 + Math.random() * 0.3;
    }

    return { positions, colors, sizes };
  }, [orbitRadius, color]);

  // Material for orbit trails
  const trailMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (trailRef.current) {
      const time = clock.getElapsedTime();

      // Pulse effect with subtle wobble
      const scale = 1 + Math.sin(time * 2) * 0.05;
      trailRef.current.scale.set(scale, 1, scale);

      // Rotation effect to simulate particle movement
      trailRef.current.rotation.y = time * 0.1;

      // Optional subtle wobble
      trailRef.current.rotation.x = Math.sin(time * 0.5) * 0.01;
    }
  });

  return (
    <points ref={trailRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <primitive object={trailMaterial} attach="material" />
    </points>
  );
}

// New component for dynamic glow around active planets
interface PlanetGlowProps {
  position: [number, number, number];
  radius: number;
  color: string;
  active: boolean;
}

export function PlanetGlow({
  position,
  radius,
  color,
  active,
}: PlanetGlowProps) {
  const glowRef = useRef<THREE.Mesh>(null);

  // Optimized material creation
  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      }),
    [color]
  );

  useFrame(({ clock }) => {
    if (glowRef.current && active) {
      const time = clock.getElapsedTime();
      const pulse = 1 + Math.sin(time * 3) * 0.1;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  if (!active) return null;

  return (
    <mesh ref={glowRef} position={position} scale={2}>
      <sphereGeometry args={[radius, 16, 16]} />
      <primitive object={glowMaterial} attach="material" />
    </mesh>
  );
}
