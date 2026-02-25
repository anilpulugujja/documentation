import path from 'path';

const docsPlatformRoot = path.resolve(process.cwd(), '..', 'docs-platform');

export const PATHS = {
  platformRoot: docsPlatformRoot,
  docsRoot: path.join(docsPlatformRoot, 'docs'),
  versionedRoot: path.join(docsPlatformRoot, 'versioned_docs'),
  staticRoot: path.join(docsPlatformRoot, 'static', 'img'),
  templateRoot: path.join(docsPlatformRoot, 'docs', 'templates'),
};

export const SESSION_COOKIE = 'grd_admin_session';

export const defaultCollections = [
  {
    id: 'datatrust-current',
    label: 'DataTrust (7.6 current)',
    relativePath: 'docs/datatrust',
    version: '7.6',
    product: 'DataTrust',
  },
  {
    id: 'rightsight-current',
    label: 'RightSight (Latest)',
    relativePath: 'docs/rightsight',
    version: 'Latest',
    product: 'RightSight',
  },
  {
    id: 'datamarket-current',
    label: 'DataMarket (Latest)',
    relativePath: 'docs/datamarket',
    version: 'Latest',
    product: 'DataMarket',
  },
  {
    id: 'api-current',
    label: 'API Reference',
    relativePath: 'docs/api',
    version: '7.6',
    product: 'API',
  },
  {
    id: 'release-notes',
    label: 'Release Notes',
    relativePath: 'docs/release-notes',
    version: '7.6',
    product: 'Release Notes',
  },
  {
    id: 'datatrust-7-0',
    label: 'DataTrust (7.0 archived)',
    relativePath: 'versioned_docs/version-7.0/datatrust',
    version: '7.0',
    product: 'DataTrust',
  },
  {
    id: 'templates',
    label: 'Authoring Templates',
    relativePath: 'docs/templates',
    version: 'N/A',
    product: 'Templates',
  },
];

export const ADMIN_EMAIL = process.env.ADMIN_PANEL_EMAIL ?? 'admin@getrightdata.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PANEL_PASSWORD ?? '';
export const ADMIN_JWT_SECRET = process.env.ADMIN_PANEL_JWT_SECRET ?? 'change-me';

export const allowedFileExtensions = ['.md', '.mdx'];
