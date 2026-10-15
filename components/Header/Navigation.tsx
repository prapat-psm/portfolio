"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/cn";
import { NAV_ITEMS } from "@/libs/site-nav";
import { TransitionLink } from "@/components/PageTransition/TransitionLink";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex items-center gap-8">
      <ul className="flex items-center gap-x-2">
        {NAV_ITEMS.map((item, i) => {
          const isActive = pathname === item.href;
          return (
            <Fragment key={item.href}>
              <li>
                <TransitionLink
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "font-semibold text-sm hover:text-primary-dim",
                    isActive && "text-primary",
                  )}>
                  {item.label}
                </TransitionLink>
              </li>
              {i < NAV_ITEMS.length - 1 && (
                <li className="text-primary-dim select-none" aria-hidden="true">
                  •
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export { Navigation };
