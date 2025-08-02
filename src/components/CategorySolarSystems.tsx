"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeJsSolarSystem from "./ThreeJsSolarSystem";
import { useSkills } from "@/lib/skills-context";

export function CategorySolarSystems() {
  const [activeView, setActiveView] = useState<"all" | "individual">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { skills } = useSkills();
  const categories = Object.keys(skills);

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-blue-950/10 via-black to-blue-950/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {activeView === "all" ? (
            <motion.div
              key="combined-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block"
            >
              {/* Combined solar system with category tabs - Hidden on mobile */}
              <ThreeJsSolarSystem />
            </motion.div>
          ) : (
            <motion.div
              key="individual-view"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 20px rgba(37, 99, 235, 0.15)",
                  }}
                  className="bg-black/20 backdrop-blur-sm rounded-xl border border-blue-500/10 overflow-hidden"
                >
                  <motion.div
                    className="p-4 text-center border-b border-blue-500/20"
                    initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                    whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-medium text-white">
                      {category}
                    </h3>
                    <p className="text-sm text-blue-300 mt-1">
                      {skills[category]?.length || 0} skills
                    </p>
                  </motion.div>

                  <div className="h-[350px] relative">
                    <ThreeJsSolarSystem
                      singleCategoryMode={true}
                      fixedCategory={category}
                      height="350px"
                    />

                    {/* Zoom button */}
                    <motion.button
                      className="absolute bottom-3 right-3 bg-blue-600/80 hover:bg-blue-600 p-2 rounded-full text-white backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setSelectedCategory(
                          category === selectedCategory ? null : category
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Mobile-friendly skills display */}
          <motion.div
            key="mobile-skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sm:hidden space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">My Skills</h2>
              <p className="text-blue-300">Explore my technical expertise</p>
            </div>

            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/20 backdrop-blur-sm rounded-xl border border-blue-500/10 p-4"
              >
                <h3 className="text-lg font-medium text-white mb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {skills[category]?.map((skill, skillIndex) => (
                    <div
                      key={skill.id}
                      className="bg-blue-600/20 rounded-lg p-2 text-center"
                    >
                      <div className="text-white text-sm font-medium">
                        {skill.name}
                      </div>
                      <div className="text-blue-300 text-xs mt-1">
                        {skill.level}%
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Expanded view modal for individual category */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSelectedCategory(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-b from-blue-900/20 to-black/90 rounded-2xl overflow-hidden backdrop-blur-sm border border-blue-500/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-blue-500/20 flex justify-between items-center">
                  <h3 className="text-2xl font-medium text-white">
                    {selectedCategory}
                  </h3>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="bg-blue-800/50 hover:bg-blue-700 p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="h-full">
                  <ThreeJsSolarSystem
                    singleCategoryMode={true}
                    fixedCategory={selectedCategory}
                    height="calc(80vh - 60px)"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
