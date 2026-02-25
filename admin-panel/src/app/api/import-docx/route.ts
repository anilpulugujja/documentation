import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import slugify from "slugify";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

const createTurndown = () => {
  const service = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });
  service.use(gfm);
  return service;
};

const extractTitle = (html: string, fallback: string) => {
  const headingMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (headingMatch?.[1]) {
    return headingMatch[1].replace(/<[^>]+>/g, "").trim();
  }
  return fallback;
};

const summarize = (markdown: string) => {
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  const snippet = lines[0]?.slice(0, 220) ?? "";
  return snippet;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".docx")) {
      return NextResponse.json(
        { error: "Only .docx files are supported at the moment." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 8 MB limit. Please compress or split the document." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    const turndown = createTurndown();
    const markdown = turndown.turndown(html).trim();

    const fallbackTitle = file.name.replace(/\.docx$/i, "").replace(/[-_]+/g, " ").trim() || "Imported Document";
    const title = extractTitle(html, fallbackTitle);
    const slugSegment =
      slugify(title || fallbackTitle || `doc-${Date.now()}`, {
        lower: true,
        strict: true,
      }) || `doc-${Date.now()}`;
    const slug = `/${slugSegment}`;
    const suggestedFilename = `${slugSegment}.md`;

    const description = summarize(markdown);

    return NextResponse.json({
      markdown,
      metadata: {
        title,
        sidebar_label: title,
        slug,
        filename: suggestedFilename,
        description,
      },
    });
  } catch (error) {
    console.error("DOCX import failed:", error);
    return NextResponse.json(
      { error: "Unable to convert the document. Please verify the file isn't corrupted." },
      { status: 500 },
    );
  }
}
