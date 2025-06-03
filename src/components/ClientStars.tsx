"use client";
import { useEffect, useState } from "react";

// Separate component for stars to handle client-side-only rendering
export default function ClientStars({ count = 50 }) {
  const [stars, setStars] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  useEffect(() => {
    // Generate stars only when component mounts (client-side)
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.8 + 0.2,
        animationDuration: `${Math.random() * 5 + 3}s`,
        animationDelay: `${Math.random() * 2}s`,
      },
    }));
    setStars(newStars);
  }, [count]);

  return (
    <div className="fixed inset-0 z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={star.style}
        />
      ))}
    </div>
  );
}
