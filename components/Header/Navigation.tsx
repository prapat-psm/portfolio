"use client";

import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex items-center gap-8">
      <ul>
        <li>
          <Link href="#work">Work</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#contact">Contact</Link>
        </li>
      </ul>

      <button className="hidden sm:block bg-linear-to-r from-primary to-primary-dim text-black px-6 py-2 rounded-full font-bold transition-transform active:scale-95 hover:neon-glow">
        Hire Me
      </button>
    </nav>
  );
};

export { Navigation };
