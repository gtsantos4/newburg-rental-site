import { NextResponse } from 'next/server';
import {
  getApplication,
  updateApplicationStatus,
  deleteApplication,
} from '@/lib/db';

// GET /api/applications/:id — Get single application (admin, auth checked by middleware)
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const application = await getApplication(id);

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/applications/:id — Update status (admin, auth checked by middleware)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ['new', 'reviewing', 'approved', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const updated = await updateApplicationStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ application: updated });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/applications/:id — Delete application (admin, auth checked by middleware)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deleted = await deleteApplication(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
