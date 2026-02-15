'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2, RefreshCw } from 'lucide-react';
import AdminTable from '@/components/AdminTable';
import { PROPERTY_CONFIG } from '@/lib/config';

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({ all: 0, new: 0, reviewing: 0, approved: 0, rejected: 0 });
  const [activeFilter, setActiveFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = useCallback(async (status = null) => {
    setLoading(true);
    setError('');

    try {
      const url = status
        ? `/api/applications?status=${status}`
        : '/api/applications';

      const response = await fetch(url);

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();
      setApplications(data.applications);
      setCounts(data.counts);
    } catch (err) {
      setError('Unable to load applications. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchApplications(activeFilter);
  }, [activeFilter, fetchApplications]);

  const handleFilterChange = (status) => {
    setActiveFilter(status);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh data
      await fetchApplications(activeFilter);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }

      // Refresh data
      await fetchApplications(activeFilter);
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Logout anyway
    }
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold text-gray-900">Admin Dashboard</h1>
              <span className="text-sm text-gray-400 hidden sm:inline">
                {PROPERTY_CONFIG.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchApplications(activeFilter)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading && applications.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={() => fetchApplications(activeFilter)}
              className="text-navy font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <AdminTable
            applications={applications}
            counts={counts}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
