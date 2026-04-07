"use client";

import { motion } from "motion/react";
import { cn } from "@/libs/cn";
import { WorkExperience } from "@/payload-types";
import { RichText } from "../RichText";

interface WorkExperienceProps {
  experience: WorkExperience;
}

export const WorkExperienceItem = ({ experience }: WorkExperienceProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const period =
    experience.isCurrent || !experience.yearEnd
      ? `${formatDate(experience.yearStart)} — Present`
      : `${formatDate(experience.yearStart)} — ${formatDate(experience.yearEnd)}`;

  return (
    <motion.div className="relative group">
      {/* Dot on timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "absolute -left-[calc(3rem+1px)] top-8 size-4 z-10 bg-surface border-2 transition-colors",
          experience.isCurrent
            ? "border-primary shadow-neon"
            : "border-outline-variant group-hover:border-primary-dim",
        )}>
        {experience.isCurrent && (
          <div className="absolute inset-0 animate-ping bg-primary/40 -z-1" />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "p-6 md:p-8 pixel-card transition-all",
          "relative before:absolute before:inset-0 before:z-[-1] before:transition-all",
          "hover:border-primary/30 hover:-translate-y-1",
          // Pixel-ish shadow on hover
          // "hover:shadow-[0_4px_0px_var(--color-primary-dim),0_8px_0px_rgba(163,166,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)]",
        )}>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-on-background font-press-start-2p group-hover:text-primary transition-colors">
              {experience.role}
            </h3>
            <div className="flex items-baseline gap-2 font-semibold">
              <span className="text-lg font-bold font-press-start-2p">
                {experience.companyName}
              </span>
              {experience.location && (
                <>
                  <span className="text-outline text-xs">•</span>
                  <span className="text-on-surface-variant font-medium text-sm">
                    {experience.location}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="shrink-0">
            <div
              className={cn(
                "px-3 py-1 border font-bold",
                experience.isCurrent
                  ? "border-primary text-primary"
                  : "border-outline-variant text-on-surface-variant",
              )}>
              {period}
            </div>
          </div>
        </div>

        <div className="mb-6 max-w-none">
          {experience.description && <RichText data={experience.description} />}
        </div>

        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={typeof skill === "object" ? skill.id : skill}
                className={cn(
                  "pixel-tag tracking-wide",
                  "bg-surface-variant text-on-surface-variant",
                  "hover:text-primary transition-colors cursor-default",
                )}>
                {typeof skill === "object" ? skill.name : skill}
              </span>
            ))}
          </div>
        )}

        {/* Pixel Art Design Tip: Small decorative elements */}
        <div className="hidden md:block absolute -right-2 top-2 w-1 h-3 bg-primary/20" />
        <div className="hidden md:block absolute right-2 -top-2 w-3 h-1 bg-primary/20" />
      </motion.div>
    </motion.div>
  );
};
