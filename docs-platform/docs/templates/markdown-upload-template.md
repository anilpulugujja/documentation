---
title: Markdown Upload Template
description: Downloadable frontmatter + content scaffold for authoring docs offline.
slug: /templates/markdown-upload-template
sidebar_label: Markdown Upload Template
hide_table_of_contents: false
tags:
  - template
---

Use this template when drafting docs outside the admin panel or when collaborating with AI tools such as Cursor. It mirrors the fields enforced by the authoring workflow and can be uploaded directly via the Markdown importer.

## Download

- [Download raw Markdown template](/templates/markdown-upload-template.md)
- File size limit during upload is **2 MB**.
- Keep screenshots in `static/img` and reference them via `/img/...` paths.

## Frontmatter Requirements

| Field | Required | Notes |
| --- | --- | --- |
| `title` | ✅ | Matches the H1 heading shown on the page and the sidebar label defaults to this value. |
| `description` | ✅ | 1–2 sentences (≤160 characters) for SEO + page intro summary. |
| `sidebar_label` | ✅ | Short label that appears in the left navigation. |
| `slug` | ✅ | Absolute path such as `/datatrust/7.6/metadata-sync`. |
| `tags` | Optional | Comma-separated keywords or array for search facets. |

Anything beyond these required fields should stay in the frontmatter. Advanced values (e.g., `hide_table_of_contents`) can be included but will surface inside the admin panel’s “Advanced Frontmatter” editor.

## Content Outline

```md
## Summary
Concise overview of the feature, user, and value statement.

## Prerequisites
- Systems, permissions, or dependencies that must be in place.

## Configuration Steps
1. Numbered list for procedural work.
2. Secondary heading structure (`###`) when necessary.
3. Use fenced code blocks for CLI/API snippets.

## Validation
Explain how operators confirm success (e.g., dashboards, queries, API checks).

## Troubleshooting
Document top break/fix issues in either bullet points or a 3-column table.

## Additional Resources
- Link out to API reference pages, release notes, or related runbooks.
```

> **Tip:** If you need a completely different structure (e.g., release notes), duplicate the most relevant template from `/docs/templates/` and adapt it instead.
