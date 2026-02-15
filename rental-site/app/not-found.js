import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded-lg font-medium hover:bg-navy-dark transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </a>
      </div>
    </div>
  );
}
