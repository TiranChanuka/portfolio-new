"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Current year
const currentYear = new Date().getFullYear();

// Helper function for smooth scrolling to sections
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else if (sectionId === "home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-foreground/10 bg-gradient-to-br from-background to-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="text-2xl font-semibold mb-4 block cursor-pointer"
            >
              Portfolio
            </a>
            <p className="text-foreground/70 text-sm max-w-xs">
              A professional web developer specializing in creating modern,
              responsive websites and applications with clean code and great
              user experience.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>{" "}
            <nav className="flex flex-col gap-2">
              {["Home", "Projects", "Skills", "About", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item === "Home" ? "" : item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionId =
                        item === "Home"
                          ? "home"
                          : item === "Skills"
                          ? "skills-universe"
                          : item.toLowerCase();
                      scrollToSection(sectionId);
                    }}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </motion.div>{" "}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="flex flex-col gap-2">
              {[
                "Frontend Development",
                "WordPress Development",
                "Responsive Web Design",
                "UI/UX Implementation",
                "Website Maintenance",
              ].map((service) => (
                <li key={service} className="text-sm text-foreground/70">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-foreground/60">
            © {currentYear} Tiran Chanuka. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" />{" "}
            using Next.js & Three.js
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
