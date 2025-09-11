"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { brandingSchema, type BrandingData } from "@/lib/validations"
import { SingleColorPicker } from "@/components/onboarding/SingleColorPicker"

interface Step4BrandingProps {
  data: BrandingData
  onNext: (data: BrandingData) => void
  onBack: () => void
}

export function Step4Branding({ data, onNext, onBack }: Step4BrandingProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<BrandingData>({
    resolver: zodResolver(brandingSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const watchedPrimaryColor = watch("primaryColor")
  const watchedSecondaryColor = watch("secondaryColor")
  const watchedLogoUrl = watch("logoUrl")
  const watchedMoodboardUrl = watch("moodboardUrl")

  const onSubmit = (formData: BrandingData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          🎨 Identidad visual
        </h2>
        <p className="text-center text-brand-gray">
          Definan los colores y elementos visuales de su marca
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Colores principales */}
          <div className="space-y-4">
            <Label>Colores principales de su marca *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <SingleColorPicker
                  color={watchedPrimaryColor || "#000000"}
                  onChange={(color) => setValue("primaryColor", color)}
                  label="Color primario"
                />
                {errors.primaryColor && (
                  <p className="text-sm text-destructive">{errors.primaryColor.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <SingleColorPicker
                  color={watchedSecondaryColor || "#FFFFFF"}
                  onChange={(color) => setValue("secondaryColor", color)}
                  label="Color secundario"
                />
                {errors.secondaryColor && (
                  <p className="text-sm text-destructive">{errors.secondaryColor.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Enlace al logo (Google Drive, Dropbox, etc.)</Label>
            <Input
              id="logoUrl"
              placeholder="https://drive.google.com/file/d/... o https://ejemplo.com/logo.png"
              {...register("logoUrl")}
            />
            <p className="text-sm text-gray-500">
              💡 Sube tu logo a Google Drive, haz clic derecho → &quot;Obtener enlace&quot; → &quot;Cualquier usuario con el enlace&quot;
            </p>
          </div>

          {/* Moodboard/Inspiración visual */}
          <div className="space-y-2">
            <Label htmlFor="moodboardUrl">Enlace al moodboard o inspiración visual</Label>
            <Input
              id="moodboardUrl"
              placeholder="https://drive.google.com/file/d/... o https://ejemplo.com/moodboard.png"
              {...register("moodboardUrl")}
            />
            <p className="text-sm text-gray-500">
              💡 Sube tu moodboard a Google Drive, haz clic derecho → &quot;Obtener enlace&quot; → &quot;Cualquier usuario con el enlace&quot;
            </p>
          </div>

          {/* Estilo de tipografía */}
          <div className="space-y-2">
            <Label htmlFor="typographyStyle">Estilo de tipografía preferido</Label>
            <Textarea
              id="typographyStyle"
              placeholder="Ej: Moderna y minimalista, clásica y elegante, divertida y casual, profesional y seria..."
              rows={3}
              {...register("typographyStyle")}
            />
          </div>

          {/* Elementos visuales adicionales */}
          <div className="space-y-2">
            <Label htmlFor="visualElements">Elementos visuales adicionales</Label>
            <Textarea
              id="visualElements"
              placeholder="Ej: Iconos específicos, patrones, texturas, formas geométricas, ilustraciones..."
              rows={3}
              {...register("visualElements")}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={onBack} className="border-black text-black hover:bg-black/5">
              ← Atrás
            </Button>
            <Button type="submit" disabled={!isValid} className="bg-black text-white hover:bg-black/90">
              Continuar →
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
