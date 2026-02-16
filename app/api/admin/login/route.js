import { NextResponse } from 'next/server';
import { verifyPassword, createSession, setSessionCookie } from '@/lib/auth';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

// POST /api/admin/login
export async function POST(request) {
  try {
    // Rate limiting: 5 attempts per 15 minutes per IP
    const ip = getClientIP(request);
    const rateCheck = await checkRateLimit(ip, 'admin-login', 5, 15);
    if (rateCheck.limited) {
      return NextResponse.json(
        { error: 'Too many login attempts. Try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = verifyPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createSession();
    const response = NextResponse.json({ success: true });
    setSessionCookie(response, token);

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
