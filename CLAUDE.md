# GetRightData Documentation Platform

## Project Goal

This is a **multi-product documentation management system** for GetRightData. The system enables technical teams to create, edit, and publish documentation for multiple products without requiring direct Git or code access.

**Primary Purpose**: Provide a unified browser-based admin console + static documentation site that keeps documentation in Git-committed Markdown, making it easy to manage product documentation at scale.

## Architecture Overview

The project consists of two main workspaces:

```
documentation/
├── admin-panel/        # Next.js 16 admin dashboard (React 19)
├── docs-platform/      # Docusaurus 3 documentation site
└── CLAUDE.md           # This file - project knowledge base
```

### Admin Panel (`/admin-panel`)

A password-protected web UI for creating, editing, and publishing documentation.

**Key Features:**
- Password-protected login with HTTP-only JWT session cookies (4-hour TTL)
- File tree browser with Markdown + frontmatter editor
- Template-based document creation (feature, API, release notes)
- Word document (.docx) import capability
- Sidebar publishing/unpublishing management
- REST APIs for content, collections, templates, and sidebars

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS, gray-matter, mammoth, zod

### Docs Platform (`/docs-platform`)

A Docusaurus 3 static site that renders the documentation.

**Products Managed:**
- **DataTrust**: Versioned documentation (v7.6 current, v7.0 archived)
- **RightSight**: Latest version only
- **DataMarket**: Latest version only

**Tech Stack:** Docusaurus 3.1.1, React, custom CSS theme (Stripe-inspired)

## Project Structure

```
admin-panel/
├── src/
│   ├── app/
│   │   └── api/          # REST endpoints (auth, content, sidebars, templates)
│   ├── components/       # Dashboard UI components
│   ├── hooks/            # useDashboard state management
│   ├── lib/              # Auth, config, filesystem utilities
│   └── types/            # TypeScript definitions
└── middleware.ts         # Auth guard

docs-platform/
├── organizations/getrightdata/products/
│   ├── datatrust/        # DataTrust docs + versioned content
│   ├── rightsight/       # RightSight docs
│   └── datamarket/       # DataMarket docs
├── config/               # organizations.json + products.json
├── docs/templates/       # Document templates
├── src/
│   ├── theme/            # Docusaurus theme overrides
│   └── components/       # Custom React components
├── static/img/           # Images and assets
└── docusaurus.config.js  # Dynamic plugin configuration
```

## Development Commands

### Admin Panel
```bash
cd admin-panel
cp .env.example .env.local    # Configure secrets
npm install
npm run dev                   # http://localhost:3000
npm run lint                  # TypeScript linting
```

**Required Environment Variables:**
- `ADMIN_PANEL_EMAIL` - Display email for sessions
- `ADMIN_PANEL_PASSWORD` - Login passphrase
- `ADMIN_PANEL_JWT_SECRET` - JWT signing secret (32+ chars)

### Docs Platform
```bash
cd docs-platform
npm install
npm run start                 # Dev server with hot reload
npm run build                 # Production build
npm run serve                 # Preview production build
```

## Key APIs (Admin Panel)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | Authenticate user |
| `/api/auth/logout` | POST | Clear session |
| `/api/collections` | GET | List product/version combinations |
| `/api/content` | GET/PUT/POST | Read/write/create documents |
| `/api/sidebars` | GET | Load sidebar structure |
| `/api/sidebars/publish` | POST | Add doc to sidebar |
| `/api/sidebars/delete` | POST | Remove doc from sidebar |
| `/api/templates` | GET | List available templates |
| `/api/import-docx` | POST | Import Word documents |
| `/api/import-markdown` | POST | Import Markdown files |

## Important Patterns

### File Organization
- Each product has its own `docs/` folder with Markdown content
- Sidebars are defined in `sidebar.json` files per product
- Versioned products use `versioned_docs/` and `versioned_sidebars/` directories

### Frontmatter Standard
Every document includes YAML frontmatter:
```yaml
---
title: Document Title
description: Brief description
sidebar_label: Sidebar Label
slug: /url-path
tags: [tag1, tag2]
---
```

### Security
- All paths are normalized to prevent directory traversal
- Only `.md` and `.mdx` files are allowed
- Session cookies are HTTP-only and secure
- Middleware guards all routes except login

### Content Workflow
1. Admin creates/edits document in browser
2. Changes saved directly to filesystem (Git-committed Markdown)
3. Document published to sidebar via API
4. Docusaurus builds and deploys the static site

## Configuration Files

| File | Purpose |
|------|---------|
| `config/organizations.json` | Organization metadata (logos, colors) |
| `config/products.json` | Product metadata (versioning config) |
| `docusaurus.config.js` | Docusaurus site configuration |
| `vercel.json` | Deployment configuration |

## Versioning (DataTrust)

Add a new version:
```bash
npm run docusaurus docs:version 7.7 -- --plugin getrightdata-datatrust
```

Current versions:
- v7.6 (current) - `organizations/getrightdata/products/datatrust/docs/`
- v7.0 (archived) - `getrightdata-datatrust_versioned_docs/version-7.0/`

## Deployment

- **Docs Platform**: Vercel (auto-deploy from Git)
  - Domain: `docs.getrightdata.com`
  - Build: `npm run build` in `/docs-platform`

- **Admin Panel**: Vercel or container (Node 18+)
  - Protect with VPN/SSO in production
  - Set env vars in hosting platform

## Theme Customization

The docs platform uses a Stripe-inspired three-column layout:
- `src/theme/DocItem/Layout` - Article layout
- `src/components/BreadcrumbBar` - Navigation breadcrumbs
- `src/components/RightRail` - Ask/Copy/View actions
- `src/theme/DocRoot/Layout/Sidebar` - Custom sidebar with locale selectors
