import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

import { ADMIN_JWT_SECRET, ADMIN_PASSWORD, SESSION_COOKIE } from './config';

const SESSION_TTL_SECONDS = 60 * 60 * 4; // 4 hours

export const validatePassword = (input: string) => {
  if (!ADMIN_PASSWORD) {
    throw new Error('ADMIN_PANEL_PASSWORD is not configured');
  }

  return input === ADMIN_PASSWORD;
};

export const createSessionToken = (email: string) => {
  return jwt.sign({ email }, ADMIN_JWT_SECRET, { expiresIn: SESSION_TTL_SECONDS });
};

export const verifySessionToken = (token: string) => {
  try {
    return jwt.verify(token, ADMIN_JWT_SECRET) as { email: string };
  } catch {
    return null;
  }
};

export const requireAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verifySessionToken(token);
};

export const setSessionCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
};

export const clearSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
};
