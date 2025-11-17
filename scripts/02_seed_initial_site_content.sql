-- Seed initial site content with current static data

-- Hero section
INSERT INTO site_content (section, title_ka, title_es, title_en, description_ka, description_es, description_en, button_text_ka, button_text_es, button_en, button_link)
VALUES (
  'hero',
  'ქართული სახლი ვიტორია-გასტეიზში',
  'Casa Georgiana en Vitoria-Gasteiz',
  'Georgian House in Vitoria-Gasteiz',
  'ბასკეთის ავტონომიურ რეგიონში მცხოვრებ ქართველთა გაერთიანება',
  'Asociación de georgianos residentes en el País Vasco',
  'Association of Georgians living in the Basque Country',
  'გაიგე მეტი',
  'Saber más',
  'Learn more',
  '#about'
) ON CONFLICT (section) DO NOTHING;

-- About section
INSERT INTO site_content (section, title_ka, title_es, title_en, description_ka, description_es, description_en)
VALUES (
  'about',
  'ჩვენს შესახებ',
  'Sobre Nosotros',
  'About Us',
  'ასოციაცია "ქართული სახლი ვიტორია-გასტეიზში" წარმოადგენს ორგანიზაციას, რომელიც აერთიანებს ბასკეთის ქვეყანაში მცხოვრებ ქართველებს. ჩვენი მიზანია ქართული კულტურის, ტრადიციების და ენის შენარჩუნება და პოპულარიზაცია.',
  'La Asociación "Casa Georgiana en Vitoria-Gasteiz" es una organización que une a los georgianos que viven en el País Vasco. Nuestro objetivo es preservar y promover la cultura, las tradiciones y el idioma georgiano.',
  'The Association "Georgian House in Vitoria-Gasteiz" is an organization that unites Georgians living in the Basque Country. Our goal is to preserve and promote Georgian culture, traditions and language.'
) ON CONFLICT (section) DO NOTHING;

-- Church section
INSERT INTO site_content (section, title_ka, title_es, title_en, description_ka, description_es, description_en)
VALUES (
  'church',
  'ეკლესია',
  'Iglesia',
  'Church',
  'ჩვენი ეკლესია არის სულიერი ცენტრი, სადაც ქართველები შეუძლიათ შეუერთდნენ ლოცვას და რწმენის გაზიარებას.',
  'Nuestra iglesia es un centro espiritual donde los georgianos pueden unirse para orar y compartir su fe.',
  'Our church is a spiritual center where Georgians can come together for prayer and sharing their faith.'
) ON CONFLICT (section) DO NOTHING;

-- Education section
INSERT INTO site_content (section, title_ka, title_es, title_en, description_ka, description_es, description_en)
VALUES (
  'education',
  'განათლება',
  'Educación',
  'Education',
  'ჩვენ ვთავაზობთ ქართული ენისა და კულტურის სწავლების პროგრამებს ბავშვებისა და მოზარდებისთვის.',
  'Ofrecemos programas de enseñanza del idioma y la cultura georgiana para niños y adolescentes.',
  'We offer Georgian language and culture education programs for children and teenagers.'
) ON CONFLICT (section) DO NOTHING;

-- Contact section
INSERT INTO site_content (section, title_ka, title_es, title_en, description_ka, description_es, description_en)
VALUES (
  'contact',
  'კონტაქტი',
  'Contacto',
  'Contact',
  'დაგვიკავშირდით თუ გაქვთ შეკითხვები ან გსურთ გაწევრიანება',
  'Contáctenos si tiene preguntas o desea unirse',
  'Contact us if you have questions or want to join'
) ON CONFLICT (section) DO NOTHING;

-- Info Cards
INSERT INTO info_cards (icon, title_ka, title_es, title_en, description_ka, description_es, description_en, display_order)
VALUES 
  ('🏛️', 'კულტურა', 'Cultura', 'Culture', 'ქართული კულტურის შენარჩუნება და პოპულარიზაცია', 'Preservación y promoción de la cultura georgiana', 'Preservation and promotion of Georgian culture', 1),
  ('📚', 'განათლება', 'Educación', 'Education', 'ქართული ენისა და ტრადიციების სწავლება', 'Enseñanza del idioma y tradiciones georgianas', 'Teaching Georgian language and traditions', 2),
  ('🤝', 'თანამშრომლობა', 'Colaboración', 'Collaboration', 'თანამშრომლობა ადგილობრივ ორგანიზაციებთან', 'Colaboración con organizaciones locales', 'Collaboration with local organizations', 3)
ON CONFLICT DO NOTHING;

-- Partners (placeholder data)
INSERT INTO partners (name, logo_url, website_url, display_order)
VALUES 
  ('პარტნიორი 1', '/placeholder.svg?height=100&width=200', 'https://example.com', 1),
  ('პარტნიორი 2', '/placeholder.svg?height=100&width=200', 'https://example.com', 2),
  ('პარტნიორი 3', '/placeholder.svg?height=100&width=200', 'https://example.com', 3),
  ('პარტნიორი 4', '/placeholder.svg?height=100&width=200', 'https://example.com', 4)
ON CONFLICT DO NOTHING;
