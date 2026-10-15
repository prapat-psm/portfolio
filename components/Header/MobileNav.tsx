"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/cn";
import { NAV_ITEMS } from "@/libs/site-nav";
import { TransitionLink } from "@/components/PageTransition/TransitionLink";

/** Menu for screens below xl, where the inline navigation is hidden. */
const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={() => setIsOpen((open) => !open)}
        className="btn-pixel btn-pixel--outline btn-pixel--small">
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full glass border-y-4 border-primary-dim">
          <ul className="c-container flex flex-col py-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-3 font-semibold uppercase tracking-wider hover:text-primary-dim",
                      isActive && "text-primary",
                    )}>
                    {isActive ? "▶ " : ""}
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

export { MobileNav };
