"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the skill and category types
export interface Skill {
  id: string;
  name: string;
  level: number;
  description?: string;
  yearsExperience?: number;
}

export interface SkillsData {
  [category: string]: Skill[];
}

interface SkillsContextType {
  skills: SkillsData;
  setSkills: (skills: SkillsData) => void;
  addSkill: (skill: Skill, category: string) => void;
  updateSkill: (
    id: string,
    updatedSkill: Partial<Skill>,
    newCategory?: string
  ) => void;
  deleteSkill: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  getSkillById: (id: string) => { skill: Skill; category: string } | null;
  getSkillsByLevel: (minLevel?: number, maxLevel?: number) => Skill[];
  getSkillsByCategory: (category: string) => Skill[];
  getCategoryColors: () => Record<string, string>;
  getSkillIcon: (skillName: string) => string;
  getAvailableSkillIcons: () => Record<string, string>;
  loading: boolean;
}

// Initial skill data with descriptions
const initialSkillsData: SkillsData = {
  "Frontend Development": [
    {
      id: "1",
      name: "HTML5",
      level: 95,
      description: "Semantic markup, accessibility, and modern features",
      yearsExperience: 7,
    },
    {
      id: "2",
      name: "CSS3",
      level: 92,
      description: "Advanced layouts, animations, and responsive design",
      yearsExperience: 7,
    },
    {
      id: "3",
      name: "JavaScript",
      level: 90,
      description: "ES6+, DOM manipulation, and asynchronous programming",
      yearsExperience: 6,
    },
    {
      id: "4",
      name: "React",
      level: 85,
      description: "Component architecture, hooks, and state management",
      yearsExperience: 5,
    },
    {
      id: "5",
      name: "Next.js",
      level: 80,
      description: "Server-side rendering, static generation, and API routes",
      yearsExperience: 3,
    },
    {
      id: "6",
      name: "TypeScript",
      level: 75,
      description: "Type safety, interfaces, and advanced typing",
      yearsExperience: 3,
    },
    {
      id: "7",
      name: "Tailwind CSS",
      level: 90,
      description: "Utility-first CSS framework for rapid UI development",
      yearsExperience: 3,
    },
    {
      id: "8",
      name: "Framer Motion",
      level: 70,
      description: "Animation library for React with gesture support",
      yearsExperience: 2,
    },
    {
      id: "9",
      name: "Three.js",
      level: 60,
      description: "3D graphics in the browser using WebGL",
      yearsExperience: 1,
    },
    {
      id: "22",
      name: "Redux",
      level: 75,
      description: "State management library for JavaScript applications",
      yearsExperience: 3,
    },
    {
      id: "23",
      name: "API Integration",
      level: 70,
      description: "Working with RESTful APIs",
      yearsExperience: 2,
    },
    {
      id: "33",
      name: "Bootstrap",
      level: 80,
      description: "Popular CSS framework for responsive design",
      yearsExperience: 4,
    },
    {
      id: "34",
      name: "Chakra UI",
      level: 75,
      description: "Accessible and customizable React component library",
      yearsExperience: 2,
    },
    {
      id: "35",
      name: "MUI (Material-UI)",
      level: 80,
      description: "React components that implement Google's Material Design",
      yearsExperience: 3,
    },
    {
      id: "36",
      name: "Sass",
      level: 85,
      description: "CSS preprocessor for better styles organization",
      yearsExperience: 4,
    },
    {
      id: "37",
      name: "Ant Design",
      level: 70,
      description: "Enterprise-level UI design language and React components",
      yearsExperience: 2,
    },

    {
      id: "40",
      name: "Vercel",
      level: 80,
      description:
        "Platform for frontend frameworks and static sites, built to integrate with headless content, commerce, or database.",
      yearsExperience: 2,
    },
    {
      id: "41",
      name: "Vite",
      level: 75,
      description: "Next generation frontend tooling. It's fast! Very fast!",
      yearsExperience: 2,
    },
  ],
  "WordPress Development": [
    { id: "10", name: "WordPress", level: 95 },
    { id: "11", name: "PHP", level: 85 },
    { id: "12", name: "WooCommerce", level: 85 },
    { id: "13", name: "Custom Themes Development", level: 90 },
    { id: "14", name: "Elementor", level: 80 },
    { id: "27", name: "Gutenberg Blocks", level: 75 },
    { id: "28", name: "WordPress Security", level: 80 },
    { id: "29", name: "WordPress Performance Optimization", level: 70 },
    { id: "30", name: "WordPress REST API", level: 65 },
    { id: "31", name: "Plugin Development", level: 85 },
    { id: "32", name: "WordPress SEO", level: 80 },
  ],
  "Other Skills": [
    { id: "15", name: "Figma", level: 88 },
    { id: "16", name: "UI Design", level: 85 },
    { id: "17", name: "UX Design", level: 80 },
    { id: "18", name: "Adobe XD", level: 75 },
    // { id: "19", name: "Sketch", level: 70 },
    { id: "20", name: "Photoshop", level: 85 },
    { id: "24", name: "Performance Optimization", level: 75 },
    { id: "25", name: "SEO Fundamentals", level: 85 },
    { id: "21", name: "Figma/Design Tools", level: 70 },
    { id: "26", name: "API Integration", level: 80 },
  ],
};

