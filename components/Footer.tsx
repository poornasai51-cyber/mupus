'use client';

import Link from 'next/link';
import { MessageCircle, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  whatsappNumber: string;
}

export default function Footer({ whatsappNumber }: FooterProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Mupu's Travel! I'd like to know more about your trips.")}`;
  const formattedPhone = whatsappNumber.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');

  return (
    <footer className="bg-gradient-to-b from-teal-900 to-teal-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-['Bebas_Neue'] text-3xl tracking-wide bg-gradient-to-r from-teal-200 to-teal-400 bg-clip-text text-transparent">
                MUPU&apos;S
              </span>
              <span className="block text-xs tracking-[0.3em] uppercase text-teal-400 font-bold">
                Travel & Trails
              </span>
            </div>
            <p className="text-teal-200/80 text-sm leading-relaxed">
              Curated weekend escapes to misty forests and spice gardens — small groups,
              real adventures, every weekend from Bengaluru.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-teal-100 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="#trips" className="block text-teal-300/80 hover:text-teal-200 transition-colors text-sm">
                Weekend Trips
              </Link>
              <Link href="#about" className="block text-teal-300/80 hover:text-teal-200 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/admin" className="block text-teal-300/80 hover:text-teal-200 transition-colors text-sm">
                Admin Portal
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal-300/80 hover:text-teal-200 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-teal-100 mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href={`tel:${whatsappNumber}`}
                className="flex items-center gap-2 text-teal-300/80 hover:text-teal-200 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {formattedPhone}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-teal-300/80 hover:text-teal-200 transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Business
              </a>
              <div className="flex items-center gap-2 text-teal-300/80 text-sm">
                <MapPin className="w-4 h-4" />
                Bengaluru, Karnataka
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all shadow-lg shadow-green-500/30"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-teal-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-teal-400 text-sm">
              Bookings close every Friday · Bengaluru, Karnataka
            </p>
            <p className="text-teal-500 text-xs">
              © 2025 Mupu&apos;s Travel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
