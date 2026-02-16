import { sql } from '@vercel/postgres';

// Initialize database tables (run once on first deploy via /api/init)
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      unit_preference VARCHAR(100),
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      move_in_date DATE,
      lease_length VARCHAR(50),
      employer VARCHAR(200),
      monthly_income VARCHAR(50),
      current_address TEXT,
      landlord_name VARCHAR(200),
      landlord_phone VARCHAR(20),
      emergency_contact_name VARCHAR(200),
      emergency_contact_phone VARCHAR(20),
      additional_notes TEXT,
      status VARCHAR(20) DEFAULT 'new',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at);
  `;

  // Rate limiting table
  await sql`
    CREATE TABLE IF NOT EXISTS rate_limits (
      id SERIAL PRIMARY KEY,
      ip_address VARCHAR(45) NOT NULL,
      endpoint VARCHAR(100) NOT NULL,
      attempt_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
    ON rate_limits(ip_address, endpoint, attempt_at);
  `;
}

// Create a new application
export async function createApplication(data) {
  const result = await sql`
    INSERT INTO applications (
      unit_preference, first_name, last_name, email, phone,
      move_in_date, lease_length, employer, monthly_income,
      current_address, landlord_name, landlord_phone,
      emergency_contact_name, emergency_contact_phone, additional_notes
    ) VALUES (
      ${data.unit_preference || null},
      ${data.first_name},
      ${data.last_name},
      ${data.email},
      ${data.phone || null},
      ${data.move_in_date || null},
      ${data.lease_length || null},
      ${data.employer || null},
      ${data.monthly_income || null},
      ${data.current_address || null},
      ${data.landlord_name || null},
      ${data.landlord_phone || null},
      ${data.emergency_contact_name || null},
      ${data.emergency_contact_phone || null},
      ${data.additional_notes || null}
    )
    RETURNING *;
  `;
  return result.rows[0];
}

// Get all applications, optionally filtered by status
export async function getApplications(status = null) {
  if (status) {
    const result = await sql`
      SELECT * FROM applications
      WHERE status = ${status}
      ORDER BY created_at DESC;
    `;
    return result.rows;
  }
  const result = await sql`
    SELECT * FROM applications ORDER BY created_at DESC;
  `;
  return result.rows;
}

// Get a single application by ID
export async function getApplication(id) {
  const result = await sql`
    SELECT * FROM applications WHERE id = ${parseInt(id, 10)};
  `;
  return result.rows[0] || null;
}

// Update application status
export async function updateApplicationStatus(id, status) {
  const validStatuses = ['new', 'reviewing', 'approved', 'rejected'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }
  const result = await sql`
    UPDATE applications
    SET status = ${status}
    WHERE id = ${parseInt(id, 10)}
    RETURNING *;
  `;
  return result.rows[0] || null;
}

// Delete an application
export async function deleteApplication(id) {
  const result = await sql`
    DELETE FROM applications
    WHERE id = ${parseInt(id, 10)}
    RETURNING id;
  `;
  return result.rows[0] || null;
}

// Get counts by status (for dashboard badges)
export async function getStatusCounts() {
  const result = await sql`
    SELECT status, COUNT(*)::int as count
    FROM applications
    GROUP BY status;
  `;
  // Return as object: { new: 5, reviewing: 2, ... }
  const counts = { new: 0, reviewing: 0, approved: 0, rejected: 0 };
  result.rows.forEach((row) => {
    counts[row.status] = row.count;
  });
  counts.all = Object.values(counts).reduce((a, b) => a + b, 0);
  return counts;
}
