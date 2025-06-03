"use client";

import { useState } from "react";
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

// Default categories to show in selection
const defaultCategories = [
  "Frontend Development",
  "WordPress Development",
  "Other Skills",
];

export default function NewSkill() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  } = form;
  const { addSkill } = useSkills();

  const onSubmit = async (data: SkillFormValues) => {
    setIsSubmitting(true);

    // Add the skill to our skills context
    const newSkill = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      level: data.level,
    };

    addSkill(newSkill, data.category);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/admin/skills");
    }, 500);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Add New Skill</h1>
          <p className="text-foreground/70">
            Add a new skill to your portfolio
          </p>
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
                </label>
                <select
                  id="category"
                  {...register("category")}
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500"
                      : "border-foreground/20 focus:ring-blue-500"
                  } focus:outline-none focus:ring-2 focus:border-transparent`}
                >
                  <option value="">Select a category</option>
                  {defaultCategories.map((category) => (
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
                {isSubmitting ? "Saving..." : "Save Skill"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
