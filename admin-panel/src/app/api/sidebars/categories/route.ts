import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

import { requireAuth } from "@/lib/auth";
import {
  insertCategory,
  readSidebar,
  writeSidebar,
  flattenPublishedDocs,
  renameCategory,
  removeCategory,
} from "@/lib/sidebar";

const createSchema = z.object({
  collectionId: z.string().min(1),
  parentPath: z.array(z.string()).max(1).default([]),
  label: z.string().min(1),
  id: z.string().optional(),
});

const renameSchema = z.object({
  collectionId: z.string().min(1),
  path: z.array(z.string()).min(1).max(2),
  label: z.string().min(1),
});

const deleteSchema = z.object({
  collectionId: z.string().min(1),
  path: z.array(z.string()).min(1).max(2),
});

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  if (!payload?.action) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const { definition, filePath } = await readSidebar(payload.collectionId);
    if (payload.action === "create") {
      const parsed = createSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
      }
      const id =
        parsed.data.id ||
        slugify(parsed.data.label, { lower: true, strict: true }) ||
        `category-${Date.now()}`;
      insertCategory(definition, parsed.data.parentPath, { id, label: parsed.data.label });
    } else if (payload.action === "rename") {
      const parsed = renameSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
      }
      renameCategory(definition, parsed.data.path, parsed.data.label);
    } else {
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
    await writeSidebar(filePath, definition);
    return NextResponse.json({
      items: definition.items,
      publishedDocs: flattenPublishedDocs(definition),
    });
  } catch (error) {
    console.error("Category update failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Category update failed" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parseResult = deleteSchema.safeParse(payload);
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const { definition, filePath } = await readSidebar(parseResult.data.collectionId);
    removeCategory(definition, parseResult.data.path);
    await writeSidebar(filePath, definition);
    return NextResponse.json({
      items: definition.items,
      publishedDocs: flattenPublishedDocs(definition),
    });
  } catch (error) {
    console.error("Category deletion failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Category deletion failed" }, { status: 400 });
  }
}
