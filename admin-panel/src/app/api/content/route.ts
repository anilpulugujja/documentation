import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAuth } from '@/lib/auth';
import { fileExists, readFile, readTemplate, serializeDoc, writeFile } from '@/lib/fs-utils';

const getSchema = z.object({
  collectionId: z.string().min(1),
  path: z.string().min(1),
});

const writeSchema = z.object({
  collectionId: z.string().min(1),
  path: z.string().min(1),
  frontmatter: z.record(z.string(), z.any()),
  content: z.string().optional(),
});

const createSchema = writeSchema.extend({
  templateId: z.string().optional(),
  overwrite: z.boolean().optional(),
});

export async function GET(request: Request) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parseResult = getSchema.safeParse({
    collectionId: searchParams.get('collectionId'),
    path: searchParams.get('path'),
  });

  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  const doc = await readFile(parseResult.data.collectionId, parseResult.data.path);
  return NextResponse.json(doc);
}

export async function PUT(request: Request) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parseResult = writeSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const bodyContent = parseResult.data.content ?? '';
  const serialized = serializeDoc(parseResult.data.frontmatter, bodyContent);
  await writeFile(parseResult.data.collectionId, parseResult.data.path, serialized);

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parseResult = createSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const exists = await fileExists(parseResult.data.collectionId, parseResult.data.path);
  if (exists && !parseResult.data.overwrite) {
    return NextResponse.json({ error: 'File already exists' }, { status: 409 });
  }

  let bodyContent = parseResult.data.content ?? '';
  if (!bodyContent && parseResult.data.templateId) {
    bodyContent = await readTemplate(parseResult.data.templateId);
  }

  const serialized = serializeDoc(parseResult.data.frontmatter, bodyContent);
  await writeFile(parseResult.data.collectionId, parseResult.data.path, serialized);

  return NextResponse.json({ ok: true });
}
