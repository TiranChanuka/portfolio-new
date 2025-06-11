"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StarryBackground } from "./StarryBackground";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

// This would come from the admin panel
const contactInfo = {
  email: "tiranchanukaw@gmail.com",
  phone: "+94 717494134",
  location: "Rathnapura, Sri Lanka",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tiranchanuka/",
      icon: Linkedin,
    },
    { name: "GitHub", url: "https://github.com/TiranChanuka", icon: Github },
    { name: "Twitter", url: "https://x.com/TiranChanuka", icon: Twitter },
  ],
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would send this data to your backend
    console.log(data);

    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  return (
    <section id="contact" className="relative py-20 px-6 overflow-hidden">
      {/* Starry Background */}
      <StarryBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or want to chat about a potential
            collaboration? Feel free to reach out through the contact form or
            using the information below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl p-6 shadow-sm border border-foreground/10"
          >
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.name ? "border-red-500" : "border-foreground/20"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.email ? "border-red-500" : "border-foreground/20"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  {...register("subject")}
                  id="subject"
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.subject ? "border-red-500" : "border-foreground/20"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-2 rounded-lg bg-transparent border ${
                    errors.message ? "border-red-500" : "border-foreground/20"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-lg py-3 font-medium transition-colors hover:bg-foreground/90 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>

                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-center mt-3 text-sm"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-foreground/10">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <span className="text-foreground/70">
                      {contactInfo.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-background rounded-xl p-6 shadow-sm border border-foreground/10">
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>

              <div className="grid grid-cols-1 gap-4">
                {contactInfo.socialLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5">
                        <Icon className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="font-medium">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2">Open for Projects</h3>
              <p className="text-blue-100">
                I'm currently available for freelance projects and full-time
                opportunities. Let's create something amazing together!
              </p>
            </div>
          </motion.div>{" "}
        </div>
      </div>
    </section>
  );
}
