import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireAuth } from "@/lib/auth";
import { fileExists, readFile } from "@/lib/fs-utils";
import { insertDoc, readSidebar, removeDoc, writeSidebar, flattenPublishedDocs } from "@/lib/sidebar";
import { PublishPosition } from "@/types/sidebar";

const publishSchema = z.object({
  collectionId: z.string().min(1),
  docId: z.string().min(1),
  sectionId: z.string().min(1),
  relativePath: z.string().min(1),
  position: z
    .union([
      z.literal("end"),
      z.literal("top"),
      z.object({
        type: z.literal("before"),
        docId: z.string().min(1),
      }),
    ])
    .optional(),
});

const unpublishSchema = z.object({
  collectionId: z.string().min(1),
  docId: z.string().min(1),
});

const toPosition = (input?: string | { type: "before"; docId: string }): PublishPosition => {
  if (!input) {
    return { type: "end" };
  }
  if (input === "end" || input === "top") {
    return { type: input };
  }
  return { type: "before", docId: input.docId };
};

const ensureSlugMatchesCollection = (slug: unknown, slugPrefix?: string) => {
  if (!slugPrefix) {
    return;
  }
  if (typeof slug !== "string" || !slug.startsWith(slugPrefix)) {
    throw new Error(`Slug must start with ${slugPrefix}`);
  }
};

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parseResult = publishSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const { definition, filePath, collection } = await readSidebar(parseResult.data.collectionId);
    const exists = await fileExists(parseResult.data.collectionId, parseResult.data.relativePath);
    if (!exists) {
      return NextResponse.json({ error: "Document not found on disk." }, { status: 404 });
    }
    const doc = await readFile(parseResult.data.collectionId, parseResult.data.relativePath);
    ensureSlugMatchesCollection(doc.frontmatter?.slug, collection.slugPrefix);

    const position = toPosition(parseResult.data.position);
    insertDoc(definition, parseResult.data.sectionId, parseResult.data.docId, position);
    await writeSidebar(filePath, definition);

    return NextResponse.json({
      publishedDocs: flattenPublishedDocs(definition),
      sectionId: parseResult.data.sectionId,
    });
  } catch (error) {
    console.error("Publish failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Publish failed" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parseResult = unpublishSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const { definition, filePath } = await readSidebar(parseResult.data.collectionId);
    const removed = removeDoc(definition, parseResult.data.docId);
    if (!removed) {
      return NextResponse.json({ error: "Document was not published." }, { status: 404 });
    }
    await writeSidebar(filePath, definition);
    return NextResponse.json({ publishedDocs: flattenPublishedDocs(definition) });
  } catch (error) {
    console.error("Unpublish failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unpublish failed" }, { status: 400 });
  }
}
