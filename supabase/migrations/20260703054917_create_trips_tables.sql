/*
# Create trips and images tables for Mupu's Travel

1. New Tables
- `trips`: Core trip/event information
  - id (uuid, primary key)
  - name (text, trip name)
  - destination (text, location name)
  - description (text, full description)
  - short_description (text, card preview text)
  - price (integer, per person in INR)
  - available_seats (integer, number of seats)
  - start_date (date)
  - end_date (date)
  - duration (text, e.g. "2 Days / 1 Night")
  - group_size (text, e.g. "Max 12 people")
  - meals (text, what's included)
  - highlights (text[], array of highlights)
  - itinerary (jsonb, structured itinerary data)
  - cover_image_url (text, main hero image)
  - sold_out (boolean, availability flag)
  - featured (boolean, show prominently)
  - created_at (timestamp)
  - updated_at (timestamp)

- `trip_images`: Gallery images for trips
  - id (uuid, primary key)
  - trip_id (uuid, foreign key to trips)
  - image_url (text, image URL)
  - caption (text, optional caption)
  - display_order (integer, for sorting)
  - created_at (timestamp)

- `trip_settings`: Site-wide settings
  - id (uuid, primary key)
  - whatsapp_number (text, business WhatsApp number)
  - booking_deadline_text (text, deadline message)
  - hero_headline (text)
  - hero_subtext (text)
  - created_at (timestamp)
  - updated_at (timestamp)

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated CRUD (single-tenant, no auth screen).
*/

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  destination text,
  description text,
  short_description text,
  price integer NOT NULL DEFAULT 3000,
  available_seats integer DEFAULT 12,
  start_date date,
  end_date date,
  duration text DEFAULT '2 Days / 1 Night',
  group_size text DEFAULT 'Max 12 people',
  meals text DEFAULT 'Breakfast included',
  highlights text[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]'::jsonb,
  cover_image_url text,
  sold_out boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number text DEFAULT '919999999999',
  booking_deadline_text text DEFAULT 'Closes this Friday — limited seats',
  hero_headline text DEFAULT 'Discover the Golden Trails of Karnataka',
  hero_subtext text DEFAULT 'Curated weekend escapes to misty forests and spice gardens — small groups, real adventures, every weekend from Bengaluru.',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_settings ENABLE ROW LEVEL SECURITY;

-- Trips policies
DROP POLICY IF EXISTS "anon_select_trips" ON trips;
CREATE POLICY "anon_select_trips" ON trips FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trips" ON trips;
CREATE POLICY "anon_insert_trips" ON trips FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trips" ON trips;
CREATE POLICY "anon_update_trips" ON trips FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trips" ON trips;
CREATE POLICY "anon_delete_trips" ON trips FOR DELETE
  TO anon, authenticated USING (true);

-- Trip images policies
DROP POLICY IF EXISTS "anon_select_trip_images" ON trip_images;
CREATE POLICY "anon_select_trip_images" ON trip_images FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trip_images" ON trip_images;
CREATE POLICY "anon_insert_trip_images" ON trip_images FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trip_images" ON trip_images;
CREATE POLICY "anon_update_trip_images" ON trip_images FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trip_images" ON trip_images;
CREATE POLICY "anon_delete_trip_images" ON trip_images FOR DELETE
  TO anon, authenticated USING (true);

-- Trip settings policies
DROP POLICY IF EXISTS "anon_select_trip_settings" ON trip_settings;
CREATE POLICY "anon_select_trip_settings" ON trip_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_trip_settings" ON trip_settings;
CREATE POLICY "anon_update_trip_settings" ON trip_settings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Insert default settings
INSERT INTO trip_settings (id, whatsapp_number, booking_deadline_text, hero_headline, hero_subtext)
SELECT gen_random_uuid(), '919999999999', 'Closes this Friday — limited seats', 
       'Discover the <em>Golden Trails</em><br>of Karnataka',
       'Curated weekend escapes to misty forests and spice gardens — small groups, real adventures, every weekend from Bengaluru.'
WHERE NOT EXISTS (SELECT 1 FROM trip_settings);

-- Insert sample trips
INSERT INTO trips (id, name, destination, description, short_description, price, available_seats, duration, group_size, meals, highlights, sold_out, featured)
SELECT gen_random_uuid(), 
       'Coorg Highlands', 
       'Coorg, Karnataka',
       'Trek through coffee plantations, chase misty waterfalls, and breathe the freshest air Karnataka has to offer. Experience the Scotland of India with rolling hills, spice gardens, and warm hospitality.',
       'Trek through coffee plantations, chase misty waterfalls, and breathe the freshest air Karnataka has to offer.',
       3000, 12, '2 Days / 1 Night', 'Max 12 people', 'Breakfast included',
       ARRAY['Raja''s Seat sunset', 'Abbey Falls hike', 'Coffee estate tour'], false, true
WHERE NOT EXISTS (SELECT 1 FROM trips WHERE name = 'Coorg Highlands');

INSERT INTO trips (id, name, destination, description, short_description, price, available_seats, duration, group_size, meals, highlights, sold_out, featured)
SELECT gen_random_uuid(), 
       'Sakleshpura Trails', 
       'Sakleshpur, Karnataka',
       'A hidden gem in the Western Ghats — lush tea gardens, ancient temples, and the legendary Bisle Ghat view. Perfect for nature lovers seeking tranquility away from the crowds.',
       'A hidden gem in the Western Ghats — lush tea gardens, ancient temples, and the legendary Bisle Ghat view.',
       5000, 10, '2 Days / 1 Night', 'Max 10 people', 'All meals included',
       ARRAY['Bisle Ghat viewpoint', 'Manjarabad Fort', 'Tea garden walk'], false, true
WHERE NOT EXISTS (SELECT 1 FROM trips WHERE name = 'Sakleshpura Trails');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_trips_featured ON trips(featured);
CREATE INDEX IF NOT EXISTS idx_trips_sold_out ON trips(sold_out);
CREATE INDEX IF NOT EXISTS idx_trip_images_trip_id ON trip_images(trip_id);