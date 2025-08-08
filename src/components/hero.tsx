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
  // Mouse position tracking disabled for performance
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
    <section
      id="home"
      className="relative h-auto flex items-center justify-center overflow-hidden bg-black hero-mobile mobile-touch-optimized hero-content-spacing"
    >
      {/* Starry Background with Parallax Effect */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <div className="absolute inset-0">
          <StarryBackground />
        </div>
      </Suspense>

      {/* Simplified Dark Space Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black z-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Deep Space Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-blue-950/20 to-black/95 z-6" />

      {/* Subtle Purple Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/10 via-transparent to-purple-950/10 z-7" />

      {/* Simplified Stars for Performance */}
      {loaded && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* Simple Static Stars */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white/60 w-1 h-1 star-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 min-h-screen lg:py-0  lg:pt-0">
        {/* Text Content with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-3/5 space-y-4 sm:space-y-6 text-center lg:text-left"
        >
          {/* Greeting with Glow Effect */}
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/40 to-purple-600/40 rounded-full blur-xl opacity-30" />
            <p className="relative text-sm sm:text-base md:text-lg text-foreground/80 font-medium py-1 px-3 sm:px-4 rounded-full bg-gradient-to-r from-background/40 to-background/20 backdrop-blur-sm border border-white/10">
              Hello, I'm
            </p>
          </motion.div>

          {/* Name with Enhanced Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            Tiran Chanuka
          </motion.h1>

          {/* Title with Typing Effect */}
          <motion.h2
            variants={typingVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-foreground/90 overflow-hidden"
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
            className="text-sm sm:text-base md:text-lg max-w-xl lg:max-w-2xl leading-relaxed text-center lg:text-left"
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mt-6 sm:mt-8"
          >
            <button
              onClick={scrollToProjects}
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group mobile-cta-button hover:scale-105"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform relative z-10" />
            </button>

            <a
              href="mailto:tiranchanukaw@gmail.com"
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3.5 border border-white/20 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm bg-white/5 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-cyan-600 hover:border-transparent group mobile-cta-button hover:scale-105"
            >
              <span className="relative z-10">Freelance</span>
              <Mail className="h-4 w-4 group-hover:rotate-12 transition-transform relative z-10" />
            </a>

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
            className="flex justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8"
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
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative p-2 sm:p-3 rounded-full backdrop-blur-sm border border-white/10 shadow-lg bg-gradient-to-br ${color} group overflow-hidden mobile-social-button hover:scale-105 transition-transform duration-200`}
                aria-label={label}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white relative z-10" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-bottom-6 transition-all duration-300">
                  {label}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image Section - Clean & Performance Optimized */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-2/5 flex justify-center order-first lg:order-last"
        >
          <div className="relative">
            {/* Static Background Effect */}
            <div className="absolute -inset-4 rounded-full opacity-20 blur-xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30" />

            {/* Clean Image Container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden backdrop-blur-sm shadow-2xl shadow-purple-500/20 mobile-profile-small">
              {/* Static Border */}
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />

              {/* Profile Image Container */}
              <div className="absolute inset-2 bg-background rounded-full overflow-hidden">
                <Image
                  src="/Profile.png"
                  alt="Tiran Chanuka"
                  fill
                  sizes="(max-width: 768px) 12rem, (max-width: 1024px) 16rem, 20rem"
                  className="object-cover"
                  priority
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30"
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
          <div className="bg-background/20 backdrop-blur-sm border border-white/10 p-2 rounded-full">
            <ArrowDown className="h-4 w-4 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
