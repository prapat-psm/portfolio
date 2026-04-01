"use client";
import {
  Code2,
  Database,
  Layers,
  Sparkles,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const skills = [
  {
    title: "Core Tech",
    icon: <Code2 />,
    tags: [
      "TypeScript",
      "Next.js (App Router)",
      "React",
      "HTML/CSS",
      "Accessibility (a11y)",
    ],
    color: "text-primary",
  },
  {
    title: "State & Data",
    icon: <Database />,
    tags: ["@tanstack/react-query", "Zustand", "SSR / ISR / RSC"],
    color: "text-secondary",
  },
  {
    title: "Full-stack",
    icon: <Terminal />,
    tags: ["Node.js", "Prisma", "PostgreSQL", "Full-stack Engineering"],
    color: "text-tertiary",
  },
  {
    title: "Content Layer",
    icon: <Layers />,
    tags: ["Sanity", "Payload", "Strapi", "Supabase"],
    color: "text-primary",
  },
  {
    title: "UI Engineering",
    icon: <Sparkles />,
    tags: ["Framer Motion", "GSAP", "Advanced UI Patterns"],
    color: "text-secondary",
  },
  {
    title: "Architecture",
    icon: <Zap />,
    tags: ["Code Splitting", "Rendering Strategy", "Optimization"],
    color: "text-tertiary",
  },
];

const Stacks = ({}: React.ComponentProps<"section">) => {
  return (
    <section id="stacks" className="c-section">
      <div className="mx-auto px-8">
        <div className="space-y-5">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Stacks
          </h2>
          <p className="text-on-surface-variant text-lg">
            Decade of experience optimizing for the edge, ensuring every
            millisecond of latency is reclaimed and every animation serves a
            purpose.
          </p>
          {/* <div className="hidden md:block h-px flex-1 bg-outline-variant/20 mx-12 mb-6"></div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group flex flex-col h-full"
            >
              <div
                className={`size-12 bg-surface-variant rounded-lg flex items-center justify-center ${skill.color} mb-6 group-hover:scale-110 transition-transform`}
              >
                {skill.icon}
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">
                {skill.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-variant/50 rounded-full text-xs font-medium text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-surface-container p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group flex items-center gap-8"
          >
            <div className="w-12 h-12 bg-surface-variant rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
              <Wrench />
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold mb-2">
                Platform & Tooling
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "CI/CD", "Design Systems"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-variant/50 rounded-full text-xs font-medium text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Stacks };
