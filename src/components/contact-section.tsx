"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { StarryBackground } from "./StarryBackground";
import Image from "next/image";

// Contact information
const contactInfo = {
  email: "tiranchanukaw@gmail.com",
  phone: "+94 717494134",
  location: "Rathnapura, Sri Lanka",
  resumeLink: "/resume.pdf", // Update this with your actual resume path
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tiranchanuka/",
      icon: Linkedin,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:bg-blue-500/10",
    },
    {
      name: "GitHub",
      url: "https://github.com/TiranChanuka",
      icon: Github,
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:bg-gray-500/10",
    },
    {
      name: "Twitter",
      url: "https://x.com/TiranChanuka",
      icon: Twitter,
      color: "from-blue-400 to-blue-500",
      hoverColor: "hover:bg-blue-400/10",
    },
  ],
  skills: [
    "React",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "WordPress",
    "Tailwind CSS",
    "Node.js",
    "UI/UX Design",
  ],
};

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 px-6 overflow-hidden">
      {/* Enhanced Starry Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <StarryBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background/80 z-1"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/20 backdrop-blur-sm"
            initial={{
              width: Math.random() * 30 + 10,
              height: Math.random() * 30 + 10,
              x: Math.random() * 100,
              y: Math.random() * 100 + 500,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              y: -500,
              x: `calc(${Math.random() * 200 - 100}px)`,
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-foreground/70 max-w-2xl mx-auto text-lg"
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1 space-y-6"
          >
            {/* Profile Image Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 shadow-lg border border-foreground/10 backdrop-blur-sm">
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-full blur opacity-50 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="relative aspect-square overflow-hidden rounded-full border-2 border-white/20">
                  <Image
                    src="/Profile.png"
                    alt="Tiran Chanuka"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold">Tiran Chanuka</h3>
                <p className="text-foreground/70 mb-4">
                  Frontend & WordPress Developer
                </p>

                {/* <motion.a
                  href={contactInfo.resumeLink}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </motion.a> */}
              </div>
            </div>

            {/* Key Skills */}
            <motion.div
              className="bg-background rounded-2xl p-6 shadow-lg border border-foreground/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="w-6 h-1 bg-blue-500 rounded-full"></span>
                Key Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {contactInfo.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-foreground/5 border border-foreground/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
          {/* Contact Details & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-8"
          >
            {/* Direct Contact Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Email */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-background rounded-2xl p-6 shadow-lg border border-foreground/10 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-500/10 mb-4">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <h4 className="font-medium mb-1">Email</h4>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-foreground/70 hover:text-blue-500 transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-background rounded-2xl p-6 shadow-lg border border-foreground/10 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500/10 mb-4">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                <h4 className="font-medium mb-1">Phone</h4>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-foreground/70 hover:text-green-500 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </motion.div>

              {/* Location */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-background rounded-2xl p-6 shadow-lg border border-foreground/10 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-purple-500/10 mb-4">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
                <h4 className="font-medium mb-1">Location</h4>
                <p className="text-foreground/70">{contactInfo.location}</p>
              </motion.div>
            </div>

            {/* Social Links with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-8 shadow-lg border border-foreground/10"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-6 h-1 bg-blue-500 rounded-full"></span>
                Connect With Me
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {contactInfo.socialLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-4 p-5 rounded-xl ${link.hoverColor} transition-all group relative overflow-hidden`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Animated gradient background on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-foreground/5 to-foreground/10 transition-opacity duration-300"></div>

                      {/* Icon with animated gradient */}
                      <div className="relative">
                        <div
                          className={`absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-50 bg-gradient-to-r ${link.color} transition-opacity duration-300`}
                        ></div>
                        <div className="relative w-14 h-14 rounded-full flex items-center justify-center border border-foreground/10 bg-foreground/5 group-hover:border-foreground/20 transition-all duration-300">
                          <Icon className="h-6 w-6 text-foreground/70 group-hover:text-foreground transition-colors" />
                        </div>
                      </div>

                      {/* Name with external link icon */}
                      <div className="flex items-center gap-1.5 font-medium">
                        {link.name}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability Card with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl"></div>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0)_60%)]"></div>

              <div className="relative p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Let's Work Together
                </h3>
                <p className="text-blue-100 mb-6 text-lg">
                  I'm currently available for freelance projects and full-time
                  opportunities. Let's create something extraordinary together!
                </p>

                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={`mailto:${contactInfo.email}?subject=Project%20Inquiry`}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium transition-all inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="h-4 w-4" />
                    Email Me
                  </motion.a>

                  <motion.a
                    href={`https://wa.me/${contactInfo.phone.replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium transition-all inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="h-4 w-4" />
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>{" "}
        </div>
      </div>
    </section>
  );
}
