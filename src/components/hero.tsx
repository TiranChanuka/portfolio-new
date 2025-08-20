"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { StarryBackground } from "./StarryBackground";
import { Suspense, useEffect, useState, useRef } from "react";
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

// Solar System Planet Component
const Planet = ({
  size,
  color,
  orbitRadius,
  duration,
  delay = 0,
  className = "",
}: {
  size: number;
  color: string;
  orbitRadius: number;
  duration: number;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <div
        className={`absolute rounded-full ${color} shadow-lg`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translateX(${orbitRadius}px)`,
          boxShadow: `0 0 ${size / 2}px ${
            color.includes("blue")
              ? "#3b82f6"
              : color.includes("purple")
              ? "#8b5cf6"
              : color.includes("pink")
              ? "#ec4899"
              : "#10b981"
          }`,
        }}
      />
    </motion.div>
  );
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
    <motion.section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Enhanced Galaxy Background */}
      <div className="absolute inset-0">
        {/* Base galaxy gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-black to-black" />

        {/* Starry Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
          <StarryBackground />
        </Suspense>

        {/* Galaxy center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />

        {/* Nebula effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-cyan-400/10 via-transparent to-transparent rounded-full blur-2xl animate-pulse" />
          <div
            className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-radial from-pink-400/8 via-transparent to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Animated Solar System */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          style={{ y }}
        >
          {/* Central Sun */}
          <motion.div
            className="absolute w-6 h-6 md:w-8 md:h-8 bg-gradient-radial from-yellow-400 via-orange-500 to-red-500 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706",
            }}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706",
                "0 0 30px #fbbf24, 0 0 60px #f59e0b, 0 0 90px #d97706",
                "0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Orbiting Planets */}
          <Planet
            size={8}
            color="bg-blue-500"
            orbitRadius={60}
            duration={12}
            delay={0}
          />
          <Planet
            size={6}
            color="bg-red-500"
            orbitRadius={90}
            duration={20}
            delay={2}
          />
          <Planet
            size={7}
            color="bg-green-500"
            orbitRadius={120}
            duration={28}
            delay={4}
          />
          <Planet
            size={5}
            color="bg-purple-500"
            orbitRadius={150}
            duration={36}
            delay={6}
          />
          <Planet
            size={9}
            color="bg-yellow-500"
            orbitRadius={180}
            duration={48}
            delay={8}
          />

          {/* Orbit rings */}
          {[60, 90, 120, 150, 180].map((radius, index) => (
            <div
              key={radius}
              className="absolute rounded-full border border-white/5"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </motion.div>

        {/* Mobile-friendly cosmic elements */}
        <div className="absolute inset-0 lg:hidden">
          {/* Floating cosmic particles for mobile */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0
                  ? "w-2 h-2 bg-blue-400/30"
                  : i % 3 === 1
                  ? "w-1.5 h-1.5 bg-purple-400/30"
                  : "w-1 h-1 bg-cyan-400/30"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 min-h-screen">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full lg:w-3/5 space-y-6 text-center lg:text-left"
        >
          {/* Greeting */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl" />
            <p className="relative text-lg text-white/90 font-medium py-2 px-6 rounded-full bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm border border-white/10">
              Hello, I'm
            </p>
          </motion.div>

          {/* Name with stellar gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
          >
            Tiran Chanuka
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.div
            variants={typingVariants}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80"
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
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-base sm:text-lg max-w-2xl leading-relaxed text-white/70"
          >
            Crafting digital experiences across the cosmos. Specialized in
            React, Next.js, WordPress, and creating stellar user interfaces that
            shine in the digital galaxy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4"
          >
            <motion.button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore My Universe</span>
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>

            <motion.a
              href="mailto:tiranchanukaw@gmail.com"
              className="group relative px-8 py-4 border border-white/20 text-white rounded-full font-semibold transition-all duration-300 flex items-center gap-3 backdrop-blur-sm bg-white/5 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-cyan-600 hover:border-transparent hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Connect</span>
              <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex justify-center lg:justify-start gap-6 pt-6"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/TiranChanuka",
                label: "GitHub",
                color: "from-gray-600 to-gray-800",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/tiranchanuka/",
                label: "LinkedIn",
                color: "from-blue-600 to-blue-800",
              },
              {
                icon: Mail,
                href: "mailto:tiranchanukaw@gmail.com",
                label: "Email",
                color: "from-purple-600 to-purple-800",
              },
            ].map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full backdrop-blur-sm border border-white/10 bg-gradient-to-br ${color} group overflow-hidden hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-6 w-6 text-white" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image with Planetary Ring Effect */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:w-2/5 flex justify-center order-first lg:order-last"
        >
          <div className="relative">
            {/* Orbital rings around profile - Desktop only */}
            {[240, 280, 320].map((size, index) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-white/5 hidden md:block"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20 + index * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Small orbiting elements - Desktop only */}
            {[0, 120, 240].map((angle, index) => (
              <motion.div
                key={angle}
                className="absolute w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full hidden md:block"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 5,
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    transform: `translate(-50%, -50%) translateX(260px)`,
                    boxShadow: "0 0 8px currentColor",
                  }}
                />
              </motion.div>
            ))}

            {/* Profile image with cosmic glow */}
            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Enhanced cosmic background glow with pulsing animation */}
              <motion.div 
                className="absolute -inset-6 md:-inset-8 bg-gradient-radial from-cyan-400/20 via-blue-500/15 to-purple-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Secondary glow layer for depth */}
              <motion.div 
                className="absolute -inset-4 md:-inset-6 bg-gradient-radial from-cyan-300/25 via-blue-400/15 to-transparent rounded-full blur-xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Animated border ring with enhanced glow */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
                style={{
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)",
                }}
                animate={{ 
                  rotate: 360,
                  boxShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)",
                    "0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(147, 51, 234, 0.3)",
                    "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)",
                  ]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Inner border for contrast */}
              <div className="absolute -inset-0.5 bg-black rounded-full" />

              {/* Image container with enhanced inner glow */}
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-full overflow-hidden">
                <Image
                  src="/Profile.png"
                  alt="Tiran Chanuka - Frontend & WordPress Developer"
                  fill
                  sizes="(max-width: 640px) 12rem, (max-width: 768px) 14rem, (max-width: 1024px) 16rem, 18rem"
                  className="object-cover"
                  priority
                />

                {/* Enhanced overlay with subtle cosmic glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                  animate={{
                    background: [
                      "linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)",
                      "linear-gradient(to top, rgba(34,211,238,0.05), transparent, rgba(147,51,234,0.03))",
                      "linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)",
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Inner rim glow effect */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-gradient-to-r ring-cyan-400/20" 
                     style={{
                       boxShadow: "inset 0 0 30px rgba(34, 211, 238, 0.1), inset 0 0 50px rgba(59, 130, 246, 0.05)"
                     }} 
                />
              </div>

              {/* Mobile-friendly cosmic particles around image */}
              <div className="absolute inset-0 md:hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={scrollToProjects}
        >
          <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors">
            Discover More
          </span>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-full group-hover:bg-white/20 transition-all">
            <ArrowDown className="h-5 w-5 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
