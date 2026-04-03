"use client";

import { Project } from "@/payload-types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageUrl =
    project.featuredImage && typeof project.featuredImage === "object"
      ? project.featuredImage.url
      : null;
  const imageAlt =
    project.featuredImage && typeof project.featuredImage === "object"
      ? project.featuredImage.alt || project.title
      : project.title;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-2 active:translate-y-0"
      >
        <div className="aspect-video bg-primary-dim rounded-md overflow-hidden relative group-hover:border group-hover:border-primary-dim shadow-sm">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
          {/* Overlay gradient on hover */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        </div>

        <div className="flex flex-col gap-2 relative z-20 pr-5 lg:pr-10">
          <h3 className="text-2xl group-hover:text-primary transition-colors font-semibold">
            {project.title}
          </h3>
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((t: { techName: string }, i: number) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-surface-variant rounded-md text-xs font-semibold text-on-surface-variant"
                >
                  {t.techName}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
