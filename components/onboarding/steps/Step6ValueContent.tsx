"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { valueContentSchema, type ValueContentData } from "@/lib/validations"

interface Step6ValueContentProps {
  data: ValueContentData
  onNext: (data: ValueContentData) => void
  onBack: () => void
  isSubmitting?: boolean
}

const topicsToCover = [
  "Beneficios del servicio",
  "Proceso de trabajo",
  "Casos de éxito",
  "Testimonios de clientes",
  "Consejos y tips",
  "Tendencias del mercado",
  "Innovación y tecnología",
  "Calidad y excelencia",
  "Valor agregado",
  "Diferenciación competitiva",
  "Otros temas específicos"
]

export function Step6ValueContent({ data, onNext, onBack, isSubmitting = false }: Step6ValueContentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ValueContentData>({
    resolver: zodResolver(valueContentSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const watchedExplainServices = watch("explainServices")
  const watchedTopicsToCover = watch("topicsToCover", [])

  const handleTopicChange = (topic: string, checked: boolean) => {
    const currentTopics = watchedTopicsToCover || []
    if (checked) {
      setValue("topicsToCover", [...currentTopics, topic])
    } else {
      setValue("topicsToCover", currentTopics.filter(t => t !== topic))
    }
  }

  const onSubmit = (formData: ValueContentData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          💡 Contenido de valor
        </h2>
        <p className="text-center text-brand-gray">
          Definan qué tipo de contenido educativo quieren compartir
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Explicar servicios */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="explainServices"
                checked={watchedExplainServices}
                onCheckedChange={(checked) => setValue("explainServices", checked as boolean)}
              />
              <Label htmlFor="explainServices">
                ¿Quieren que expliquemos en redes qué es su servicio y cómo funciona?
              </Label>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              (Explicar el proceso, beneficios, metodología de trabajo)
            </p>
          </div>

          {/* Temas a abordar */}
          <div className="space-y-4">
            <Label>¿Qué temas les gustaría que cubramos en el contenido educativo? *</Label>
            <p className="text-sm text-muted-foreground">
              Seleccionen los temas que les gustaría que abordemos en el contenido de valor
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topicsToCover.map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={topic}
                    checked={watchedTopicsToCover?.includes(topic) || false}
                    onCheckedChange={(checked) => 
                      handleTopicChange(topic, checked as boolean)
                    }
                  />
                  <Label htmlFor={topic} className="text-sm font-normal">
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
            {errors.topicsToCover && (
              <p className="text-sm text-destructive">{errors.topicsToCover.message}</p>
            )}
          </div>

          {/* Contenido existente */}
          <div className="space-y-2">
            <Label htmlFor="existingContent">
              ¿Tienen información ya escrita que podamos usar?
            </Label>
            <Textarea
              id="existingContent"
              placeholder="Ej: Manuales, folletos, artículos, investigaciones, testimonios escritos, descripciones de servicios... Compartan cualquier material que ya tengan"
              rows={4}
              {...register("existingContent")}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={onBack} className="border-black text-black hover:bg-black/5">
              ← Atrás
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting} className="bg-black text-white hover:bg-black/90">
              {isSubmitting ? 'Creando documento...' : 'Finalizar →'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