// Category color mapping
const categoryColors = {
  "Frontend Development": "#3182CE", // Blue
  "WordPress Development": "#805AD5", // Purple
  "UI Design": "#38B2AC", // Teal
};

// Define available skill icons mapping
const availableSkillIcons: Record<string, string> = {
  // Frontend Development icons
  HTML5: "/Icons/HTML.png",
  CSS3: "/Icons/CSS.png",
  JavaScript: "/Icons/JavaScript.png",
  TypeScript: "/Icons/TypeScript.png",
  React: "/Icons/React.png",
  "Next.js": "/Icons/Nextjs.png",
  "Tailwind CSS": "/Icons/Tailwind.png",
  "Framer Motion": "/Icons/React.png", // Using React icon as fallback
  "Three.js": "/Icons/React.png", // Using React icon as fallback
  Redux: "/Icons/ReactRedux.png",
  "API Integration": "/Icons/React.png", // Using React icon as fallback
  Bootstrap: "/Icons/Bootstrap.png", // Fixed typo from "Boostrap"
  "Chakra UI": "/Icons/ChakraUI.png",
  "MUI (Material-UI)": "/Icons/MUI.png",
  Sass: "/Icons/Sass.png",
  "Ant Design": "/Icons/AntDesign.png",
  Vercel: "/Icons/Vercel.png",
  Vite: "/Icons/Vite.png",

  // WordPress Development icons
  WordPress: "/Icons/Wordpress.png",
  PHP: "/Icons/php.png", // Using WordPress icon as fallback
  WooCommerce: "/Icons/woocommerce.png", // Using WordPress icon as fallback
  "Custom Themes Development": "/Icons/Wordpress.png",
  Elementor: "/Icons/Elementor.png", // Fixed typo from "Elementer"
  "Gutenberg Blocks": "/Icons/Wordpress.png",
  "WordPress Security": "/Icons/Wordpress.png",
  "WordPress Performance Optimization": "/Icons/Wordpress.png",
  "WordPress REST API": "/Icons/api.png",
  "Plugin Development": "/Icons/Wordpress.png",
  "WordPress SEO": "/Icons/Wordpress.png",

  // Other Skills icons
  Figma: "/Icons/Figma.png",
  "UI Design": "/Icons/Figma.png",
  "UX Design": "/Icons/Figma.png",
  "Adobe XD": "/Icons/XD.png",
  Photoshop: "/Icons/Photoshop.png",
  "Performance Optimization": "/Icons/React.png", // Using React icon as fallback
  "SEO Fundamentals": "/Icons/React.png", // Using React icon as fallback
  "Figma/Design Tools": "/Icons/Figma.png",

  // Additional tools and frameworks (keeping for potential future use)
  npm: "/Icons/npm.png",
  Flutter: "/Icons/Flutter.png",
  Dart: "/Icons/Dart.png",
  Behance: "/Icons/Behance.png",
  Dribbble: "/Icons/Dribbble.png",
  Medium: "/Icons/Medium.png",
};

// Default icon for skills not in the mapping
const defaultSkillIcon = "/Icons/React.png";

// Utility function to get skill icon
export const getSkillIcon = (skillName: string): string => {
  return availableSkillIcons[skillName] || defaultSkillIcon;
};

// Utility function to get all available skill icons
export const getAvailableSkillIcons = (): Record<string, string> => {
  return availableSkillIcons;
};

// Create the skills context
const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

