import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import slugify from "slugify";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB
const MIN_TEXT_CHARACTERS = 32;

const primaryMammothOptions: mammoth.Options = {
  includeEmbeddedStyleMap: true,
  styleMap: [
    "p[style-name='Title'] => h1:fresh",
    "p[style-name='Subtitle'] => h2:fresh",
    "p[style-name='Heading 1'] => h1:fresh",
    "p[style-name='Heading 2'] => h2:fresh",
    "p[style-name='Heading 3'] => h3:fresh",
  ],
};

const fallbackMammothOptions: mammoth.Options = {
  ...primaryMammothOptions,
  ignoreEmptyParagraphs: true,
};

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

const convertDocxToHtml = async (arrayBuffer: ArrayBuffer, fileName: string) => {
  try {
    return await mammoth.convertToHtml({ arrayBuffer }, primaryMammothOptions);
  } catch (primaryError) {
    logDocxError(fileName, primaryError, "primary");
    try {
      return await mammoth.convertToHtml({ arrayBuffer }, fallbackMammothOptions);
    } catch (fallbackError) {
      logDocxError(fileName, fallbackError, "fallback");
      throw fallbackError;
    }
  }
};

const normalizeErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message.split("\n")[0];
  }
  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }
  return "Unable to convert the document. Please verify the file isn't corrupted.";
};

const logDocxError = (fileName: string, error: unknown, phase: "primary" | "fallback") => {
  console.error(
    JSON.stringify({
      scope: "docx-import",
      phase,
      fileName,
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : String(error),
    }),
  );
};

const hasMinimumText = (markdown: string) => {
  const plain = markdown.replace(/[#>*_`\-\d]+/g, "").replace(/\s+/g, "");
  return plain.length >= MIN_TEXT_CHARACTERS;
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

    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 8 MB limit. Please compress or split the document." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const { value: html } = await convertDocxToHtml(arrayBuffer, file.name);
    const turndown = createTurndown();
    const markdown = turndown.turndown(html).trim();

    if (!hasMinimumText(markdown)) {
      return NextResponse.json(
        {
          error:
            "The converted file looks empty. Please ensure the document contains readable text before uploading.",
        },
        { status: 400 },
      );
    }

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
    return NextResponse.json(
      { error: normalizeErrorMessage(error) },
      { status: 500 },
    );
  }
}
