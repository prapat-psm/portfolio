"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/payload-types";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
};
