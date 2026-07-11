-- ============================================================
-- Carthage store - Supabase schema
-- Run this file once in the Supabase SQL editor (Database > SQL).
-- It creates all tables, row-level security policies, the storage
-- bucket for product images, and seeds the initial catalog.
-- Safe to re-run: everything is IF NOT EXISTS / ON CONFLICT DO NOTHING.
-- ============================================================

-- ---------- Tables ----------

create table if not exists public.categories (
  id            text primary key,
  icon          text not null default 'sparkles',
  translations  jsonb not null default '{}'::jsonb,
  position      integer not null default 0
);

create table if not exists public.products (
  id            text primary key,
  price         numeric(10,2) not null check (price >= 0),
  currency      text not null default 'EUR',
  image         text not null default '',
  category_id   text not null references public.categories(id),
  badge         text check (badge in ('bestseller', 'limited', 'new')),
  keywords      text[] not null default '{}',
  in_stock      boolean not null default true,
  featured      boolean not null default false,
  translations  jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.formations (
  id            text primary key,
  image         text not null default '',
  category      text not null default '',
  duration      text not null default '',
  price         numeric(10,2),
  published     boolean not null default false,
  translations  jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  subject       text not null,
  message       text not null,
  created_at    timestamptz not null default now()
);

create table if not exists public.enrollments (
  id             text primary key,
  formation_id   text not null,
  formation_name text not null,
  name           text not null,
  email          text not null,
  phone          text not null default '',
  country        text not null default '',
  message        text not null default '',
  locale         text not null default 'en',
  status         text not null default 'new' check (status in ('new', 'contacted')),
  created_at     timestamptz not null default now()
);

-- Single admin account managed by the app (scrypt hash, never plain text).
-- The app bootstraps the row on first login using ADMIN_USERNAME /
-- ADMIN_PASSWORD env vars (defaults documented in README).
create table if not exists public.admin_users (
  username      text primary key,
  password_hash text not null,
  updated_at    timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);
create index if not exists products_featured_idx on public.products (featured) where featured;
create index if not exists messages_created_idx  on public.contact_messages (created_at desc);

-- ---------- Row Level Security ----------
-- The Next.js server talks to Supabase with the service_role key, which
-- bypasses RLS. These policies only define what the public anon key may
-- do, in case it is ever used directly.

alter table public.categories       enable row level security;
alter table public.products         enable row level security;
alter table public.formations       enable row level security;
alter table public.contact_messages enable row level security;
alter table public.enrollments      enable row level security;
alter table public.admin_users      enable row level security;

-- enrollments: no anon policies -> only the server (service role) touches them.

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories
  for select using (true);

drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products
  for select using (true);

drop policy if exists "Public read published formations" on public.formations;
create policy "Public read published formations" on public.formations
  for select using (published);

drop policy if exists "Public can send contact messages" on public.contact_messages;
create policy "Public can send contact messages" on public.contact_messages
  for insert with check (true);

-- admin_users: no policies on purpose -> anon key can never read or write it.

-- ---------- Storage bucket for admin uploads ----------

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

-- Writes go through the service role (admin API), so no anon write policy.

-- ---------- Seed: categories ----------

insert into public.categories (id, icon, position, translations) values
('pigments', 'droplet', 1, '{
  "en": {"name": "PMU Pigments", "description": "Professional-grade lip, brow & eyeliner pigments"},
  "fr": {"name": "Pigments PMU", "description": "Pigments professionnels pour lèvres, sourcils et eyeliner"},
  "de": {"name": "PMU-Pigmente", "description": "Professionelle Pigmente für Lippen, Brauen & Eyeliner"}
}'::jsonb),
('needles', 'pen-tool', 2, '{
  "en": {"name": "Cartridge Needles", "description": "Precision-engineered silicone tattoo needles"},
  "fr": {"name": "Aiguilles à cartouche", "description": "Aiguilles de précision avec grip en silicone"},
  "de": {"name": "Modulnadeln", "description": "Präzisionsgefertigte Nadeln mit Silikongriff"}
}'::jsonb),
('skincare', 'sparkles', 3, '{
  "en": {"name": "Skincare & Cosmetics", "description": "Post-procedure care and professional cosmetic essentials"},
  "fr": {"name": "Soins & cosmétiques", "description": "Soins post-procédure et essentiels cosmétiques professionnels"},
  "de": {"name": "Hautpflege & Kosmetik", "description": "Pflege nach der Behandlung und professionelle Kosmetik-Essentials"}
}'::jsonb),
('stonepaper', 'leaf', 4, '{
  "en": {"name": "Stone Paper", "description": "Tree-free notebooks and packaging by Golden Bridge"},
  "fr": {"name": "Papier de pierre", "description": "Carnets et emballages sans arbre par Golden Bridge"},
  "de": {"name": "Steinpapier", "description": "Baumfreie Notizbücher und Verpackungen von Golden Bridge"}
}'::jsonb),
('academy', 'graduation-cap', 5, '{
  "en": {"name": "Academy & Training", "description": "Certified professional PMU education"},
  "fr": {"name": "Académie & Formation", "description": "Formation PMU professionnelle certifiée"},
  "de": {"name": "Akademie & Schulung", "description": "Zertifizierte professionelle PMU-Ausbildung"}
}'::jsonb)
on conflict (id) do nothing;

-- Databases seeded before 2026-07-11 carry the old "Skincare" naming; the
-- insert above skips existing rows, so migrate the name in place (guarded so
-- an admin-customised name is never overwritten).
update public.categories set translations = '{
  "en": {"name": "Skincare & Cosmetics", "description": "Post-procedure care and professional cosmetic essentials"},
  "fr": {"name": "Soins & cosmétiques", "description": "Soins post-procédure et essentiels cosmétiques professionnels"},
  "de": {"name": "Hautpflege & Kosmetik", "description": "Pflege nach der Behandlung und professionelle Kosmetik-Essentials"}
}'::jsonb
where id = 'skincare' and translations->'en'->>'name' = 'Skincare';

