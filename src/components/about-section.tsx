"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

// Experience data
const experienceData = [
  {
    title: "Junior Software Engineer",
    company: "Infoxty Technologies",
    period: "2024 (Dec) - Present",
    description:
      "Currently working as an Junior Software Engineer, focusing on frontend development using React, Next js and also Wordpress. Involved in building scalable web applications and optimizing performance.",
  },
  {
    title: "Software Engineer Intern",
    company: "Infact Solutions (Pvt) Ltd",
    period: "(Apr) 2024 - (Oct) 2024",
    description:
      "Contributed to the development of web applications using React and Next.js. Assisted in implementing responsive designs and improving user experience through performance optimizations.",
  },
  {
    title: "Frontend Developer",
    company: "CodeScape Lab & Solution",
    period: "Mar (2024) - Present",
    description:
      "Developed and maintained multiple WordPress websites, focusing on custom theme and plugin development. Enhanced site performance and user experience through best practices in frontend development.",
  },
  {
    title: "WordPress Developer and UI/UX Designer",
    company: "Cyberpixels",
    period: "Aug (2023) - May(2024)",
    description:
      "Designed and developed WordPress themes and plugins. Collaborated with clients to create user-friendly interfaces and improve overall site functionality.",
  },
  {
    title: "Freelance Web Developer",
    company: "Upwork, Fiverr, and Freelancer",
    period: "Aug (2020) - Present",
    description:
      "Worked on various freelance projects, specializing in WordPress development and frontend technologies. Delivered high-quality web solutions tailored to client requirements, including custom themes and plugins.",
  },
];

const educationData = [
  {
    degree: "Information and Communication Technology",
    institution: "Uva Wellassa University of Sri Lanka",
    period: "2021 - 2025",
    description:
      "Currently pursuing a degree in Information and Communication Technology. Focused on software engineering, web development, and database management. Expected to graduate in 2025.",
  },
  {
    degree: "Diploma in Software Engineering",
    institution: "Sabaragamuwa University of Sri Lanka",
    period: "2019 - 2020",
    description:
      "Completed a Diploma in Software Engineering, gaining foundational knowledge in programming, software development methodologies, and project management. Developed skills in various programming languages and frameworks.",
  },
  {
    degree: "BIT (Bachelor of Information Technology)",
    institution: "University of Colombo School of Computing",
    period: "2020 - 2021",
    description:
      "Completed the Bachelor of Information Technology program (1st Year), focusing on software development, web technologies, and database systems. Gained practical experience through projects and internships.",
  },
];

const certificationData = [
  {
    name: "The Complete ReactJs Course - Basics to Advanced [2023]",
    issuer: "Udemy",
    year: "2024",
  },
  {
    name: "Make a WordPress Website with Elementor",
    issuer: "Udemy",
    year: "2025",
  },
  {
    name: "Front-End Web Development",
    issuer:
      "Center for Open & Distance Learning (CODL) University of Moratuwa, Sri Lanka",
    year: "2022",
  },
  {
    name: "Web Design for Beginners",
    issuer:
      "Center for Open & Distance Learning (CODL) University of Moratuwa, Sri Lanka",
    year: "2022",
  },
  {
    name: "Learn how to master a great WordPress website design by using Elementor",
    issuer: "Udemy",
    year: "2025",
  },
];

const TimelineItem = ({ children }: { children: React.ReactNode }) => (
  <div className="relative pl-8 pb-8 border-l border-foreground/10 last:border-0 last:pb-0">
    <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-foreground/80"></div>
    {children}
  </div>
);

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Currently pursuing a degree in Information and Communication
            Technology at Uva Wellassa University of Sri Lanka, I combine a
            strong academic foundation with practical skills to deliver
            high-quality web solutions. I’m passionate about clean design,
            performance optimization, and creating intuitive digital experiences
            that align with both user needs and business goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {" "}
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                <Briefcase className="h-6 w-6 text-blue-500" />
              </motion.div>
              <h3 className="text-2xl font-semibold">Experience</h3>
            </div>
            <div className="space-y-8">
              {experienceData.map((item, index) => (
                <TimelineItem key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground/70">
                        {item.company}
                      </span>
                      <span className="text-xs bg-foreground/10 px-2 py-0.5 rounded-full">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {item.description}
                    </p>
                  </motion.div>
                </TimelineItem>
              ))}
            </div>
          </motion.div>

          {/* Education & Certification */}
          <div className="space-y-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {" "}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <GraduationCap className="h-6 w-6 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-semibold">Education</h3>
              </div>
              <div className="space-y-8">
                {educationData.map((item, index) => (
                  <TimelineItem key={index}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-lg font-medium">{item.degree}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-foreground/70">
                          {item.institution}
                        </span>
                        <span className="text-xs bg-foreground/10 px-2 py-0.5 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70">
                        {item.description}
                      </p>
                    </motion.div>
                  </TimelineItem>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {" "}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Award className="h-6 w-6 text-purple-500" />
                </motion.div>
                <h3 className="text-2xl font-semibold">Certifications</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {certificationData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="bg-background rounded-lg p-4 border border-foreground/10"
                  >
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-foreground/70">{item.issuer}</span>
                      <span className="text-xs bg-foreground/10 px-2 py-0.5 rounded-full">
                        {item.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
