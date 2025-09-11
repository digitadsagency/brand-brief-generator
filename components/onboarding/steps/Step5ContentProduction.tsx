"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { contentProductionSchema, type ContentProductionData } from "@/lib/validations"

interface Step5ContentProductionProps {
  data: ContentProductionData
  onNext: (data: ContentProductionData) => void
  onBack: () => void
}

const videoTypes = [
  "Videos educativos/explicativos",
  "Testimonios de clientes",
  "Behind the scenes",
  "Tutoriales paso a paso",
  "Videos de presentación personal",
  "Contenido motivacional",
  "Videos de procesos",
  "Q&A (Preguntas y respuestas)"
]

const availabilityOptions = [
  "Lunes a viernes, mañanas",
  "Lunes a viernes, tardes",
  "Fines de semana",
  "Solo sábados",
  "Solo domingos",
  "Flexible, cualquier día"
]

export function Step5ContentProduction({ data, onNext, onBack }: Step5ContentProductionProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ContentProductionData>({
    resolver: zodResolver(contentProductionSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const watchedWillingToAppear = watch("willingToAppear")
  const watchedVideoTypes = watch("videoTypes", [])
  const watchedAvailability = watch("availability")

  const handleVideoTypeChange = (videoType: string, checked: boolean) => {
    const currentTypes = watchedVideoTypes || []
    if (checked) {
      setValue("videoTypes", [...currentTypes, videoType])
    } else {
      setValue("videoTypes", currentTypes.filter(t => t !== videoType))
    }
  }

  const onSubmit = (formData: ContentProductionData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          🎬 Producción de contenido
        </h2>
        <p className="text-center text-brand-gray">
          Definan sus preferencias para la creación de contenido
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Disponibilidad para aparecer */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="willingToAppear"
                checked={watchedWillingToAppear}
                onCheckedChange={(checked) => setValue("willingToAppear", checked as boolean)}
              />
              <Label htmlFor="willingToAppear">
                ¿Están dispuestas a salir en los videos (hablando, presentando, etc.)?
              </Label>
            </div>
          </div>

          {/* Tipos de videos */}
          <div className="space-y-4">
            <Label>¿Qué tipo de videos les gustaría grabar? *</Label>
            <p className="text-sm text-muted-foreground">
              Pueden elegir más de uno
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {videoTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={watchedVideoTypes?.includes(type) || false}
                    onCheckedChange={(checked) => 
                      handleVideoTypeChange(type, checked as boolean)
                    }
                  />
                  <Label htmlFor={type} className="text-sm font-normal">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
            {errors.videoTypes && (
              <p className="text-sm text-destructive">{errors.videoTypes.message}</p>
            )}
          </div>

          {/* Mensajes clave */}
          <div className="space-y-2">
            <Label htmlFor="keyMessages">
              ¿Qué mensajes o frases sienten que no pueden faltar en sus redes? *
            </Label>
            <Textarea
              id="keyMessages"
              placeholder="Ej: 'Transformamos vidas a través de nuestro servicio', 'Cada cliente es único y especial', 'La excelencia es nuestro compromiso'..."
              rows={4}
              {...register("keyMessages")}
            />
            {errors.keyMessages && (
              <p className="text-sm text-destructive">{errors.keyMessages.message}</p>
            )}
          </div>

          {/* Disponibilidad */}
          <div className="space-y-2">
            <Label htmlFor="availability">¿Qué días tienen disponibilidad para grabación? *</Label>
            <select
              id="availability"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              value={watchedAvailability}
              onChange={(e) => setValue("availability", e.target.value)}
            >
              <option value="">Seleccione su disponibilidad</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.availability && (
              <p className="text-sm text-destructive">{errors.availability.message}</p>
            )}
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación principal de su negocio *</Label>
            <Input
              id="location"
              placeholder="Ej: Oficina Central, Calle Principal 123, Ciudad, Estado"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          {/* Recursos disponibles */}
          <div className="space-y-2">
            <Label htmlFor="resources">
              ¿Qué recursos o elementos especiales tienen disponibles para mostrar?
            </Label>
            <Textarea
              id="resources"
              placeholder="Ej: Equipos especializados, instalaciones, productos, herramientas, tecnología... Describe qué recursos únicos pueden mostrar en el contenido"
              rows={3}
              {...register("resources")}
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
