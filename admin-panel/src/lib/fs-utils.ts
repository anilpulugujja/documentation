import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import { PATHS, allowedFileExtensions, defaultCollections } from './config';

export type Collection = {
  id: string;
  label: string;
  version: string;
  product: string;
  relativePath: string;
  absolutePath: string;
};

const collectionCache: Record<string, Collection> = {};

export const getCollections = (): Collection[] => {
  if (Object.keys(collectionCache).length) {
    return Object.values(collectionCache);
  }

  for (const item of defaultCollections) {
    const absolutePath = path.join(PATHS.platformRoot, item.relativePath);
    collectionCache[item.id] = {
      ...item,
      absolutePath,
    };
  }

  return Object.values(collectionCache);
};

export const getCollection = (id: string): Collection => {
  const collections = getCollections();
  const match = collections.find((c) => c.id === id);

  if (!match) {
    throw new Error(`Unknown collection ${id}`);
  }

  return match;
};

export const resolvePath = (collectionId: string, relativeFilePath = ''): string => {
  const collection = getCollection(collectionId);
  const targetPath = path.join(collection.absolutePath, relativeFilePath);
  const normalized = path.normalize(targetPath);

  if (!normalized.startsWith(collection.absolutePath)) {
    throw new Error('Attempted path traversal');
  }

  return normalized;
};

export type TreeNode = {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
};

export const readTree = async (collectionId: string, relativeDir = ''): Promise<TreeNode[]> => {
  const target = resolvePath(collectionId, relativeDir);
  const entries = await fs.readdir(target, { withFileTypes: true });
  const nodes: TreeNode[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const entryPath = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      nodes.push({
        name: entry.name,
        path: entryPath,
        type: 'directory',
      });
    } else if (allowedFileExtensions.includes(path.extname(entry.name))) {
      nodes.push({
        name: entry.name,
        path: entryPath,
        type: 'file',
      });
    }
  }

  nodes.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name);
    }
    return a.type === 'directory' ? -1 : 1;
  });

  return nodes;
};

export const readFile = async (collectionId: string, relativeFilePath: string) => {
  const filePath = resolvePath(collectionId, relativeFilePath);
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);

  return {
    content: parsed.content.trim(),
    frontmatter: parsed.data,
    raw,
  };
};

export const writeFile = async (collectionId: string, relativeFilePath: string, content: string) => {
  const filePath = resolvePath(collectionId, relativeFilePath);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
  return filePath;
};

export const fileExists = async (collectionId: string, relativeFilePath: string) => {
  try {
    const filePath = resolvePath(collectionId, relativeFilePath);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const listTemplates = async () => {
  const templatesCollection = getCollection('templates');
  const files = await fs.readdir(templatesCollection.absolutePath, { withFileTypes: true });
  return files
    .filter((entry) => entry.isFile() && allowedFileExtensions.includes(path.extname(entry.name)))
    .map((entry) => ({
      id: entry.name,
      name: entry.name.replace(/\.mdx?$/, ''),
    }));
};

export const readTemplate = async (templateId: string) => {
  const templateCollection = getCollection('templates');
  const filePath = path.join(templateCollection.absolutePath, templateId);
  const normalized = path.normalize(filePath);
  if (!normalized.startsWith(templateCollection.absolutePath)) {
    throw new Error('Invalid template');
  }
  return fs.readFile(normalized, 'utf8');
};

export const serializeDoc = (frontmatter: Record<string, unknown>, body: string) => {
  const trimmed = body.endsWith('\n') ? body : `${body}\n`;
  return matter.stringify(trimmed, frontmatter);
};
