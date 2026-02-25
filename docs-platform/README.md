# GetRightData Documentation Platform

A premium multi-product Docusaurus Classic implementation powering the DataTrust, RightSight, and DataMarket doc experiences plus API references and release notes.

## Requirements
- Node.js 18.18+ (`.nvmrc` provided)
- npm 9+
- GitHub repository for docs contributions

## Project Structure
```
docs-platform/
├── docs/                # Current (7.6) documentation
├── versioned_docs/      # Archived 7.0 documentation snapshot
├── src/                 # Theme overrides and shared components
├── static/              # Images and downloadable assets
├── sidebars.js          # Five sidebars (per product + API + release notes)
├── docusaurus.config.js # Global site configuration
└── vercel.json          # Deployment configuration
```

## Local Development
```bash
npm install
npm run start    # hot reload dev server
npm run build    # production build (CI-gated)
npm run serve    # preview locally from build output
node scripts/check-slugs.mjs   # optional: verify product/version slugs
```

> The repo currently does not contain a `node_modules` directory. Run `npm install` locally or in CI before building.

## Versioning Workflow
- Current docs represent **v7.6** (default) and live under `docs/`.
- Archived **v7.0** lives under `versioned_docs/version-7.0/`.
- Add a new version:
  ```bash
  npm run docusaurus docs:version 7.7
  # Update slugs in the newly created folder to /<product>/7.7/<page>
  ```
- Remove a version:
  ```bash
  npm run docusaurus docs:version:delete 7.0
  ```
- Always update `versions.json` and `versioned_sidebars/*` when adding/removing versions so the version dropdown stays accurate.

## Editor Workflow
- Use GitHub web UI or PRs to edit Markdown/MDX files.
- Place assets under `static/img` and reference them as `/img/<filename>`.
- Each doc includes frontmatter with `title`, `description`, `sidebar_label`, `slug`, and `tags`.
- Use Docusaurus admonitions (`:::info`, `:::tip`, `:::warning`) and fenced code blocks with language hints.
- Sidebars are managed centrally in `sidebars.js`. Add new doc IDs there to surface new pages.
- `docs/contributing.md` contains authoring guardrails plus templates for feature, API, and release notes content.

## Deployment (Vercel)
1. Create a new Vercel project and connect it to the GitHub repo.
2. Build settings:
   - Framework Preset: **Other**
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment: `NODE_VERSION=18.18.2`
3. Add the custom domain `docs.getrightdata.com` in Vercel and follow the DNS instructions (CNAME to `cname.vercel-dns.com`).
4. Vercel automatically provisions HTTPS certificates once DNS is verified.
5. Set `G-XXXXXXXXXX` in `docusaurus.config.js` or Vercel Environment Variables for Google Analytics.
6. The sitemap is automatically generated at `/sitemap.xml` after each production deployment.

## Redirect Strategy
- Primary 301 redirect: Configure Zendesk or your DNS provider to forward `https://getrightdata.zendesk.com/hc/en-us/*` to `https://docs.getrightdata.com/$1`.
- Vercel path-based redirects can be added to `vercel.json` (see example) to map legacy article IDs to modern slugs.
- Alternate Cloudflare method: Create a Page Rule with `Forwarding URL (301)` from the Zendesk host to the docs domain, preserving the path.
- After DNS updates, request re-indexing via Google Search Console to preserve SEO authority.

## Smoke Tests
- `npm run build` must succeed before merge.
- Verify `/datatrust/7.6/getting-started`, `/rightsight/7.6/overview`, `/datamarket/7.6/overview` all load with sticky sidebars and version selector.
- Toggle dark mode to confirm color contrast.
- Use `npm run serve` to test the static production bundle locally before deploying.

## Support Assets
- Theme overrides live under `src/theme/`.
- Rounded imagery and premium visuals rely on `src/css/custom.css` and `RoundedImage` MDX component.
- `vercel.json` documents the deployment + redirect behavior for operations teams.