-- ---------- Seed: products ----------

insert into public.products (id, price, currency, image, category_id, badge, keywords, in_stock, featured, translations) values
('limited-edition-lips-pigment', 89, 'EUR', '/0476c5bd-60bd-4601-b0f5-a80cb878c173.JPG', 'pigments', 'limited',
 array['pigment','lips','pmu','permanent makeup','lip blush','color'], true, true, '{
  "en": {"name": "Limited Edition Lips Pigment", "subtitle": "Premium PMU Pigment", "description": "Carthage Limited Edition Lips Pigment, made in Germany. A professional-grade PMU pigment crafted for precision lip work. 10ml / 0.35fl.oz.", "features": ["Made in Germany", "10ml / 0.35fl.oz", "Professional-grade formula", "Long-lasting results", "Vegan & Cruelty-free"]},
  "fr": {"name": "Pigment Lèvres Édition Limitée", "subtitle": "Pigment PMU haut de gamme", "description": "Pigment lèvres Édition Limitée Carthage, fabriqué en Allemagne. Un pigment PMU de qualité professionnelle conçu pour un travail des lèvres d''une grande précision. 10 ml / 0,35 fl. oz.", "features": ["Fabriqué en Allemagne", "10 ml / 0,35 fl. oz", "Formule de qualité professionnelle", "Résultats longue durée", "Végane et non testé sur les animaux"]},
  "de": {"name": "Limited Edition Lippenpigment", "subtitle": "Premium-PMU-Pigment", "description": "Carthage Limited Edition Lippenpigment, hergestellt in Deutschland. Ein professionelles PMU-Pigment für präzise Lippenarbeit. 10 ml / 0,35 fl. oz.", "features": ["Hergestellt in Deutschland", "10 ml / 0,35 fl. oz", "Professionelle Formel", "Langanhaltende Ergebnisse", "Vegan & tierversuchsfrei"]}
}'::jsonb),
('v6-pink-silicone-tattoo-needle', 42, 'EUR', '/IMG_6444.JPG', 'needles', 'bestseller',
 array['needle','cartridge','v6','silicone','tattoo','pmu','lining','shading'], true, true, '{
  "en": {"name": "V6 Pink Silicone Tattoo Needle", "subtitle": "Precision Cartridge Needle", "description": "Engineered for artists who demand precision and comfort. The V6 Pink combines innovative design with premium materials to elevate every session. Features silicone grip, EO gas sterilized, and universal fit for most cartridge machines.", "features": ["Silicone Grip - Soft, ergonomic and anti-slip", "Precise & Stable - Smooth ink flow", "Safety First - EO gas sterilized", "Universal Fit - Compatible with most cartridge machines", "Perfect for Lining, Shading & Color Packing"]},
  "fr": {"name": "Aiguille V6 Pink à grip silicone", "subtitle": "Cartouche de précision", "description": "Conçue pour les artistes qui exigent précision et confort. La V6 Pink associe un design innovant à des matériaux haut de gamme pour sublimer chaque séance. Grip en silicone, stérilisée au gaz EO et compatible avec la plupart des machines à cartouche.", "features": ["Grip silicone – doux, ergonomique et antidérapant", "Précise et stable – flux d''encre régulier", "Sécurité avant tout – stérilisée au gaz EO", "Compatibilité universelle – s''adapte à la plupart des machines", "Idéale pour le tracé, l''ombrage et le remplissage"]},
  "de": {"name": "V6 Pink Silikon-Tätowiernadel", "subtitle": "Präzisions-Modulnadel", "description": "Entwickelt für Artists, die Präzision und Komfort verlangen. Die V6 Pink vereint innovatives Design mit hochwertigen Materialien für jede Session. Mit Silikongriff, EO-gassterilisiert und universell passend für die meisten Cartridge-Maschinen.", "features": ["Silikongriff – weich, ergonomisch, rutschfest", "Präzise & stabil – gleichmäßiger Farbfluss", "Sicherheit zuerst – EO-gassterilisiert", "Universell passend – kompatibel mit den meisten Maschinen", "Perfekt für Linien, Schattierungen & Farbfüllung"]}
}'::jsonb),
('v6-pink-needle-pro', 48, 'EUR', '/IMG_6447.JPG', 'needles', null,
 array['needle','cartridge','v6','pro','pmu','tattoo','silicone'], true, true, '{
  "en": {"name": "V6 Pink Needle - Pro Edition", "subtitle": "Advanced PMU Cartridge", "description": "Engineered for artists who demand precision, comfort and reliability. Every detail, made to perfect your art. Compatible with most cartridge machines and grips. Features advanced engineering for consistent results.", "features": ["Premium Materials", "Advanced Engineering", "Consistent Results", "Made for Artists", "Silicone grip for superior comfort"]},
  "fr": {"name": "Aiguille V6 Pink – Édition Pro", "subtitle": "Cartouche PMU avancée", "description": "Conçue pour les artistes qui exigent précision, confort et fiabilité. Chaque détail est pensé pour perfectionner votre art. Compatible avec la plupart des machines et grips à cartouche, pour des résultats constants.", "features": ["Matériaux haut de gamme", "Ingénierie avancée", "Résultats constants", "Pensée pour les artistes", "Grip silicone pour un confort supérieur"]},
  "de": {"name": "V6 Pink Nadel – Pro Edition", "subtitle": "Fortschrittliche PMU-Cartridge", "description": "Für Artists entwickelt, die Präzision, Komfort und Zuverlässigkeit fordern. Jedes Detail perfektioniert Ihre Kunst. Kompatibel mit den meisten Cartridge-Maschinen und Grips – für konstante Ergebnisse.", "features": ["Hochwertige Materialien", "Fortschrittliche Technik", "Konstante Ergebnisse", "Gemacht für Artists", "Silikongriff für höchsten Komfort"]}
}'::jsonb),
('glow-tonic-exfoliator', 24, 'EUR', '/minimalist-rose-pink-toner-bottle-on-white-backgro.jpg', 'skincare', null,
 array['toner','exfoliator','glow','skincare','pores','tonic'], true, true, '{
  "en": {"name": "Glow Tonic", "subtitle": "Exfoliator", "description": "A professional-grade exfoliating toner that gently removes dead skin cells and refines pores. Designed for aesthetic professionals and their clients.", "features": []},
  "fr": {"name": "Glow Tonic", "subtitle": "Exfoliant", "description": "Lotion tonique exfoliante de qualité professionnelle qui élimine en douceur les cellules mortes et resserre les pores. Conçue pour les professionnels de l''esthétique et leurs clients.", "features": []},
  "de": {"name": "Glow Tonic", "subtitle": "Peeling-Toner", "description": "Professioneller Peeling-Toner, der abgestorbene Hautzellen sanft entfernt und die Poren verfeinert. Entwickelt für Beauty-Profis und ihre Kundinnen.", "features": []}
}'::jsonb),
('vitc-booster-brightening', 42, 'EUR', '/vitamin-c-serum-collection-glossier-style-flatlay-.jpg', 'skincare', null,
 array['serum','vitamin c','brightening','skincare','booster','glow'], true, false, '{
  "en": {"name": "Vit-C Booster", "subtitle": "Brightening Serum", "description": "High-performance vitamin C serum for brightening and skin rejuvenation. Formulated for post-procedure care and daily professional use.", "features": []},
  "fr": {"name": "Booster Vit-C", "subtitle": "Sérum éclat", "description": "Sérum à la vitamine C haute performance pour illuminer et régénérer la peau. Formulé pour les soins post-procédure et un usage professionnel quotidien.", "features": []},
  "de": {"name": "Vit-C Booster", "subtitle": "Aufhellendes Serum", "description": "Hochwirksames Vitamin-C-Serum für strahlende, regenerierte Haut. Entwickelt für die Pflege nach Behandlungen und den täglichen professionellen Gebrauch.", "features": []}
}'::jsonb),
('barrier-repair-moisturizer', 38, 'EUR', '/luxurious-cream-moisturizer-jar-minimal-clean-beau.jpg', 'skincare', null,
 array['moisturizer','cream','barrier','repair','hydration','skincare'], true, false, '{
  "en": {"name": "Barrier Repair", "subtitle": "Moisturizer", "description": "Luxurious cream moisturizer that repairs and strengthens the skin barrier. Ideal for post-treatment recovery and daily hydration.", "features": []},
  "fr": {"name": "Barrier Repair", "subtitle": "Crème hydratante", "description": "Crème hydratante luxueuse qui répare et renforce la barrière cutanée. Idéale pour la récupération post-traitement et l''hydratation quotidienne.", "features": []},
  "de": {"name": "Barrier Repair", "subtitle": "Feuchtigkeitscreme", "description": "Luxuriöse Feuchtigkeitscreme, die die Hautbarriere repariert und stärkt. Ideal für die Regeneration nach Behandlungen und die tägliche Pflege.", "features": []}
}'::jsonb),
('invisible-shield-spf50', 30, 'EUR', '/modern-sunscreen-tube-spf-50-clean-minimal-skincar.jpg', 'skincare', null,
 array['sunscreen','spf','spf50','sun protection','shield','skincare'], true, false, '{
  "en": {"name": "Invisible Shield", "subtitle": "SPF 50 Sunscreen", "description": "Lightweight, invisible sunscreen with SPF 50 protection. Essential for protecting freshly treated skin and maintaining results.", "features": []},
  "fr": {"name": "Invisible Shield", "subtitle": "Crème solaire SPF 50", "description": "Protection solaire légère et invisible avec SPF 50. Indispensable pour protéger la peau fraîchement traitée et préserver les résultats.", "features": []},
  "de": {"name": "Invisible Shield", "subtitle": "Sonnenschutz LSF 50", "description": "Leichter, unsichtbarer Sonnenschutz mit LSF 50. Unverzichtbar zum Schutz frisch behandelter Haut und zum Erhalt der Ergebnisse.", "features": []}
}'::jsonb),
('soothing-aftercare-oil', 26, 'EUR', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1200&q=80', 'skincare', 'new',
 array['aftercare','oil','recovery','cosmetics','pmu aftercare','soothing'], true, false, '{
  "en": {"name": "Soothing Aftercare Oil", "subtitle": "Post-PMU Recovery", "description": "A lightweight facial oil formulated to calm freshly pigmented skin. Supports healing after PMU procedures, reduces dryness during the flaking phase and helps preserve pigment retention. 15ml dropper bottle.", "features": ["Formulated for post-PMU skin", "15ml with precision dropper", "Fragrance-free, non-comedogenic", "Supports pigment retention", "Vegan & Cruelty-free"]},
  "fr": {"name": "Huile apaisante post-soin", "subtitle": "Récupération post-PMU", "description": "Une huile visage légère formulée pour apaiser la peau fraîchement pigmentée. Favorise la cicatrisation après les procédures PMU, réduit la sécheresse pendant la phase de desquamation et aide à préserver la rétention du pigment. Flacon compte-gouttes de 15 ml.", "features": ["Formulée pour la peau post-PMU", "15 ml avec compte-gouttes de précision", "Sans parfum, non comédogène", "Préserve la rétention du pigment", "Végane et non testée sur les animaux"]},
  "de": {"name": "Beruhigendes Aftercare-Öl", "subtitle": "Post-PMU-Regeneration", "description": "Ein leichtes Gesichtsöl zur Beruhigung frisch pigmentierter Haut. Unterstützt die Heilung nach PMU-Behandlungen, mindert Trockenheit in der Schuppungsphase und hilft, die Pigmenthaltbarkeit zu bewahren. 15-ml-Flasche mit Pipette.", "features": ["Formuliert für Haut nach PMU", "15 ml mit Präzisionspipette", "Parfümfrei, nicht komedogen", "Unterstützt die Pigmenthaltbarkeit", "Vegan & tierversuchsfrei"]}
}'::jsonb),
('stone-paper-notebook-a5', 19, 'EUR', '/stone-paper/paper-1.jpg', 'stonepaper', 'new',
 array['stone paper','notebook','a5','tree-free','stationery','waterproof','golden bridge'], true, true, '{
  "en": {"name": "Stone Paper Notebook A5", "subtitle": "Tree-Free Hardcover", "description": "A5 hardcover notebook with 192 pages of mineral stone paper. Waterproof, tear-resistant pages with an exceptionally smooth writing surface - no trees, water or bleach used in production. Made by Golden Bridge, the Carthage stone paper division.", "features": ["192 pages, 120 gsm stone paper", "Waterproof & tear-resistant", "Lay-flat thread binding", "Produced tree-free in Germany", "Custom branding available for B2B"]},
  "fr": {"name": "Carnet en papier de pierre A5", "subtitle": "Couverture rigide sans arbre", "description": "Carnet A5 à couverture rigide de 192 pages en papier de pierre minéral. Pages imperméables et résistantes à la déchirure, avec une surface d''écriture exceptionnellement lisse - sans arbre, sans eau ni chlore. Fabriqué par Golden Bridge, la division papier de pierre de Carthage.", "features": ["192 pages, papier de pierre 120 g/m²", "Imperméable et indéchirable", "Reliure cousue à ouverture à plat", "Produit sans arbre en Allemagne", "Personnalisation disponible en B2B"]},
  "de": {"name": "Steinpapier-Notizbuch A5", "subtitle": "Baumfreier Hardcover", "description": "A5-Hardcover-Notizbuch mit 192 Seiten aus mineralischem Steinpapier. Wasserfeste, reißfeste Seiten mit außergewöhnlich glatter Schreiboberfläche - ohne Bäume, Wasser oder Bleiche produziert. Gefertigt von Golden Bridge, der Steinpapier-Division von Carthage.", "features": ["192 Seiten, 120 g/m² Steinpapier", "Wasserfest & reißfest", "Fadenbindung, liegt flach auf", "Baumfrei produziert in Deutschland", "Individuelle Veredelung für B2B"]}
}'::jsonb),
('stone-paper-bags-sample-pack', 49, 'EUR', '/stone-paper/paper-9.jpg', 'stonepaper', null,
 array['stone paper','bags','packaging','sample','b2b','waterproof','industrial'], true, false, '{
  "en": {"name": "Stone Paper Bags - Sample Pack", "subtitle": "25 Units, Assorted Sizes", "description": "Evaluation pack of 25 stone paper bags in assorted sizes. Naturally waterproof without coatings, with 2-3x the tear resistance of conventional paper and a bright white surface that takes exceptional print. For testing before B2B volume orders.", "features": ["25 bags in three sizes", "Naturally waterproof - no coating", "2-3x tear resistance of paper", "FDA-compliant food contact", "Volume pricing on request"]},
  "fr": {"name": "Sacs en papier de pierre - Pack d''essai", "subtitle": "25 unités, tailles assorties", "description": "Pack d''évaluation de 25 sacs en papier de pierre en tailles assorties. Naturellement imperméables sans enduction, avec une résistance à la déchirure 2 à 3 fois supérieure au papier classique et une surface d''un blanc éclatant offrant une impression exceptionnelle. Pour tester avant les commandes en volume B2B.", "features": ["25 sacs en trois tailles", "Naturellement imperméables - sans enduction", "Résistance à la déchirure 2-3x supérieure", "Contact alimentaire conforme FDA", "Tarifs volume sur demande"]},
  "de": {"name": "Steinpapier-Säcke - Musterpaket", "subtitle": "25 Stück, verschiedene Größen", "description": "Testpaket mit 25 Steinpapier-Säcken in verschiedenen Größen. Von Natur aus wasserfest ohne Beschichtung, mit 2-3-facher Reißfestigkeit von herkömmlichem Papier und einer strahlend weißen Oberfläche für exzellente Druckergebnisse. Zum Testen vor B2B-Volumenbestellungen.", "features": ["25 Säcke in drei Größen", "Von Natur aus wasserfest - ohne Beschichtung", "2-3-fache Reißfestigkeit von Papier", "FDA-konformer Lebensmittelkontakt", "Volumenpreise auf Anfrage"]}
}'::jsonb),
('pp-woven-sacks-sample-pack', 29, 'EUR', '/stone-paper/paper-11.jpg', 'stonepaper', null,
 array['pp woven','polypropylene','sacks','packaging','sample','b2b','agriculture'], true, false, '{
  "en": {"name": "PP Woven Sacks - Sample Pack", "subtitle": "10 Units, 25-50 kg Rated", "description": "Evaluation pack of 10 woven polypropylene sacks rated for 25-50 kg loads. UV-stabilised for outdoor storage, available laminated or ventilated, engineered for heavy filling, stacking and rough transport in agriculture, construction and chemicals.", "features": ["10 sacks, 25 kg and 50 kg rated", "UV-stabilised for outdoor storage", "Laminated & ventilated variants", "Up to 8-colour flexo printing", "Volume pricing on request"]},
  "fr": {"name": "Sacs tissés PP - Pack d''essai", "subtitle": "10 unités, charge 25-50 kg", "description": "Pack d''évaluation de 10 sacs en polypropylène tissé, conçus pour des charges de 25 à 50 kg. Stabilisés UV pour le stockage extérieur, disponibles laminés ou ventilés, pensés pour le remplissage lourd, l''empilage et le transport intensif en agriculture, construction et chimie.", "features": ["10 sacs, charges de 25 kg et 50 kg", "Stabilisés UV pour stockage extérieur", "Variantes laminées et ventilées", "Impression flexo jusqu''à 8 couleurs", "Tarifs volume sur demande"]},
  "de": {"name": "PP-Gewebesäcke - Musterpaket", "subtitle": "10 Stück, 25-50 kg Tragkraft", "description": "Testpaket mit 10 Säcken aus gewebtem Polypropylen, ausgelegt für Lasten von 25-50 kg. UV-stabilisiert für Außenlagerung, laminiert oder belüftet erhältlich, entwickelt für schwere Befüllung, Stapelung und rauen Transport in Landwirtschaft, Bau und Chemie.", "features": ["10 Säcke, 25 kg und 50 kg Tragkraft", "UV-stabilisiert für Außenlagerung", "Laminierte & belüftete Varianten", "Bis zu 8-farbiger Flexodruck", "Volumenpreise auf Anfrage"]}
}'::jsonb)
on conflict (id) do nothing;

