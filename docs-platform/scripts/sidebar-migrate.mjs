#!/usr/bin/env node
/**
 * Convert legacy sidebar JSON (with `sections`) into the new Stripe-style tree schema.
 * Usage: node scripts/sidebar-migrate.mjs
 */
import fs from 'fs/promises';
import path from 'path';

const sidebarDir = path.join(process.cwd(), 'sidebars');

const convertFile = async (file) => {
  const absPath = path.join(sidebarDir, file);
  const raw = await fs.readFile(absPath, 'utf8');
  const data = JSON.parse(raw);
  if (Array.isArray(data.items)) {
    console.log(`Skipping ${file}; already migrated.`);
    return;
  }
  if (!Array.isArray(data.sections)) {
    console.warn(`Unknown schema for ${file}; skipping.`);
    return;
  }
  const items = data.sections.map((section) => {
    if (typeof section === 'string') {
      return section;
    }
    const { id, label, items: sectionItems = [] } = section;
    return {
      type: 'category',
      id,
      label,
      items: sectionItems,
    };
  });
  const migrated = {
    sidebarId: data.sidebarId,
    items,
  };
  await fs.writeFile(absPath, `${JSON.stringify(migrated, null, 2)}\n`, 'utf8');
  console.log(`Migrated ${file}`);
};

const main = async () => {
  const files = await fs.readdir(sidebarDir);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));
  await Promise.all(jsonFiles.map((file) => convertFile(file)));
};

main().catch((error) => {
  console.error('Sidebar migration failed:', error);
  process.exit(1);
});
