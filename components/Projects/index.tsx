import { getPayload } from "payload";
import config from "@payload-config";
import { SectionHeader } from "../SectionHeader";
import { ProjectList } from "./ProjectList";

const Projects = async ({ ...restProps }: React.ComponentProps<"section">) => {
  const payload = await getPayload({ config });

  const { docs: projects } = await payload.find({
    collection: "projects",
    sort: "-completionDate",
  });

  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="c-section bg-surface-container text-on-surface"
      {...restProps}
    >
      <div className="c-container space-y-10">
        <SectionHeader
          title="Projects"
          description="A showcase of recent digital experiences and technical solutions crafted to solve complex problems with elegant architecture."
          variants="secondary"
        />

        <ProjectList initialProjects={projects} />
      </div>
    </section>
  );
};

export { Projects };
