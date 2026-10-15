import type { Metadata } from "next";
import { WorkExperience } from "@/components/WorkExperience";

export const metadata: Metadata = {
  title: "Work Experiences",
  description: "Prapat's professional journey as a frontend developer and team lead.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return <WorkExperience />;
}
