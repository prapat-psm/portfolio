import { cn } from "@/libs/cn";

type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost";

type ButtonProps = React.ComponentProps<"button"> & {
  variants?: ButtonVariants;
};

const Button = ({
  className,
  children,
  variants = "primary",
  type = "button",
  ...restProps
}: ButtonProps) => {
  const variantClass: Record<ButtonVariants, string> = {
    primary: "bg-primary text-on-primary-fixed",
    secondary: "bg-secondary text-on-secondary-fixed",
    tertiary: "bg-tertiary text-on-tertiary-fixed",
    outline: "bg-outline text-on-outline-fixed",
    ghost: "bg-ghost text-on-ghost-fixed",
  };

  return (
    <button
      type={type}
      className={cn(
        "px-8 h-12 flex items-center font-medium justify-center rounded-full transition-all text-md hover:shadow-neon",
        variantClass[variants],
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export { Button };
