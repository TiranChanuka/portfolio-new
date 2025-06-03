"use client";

import { ReactNode } from "react";
import { AuthProvider as Provider } from "./auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
