import { cn } from "@/libs/cn";

type SectionHeaderProps = React.ComponentProps<"div"> & {
  title: string;
  description: string;
  variants?: "primary" | "secondary";
};

const SectionHeader = ({
  title,
  description,
  className,
  variants = "primary",
  ...restProps
}: SectionHeaderProps) => {
  const headingClass: Record<"primary" | "secondary", string> = {
    primary: "text-gradient",
    secondary: "text-gradient-secondary",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-6 place-content-center place-items-center text-center",
        className,
      )}
      {...restProps}>
      <div className="col-auto lg:col-span-4 lg:col-start-2 space-y-5">
        <h2
          className={cn(
            "font-press-start-2p text-xl md:text-2xl font-bold tracking-tight uppercase",
            headingClass[variants],
          )}>
          {title}
        </h2>
        <p className="whitespace-pre-line text-balance text-on-surface-variant text-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export { SectionHeader };
