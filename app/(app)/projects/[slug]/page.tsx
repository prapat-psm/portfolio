import config from "@payload-config";
import { getPayload } from "payload";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js 15+ requires params to be awaited from props
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  
  const payload = await getPayload({ config });
  
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  const project = docs[0];

  if (!project) {
    notFound();
  }

  const imageUrl =
    project.featuredImage && typeof project.featuredImage === "object"
      ? project.featuredImage.url
      : null;
  const imageAlt =
    project.featuredImage && typeof project.featuredImage === "object"
      ? project.featuredImage.alt || project.title
      : project.title;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-surface text-on-surface">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <Link 
          href="/#projects" 
          className="group inline-flex items-center gap-2 text-primary hover:text-primary-stretch transition-colors w-fit"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          <span className="label-md">Back to Projects</span>
        </Link>
        
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 label-md text-on-surface-variant font-bold">
            {project.completionDate && (
              <span className="pixel-tag bg-surface-variant">
                {new Date(project.completionDate).getFullYear()}
              </span>
            )}
            {project.isFeatured && (
              <span className="pixel-tag bg-primary/10 text-primary flex gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Featured
              </span>
            )}
          </div>
          <h1 className="headline-lg tracking-tighter sm:text-5xl md:text-6xl text-on-background font-bold">
            {project.title}
          </h1>
          <p className="body-lg text-on-surface-variant max-w-2xl mt-4 text-xl font-medium">
            {project.shortDescription}
          </p>
        </header>

        {(project.links?.websiteUrl || project.links?.githubUrl) && (
          <div className="flex gap-4 items-center">
            {project.links.websiteUrl && (
              <a 
                href={project.links.websiteUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-pixel label-md inline-block"
              >
                Visit Site
              </a>
            )}
            {project.links.githubUrl && (
              <a 
                href={project.links.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-pixel btn-pixel--outline label-md inline-flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub
              </a>
            )}
          </div>
        )}

        {imageUrl && (
          <div className="relative aspect-video w-full pixel-card overflow-hidden bg-surface-variant shadow-[0_8px_0_var(--color-outline-variant)]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-col gap-4 mt-6">
            <h3 className="label-lg text-on-surface font-bold">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: { techName: string }, idx: number) => (
                <span
                  key={idx}
                  className="pixel-tag text-on-surface-variant bg-surface"
                >
                  {tech.techName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content Region */}
        {project.content && typeof project.content === "object" && (
           <div className="mt-8 pt-8 border-t border-outline-variant">
             <div className="prose prose-invert prose-lg max-w-none prose-headings:font-normal prose-a:text-primary">
                {/* Normally we will use Payload's RichText component. We'll render a placeholder hint for now */}
                <p className="text-on-surface-variant italic">
                  Note: The rich text content goes here. You need to use `@payloadcms/richtext-lexical/react` RichText element to render this.
                </p>
                {/* You can drop the lexical renderer here */}
                {/* <RichText content={project.content} /> */}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
