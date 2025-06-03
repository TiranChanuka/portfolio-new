"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sample project data - in a real app this would come from a database
const projectsData = [
  {
    id: 1,
    title: "E-commerce Website",
    description:
      "A modern e-commerce platform with product filtering, cart functionality, and payment processing.",
    image: "/projects/project-1.jpg",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    category: "Full-Stack",
    liveUrl: "https://example.com/project1",
    githubUrl: "https://github.com/yourusername/project1",
  },
  {
    id: 2,
    title: "Corporate Website",
    description:
      "Custom WordPress theme development for a corporate client with custom post types and admin features.",
    image: "/projects/project-2.jpg",
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
    image: "/projects/project-3.jpg",
    technologies: ["React", "Chart.js", "Tailwind CSS", "Firebase"],
    category: "Frontend",
    liveUrl: "https://example.com/project3",
    githubUrl: "https://github.com/yourusername/project3",
  },
  {
    id: 4,
    title: "Blog Platform",
    description:
      "Custom WordPress multisite installation with membership features and content restriction.",
    image: "/projects/project-4.jpg",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    category: "WordPress",
    liveUrl: "https://example.com/project4",
    githubUrl: "https://github.com/yourusername/project4",
  },
];

// Define project type
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

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-foreground/70">Manage your portfolio projects</p>
        </div>

        <Link href="/admin/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Project
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-start gap-4">
              <div
                className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-md flex-shrink-0"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-foreground/70">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-foreground/10 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-foreground/10 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-foreground/5"
                    aria-label="View live site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-foreground/5"
                    aria-label="View GitHub repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}

                <Link
                  href={`/admin/projects/${project.id}`}
                  className="p-2 rounded-full hover:bg-foreground/5"
                  aria-label="Edit project"
                >
                  <Pencil className="h-4 w-4 text-blue-500" />
                </Link>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-full hover:bg-foreground/5"
                  aria-label="Delete project"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No projects yet</h3>
            <p className="text-foreground/70 mb-6">
              Add your first project to showcase in your portfolio
            </p>
            <Link href="/admin/projects/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
