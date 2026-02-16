'use client';

import { useState } from 'react';
import { PROPERTY_CONFIG } from '@/lib/config';
import {
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  Car,
  Snowflake,
  Tv,
  Home,
  X,
} from 'lucide-react';

const iconMap = {
  Wifi,
  UtensilsCrossed,
  WashingMachine,
  Car,
  Snowflake,
  Tv,
};

export default function PropertySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="property" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-2">
            The Property
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Home Away From Home
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Description */}
          <div className="md:w-1/2">
            <div className="prose prose-gray max-w-none">
              {PROPERTY_CONFIG.description.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Amenities Grid */}
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              Shared Amenities
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {PROPERTY_CONFIG.sharedAmenities.map((amenity, i) => {
                const Icon = iconMap[amenity.icon] || Home;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <Icon className="w-5 h-5 text-navy flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {amenity.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floor Plan */}
          <div className="md:w-1/2">
            <div
              className="bg-gray-100 rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setLightboxOpen(true)}
            >
              {/* Placeholder for floor plan image */}
              <div className="aspect-[4/3] flex items-center justify-center bg-gray-100">
                <div className="text-center p-8">
                  <Home className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    [REPLACE: Floor Plan Image]
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Add floorplan.png to /public/images/
                  </p>
                  <p className="text-accent text-sm mt-3 font-medium">
                    Click to enlarge
                  </p>
                </div>
              </div>
              {/*
                When you have a real floor plan image, replace the div above with:
                <img
                  src="/images/floorplan.png"
                  alt="Floor plan"
                  className="w-full h-auto"
                />
              */}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Replace with actual floor plan image */}
            <div className="aspect-[4/3] flex items-center justify-center bg-gray-100">
              <div className="text-center p-8">
                <Home className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-lg">
                  [REPLACE: Floor Plan Image — Full Size]
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
