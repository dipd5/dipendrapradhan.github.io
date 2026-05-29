import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { getReadingTime } from "@lib/readingTime";
import { getVisuals, type Visual } from "@lib/visuals";

export type StoryEntry = CollectionEntry<"stories">;

export type ArchiveEntry =
  | {
      id: string;
      type: "Story";
      title: string;
      date: Date;
      href: string;
      excerpt: string;
      readingTime: string;
      body: string;
    }
  | {
      id: string;
      type: "Visual";
      title: string;
      date: Date;
      href: string;
      excerpt: string;
      image: Visual["image"];
      caption: string;
    };

export async function getStories() {
  const stories = await getCollection("stories", ({ data }) => !data.draft);
  return stories.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getArchiveEntries(): Promise<ArchiveEntry[]> {
  const stories = await getStories();
  const storyEntries: ArchiveEntry[] = stories.map((story) => {
    const body = story.body ?? "";

    return {
      id: `story-${story.id}`,
      type: "Story",
      title: story.data.title,
      date: story.data.pubDate,
      href: `/stories/${story.id}/`,
      excerpt: story.data.description ?? body.slice(0, 180),
      readingTime: getReadingTime(body),
      body
    };
  });

  const visualEntries: ArchiveEntry[] = getVisuals().map((visual) => ({
    id: visual.id,
    type: "Visual",
    title: visual.title,
    date: visual.date,
    href: `/visuals/#${visual.slug}`,
    excerpt: visual.caption || "A visual note from the archive.",
    image: visual.image,
    caption: visual.caption
  }));

  return [...storyEntries, ...visualEntries].sort((a, b) => b.date.getTime() - a.date.getTime());
}
