import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'session';
const SESSION_MAX_AGE = 86400; // 24 hours in seconds

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

// Constant-time password comparison
export function verifyPassword(input) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD environment variable is not set');
  }

  const inputBuffer = Buffer.from(input);
  const passwordBuffer = Buffer.from(adminPassword);

  if (inputBuffer.length !== passwordBuffer.length) {
    // Still do a comparison to avoid timing attacks on length
    crypto.timingSafeEqual(
      Buffer.alloc(32, inputBuffer),
      Buffer.alloc(32, passwordBuffer)
    );
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, passwordBuffer);
}

// Create a signed JWT session token
export async function createSession() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());

  return token;
}

// Verify a session token
export async function verifySession(token) {
  try {
    await jwtVerify(token, getSecret());
    return { valid: true };
  } catch {
    return { valid: false };
  }
}

// Get session token from cookies (for use in Route Handlers)
export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  return sessionCookie?.value || null;
}

// Set session cookie on a NextResponse
export function setSessionCookie(response, token) {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return response;
}

// Clear session cookie on a NextResponse
export function clearSessionCookie(response) {
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}

// Check if current request is authenticated (for Route Handlers)
export async function isAuthenticated() {
  const token = await getSessionFromCookies();
  if (!token) return false;
  const { valid } = await verifySession(token);
  return valid;
}
