'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Users,
  Utensils,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { getTripById, getTripImages, getSettings, type Trip, type TripImage, type TripSettings } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import BookingModal from '@/components/BookingModal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TripDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [images, setImages] = useState<TripImage[]>([]);
  const [settings, setSettings] = useState<TripSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tripData, imagesData, settingsData] = await Promise.all([
          getTripById(id),
          getTripImages(id),
          getSettings(),
        ]);
        setTrip(tripData);
        setImages(imagesData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Failed to fetch trip:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Trip not found</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  const whatsappNumber = settings?.whatsapp_number || '919999999999';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Mupu's Travel! I'm interested in the ${trip.name} trip.`
  )}`;

  const defaultCover = 'https://images.pexels.com/photos/176975/pexels-photo-176975.jpeg?auto=compress&cs=tinysrgb&w=1200';
  const coverImage = trip.cover_image_url || defaultCover;
  const allImages = images.length > 0 ? images.map(img => img.image_url) : [coverImage];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar whatsappNumber={whatsappNumber} />

      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh] pt-16">
        <Image
          src={allImages[currentImageIndex]}
          alt={trip.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-20 left-4 md:left-8 flex items-center gap-2 text-white/80 hover:text-white bg-black/30 backdrop-blur-md px-4 py-2 rounded-full transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Image Navigation */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 bottom-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 bottom-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-8 left-4 md:left-8 right-4 md:right-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {trip.destination && (
                <span className="inline-flex items-center gap-1 bg-teal-500/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />
                  {trip.destination}
                </span>
              )}
              {trip.sold_out && (
                <span className="bg-red-500/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-semibold">
                  Sold Out
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white">
              {trip.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meta Cards */}
            <div className="glass-card rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trip.duration && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Duration</p>
                      <p className="font-semibold text-brand-text">{trip.duration}</p>
                    </div>
                  </div>
                )}
                {trip.group_size && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Group Size</p>
                      <p className="font-semibold text-brand-text">{trip.group_size}</p>
                    </div>
                  </div>
                )}
                {trip.meals && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Meals</p>
                      <p className="font-semibold text-brand-text">{trip.meals}</p>
                    </div>
                  </div>
                )}
                {trip.available_seats && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Seats</p>
                      <p className="font-semibold text-brand-text">{trip.available_seats} left</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-brand-text mb-4">
                About This Trip
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {trip.description || trip.short_description}
              </p>
            </div>

            {/* Highlights */}
            {trip.highlights && trip.highlights.length > 0 && (
              <div className="glass-card rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-brand-text mb-4">
                  Trip Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {trip.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-teal-50 rounded-lg p-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-brand-text font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {trip.itinerary && Array.isArray(trip.itinerary) && trip.itinerary.length > 0 && (
              <div className="glass-card rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-brand-text mb-6">
                  Itinerary
                </h2>
                <div className="space-y-4">
                  {trip.itinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative pl-8 pb-6 border-l-2 border-teal-200 last:pb-0"
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold">
                        {item.day || idx + 1}
                      </div>
                      <h3 className="font-semibold text-brand-text mb-1">
                        {item.title || `Day ${item.day || idx + 1}`}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {item.description}
                      </p>
                      {item.activities && item.activities.length > 0 && (
                        <ul className="mt-2 text-sm text-slate-500 space-y-1">
                          {item.activities.map((activity: string, actIdx: number) => (
                            <li key={actIdx}>• {activity}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 sticky top-20">
              <h2 className="font-display text-xl font-bold text-brand-text mb-4">
                Pricing
              </h2>

              <div className="mb-6">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  From
                </p>
                <p className="text-4xl font-['Bebas_Neue'] tracking-wide text-gradient">
                  ₹{trip.price.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-slate-500">per person</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Transportation included
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Accommodation included
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500" />
                  {trip.meals || 'Meals as per itinerary'}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500" />
                  Expert local guide
                </div>
              </div>

              {!trip.sold_out ? (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary w-full justify-center mb-3"
                  >
                    Book Now
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn w-full justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enquire on WhatsApp
                  </a>
                </>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-600 font-semibold">Sold Out</p>
                  <p className="text-sm text-red-500 mt-1">Next batch coming soon</p>
                </div>
              )}

              <p className="text-xs text-slate-500 mt-4 text-center">
                ⏰ {settings?.booking_deadline_text || 'Bookings close this Friday'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {images.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h2 className="font-display text-xl font-bold text-brand-text mb-4">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentImageIndex(idx)}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={img.image_url}
                  alt={img.caption || `${trip.name} - Photo ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <Footer whatsappNumber={whatsappNumber} />
      </div>
      <FloatingWhatsApp whatsappNumber={whatsappNumber} />

      <BookingModal
        trip={trip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </main>
  );
}
