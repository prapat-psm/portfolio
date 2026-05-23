"use client";

import { Project } from "@/payload-types";
import { motion } from "motion/react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onOpen?: () => void;
  isLoading?: boolean;
}

export const ProjectCard = ({ project, onOpen, isLoading }: ProjectCardProps) => {
  const imageUrl =
    project.featuredImage && typeof project.featuredImage === "object"
      ? project.featuredImage.url
      : null;
  const imageAlt =
    project.featuredImage && typeof project.featuredImage === "object"
      ? project.featuredImage.alt || project.title
      : project.title;

  const techStack = project.techStack
    ? project.techStack.map((t) => (typeof t === "object" ? { ...t } : t))
    : [];

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      onClick={() => onOpen?.()}
      className="group flex flex-col gap-4 text-left w-full hover:-translate-y-2 transition-transform relative">
      <div className="aspect-video bg-surface-variant/20 border border-transparent rounded-md overflow-hidden relative group-hover:border-primary-dim group-hover:ring-1 group-hover:ring-primary-dim">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover "
          />
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-20 backdrop-blur-[2px]">
             <div className="animate-spin size-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 relative z-20 pr-5">
        <h3 className="text-2xl group-hover:text-primary transition-colors font-semibold overflow-hidden">
          {project.title}
        </h3>

        <p className="text-md text-on-surface-variant line-clamp-3">
          {project.shortDescription}
        </p>

        {techStack && (
          <div className="flex flex-wrap gap-2">
            {techStack?.map((t) => {
              if (typeof t !== "object") return null;

              return (
                <span key={t.id} className="pixel-tag px-3 pt-1 pb-1.5">
                  {t.name}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </motion.button>
  );
};
