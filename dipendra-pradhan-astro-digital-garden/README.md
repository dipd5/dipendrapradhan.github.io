# Dipendra Pradhan — Digital Garden

A personal digital garden for visuals, stories, observations, memories, and creative work. It is built with Astro, TypeScript, Markdown content collections, local image optimization, full-text archive search, and GitHub Pages deployment.

## Getting Started

```sh
npm install
npm run dev
```

Build the production site:

```sh
npm run build
```

## Add New Visuals

Place image files in the root `images/` directory:

```text
images/
  2026-05-29-evening-window.jpg
  tea-stall.webp
```

Supported formats are `jpg`, `jpeg`, `png`, `webp`, `avif`, and `gif`.

Visuals automatically appear in:

- `/visuals/`
- `/archive/`
- `/search-index.json`

Dates are read from filenames that begin with `YYYY-MM-DD`. If no date is found, the file modification date is used. Captions are generated from filenames, so descriptive filenames work best.

## Add New Stories

Create a Markdown file in `src/content/stories/`:

```md
---
title: "A Walk After Rain"
description: "A short note about weather, streets, and memory."
pubDate: 2026-05-29
featured: false
---

Write the story here.
```

Stories automatically appear in:

- `/stories/`
- `/archive/`
- `/search-index.json`

Long stories with multiple headings show a table of contents on the story page.

## Hawrey Katha Migration

The Stories section is ready for future migration from `https://hawreykatha.blogspot.com`. Each migrated post should become one Markdown file with its original title, publication date, and body.

## Deployment

The site is configured for GitHub Pages and the custom domain:

```text
dipendrapradhan.dpdns.org
```

The deployment workflow lives at `.github/workflows/deploy.yml`. In the repository settings, enable GitHub Pages with GitHub Actions as the source.
