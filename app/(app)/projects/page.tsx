import { getPayload } from "payload";
import config from "@payload-config";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectList } from "@/components/Projects/ProjectList";
import { Pagination } from "@/components/Pagination";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const limit = 9;

  // Handling offset as searchParam
  const offset = Number(params.offset) || 0;
  const currentPage = Math.floor(offset / limit) + 1;

  const payload = await getPayload({ config });

  const {
    docs: projects,
    totalPages,
    page: fetchedPage,
    totalDocs,
  } = await payload.find({
    collection: "projects",
    sort: "-completionDate",
    limit: limit,
    page: currentPage,
  });

  return (
    <section className="c-section">
      <div className="c-container flex flex-col gap-10">
        <SectionHeader
          title="All Projects"
          description={`Exploring my journey through ${totalDocs} projects, focusing on high-performance architecture and editorial digital experiences.`}
          variants="secondary"
        />

        {projects && projects.length > 0 ? (
          <div>
            <ProjectList projects={projects} />

            {totalPages && totalPages > 1 && (
              <Pagination
                currentPage={fetchedPage || 1}
                totalPages={totalPages}
                limit={limit}
                baseUrl="/projects"
              />
            )}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-on-surface-variant italic">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
