import config from "@payload-config";
import { getPayload } from "payload";
import { SectionHeader } from "../SectionHeader";
import { WorkExperienceItem } from "./WorkExperienceItem";

const WorkExperience = async ({}: React.ComponentProps<"section">) => {
  const payload = await getPayload({ config });

  const { docs: experiences } = await payload.find({
    collection: "work-experiences",
    sort: "-yearStart", // Show newest first
  });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experiences" className="c-section">
      <div className="c-container space-y-12">
        <SectionHeader
          title="Work Experiences"
          description="A timeline of my professional journey, building scalable systems and crafting digital experiences across various industries."
        />

        <div className="relative border-l-2 border-outline-variant/30 ml-5 pl-10 space-y-12">
          {experiences.map((exp) => (
            <WorkExperienceItem key={exp.id} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { WorkExperience };
