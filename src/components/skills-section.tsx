"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSkills, Skill } from "@/lib/skills-context";
import { FloatingElements } from "./FloatingElements";

// Type for skill bar props
interface SkillBarProps {
  skill: string;
  level: number;
}

const SkillBar = ({ skill, level }: SkillBarProps) => {
  return (
    <div className="mb-4">
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
      className="relative py-20 px-6 bg-foreground/5 overflow-hidden"
    >
      {/* Floating Elements Background */}
      <FloatingElements count={6} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            I specialize in frontend and WordPress development with a focus on
            creating responsive, performant, and visually appealing websites.
          </p>
        </motion.div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory(category)}
              className={`p-4 rounded-xl text-center transition-all ${
                activeCategory === category
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-background border border-foreground/10 hover:border-foreground/30"
              }`}
            >
              {" "}
              <h3 className="text-lg font-semibold">{category}</h3>
              <p className="text-xs mt-1 opacity-80">
                {skills[category]?.length || 0} skills
              </p>
            </motion.button>
          ))}
        </div>
        <div className="bg-background rounded-xl p-6 border border-foreground/10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {" "}
              {skills[activeCategory]
                ?.slice(0, Math.ceil((skills[activeCategory]?.length || 0) / 2))
                .map((skill: Skill) => (
                  <SkillBar
                    key={skill.id}
                    skill={skill.name}
                    level={skill.level}
                  />
                ))}
            </div>
            <div>
              {skills[activeCategory]
                ?.slice(Math.ceil((skills[activeCategory]?.length || 0) / 2))
                .map((skill: Skill) => (
                  <SkillBar
                    key={skill.id}
                    skill={skill.name}
                    level={skill.level}
                  />
                ))}
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-background rounded-xl p-6 border border-foreground/10 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4">Key Strengths</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </motion.div>
            ))}
          </div>{" "}
        </motion.div>
      </div>
    </section>
  );
}
