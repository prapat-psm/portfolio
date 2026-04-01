import config from "@payload-config";
import { getPayload } from "payload";
import Link from "next/link";
import Image from "next/image";

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
      className="py-24 px-8 min-h-screen bg-surface-container text-on-surface"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <header className="flex flex-col gap-4 items-center">
          <h2 className="headline-lg tracking-tighter text-4xl sm:text-5xl md:text-6xl text-center">
            Selected Works
          </h2>
          <p className="body-lg text-on-surface-variant max-w-2xl text-center">
            A showcase of recent digital experiences and technical solutions
            crafted to solve complex problems with elegant architecture.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
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
                className="group flex flex-col gap-6"
              >
                <div className="aspect-video bg-surface-variant rounded-2xl overflow-hidden relative border border-outline-variant/50">
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

                <div className="flex flex-col gap-2 relative z-20 px-2">
                  <div className="flex justify-between items-center text-on-surface-variant label-md">
                    <span>
                      {project.completionDate
                        ? new Date(project.completionDate).getFullYear()
                        : "Recent"}
                    </span>
                    {project.isFeatured && (
                      <span className="text-primary tracking-widest uppercase">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="headline-md tracking-tight group-hover:text-primary transition-colors text-2xl font-light">
                    {project.title}
                  </h3>

                  {project.techStack && project.techStack.length > 0 && (
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
