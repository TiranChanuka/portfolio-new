"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewProject() {
  const router = useRouter();
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");

  const handleAddTechnology = () => {
    if (newTech.trim() !== "" && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, you would process the form data and send it to your backend
    // For now, we'll just redirect back to the projects page

    // Mock form submission delay
    setTimeout(() => {
      router.push("/admin/projects");
    }, 1000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Project</h1>
          <p className="text-foreground/70">Create a new portfolio project</p>
        </div>

        <Button
          variant="outline"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E.g. E-commerce Website"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="WordPress">WordPress</option>
                  <option value="Full-Stack">Full-Stack</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="liveUrl" className="block text-sm font-medium">
                  Live URL
                </label>
                <input
                  id="liveUrl"
                  type="url"
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="githubUrl"
                  className="block text-sm font-medium"
                >
                  GitHub URL
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourusername/project"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your project"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium">
                    Technologies Used
                  </label>
                  <span className="text-xs text-foreground/70">
                    {technologies.length} added
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="E.g. React, Node.js"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTechnology();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTechnology}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-foreground/10 text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="p-0.5 rounded-full hover:bg-foreground/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}

                  {technologies.length === 0 && (
                    <span className="text-sm text-foreground/50">
                      No technologies added yet
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium">
                  Project Image
                </label>
                <div className="border-2 border-dashed border-foreground/20 rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-foreground/50" />
                  <p className="text-sm mb-2">
                    Drag and drop an image, or{" "}
                    <span className="text-blue-500 cursor-pointer">browse</span>
                  </p>
                  <p className="text-xs text-foreground/50">
                    Maximum file size: 5MB. Supported formats: JPG, PNG, WebP
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/projects")}
              >
                Cancel
              </Button>
              <Button type="submit">Save Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
