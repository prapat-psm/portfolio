import { cn } from "@/libs/cn";

const HireButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={cn(
        "hidden sm:block bg-linear-to-r from-primary to-primary-dim text-black px-6 py-2 rounded-full font-bold transition-transform active:scale-95 hover:neon-glow",
        className,
      )}
    >
      Hire Me
    </button>
  );
};

export { HireButton };
