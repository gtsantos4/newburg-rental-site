import './globals.css';
import { PROPERTY_CONFIG } from '@/lib/config';

export const metadata = {
  title: `${PROPERTY_CONFIG.name} — Furnished Rental`,
  description: PROPERTY_CONFIG.tagline,
  openGraph: {
    title: `${PROPERTY_CONFIG.name} — Furnished Rental`,
    description: PROPERTY_CONFIG.tagline,
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
