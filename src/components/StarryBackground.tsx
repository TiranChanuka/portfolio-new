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

    // Initialize stars with more count and purple/white colors
    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);

      const colors = [
        "#ffffff",
        "#f8f9ff",
        "#e6e6ff",
        "#d4d4ff",
        "#c8c8ff",
        "#b8b8ff",
        "#a8a8ff",
      ];

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.9 + 0.1,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.15,
            y: (Math.random() - 0.5) * 0.15,
          },
        });
      }
    };

    // Create shooting star
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, angle;

      switch (side) {
        case 0: // Top
          x = Math.random() * canvas.width;
          y = -50;
          angle = Math.random() * (Math.PI / 3) + Math.PI / 6;
          break;
        case 1: // Right
          x = canvas.width + 50;
          y = Math.random() * canvas.height;
          angle = Math.random() * (Math.PI / 3) + (2 * Math.PI) / 3;
          break;
        case 2: // Bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 50;
          angle = Math.random() * (Math.PI / 3) + (7 * Math.PI) / 6;
          break;
        default: // Left
          x = -50;
          y = Math.random() * canvas.height;
          angle = Math.random() * (Math.PI / 3) - Math.PI / 6;
          break;
      }

      const maxLife = 60 + Math.random() * 40;
      shootingStarsRef.current.push({
        x,
        y,
        length: 40 + Math.random() * 60,
        speed: 3 + Math.random() * 4,
        angle,
        opacity: 1,
        life: maxLife,
        maxLife,
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

    // Enhanced animation loop
    let time = 0;
    let shootingStarTimer = 0;
    const animate = () => {
      time += 0.01;
      shootingStarTimer++;

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create shooting stars occasionally
      if (shootingStarTimer > 120 + Math.random() * 180) {
        createShootingStar();
        shootingStarTimer = 0;
      }

      // Draw and update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.life--;
        star.opacity = star.life / star.maxLife;

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.life > 0) {
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
            `rgba(200, 200, 255, ${star.opacity * 0.8})`
          );
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          ctx.stroke();

          // Draw bright head
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }
        return false;
      });

      // Draw regular stars
      starsRef.current.forEach((star, index) => {
        // Update position for subtle movement
        star.x += star.velocity.x;
        star.y += star.velocity.y;

        // Wrap around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const twinkle = Math.sin(time * star.twinkleSpeed + index) * 0.5 + 0.5;
        const currentOpacity = star.opacity * twinkle;

        // Main star
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced glow effect for larger stars
        if (star.size > 2) {
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 5
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentOpacity * 0.4;
          ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cross sparkle for brightest stars
        if (star.size > 2.5 && currentOpacity > 0.8) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = currentOpacity * 0.7;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(star.x - star.size * 4, star.y);
          ctx.lineTo(star.x + star.size * 4, star.y);
          // Vertical line
          ctx.moveTo(star.x, star.y - star.size * 4);
          ctx.lineTo(star.x, star.y + star.size * 4);
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
      {/* Black background with subtle purple tint */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Canvas for animated stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: "transparent" }}
      />

      {/* Minimal purple accents */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle purple orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-purple-600/8 via-purple-600/3 to-transparent rounded-full blur-3xl animate-float-slow-reverse" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-purple-400/6 via-purple-400/3 to-transparent rounded-full blur-3xl animate-float-medium" />

        {/* Additional minimal purple layers */}
        <div
          className="absolute top-3/4 left-1/2 w-72 h-72 bg-gradient-radial from-purple-500/5 via-purple-500/2 to-transparent rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/6 right-1/6 w-56 h-56 bg-gradient-radial from-purple-300/8 via-purple-300/3 to-transparent rounded-full blur-3xl animate-float-medium"
          style={{ animationDelay: "4s" }}
        />

        {/* Floating particles with purple tint */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-particle ${
              i % 4 === 0
                ? "w-3 h-3 bg-white/30"
                : i % 4 === 1
                ? "w-2 h-2 bg-purple-200/20"
                : i % 4 === 2
                ? "w-1.5 h-1.5 bg-white/40"
                : "w-1 h-1 bg-purple-100/25"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>
    </>
  );
}
