import config from "@payload-config";
import { getPayload } from "payload";
import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "../SectionHeader";

const Projects = async ({}: React.ComponentProps<"section">) => {
  const payload = await getPayload({ config });

  const { docs: projects } = await payload.find({
    collection: "projects",
    sort: "-completionDate", // Sort by newest first
    limit: 4, // Show 4 projects maximum
  });

  return (
    <section
      id="projects"
      className="c-section bg-surface-container text-on-surface"
    >
      <div className="c-container space-y-10">
        <SectionHeader
          title="Projects"
          description="A showcase of recent digital experiences and technical solutions crafted to solve complex problems with elegant architecture."
          variants="secondary"
        />
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => {
            const imageUrl =
              project.featuredImage && typeof project.featuredImage === "object"
                ? project.featuredImage.url
                : null;
            const imageAlt =
              project.featuredImage && typeof project.featuredImage === "object"
                ? project.featuredImage.alt || project.title
                : project.title;

            return (
              <Link
                href={`/projects/${project.slug}`}
                key={project.id}
                className="group flex flex-col gap-2"
              >
                <div className="aspect-video bg-primary-dim rounded-md overflow-hidden relative">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                </div>

                <div className="flex flex-col gap-2 relative z-20">
                  <h3 className="text-2xl group-hover:text-primary transition-colors font-semibold">
                    {project.title}
                  </h3>

                  {/* {project.techStack && project.techStack.length > 0 && (
                    <div className="flex text-on-surface-variant gap-3 label-sm opacity-80 mt-2 flex-wrap">
                      {project.techStack
                        .slice(0, 3)
                        .map((t: { techName: string }, i: number) => (
                          <span key={i} className="flex items-center gap-2">
                            {t.techName}
                            {i < Math.min(project.techStack!.length, 3) - 1 && (
                              <span className="text-outline">•</span>
                            )}
                          </span>
                        ))}
                      {project.techStack.length > 3 && (
                        <span>+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  )} */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {" "}
                      {project.techStack.map(
                        (t: { techName: string }, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-surface-variant rounded-md text-xs font-semibold text-on-surface-variant"
                          >
                            {t.techName}
                          </span>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Projects };
