import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { requireAuth } from "@/lib/auth";
import { readSidebar, flattenPublishedDocs } from "@/lib/sidebar";

const querySchema = z.object({
  collectionId: z.string().min(1),
});

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parseResult = querySchema.safeParse({
    collectionId: request.nextUrl.searchParams.get("collectionId"),
  });

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  try {
    const { definition } = await readSidebar(parseResult.data.collectionId);
    const publishedDocs = flattenPublishedDocs(definition);
    return NextResponse.json({
      sidebarId: definition.sidebarId,
      sections: definition.sections,
      publishedDocs,
    });
  } catch (error) {
    console.error("Unable to load sidebar", error);
    return NextResponse.json({ error: "Sidebar not found" }, { status: 404 });
  }
}
