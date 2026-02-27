import path from 'path';
import fs from 'fs';

const docsPlatformRoot = path.resolve(process.cwd(), '..', 'docs-platform');

export const PATHS = {
  platformRoot: docsPlatformRoot,
  organizationsRoot: path.join(docsPlatformRoot, 'organizations'),
  configRoot: path.join(docsPlatformRoot, 'config'),
  staticRoot: path.join(docsPlatformRoot, 'static', 'img'),
  templateRoot: path.join(docsPlatformRoot, 'docs', 'templates'),
};

export const SESSION_COOKIE = 'grd_admin_session';

const loadJson = (filename: string) =>
  JSON.parse(fs.readFileSync(path.join(PATHS.configRoot, filename), 'utf8'));

export const organizations = loadJson('organizations.json');
export const products = loadJson('products.json');

const productCatalog = new Map(products.map((product) => [product.id, product]));

const buildCollections = () => {
  const collections = [];

  organizations.forEach((org) => {
    org.products.forEach((productId) => {
      const product = productCatalog.get(productId);
      if (!product) return;
      const productRoot = `organizations/${org.id}/products/${productId}`;
      const sidebarFile = `${productRoot}/sidebar.json`;

      if (product.versioning.type === 'versioned') {
        const currentVersion = product.versioning.current;
        collections.push({
          id: `${org.id}-${productId}-${currentVersion}`,
          label: `${product.displayName} (${currentVersion})`,
          version: currentVersion,
          product: product.displayName,
          orgId: org.id,
          orgSlug: org.slug,
          productId,
          productSlug: product.slug,
          relativePath: `${productRoot}/docs`,
          slugPrefix: `/${org.slug}/${product.slug}/${currentVersion}`,
          sidebarFile,
        });
        (product.versioning.archived || []).forEach((archived) => {
          collections.push({
            id: `${org.id}-${productId}-${archived}`,
            label: `${product.displayName} (${archived} archived)`,
            version: archived,
            product: product.displayName,
            orgId: org.id,
            orgSlug: org.slug,
            productId,
            productSlug: product.slug,
            relativePath: `${productRoot}/versioned_docs/version-${archived}`,
            slugPrefix: `/${org.slug}/${product.slug}/${archived}`,
            sidebarFile,
          });
        });
      } else {
        collections.push({
          id: `${org.id}-${productId}-latest`,
          label: `${product.displayName} (Latest)`,
          version: 'Latest',
          product: product.displayName,
          orgId: org.id,
          orgSlug: org.slug,
          productId,
          productSlug: product.slug,
          relativePath: `${productRoot}/docs`,
          slugPrefix: `/${org.slug}/${product.slug}/latest`,
          sidebarFile,
        });
      }
    });
  });

  collections.push({
    id: 'templates',
    label: 'Authoring Templates',
    version: 'N/A',
    product: 'Templates',
    orgId: 'getrightdata',
    orgSlug: 'getrightdata',
    productId: 'templates',
    productSlug: 'templates',
    relativePath: 'docs/templates',
    slugPrefix: '/templates',
    sidebarFile: undefined,
  });

  return collections;
};

export const defaultCollections = buildCollections();

export const ADMIN_EMAIL = process.env.ADMIN_PANEL_EMAIL ?? 'admin@getrightdata.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PANEL_PASSWORD ?? '';
export const ADMIN_JWT_SECRET = process.env.ADMIN_PANEL_JWT_SECRET ?? 'change-me';

export const allowedFileExtensions = ['.md', '.mdx'];
