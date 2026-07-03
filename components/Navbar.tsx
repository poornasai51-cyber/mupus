'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, Settings } from 'lucide-react';

interface NavbarProps {
  whatsappNumber: string;
}

export default function Navbar({ whatsappNumber }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Mupu's Travel! I'm interested in your trips.")}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start">
            <span
              className={`font-['Bebas_Neue'] text-3xl tracking-wider transition-all duration-300 ${
                isScrolled ? 'text-brand-secondary' : 'text-white'
              } group-hover:text-brand-primary`}
              style={{
                textShadow: isScrolled ? 'none' : '2px 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              MUPU&apos;S
            </span>
            <span
              className={`text-xs tracking-[0.3em] uppercase font-bold transition-colors ${
                isScrolled ? 'text-teal-600' : 'text-teal-200'
              }`}
            >
              Travel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#trips"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'text-brand-text hover:bg-teal-50'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              Trips
            </Link>
            <Link
              href="#about"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'text-brand-text hover:bg-teal-50'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              About
            </Link>
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? 'text-brand-primary hover:bg-teal-50'
                  : 'text-teal-300 hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-1" />
              Admin
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                isScrolled
                  ? 'bg-teal-500 text-white hover:bg-teal-600 shadow-md'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <Link
              href="#trips"
              className="ml-2 btn-primary text-sm px-5 py-2"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-brand-text' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-teal-200/30 pt-4">
            <div className="flex flex-col gap-2">
              <Link
                href="#trips"
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isScrolled
                    ? 'text-brand-text hover:bg-teal-50'
                    : 'text-white/90 hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trips
              </Link>
              <Link
                href="#about"
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isScrolled
                    ? 'text-brand-text hover:bg-teal-50'
                    : 'text-white/90 hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/admin"
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isScrolled
                    ? 'text-brand-primary hover:bg-teal-50'
                    : 'text-teal-300 hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn justify-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <Link
                href="#trips"
                className="btn-primary text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
