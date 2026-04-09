import { DebounceTest } from "@/components/DebounceTest";
import PixelTest from "@/components/Test/PixelTest";

const TestPage = () => {
  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-press-start-2p text-gradient mb-4">
          SORTING LAB
        </h1>
        <p className="text-on-surface-variant font-silkscreen">
          Refactored version with 8-bit aesthetics & Framer Motion
        </p>
      </div>
      {/* <PixelTest /> */}
      <DebounceTest />
    </div>
  );
};

export default TestPage;
