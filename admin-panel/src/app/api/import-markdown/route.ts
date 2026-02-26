import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import slugify from "slugify";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const SUPPORTED_EXTENSIONS = [".md", ".mdx"];
const REQUIRED_FIELDS: Array<keyof Frontmatter> = [
  "title",
  "description",
  "sidebar_label",
  "slug",
];

type Frontmatter = {
  title?: string;
  description?: string;
  sidebar_label?: string;
  slug?: string;
  tags?: string[] | string;
};

const inferTitle = (body: string) => {
  const headingMatch = body.match(/^#\s+(.+)$/m);
  if (headingMatch?.[1]) {
    return headingMatch[1].trim();
  }
  const firstSentence = body.split(/\r?\n/).find((line) => line.trim());
  return firstSentence?.slice(0, 80).trim();
};

const inferDescription = (body: string) => {
  const paragraphs = body
    .split(/\r?\n\r?\n/)
    .map((section) => section.replace(/[#>*`_\[\]]/g, "").trim())
    .filter(Boolean);
  return paragraphs[0]?.slice(0, 200);
};

const ensureLeadingSlash = (value: string) => {
  if (!value.startsWith("/")) {
    return `/${value.replace(/^\//, "")}`;
  }
  return value;
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: "Only .md or .mdx files can be imported." },
      { status: 400 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "File is empty." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File exceeds the 2 MB limit. Please split it into smaller sections." },
      { status: 400 },
    );
  }

  const text = await file.text();
  if (!text.trim()) {
    return NextResponse.json(
      { error: "File only contains whitespace. Please provide actual markdown content." },
      { status: 400 },
    );
  }

  const { data, content } = matter(text);
  const warnings: string[] = [];
  const normalizedFrontmatter: Frontmatter = { ...data };

  const inferredTitle = data.title || inferTitle(content) || "Imported Markdown Document";
  if (!data.title) {
    warnings.push("`title` missing in frontmatter. Set from the first heading.");
    normalizedFrontmatter.title = inferredTitle;
  }

  if (!data.sidebar_label) {
    warnings.push("`sidebar_label` missing. Defaulted to the title.");
    normalizedFrontmatter.sidebar_label = inferredTitle;
  }

  if (!data.description) {
    const description = inferDescription(content) || "Imported via admin panel.";
    warnings.push("`description` missing. Generated from the first paragraph.");
    normalizedFrontmatter.description = description;
  }

  const slugSource =
    data.slug ||
    slugify(inferredTitle || `doc-${Date.now()}`, { lower: true, strict: true }) ||
    `doc-${Date.now()}`;
  if (!data.slug) {
    warnings.push("`slug` missing. Generated from the title.");
  }
  normalizedFrontmatter.slug = ensureLeadingSlash(slugSource);

  REQUIRED_FIELDS.forEach((field) => {
    if (!normalizedFrontmatter[field]) {
      warnings.push(`\`${field}\` is required. Please review it before publishing.`);
    }
  });

  const filenameBase =
    slugify(inferredTitle || `doc-${Date.now()}`, { lower: true, strict: true }) ||
    `doc-${Date.now()}`;
  const suggestedFilename = `${filenameBase}.md`;

  return NextResponse.json({
    frontmatter: normalizedFrontmatter,
    body: content.trim(),
    warnings,
    filename: suggestedFilename,
  });
}
