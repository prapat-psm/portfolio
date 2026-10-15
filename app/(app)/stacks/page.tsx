import type { Metadata } from "next";
import { Stacks } from "@/components/Stacks";

export const metadata: Metadata = {
  title: "Tech Stacks",
  description: "Languages, frameworks and tools Prapat uses to build fast frontends.",
  alternates: { canonical: "/stacks" },
};

export default function StacksPage() {
  return <Stacks />;
}
