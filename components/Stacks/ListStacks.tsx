"use client";

import { motion } from "motion/react";
import { Stack } from "@/payload-types";
import { useHoverSfx } from "@/libs/use-hover-sfx";
import {
  Bracket,
  Database,
  Terminal,
  Blocks,
  Sparkles,
  Zap,
  Tournament,
} from "../Icons";

const ListStacks = ({ stacks }: { stacks: Stack[] }) => {
  const { onMouseEnter } = useHoverSfx();
  const mapIcon = (icon: string) => {
    switch (icon) {
      case "bracket":
        return <Bracket />;
      case "database":
        return <Database />;
      case "terminal":
        return <Terminal />;
      case "blocks":
        return <Blocks />;
      case "sparkles":
        return <Sparkles />;
      case "zap":
        return <Zap />;
      case "tournament":
        return <Tournament />;
      default:
        return null;
    }
  };
  return (
    <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {stacks.map((stack, idx) => {
        return (
          <motion.div
            key={stack.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={onMouseEnter}
            className="col-auto pixel-card p-8 translate-y-0 hover:-translate-y-2 transition-all group flex flex-col h-full space-y-5">
            <div
              className={`size-12 flex items-center justify-center ${stack.color} group-hover:scale-110 transition-transform`}>
              {mapIcon(stack.icon)}
            </div>
            <h3 className="font-headline text-2xl font-bold">{stack.title}</h3>
            {stack.skills && stack.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {stack.skills.map((tag) => {
                  if (typeof tag === "object") {
                    return (
                      <span
                        key={tag.id}
                        className="pixel-tag bg-surface-variant text-on-surface-variant">
                        {tag.name}
                      </span>
                    );
                  }
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export { ListStacks };
