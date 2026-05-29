import { existsSync, statSync } from "node:fs";
import { basename } from "node:path";
import type { ImageMetadata } from "astro";

type ImageModule = {
  default: ImageMetadata;
};

export type Visual = {
  id: string;
  title: string;
  caption: string;
  date: Date;
  slug: string;
  image: ImageMetadata;
  sourcePath: string;
};

const imageModules = import.meta.glob<ImageModule>("../../images/**/*.{jpg,jpeg,png,webp,avif,gif}", {
  eager: true
});

function titleFromFilename(path: string) {
  const name = basename(path).replace(/\.[^.]+$/, "");
  return name
    .replace(/^\d{4}[-_.]\d{2}[-_.]\d{2}[-_\s.]*/, "")
    .replace(/[-_.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter: string) => letter.toUpperCase()) || "Untitled Visual";
}

function dateFromPath(path: string) {
  const datedName = path.match(/(\d{4})[-_.](\d{2})[-_.](\d{2})/);
  if (datedName) {
    return new Date(`${datedName[1]}-${datedName[2]}-${datedName[3]}T00:00:00`);
  }

  const filesystemPath = new URL(path, import.meta.url);
  if (existsSync(filesystemPath)) {
    return statSync(filesystemPath).mtime;
  }

  return new Date("2026-05-29T00:00:00");
}

export function getVisuals(): Visual[] {
  return Object.entries(imageModules)
    .map(([path, mod]) => {
      const slug = basename(path).replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const title = titleFromFilename(path);

      return {
        id: `visual-${slug}`,
        title,
        caption: title === "Untitled Visual" ? "" : title,
        date: dateFromPath(path),
        slug,
        image: mod.default,
        sourcePath: path
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getFeaturedVisual() {
  return getVisuals()[0];
}
