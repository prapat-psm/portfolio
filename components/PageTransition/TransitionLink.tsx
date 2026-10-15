"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { shouldTransition } from "@/libs/pixel-transition";
import { usePageTransition } from "./PageTransitionProvider";

type TransitionLinkProps = React.ComponentProps<typeof Link>;

/** `next/link` that plays the pixel transition for in-site page changes. */
const TransitionLink = ({ href, onClick, target, ...restProps }: TransitionLinkProps) => {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || typeof href !== "string") return;
    if (!shouldTransition(href, pathname, e, target)) return;

    e.preventDefault();
    navigate(href);
  };

  return <Link href={href} target={target} onClick={handleClick} {...restProps} />;
};

export { TransitionLink };
