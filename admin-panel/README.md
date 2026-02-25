# GetRightData Docs Admin Panel

A production-focused admin console for creating and editing GetRightData documentation from the browser. It talks directly to the `documentation/docs-platform` workspace, so every change is committed-ready Markdown that Docusaurus can render immediately.

## Features

- Password-protected login with signed HTTP-only sessions.
- Workspace awareness for every product + archived version (DataTrust, RightSight, DataMarket, API, Release Notes, templates).
- File tree browser with per-directory navigation, Markdown + frontmatter editor, and advanced JSON frontmatter overrides.
- Template-aware document creator (feature, API, release notes, or blank) that auto-suggests slugs from filenames.
- Template listing endpoint plus REST APIs for tree/content/collections that can be reused by CLI automations later.

## Getting Started

```bash
cd documentation/admin-panel
cp .env.example .env.local        # update secrets before running
npm install                       # already done in repo but safe to re-run
npm run dev                       # http://localhost:3000
```

### Required Environment Variables

| Name | Description |
| --- | --- |
| `ADMIN_PANEL_EMAIL` | Display-only email for any logged-in session. |
| `ADMIN_PANEL_PASSWORD` | Passphrase required on the login screen. Choose a long random string. |
| `ADMIN_PANEL_JWT_SECRET` | Random 32+ char secret for signing the session cookie. |

> The panel looks for `.env.local` by default. Never commit secrets.

## Project Structure

```
admin-panel/
├── src/
│   ├── app/
│   │   ├── api/… (auth, tree, content, templates endpoints)
│   │   ├── login/page.tsx (passphrase screen)
│   │   └── page.tsx (dashboard shell)
│   ├── components/DashboardApp.tsx (client UI)
│   └── lib/ (auth helpers + Docusaurus fs utilities)
├── middleware.ts (guards everything except /login + /api/auth/login)
├── .env.example
└── package.json
```

The app locates Docusaurus content relative to the repo root by walking `../docs-platform`. No extra services are required—file writes persist as soon as you hit “Save changes”.

## Security Notes

- Session cookies are HTTP-only, signed, and expire after 4 hours.
- `middleware.ts` blocks every route (and API) unless the cookie is present.
- The filesystem API performs defensive path normalization so editors cannot escape the Docusaurus workspace.
- To harden further, place the app behind your IdP (Okta/Azure AD) or swap the passphrase for NextAuth/SSO.

## Production Deployment

1. Provision a Vercel project (or any Node 18+ host) pointing at `documentation/admin-panel`.
2. Set the env vars above in the hosting platform.
3. Build command: `npm run build`. Output uses the default Next.js `.next`.
4. Point `docs-admin.getrightdata.com` (or similar) to the deployment and protect with SSO/VPN if required.

For container/Kubernetes deploys, run `npm run build && npm run start`. The app only needs access to the Git working tree on a shared volume.

## Maintenance

- `npm run lint` keeps the UI/API TypeScript clean (already green).
- All filesystem helpers live in `src/lib/fs-utils.ts`; update there when adding new version folders.
- Templates are sourced from `documentation/docs-platform/docs/templates`. Add more Markdown templates there to surface them in the creator form.
