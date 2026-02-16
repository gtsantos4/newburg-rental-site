'use client';

import { useState } from 'react';
import { Bed, Bath, Maximize, ChevronLeft, ChevronRight, Home } from 'lucide-react';

function AvailabilityBadge({ availability, availableDate }) {
  const styles = {
    available: 'bg-emerald-100 text-emerald-700',
    'coming-soon': 'bg-accent-100 text-accent-700',
    occupied: 'bg-gray-100 text-gray-500',
  };

  const labels = {
    available: 'Available Now',
    'coming-soon': `Available ${availableDate || 'Soon'}`,
    occupied: 'Currently Occupied',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
        styles[availability] || styles.available
      }`}
    >
      {labels[availability] || 'Available'}
    </span>
  );
}

export default function UnitCard({ unit }) {
  const [imageIndex, setImageIndex] = useState(0);
  const hasMultipleImages = unit.images && unit.images.length > 1;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {/* Placeholder — replace with actual images */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <Home className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">
              [REPLACE: {unit.name} Photo {imageIndex + 1}]
            </p>
          </div>
        </div>
        {/*
          When you have real images, replace the placeholder div above with:
          <img
            src={unit.images[imageIndex]}
            alt={`${unit.name} photo ${imageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        */}

        {/* Image Navigation */}
        {hasMultipleImages && (
          <>
            <button
              onClick={() =>
                setImageIndex((prev) =>
                  prev === 0 ? unit.images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() =>
                setImageIndex((prev) =>
                  prev === unit.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {unit.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <AvailabilityBadge
            availability={unit.availability}
            availableDate={unit.availableDate}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{unit.name}</h3>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {unit.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> {unit.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="w-4 h-4" /> {unit.sqft} sqft
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-1.5 mb-4 flex-grow">
          {unit.features.map((feature, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-accent mt-1.5 flex-shrink-0">&#8226;</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-2xl font-bold text-navy">{unit.price}</p>
          <p className="text-sm text-gray-500">/month &middot; {unit.includes}</p>
        </div>

        {/* CTA */}
        <a
          href={`/apply?unit=${unit.id}`}
          className="mt-4 block text-center bg-navy text-white py-2.5 rounded-lg font-medium hover:bg-navy-dark transition-colors"
        >
          Apply for This Unit
        </a>
      </div>
    </div>
  );
}
