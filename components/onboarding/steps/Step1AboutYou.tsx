"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { aboutYouSchema, type AboutYouData } from "@/lib/validations"

interface Step1AboutYouProps {
  data: AboutYouData
  onNext: (data: AboutYouData) => void
}

export function Step1AboutYou({ data, onNext }: Step1AboutYouProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AboutYouData>({
    resolver: zodResolver(aboutYouSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "founders",
  })

  const onSubmit = (formData: AboutYouData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          📋 Sobre ustedes
        </h2>
        <p className="text-center text-brand-gray">
          Cuéntanos sobre su proyecto y equipo
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre del proyecto */}
          <div className="space-y-2">
            <Label htmlFor="projectName">Nombre del proyecto *</Label>
            <Input
              id="projectName"
              placeholder="Ej: Terapias Equinas Luna"
              {...register("projectName")}
            />
            {errors.projectName && (
              <p className="text-sm text-destructive">{errors.projectName.message}</p>
            )}
          </div>

          {/* Fundadores */}
          <div className="space-y-4">
            <Label>Fundadoras y sus roles *</Label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Nombre completo"
                    {...register(`founders.${index}.name`)}
                  />
                  {errors.founders?.[index]?.name && (
                    <p className="text-sm text-destructive">
                      {errors.founders[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Rol en el proyecto"
                    {...register(`founders.${index}.role`)}
                  />
                  {errors.founders?.[index]?.role && (
                    <p className="text-sm text-destructive">
                      {errors.founders[index]?.role?.message}
                    </p>
                  )}
                </div>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", role: "" })}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar otra fundadora
            </Button>
            {errors.founders && (
              <p className="text-sm text-destructive">{errors.founders.message}</p>
            )}
          </div>

          {/* Motivación */}
          <div className="space-y-2">
            <Label htmlFor="motivation">
              ¿Qué las motivó a crear este proyecto? *
            </Label>
            <Textarea
              id="motivation"
              placeholder="Cuéntanos con sus propias palabras qué las inspiró a iniciar este proyecto..."
              rows={4}
              {...register("motivation")}
            />
            {errors.motivation && (
              <p className="text-sm text-destructive">{errors.motivation.message}</p>
            )}
          </div>

          {/* Identidad de marca */}
          <div className="space-y-2">
            <Label htmlFor="brandIdentity">
              ¿Cómo les gustaría que la gente las recuerde o identifique como marca? *
            </Label>
            <Textarea
              id="brandIdentity"
              placeholder="Describa cómo quieren ser percibidas, qué valores quieren transmitir..."
              rows={4}
              {...register("brandIdentity")}
            />
            {errors.brandIdentity && (
              <p className="text-sm text-destructive">{errors.brandIdentity.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={!isValid} className="bg-black text-white hover:bg-black/90">
              Continuar →
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
