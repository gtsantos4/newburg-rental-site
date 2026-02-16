'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PROPERTY_CONFIG } from '@/lib/config';

const navLinks = [
  { label: 'Location', href: '#location' },
  { label: 'Property', href: '#property' },
  { label: 'Units', href: '#units' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Apply', href: '#apply' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Property Name */}
          <a href="#" className="font-semibold text-navy text-lg">
            {PROPERTY_CONFIG.name}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-navy border-b-2 border-amber-500 pb-0.5'
                    : 'text-gray-700 hover:text-navy'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/apply"
              className="bg-amber-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-amber-500 transition-colors"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="block text-gray-700 hover:text-navy font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/apply"
              onClick={handleNavClick}
              className="block bg-amber-600 text-white text-center px-5 py-2.5 rounded-lg font-medium hover:bg-amber-500 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
