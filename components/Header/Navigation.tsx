"use client";

import Link from "next/link";
import { Fragment } from "react";

const navItems = [
  { id: "intro", label: "Intro" },
  { id: "stacks", label: "Tech Stacks" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  return (
    <nav className="max-lg:hidden flex items-center gap-8">
      <ul className="flex items-center gap-x-2">
        {navItems.map((item, i) => {
          return (
            <Fragment key={item.id}>
              <NavItem id={item.id} label={item.label} />
              {i < navItems.length - 1 && (
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

const NavItem = ({ id, label }: { id: string; label: string }) => {
  return (
    <li key={`${id}`}>
      <Link
        href={`/#${id}`}
        className="font-semibold text-md hover:text-primary-dim"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          const target = document.getElementById(id);
          target?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {label}
      </Link>
    </li>
  );
};

export { Navigation };
