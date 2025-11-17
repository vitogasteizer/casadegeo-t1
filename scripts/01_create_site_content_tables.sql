-- Site Content Management Tables

-- Main site content (hero section, about section texts, etc.)
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL UNIQUE, -- 'hero', 'about', 'church', 'education', 'contact', etc.
  title_ka TEXT, -- Georgian title
  title_es TEXT, -- Spanish title
  title_en TEXT, -- English title
  subtitle_ka TEXT,
  subtitle_es TEXT,
  subtitle_en TEXT,
  description_ka TEXT,
  description_es TEXT,
  description_en TEXT,
  button_text_ka TEXT,
  button_text_es TEXT,
  button_text_en TEXT,
  button_link TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery/Image management
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL, -- which section this image belongs to
  title_ka TEXT,
  title_es TEXT,
  title_en TEXT,
  alt_ka TEXT,
  alt_es TEXT,
  alt_en TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  description_ka TEXT,
  description_es TEXT,
  description_en TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Info cards (the three cards on main page)
CREATE TABLE IF NOT EXISTS info_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon VARCHAR(100), -- icon name or emoji
  title_ka TEXT NOT NULL,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ka TEXT,
  description_es TEXT,
  description_en TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);
CREATE INDEX IF NOT EXISTS idx_gallery_images_section ON gallery_images(section);
CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_info_cards_active ON info_cards(is_active, display_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_info_cards_updated_at BEFORE UPDATE ON info_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
