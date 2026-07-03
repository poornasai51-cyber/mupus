'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ChevronRight, ChevronLeft, Save, X, Upload, Settings, Image as ImageIcon, MapPin, Calendar, Users, CircleAlert as AlertCircle, MessageCircle, Eye, EyeOff } from 'lucide-react';
import {
  getTrips,
  getTripImages,
  getSettings,
  updateTrip,
  createTrip,
  deleteTrip,
  updateSettings,
  createTripImage,
  deleteTripImage,
  type Trip,
  type TripImage,
  type TripSettings
} from '@/lib/supabase';

const pexelImages = [
  'https://images.pexels.com/photos/176975/pexels-photo-176975.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1287462/pexels-photo-1287462.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/266026/pexels-photo-266026.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/168471/pexels-photo-168471.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1287431/pexels-photo-1287431.jpeg?auto=compress&cs=tinysrgb&w=800',
];

export default function AdminPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [settings, setSettings] = useState<TripSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trips' | 'settings'>('trips');
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [tripImages, setTripImages] = useState<TripImage[]>([]);
  const [selectedTripForImages, setSelectedTripForImages] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
        showToast('Failed to load data', 'error');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDeleteTrip = async (trip: Trip) => {
    if (!confirm(`Delete "${trip.name}"? This cannot be undone.`)) return;

    try {
      await deleteTrip(trip.id);
      setTrips(trips.filter(t => t.id !== trip.id));
      showToast('Trip deleted successfully');
    } catch (error) {
      console.error('Failed to delete trip:', error);
      showToast('Failed to delete trip', 'error');
    }
  };

  const handleToggleSoldOut = async (trip: Trip) => {
    try {
      const updated = await updateTrip(trip.id, { sold_out: !trip.sold_out });
      setTrips(trips.map(t => t.id === trip.id ? { ...t, sold_out: updated.sold_out } : t));
      showToast(trip.sold_out ? 'Trip marked as available' : 'Trip marked as sold out');
    } catch (error) {
      console.error('Failed to update trip:', error);
      showToast('Failed to update trip', 'error');
    }
  };

  const handleToggleFeatured = async (trip: Trip) => {
    try {
      const updated = await updateTrip(trip.id, { featured: !trip.featured });
      setTrips(trips.map(t => t.id === trip.id ? { ...t, featured: updated.featured } : t));
      showToast(trip.featured ? 'Removed from featured' : 'Added to featured');
    } catch (error) {
      console.error('Failed to update trip:', error);
      showToast('Failed to update trip', 'error');
    }
  };

  const handleOpenEdit = async (trip: Trip) => {
    setEditingTrip(trip);
    setShowTripForm(true);

    if (trip.id) {
      const images = await getTripImages(trip.id);
      setTripImages(images);
      setSelectedTripForImages(trip.id);
    }
  };

  const handleOpenAdd = () => {
    setEditingTrip(null);
    setTripImages([]);
    setSelectedTripForImages(null);
    setShowTripForm(true);
  };

  const handleSaveTrip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const tripData = {
      name: formData.get('name') as string,
      destination: formData.get('destination') as string,
      description: formData.get('description') as string,
      short_description: formData.get('short_description') as string,
      price: parseInt(formData.get('price') as string) || 3000,
      available_seats: parseInt(formData.get('available_seats') as string) || 12,
      duration: formData.get('duration') as string,
      group_size: formData.get('group_size') as string,
      meals: formData.get('meals') as string,
      cover_image_url: formData.get('cover_image_url') as string,
      highlights: (formData.get('highlights') as string)?.split(',').map(h => h.trim()).filter(Boolean) || [],
      start_date: formData.get('start_date') as string || null,
      end_date: formData.get('end_date') as string || null,
    };

    try {
      if (editingTrip) {
        const updated = await updateTrip(editingTrip.id, tripData);
        setTrips(trips.map(t => t.id === editingTrip.id ? updated : t));
        showToast('Trip updated successfully');
      } else {
        const newTrip = await createTrip(tripData);
        setTrips([newTrip, ...trips]);
        setSelectedTripForImages(newTrip.id);
        showToast('Trip created successfully');
      }
    } catch (error) {
      console.error('Failed to save trip:', error);
      showToast('Failed to save trip', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = async (imageUrl: string) => {
    if (!selectedTripForImages) return;

    try {
      const newImage = await createTripImage({
        trip_id: selectedTripForImages,
        image_url: imageUrl,
        display_order: tripImages.length,
      });
      setTripImages([...tripImages, newImage]);
      showToast('Image added successfully');
    } catch (error) {
      console.error('Failed to add image:', error);
      showToast('Failed to add image', 'error');
    }
  };

  const handleDeleteImage = async (image: TripImage) => {
    if (!confirm('Delete this image?')) return;

    try {
      await deleteTripImage(image.id);
      setTripImages(tripImages.filter(i => i.id !== image.id));
      showToast('Image deleted');
    } catch (error) {
      console.error('Failed to delete image:', error);
      showToast('Failed to delete image', 'error');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const updates = {
      whatsapp_number: formData.get('whatsapp_number') as string,
      booking_deadline_text: formData.get('booking_deadline_text') as string,
      hero_headline: formData.get('hero_headline') as string,
      hero_subtext: formData.get('hero_subtext') as string,
    };

    try {
      const updated = await updateSettings(updates);
      setSettings(updated);
      showToast('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <span className="text-slate-300">|</span>
            <h1 className="font-['Bebas_Neue'] text-2xl tracking-wide text-gradient">
              MUPU&apos;S Admin
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('trips')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'trips'
                  ? 'bg-teal-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Trips
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-teal-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-1" />
              Settings
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Toast */}
        {toast && (
          <div
            className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg animate-[slideIn_0.3s_ease] ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </div>
        )}

        {/* Trips Tab */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-text">Manage Trips</h2>
                <p className="text-sm text-slate-500">{trips.length} trips</p>
              </div>
              <button onClick={handleOpenAdd} className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Trip
              </button>
            </div>

            {/* Trip List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {trips.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No trips yet. Click &quot;Add Trip&quot; to create your first trip.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {trips.map(trip => (
                    <div
                      key={trip.id}
                      className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                        {trip.cover_image_url ? (
                          <Image
                            src={trip.cover_image_url}
                            alt={trip.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-brand-text truncate">{trip.name}</h3>
                          {trip.sold_out && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Sold Out</span>
                          )}
                          {trip.featured && (
                            <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Featured</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          {trip.destination && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {trip.destination}
                            </span>
                          )}
                          <span className="font-['Bebas_Neue'] text-teal-600">
                            ₹{trip.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleSoldOut(trip)}
                          className={`p-2 rounded-lg transition-all ${
                            trip.sold_out
                              ? 'text-green-600 hover:bg-green-50'
                              : 'text-red-500 hover:bg-red-50'
                          }`}
                          title={trip.sold_out ? 'Mark as available' : 'Mark as sold out'}
                        >
                          {trip.sold_out ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(trip)}
                          className={`p-2 rounded-lg transition-all ${
                            trip.featured
                              ? 'text-amber-500 hover:bg-amber-50'
                              : 'text-slate-400 hover:bg-slate-100'
                          }`}
                          title={trip.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          ★
                        </button>
                        <button
                          onClick={() => handleOpenEdit(trip)}
                          className="p-2 rounded-lg text-slate-600 hover:bg-teal-50 hover:text-teal-600 transition-all"
                          title="Edit trip"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrip(trip)}
                          className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                          title="Delete trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-brand-text mb-6">Site Settings</h2>
            <form onSubmit={handleSaveSettings} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  WhatsApp Number (with country code, no +)
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="whatsapp_number"
                    defaultValue={settings.whatsapp_number}
                    placeholder="919999999999"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">This number will receive all booking enquiries</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Booking Deadline Text
                </label>
                <input
                  type="text"
                  name="booking_deadline_text"
                  defaultValue={settings.booking_deadline_text}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Hero Headline
                </label>
                <input
                  type="text"
                  name="hero_headline"
                  defaultValue={settings.hero_headline}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Hero Subtext
                </label>
                <textarea
                  name="hero_subtext"
                  defaultValue={settings.hero_subtext}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        )}

        {/* Trip Form Modal */}
        {showTripForm && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={e => e.target === e.currentTarget && setShowTripForm(false)}
          >
            <div className="min-h-screen py-8 px-4 flex items-start justify-center">
              <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-brand-text">
                    {editingTrip ? 'Edit Trip' : 'Add New Trip'}
                  </h2>
                  <button
                    onClick={() => setShowTripForm(false)}
                    className="p-2 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveTrip} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Trip Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={editingTrip?.name}
                        placeholder="e.g., Coorg Highlands"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Destination
                      </label>
                      <input
                        type="text"
                        name="destination"
                        defaultValue={editingTrip?.destination || ''}
                        placeholder="e.g., Coorg, Karnataka"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Short Description (for card)
                    </label>
                    <input
                      type="text"
                      name="short_description"
                      defaultValue={editingTrip?.short_description || ''}
                      placeholder="Brief description shown on trip cards"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Full Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editingTrip?.description || ''}
                      rows={4}
                      placeholder="Detailed description of the trip..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Price (₹/person) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        required
                        defaultValue={editingTrip?.price || 3000}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Available Seats
                      </label>
                      <input
                        type="number"
                        name="available_seats"
                        defaultValue={editingTrip?.available_seats || 12}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        defaultValue={editingTrip?.duration || '2 Days / 1 Night'}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Group Size
                      </label>
                      <input
                        type="text"
                        name="group_size"
                        defaultValue={editingTrip?.group_size || 'Max 12 people'}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Meals
                      </label>
                      <input
                        type="text"
                        name="meals"
                        defaultValue={editingTrip?.meals || 'Breakfast included'}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        defaultValue={editingTrip?.start_date || ''}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        defaultValue={editingTrip?.end_date || ''}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Highlights (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="highlights"
                      defaultValue={editingTrip?.highlights?.join(', ') || ''}
                      placeholder="Sunset view, Waterfall hike, Coffee plantation"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      name="cover_image_url"
                      defaultValue={editingTrip?.cover_image_url || ''}
                      placeholder="https://images.pexels.com/..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {/* Pexels Image Picker */}
                    <div className="mt-3">
                      <p className="text-xs text-slate-500 mb-2">Or pick from sample images:</p>
                      <div className="grid grid-cols-5 gap-2">
                        {pexelImages.map((url, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              const input = document.querySelector('input[name="cover_image_url"]') as HTMLInputElement;
                              if (input) input.value = url;
                            }}
                            className="relative w-full aspect-square rounded overflow-hidden hover:ring-2 hover:ring-teal-500 transition-all"
                          >
                            <Image src={url} alt={`Sample ${idx + 1}`} fill className="object-cover" sizes="80px" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Gallery Images (for existing trips) */}
                  {selectedTripForImages && tripImages.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Gallery Images
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {tripImages.map(img => (
                          <div key={img.id} className="relative group">
                            <div className="relative w-full aspect-square rounded overflow-hidden">
                              <Image src={img.image_url} alt="Gallery" fill className="object-cover" sizes="80px" />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(img)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Gallery Image */}
                  {selectedTripForImages && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Add Gallery Image
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {pexelImages.map((url, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddImage(url);
                            }}
                            className="relative w-full aspect-square rounded overflow-hidden hover:ring-2 hover:ring-green-500 transition-all"
                          >
                            <Image src={url} alt={`Add ${idx + 1}`} fill className="object-cover" sizes="80px" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Plus className="w-6 h-6 text-white" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save Trip'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTripForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
