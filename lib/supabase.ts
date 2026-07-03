import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Trip = {
  id: string;
  name: string;
  destination: string | null;
  description: string | null;
  short_description: string | null;
  price: number;
  available_seats: number | null;
  start_date: string | null;
  end_date: string | null;
  duration: string | null;
  group_size: string | null;
  meals: string | null;
  highlights: string[];
  itinerary: ItineraryItem[];
  cover_image_url: string | null;
  sold_out: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
  activities: string[];
};

export type TripImage = {
  id: string;
  trip_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
};

export type TripSettings = {
  id: string;
  whatsapp_number: string;
  booking_deadline_text: string;
  hero_headline: string;
  hero_subtext: string;
  created_at: string;
  updated_at: string;
};

// ============ READ FUNCTIONS ============

export async function getTrips(): Promise<Trip[]> {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTripById(id: string): Promise<Trip | null> {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getTripImages(tripId: string): Promise<TripImage[]> {
  const { data, error } = await supabase
    .from('trip_images')
    .select('*')
    .eq('trip_id', tripId)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getSettings(): Promise<TripSettings | null> {
  const { data, error } = await supabase
    .from('trip_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// ============ WRITE FUNCTIONS ============

export async function createTrip(tripData: Partial<Trip>): Promise<Trip> {
  const { data, error } = await supabase
    .from('trips')
    .insert([tripData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTrip(id: string, updates: Partial<Trip>): Promise<Trip> {
  const { data, error } = await supabase
    .from('trips')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTrip(id: string): Promise<void> {
  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function createTripImage(imageData: {
  trip_id: string;
  image_url: string;
  caption?: string;
  display_order?: number;
}): Promise<TripImage> {
  const { data, error } = await supabase
    .from('trip_images')
    .insert([imageData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTripImage(id: string): Promise<void> {
  const { error } = await supabase
    .from('trip_images')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function updateSettings(updates: Partial<TripSettings>): Promise<TripSettings> {
  // Get the first settings record
  const settings = await getSettings();
  if (!settings) {
    throw new Error('No settings found');
  }

  const { data, error } = await supabase
    .from('trip_settings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', settings.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
