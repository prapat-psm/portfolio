import { getPayload } from "payload";
import config from "@payload-config";
import { SectionHeader } from "../SectionHeader";
import { Button } from "../Button";
import { ProjectList } from "./ProjectList";

const Projects = async ({ ...restProps }: React.ComponentProps<"section">) => {
  const payload = await getPayload({ config });

  const { docs: projects, totalDocs } = await payload.find({
    collection: "projects",
    sort: "-completionDate", // Sort by newest first
    limit: 6, // Show 6 projects maximum on homepage
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

        <ProjectList projects={projects} />

        {totalDocs > 6 && (
          <div className="flex justify-center mt-10">
            <Button href="/projects" variants="primary-dim">
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Projects };
