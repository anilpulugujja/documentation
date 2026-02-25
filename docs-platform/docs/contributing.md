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
- **Images**: Place under `static/img`. Reference as `/img/<file>` and, when possible, wrap using the `<RoundedImage>` MDX component for consistent styling.

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
