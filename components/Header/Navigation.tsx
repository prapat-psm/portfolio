"use client";

import Link from "next/link";
import { useId } from "react";

const navItems = ["projects", "stacks", "contact"];

const Navigation = () => {
  return (
    <nav className="flex items-center gap-8">
      <ul className="flex items-center gap-x-2">
        {navItems.map((item) => (
          <NavItem key={item} label={item} />
        ))}
      </ul>
    </nav>
  );
};

const NavItem = ({ label }: { label: string }) => {
  const id = useId();

  return (
    <li key={`${id}-${label}`}>
      <Link href={`#${label}`} className="text-md">
        {label.split("")[0].toUpperCase() + label.slice(1)}
      </Link>
    </li>
  );
};

export { Navigation };
