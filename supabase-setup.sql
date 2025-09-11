-- Supabase Setup for Brand Brief Onboarding
-- Ejecutar estos comandos en el SQL Editor de Supabase

-- 1. Crear tabla de clientes
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  company TEXT,
  website TEXT,
  social JSONB,
  sector TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Crear tabla de brand onboardings
CREATE TABLE IF NOT EXISTS brand_onboardings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  about_you JSONB,
  services JSONB,
  target_audience JSONB,
  visual_style JSONB,
  content_production JSONB,
  value_content JSONB,
  files JSONB,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_onboardings ENABLE ROW LEVEL SECURITY;

-- 4. Crear políticas RLS (ajustar según necesidades)
-- Política para permitir inserción de clientes
CREATE POLICY "Allow client insertion" ON clients
  FOR INSERT WITH CHECK (true);

-- Política para permitir inserción de brand onboardings
CREATE POLICY "Allow brand onboarding insertion" ON brand_onboardings
  FOR INSERT WITH CHECK (true);

-- Política para permitir lectura de brand onboardings por client_id
CREATE POLICY "Allow brand onboarding read" ON brand_onboardings
  FOR SELECT USING (true);

-- 5. Crear bucket para archivos (ejecutar en Storage)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('brand-assets', 'brand-assets', false);

-- 6. Crear políticas para el bucket de storage
-- CREATE POLICY "Allow file uploads" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'brand-assets');

-- CREATE POLICY "Allow file downloads" ON storage.objects
--   FOR SELECT USING (bucket_id = 'brand-assets');

-- 7. Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_brand_onboardings_client_id ON brand_onboardings(client_id);
CREATE INDEX IF NOT EXISTS idx_brand_onboardings_created_at ON brand_onboardings(created_at);
