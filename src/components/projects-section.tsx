"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

// Define types for project data
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

// Sample project data - will be replaced with data from the admin panel
const projectCategories = ["All", "Frontend", "WordPress", "UI Design"];

const projectsData = [
  {
    id: 1,
    title: "E-commerce Website",
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and payment processing.",
    image: "/projects/project-1.svg",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    category: "Frontend",
    liveUrl: "https://example.com/project1",
    githubUrl: "https://github.com/yourusername/project1",
  },
  {
    id: 2,
    title: "Corporate Website",
    description:
      "Custom WordPress theme development for a corporate client with custom post types and admin features.",
    image: "/projects/project-2.svg",
    technologies: ["WordPress", "PHP", "JavaScript", "SCSS"],
    category: "WordPress",
    liveUrl: "https://example.com/project2",
    githubUrl: "https://github.com/yourusername/project2",
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description:
      "Interactive dashboard for tracking portfolio performance with real-time data visualization.",
    image: "/projects/project-3.svg",
    technologies: ["React", "Chart.js", "Tailwind CSS", "Firebase"],
    category: "Frontend",
    liveUrl: "https://example.com/project3",
    githubUrl: "https://github.com/yourusername/project3",
  },
  {
    id: 4,
    title: "Learning Platform",
    description:
      "Online learning platform with course management, progress tracking, and interactive quizzes.",
    image: "/projects/project-4.svg",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    category: "WordPress",
    liveUrl: "https://example.com/project4",
    githubUrl: "https://github.com/yourusername/project4",
  },
  {
    id: 5,
    title: "UI Design System",
    description:
      "A comprehensive design system with reusable components, typography, and color schemes.",
    image: "/projects/project-4.svg",
    technologies: ["Figma", "Sketch", "Adobe XD"],
    category: "UI Design",
    liveUrl: "https://example.com/project5",
    githubUrl: "",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{
        duration: 0.5,
        hover: { duration: 0.3, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      className="bg-background border border-foreground/10 rounded-xl overflow-hidden group perspective-1000 transform-gpu"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      }}
    >
      <div className="aspect-video w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div
          className="h-full w-full bg-gray-200 dark:bg-gray-800"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute bottom-0 left-0 p-4 z-20">
          <p className="text-xs font-medium text-white/80 mb-1">
            {project.technologies.join(" · ")}
          </p>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-foreground/50 font-medium">
            {project.category}
          </span>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                aria-label="View GitHub repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                aria-label="View live site"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Explore my recent work across different technologies and platforms.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
