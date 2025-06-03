"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Settings,
  User,
  FileCode,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { AuthProvider } from "@/lib/auth-provider";

// Sidebar component
function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return pathname === `/admin${path}`
      ? "bg-blue-500 text-white"
      : "text-foreground/70 hover:bg-foreground/10";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-foreground/10 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-foreground/70">Manage your portfolio</p>
        </div>

        <nav className="space-y-1">
          <Link
            href="/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive(
              ""
            )}`}
          >
            <Settings className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/admin/projects"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive(
              "/projects"
            )}`}
          >
            <Briefcase className="h-4 w-4" />
            Projects
          </Link>

          <Link
            href="/admin/skills"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive(
              "/skills"
            )}`}
          >
            <FileCode className="h-4 w-4" />
            Skills
          </Link>

          <Link
            href="/admin/profile"
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive(
              "/profile"
            )}`}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>

          <div className="border-t border-foreground/10 my-4 pt-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-md text-foreground/70 hover:bg-foreground/10 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View Site
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Sidebar>{children}</Sidebar>
    </AuthProvider>
  );
}
