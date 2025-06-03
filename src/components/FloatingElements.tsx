"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export function FloatingElements({
  count = 8,
  className = "",
}: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const colors = [
        "rgba(59, 130, 246, 0.1)", // blue
        "rgba(139, 92, 246, 0.1)", // purple
        "rgba(16, 185, 129, 0.1)", // emerald
        "rgba(245, 158, 11, 0.1)", // amber
        "rgba(244, 63, 94, 0.1)", // rose
        "rgba(6, 182, 212, 0.1)", // cyan
      ];

      const newElements: FloatingElement[] = [];
      for (let i = 0; i < count; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50, // 50px to 150px
          duration: Math.random() * 20 + 15, // 15s to 35s
          delay: Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: element.size,
            height: element.size,
            background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.2, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Geometric shapes floating animation
export function FloatingShapes({ className = "" }: { className?: string }) {
  const shapes = [
    { type: "circle", size: 60, x: 10, y: 20 },
    { type: "square", size: 40, x: 80, y: 10 },
    { type: "triangle", size: 50, x: 20, y: 70 },
    { type: "circle", size: 30, x: 90, y: 60 },
    { type: "square", size: 35, x: 60, y: 30 },
    { type: "triangle", size: 45, x: 40, y: 80 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border border-white/10" />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-cyan-400/20 backdrop-blur-sm border border-white/10 rotate-45" />
          )}
          {shape.type === "triangle" && (
            <div
              className="w-full h-full bg-gradient-to-br from-pink-400/20 to-orange-400/20 backdrop-blur-sm border border-white/10"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
