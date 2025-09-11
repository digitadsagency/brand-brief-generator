import { z } from "zod"

// Esquema para datos básicos (Paso 1)
export const basicDataSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  company: z.string().min(2, "El nombre de la empresa es requerido"),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  social: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    tiktok: z.string().optional(),
    linkedin: z.string().optional(),
  }).optional(),
  sector: z.enum([
    "joyeria",
    "moda", 
    "belleza",
    "turismo",
    "alimentos",
    "tecnologia",
    "educacion",
    "salud",
    "otro"
  ], {
    required_error: "Selecciona un sector",
  }),
  objective: z.string().min(10, "Describe tu objetivo principal (mínimo 10 caracteres)"),
})

// Esquema para identidad visual (Paso 2)
export const visualIdentitySchema = z.object({
  palette: z.array(z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Color HEX inválido"))
    .min(1, "Selecciona al menos un color")
    .max(3, "Máximo 3 colores"),
  fonts: z.array(z.string()).optional(),
  logo: z.string().optional(), // URL del logo subido
  references: z.array(z.string()).optional(), // URLs de archivos de referencia
})

// Esquema para estilo y tono (Paso 3)
export const styleToneSchema = z.object({
  styleTags: z.array(z.string()).min(1, "Selecciona al menos un estilo"),
  tone: z.enum(["formal", "casual", "creativo", "cercano"], {
    required_error: "Selecciona un tono de comunicación",
  }),
  keywords: z.object({
    include: z.array(z.string()).optional(),
    exclude: z.array(z.string()).optional(),
  }),
  sliders: z.object({
    innovacion: z.number().min(0).max(100),
    seriedad: z.number().min(0).max(100),
    diversion: z.number().min(0).max(100),
  }),
})

// Esquema para uso de marca (Paso 4)
export const brandUsageSchema = z.object({
  channels: z.array(z.string()).min(1, "Selecciona al menos un canal"),
  deliverables: z.array(z.string()).min(1, "Selecciona al menos un entregable"),
  timeline: z.enum([
    "1-2 semanas",
    "1 mes", 
    "2-3 meses",
    "3-6 meses",
    "6+ meses"
  ], {
    required_error: "Selecciona un plazo",
  }),
  budgetRange: z.enum([
    "menos-1000",
    "1000-5000",
    "5000-15000", 
    "15000-50000",
    "mas-50000"
  ], {
    required_error: "Selecciona un rango de presupuesto",
  }),
  notes: z.string().optional(),
})

// Esquema para revisión (Paso 5)
export const reviewSchema = z.object({
  dataVerified: z.boolean().refine(val => val === true, {
    message: "Debes verificar que la información es correcta",
  }),
})

// Esquema completo del onboarding
export const onboardingSchema = z.object({
  basicData: basicDataSchema,
  visualIdentity: visualIdentitySchema,
  styleTone: styleToneSchema,
  brandUsage: brandUsageSchema,
  review: reviewSchema,
})

// Tipos TypeScript derivados de los esquemas
export type BasicData = z.infer<typeof basicDataSchema>
export type VisualIdentity = z.infer<typeof visualIdentitySchema>
export type StyleTone = z.infer<typeof styleToneSchema>
export type BrandUsage = z.infer<typeof brandUsageSchema>
export type Review = z.infer<typeof reviewSchema>
export type OnboardingData = z.infer<typeof onboardingSchema>

// Opciones para selects
export const SECTORS = [
  { value: "joyeria", label: "Joyería" },
  { value: "moda", label: "Moda" },
  { value: "belleza", label: "Belleza" },
  { value: "turismo", label: "Turismo" },
  { value: "alimentos", label: "Alimentos" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "educacion", label: "Educación" },
  { value: "salud", label: "Salud" },
  { value: "otro", label: "Otro" },
] as const

export const STYLE_OPTIONS = [
  { value: "elegante", label: "Elegante", emoji: "✨" },
  { value: "minimalista", label: "Minimalista", emoji: "⚪" },
  { value: "vibrante", label: "Vibrante", emoji: "🌈" },
  { value: "organico", label: "Orgánico", emoji: "🌿" },
  { value: "lujoso", label: "Lujoso", emoji: "💎" },
  { value: "artesanal", label: "Artesanal", emoji: "🎨" },
  { value: "tecnologico", label: "Tecnológico", emoji: "⚡" },
] as const

export const TONE_OPTIONS = [
  { value: "formal", label: "Formal", emoji: "🎩" },
  { value: "casual", label: "Casual", emoji: "😎" },
  { value: "creativo", label: "Creativo", emoji: "✨" },
  { value: "cercano", label: "Cercano", emoji: "🤝" },
] as const

export const CHANNEL_OPTIONS = [
  { value: "web", label: "Sitio Web" },
  { value: "redes", label: "Redes Sociales" },
  { value: "empaques", label: "Empaques" },
  { value: "presentaciones", label: "Presentaciones" },
  { value: "retail", label: "Retail/Tiendas" },
  { value: "publicidad", label: "Publicidad" },
] as const

export const DELIVERABLE_OPTIONS = [
  { value: "logo", label: "Logo" },
  { value: "paleta", label: "Paleta de colores" },
  { value: "tipografias", label: "Tipografías" },
  { value: "plantillas-redes", label: "Plantillas para redes" },
  { value: "packaging", label: "Packaging" },
  { value: "web-kit", label: "Kit web" },
] as const

export const TIMELINE_OPTIONS = [
  { value: "1-2 semanas", label: "1-2 semanas" },
  { value: "1 mes", label: "1 mes" },
  { value: "2-3 meses", label: "2-3 meses" },
  { value: "3-6 meses", label: "3-6 meses" },
  { value: "6+ meses", label: "6+ meses" },
] as const

export const BUDGET_OPTIONS = [
  { value: "menos-1000", label: "Menos de $1,000 USD" },
  { value: "1000-5000", label: "$1,000 - $5,000 USD" },
  { value: "5000-15000", label: "$5,000 - $15,000 USD" },
  { value: "15000-50000", label: "$15,000 - $50,000 USD" },
  { value: "mas-50000", label: "Más de $50,000 USD" },
] as const
