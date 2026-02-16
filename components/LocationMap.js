'use client';

import { useEffect, useRef } from 'react';
import { PROPERTY_CONFIG } from '@/lib/config';
import { MapPin, Train, ShoppingCart, Building2, UtensilsCrossed } from 'lucide-react';

const typeIcons = {
  hospital: Building2,
  transit: Train,
  grocery: ShoppingCart,
  entertainment: UtensilsCrossed,
};

export default function LocationMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    if (typeof window === 'undefined' || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const { lat, lng } = PROPERTY_CONFIG.coordinates;

      const map = L.map(mapRef.current).setView([lat, lng], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Property marker (accent/home icon)
      const propertyIcon = L.divIcon({
        html: `<div style="background:#4a7c59;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        </div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      L.marker([lat, lng], { icon: propertyIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${PROPERTY_CONFIG.name}</strong><br/>${PROPERTY_CONFIG.address}`
        );

      // Nearby place markers (gray pin)
      const placeIcon = L.divIcon({
        html: `<div style="background:#6b7280;width:24px;height:24px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
      });

      const bounds = L.latLngBounds([[lat, lng]]);

      PROPERTY_CONFIG.nearbyPlaces.forEach((place) => {
        if (place.lat != null && place.lng != null) {
          const marker = L.marker([place.lat, place.lng], { icon: placeIcon })
            .addTo(map)
            .bindPopup(
              `<strong>${place.name}</strong><br/>${place.address || ''}`
            );
          bounds.extend([place.lat, place.lng]);
        }
      });

      // Fit map to show all markers with padding
      if (PROPERTY_CONFIG.nearbyPlaces.some((p) => p.lat != null)) {
        map.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 });
      }

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="location" className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-2">
            Location
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Perfectly Located
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Convenient access to hospitals, transit, shopping, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map */}
          <div className="h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div ref={mapRef} className="h-full w-full" />
          </div>

          {/* Nearby Places */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {PROPERTY_CONFIG.address}
            </h3>
            <p className="text-gray-500 mb-6">What&apos;s nearby:</p>

            <div className="space-y-4">
              {PROPERTY_CONFIG.nearbyPlaces.map((place, i) => {
                const Icon = typeIcons[place.type] || MapPin;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{place.name}</p>
                      {place.address && (
                        <p className="text-sm text-gray-500">{place.address}</p>
                      )}
                      <p className="text-sm text-gray-400">{place.distance}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
