import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Prapat about frontend work and collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
