"use client";

import Link from "next/link";
import { cn } from "@/libs/cn";
import { TransitionLink } from "@/components/PageTransition/TransitionLink";

type ButtonVariants =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "primary-dim";

type ButtonProps = React.ComponentProps<typeof Link> & {
  variants?: ButtonVariants;
};

const variantClass: Record<ButtonVariants, string> = {
  primary: "btn-pixel",
  secondary: "btn-pixel btn-pixel--secondary",
  tertiary: "btn-pixel btn-pixel--tertiary",
  outline: "btn-pixel btn-pixel--outline",
  "primary-dim": "btn-pixel btn-pixel--primary-dim",
};

const Button = ({ className, variants = "primary", ...restProps }: ButtonProps) => {
  return <TransitionLink className={cn(variantClass[variants], className)} {...restProps} />;
};

export { Button };
