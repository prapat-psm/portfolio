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
    <section id="experience" className="c-section">
      <div className="c-container space-y-12">
        <SectionHeader
          title="Work History"
          description="A timeline of my professional journey, building scalable systems and crafting digital experiences across various industries."
        />

        <div className="relative border-l-2 border-outline-variant/30 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
          {(experiences as unknown as { id: string }[]).map((exp, index) => (
            <WorkExperienceItem
              key={exp.id}
              experience={exp as never}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { WorkExperience };
