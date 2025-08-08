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

    // Initialize fewer colorful stars for better performance
    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 10000); // Significantly reduced stars

      const colors = [
        "#ffffff", // Pure white
        "#93c5fd", // Blue-300
        "#c4b5fd", // Purple-300
        "#67e8f9", // Cyan-300
        "#f9a8d4", // Pink-300
      ];

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller stars
          opacity: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.015 + 0.005, // Slower twinkling
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.02, // Much slower movement
            y: (Math.random() - 0.5) * 0.02,
          },
        });
      }
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
    const animate = () => {
      time += 0.01;

      // Clear canvas with pure dark space gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.98)"); // Pure black
      gradient.addColorStop(0.3, "rgba(15, 23, 42, 0.95)"); // Very dark slate
      gradient.addColorStop(0.7, "rgba(30, 27, 75, 0.90)"); // Dark purple-blue
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.98)"); // Pure black

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // No shooting stars - removed for cleaner look

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

        // Enhanced colorful glow effect for all stars
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 6
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(0.3, `${star.color}88`); // 50% opacity
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = currentOpacity * 0.6;
        ctx.arc(star.x, star.y, star.size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Main star with enhanced glow
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = star.size * 8;
        ctx.shadowColor = star.color;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Cross sparkle for larger stars
        if (star.size > 1.5 && currentOpacity > 0.7) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = currentOpacity * 0.8;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 4;
          ctx.shadowColor = star.color;
          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(star.x - star.size * 3, star.y);
          ctx.lineTo(star.x + star.size * 3, star.y);
          // Vertical line
          ctx.moveTo(star.x, star.y - star.size * 3);
          ctx.lineTo(star.x, star.y + star.size * 3);
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset shadow
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
