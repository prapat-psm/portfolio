import { Brand } from "./Brand";
import { Navigation } from "./Navigation";

const Header = () => {
  return (
    <header className="sticky top-0 inset-x-0 z-50 glass h-22">
      <div className="c-container flex items-center h-full relative">
        <div className="absolute top-[calc(50%-0.25rem)] left-[calc(50%-0.25rem)] -translate-x-1/2 -translate-y-1/2">
          <Brand />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="shrink-0"></div>
          <div className="shrink-0">
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
