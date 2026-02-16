import { PROPERTY_CONFIG } from '@/lib/config';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Property Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {PROPERTY_CONFIG.name}
            </h3>
            <p className="text-gray-400 text-sm">{PROPERTY_CONFIG.address}</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <div className="space-y-2">
              <a
                href={`mailto:${PROPERTY_CONFIG.email}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {PROPERTY_CONFIG.email}
              </a>
              <a
                href={`tel:${PROPERTY_CONFIG.phone}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {PROPERTY_CONFIG.phone}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-3">Quick Links</h4>
            <div className="space-y-2">
              <a href="#units" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Available Units
              </a>
              <a href="#faq" className="block text-sm text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="/apply" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Apply Now
              </a>
            </div>
          </div>
        </div>

        {/* Fair Housing Notice */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            We are committed to compliance with all federal, state, and local fair
            housing laws. We do not discriminate against any person because of race,
            color, religion, national origin, sex, familial status, disability, or any
            other specific classes protected by applicable laws.
          </p>
        </div>
      </div>
    </footer>
  );
}
