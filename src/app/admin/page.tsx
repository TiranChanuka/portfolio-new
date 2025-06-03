"use client";

import { Card } from "@/components/ui/card";
import {
  Activity,
  Briefcase,
  FileCode,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">Total Projects</p>
              <h3 className="text-3xl font-bold">4</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">Skills</p>
              <h3 className="text-3xl font-bold">22</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <FileCode className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">Experience Years</p>
              <h3 className="text-3xl font-bold">7</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">Profile Views</p>
              <h3 className="text-3xl font-bold">1,238</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                action: "Added new project",
                project: "E-commerce Website",
                time: "2 days ago",
              },
              { action: "Updated skills", project: "", time: "1 week ago" },
              {
                action: "Updated profile information",
                project: "",
                time: "2 weeks ago",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-3 border-b border-foreground/10 last:border-0 last:pb-0"
              >
                <User className="h-5 w-5 mt-0.5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{item.action}</p>
                  {item.project && (
                    <p className="text-xs text-foreground/70">{item.project}</p>
                  )}
                  <p className="text-xs text-foreground/50">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: "Add Project",
                icon: Briefcase,
                href: "/admin/projects/new",
              },
              { name: "Edit Profile", icon: User, href: "/admin/profile" },
              { name: "Update Skills", icon: FileCode, href: "/admin/skills" },
              { name: "View Site", icon: ExternalLink, href: "/" },
            ].map((action, index) => {
              const Icon = action.icon;

              return (
                <a
                  key={index}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors text-center"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.name}</span>
                </a>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
