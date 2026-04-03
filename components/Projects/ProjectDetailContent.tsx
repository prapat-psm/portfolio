"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { getProjectBySlug } from "@/app/actions/project";
import { Project } from "@/payload-types";
import { ExternalLink } from "@/components/Icons";
import { RichText } from "@/components/RichText";
import { Button } from "../Button";

type ProjectDetailContentProps = {
  slug: string;
};

export default function ProjectDetailContent({
  slug,
}: ProjectDetailContentProps) {
  // Fetch project details within component
  const [project, setProject] = useState<Project | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await getProjectBySlug(slug);

        if (item) {
          setProject(item);
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      }
    };

    fetchData();
  }, [slug]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="headline-md mb-4 font-bold">Project Not Found</h2>
        <p className="body-lg text-on-surface-variant">
          We couldn&apos;t find the project you&apos;re looking for.
        </p>
      </div>
    );
  }

  if (!project) return null; // Suspense handles the skeleton before this

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <div className="relative aspect-video w-full overflow-hidden ">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
            priority
          />
        )}
        {/* <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" /> */}
      </div>

      <div className="px-6 py-10 lg:p-10 flex flex-col gap-10">
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              {project.title}
            </h1>

            {project.links?.websiteUrl && (
              <div className="flex gap-4">
                <Button
                  href={project.links.websiteUrl}
                  target="_blank"
                  variants="secondary"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-5" />
                  <span>Live Preview</span>
                </Button>
              </div>
            )}
          </div>

          {techStack && (
            <div className="flex flex-wrap gap-2">
              {techStack?.map((t) => {
                if (typeof t !== "object") return null;

                return (
                  <span
                    key={t.id}
                    className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest"
                  >
                    {t.name}
                  </span>
                );
              })}
            </div>
          )}
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-15">
          <div className="flex flex-col gap-10">
            <article className="flex flex-col gap-6">
              {project.shortDescription && (
                <p className="text-md text-balance">
                  {project.shortDescription}
                </p>
              )}

              {project.content && <RichText data={project.content} />}

              <div className="text-on-surface-variant font-medium leading-relaxed">
                Detailed project case study and technical breakdown goes here.
                Leveraging high-end editorial layouts and cutting-edge frontend
                performance optimization.
              </div>
            </article>
          </div>

          <aside className="flex flex-col gap-6 h-fit sticky top-0 right-0">
            <div>
              <h4 className="label-md uppercase font-black text-primary tracking-widest mb-4">
                Role / Focus
              </h4>
              <p className="body-lg text-on-surface-variant">
                Lead Fullstack Architect & Performance Optimization.
              </p>
            </div>
            {project.completionDate && (
              <div>
                <h4 className="label-md uppercase font-black text-primary tracking-widest mb-4">
                  Completion Date
                </h4>
                <p className="body-lg text-on-surface-variant">
                  {new Date(project.completionDate).toLocaleDateString(
                    "en-US",
                    { month: "long", year: "numeric" },
                  )}
                </p>
              </div>
            )}
            <div className="h-px bg-outline/10" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant/40 leading-relaxed italic">
              Crafted as part of a high-performance terminal experience for the
              editorial portfolio.
            </p>
          </aside>
        </section>
      </div>
    </motion.div>
  );
}
