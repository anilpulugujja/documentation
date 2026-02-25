import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const checks = [
  { dir: 'docs', version: '7.6' },
  { dir: 'versioned_docs/version-7.0', version: '7.0' }
];
const products = ['datatrust', 'rightsight', 'datamarket'];
let failures = 0;

for (const check of checks) {
  for (const product of products) {
    const productDir = path.join(ROOT, check.dir, product);
    if (!fs.existsSync(productDir)) continue;
    for (const file of fs.readdirSync(productDir)) {
      if (!file.endsWith('.md')) continue;
      const fullPath = path.join(productDir, file);
      const contents = fs.readFileSync(fullPath, 'utf8');
      const slugMatch = contents.match(/slug:\s*(.*)/);
      if (!slugMatch) {
        console.warn(`Missing slug in ${fullPath}`);
        failures++;
        continue;
      }
      const slug = slugMatch[1].trim();
      const expected = `/${product}/${check.version}/`;
      if (!slug.includes(expected)) {
        console.error(`Slug mismatch in ${fullPath}: expected '${expected}' inside '${slug}'`);
        failures++;
      }
    }
  }
}

if (failures > 0) {
  console.error(`\nSlug check failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log('All product slugs match the expected versioned structure.');
