import fs from 'fs/promises';
import path from 'path';

import { PATHS } from './config';
import { Collection, getCollection } from './fs-utils';
import { PublishPosition, SidebarDefinition } from '@/types/sidebar';

type SidebarReadResult = {
  definition: SidebarDefinition;
  filePath: string;
  collection: Collection;
};

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

export const flattenPublishedDocs = (definition: SidebarDefinition) => {
  const map: Record<string, string> = {};
  definition.sections.forEach((section) => {
    section.items.forEach((docId) => {
      map[docId] = section.id;
    });
  });
  return map;
};

export const removeDoc = (definition: SidebarDefinition, docId: string) => {
  let removed = false;
  definition.sections.forEach((section) => {
    const index = section.items.indexOf(docId);
    if (index >= 0) {
      section.items.splice(index, 1);
      removed = true;
    }
  });
  return removed;
};

const insertDocAtPosition = (
  sectionItems: string[],
  docId: string,
  position: PublishPosition,
) => {
  if (sectionItems.includes(docId)) {
    return;
  }
  if (position.type === 'top') {
    sectionItems.unshift(docId);
    return;
  }
  if (position.type === 'before') {
    const targetIndex = sectionItems.indexOf(position.docId);
    if (targetIndex >= 0) {
      sectionItems.splice(targetIndex, 0, docId);
      return;
    }
  }
  // fallback to end
  sectionItems.push(docId);
};

export const insertDoc = (
  definition: SidebarDefinition,
  sectionId: string,
  docId: string,
  position: PublishPosition,
) => {
  const targetSection = definition.sections.find((section) => section.id === sectionId);
  if (!targetSection) {
    throw new Error(`Unknown section ${sectionId}`);
  }
  // Ensure doc not duplicated elsewhere
  removeDoc(definition, docId);
  insertDocAtPosition(targetSection.items, docId, position);
};
