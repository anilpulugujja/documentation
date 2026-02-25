import { NextResponse } from 'next/server';
import { z } from 'zod';

import { requireAuth } from '@/lib/auth';
import { listTemplates, readTemplate } from '@/lib/fs-utils';

const querySchema = z.object({
  id: z.string().optional(),
});

export async function GET(request: Request) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const result = querySchema.safeParse({
    id: searchParams.get('id') ?? undefined,
  });

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  if (result.data.id) {
    const content = await readTemplate(result.data.id);
    return NextResponse.json({ id: result.data.id, content });
  }

  const templates = await listTemplates();
  return NextResponse.json({ templates });
}
