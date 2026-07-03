'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TripCard from '@/components/TripCard';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Stats from '@/components/Stats';
import { getTrips, getSettings, type Trip, type TripSettings } from '@/lib/supabase';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settings, setSettings] = useState<TripSettings | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tripsData, settingsData] = await Promise.all([
          getTrips(),
          getSettings(),
        ]);
        setTrips(tripsData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleBookClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const whatsappNumber = settings?.whatsapp_number || '919999999999';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading Mupu&apos;s Travel...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar whatsappNumber={whatsappNumber} />
      <Hero
        headline={settings?.hero_headline || "Discover the <em>Golden Trails</em><br>of Karnataka"}
        subtext={settings?.hero_subtext || "Curated weekend escapes to misty forests and spice gardens — small groups, real adventures, every weekend from Bengaluru."}
      />

      {/* Stats Section */}
      <Stats tripCount={trips.length} />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent mx-8" />

      {/* Trips Section */}
      <section id="trips" className="py-16 px-4 bg-brand-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">
              <Sparkles className="w-4 h-4 inline mr-1" />
              Weekend Escapes
            </p>
            <h2 className="section-title mb-4">Curated Journeys</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Hand-picked destinations from Bengaluru — small groups, big memories.
              All packages include transport, stays, and meals.
            </p>
          </div>

          {trips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No trips available at the moment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  whatsappNumber={whatsappNumber}
                  onBook={handleBookClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent mx-8" />

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-3">Our Story</p>
          <h2 className="section-title mb-6">
            Born from a love of<br />
            <span className="text-brand-primary italic">golden trails & wandering</span>
          </h2>

          <div className="glass-card rounded-xl p-8 mb-8">
            <blockquote className="text-slate-600 italic text-lg leading-relaxed">
              &ldquo;We take small groups of like-minded adventurers every weekend — real
              experiences, real connections, and landscapes that stay with you long after
              you return.&rdquo;
            </blockquote>
          </div>

          <a href="#trips" className="btn-primary">
            Join the Next Trip
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer whatsappNumber={whatsappNumber} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp whatsappNumber={whatsappNumber} />

      {/* Booking Modal */}
      <BookingModal
        trip={selectedTrip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </main>
  );
}
