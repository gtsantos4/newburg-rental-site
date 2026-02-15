import { NextResponse } from 'next/server';
import { createApplication, getApplications, getStatusCounts } from '@/lib/db';
import { validateApplication, sanitizeApplication } from '@/lib/validation';
import { checkRateLimit, cleanupOldRecords, getClientIP } from '@/lib/rate-limit';

// POST /api/applications — Submit a new application (public)
export async function POST(request) {
  try {
    // Rate limiting: 3 submissions per hour per IP
    const ip = getClientIP(request);
    const rateCheck = await checkRateLimit(ip, 'application-submit', 3, 60);
    if (rateCheck.limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate
    const { valid, errors } = validateApplication(body);
    if (!valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Sanitize and create
    const sanitized = sanitizeApplication(body);
    await createApplication(sanitized);

    // Periodically clean up old rate limit records
    cleanupOldRecords().catch(() => {});

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/applications — List all applications (admin, auth checked by middleware)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const validStatuses = ['new', 'reviewing', 'approved', 'rejected'];
    const filterStatus = validStatuses.includes(status) ? status : null;

    const applications = await getApplications(filterStatus);
    const counts = await getStatusCounts();

    return NextResponse.json({ applications, counts });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
