import { PROPERTY_CONFIG } from '@/lib/config';

export default function Hero() {
  return (
    <section className="relative min-h-[500px] h-[70vh] flex items-center justify-center bg-gray-800">
      {/* Background image placeholder — replace with actual hero image */}
      {/* When you have a real image, use next/image with fill and priority */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/80 to-navy/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
          {PROPERTY_CONFIG.name}
        </h1>
        <p className="text-lg md:text-xl text-gray-100 leading-relaxed mb-8">
          {PROPERTY_CONFIG.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#units"
            className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-amber-500 transition-colors"
          >
            View Available Units
          </a>
          <a
            href="/apply"
            className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors"
          >
            Apply Now
          </a>
        </div>
      </div>
    </section>
  );
}
