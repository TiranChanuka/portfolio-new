"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
// Import our new category-based solar system visualization
import { CategorySolarSystems } from "@/components/CategorySolarSystems";
import { useState } from "react";

// Define types for our skills data
type Skill = {
  id: string;
  name: string;
  level: number;
};

type SkillsData = {
  [category: string]: Skill[];
};

// Define the basic skills directly in the page component to avoid import issues
const skillsData: SkillsData = {
  "Frontend Development": [
    { id: "1", name: "HTML5", level: 95 },
    { id: "2", name: "CSS3", level: 92 },
    { id: "3", name: "JavaScript", level: 90 },
    { id: "4", name: "React", level: 85 },
    { id: "5", name: "Next.js", level: 80 },
  ],
  "WordPress Development": [
    { id: "10", name: "WordPress", level: 95 },
    { id: "11", name: "PHP", level: 85 },
    { id: "12", name: "WooCommerce", level: 85 },
  ],
  "UI Design": [
    { id: "15", name: "Figma", level: 88 },
    { id: "16", name: "UI Design", level: 85 },
    { id: "17", name: "UX Design", level: 80 },
  ],
};

// Simple Skills component defined directly in the page
function InlineSkillsSection() {
  const [activeCategory, setActiveCategory] = useState("Frontend Development");

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-blue-950/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-white">
          Skills Universe
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.keys(skillsData).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData[activeCategory]?.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-800/50 border border-blue-500/30 p-6 rounded-lg"
            >
              <h3 className="text-xl text-white mb-2">{skill.name}</h3>
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <div className="text-right text-blue-300 mt-1 text-sm">
                {skill.level}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProjectsSection />
        <CategorySolarSystems />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
