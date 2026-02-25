import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAuth } from '@/lib/auth';
import { readTree } from '@/lib/fs-utils';

const querySchema = z.object({
  collectionId: z.string().min(1),
  path: z.string().optional().default(''),
});

export async function GET(request: Request) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parseResult = querySchema.safeParse({
    collectionId: searchParams.get('collectionId'),
    path: searchParams.get('path') ?? '',
  });

  if (!parseResult.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  const nodes = await readTree(parseResult.data.collectionId, parseResult.data.path);
  return NextResponse.json({ nodes });
}
