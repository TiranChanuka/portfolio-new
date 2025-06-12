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
  liveUrl?: string;
  githubUrl?: string;
}

// Sample project data - will be replaced with data from the admin panel
const projectCategories = ["All", "Frontend", "WordPress", "UI Design"];

const projectsData = [
  {
    id: 1,
    title: "Nature Core E-commerce Website",
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and payment processing.",
    image: "/projects/natureThank.png",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    liveUrl: "https://naturecore.lk/",
    // githubUrl: "https://github.com/yourusername/project1",
  },
  {
    id: 2,
    title: "Hari Capital",
    description:
      "Loan management system with user authentication, loan tracking, and payment history.",
    image: "/projects/hariCapital.png",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Ant Design"],
    category: "Frontend",
    // liveUrl: "https://example.com/project2",
    // githubUrl: "https://github.com/yourusername/project2",
  },
  {
    id: 3,
    title: "Kauma's Boat Kitchen",
    description:
      "wordpress website for a local restaurant, featuring menu management and online reservations.",
    image: "/projects/boatKitchen.png",
    technologies: ["WordPress", "PHP", "MySQL", "Elementor"],
    category: "WordPress",
    liveUrl: "https://kawumasboatkitchen.com/",
    // githubUrl: "https://github.com/yourusername/project3",
  },
  {
    id: 4,
    title: "KNC Gaming",
    description:
      "A WordPress site for a gaming community, showcasing game reviews and community events.",
    image: "/projects/KncGaming.png",
    technologies: ["WordPress", "PHP", "CSS", "Elementor"],
    category: "WordPress",
    liveUrl: "https://kncgaming.gg/",
    githubUrl: "",
  },
  {
    id: 5,
    title: "Little Rose Inn",
    description:
      "Hotel booking website with room management, booking system, and customer reviews.",
    image: "/projects/littleRose.png",
    technologies: ["WordPress", "PHP", "CSS", "JavaScript", "Elementor"],
    category: "WordPress",
    liveUrl: "https://littleroseinn.com/",
    // githubUrl: "https://github.com/yourusername/project4",
  },
  {
    id: 6,
    title: "Silver Sparkles",
    description:
      "Ecommerce website for a jewelry store, featuring product listings, shopping cart, and checkout.",
    image: "/projects/SilverSparkles.png",
    technologies: ["React js", "Tailwind", "JavaScript", "CSS"],
    category: "Frontend",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 7,
    title: "Udawalawe Jungle Jeep Safari",
    description:
      "A WordPress site for a safari tour company, offering booking and tour information.",
    image: "/projects/udawalawe.png",
    technologies: ["WordPress", "PHP", "CSS", "JavaScript", "Elementor"],
    category: "WordPress",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: 8,
    title: "Mandara Tours Taxi Service",
    description:
      "A WordPress site for a taxi service, featuring booking forms and service details.",
    image: "/projects/MandaraTours.png",
    technologies: ["WordPress", "PHP", "CSS", "JavaScript", "Elementor"],
    category: "WordPress",
    liveUrl: "https://mandaratourstaxi.com/",
    githubUrl: "",
  },
  {
    id: 9,
    title: "E-Wallet UI Design",
    description:
      "A sleek and modern UI design for an e-wallet application, focusing on user experience and intuitive navigation.",
    image: "/projects/ewallet.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1356338825922305335/e-wallet",
    githubUrl: "",
  },
  {
    id: 10,
    title: "Car Blog UI Design",
    description:
      "A clean and responsive UI design for a car blog, showcasing articles, reviews, and user comments.",
    image: "/projects/Car.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1352279668921102753/car-blog",
    githubUrl: "",
  },
  {
    id: 11,
    title: "Mobile Sign in & Sign up UI Design",
    description:
      "A modern and user-friendly mobile UI design for sign-in and sign-up screens, ensuring a smooth user experience.",
    image: "/projects/login.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1299066779432095307/mobile-sign-in-sign-up-design",
    githubUrl: "",
  },
  {
    id: 12,
    title: "Food Delivery app Splash Screen UI Design",
    description:
      "A vibrant and engaging splash screen design for a food delivery app, designed to capture user attention.",
    image: "/projects/QuickBite.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1304847508707276735/food-delivery-app-splash-screen",
    githubUrl: "",
  },
  {
    id: 13,
    title: "Education Mobile App UI Design (EduLearn)",
    description:
      "A comprehensive UI design for an education mobile app, featuring course listings, user profiles, and interactive learning modules.",
    image: "/projects/EduLearn.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1304508164253558153/education-mobile-app-edulearn",
    githubUrl: "",
  },
  {
    id: 14,
    title: "EcoGuide UI Design",
    description:
      "A user-friendly UI design for an environmental protection mobile app, focusing on sustainability tips and eco-friendly practices.",
    image: "/projects/EcoGuide.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1302581806533869902/environment-protect-mobile-app",
    githubUrl: "",
  },
  {
    id: 15,
    title: "Bloom Hub Mobile App UI Design",
    description:
      "A beautiful and intuitive UI design for a flower store application, featuring product browsing, cart management, and checkout.",
    image: "/projects/bloomHub.png",
    technologies: ["Figma", "Photoshop", "Illustrator"],
    category: "UI Design",
    liveUrl:
      "https://www.figma.com/community/file/1278052209735568526/flower-store-application-bloomhub",
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
