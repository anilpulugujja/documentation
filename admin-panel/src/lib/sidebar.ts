import fs from 'fs/promises';
import path from 'path';

import { PATHS } from './config';
import { Collection, getCollection } from './fs-utils';
import {
  PublishPosition,
  SidebarCategory,
  SidebarDefinition,
  SidebarNode,
} from '@/types/sidebar';

type SidebarReadResult = {
  definition: SidebarDefinition;
  filePath: string;
  collection: Collection;
};

const isCategory = (node: SidebarNode): node is SidebarCategory =>
  typeof node === 'object' && node !== null && (node as SidebarCategory).type === 'category';

const ensureSidebarPath = (collection: Collection) => {
  if (!collection.sidebarFile) {
    throw new Error(`Collection ${collection.id} does not have a sidebar file.`);
  }
  return path.join(PATHS.platformRoot, collection.sidebarFile);
};

export const readSidebar = async (collectionId: string): Promise<SidebarReadResult> => {
  const collection = getCollection(collectionId);
  const filePath = ensureSidebarPath(collection);
  const raw = await fs.readFile(filePath, 'utf8');
  const definition = JSON.parse(raw) as SidebarDefinition;
  return { definition, filePath, collection };
};

export const writeSidebar = async (filePath: string, definition: SidebarDefinition) => {
  const tmpPath = `${filePath}.tmp`;
  const payload = `${JSON.stringify(definition, null, 2)}\n`;
  await fs.writeFile(tmpPath, payload, 'utf8');
  await fs.rename(tmpPath, filePath);
};

type DocPath = {
  id: string;
  label: string;
};

export const flattenPublishedDocs = (definition: SidebarDefinition) => {
  const map: Record<string, DocPath[]> = {};
  const traverse = (nodes: SidebarNode[], ancestors: DocPath[]) => {
    nodes.forEach((node) => {
      if (isCategory(node)) {
        traverse(node.items, [...ancestors, { id: node.id, label: node.label }]);
      } else if (typeof node === 'string') {
        map[node] = ancestors;
      }
    });
  };
  traverse(definition.items, []);
  return map;
};

const removeDocFromNodes = (nodes: SidebarNode[], docId: string) => {
  let removed = false;
  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    const node = nodes[i];
    if (isCategory(node)) {
      if (removeDocFromNodes(node.items, docId)) {
        removed = true;
      }
    } else if (node === docId) {
      nodes.splice(i, 1);
      removed = true;
    }
  }
  return removed;
};

export const removeDoc = (definition: SidebarDefinition, docId: string) =>
  removeDocFromNodes(definition.items, docId);

const insertDocAtPosition = (nodes: SidebarNode[], docId: string, position: PublishPosition) => {
  if (nodes.includes(docId)) {
    return; // already inserted at desired level
  }
  if (position.type === 'top') {
    nodes.unshift(docId);
    return;
  }
  if (position.type === 'before') {
    const targetIndex = nodes.findIndex((node) => node === position.docId);
    if (targetIndex >= 0) {
      nodes.splice(targetIndex, 0, docId);
      return;
    }
  }
  // fallback to end
  nodes.push(docId);
};

const findCategoryByPath = (nodes: SidebarNode[], path: string[]): SidebarCategory | null => {
  if (path.length === 0) {
    return null;
  }
  let currentItems = nodes;
  let target: SidebarCategory | null = null;
  for (const id of path) {
    const match = currentItems.find((node) => isCategory(node) && node.id === id);
    if (!match || !isCategory(match)) {
      return null;
    }
    target = match;
    currentItems = match.items;
  }
  return target;
};

const getContainerForPath = (definition: SidebarDefinition, path: string[]) => {
  if (path.length === 0) {
    return definition.items;
  }
  const category = findCategoryByPath(definition.items, path);
  if (!category) {
    throw new Error(`Unknown category path ${path.join(' / ')}`);
  }
  return category.items;
};

export const insertDoc = (
  definition: SidebarDefinition,
  targetPath: string[],
  docId: string,
  position: PublishPosition,
) => {
  // Ensure doc not duplicated elsewhere
  removeDoc(definition, docId);
  const container = getContainerForPath(definition, targetPath);
  insertDocAtPosition(container, docId, position);
};

export const insertCategory = (
  definition: SidebarDefinition,
  parentPath: string[],
  payload: { id: string; label: string },
) => {
  const container = getContainerForPath(definition, parentPath);
  if (container.some((node) => isCategory(node) && node.id === payload.id)) {
    throw new Error('A category with this ID already exists at the chosen level.');
  }
  const newCategory: SidebarCategory = {
    type: 'category',
    id: payload.id,
    label: payload.label,
    items: [],
  };
  container.push(newCategory);
  return newCategory;
};

export const renameCategory = (
  definition: SidebarDefinition,
  path: string[],
  label: string,
) => {
  const category = findCategoryByPath(definition.items, path);
  if (!category) {
    throw new Error(`Unknown category path ${path.join(' / ')}`);
  }
  category.label = label;
};

export const removeCategory = (definition: SidebarDefinition, path: string[]) => {
  if (path.length === 0) {
    throw new Error('Cannot delete the root level.');
  }
  const parentPath = path.slice(0, -1);
  const targetId = path[path.length - 1];
  const container = getContainerForPath(definition, parentPath);
  const index = container.findIndex((node) => isCategory(node) && node.id === targetId);
  if (index === -1) {
    throw new Error(`Unknown category path ${path.join(' / ')}`);
  }
  const target = container[index] as SidebarCategory;
  if (target.items.length > 0) {
    throw new Error('Only empty categories can be removed. Move or delete items first.');
  }
  container.splice(index, 1);
};
