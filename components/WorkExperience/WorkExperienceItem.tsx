"use client";

import { motion } from "motion/react";
import { cn } from "@/libs/cn";

interface Skill {
  id: string;
  name: string;
}

interface LexicalNode {
  type: string;
  tag?: string;
  text?: string;
  format?: number;
  children?: LexicalNode[];
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
  };
}

interface WorkExperienceData {
  id: string;
  companyName: string;
  role: string;
  location?: string;
  yearStart: string;
  yearEnd?: string;
  isCurrent?: boolean;
  description: LexicalContent;
  skills?: (string | Skill)[];
}

interface WorkExperienceProps {
  experience: WorkExperienceData;
  index: number;
}

const RichTextRenderer = ({ content }: { content: LexicalContent }) => {
  if (!content || !content.root || !content.root.children) return null;

  return (
    <div className="space-y-2 text-on-surface-variant body-md">
      {content.root.children.map((node, index) => {
        if (node.type === "paragraph") {
          return (
            <p key={index} className="leading-relaxed">
              {node.children?.map((child, childIdx) => (
                <span
                  key={childIdx}
                  className={cn(
                    child.format && child.format & 1 ? "font-bold" : "",
                    child.format && child.format & 2 ? "italic" : ""
                  )}
                >
                  {child.text}
                </span>
              ))}
            </p>
          );
        } else if (node.type === "list") {
          const Tag = node.tag === "ol" ? "ol" : "ul";
          return (
            <Tag key={index} className="pl-5 space-y-1 list-disc list-outside">
              {node.children?.map((listItem, i) => (
                <li key={i}>
                  {listItem.children?.map((child, ci) => (
                    <span key={ci}>{child.text}</span>
                  ))}
                </li>
              ))}
            </Tag>
          );
        }
        return null;
      })}
    </div>
  );
};

export const WorkExperienceItem = ({ experience, index }: WorkExperienceProps) => {
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className="relative group lg:max-w-3xl"
    >
      {/* Dot on timeline */}
      <div className={cn(
        "absolute -left-[calc(2rem+1px)] md:-left-[calc(3rem+1px)] top-8 w-4 h-4 bg-surface border-2 transition-colors",
        experience.isCurrent ? "border-primary shadow-neon" : "border-outline-variant group-hover:border-primary-dim"
      )}>
        {experience.isCurrent && (
          <div className="absolute inset-0 animate-ping bg-primary/40 -z-1" />
        )}
      </div>

      <div className={cn(
        "p-6 md:p-8 pixel-card transition-all",
        "relative before:absolute before:inset-0 before:z-[-1] before:transition-all",
        "hover:border-primary/30 hover:-translate-y-1",
        // Pixel-ish shadow on hover
        "hover:shadow-[0_4px_0px_var(--color-primary-dim),0_8px_0px_rgba(163,166,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.1)]"
      )}>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-on-background group-hover:text-primary transition-colors">
              {experience.role}
            </h3>
            <div className="flex items-baseline gap-2 font-semibold text-primary">
              <span className="text-lg font-bold">@ {experience.companyName}</span>
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
          <div className={cn(
            "label-sm md:label-md px-3 py-1 border font-bold",
            experience.isCurrent ? "border-primary text-primary" : "border-outline-variant text-on-surface-variant"
          )}>
            {period}
          </div>
        </div>

        <div className="mb-6 prose prose-invert prose-sm md:prose-base max-w-none">
          <RichTextRenderer content={experience.description} />
        </div>

        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={typeof skill === 'object' ? skill.id : skill}
                className={cn(
                    "pixel-tag tracking-wide",
                    "bg-surface-variant text-on-surface-variant",
                    "hover:text-primary transition-colors cursor-default"
                )}
              >
                {typeof skill === 'object' ? skill.name : skill}
              </span>
            ))}
          </div>
        )}
        
        {/* Pixel Art Design Tip: Small decorative elements */}
        <div className="hidden md:block absolute -right-2 top-2 w-1 h-3 bg-primary/20" />
        <div className="hidden md:block absolute right-2 -top-2 w-3 h-1 bg-primary/20" />
      </div>
    </motion.div>
  );
};
