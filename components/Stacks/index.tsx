import { getStacks } from "@/app/actions/stacks";
import { SectionHeader } from "../SectionHeader";
import { ListStacks } from "./ListStacks";

// const skills = [
//   {
//     title: "Core Tech",
//     icon: <Bracket />,
//     tags: [
//       "TypeScript",
//       "Next.js (App Router)",
//       "React",
//       "HTML/CSS",
//       "Accessibility (a11y)",
//     ],
//     color: "text-orange-400",
//   },
//   {
//     title: "State & Data",
//     icon: <Database />,
//     tags: ["tanstack/react-query", "Zustand", "SSR / ISR / RSC"],
//     color: "text-pink-400",
//   },
//   {
//     title: "Full-stack",
//     icon: <Terminal />,
//     tags: ["Node.js", "Prisma", "PostgreSQL", "Full-stack Engineering"],
//     color: "text-green-400",
//   },
//   {
//     title: "Content Layer",
//     icon: <Blocks />,
//     tags: ["Sanity", "Payload", "Strapi", "Supabase"],
//     color: "text-indigo-400",
//   },
//   {
//     title: "UI Engineering",
//     icon: <Sparkles />,
//     tags: ["Framer Motion", "GSAP", "Advanced UI Patterns"],
//     color: "text-yellow-400",
//   },
//   {
//     title: "Architecture",
//     icon: <Zap />,
//     tags: ["Code Splitting", "Rendering Strategy", "Optimization"],
//     color: "text-red-400",
//   },
//   {
//     title: "Platform & Tooling",
//     icon: <Tournament />,
//     tags: ["Git", "Docker", "CI/CD", "Design Systems"],
//     color: "text-cyan-400",
//   },
// ];

const Stacks = async ({ ...restProps }: React.ComponentProps<"section">) => {
  const stacks = await getStacks();

  if (!stacks || stacks.length === 0) return null;

  return (
    <section id="stacks" className="c-section" {...restProps}>
      <div className="c-container space-y-10">
        <SectionHeader
          title="Tech Stacks"
          description="Decade of experience optimizing for the edge, ensuring every millisecond of latency is reclaimed and every animation serves a purpose."
        />

        <ListStacks stacks={stacks} />
      </div>
    </section>
  );
};

export { Stacks };
