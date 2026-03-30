import { Button } from "../Button";

const Theatre = () => {
  return (
    <section
      id="theatre"
      className="min-h-screen px-8 lg:px-16 flex flex-col justify-center gap-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full lg:size-1/2 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div></div>

      <div className="relative z-10 flex flex-col gap-6">
        <span className="label-md text-primary tracking-widest">
          SENIOR FRONTEND DEVELOPER
        </span>
        <h1 className="text-5xl font-bold max-w-4xl text-on-background">
          I&apos;m{" "}
          <span className="text-gradient">
            Prapat
            <br />
            Prapatsornmanu
          </span>
        </h1>
        <p className="body-lg max-w-xl text-on-surface-variant leading-relaxed">
          Senior Frontend Expert specializing in high-performance digital
          experiences. Engineering precision-grade interfaces with Next.js,
          Framer Motion, and scalable architecture. Over a decade of frontend
          leadership.
        </p>
        <div className="flex gap-6 mt-4">
          <Button>View Projects</Button>
          <Button variants="outline">Tech Stacks</Button>
        </div>
      </div>
    </section>
  );
};

export { Theatre };
