"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { visualStyleSchema, type VisualStyleData } from "@/lib/validations"

interface Step4VisualStyleProps {
  data: VisualStyleData
  onNext: (data: VisualStyleData) => void
  onBack: () => void
}

const visualStyleOptions = [
  "Elegante y sofisticado",
  "Minimalista y limpio",
  "Vibrante y energético",
  "Orgánico y natural",
  "Lujoso y premium",
  "Artesanal y auténtico",
  "Tecnológico y moderno",
  "Cálido y acogedor",
  "Profesional y confiable",
  "Creativo y artístico"
]

export function Step4VisualStyle({ data, onNext, onBack }: Step4VisualStyleProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<VisualStyleData>({
    resolver: zodResolver(visualStyleSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inspirationLinks",
  })

  const watchedVisualStyle = watch("visualStyle", [])

  const handleStyleChange = (style: string, checked: boolean) => {
    const currentStyles = watchedVisualStyle || []
    if (checked) {
      setValue("visualStyle", [...currentStyles, style])
    } else {
      setValue("visualStyle", currentStyles.filter(s => s !== style))
    }
  }

  const onSubmit = (formData: VisualStyleData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          🎨 Inspiración visual y estilo de redes
        </h2>
        <p className="text-center text-brand-gray">
          Definan el estilo visual que quieren proyectar
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Estilo visual */}
          <div className="space-y-4">
            <Label>¿Qué estilo visual/emocional les gustaría proyectar en redes? *</Label>
            <p className="text-sm text-muted-foreground">
              Pueden marcar los que prefieren
            </p>
            <div className="grid grid-cols-2 gap-3">
              {visualStyleOptions.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={style}
                    checked={watchedVisualStyle?.includes(style) || false}
                    onCheckedChange={(checked) => 
                      handleStyleChange(style, checked as boolean)
                    }
                  />
                  <Label htmlFor={style} className="text-sm font-normal">
                    {style}
                  </Label>
                </div>
              ))}
            </div>
            {errors.visualStyle && (
              <p className="text-sm text-destructive">{errors.visualStyle.message}</p>
            )}
          </div>

          {/* Enlaces de inspiración */}
          <div className="space-y-4">
            <Label>Compartan links o cuentas de redes sociales que les gusten como inspiración</Label>
            <p className="text-sm text-muted-foreground">
              Máximo 3 enlaces (Instagram, Pinterest, etc.)
            </p>
            
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Link className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="https://instagram.com/cuenta_inspiradora"
                  {...register(`inspirationLinks.${index}.url`)}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {fields.length < 3 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ url: "" })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar enlace de inspiración
              </Button>
            )}
            
            {errors.inspirationLinks && (
              <p className="text-sm text-destructive">{errors.inspirationLinks.message}</p>
            )}
          </div>

          {/* Contenido a evitar */}
          <div className="space-y-2">
            <Label htmlFor="avoidContent">
              ¿Hay algo que no les gustaría que aparezca o se diga en sus redes?
            </Label>
            <Textarea
              id="avoidContent"
              placeholder="Ej: No mostrar animales en situaciones de estrés, evitar lenguaje muy técnico, no mencionar diagnósticos específicos..."
              rows={4}
              {...register("avoidContent")}
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
