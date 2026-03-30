import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const tw = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]) {
  return tw(clsx(inputs));
}
