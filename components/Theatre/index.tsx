import { Information } from "./Information";
import { Portrait } from "./Portrait";

const Theatre = () => {
  return (
    <section
      id="intro"
      className="c-section flex flex-col justify-center gap-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full lg:size-1/2 bg-primary/20 blur-[120px] pointer-events-none" />

      <div className="c-container">
        <div className="grid place-items-center grid-cols-6 lg:grid-cols-12 gap-y-10 gap-x-4">
          <div className="col-start-2 col-span-4 lg:col-start-auto lg:col-span-5 lg:order-last">
            <Portrait />
          </div>
          <div className="col-span-6 lg:col-span-7">
            <Information />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Theatre };
