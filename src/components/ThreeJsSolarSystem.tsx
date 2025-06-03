"use client";

import { useState, useRef, Suspense, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls, Html, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useSkills } from "@/lib/skills-context";
import ClientOnly from "./ClientOnly";
import { NebulaEffect, OrbitTrails } from "./NebulaEffects";

// Sun component with optimizations
function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (sunRef.current) {
      // Rotate the sun slowly
      sunRef.current.rotation.y = time * 0.1;
    }

    if (glowRef.current) {
      // Pulsating glow effect
      const scale = 1 + Math.sin(time) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }

    if (coronaRef.current) {
      // Rotate corona in opposite direction
      coronaRef.current.rotation.y = -time * 0.05;
      coronaRef.current.rotation.z = time * 0.03;
    }
  });

  // Use useMemo for materials to prevent unnecessary recreations
  const sunMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FDB813",
        emissive: "#FFA500",
        emissiveIntensity: 1,
      }),
    []
  );

  const coronaMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF7300",
        emissive: "#FF5500",
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FFCC00",
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return (
    <group>
      {/* Core sun */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <primitive object={sunMaterial} attach="material" />
      </mesh>

      {/* Corona effect */}
      <mesh ref={coronaRef} scale={1.2}>
        <sphereGeometry args={[2, 32, 32]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[2, 16, 16]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Light sources */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color="#FFA500"
        distance={100}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        color="#FFFFFF"
        distance={30}
      />
      <ambientLight intensity={0.2} color="#FFEBCD" />
    </group>
  );
}

// Custom optimized Stars component
function CustomStars({ count = 500 }) {
  // Use useMemo to prevent recreating positions on every render
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random positions within a sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random sizes
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return { positions, sizes };
  }, [count]);

  // Use useMemo for material to prevent unnecessary recreations
  const starsMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        color: "white",
        transparent: true,
        opacity: 0.8,
      }),
    []
  );

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <primitive object={starsMaterial} attach="material" />
    </points>
  );
}

// Planet component with enhanced interactivity
interface PlanetProps {
  position: [number, number, number];
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase?: number; // Initial phase angle for orbit
  texture: string;
  skill: {
    id: string;
    name: string;
    level: number;
    description?: string;
    yearsExperience?: number;
  };
  onPlanetClick?: (skillId: string) => void;
  isActive?: boolean;
  index?: number; // Index for shape variations
}

