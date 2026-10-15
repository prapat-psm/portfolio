import { Stacks } from "@/components/Stacks";
import { WorkExperience } from "@/components/WorkExperience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Theatre } from "@/components/Theatre";

export default function Home() {
  return (
    <>
      <Theatre />
      <Stacks />
      <WorkExperience />
      <Projects />
      <Contact />
    </>
  );
}
