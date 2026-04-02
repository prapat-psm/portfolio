import { Button } from "../Button";
import { Brand } from "./Brand";
import { Navigation } from "./Navigation";

const Header = () => {
  return (
    <header className="sticky top-0 inset-x-0 z-50 glass h-22 px-8 flex items-center">
      <div className="flex-1 relative flex items-center justify-between">
        <div className="shrink-0">
          <Navigation />
        </div>
        <div className="absolute top-[calc(50%-0.5rem)] left-[calc(50%-0.5rem)] -translate-x-1/2 -translate-y-1/2">
          <Brand />
        </div>
        <div className="shrink-0">
          <Button
            href="#contact"
            variants="secondary"
            className="btn-pixel--small"
          >
            Hire Me
          </Button>
        </div>
      </div>
    </header>
  );
};

export { Header };
