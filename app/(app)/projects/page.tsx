import type { Metadata } from "next";
import { Projects } from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Recent digital experiences and technical solutions built by Prapat.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
