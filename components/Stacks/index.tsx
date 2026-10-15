import { getStacks } from "@/libs/data";
import { SectionHeader } from "../SectionHeader";
import { ListStacks } from "./ListStacks";

const Stacks = async ({ ...restProps }: React.ComponentProps<"section">) => {
  const stacks = await getStacks();

  if (stacks.length === 0) return null;

  return (
    <section id="stacks" className="c-section" {...restProps}>
      <div className="c-container space-y-10">
        <SectionHeader
          title="Tech Stacks"
          description="Decade of experience optimizing for the edge, ensuring every millisecond of latency is reclaimed and every animation serves a purpose."
        />

        <ListStacks stacks={stacks} />
      </div>
    </section>
  );
};

export { Stacks };
