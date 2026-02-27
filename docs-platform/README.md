# GetRightData Documentation Platform

A premium multi-product Docusaurus Classic implementation powering the DataTrust, RightSight, and DataMarket doc experiences plus API references and release notes.

## Requirements
- Node.js 18.18+ (`.nvmrc` provided)
- npm 9+
- GitHub repository for docs contributions

## Project Structure
```
docs-platform/
├── organizations/
│   └── getrightdata/
│       └── products/
│           ├── datatrust/
│           │   ├── docs/                   # DataTrust 7.6 content
│           │   ├── versioned_docs/         # Archived 7.0 content
│           │   ├── versioned_sidebars/
│           │   └── sidebar.json
│           ├── rightsight/                 # Latest-only products mirror this layout (docs + sidebar)
│           └── datamarket/
├── config/                # organizations.json + products.json
├── docs/templates/        # Authoring templates surfaced in the admin panel
├── src/                   # Theme overrides and shared components
├── static/                # Images and downloadable assets
├── docusaurus.config.js   # Global site configuration + dynamic plugin loader
└── vercel.json            # Deployment configuration
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
- Current DataTrust docs represent **v7.6** and live under `organizations/getrightdata/products/datatrust/docs/`.
- Archived **v7.0** lives under `organizations/getrightdata/products/datatrust/versioned_docs/version-7.0/`.
- Add a new version:
  ```bash
  npm run docusaurus docs:version 7.7
  # Specify the plugin ID, e.g. -- --plugin getrightdata-datatrust 7.7
  ```
- Remove a version:
  ```bash
  npm run docusaurus docs:version:delete 7.0
  ```
- Always update `organizations/<org>/products/<product>/versions.json` (symlinked to `getrightdata-datatrust_versions.json`) plus the matching `versioned_sidebars` folder when adding/removing versions so the version dropdown stays accurate.

- Use GitHub web UI or PRs to edit Markdown/MDX files beneath `organizations/<org>/products/<product>/docs`.
- Place assets under `static/img` (e.g. `static/img/screenshots/` for product screenshots) and reference them as `/img/<filename>` or `/img/screenshots/<filename>`. See [Contributing Guide](docs/contributing.md#product-screenshots-with-annotations) for screenshot and annotation guidelines.
- Each doc includes frontmatter with `title`, `description`, `sidebar_label`, `slug`, and `tags`.
- Use Docusaurus admonitions (`:::info`, `:::tip`, `:::warning`) and fenced code blocks with language hints.
- Each product exposes a JSON sidebar definition at `organizations/<org>/products/<product>/sidebar.json`. Update those files (2-level nested categories) to surface new pages.
- `docs/contributing.md` contains authoring guardrails plus templates for feature, API, and release notes content.

### Browser Admin Panel
- Location: `documentation/admin-panel` (Next.js).
- Provides login-gated UI for browsing collections, editing Markdown/frontmatter, and creating docs from templates.
- All writes go directly into this workspace—review diffs in Git as usual before merging.
- To run locally:
  ```bash
  cd documentation/admin-panel
  cp .env.example .env.local   # set password + secret
  npm run dev
  ```
- Deploy it separately (Vercel or container). Protect with VPN/SSO and set the same env vars in production.

### Stripe-inspired doc chrome
- `src/theme/DocItem/Layout` + `src/components/BreadcrumbBar` + `src/components/RightRail` define the custom three-column article layout, DocSearch input, and “Ask / Copy / View” actions.
- `src/theme/DocRoot/Layout/Sidebar` injects locale selectors (`siteConfig.customFields.localeOptions`) and support links at the bottom of the left rail.
- Configure outgoing links via `customFields` in `docusaurus.config.js`:
  - `askPageUrl` – destination for “Ask about this page”.
  - `rawContentBaseUrl` – GitHub raw base for “View as Markdown”.
  - `localeOptions` – region/language arrays rendered in the sidebar footer.

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
