"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { brandUsageSchema, BrandUsage, CHANNEL_OPTIONS, DELIVERABLE_OPTIONS, TIMELINE_OPTIONS, BUDGET_OPTIONS } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface Step4BrandUsageProps {
  data?: Partial<BrandUsage>
  onNext: (data: BrandUsage) => void
  onBack: () => void
}

export function Step4BrandUsage({ data, onNext, onBack }: Step4BrandUsageProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BrandUsage>({
    resolver: zodResolver(brandUsageSchema),
    defaultValues: {
      channels: data?.channels || [],
      deliverables: data?.deliverables || [],
      timeline: data?.timeline || "1 mes",
      budgetRange: data?.budgetRange || "1000-5000",
      notes: data?.notes || "",
      ...data
    },
    mode: "onChange"
  })

  const watchedChannels = watch("channels")
  const watchedDeliverables = watch("deliverables")

  const onSubmit = (formData: BrandUsage) => {
    onNext(formData)
  }

  const handleChannelChange = (channel: string, checked: boolean) => {
    const currentChannels = watchedChannels || []
    if (checked) {
      setValue("channels", [...currentChannels, channel], { shouldValidate: true })
    } else {
      setValue("channels", currentChannels.filter(c => c !== channel), { shouldValidate: true })
    }
  }

  const handleDeliverableChange = (deliverable: string, checked: boolean) => {
    const currentDeliverables = watchedDeliverables || []
    if (checked) {
      setValue("deliverables", [...currentDeliverables, deliverable], { shouldValidate: true })
    } else {
      setValue("deliverables", currentDeliverables.filter(d => d !== deliverable), { shouldValidate: true })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-3xl">🚀</span>
          <div>
            <h2 className="text-2xl font-bold">Uso de marca</h2>
            <p className="text-gray-600 font-normal">
              Define dónde y cómo se usará tu marca, y qué necesitas
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Canales de uso */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">¿Dónde se usará tu marca? *</h3>
              <p className="text-sm text-gray-600 mb-4">
                Selecciona todos los canales donde planeas usar tu identidad de marca
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CHANNEL_OPTIONS.map((channel) => (
                <div key={channel.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={channel.value}
                    checked={watchedChannels?.includes(channel.value) || false}
                    onCheckedChange={(checked) => 
                      handleChannelChange(channel.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={channel.value} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {channel.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.channels && (
              <p className="text-sm text-red-500">{errors.channels.message}</p>
            )}
          </div>

          {/* Entregables */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">¿Qué entregables necesitas? *</h3>
              <p className="text-sm text-gray-600 mb-4">
                Selecciona todos los elementos que necesitas para tu marca
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DELIVERABLE_OPTIONS.map((deliverable) => (
                <div key={deliverable.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={deliverable.value}
                    checked={watchedDeliverables?.includes(deliverable.value) || false}
                    onCheckedChange={(checked) => 
                      handleDeliverableChange(deliverable.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={deliverable.value} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {deliverable.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.deliverables && (
              <p className="text-sm text-red-500">{errors.deliverables.message}</p>
            )}
          </div>

          {/* Plazos y presupuesto */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Plazos y presupuesto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timeline">Plazo estimado *</Label>
                <Select
                  value={watch("timeline")}
                  onValueChange={(value) => setValue("timeline", value as any)}
                >
                  <SelectTrigger className={errors.timeline ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona un plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMELINE_OPTIONS.map((timeline) => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeline && (
                  <p className="text-sm text-red-500">{errors.timeline.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetRange">Rango de presupuesto *</Label>
                <Select
                  value={watch("budgetRange")}
                  onValueChange={(value) => setValue("budgetRange", value as any)}
                >
                  <SelectTrigger className={errors.budgetRange ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona un rango" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budgetRange && (
                  <p className="text-sm text-red-500">{errors.budgetRange.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Notas adicionales */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Notas adicionales</h3>
              <p className="text-sm text-gray-600 mb-4">
                ¿Hay algo más que quieras que sepamos sobre tu proyecto?
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Comentarios adicionales</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Cualquier información adicional que consideres relevante para tu proyecto de marca..."
                rows={4}
              />
              <p className="text-xs text-gray-500">
                Esta información nos ayudará a entender mejor tus necesidades específicas.
              </p>
            </div>
          </div>

          {/* Resumen de selecciones */}
          {(watchedChannels?.length || 0) > 0 && (watchedDeliverables?.length || 0) > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold mb-3 text-blue-900">Resumen de tu proyecto</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div>
                  <span className="font-medium">Canales seleccionados:</span>{" "}
                  {watchedChannels?.length || 0} canal(es)
                </div>
                <div>
                  <span className="font-medium">Entregables solicitados:</span>{" "}
                  {watchedDeliverables?.length || 0} elemento(s)
                </div>
                <div>
                  <span className="font-medium">Plazo:</span> {watch("timeline")}
                </div>
                <div>
                  <span className="font-medium">Presupuesto:</span> {watch("budgetRange")}
                </div>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">💡 Información útil</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Los canales seleccionados influyen en el diseño de los elementos</li>
              <li>• Los entregables se adaptan a tus necesidades específicas</li>
              <li>• El plazo y presupuesto nos ayudan a planificar el proyecto</li>
              <li>• Las notas adicionales son muy valiosas para personalizar el trabajo</li>
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
