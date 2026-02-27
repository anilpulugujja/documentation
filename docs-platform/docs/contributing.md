---
title: Contributing Guide
description: Workflow, templates, and authoring standards for GetRightData docs.
slug: /contributing
sidebar_label: Contributor Guide
hide_table_of_contents: false
---

## Git-Based Workflow
1. Create a branch or use the GitHub web editor (the **Edit this page** link is enabled).
2. Make edits in Markdown/MDX, keeping frontmatter accurate (`title`, `description`, `tags`, `slug`).
3. Update the appropriate sidebar in `sidebars.js` when adding a new page.
4. Commit using conventional messages (`docs: add new monitoring guide`).
5. Open a pull request; CI must pass `npm run build` before merging.

## Content Patterns
- **Frontmatter** should include:
  ```yaml
  ---
  title: Clear Title
  description: Short SEO-friendly summary
  sidebar_label: Short label for nav
  slug: /<product>/<version>/<path>
  tags:
    - product
    - topic
  ---
  ```
- **Admonitions**: Use `:::info`, `:::tip`, `:::warning`, or `:::caution` for callouts.
- **Code blocks**: Use triple backticks and language hints (` ```bash `, ` ```json `).
- **Images**: Place under `static/img`. Reference as `/img/<file>` and, when possible, wrap using the `<RoundedImage>` MDX component for consistent styling. See [Product screenshots (with annotations)](#product-screenshots-with-annotations) below for details.

## Product screenshots (with annotations)

Keep docs in **Markdown or MDX**; do not switch to HTML for screenshots. Put screenshot image files (PNG, JPG, WEBP) in a known location and reference them from the doc.

### Where to put screenshot files

- **Recommended:** `static/img/screenshots/` (or per-product subfolders like `static/img/datatrust/`, `static/img/rightsight/`) so assets stay organized and reusable.
- **Alternative:** Co-locate an `assets/` folder next to the `.md`/`.mdx` file and use relative paths (e.g. `./assets/feature-overview.png`).

Reference from static: use absolute paths from site root (e.g. `/img/screenshots/admin-panel-overview.png`).

### How to reference in the doc

**Plain Markdown:**

```md
![Short description of the screenshot](/img/screenshots/feature-overview.png)
```

**With caption (MDX):** Use the `<RoundedImage>` component for consistent styling and an optional caption (e.g. for a short textual “annotation”):

```mdx
<RoundedImage
  src="/img/screenshots/feature-overview.png"
  alt="DataTrust admin panel with key sections highlighted"
  caption="Key areas: sidebar navigation, dataset list, and filters."
/>
```

Use **alt** for accessibility and **caption** for extra explanation under the image.

### Annotations

- **Visual annotations** (arrows, boxes, labels on the UI): create them in the image (Figma, Sketch, screenshot tool, etc.) and export a single PNG/JPG. Reference that file as above.
- **Text-only “annotations”**: use the image **caption** (e.g. `caption` in `RoundedImage`) or a short paragraph below the image in Markdown.

## Templates
- Feature doc template: [`docs/templates/feature-template.md`](./templates/feature-template.md)
- API doc template: [`docs/templates/api-template.md`](./templates/api-template.md)
- Release notes template: [`docs/templates/release-notes-template.md`](./templates/release-notes-template.md)

## Sidebar Hygiene
- Sidebars enforce the IA for each product. When adding a doc:
  1. Place it inside the correct product folder under `docs/`.
  2. Add the doc ID (folder/file name) to the matching sidebar array in `sidebars.js`.
  3. Run `npm run start` locally to confirm ordering and labels.

## Versioning
- The default version is **7.6**. Set slugs to `/product/7.6/...` for new docs.
- Copy updates to archived versions (`versioned_docs/version-7.0`) if they still apply.
- When cutting a new release, run `npm run docusaurus docs:version <version>` and update slugs to the new version number.

## Style Guardrails
- Keep paragraphs short (2–3 sentences) with active voice.
- Prefer numbered steps for procedures.
- Use present tense for UI labels (`Select **New Monitor**`).
- All screenshots must mask PII and be saved as optimized PNG or WEBP files.

## Review Checklist
- [ ] All links resolve locally (`npm run build` catches broken links).
- [ ] Sidebar entries render as expected.
- [ ] SEO metadata (`description`, `tags`) exists.
- [ ] Images include descriptive alt text.
- [ ] Release notes include date, highlights, fixes.
