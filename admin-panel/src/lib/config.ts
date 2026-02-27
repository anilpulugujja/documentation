import path from 'path';

const docsPlatformRoot = path.resolve(process.cwd(), '..', 'docs-platform');

export const PATHS = {
  platformRoot: docsPlatformRoot,
  docsRoot: path.join(docsPlatformRoot, 'docs'),
  versionedRoot: path.join(docsPlatformRoot, 'datatrust_versioned_docs'),
  staticRoot: path.join(docsPlatformRoot, 'static', 'img'),
  templateRoot: path.join(docsPlatformRoot, 'docs', 'templates'),
  sidebarRoot: path.join(docsPlatformRoot, 'sidebars'),
};

export const SESSION_COOKIE = 'grd_admin_session';

export const defaultCollections = [
  {
    id: 'datatrust-current',
    label: 'DataTrust (7.6 current)',
    relativePath: 'docs/datatrust',
    version: '7.6',
   product: 'DataTrust',
    slugPrefix: '/datatrust/7.6',
    sidebarFile: 'sidebars/datatrust.json',
  },
  {
    id: 'rightsight-current',
    label: 'RightSight (Latest)',
    relativePath: 'docs/rightsight',
    version: 'Latest',
    product: 'RightSight',
    slugPrefix: '/rightsight',
    sidebarFile: 'sidebars/rightsight.json',
  },
  {
    id: 'datamarket-current',
    label: 'DataMarket (Latest)',
    relativePath: 'docs/datamarket',
    version: 'Latest',
    product: 'DataMarket',
    slugPrefix: '/datamarket',
    sidebarFile: 'sidebars/datamarket.json',
  },
  {
    id: 'api-current',
    label: 'API Reference',
    relativePath: 'docs/api',
    version: '7.6',
    product: 'API',
    slugPrefix: '/api',
    sidebarFile: 'sidebars/api.json',
  },
  {
    id: 'release-notes',
    label: 'Release Notes',
    relativePath: 'docs/release-notes',
    version: '7.6',
    product: 'Release Notes',
    slugPrefix: '/release-notes',
    sidebarFile: 'sidebars/release-notes.json',
  },
  {
    id: 'datatrust-7-0',
    label: 'DataTrust (7.0 archived)',
    relativePath: 'datatrust_versioned_docs/version-7.0',
    version: '7.0',
    product: 'DataTrust',
    slugPrefix: '/datatrust/7.0',
    sidebarFile: 'sidebars/datatrust.json',
  },
  {
    id: 'templates',
    label: 'Authoring Templates',
    relativePath: 'docs/templates',
    version: 'N/A',
    product: 'Templates',
    slugPrefix: '/templates',
    sidebarFile: undefined,
  },
];

export const ADMIN_EMAIL = process.env.ADMIN_PANEL_EMAIL ?? 'admin@getrightdata.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PANEL_PASSWORD ?? '';
export const ADMIN_JWT_SECRET = process.env.ADMIN_PANEL_JWT_SECRET ?? 'change-me';

export const allowedFileExtensions = ['.md', '.mdx'];
