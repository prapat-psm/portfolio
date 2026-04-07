"use client";

import { Project } from "@/payload-types";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onOpen?: () => void;
}

export const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
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
      className="group flex flex-col gap-4 text-left w-full hover:-translate-y-2 transition-transform">
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
        {/* Overlay gradient on hover */}
        {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
        <div className="absolute top-4 right-4 bg-surface-bright/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest text-primary border border-outline/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          Open Case Study
        </div> */}
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
