import { cn } from "@/libs/cn";

export const Logo = ({
  className,
  ...restProps
}: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-full h-full", className)}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <g fill="currentColor">
      <rect x="20" y="20" width="10" height="60" />
      <rect x="30" y="20" width="30" height="10" />
      <rect x="30" y="45" width="30" height="10" />
      <rect x="50" y="30" width="10" height="15" />
    </g>

    <g transform="translate(25, 25)" fill="currentColor" className="opacity-40">
      <rect x="20" y="20" width="10" height="60" />
      <rect x="30" y="20" width="30" height="10" />
      <rect x="30" y="45" width="30" height="10" />
      <rect x="50" y="30" width="10" height="15" />
    </g>
  </svg>
);
