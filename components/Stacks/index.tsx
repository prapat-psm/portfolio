"use client";

import { motion } from "motion/react";

import {
  Bracket,
  Database,
  Terminal,
  Blocks,
  Sparkles,
  Zap,
  Tournament,
} from "../Icons";
import { SectionHeader } from "../SectionHeader";

const skills = [
  {
    title: "Core Tech",
    icon: <Bracket />,
    tags: [
      "TypeScript",
      "Next.js (App Router)",
      "React",
      "HTML/CSS",
      "Accessibility (a11y)",
    ],
    color: "text-orange-400",
  },
  {
    title: "State & Data",
    icon: <Database />,
    tags: ["tanstack/react-query", "Zustand", "SSR / ISR / RSC"],
    color: "text-pink-400",
  },
  {
    title: "Full-stack",
    icon: <Terminal />,
    tags: ["Node.js", "Prisma", "PostgreSQL", "Full-stack Engineering"],
    color: "text-green-400",
  },
  {
    title: "Content Layer",
    icon: <Blocks />,
    tags: ["Sanity", "Payload", "Strapi", "Supabase"],
    color: "text-indigo-400",
  },
  {
    title: "UI Engineering",
    icon: <Sparkles />,
    tags: ["Framer Motion", "GSAP", "Advanced UI Patterns"],
    color: "text-yellow-400",
  },
  {
    title: "Architecture",
    icon: <Zap />,
    tags: ["Code Splitting", "Rendering Strategy", "Optimization"],
    color: "text-red-400",
  },
  {
    title: "Platform & Tooling",
    icon: <Tournament />,
    tags: ["Git", "Docker", "CI/CD", "Design Systems"],
    color: "text-cyan-400",
  },
];

const Stacks = ({}: React.ComponentProps<"section">) => {
  return (
    <section id="stacks" className="c-section">
      <div className="c-container space-y-10">
        <SectionHeader
          title="Tech Stacks"
          description="Decade of experience optimizing for the edge, ensuring every millisecond of latency is reclaimed and every animation serves a purpose."
        />

        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="col-auto pixel-card p-8 translate-y-0 hover:ring-1 hover:ring-primary-dim hover:-translate-y-2 transition-all group flex flex-col h-full space-y-5"
            >
              <div
                className={`size-12 flex items-center justify-center ${skill.color} group-hover:scale-110 transition-transform pixel-tag`}
              >
                {skill.icon}
              </div>
              <h3 className="font-headline text-2xl font-bold">
                {skill.title}
              </h3>
              <div className="flex flex-wrap gap-1">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="pixel-tag bg-surface-variant text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stacks };
