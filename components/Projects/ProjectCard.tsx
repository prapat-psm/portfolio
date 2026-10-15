"use client";

import { useState } from "react";
import { Project } from "@/payload-types";
import { motion } from "motion/react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  onOpen?: () => void;
}

export const ProjectCard = ({
  project,
  onOpen,
}: ProjectCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
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
      <div className="aspect-video bg-surface-variant/20 pixel-card overflow-hidden relative group-hover:shadow-[0px_4px_var(--color-primary-dim),0px_-4px_var(--color-primary-dim),4px_0px_var(--color-primary-dim),-4px_0px_var(--color-primary-dim)] transition-all duration-300">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            onLoad={() => setIsImageLoading(false)}
            className={`object-cover transition-all duration-300 ${
              isImageLoading ? "scale-105 blur-xs opacity-0" : "scale-100 blur-0 opacity-100"
            }`}
          />
        )}
        {imageUrl && isImageLoading && (
          <div className="absolute inset-0 bg-surface-variant/40 flex flex-col items-center justify-center gap-3 z-10">
            {/* Retro 8-bit Block Loader */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-primary animate-[pulse_0.8s_infinite_0s] inline-block" />
              <span className="w-3 h-3 bg-secondary animate-[pulse_0.8s_infinite_0.2s] inline-block" />
              <span className="w-3 h-3 bg-tertiary animate-[pulse_0.8s_infinite_0.4s] inline-block" />
            </div>
            <span className="text-[10px] font-press-start-2p text-on-surface-variant tracking-wider animate-pulse">
              LOADING...
            </span>
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
