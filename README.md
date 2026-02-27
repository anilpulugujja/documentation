# GetRightData Documentation Platform

A multi-product documentation management system for GetRightData, consisting of a browser-based admin console and a Docusaurus-powered documentation site.

## Overview

This project enables technical teams to create, edit, and publish documentation for multiple products (DataTrust, RightSight, DataMarket) without requiring direct Git or code access. All content is stored as Git-committed Markdown files.

## Workspaces

| Directory | Description | Tech Stack |
|-----------|-------------|------------|
| `admin-panel/` | Password-protected web UI for editing docs | Next.js 16, React 19 |
| `docs-platform/` | Static documentation site | Docusaurus 3 |

## Quick Start

### Documentation Site (Local Preview)
```bash
cd docs-platform
npm install
npm run start
```

### Admin Panel (Content Editing)
```bash
cd admin-panel
cp .env.example .env.local    # Configure secrets first
npm install
npm run dev
```

## Documentation

- **[Admin Panel README](admin-panel/README.md)** - Setup, security, and API details
- **[Docs Platform README](docs-platform/README.md)** - Content authoring and deployment
- **[CLAUDE.md](CLAUDE.md)** - Project knowledge base and architecture overview

## Products

| Product | Versioning | Status |
|---------|-----------|--------|
| DataTrust | v7.6 (current), v7.0 (archived) | Versioned |
| RightSight | Latest only | Active |
| DataMarket | Latest only | Active |

## Key Features

- Browser-based Markdown editor with frontmatter support
- Template-based document creation
- Word document (.docx) import
- Sidebar management via UI
- Multi-version documentation support
- Stripe-inspired documentation theme

## Deployment

- **Docs Site**: Vercel at `docs.getrightdata.com`
- **Admin Panel**: Vercel or containerized (protect with VPN/SSO)
