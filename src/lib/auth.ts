"use client";

import { createContext, useContext, ReactNode } from "react";

// Since we don't need admin functionality, we'll create a simplified auth context
// that could be used for other purposes in the future if needed

interface AuthContextType {
  // Adding placeholder methods for future use if needed
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Return a basic context provider with no admin functionality
  return {
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
