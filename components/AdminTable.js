'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Briefcase,
  Home,
  Phone,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const statusOptions = ['new', 'reviewing', 'approved', 'rejected'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
}

function ApplicationDetail({ app, onStatusChange, onDelete }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setStatusLoading(true);
    await onStatusChange(app.id, newStatus);
    setStatusLoading(false);
  };

  return (
    <div className="bg-gray-50 border-t border-gray-200 p-4 md:p-6">
      {/* Status Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">Status:</span>
        <select
          value={app.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={statusLoading}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-navy/20 focus:border-navy"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <div className="ml-auto">
          {deleteConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600">Delete this application?</span>
              <button
                onClick={() => onDelete(app.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-500"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="text-red-600 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors"
              title="Delete application"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">Contact Information</h4>
          </div>
          <div className="space-y-3 pl-6">
            <DetailRow label="Name" value={`${app.first_name} ${app.last_name}`} />
            <DetailRow label="Email" value={app.email} />
            <DetailRow label="Phone" value={app.phone} />
          </div>
        </div>

        {/* Unit & Move-In */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">Unit &amp; Move-In</h4>
          </div>
          <div className="space-y-3 pl-6">
            <DetailRow label="Unit Preference" value={app.unit_preference || 'No preference'} />
            <DetailRow
              label="Move-In Date"
              value={app.move_in_date ? formatDate(app.move_in_date) : 'Not specified'}
            />
            <DetailRow label="Lease Length" value={app.lease_length || 'Not specified'} />
          </div>
        </div>

        {/* Employment */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">Employment</h4>
          </div>
          <div className="space-y-3 pl-6">
            <DetailRow label="Employer" value={app.employer || 'Not provided'} />
            <DetailRow label="Monthly Income" value={app.monthly_income || 'Not provided'} />
          </div>
        </div>

        {/* Current Housing */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">Current Housing</h4>
          </div>
          <div className="space-y-3 pl-6">
            <DetailRow label="Current Address" value={app.current_address || 'Not provided'} />
            <DetailRow label="Landlord" value={app.landlord_name || 'Not provided'} />
            <DetailRow label="Landlord Phone" value={app.landlord_phone || 'Not provided'} />
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <h4 className="text-sm font-semibold text-gray-700">Emergency Contact</h4>
          </div>
          <div className="space-y-3 pl-6">
            <DetailRow label="Name" value={app.emergency_contact_name || 'Not provided'} />
            <DetailRow label="Phone" value={app.emergency_contact_phone || 'Not provided'} />
          </div>
        </div>

        {/* Notes */}
        {app.additional_notes && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-gray-500" />
              <h4 className="text-sm font-semibold text-gray-700">Additional Notes</h4>
            </div>
            <p className="text-sm text-gray-700 pl-6 whitespace-pre-wrap">
              {app.additional_notes}
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-6 pt-3 border-t border-gray-200">
        Submitted {formatDate(app.created_at)}
      </p>
    </div>
  );
}

export default function AdminTable({
  applications,
  counts,
  activeFilter,
  onFilterChange,
  onStatusChange,
  onDelete,
}) {
  const [expandedId, setExpandedId] = useState(null);

  const filters = [
    { key: null, label: 'All', count: counts.all, icon: null },
    { key: 'new', label: 'New', count: counts.new, icon: Clock },
    { key: 'reviewing', label: 'Reviewing', count: counts.reviewing, icon: Search },
    { key: 'approved', label: 'Approved', count: counts.approved, icon: CheckCircle },
    { key: 'rejected', label: 'Rejected', count: counts.rejected, icon: XCircle },
  ];

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key || 'all'}
            onClick={() => onFilterChange(f.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === f.key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              } ${f.key === 'new' && f.count > 0 && activeFilter !== 'new' ? '!bg-blue-500 !text-white' : ''}`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">
            {activeFilter
              ? `No ${activeFilter} applications`
              : 'No applications yet'}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Applications will appear here when tenants submit them.
          </p>
        </div>
      )}

      {/* Desktop Table */}
      {applications.length > 0 && (
        <>
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                    Name
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                    Unit
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                    Submitted
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td colSpan="5" className="p-0">
                      <div>
                        <div
                          className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                            expandedId === app.id ? 'bg-gray-50' : ''
                          }`}
                          onClick={() =>
                            setExpandedId(expandedId === app.id ? null : app.id)
                          }
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {app.first_name} {app.last_name}
                            </p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600">
                              {app.unit_preference || 'No preference'}
                            </p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600">
                              {formatDate(app.created_at)}
                            </p>
                          </div>
                          <div className="flex-1 min-w-0">
                            <StatusBadge status={app.status} />
                          </div>
                          <div className="flex-shrink-0 text-gray-400">
                            {expandedId === app.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                        {expandedId === app.id && (
                          <ApplicationDetail
                            app={app}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === app.id ? null : app.id)
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {app.first_name} {app.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {app.unit_preference || 'No preference'}
                      </p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {formatDate(app.created_at)}
                    </p>
                    {expandedId === app.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
                {expandedId === app.id && (
                  <ApplicationDetail
                    app={app}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
