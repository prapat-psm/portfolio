import { Information } from "./Information";
import { Portrait } from "./Portrait";

const Theatre = () => {
  return (
    <section
      id="theatre"
      className="min-h-screen px-8 lg:px-16 flex flex-col justify-center gap-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full lg:size-1/2 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <Information />
        </div>
        <div className="w-1/2">
          <Portrait />
        </div>
      </div>
    </section>
  );
};

export { Theatre };
