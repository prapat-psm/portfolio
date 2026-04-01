import { Information } from "./Information";
import { Portrait } from "./Portrait";

const Theatre = () => {
  return (
    <section
      id="theatre"
      className="min-h-screen flex flex-col justify-center gap-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full lg:size-1/2 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="c-container">
        <div className="flex flex-col-reverse gap-4 lg:flex-row items-center justify-between">
          <div className="w-full lg:w-3/5">
            <Information />
          </div>
          <div className="w-full lg:w-2/5">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Theatre };
