'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Calendar, MessageCircle } from 'lucide-react';
import type { Trip } from '@/lib/supabase';

interface TripCardProps {
  trip: Trip;
  whatsappNumber: string;
  onBook?: (trip: Trip) => void;
}

export default function TripCard({ trip, whatsappNumber, onBook }: TripCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Mupu's Travel! I'm interested in the ${trip.name} trip.`
  )}`;

  // Pexels travel images for cover
  const defaultCover = 'https://images.pexels.com/photos/176975/pexels-photo-176975.jpeg?auto=compress&cs=tinysrgb&w=800';
  const coverImage = trip.cover_image_url || defaultCover;

  return (
    <div
      className={`group relative glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_16px_48px_rgba(20,184,166,0.2)] ${
        trip.sold_out ? 'opacity-60' : ''
      }`}
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={coverImage}
          alt={trip.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Sold Out Badge */}
        {trip.sold_out && (
          <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
            Sold Out
          </div>
        )}

        {/* Destination Badge */}
        {trip.destination && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
            <MapPin className="w-3 h-3" />
            {trip.destination}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Description */}
        <h3 className="font-display text-xl font-bold text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
          {trip.name}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {trip.short_description || trip.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trip.duration && (
            <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-xs px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              {trip.duration}
            </span>
          )}
          {trip.group_size && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full">
              <Users className="w-3 h-3" />
              {trip.group_size}
            </span>
          )}
        </div>

        {/* Highlights */}
        {trip.highlights && trip.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {trip.highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
              >
                ✓ {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Price & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wide">From</span>
            <p className="text-xl font-['Bebas_Neue'] tracking-wide text-gradient">
              ₹{trip.price.toLocaleString('en-IN')}
              <span className="text-sm font-sans text-slate-500">/person</span>
            </p>
          </div>

          <div className="flex gap-2">
            {!trip.sold_out && (
              <>
                <Link
                  href={`/trips/${trip.id}`}
                  className="btn-primary text-sm px-4 py-2"
                >
                  View
                </Link>
                <button
                  onClick={() => onBook?.(trip)}
                  className="btn-secondary text-sm px-4 py-2 hidden sm:block"
                >
                  Book
                </button>
              </>
            )}
            {trip.sold_out && (
              <span className="text-sm text-red-500 font-medium bg-red-50 px-3 py-2 rounded-full">
                Next batch soon
              </span>
            )}
          </div>
        </div>

        {/* WhatsApp Quick Enquiry */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium py-2 border border-dashed border-teal-200 rounded-lg hover:bg-teal-50 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          Quick Enquiry via WhatsApp
        </a>
      </div>
    </div>
  );
}
