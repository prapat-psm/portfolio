"use client";

import { cn } from "@/libs/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  onClick,
  ...restProps
}: ButtonProps) => {
  const router = useRouter();
  const variantClass: Record<ButtonVariants, string> = {
    primary: "btn-pixel",
    secondary: "btn-pixel btn-pixel--secondary",
    tertiary: "btn-pixel btn-pixel--tertiary",
    outline: "btn-pixel btn-pixel--outline",
    "primary-dim": "btn-pixel btn-pixel--primary-dim",
  };

  const handleClickToScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (typeof href === "string" && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }
  };

  return (
    <Link
      href={href}
      className={cn(variantClass[variants], className)}
      {...restProps}
      onClick={handleClickToScroll}>
      {children}
    </Link>
  );
};

export { Button };
