"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

// Define types for our profile data
export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  availability: string;
  socialLinks: SocialLink[];
  education: Education[];
  experience: Experience[];
}

// Initial profile data
const initialProfile: Profile = {
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

// Context setup
interface ProfileContextType {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Provider component
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => {
    // Try to load from localStorage in client component
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_profile");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse profile data", e);
        }
      }
    }
    return initialProfile;
  });

  const updateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    localStorage.setItem("portfolio_profile", JSON.stringify(updatedProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Hook for using the context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}

// Export initial data for direct usage
export { initialProfile };
