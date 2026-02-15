import { sql } from '@vercel/postgres';

/**
 * Check and enforce rate limiting using the database.
 *
 * @param {string} ip - Client IP address
 * @param {string} endpoint - Endpoint identifier (e.g. 'application-submit', 'admin-login')
 * @param {number} maxAttempts - Maximum allowed attempts in the window
 * @param {number} windowMinutes - Time window in minutes
 * @returns {{ limited: boolean, retryAfter?: number }}
 */
export async function checkRateLimit(ip, endpoint, maxAttempts, windowMinutes) {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

  // Count recent attempts
  const countResult = await sql`
    SELECT COUNT(*)::int as count
    FROM rate_limits
    WHERE ip_address = ${ip}
      AND endpoint = ${endpoint}
      AND attempt_at > ${windowStart.toISOString()};
  `;

  const count = countResult.rows[0]?.count || 0;

  if (count >= maxAttempts) {
    // Find the oldest attempt in the window to calculate retry-after
    const oldestResult = await sql`
      SELECT MIN(attempt_at) as oldest
      FROM rate_limits
      WHERE ip_address = ${ip}
        AND endpoint = ${endpoint}
        AND attempt_at > ${windowStart.toISOString()};
    `;

    const oldest = new Date(oldestResult.rows[0]?.oldest);
    const retryAfter = Math.ceil(
      (oldest.getTime() + windowMinutes * 60 * 1000 - Date.now()) / 1000
    );

    return { limited: true, retryAfter: Math.max(retryAfter, 1) };
  }

  // Record this attempt
  await sql`
    INSERT INTO rate_limits (ip_address, endpoint)
    VALUES (${ip}, ${endpoint});
  `;

  return { limited: false };
}

/**
 * Clean up old rate limit records (call periodically or on each request).
 * Removes records older than 1 hour.
 */
export async function cleanupOldRecords() {
  const cutoff = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
  await sql`
    DELETE FROM rate_limits
    WHERE attempt_at < ${cutoff.toISOString()};
  `;
}

/**
 * Get the client IP from a Next.js request.
 * Vercel sets x-forwarded-for; falls back to x-real-ip.
 */
export function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '0.0.0.0';
}