-- ---------- Seed: academy formations ----------

insert into public.formations (id, image, category, duration, price, published, translations) values
('pmu-fundamentals', 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80', 'Beginner', '10 days', 2900, true, '{
  "en": {"name": "PMU Fundamentals: Brows & Lips", "description": "The complete entry into permanent makeup. Ten days of supervised practice covering skin theory, color science, machine handling, brows and lip blush - from your first stroke on practice skin to your first supervised work on a live model.", "details": "Includes starter kit with Carthage pigments and needles, certification exam, and 6 months of post-course mentoring. Max. 6 students per cohort."},
  "fr": {"name": "Fondamentaux PMU : sourcils & lèvres", "description": "L''entrée complète dans le maquillage permanent. Dix jours de pratique encadrée : théorie de la peau, science des couleurs, prise en main de la machine, sourcils et lip blush - de vos premiers tracés sur peau d''entraînement à votre premier travail supervisé sur modèle.", "details": "Comprend un kit de démarrage avec pigments et aiguilles Carthage, l''examen de certification et 6 mois de mentorat après la formation. 6 élèves maximum par session."},
  "de": {"name": "PMU-Grundausbildung: Brauen & Lippen", "description": "Der komplette Einstieg ins Permanent Make-up. Zehn Tage begleitete Praxis: Hauttheorie, Farblehre, Maschinenführung, Brauen und Lip Blush - vom ersten Strich auf Übungshaut bis zur ersten betreuten Arbeit am Modell.", "details": "Inklusive Starter-Kit mit Carthage-Pigmenten und -Nadeln, Zertifizierungsprüfung und 6 Monaten Mentoring nach dem Kurs. Max. 6 Teilnehmerinnen pro Gruppe."}
}'::jsonb),
('lip-blush-masterclass', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80', 'Advanced', '2 days', 1200, true, '{
  "en": {"name": "Lip Blush Masterclass", "description": "Two intensive days for working artists who want lips to become their signature. Advanced color correction for dark and uneven lips, layering techniques for long-lasting gradients, and live demonstrations on two models.", "details": "For artists with existing PMU certification. Includes the Carthage Limited Edition lip pigment set and a recorded reference session."},
  "fr": {"name": "Masterclass Lip Blush", "description": "Deux journées intensives pour les artistes en activité qui veulent faire des lèvres leur signature. Correction colorimétrique avancée des lèvres foncées ou irrégulières, techniques de superposition pour des dégradés durables, et démonstrations en direct sur deux modèles.", "details": "Réservée aux artistes déjà certifiés en PMU. Comprend le coffret de pigments lèvres Carthage Édition Limitée et une session de référence filmée."},
  "de": {"name": "Lip-Blush-Masterclass", "description": "Zwei intensive Tage für praktizierende Artists, die Lippen zu ihrer Signatur machen wollen. Fortgeschrittene Farbkorrektur bei dunklen und ungleichmäßigen Lippen, Schichttechniken für langlebige Verläufe und Live-Demonstrationen an zwei Modellen.", "details": "Für Artists mit bestehender PMU-Zertifizierung. Inklusive Carthage Limited Edition Lippenpigment-Set und einer aufgezeichneten Referenz-Session."}
}'::jsonb),
('nano-brows-microblading', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&q=80', 'Intermediate', '3 days', 1600, true, '{
  "en": {"name": "Nano Brows & Microblading", "description": "Hair-stroke brows with machine and blade. Three days on stroke mapping, symmetry systems, healed-result planning and skin-type diagnostics - so your strokes still look crisp twelve months later, not just on the day.", "details": "Suited to artists switching from classic shading or beauticians with steady hands-on experience. Includes brow mapping tools and practice materials."},
  "fr": {"name": "Nano Brows & Microblading", "description": "Le sourcil poil à poil, à la machine et à la lame. Trois jours consacrés au tracé des poils, aux systèmes de symétrie, à l''anticipation du résultat cicatrisé et au diagnostic des types de peau - pour des sourcils encore nets douze mois plus tard, pas seulement le jour même.", "details": "Pour les artistes venant de l''ombrage classique ou les esthéticiennes avec une solide expérience pratique. Outils de mapping et matériel d''entraînement inclus."},
  "de": {"name": "Nano Brows & Microblading", "description": "Härchenzeichnung mit Maschine und Blade. Drei Tage zu Strichführung, Symmetriesystemen, Planung des verheilten Ergebnisses und Hauttyp-Diagnostik - damit die Härchen auch nach zwölf Monaten noch präzise wirken, nicht nur am Behandlungstag.", "details": "Geeignet für Artists mit Shading-Erfahrung oder Kosmetikerinnen mit solider Praxis. Mapping-Werkzeuge und Übungsmaterial inklusive."}
}'::jsonb)
on conflict (id) do nothing;
