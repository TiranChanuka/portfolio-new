"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code,
  Database,
  Palette,
  Smartphone,
  Globe,
  Zap,
} from "lucide-react";
import { useSkills, Skill } from "@/lib/skills-context";
import { FloatingElements } from "./FloatingElements";

// Technology icons mapping
const techIcons: { [key: string]: any } = {
  HTML5: "🌐",
  CSS3: "🎨",
  JavaScript: "⚡",
  React: "⚛️",
  "Next.js": "▲",
  TypeScript: "📘",
  "Tailwind CSS": "💨",
  "Framer Motion": "🎭",
  "Three.js": "🎲",
  Redux: "🔄",
  "API Integration": "🔗",
  Bootstrap: "🅱️",
  "Chakra UI": "⚡",
  "MUI (Material-UI)": "📦",
  Sass: "💎",
  "Ant Design": "🐜",
  WordPress: "📝",
  PHP: "🐘",
  MySQL: "🗄️",
  WooCommerce: "🛒",
  Elementor: "🏗️",
  Figma: "🎨",
  "Adobe XD": "🎯",
  Photoshop: "🖼️",
  "Responsive Design": "📱",
  "Clean & Maintainable Code": "✨",
  "Performance Optimization": "🚀",
  "Cross-browser Compatibility": "🌍",
  "WordPress Customization": "⚙️",
  "Modern JavaScript": "🔥",
  "User Experience Focus": "👥",
  "SEO Best Practices": "📈",
};

// Category icons
const categoryIcons: { [key: string]: any } = {
  "Frontend Development": Code,
  "Backend Development": Database,
  "UI/UX Design": Palette,
  "Mobile Development": Smartphone,
  "Web Development": Globe,
  Performance: Zap,
};

// Type for skill bar props
interface SkillBarProps {
  skill: string;
  level: number;
}

