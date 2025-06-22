"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { StarryBackground } from "./StarryBackground";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";

// Animated typing effect for subtitle
const typingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12 },
  },
};

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateMovement = (factor: number = 1) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = ((mousePosition.x - centerX) / centerX) * 5 * factor;
    const moveY = ((mousePosition.y - centerY) / centerY) * 5 * factor;

    return { x: moveX, y: moveY };
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const subtitle = "Frontend & WordPress Developer";

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Starry Background with Parallax Effect */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${calculateMovement(0.2).x}px, ${
              calculateMovement(0.2).y
            }px)`,
          }}
        >
          <StarryBackground />
        </div>
      </Suspense>

      {/* Enhanced Gradient Overlays with Subtle Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/30 to-black/70 z-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-background/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-blue-600/20 z-10" />

      {/* Animated Particle Effects */}
      {loaded && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              initial={{
                width: Math.random() * 20 + 5,
                height: Math.random() * 20 + 5,
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                y: -100,
                x: `calc(${Math.random() * 200 - 100}px + ${
                  calculateMovement(0.5).x
                }px)`,
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text Content with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-3/5 space-y-6 text-left"
          style={{
            transform: `translate(${calculateMovement(-0.5).x}px, ${
              calculateMovement(-0.5).y
            }px)`,
          }}
        >
          {/* Greeting with Glow Effect */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-full blur-xl opacity-30" />
            <p className="relative text-lg md:text-xl text-foreground/80 font-medium py-1 px-4 rounded-full bg-gradient-to-r from-background/40 to-background/20 backdrop-blur-sm border border-white/10">
              Hello, I'm
            </p>
          </motion.div>

          {/* Name with Enhanced Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            Tiran Chanuka
          </motion.h1>

          {/* Title with Typing Effect */}
          <motion.h2
            variants={typingVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground/90 overflow-hidden"
          >
            {subtitle.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Description with Improved Typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg  max-w-2xl leading-relaxed -sm rounded-lg "
          >
            I'm an experienced Frontend Developer, WordPress developer, and
            UI/UX Designer, with over three years of expertise in building
            responsive, visually engaging, and user-friendly websites. My core
            focus is on WordPress development—including custom plugin
            development—and modern frontend technologies such as React, Next.js,
            and Tailwind CSS.
          </motion.p>

          {/* Enhanced CTA Buttons with Improved Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-start items-center mt-8"
          >
            <motion.button
              onClick={scrollToProjects}
              className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group overflow-hidden animate-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white transition-opacity duration-300" />
            </motion.button>

            {/* <motion.button
              className="px-8 py-3 border border-foreground/20 text-foreground rounded-lg font-medium transition-all duration-300 flex items-center gap-2 backdrop-blur-sm bg-background/10 hover:bg-purple-500/10 shadow-lg shadow-purple-500/5"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(168, 85, 247, 0.5)",
                boxShadow: "0 0 15px 2px rgba(168, 85, 247, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="h-4 w-4" />
              Download CV
            </motion.button> */}
          </motion.div>

          {/* Enhanced Social Links with Improved Visual Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex justify-start gap-6 mt-8"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/TiranChanuka",
                label: "GitHub",
                color: "from-gray-500 to-gray-700",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/tiranchanuka/",
                label: "LinkedIn",
                color: "from-blue-500 to-blue-700",
              },
              {
                icon: Mail,
                href: "mailto:tiranchanukaw@gmail.com",
                label: "Email",
                color: "from-purple-500 to-purple-700",
              },
            ].map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-3 rounded-full backdrop-blur-sm border border-white/10 shadow-lg bg-gradient-to-br ${color} group overflow-hidden`}
                aria-label={label}
                whileHover={{
                  scale: 1.15,
                  y: -4,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer opacity-30" />
                <Icon className="h-5 w-5 text-white relative z-10" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-bottom-6 transition-all duration-300">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image Section with Enhanced Effects */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-2/5 flex justify-center"
          style={{
            transform: `translate(${calculateMovement(0.8).x}px, ${
              calculateMovement(0.8).y
            }px)`,
          }}
        >
          <div className="relative">
            {/* Dynamic Background Effect */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-50 blur-2xl"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(45,212,191,0.2) 100%)",
                  "radial-gradient(circle, rgba(45,212,191,0.5) 0%, rgba(124,58,237,0.2) 100%)",
                  "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(45,212,191,0.2) 100%)",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            {/* Image container with enhanced borders and effects */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden backdrop-blur-sm shadow-2xl shadow-purple-500/20">
              {/* Outer Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse-slow" />

              {/* Rotating gradient border */}
              <div className="absolute inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full animate-spin-slow" />

              {/* Inner padding with improved background */}
              <div className="absolute inset-2 bg-background rounded-full overflow-hidden">
                {/* Profile Image with subtle filters */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20 mix-blend-overlay z-10" />
                <Image
                  src="/Profile.png"
                  alt="Tiran Chanuka"
                  fill
                  sizes="(max-width: 768px) 16rem, 20rem"
                  className="object-cover brightness-105 contrast-105"
                  priority
                />
              </div>
            </div>{" "}
            {/* Enhanced Floating Tech Badges with Professional UI/UX Placement */}{" "}
            <div className="tech-badge-container">
              {[
                // Right arc badges (40° to 140° on the right side)
                {
                  src: "/Icons/React.png",
                  alt: "React",
                  color: "from-cyan-500 to-blue-600",
                  borderColor: "border-cyan-300/40",
                  shadowColor: "rgba(6, 182, 212, 0.65)",
                  position: {
                    top: "0%",
                    right: "0%",
                    left: "auto",
                    bottom: "auto",
                  },
                  orbit: { degree: 40, distance: 120 },
                  delay: 0.2,
                  duration: 8,
                  size: 32,
                },
                {
                  src: "/Icons/JavaScript.png",
                  alt: "JavaScript",
                  color: "from-yellow-400 to-amber-500",
                  borderColor: "border-yellow-300/30",
                  shadowColor: "rgba(245, 158, 11, 0.6)",
                  position: {
                    top: "auto",
                    right: "-10%",
                    bottom: "25%",
                    left: "auto",
                  },
                  orbit: { degree: 100, distance: 125 },
                  delay: 0.9,
                  duration: 9,
                  size: 30,
                },

                // Left arc badges (220° to 320° on the left side)
                {
                  src: "/Icons/TypeScript.png",
                  alt: "TypeScript",
                  color: "from-blue-500 to-indigo-600",
                  borderColor: "border-blue-300/30",
                  shadowColor: "rgba(37, 99, 235, 0.6)",
                  position: {
                    bottom: "25%",
                    right: "auto",
                    top: "auto",
                    left: "-10%",
                  },
                  orbit: { degree: 260, distance: 125 },
                  delay: 0.6,
                  duration: 8.5,
                  size: 30,
                },
                {
                  src: "/Icons/Nextjs.png",
                  alt: "Next.js",
                  color: "from-gray-700 to-black",
                  borderColor: "border-gray-400/30",
                  shadowColor: "rgba(75, 85, 99, 0.6)",
                  position: {
                    top: "0%",
                    left: "0%",
                    right: "auto",
                    bottom: "auto",
                  },
                  orbit: { degree: 320, distance: 120 },
                  delay: 0,
                  duration: 9.5,
                  size: 32,
                },

                // Bottom badges (160° and 200°)
                {
                  src: "/Icons/Tailwind.png",
                  alt: "Tailwind CSS",
                  color: "from-purple-600 to-violet-700",
                  borderColor: "border-purple-300/40",
                  shadowColor: "rgba(124, 58, 237, 0.7)",
                  position: {
                    bottom: "-5%",
                    left: "30%",
                    top: "auto",
                    right: "auto",
                  },
                  orbit: { degree: 200, distance: 115 },
                  delay: 0.4,
                  duration: 7.5,
                  size: 30,
                },
                {
                  src: "/Icons/Wordpress.png",
                  alt: "WordPress",
                  color: "from-blue-600 to-blue-800",
                  borderColor: "border-blue-300/30",
                  shadowColor: "rgba(14, 165, 233, 0.6)",
                  position: {
                    bottom: "-5%",
                    right: "30%",
                    top: "auto",
                    left: "auto",
                  },
                  orbit: { degree: 160, distance: 115 },
                  delay: 0.7,
                  duration: 8,
                  size: 30,
                },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="absolute p-1.5 rounded-full shadow-lg"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: Math.random() * 20 - 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: [0.95, 1.05, 0.95],
                    rotate: [
                      Math.random() * 5 - 2.5,
                      Math.random() * 10 - 5,
                      Math.random() * 5 - 2.5,
                    ],
                    boxShadow: [
                      `0 0 10px 2px ${badge.shadowColor}`,
                      `0 0 20px 4px ${badge.shadowColor}`,
                      `0 0 10px 2px ${badge.shadowColor}`,
                    ],
                  }}
                  // Orbit animation using custom orbital positioning
                  style={{
                    top: badge.position.top,
                    right: badge.position.right,
                    bottom: badge.position.bottom,
                    left: badge.position.left,
                    zIndex: 30,
                  }}
                  transition={{
                    opacity: { duration: 0.7 },
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    boxShadow: {
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                >
                  {/* Badge with enhanced orbit animation */}
                  <motion.div
                    className={`bg-gradient-to-br ${badge.color} p-2.5 rounded-full backdrop-blur-md border ${badge.borderColor} overflow-hidden relative`}
                    animate={{
                      translateX: [
                        0,
                        Math.cos((badge.orbit.degree * Math.PI) / 180) * 12,
                        0,
                        Math.cos(((badge.orbit.degree + 180) * Math.PI) / 180) *
                          12,
                        0,
                      ],
                      translateY: [
                        0,
                        Math.sin((badge.orbit.degree * Math.PI) / 180) * 12,
                        0,
                        Math.sin(((badge.orbit.degree + 180) * Math.PI) / 180) *
                          12,
                        0,
                      ],
                    }}
                    transition={{
                      duration: badge.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: badge.delay,
                    }}
                    whileHover={{
                      scale: 1.25,
                      rotate: 15,
                      boxShadow: `0 0 25px 8px ${badge.shadowColor}`,
                      zIndex: 50,
                    }}
                  >
                    {/* Enhanced pulsing background for emphasis */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-50"
                      animate={{
                        boxShadow: [
                          `inset 0 0 8px 3px ${badge.shadowColor}`,
                          `inset 0 0 15px 5px ${badge.shadowColor}`,
                          `inset 0 0 8px 3px ${badge.shadowColor}`,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: badge.delay + 0.5,
                      }}
                    />

                    {/* Enhanced animated glow effect inside badge */}
                    <div className="absolute inset-0 opacity-60">
                      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-white/0 via-white/80 to-white/0 animate-shine-fast" />
                    </div>

                    {/* Rotating inner highlight */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-30"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.15) 60%, transparent 70%)",
                      }}
                    />

                    <Image
                      src={badge.src}
                      alt={badge.alt}
                      width={badge.size}
                      height={badge.size}
                      className="relative z-10"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToProjects}
        >
          <span className="text-xs font-medium bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Scroll to explore
          </span>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-md animate-pulse" />
            <div className="relative bg-background/20 backdrop-blur-sm border border-white/10 p-2 rounded-full">
              <ArrowDown className="h-4 w-4 text-white animate-bounce-gentle" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