function Planet({
  position,
  radius,
  orbitRadius,
  orbitSpeed,
  orbitPhase = 0,
  texture,
  skill,
  onPlanetClick,
  isActive = false,
  index = 0,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate color based on skill level
  const skillLevel = skill.level / 100; // Convert to 0-1 range

  // More vibrant color palette based on skill level
  let colorHue: number;
  if (skillLevel > 0.8) {
    // High level - Blue to Cyan
    colorHue = 0.5 + (skillLevel - 0.8) * 0.5;
  } else if (skillLevel > 0.6) {
    // Medium-high level - Purple to Blue
    colorHue = 0.7 - (skillLevel - 0.6) * 1.0;
  } else if (skillLevel > 0.4) {
    // Medium level - Magenta to Purple
    colorHue = 0.8 - (skillLevel - 0.4) * 0.5;
  } else {
    // Lower level - Orange to Magenta
    colorHue = 0.9 + (1 - skillLevel * 2.5) * 0.1;
  }

  // Create texture loader
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  // Use texture if available, otherwise use color
  const [planetMap, setPlanetMap] = useState<THREE.Texture | null>(null);
  // Load texture effect
  useEffect(() => {
    // Try to load texture, fallback to procedural if error
    if (texture && texture.startsWith("/")) {
      textureLoader.load(
        texture,
        (loadedTexture) => {
          // Configure texture for icon display
          loadedTexture.minFilter = THREE.LinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          loadedTexture.anisotropy = 16; // Higher quality texture filtering
          setPlanetMap(loadedTexture);
        },
        undefined,
        () => {
          console.log("Failed to load texture", texture);
          setPlanetMap(null);
        }
      );
    }

    return () => {
      // Cleanup texture when component unmounts
      if (planetMap) {
        planetMap.dispose();
      }
    };
  }, [texture, textureLoader]);
  // Use useMemo for material to prevent recreations on every render
  const planetMaterial = useMemo(() => {
    // Create base color from skill level
    const planetColor = new THREE.Color().setHSL(
      colorHue,
      0.7,
      0.5 + skillLevel * 0.3
    );

    // When using icon textures, we need different material settings
    return new THREE.MeshBasicMaterial({
      color: 0xffffff, // Use white to not tint the textures
      map: planetMap,
      transparent: true,
      alphaTest: 0.1, // Helps with transparent textures
      side: THREE.DoubleSide, // Show both sides
    });
  }, [colorHue, skillLevel, planetMap]);

  // Glow material for the planet
  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(colorHue, 0.8, 0.7),
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    [colorHue]
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4299E1",
        emissive: "#4299E1",
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  const { camera } = useThree();
  // Use a simple circular plane for displaying icon textures
  const planetGeometry = useMemo(() => {
    // Use a circular plane (disc) for better icon display
    return new THREE.CircleGeometry(radius, 32);
  }, [radius]);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Calculate orbital position with initial phase offset
    if (planetRef.current && labelRef.current) {
      const angle = orbitPhase + time * orbitSpeed;
      const x = Math.sin(angle) * orbitRadius;
      const z = Math.cos(angle) * orbitRadius;

      planetRef.current.position.x = x;
      planetRef.current.position.z = z;

      // Make icon always face the camera
      planetRef.current.quaternion.copy(camera.quaternion);

      // Move label with planet
      labelRef.current.position.x = x;
      labelRef.current.position.z = z;

      // Make label face camera
      labelRef.current.quaternion.copy(camera.quaternion);
    }

    // Animate glow effect
    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  // Create orbit points
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.sin(angle) * orbitRadius,
          0,
          Math.cos(angle) * orbitRadius
        )
      );
    }
    return points;
  }, [orbitRadius]);

  const orbitGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(orbitPoints),
    [orbitPoints]
  );

  // Function to handle clicking on a planet
  const handlePlanetClick = () => {
    if (onPlanetClick) {
      onPlanetClick(skill.id);
    }
  };
  return (
    <group>
      {/* Orbit path */}
      <line>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial
          attach="material"
          color={hovered || isActive ? "#4299E1" : "#1A365D"}
          opacity={isActive ? 0.8 : 0.5}
          transparent
          linewidth={1}
        />
      </line>
      {/* Planet */}
      <mesh
        ref={planetRef}
        position={position}
        onPointerOver={() => {
          setHovered(true);
          setShowTooltip(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          setShowTooltip(false);
        }}
        onClick={handlePlanetClick}
        scale={isActive ? 1.2 : 1}
      >
        <primitive object={planetGeometry} attach="geometry" />
        <primitive object={planetMaterial} attach="material" />
      </mesh>{" "}
      {/* Glow effect */}
      <mesh
        ref={glowRef}
        position={position}
        scale={1.5}
        visible={isActive || hovered}
      >
        <circleGeometry args={[radius * 1.2, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      {/* Skill indicator ring */}
      <mesh
        position={position}
        scale={1.15}
        rotation={[Math.PI / 2, 0, 0]}
        visible={hovered || isActive}
      >
        <torusGeometry args={[radius * 0.7, radius * 0.05, 16, 32]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>{" "}
      {/* Always visible skill name label next to planet */}
      <group ref={labelRef} position={position}>
        <Text
          position={[radius * 1.5, 0, 0]}
          color="white"
          anchorX="left"
          anchorY="middle"
          fontSize={radius * 0.6}
          material-transparent
          material-opacity={hovered || isActive ? 1 : 0.7}
          outlineColor="black"
          outlineWidth={0.02}
        >
          {skill.name}
        </Text>

        {/* Small skill level indicator */}
        <mesh position={[radius * 1.4, 0, 0]} scale={radius * 0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(colorHue, 0.9, 0.6)}
          />
        </mesh>
      </group>
      {(showTooltip || isActive) && (
        <Html distanceFactor={15} position={[0, radius * 2, 0]} center>
          <div className="bg-black/80 text-white p-3 rounded-lg shadow-lg border border-blue-500/30 min-w-40 backdrop-blur-sm">
            <p className="font-medium text-sm mb-1">{skill.name}</p>
            <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-blue-300">{skill.level}% Proficiency</span>
              {(skill as any).yearsExperience && (
                <span className="text-purple-300">
                  {(skill as any).yearsExperience}+ years
                </span>
              )}
            </div>

            {(skill as any).description && (
              <p className="text-xs mt-2 text-gray-300 border-t border-blue-500/20 pt-2">
                {(skill as any).description}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// CameraController component to handle zoom to specific planets
interface CameraControllerProps {
  target: THREE.Vector3 | null;
  reset: boolean;
}

function CameraController({ target, reset }: CameraControllerProps) {
  const { camera } = useThree();
  const controls = useRef<any>(null);

  useFrame(() => {
    if (controls.current) {
      if (target) {
        // Smooth zoom to target planet
        const currentTarget = controls.current.target;
        const targetPosition = new THREE.Vector3(target.x, target.y, target.z);

        // Lerp to the target position for smooth transition
        currentTarget.lerp(targetPosition, 0.05);

        // Adjust camera position to get a good view of the target
        const idealCameraPosition = new THREE.Vector3(
          target.x + 10,
          target.y + 8,
          target.z + 10
        );
        camera.position.lerp(idealCameraPosition, 0.03);

        controls.current.update();
      }

      if (reset) {
        // Smooth reset to default position
        const defaultTarget = new THREE.Vector3(0, 0, 0);
        const defaultCameraPosition = new THREE.Vector3(0, 20, 30);

        controls.current.target.lerp(defaultTarget, 0.05);
        camera.position.lerp(defaultCameraPosition, 0.03);
        controls.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      zoomSpeed={0.5}
      rotateSpeed={0.5}
      minDistance={5}
      maxDistance={80}
      dampingFactor={0.05}
      enableDamping={true}
    />
  );
}

// Map of category colors
const categoryColors: Record<string, string> = {
  "Frontend Development": "#3182CE", // Blue
  "WordPress Development": "#805AD5", // Purple
  "UI Design": "#38B2AC", // Teal
};

// Main solar system component with category selection
interface SolarSystemProps {
  singleCategoryMode?: boolean;
  fixedCategory?: string;
  height?: string;
}

export default function ThreeJsSolarSystem({
  singleCategoryMode = false,
  fixedCategory,
  height = "500px",
}: SolarSystemProps) {
  const { skills, getSkillIcon } = useSkills();
  const [activeCategory, setActiveCategory] = useState<string>(
    fixedCategory || Object.keys(skills)[0] || "Frontend Development"
  );
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [cameraReset, setCameraReset] = useState(false);
  const [zoomTarget, setZoomTarget] = useState<THREE.Vector3 | null>(null);

  const categories =
    singleCategoryMode && fixedCategory ? [fixedCategory] : Object.keys(skills);
  // Handle planet click to zoom in
  const handlePlanetClick = (skillId: string) => {
    setSelectedSkillId(skillId === selectedSkillId ? null : skillId);

    // Find the planet position for camera targeting
    if (skillId !== selectedSkillId) {
      skills[activeCategory].forEach((skill, index) => {
        if (skill.id === skillId) {
          const orbitRadius = 5 + index * 2.5;
          // Use deterministic angle based on index, not random
          const fixedRandomAngle = (index * 1.618033988749) % (2 * Math.PI);
          const x = Math.sin(fixedRandomAngle) * orbitRadius;
          const z = Math.cos(fixedRandomAngle) * orbitRadius;

          setZoomTarget(new THREE.Vector3(x, 0, z));
          setCameraReset(false);
        }
      });
    } else {
      // Reset camera when deselecting
      setZoomTarget(null);
      setCameraReset(true);
      // Stop reset animation after a delay
      setTimeout(() => setCameraReset(false), 2000);
    }
  };

  // Reset selection when changing categories
  const handleCategoryChange = (category: string) => {
    setSelectedSkillId(null);
    setActiveCategory(category);
    setCameraReset(true);
    setZoomTarget(null);
    // Stop reset animation after a delay
    setTimeout(() => setCameraReset(false), 2000);
  };

  return (
    <section
      id="skills-universe"
      className="py-16 md:py-24 bg-gradient-to-b from-black via-blue-950/5 to-black relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Skills Universe
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore my technical expertise in this interactive 3D visualization
          </p>
        </motion.div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-xl transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-br from-blue-900/90 to-indigo-900/80 text-white shadow-lg border border-blue-500/50"
                  : "bg-black/40 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/50 text-white/80"
              }`}
            >
              <h3 className="text-lg font-medium">{category}</h3>
            </motion.button>
          ))}
        </div>

        {/* 3D Solar System */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[500px] md:h-[600px] bg-black/20 backdrop-blur-sm rounded-xl border border-blue-500/10 overflow-hidden relative"
          style={{ height: singleCategoryMode ? height : "600px" }}
        >
          <ClientOnly
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="space-y-3 text-center">
                  <div className="w-12 h-12 relative mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-blue-400 border-b-blue-300 border-l-transparent animate-spin"></div>
                  </div>
                  <p className="text-blue-400 text-sm">
                    Loading Skills Universe...
                  </p>
                </div>
              </div>
            }
          >
            <Canvas camera={{ position: [0, 20, 30], fov: 50 }}>
              <color attach="background" args={["#000"]} />
              <fog attach="fog" args={["#000", 30, 90]} />
              <ambientLight intensity={0.2} />

              <Suspense fallback={null}>
                {/* Visual atmosphere */}
                <NebulaEffect />
                <Stars count={1000} />
                <CustomStars count={500} />
                {/* Sun */}
                <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
                  <Sun />
                </Float>
                {/* Planets */}{" "}
                {skills[activeCategory]?.map((skill, index) => {
                  // Calculate orbit parameters based on skill index
                  const orbitRadius = 5 + index * 2.5; // Increasing orbit radius
                  const orbitSpeed = 0.1 / Math.sqrt(orbitRadius); // Speed based on orbit size (Kepler's law)

                  // Fixed random angle for each planet using golden ratio for natural distribution
                  // Golden ratio (1.618033988749) helps create more visually pleasing distribution
                  const fixedRandomAngle =
                    (index * 1.618033988749) % (2 * Math.PI);
                  const initialX = Math.sin(fixedRandomAngle) * orbitRadius;
                  const initialZ = Math.cos(fixedRandomAngle) * orbitRadius;

                  // Vary orbit speed based on skill level - higher skills move slightly faster
                  const speedVariation = 0.8 + (skill.level / 100) * 0.4; // 0.8-1.2 range based on skill level
                  const adjustedOrbitSpeed = orbitSpeed * speedVariation; // Make planets a bit larger for better icon visibility
                  const planetSize = 1.2 + (skill.level / 100) * 0.6; // Larger size for displaying icon textures

                  // Get color based on category
                  const orbitColor =
                    categoryColors[activeCategory] || "#4299E1";

                  return (
                    <group key={skill.id}>
                      <OrbitTrails
                        orbitRadius={orbitRadius}
                        color={orbitColor}
                      />
                      <Planet
                        position={[initialX, 0, initialZ]}
                        radius={planetSize}
                        orbitRadius={orbitRadius}
                        orbitSpeed={adjustedOrbitSpeed}
                        orbitPhase={fixedRandomAngle} // Add initial phase to orbit
                        texture={getSkillIcon(skill.name)}
                        skill={skill}
                        onPlanetClick={handlePlanetClick}
                        isActive={selectedSkillId === skill.id}
                        index={index} // Add index for shape variation
                      />
                    </group>
                  );
                })}
                {/* Camera controls with target tracking */}
                <CameraController target={zoomTarget} reset={cameraReset} />
              </Suspense>
            </Canvas>
          </ClientOnly>

          {/* Help text overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            <p>Drag to rotate • Scroll to zoom • Click planets for details</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
