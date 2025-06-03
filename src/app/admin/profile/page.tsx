"use client";

import React from "react";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { useProfile, Profile } from "@/lib/profile-context";

// Add a mapping object for social icons
const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
};

// This would be loaded from a database in a real application
const initialProfile = {
  name: "John Smith",
  title: "Frontend & WordPress Developer",
  email: "contact@example.com",
  phone: "+1 (123) 456-7890",
  location: "New York, NY",
  bio: "Experienced web developer specializing in creating modern, responsive websites and applications. With expertise in both frontend technologies and WordPress development, I deliver solutions that combine aesthetic design with technical excellence.",
  availability: "Available for freelance work",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: Linkedin,
    },
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      icon: Github,
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: Twitter,
    },
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "University of Technology",
      period: "2014 - 2016",
      description:
        "Specialized in Web Technologies and Human-Computer Interaction.",
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "State University",
      period: "2010 - 2014",
      description:
        "Graduated with honors. Completed coursework in Software Development, Databases, and Web Programming.",
    },
  ],
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description:
        "Lead development of company's main SaaS platform using React and Next.js. Implemented responsive design, improved performance, and mentored junior developers.",
    },
    {
      title: "WordPress Developer",
      company: "WebSolutions Agency",
      period: "2018 - 2021",
      description:
        "Created custom WordPress themes and plugins for 30+ client websites. Specialized in e-commerce solutions and membership sites using WooCommerce and custom post types.",
    },
    {
      title: "Frontend Developer",
      company: "Creative Digital Studio",
      period: "2016 - 2018",
      description:
        "Developed responsive websites for clients across various industries. Utilized HTML, CSS, JavaScript, and jQuery to create interactive and visually appealing UIs.",
    },
  ],
};

export default function ProfileAdmin() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  const [localProfile, setLocalProfile] = useState<Profile>(profile);
  const [activeTab, setActiveTab] = useState<string>("basic");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalProfile({
      ...localProfile,
      [name]: value,
    });
  };

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocialLinks = [...localProfile.socialLinks];
    newSocialLinks[index] = {
      ...newSocialLinks[index],
      [field]: value,
    };

    setLocalProfile({
      ...localProfile,
      socialLinks: newSocialLinks,
    });
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newEducation = [...localProfile.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };

    setLocalProfile({
      ...localProfile,
      education: newEducation,
    });
  };
  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newExperience = [...localProfile.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };

    setLocalProfile({
      ...localProfile,
      experience: newExperience,
    });
  };
  const handleAddEducation = () => {
    setLocalProfile({
      ...localProfile,
      education: [
        ...localProfile.education,
        { degree: "", institution: "", period: "", description: "" },
      ],
    });
  };
  const handleRemoveEducation = (index: number) => {
    const newEducation = [...localProfile.education];
    newEducation.splice(index, 1);

    setLocalProfile({
      ...localProfile,
      education: newEducation,
    });
  };
  const handleAddExperience = () => {
    setLocalProfile({
      ...localProfile,
      experience: [
        ...localProfile.experience,
        { title: "", company: "", period: "", description: "" },
      ],
    });
  };
  const handleRemoveExperience = (index: number) => {
    const newExperience = [...localProfile.experience];
    newExperience.splice(index, 1);

    setLocalProfile({
      ...localProfile,
      experience: newExperience,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // In a real application, you would send the profile data to your backend
    // For now, we'll just update the context
    updateProfile(localProfile);
    console.log(localProfile);

    // Show success message
    alert("Profile updated successfully!");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-foreground/70">
            Manage your personal information and experience
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-0">
              <nav className="space-y-1">
                {[
                  { id: "basic", label: "Basic Info" },
                  { id: "social", label: "Social Links" },
                  { id: "education", label: "Education" },
                  { id: "experience", label: "Experience" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      activeTab === tab.id
                        ? "bg-foreground/10 font-medium"
                        : "hover:bg-foreground/5"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <Card className={activeTab !== "basic" ? "hidden" : undefined}>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 pb-6 mb-6 border-b border-foreground/10">
                  <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {/* This would be a profile image in a real application */}
                    <Upload className="h-8 w-8 text-foreground/50" />
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    Upload New Photo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={localProfile.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={localProfile.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-foreground/20 bg-foreground/5">
                        <Mail className="h-4 w-4 text-foreground/50" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={localProfile.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-r-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-foreground/20 bg-foreground/5">
                        <Phone className="h-4 w-4 text-foreground/50" />
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={localProfile.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-r-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-foreground/20 bg-foreground/5">
                        <MapPin className="h-4 w-4 text-foreground/50" />
                      </span>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={localProfile.location}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-r-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="availability"
                      className="text-sm font-medium"
                    >
                      Availability
                    </label>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      value={localProfile.availability}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={localProfile.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className={activeTab !== "social" ? "hidden" : undefined}>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {localProfile.socialLinks.map((social, index) => {
                  // Use our social icon mapping to get the correct icon component
                  const IconComponent =
                    socialIcons[social.platform as keyof typeof socialIcons];

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium flex items-center gap-2">
                          {IconComponent && (
                            <IconComponent className="h-4 w-4" />
                          )}
                          {social.platform}
                        </label>
                      </div>
                      <input
                        type="url"
                        value={social.url}
                        onChange={(e) =>
                          handleSocialChange(index, "url", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Your ${social.platform} URL`}
                      />
                    </div>
                  );
                })}
                {/* Option to add more social links would go here */}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className={activeTab !== "education" ? "hidden" : undefined}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button type="button" onClick={handleAddEducation} size="sm">
                  Add Education
                </Button>
              </CardHeader>{" "}
              <CardContent className="space-y-8">
                {localProfile.education.map((edu, index) => (
                  <div
                    key={index}
                    className="space-y-4 pb-6 border-b border-foreground/10 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium">
                        Education #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        onClick={() => handleRemoveEducation(index)}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "period",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. 2018 - 2022"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          value={edu.description}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}{" "}
                {localProfile.education.length === 0 && (
                  <div className="text-center py-4 text-foreground/70">
                    No education entries yet. Click "Add Education" to add one.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className={activeTab !== "experience" ? "hidden" : undefined}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <Button type="button" onClick={handleAddExperience} size="sm">
                  Add Experience
                </Button>
              </CardHeader>{" "}
              <CardContent className="space-y-8">
                {localProfile.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="space-y-4 pb-6 border-b border-foreground/10 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium">
                        Experience #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "period",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. 2020 - Present"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg bg-transparent border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}{" "}
                {localProfile.experience.length === 0 && (
                  <div className="text-center py-4 text-foreground/70">
                    No experience entries yet. Click "Add Experience" to add
                    one.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin")}
              >
                Cancel
              </Button>
              <Button type="submit">Save All Changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
