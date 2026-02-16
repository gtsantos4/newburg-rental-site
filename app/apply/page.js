import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import ApplicationForm from '@/components/ApplicationForm';
import { PROPERTY_CONFIG } from '@/lib/config';

export const metadata = {
  title: `Apply — ${PROPERTY_CONFIG.name}`,
  description: 'Submit your rental application online.',
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-navy transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Property Info
          </a>
        </div>
      </header>

      {/* Page Content */}
      <main className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Rental Application
          </h1>
          <p className="text-gray-500">
            Fill out the form below to apply for a unit at {PROPERTY_CONFIG.name}.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
          <ApplicationForm />
        </Suspense>
      </main>
    </div>
  );
}
