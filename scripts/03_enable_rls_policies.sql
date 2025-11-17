-- Enable Row Level Security (RLS) for all content tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE info_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read active site content"
  ON site_content FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active gallery images"
  ON gallery_images FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active partners"
  ON partners FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read active info cards"
  ON info_cards FOR SELECT
  USING (is_active = true);

-- Admin policies (authenticated users can do everything)
-- Note: You'll need to set up proper admin authentication
CREATE POLICY "Authenticated users can manage site content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gallery images"
  ON gallery_images FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage partners"
  ON partners FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage info cards"
  ON info_cards FOR ALL
  USING (auth.role() = 'authenticated');
