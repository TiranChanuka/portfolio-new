"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real application, you would verify the session/token with your backend
    const checkAuth = () => {
      const storedUser = localStorage.getItem("portfolio_admin_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Redirect logic for protected routes
  useEffect(() => {
    if (!isLoading) {
      // If not logged in and trying to access admin routes (except login)
      if (
        !user &&
        pathname?.startsWith("/admin") &&
        pathname !== "/admin/login"
      ) {
        router.push("/admin/login");
      }

      // If logged in and accessing login page
      if (user && pathname === "/admin/login") {
        router.push("/admin");
      }
    }
  }, [user, pathname, isLoading, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real application, you would validate against your backend
      if (email === "admin@example.com" && password === "password") {
        const userData: User = { email, name: "Admin User" };
        setUser(userData);
        localStorage.setItem("portfolio_admin_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("portfolio_admin_user");
    router.push("/admin/login");
  }; // Return the context provider
  return {
    user,
    login,
    logout,
    isLoading,
    children,
  };
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
