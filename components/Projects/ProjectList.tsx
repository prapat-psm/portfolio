"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectDialog } from "./ProjectDialog";
import { Plus } from "lucide-react";
import { Project } from "@/payload-types";

interface ProjectListProps {
  initialProjects: Project[];
  isHomePage?: boolean;
}

export const ProjectList = ({
  initialProjects,
  isHomePage = false,
}: ProjectListProps) => {
  // Use a smaller number initially for isHomePage to demonstrate load more
  const initialShowCount = isHomePage ? 6 : 9;
  const [visible, setVisible] = useState(initialShowCount);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const projects = initialProjects;
  const visibleProjects = projects.slice(0, visible);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col">
      <motion.div
        layout
        className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelectedSlug(project.slug)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible < projects.length && (
        <div className="flex justify-center mt-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            className="group flex flex-col items-center gap-4 focus:outline-hidden"
          >
            <div className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
              <Plus className="text-on-surface-variant group-hover:text-primary transition-all group-hover:rotate-90 duration-500" />
            </div>
            <span className="label-md uppercase font-black tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
              Load More Projects
            </span>
          </motion.button>
        </div>
      )}

      {/* Shared Dialog for all projects in this list */}
      <ProjectDialog
        slug={selectedSlug}
        onOpenChange={(open: boolean) => !open && setSelectedSlug(null)}
      />
    </div>
  );
};
