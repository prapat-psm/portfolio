"use client";

import { cn } from "@/libs/cn";
import Link from "next/link";

type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "primary-dim";

type ButtonProps = React.ComponentProps<typeof Link> & {
  variants?: ButtonVariants;
};

const Button = ({
  className,
  children,
  href,
  variants = "primary",
  ...restProps
}: ButtonProps) => {
  const variantClass: Record<ButtonVariants, string> = {
    primary: "btn-pixel",
    secondary: "btn-pixel btn-pixel--secondary",
    tertiary: "btn-pixel btn-pixel--tertiary",
    outline: "btn-pixel btn-pixel--outline",
    "primary-dim": "btn-pixel btn-pixel--primary-dim",
  };

  const handleClickToScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href as string);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      className={cn(variantClass[variants], className)}
      onClick={handleClickToScroll}
      {...restProps}
    >
      {children}
    </Link>
  );
};

export { Button };
