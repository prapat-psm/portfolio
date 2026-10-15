/** Every page of the site, in nav order. Used by the header, mobile menu and sitemap. */
export type NavItem = { href: `/${string}`; label: string };

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Intro" },
  { href: "/stacks", label: "Stacks" },
  { href: "/experiences", label: "Experiences" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];
