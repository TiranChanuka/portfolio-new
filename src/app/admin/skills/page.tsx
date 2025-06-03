"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSkills, Skill } from "@/lib/skills-context";

export default function SkillsAdmin() {
  const { skills, deleteSkill, addCategory, deleteCategory } = useSkills();
  const [activeCategory, setActiveCategory] = useState<string>(
    Object.keys(skills)[0] || ""
  );
  const categories = Object.keys(skills);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(id);
    }
  };

  const handleAddCategory = () => {
    const newCategory = window.prompt("Enter new category name:");
    if (
      newCategory &&
      newCategory.trim() !== "" &&
      !categories.includes(newCategory)
    ) {
      addCategory(newCategory.trim());
      setActiveCategory(newCategory.trim());
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the entire "${category}" category and all its skills?`
      )
    ) {
      deleteCategory(category);

      if (activeCategory === category) {
        setActiveCategory(
          Object.keys(skills).filter((cat) => cat !== category)[0] || ""
        );
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-foreground/70">
            Manage your skills and expertise levels
          </p>
        </div>

        <Link href="/admin/skills/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Skill
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories sidebar */}
        <div className="md:col-span-1">
          <div className="bg-background rounded-xl p-4 border border-foreground/10 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <Button variant="ghost" size="sm" onClick={handleAddCategory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${
                    activeCategory === category
                      ? "bg-foreground/10"
                      : "hover:bg-foreground/5"
                  }`}
                >
                  <button
                    className="flex-1 text-left"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category} ({skills[category].length})
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category);
                    }}
                    className="p-1 rounded-full hover:bg-foreground/10"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills list */}
        <div className="md:col-span-3">
          <div className="space-y-4">
            <div className="bg-background rounded-xl p-4 border border-foreground/10 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                {activeCategory} Skills
              </h3>
              {skills[activeCategory]?.length > 0 ? (
                skills[activeCategory].map((skill: Skill) => (
                  <Card key={skill.id} className="p-4 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <div className="mt-1 h-2 w-48 bg-foreground/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground/70">
                          {skill.level}% proficiency
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/skills/${skill.id}`}
                          className="p-2 rounded-full hover:bg-foreground/5"
                        >
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Link>

                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="p-2 rounded-full hover:bg-foreground/5"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-foreground/70 mb-4">
                    No skills in this category yet
                  </p>
                  <Link href="/admin/skills/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Add Skill
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
