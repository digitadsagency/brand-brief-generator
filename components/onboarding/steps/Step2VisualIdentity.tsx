"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { visualIdentitySchema, VisualIdentity } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ColorPicker } from "../ColorPicker"
import { FileDropzone } from "../FileDropzone"
import { useState } from "react"

interface Step2VisualIdentityProps {
  data?: Partial<VisualIdentity>
  onNext: (data: VisualIdentity) => void
  onBack: () => void
}

export function Step2VisualIdentity({ data, onNext, onBack }: Step2VisualIdentityProps) {
  const [logoFiles, setLogoFiles] = useState<File[]>([])
  const [referenceFiles, setReferenceFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<VisualIdentity>({
    resolver: zodResolver(visualIdentitySchema),
    defaultValues: {
      palette: data?.palette || [],
      fonts: data?.fonts || [],
      ...data
    },
    mode: "onChange"
  })

  const watchedPalette = watch("palette")
  const watchedFonts = watch("fonts")

  const onSubmit = (formData: VisualIdentity) => {
    // Aquí se procesarían los archivos y se guardarían las URLs
    // Por ahora, simulamos las URLs
    const processedData = {
      ...formData,
      logo: logoFiles.length > 0 ? "logo-url-placeholder" : undefined,
      references: referenceFiles.length > 0 ? referenceFiles.map((_, i) => `ref-${i}-url-placeholder`) : undefined
    }
    
    onNext(processedData)
  }

  const handlePaletteChange = (colors: string[]) => {
    setValue("palette", colors, { shouldValidate: true })
  }

  const handleFontsChange = (font: string) => {
    if (font.trim()) {
      const currentFonts = watchedFonts || []
      if (!currentFonts.includes(font)) {
        setValue("fonts", [...currentFonts, font], { shouldValidate: true })
      }
    }
  }

  const removeFont = (index: number) => {
    const currentFonts = watchedFonts || []
    const newFonts = currentFonts.filter((_, i) => i !== index)
    setValue("fonts", newFonts, { shouldValidate: true })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-3xl">🎨</span>
          <div>
            <h2 className="text-2xl font-bold">Identidad visual</h2>
            <p className="text-gray-600 font-normal">
              Define los colores, tipografías y elementos visuales de tu marca
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Paleta de colores */}
          <div className="space-y-4">
            <ColorPicker
              colors={watchedPalette || []}
              onChange={handlePaletteChange}
              maxColors={3}
            />
            {errors.palette && (
              <p className="text-sm text-red-500">{errors.palette.message}</p>
            )}
          </div>

          {/* Tipografías */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tipografías</h3>
              <p className="text-sm text-gray-600 mb-4">
                ¿Tienes tipografías preferidas? Puedes agregar hasta 3.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ej: Inter, Roboto, Montserrat..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const target = e.target as HTMLInputElement
                      handleFontsChange(target.value)
                      target.value = ""
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder*="Inter"]') as HTMLInputElement
                    if (input?.value) {
                      handleFontsChange(input.value)
                      input.value = ""
                    }
                  }}
                >
                  Agregar
                </Button>
              </div>

              {watchedFonts && watchedFonts.length > 0 && (
                <div className="space-y-2">
                  <Label>Tipografías seleccionadas</Label>
                  <div className="flex flex-wrap gap-2">
                    {watchedFonts.map((font, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{font}</span>
                        <button
                          type="button"
                          onClick={() => removeFont(index)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                <p className="font-medium mb-1">💡 Sugerencias de tipografías populares:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <span>• Inter (moderna, legible)</span>
                  <span>• Roboto (versátil)</span>
                  <span>• Montserrat (elegante)</span>
                  <span>• Open Sans (clara)</span>
                  <span>• Lato (amigable)</span>
                  <span>• Poppins (redondeada)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="space-y-4">
            <FileDropzone
              title="Logo de la empresa"
              description="Sube tu logo en formato PNG, SVG o JPG (máximo 5MB)"
              onFilesChange={setLogoFiles}
              acceptedTypes={["image/*"]}
              maxFiles={1}
              maxSize={5 * 1024 * 1024}
            />
          </div>

          {/* Archivos de referencia */}
          <div className="space-y-4">
            <FileDropzone
              title="Referencias visuales"
              description="Sube moodboards, manuales de marca, o cualquier referencia visual (PNG, JPG, PDF, PSD, AI)"
              onFilesChange={setReferenceFiles}
              acceptedTypes={["image/*", "application/pdf", ".psd", ".ai"]}
              maxFiles={5}
              maxSize={10 * 1024 * 1024}
            />
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">💡 Consejos para tu identidad visual</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Los colores deben reflejar la personalidad de tu marca</li>
              <li>• Asegúrate de que los colores tengan buen contraste</li>
              <li>• Las tipografías deben ser legibles en diferentes tamaños</li>
              <li>• El logo debe funcionar en blanco y negro</li>
              <li>• Las referencias ayudan a entender tu visión</li>
            </ul>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Atrás
            </Button>
            <Button 
              type="submit" 
              disabled={!isValid}
              className="ml-auto"
            >
              Siguiente paso
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
