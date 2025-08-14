"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  color: string;
  velocity: { x: number; y: number };
  type: "star" | "nebula" | "distant-galaxy";
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize galactic elements
    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);

      const starColors = [
        "#ffffff", // White dwarf
        "#a3bffa", // Blue giant
        "#c4b5fd", // Purple nebula
        "#67e8f9", // Cyan pulsar
        "#fbbf24", // Yellow star
        "#f87171", // Red giant
      ];

      for (let i = 0; i < starCount; i++) {
        const type =
          Math.random() < 0.7
            ? "star"
            : Math.random() < 0.9
            ? "nebula"
            : "distant-galaxy";

        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size:
            type === "star"
              ? Math.random() * 1.5 + 0.5
              : type === "nebula"
              ? Math.random() * 3 + 2
              : Math.random() * 2 + 1,
          opacity:
            type === "distant-galaxy"
              ? Math.random() * 0.3 + 0.1
              : Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
          },
          type,
        });
      }
    };

    // Create occasional shooting stars
    const createShootingStar = () => {
      if (Math.random() < 0.995) return; // Very rare

      shootingStarsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3, // Top portion of screen
        length: Math.random() * 80 + 20,
        speed: Math.random() * 3 + 2,
        angle: (Math.random() * Math.PI) / 4 + Math.PI / 8, // Downward angle
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 60 + 30,
      });
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced animation loop with galactic effects
    let time = 0;
    const animate = () => {
      time += 0.008;

      // Create deep space gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.99)");
      gradient.addColorStop(0.3, "rgba(8, 15, 52, 0.95)"); // Deep space blue
      gradient.addColorStop(0.6, "rgba(45, 17, 82, 0.90)"); // Purple nebula
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.99)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create occasional shooting stars
      createShootingStar();

      // Draw and update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.life++;
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity = Math.max(0, 1 - star.life / star.maxLife);

        if (star.opacity > 0) {
          // Draw shooting star trail
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(
            0.5,
            `rgba(147, 197, 253, ${star.opacity * 0.7})`
          );
          gradient.addColorStop(1, "transparent");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          ctx.stroke();
        }

        return (
          star.life < star.maxLife &&
          star.x < canvas.width + 100 &&
          star.y < canvas.height + 100
        );
      });

      // Draw cosmic elements (stars, nebulae, distant galaxies)
      starsRef.current.forEach((star, index) => {
        // Update position for cosmic drift
        star.x += star.velocity.x;
        star.y += star.velocity.y;

        // Wrap around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const twinkle = Math.sin(time * star.twinkleSpeed + index) * 0.5 + 0.5;
        const currentOpacity = star.opacity * twinkle;

        if (star.type === "star") {
          // Draw regular twinkling stars
          const glowSize = star.size * 8;
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            glowSize
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(0.3, `${star.color}66`);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentOpacity * 0.6;
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Main star core
          ctx.beginPath();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentOpacity;
          ctx.shadowBlur = star.size * 6;
          ctx.shadowColor = star.color;
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Cross sparkle for bright stars
          if (star.size > 1.2 && currentOpacity > 0.7) {
            ctx.strokeStyle = star.color;
            ctx.globalAlpha = currentOpacity * 0.8;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 4;
            ctx.shadowColor = star.color;
            ctx.beginPath();
            ctx.moveTo(star.x - star.size * 4, star.y);
            ctx.lineTo(star.x + star.size * 4, star.y);
            ctx.moveTo(star.x, star.y - star.size * 4);
            ctx.lineTo(star.x, star.y + star.size * 4);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        } else if (star.type === "nebula") {
          // Draw nebula clouds
          const nebulaGradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 15
          );
          nebulaGradient.addColorStop(0, `${star.color}40`);
          nebulaGradient.addColorStop(0.5, `${star.color}20`);
          nebulaGradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = nebulaGradient;
          ctx.globalAlpha = currentOpacity * 0.3;
          ctx.arc(star.x, star.y, star.size * 15, 0, Math.PI * 2);
          ctx.fill();
        } else if (star.type === "distant-galaxy") {
          // Draw distant galaxies as faint spiral-like shapes
          ctx.globalAlpha = currentOpacity * 0.4;
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (time + index + i * 2) * 0.5;
            const radius = star.size * (2 + i);
            ctx.moveTo(
              star.x + Math.cos(angle) * radius,
              star.y + Math.sin(angle) * radius * 0.3
            );
            ctx.lineTo(
              star.x + Math.cos(angle + Math.PI) * radius,
              star.y + Math.sin(angle + Math.PI) * radius * 0.3
            );
          }
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  // Don't render canvas on server-side
  if (!isClient) {
    return <div className="absolute inset-0 bg-black z-0" />;
  }

  return (
    <>
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black z-0" />

      {/* Canvas for animated cosmic elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: "transparent" }}
      />

      {/* Galactic nebula effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Large nebula clouds */}
        <div className="absolute top-1/6 left-1/5 w-96 h-96 bg-gradient-radial from-cyan-500/8 via-blue-500/4 to-transparent rounded-full blur-3xl animate-nebula-drift" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple-600/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-nebula-drift"
          style={{ animationDelay: "8s" }}
        />
        <div
          className="absolute top-1/2 right-1/6 w-64 h-64 bg-gradient-radial from-pink-400/6 via-purple-400/3 to-transparent rounded-full blur-3xl animate-nebula-drift"
          style={{ animationDelay: "4s" }}
        />

        {/* Spiral galaxy effect */}
        <div
          className="absolute top-3/4 left-1/2 w-72 h-72 bg-gradient-radial from-blue-400/8 via-cyan-400/4 to-transparent rounded-full blur-3xl animate-nebula-drift"
          style={{ animationDelay: "12s" }}
        />

        {/* Distant cosmic dust */}
        <div
          className="absolute top-1/8 right-1/3 w-56 h-56 bg-gradient-radial from-violet-300/6 via-purple-300/3 to-transparent rounded-full blur-3xl animate-nebula-drift"
          style={{ animationDelay: "16s" }}
        />

        {/* Cosmic particles */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 5 === 0
                ? "w-2 h-2 bg-cyan-300/30 animate-stellar-pulse"
                : i % 5 === 1
                ? "w-1.5 h-1.5 bg-purple-200/25 animate-cosmic-glow"
                : i % 5 === 2
                ? "w-1 h-1 bg-blue-100/30 star-twinkle"
                : i % 5 === 3
                ? "w-0.5 h-0.5 bg-white/40 star-twinkle"
                : "w-1 h-1 bg-pink-200/20 animate-cosmic-glow"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
