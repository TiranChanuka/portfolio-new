"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { StarryBackground } from "./StarryBackground";
import { Suspense } from "react";

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Starry Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <StarryBackground />
      </Suspense>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 z-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-background/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 font-medium"
          >
            Hello, I'm
          </motion.p>
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
          >
            Tiran Chanuka
          </motion.h1>
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground/90"
          >
            Frontend & WordPress Developer
          </motion.h2>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            I’m an experienced Frontend Developer, WordPress developer, and
            UI/UX Designer, with over three years of expertise in building
            responsive, visually engaging, and user-friendly websites. My core
            focus is on WordPress development—including custom plugin
            development—and modern frontend technologies such as React, Next.js,
            and Tailwind CSS.
          </motion.p>
          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <button
              onClick={scrollToProjects}
              className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 group overflow-hidden animate-glow"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer" />
            </button>

            <button className="px-8 py-3 border border-foreground/30 text-foreground rounded-lg font-medium hover:border-purple-400/50 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
              <Download className="h-4 w-4" />
              Download CV
            </button>
          </motion.div>
          {/* Enhanced Social Links */}{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex justify-center gap-6 mt-8"
          >
            {[
              {
                icon: Github,
                href: "https://github.com",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:contact@example.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-background/20 backdrop-blur-sm border border-foreground/20 hover:border-purple-400/50 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Animation Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          {/* <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-foreground/60 hover:text-foreground/80 transition-colors cursor-pointer"
            onClick={scrollToProjects}
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <ArrowDown className="h-4 w-4 animate-bounce-gentle" />
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
