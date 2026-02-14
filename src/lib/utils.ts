import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

// shadcn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// encode base62
const CHARSET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(id: number): string {
  if (id === 0) return CHARSET[0];

  let res = "";
  let num = id;

  while (num > 0) {
    res = CHARSET[num % 62] + res;
    num = Math.floor(num / 62);
  }

  return res;
}

// decode

export function decodeBase62(str: string): number {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num = num * 62 + CHARSET.indexOf(str[i]);
  }
  return num;
}

// copy

export async function handleCopyUrl(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("The URL has been successfully copied");
  } catch (error) {
    toast.error("Failed to copy the URL");
    console.error(error);
  }
}

// get url base

export function getUrlBase() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
}
