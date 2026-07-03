'use client';

import { useState } from 'react';
import { X, MessageCircle, User, Phone, Mail, Users, MapPin, Calendar, FileText } from 'lucide-react';
import type { Trip } from '@/lib/supabase';

interface BookingModalProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export default function BookingModal({ trip, isOpen, onClose, whatsappNumber }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    travellers: '1',
    travelDate: '',
    pickupLocation: '',
    specialRequests: '',
  });

  if (!isOpen || !trip) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp message
    const message = `Hello MUPU'S Travel & Trails, I would like to book a trip.

Trip Name: ${trip.name}
Travel Date: ${formData.travelDate || 'Flexible'}
Name: ${formData.name}
Mobile: ${formData.mobile}
WhatsApp: ${formData.whatsapp || formData.mobile}
Travellers: ${formData.travellers}
Pickup Location: ${formData.pickupLocation || 'To be decided'}
Special Requests: ${formData.specialRequests || 'None'}

Please share further booking details.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset and close
    setFormData({
      name: '',
      mobile: '',
      whatsapp: '',
      travellers: '1',
      travelDate: '',
      pickupLocation: '',
      specialRequests: '',
    });
    onClose();
  };

  const total = trip.price * parseInt(formData.travellers || '1');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-[slideIn_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-5 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <h2 className="font-display text-xl font-bold">Book — {trip.name}</h2>
          <p className="text-teal-100 text-sm mt-1">
            ₹{trip.price.toLocaleString('en-IN')} per person
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Deadline Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
            ⏰ Bookings close this Friday — limited seats available.
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Mobile & WhatsApp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                WhatsApp Number
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="Same as mobile"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Travellers & Travel Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Number of Travellers *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={formData.travellers}
                  onChange={(e) => setFormData({ ...formData, travellers: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="1">1 person</option>
                  <option value="2">2 persons</option>
                  <option value="3">3 persons</option>
                  <option value="4">4 persons</option>
                  <option value="5">5 persons</option>
                  <option value="6">6 persons</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                Preferred Travel Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={formData.pickupLocation}
                onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                placeholder="e.g., MG Road, Indiranagar, Koramangala..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
              Special Requests
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Any dietary requirements, medical conditions, or special requests..."
                rows={2}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Total Amount</p>
              <p className="text-2xl font-['Bebas_Neue'] tracking-wide text-gradient">
                ₹{total.toLocaleString('en-IN')}
              </p>
            </div>
            <p className="text-sm text-slate-600">
              {formData.travellers} traveller{parseInt(formData.travellers) > 1 ? 's' : ''} × ₹{trip.price.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="whatsapp-btn w-full justify-center py-3 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Book via WhatsApp
          </button>

          <p className="text-center text-xs text-slate-500">
            By clicking, you&apos;ll be redirected to WhatsApp to complete your booking.
          </p>
        </form>
      </div>
    </div>
  );
}
