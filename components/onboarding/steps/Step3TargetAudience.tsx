"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { targetAudienceSchema, type TargetAudienceData } from "@/lib/validations"

interface Step3TargetAudienceProps {
  data: TargetAudienceData
  onNext: (data: TargetAudienceData) => void
  onBack: () => void
}

const ageRanges = [
  "0-5 años",
  "6-12 años", 
  "13-17 años",
  "18-25 años",
  "26-35 años",
  "36-45 años",
  "46-55 años",
  "56-65 años",
  "65+ años",
  "Todas las edades"
]

export function Step3TargetAudience({ data, onNext, onBack }: Step3TargetAudienceProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<TargetAudienceData>({
    resolver: zodResolver(targetAudienceSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "idealClients",
  })

  const watchedAgeRange = watch("ageRange")

  const onSubmit = (formData: TargetAudienceData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          🎯 A quién quieren ayudar
        </h2>
        <p className="text-center text-brand-gray">
          Definan su cliente ideal (buyer persona)
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Clientes ideales */}
          <div className="space-y-4">
            <Label>¿Quién es su paciente o cliente ideal? *</Label>
            <p className="text-sm text-muted-foreground">
              Pueden elegir más de uno y describirlos a fondo
            </p>
            
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <Label>Cliente ideal #{index + 1}</Label>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  placeholder="Describa a fondo este tipo de cliente: edad, situación, necesidades, motivaciones..."
                  rows={4}
                  {...register(`idealClients.${index}.description`)}
                />
                {errors.idealClients?.[index]?.description && (
                  <p className="text-sm text-destructive">
                    {errors.idealClients[index]?.description?.message}
                  </p>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ description: "" })}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar otro tipo de cliente
            </Button>
            {errors.idealClients && (
              <p className="text-sm text-destructive">{errors.idealClients.message}</p>
            )}
          </div>

          {/* Rango de edad */}
          <div className="space-y-2">
            <Label htmlFor="ageRange">¿Qué edad tienen usualmente sus pacientes? *</Label>
            <Select value={watchedAgeRange} onValueChange={(value) => setValue("ageRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el rango de edad" />
              </SelectTrigger>
              <SelectContent>
                {ageRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ageRange && (
              <p className="text-sm text-destructive">{errors.ageRange.message}</p>
            )}
          </div>

          {/* Tomador de decisión */}
          <div className="space-y-2">
            <Label htmlFor="decisionMaker">
              ¿Quién suele tomar la decisión de comprar? *
            </Label>
            <Textarea
              id="decisionMaker"
              placeholder="Ej: Los padres, el paciente mismo, un familiar, un terapeuta que recomienda..."
              rows={3}
              {...register("decisionMaker")}
            />
            {errors.decisionMaker && (
              <p className="text-sm text-destructive">{errors.decisionMaker.message}</p>
            )}
          </div>

          {/* Dudas y miedos */}
          <div className="space-y-2">
            <Label htmlFor="clientConcerns">
              ¿Qué tipo de frases, dudas o miedos tiene su cliente ideal? *
            </Label>
            <Textarea
              id="clientConcerns"
              placeholder="Ej: '¿Realmente funcionará?', '¿Es seguro?', '¿Cuánto tiempo tomará ver resultados?', '¿Puedo permitírmelo?'..."
              rows={4}
              {...register("clientConcerns")}
            />
            {errors.clientConcerns && (
              <p className="text-sm text-destructive">{errors.clientConcerns.message}</p>
            )}
          </div>

          {/* Objetivos del cliente */}
          <div className="space-y-2">
            <Label htmlFor="clientGoals">
              ¿Qué le gustaría lograr su cliente ideal con las terapias? *
            </Label>
            <Textarea
              id="clientGoals"
              placeholder="Ej: Mejorar su autoestima, superar miedos, desarrollar habilidades sociales, encontrar paz interior..."
              rows={4}
              {...register("clientGoals")}
            />
            {errors.clientGoals && (
              <p className="text-sm text-destructive">{errors.clientGoals.message}</p>
            )}
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
