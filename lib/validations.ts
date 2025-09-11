import { z } from "zod"

// Paso 1: Sobre ustedes
export const aboutYouSchema = z.object({
  projectName: z.string().min(2, "El nombre del proyecto debe tener al menos 2 caracteres"),
  founders: z.array(z.object({
    name: z.string().min(2, "El nombre es requerido"),
    role: z.string().min(2, "El rol es requerido")
  })).min(1, "Debe haber al menos un fundador"),
  motivation: z.string().min(10, "Cuéntanos más sobre su motivación (mínimo 10 caracteres)"),
  brandIdentity: z.string().min(10, "Describa cómo quieren ser recordados como marca")
})

// Paso 2: Qué ofrecen
export const servicesSchema = z.object({
  services: z.array(z.string()).min(1, "Seleccione al menos un servicio"),
  customService: z.string().optional(),
  hasPrices: z.enum(["yes", "no"]),
  prices: z.object({
    service1: z.string().optional(),
    service2: z.string().optional(),
    service3: z.string().optional(),
    packages: z.string().optional()
  }).optional(),
  hasPromotion: z.boolean(),
  promotionDetails: z.string().optional()
}).refine((data) => {
  // Si seleccionaron "Otro", el campo personalizado es requerido
  if (data.services.includes("Otro") && (!data.customService || data.customService.trim() === "")) {
    return false
  }
  return true
}, {
  message: "Debe describir su servicio personalizado",
  path: ["customService"]
})

// Paso 3: A quién quieren ayudar
export const targetAudienceSchema = z.object({
  idealClients: z.array(z.object({
    description: z.string().min(10, "Describa a su cliente ideal")
  })).min(1, "Describa al menos un tipo de cliente ideal"),
  ageRange: z.string().min(1, "Seleccione el rango de edad"),
  decisionMaker: z.string().min(5, "Describa quién toma la decisión de compra"),
  clientConcerns: z.string().min(10, "Describa las dudas o miedos de su cliente"),
  clientGoals: z.string().min(10, "Describa qué quiere lograr su cliente")
})

// Paso 4: Inspiración visual y estilo
export const visualStyleSchema = z.object({
  visualStyle: z.array(z.string()).min(1, "Seleccione al menos un estilo visual"),
  inspirationLinks: z.array(z.object({
    url: z.string().url("Ingrese una URL válida")
  })).max(3, "Máximo 3 enlaces de inspiración"),
  avoidContent: z.string().optional()
})

// Paso 4.5: Branding (colores y logo)
export const brandingSchema = z.object({
  primaryColor: z.string().min(1, "Seleccione un color primario").default("#000000"),
  secondaryColor: z.string().min(1, "Seleccione un color secundario").default("#FFFFFF"),
  logoUrl: z.string().optional(),
  moodboardUrl: z.string().optional(),
  typographyStyle: z.string().optional(),
  visualElements: z.string().optional()
})

// Paso 5: Producción de contenido
export const contentProductionSchema = z.object({
  willingToAppear: z.boolean(),
  videoTypes: z.array(z.string()).min(1, "Seleccione al menos un tipo de video"),
  keyMessages: z.string().min(10, "Describa los mensajes clave"),
  availability: z.string().min(1, "Seleccione su disponibilidad"),
  location: z.string().min(5, "Ingrese la dirección"),
  resources: z.string().optional()
})

// Paso 6: Contenido de valor
export const valueContentSchema = z.object({
  explainServices: z.boolean(),
  topicsToCover: z.array(z.string()).min(1, "Seleccione al menos un tema"),
  existingContent: z.string().optional()
})

// Esquema completo del onboarding
export const onboardingSchema = z.object({
  aboutYou: aboutYouSchema,
  services: servicesSchema,
  targetAudience: targetAudienceSchema,
  visualStyle: visualStyleSchema,
  branding: brandingSchema,
  contentProduction: contentProductionSchema,
  valueContent: valueContentSchema
})

export type AboutYouData = z.infer<typeof aboutYouSchema>
export type ServicesData = z.infer<typeof servicesSchema>
export type TargetAudienceData = z.infer<typeof targetAudienceSchema>
export type VisualStyleData = z.infer<typeof visualStyleSchema>
export type BrandingData = z.infer<typeof brandingSchema>
export type ContentProductionData = z.infer<typeof contentProductionSchema>
export type ValueContentData = z.infer<typeof valueContentSchema>
export type OnboardingData = z.infer<typeof onboardingSchema>
