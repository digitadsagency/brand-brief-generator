-- Esquema de base de datos para Brand Onboarding
-- Ejecutar este script en el SQL Editor de Supabase

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  phone TEXT,
  company TEXT,
  website TEXT,
  social JSONB,
  sector TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de respuestas del onboarding
CREATE TABLE IF NOT EXISTS brand_onboardings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  objective TEXT,
  palette JSONB,           -- {primary: ["#...","#...","#..."]}
  fonts TEXT[],
  style_tags TEXT[],       -- ["elegante","artesanal"]
  tone TEXT,               -- "formal" | "casual" | etc.
  keywords JSONB,          -- {include:[], exclude:[]}
  sliders JSONB,           -- {innovacion:number, seriedad:number, diversion:number}
  channels TEXT[],         -- ["web","redes",...]
  deliverables TEXT[],
  timeline TEXT,
  budget_range TEXT,
  notes TEXT,
  files JSONB,             -- {logo: url, refs: [urls]}
  preview_snapshot_url TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_onboardings ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad básicas
-- Permitir lectura y escritura para todos (ajustar según necesidades de seguridad)
CREATE POLICY "Allow all operations on clients" ON clients
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on brand_onboardings" ON brand_onboardings
  FOR ALL USING (true) WITH CHECK (true);

-- Crear bucket para archivos de marca
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true);

-- Política para el bucket de archivos
CREATE POLICY "Allow all operations on brand-assets" ON storage.objects
  FOR ALL USING (bucket_id = 'brand-assets') WITH CHECK (bucket_id = 'brand-assets');

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_brand_onboardings_client_id ON brand_onboardings(client_id);
CREATE INDEX IF NOT EXISTS idx_brand_onboardings_created_at ON brand_onboardings(created_at);
