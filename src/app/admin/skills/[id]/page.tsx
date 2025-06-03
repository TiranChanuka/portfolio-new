"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSkills } from "@/lib/skills-context";

// Form validation schema
const skillFormSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(1).max(100),
  category: z.string().min(1, "Category is required"),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

// This is a client component that handles the edit skill functionality
export default function EditSkill({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getSkillById, updateSkill, skills } = useSkills();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;
  const [originalCategory, setOriginalCategory] = useState<string>("");
  const categories = Object.keys(skills);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      level: 75,
      category: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // Fetch skill data from context
  useEffect(() => {
    // Get the skill data from context
    const skillData = getSkillById(id);

    if (skillData) {
      const { skill, category } = skillData;
      setOriginalCategory(category);

      reset({
        name: skill.name,
        level: skill.level,
        category: category,
      });
    } else {
      // Skill not found, redirect back to skills page
      router.push("/admin/skills");
    }

    setIsLoading(false);
  }, [id, reset, router, getSkillById]);

  const onSubmit = async (data: SkillFormValues) => {
    setIsSubmitting(true);

    // Check if category changed
    const categoryChanged = data.category !== originalCategory;

    // Update the skill in our context
    updateSkill(
      id,
      { name: data.name, level: data.level },
      categoryChanged ? data.category : undefined
    );

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/skills");
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Skill</h1>
          <p className="text-foreground/70">Update skill details</p>
        </div>

        <Button variant="outline" onClick={() => router.push("/admin/skills")}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Skill Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-foreground/20 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                  placeholder="E.g. React.js, WordPress, UI Design"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>{" "}
                <select
                  id="category"
                  {...register("category")}
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500"
                      : "border-foreground/20 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                >
                  {" "}
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="custom">Add new category...</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="level" className="block text-sm font-medium">
                  Proficiency Level: {form.watch("level")}%
                </label>
                <input
                  id="level"
                  type="range"
                  min="1"
                  max="100"
                  {...register("level", { valueAsNumber: true })}
                  className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-foreground/70">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
                {errors.level && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.level.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/skills")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Update Skill"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
