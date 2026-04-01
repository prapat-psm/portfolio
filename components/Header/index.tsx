import { Brand } from "./Brand";
import { HireButton } from "./HireButton";
import { Navigation } from "./Navigation";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass h-20 px-8 flex items-center">
      <div className="flex-1 relative flex items-center justify-between">
        <div className="shrink-0">
          <Navigation />
        </div>
        <div className="absolute top-[calc(50%-0.5rem)] left-[calc(50%-0.5rem)] -translate-x-1/2 -translate-y-1/2">
          <Brand />
        </div>
        <div className="shrink-0">
          <HireButton />
        </div>
      </div>
    </header>
  );
};

export { Header };
