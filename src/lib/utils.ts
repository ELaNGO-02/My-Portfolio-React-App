import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names conditionally and safely
 * (combines clsx + tailwind-merge)
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
