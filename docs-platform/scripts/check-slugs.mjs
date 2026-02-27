import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const organizations = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'config/organizations.json'), 'utf8'),
);
const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'config/products.json'), 'utf8'));
const productCatalog = new Map(products.map((product) => [product.id, product]));

let failures = 0;

const inspectDirectory = (dirPath, expectedPrefix) => {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  for (const entry of fs.readdirSync(dirPath)) {
    if (!entry.endsWith('.md')) continue;
    const fullPath = path.join(dirPath, entry);
    const contents = fs.readFileSync(fullPath, 'utf8');
    const slugMatch = contents.match(/slug:\s*(.*)/);
    if (!slugMatch) continue;
    const slug = slugMatch[1].trim();
    if (!slug.startsWith(expectedPrefix)) {
      console.error(`Slug mismatch in ${fullPath}: expected to start with '${expectedPrefix}', found '${slug}'`);
      failures++;
    }
  }
};

organizations.forEach((org) => {
  org.products.forEach((productId) => {
    const product = productCatalog.get(productId);
    if (!product) return;
    const productRoot = path.join(ROOT, 'organizations', org.id, 'products', productId);
    if (product.versioning.type === 'versioned') {
      const currentPrefix = `/${org.slug}/${product.slug}/${product.versioning.current}/`;
      inspectDirectory(path.join(productRoot, 'docs'), currentPrefix);
      (product.versioning.archived || []).forEach((archived) => {
        const archivedPrefix = `/${org.slug}/${product.slug}/${archived}/`;
        inspectDirectory(path.join(productRoot, 'versioned_docs', `version-${archived}`), archivedPrefix);
      });
    } else {
      const latestPrefix = `/${org.slug}/${product.slug}/latest/`;
      inspectDirectory(path.join(productRoot, 'docs'), latestPrefix);
    }
  });
});

if (failures > 0) {
  console.error(`\nSlug check failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log('Slug check completed. Any slugs present follow the expected prefixes.');
