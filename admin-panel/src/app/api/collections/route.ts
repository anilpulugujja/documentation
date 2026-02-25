import { NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import { getCollections } from '@/lib/fs-utils';

export async function GET() {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const collections = getCollections().map(
    ({ id, label, version, product, relativePath }) => ({
      id,
      label,
      version,
      product,
      relativePath,
    }),
  );
  return NextResponse.json({ collections });
}
