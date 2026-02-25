import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ADMIN_EMAIL } from '@/lib/config';
import { createSessionToken, setSessionCookie, validatePassword } from '@/lib/auth';

const schema = z.object({
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const isValid = validatePassword(parsed.data.password);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createSessionToken(ADMIN_EMAIL);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