const SkillBar = ({ skill, level }: SkillBarProps) => {
  const icon = techIcons[skill] || "⚡";

  return (
    <>
      {/* Desktop/Tablet Version - Original Design */}
      <div className="hidden sm:block mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{skill}</span>
          <span className="text-xs text-foreground/70">{level}%</span>
        </div>
        <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
      </div>

      {/* Mobile Version - Enhanced Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="sm:hidden mb-4 p-4 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600/50 hover:border-blue-500/30 transition-all duration-300 shadow-lg"
      >
        {/* Mobile header with icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-xl w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
              {icon}
            </div>
            <span className="text-sm font-bold text-white">{skill}</span>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full shadow-lg">
              {level}%
            </span>
          </motion.div>
        </div>

        {/* Enhanced mobile progress bar */}
        <div className="relative">
          <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden shadow-inner border border-slate-600/30">
            <motion.div
              initial={{ width: 0, opacity: 0.7 }}
              whileInView={{ width: `${level}%`, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full relative overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/80 rounded-full shadow-lg animate-pulse" />
            </motion.div>
          </div>

          {/* Mobile skill level indicator */}
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export function SkillsSection() {
  const { skills } = useSkills();
  const [activeCategory, setActiveCategory] = useState<string>(
    Object.keys(skills)[0] || "Frontend Development"
  );
  const categories = Object.keys(skills);
  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden
                 /* Mobile: Dark theme */ 
                 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 sm:bg-foreground/5
                 /* Desktop/Tablet: Original theme */
                 sm:bg-gradient-to-br sm:from-background sm:via-foreground/5 sm:to-background"
    >
      {/* Mobile background - Dark theme */}
      <div className="absolute inset-0 sm:hidden bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
      <div className="absolute inset-0 sm:hidden bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent)]" />

      {/* Desktop/Tablet background - Original theme */}
      <div className="absolute inset-0 hidden sm:block bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] sm:bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent)]" />

      {/* Animated grid pattern for mobile only */}
      <div className="absolute inset-0 opacity-30 sm:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Floating Elements Background */}
      <FloatingElements count={6} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 
                       /* Mobile: Dark theme colors */
                       bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent sm:hidden"
          >
            💻 My Skills
          </motion.h2>

          {/* Desktop/Tablet Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="hidden sm:block text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 
                       bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
          >
            My Skills
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"
          />
          {/* Mobile Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="sm:hidden text-slate-300 max-w-2xl mx-auto text-base leading-relaxed"
          >
            Crafting digital experiences with modern technologies and creative
            solutions
          </motion.p>

          {/* Desktop/Tablet Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="hidden sm:block text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            I specialize in frontend and WordPress development with a focus on
            creating responsive, performant, and visually appealing websites.
          </motion.p>
        </motion.div>
        {/* Mobile category tabs */}
        <div className="sm:hidden grid grid-cols-1 gap-3 mb-8">
          {/* Mobile swipe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4"
          >
            <span className="text-xs text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
              👆 Tap to explore categories
            </span>
          </motion.div>

          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category] || Code;
            return (
              <motion.button
                key={`mobile-${category}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveCategory(category)}
                className={`relative p-4 rounded-2xl transition-all duration-300 overflow-hidden group ${
                  activeCategory === category
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 border-2 border-blue-400/50"
                    : "bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 hover:border-blue-500/30 hover:shadow-lg text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      activeCategory === category
                        ? "bg-white/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold">{category}</h3>
                    <p className="text-xs opacity-80">
                      {skills[category]?.length || 0} skills
                    </p>
                  </div>
                  {activeCategory === category && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "4px" }}
                      className="ml-auto h-8 bg-white/60 rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Desktop/Tablet category tabs */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={`desktop-${category}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory(category)}
              className={`p-4 rounded-xl text-center transition-all ${
                activeCategory === category
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-background border border-foreground/10 hover:border-foreground/30"
              }`}
            >
              <h3 className="text-lg font-semibold">{category}</h3>
              <p className="text-xs mt-1 opacity-80">
                {skills[category]?.length || 0} skills
              </p>
            </motion.button>
          ))}
        </div>
        {/* Mobile skills display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-lg rounded-3xl p-6 border-2 border-slate-700/50 shadow-2xl shadow-blue-500/10"
        >
          {/* Category header with icon */}
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                {React.createElement(categoryIcons[activeCategory] || Code, {
                  className: "h-6 w-6 text-blue-400",
                })}
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {activeCategory}
              </h3>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
          </div>

          {/* Mobile single column layout */}
          <div className="space-y-3">
            {skills[activeCategory]?.map((skill: Skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <SkillBar skill={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </div>

          {/* Skills count indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">
                {skills[activeCategory]?.length || 0} skills mastered
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Desktop/Tablet skills display - Original design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden sm:block"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills[activeCategory]?.map((skill: Skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <SkillBar skill={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Mobile Key Strengths */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="sm:hidden mt-12 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-lg rounded-3xl p-6 border-2 border-slate-700/50 shadow-2xl shadow-purple-500/10"
        >
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎯 Key Strengths
              </h3>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              "Responsive Design",
              "Clean & Maintainable Code",
              "Performance Optimization",
              "Cross-browser Compatibility",
              "WordPress Customization",
              "Modern JavaScript",
              "User Experience Focus",
              "SEO Best Practices",
              "API Integration",
            ].map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                viewport={{ once: true }}
                className="group flex items-center gap-3 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0"
                >
                  <div className="w-6 h-6 flex items-center justify-center bg-green-500/20 rounded-lg border border-green-500/30">
                    <CheckCircle2 className="text-green-400 h-4 w-4 group-hover:text-green-300 transition-colors" />
                  </div>
                </motion.div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{techIcons[strength] || "✨"}</span>
                  <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    {strength}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop/Tablet Key Strengths - Original design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="hidden sm:block mt-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Key Strengths
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Responsive Design",
              "Clean & Maintainable Code",
              "Performance Optimization",
              "Cross-browser Compatibility",
              "WordPress Customization",
              "Modern JavaScript",
              "User Experience Focus",
              "SEO Best Practices",
              "API Integration",
            ].map((strength, index) => (
              <motion.div
                key={strength}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-background border border-foreground/10 rounded-xl hover:border-foreground/30 transition-all duration-300"
              >
                <CheckCircle2 className="text-green-600 h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