// Skills Provider component
export function SkillsProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<SkillsData>(initialSkillsData);
  const [loading, setLoading] = useState(true);
  // Load skills from local storage on initial render
  useEffect(() => {
    const storedSkills = localStorage.getItem("portfolioSkills");
    const storedTimestamp = localStorage.getItem("portfolioSkillsTimestamp");

    if (storedSkills && storedTimestamp) {
      try {
        const timestamp = parseInt(storedTimestamp);
        const currentTime = Date.now();
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        // Check if data is older than 1 day
        if (currentTime - timestamp > oneDayInMs) {
          // Data is old, remove from localStorage and use initial data
          localStorage.removeItem("portfolioSkills");
          localStorage.removeItem("portfolioSkillsTimestamp");
          console.log("Skills data expired, using initial data");
        } else {
          // Data is fresh, use stored data
          setSkills(JSON.parse(storedSkills));
        }
      } catch (error) {
        console.error("Failed to parse stored skills data", error);
        // Clear corrupted data
        localStorage.removeItem("portfolioSkills");
        localStorage.removeItem("portfolioSkillsTimestamp");
      }
    }

    setLoading(false);
  }, []);
  // Save skills to local storage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("portfolioSkills", JSON.stringify(skills));
      localStorage.setItem("portfolioSkillsTimestamp", Date.now().toString());
    }
  }, [skills, loading]);

  // Add a new skill to a category
  const addSkill = (skill: Skill, category: string) => {
    // Create category if it doesn't exist
    if (!skills[category]) {
      skills[category] = [];
    }

    // Generate a unique ID if not provided
    const newSkill = {
      ...skill,
      id: skill.id || Math.random().toString(36).substr(2, 9),
    };

    setSkills({
      ...skills,
      [category]: [...skills[category], newSkill],
    });
  };

  // Update an existing skill
  const updateSkill = (
    id: string,
    updatedSkill: Partial<Skill>,
    newCategory?: string
  ) => {
    let foundCategory = "";
    let foundSkill = null;

    // Find the skill and its category
    for (const category in skills) {
      const skill = skills[category].find((s) => s.id === id);
      if (skill) {
        foundSkill = skill;
        foundCategory = category;
        break;
      }
    }

    if (!foundSkill) return;

    const targetCategory = newCategory || foundCategory;

    // Create updated skills object
    const updatedSkills = { ...skills };

    // Remove from old category
    updatedSkills[foundCategory] = skills[foundCategory].filter(
      (s) => s.id !== id
    );

    // Create new category if needed
    if (!updatedSkills[targetCategory]) {
      updatedSkills[targetCategory] = [];
    }

    // Add to target category with updated fields
    updatedSkills[targetCategory] = [
      ...updatedSkills[targetCategory],
      { ...foundSkill, ...updatedSkill },
    ];

    setSkills(updatedSkills);
  };

  // Delete a skill
  const deleteSkill = (id: string) => {
    const updatedSkills = { ...skills };

    for (const category in updatedSkills) {
      const index = updatedSkills[category].findIndex(
        (skill) => skill.id === id
      );

      if (index !== -1) {
        updatedSkills[category] = updatedSkills[category].filter(
          (skill) => skill.id !== id
        );
        break;
      }
    }

    setSkills(updatedSkills);
  };

  // Add a new category
  const addCategory = (category: string) => {
    if (!skills[category]) {
      setSkills({
        ...skills,
        [category]: [],
      });
    }
  };

  // Delete a category
  const deleteCategory = (category: string) => {
    const updatedSkills = { ...skills };
    delete updatedSkills[category];
    setSkills(updatedSkills);
  };

  // Get a skill by ID
  const getSkillById = (id: string) => {
    for (const category in skills) {
      const skill = skills[category].find((s) => s.id === id);
      if (skill) {
        return { skill, category };
      }
    }
    return null;
  };

  // Get all skills that match a level range
  const getSkillsByLevel = (minLevel = 0, maxLevel = 100) => {
    const result: Skill[] = [];

    Object.values(skills).forEach((categorySkills) => {
      categorySkills.forEach((skill) => {
        if (skill.level >= minLevel && skill.level <= maxLevel) {
          result.push(skill);
        }
      });
    });

    return result;
  };

  // Get all skills in a category
  const getSkillsByCategory = (category: string) => {
    return skills[category] || [];
  };

  // Get the color mapping for categories
  const getCategoryColors = () => {
    return categoryColors;
  };
  return (
    <SkillsContext.Provider
      value={{
        skills,
        setSkills,
        addSkill,
        updateSkill,
        deleteSkill,
        addCategory,
        deleteCategory,
        getSkillById,
        getSkillsByLevel,
        getSkillsByCategory,
        getCategoryColors,
        getSkillIcon,
        getAvailableSkillIcons,
        loading,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

// Custom hook to use the skills context
export function useSkills() {
  const context = useContext(SkillsContext);
  if (context === undefined) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }
  return context;
}
