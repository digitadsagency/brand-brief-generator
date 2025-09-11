"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { servicesSchema, type ServicesData } from "@/lib/validations"

interface Step2ServicesProps {
  data: ServicesData
  onNext: (data: ServicesData) => void
  onBack: () => void
}

const serviceOptions = [
  "Consultoría individual",
  "Servicios grupales", 
  "Productos físicos",
  "Servicios digitales",
  "Cursos y capacitaciones",
  "Mantenimiento y soporte",
  "Servicios de instalación",
  "Otro"
]

export function Step2Services({ data, onNext, onBack }: Step2ServicesProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ServicesData>({
    resolver: zodResolver(servicesSchema),
    defaultValues: data,
    mode: "onChange",
  })

  const watchedServices = watch("services", [])
  const watchedHasPrices = watch("hasPrices")
  const watchedHasPromotion = watch("hasPromotion")
  const watchedCustomService = watch("customService", "")

  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = watchedServices || []
    if (checked) {
      setValue("services", [...currentServices, service])
    } else {
      setValue("services", currentServices.filter(s => s !== service))
      // Si deseleccionan "Otro", limpiar el campo personalizado
      if (service === "Otro") {
        setValue("customService", "")
      }
    }
  }

  const onSubmit = (formData: ServicesData) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-center text-brand-black mb-2">
          🛠️ Qué ofrecen
        </h2>
        <p className="text-center text-brand-gray">
          Definan sus servicios y precios
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Servicios */}
          <div className="space-y-4">
            <Label>¿Qué servicios van a ofrecer desde el primer día? *</Label>
            <div className="grid grid-cols-2 gap-3">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={watchedServices?.includes(service) || false}
                    onCheckedChange={(checked) => 
                      handleServiceChange(service, checked as boolean)
                    }
                  />
                  <Label htmlFor={service} className="text-sm font-normal">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
            {errors.services && (
              <p className="text-sm text-destructive">{errors.services.message}</p>
            )}
            
            {/* Campo personalizado para "Otro" */}
            {watchedServices?.includes("Otro") && (
              <div className="space-y-2 mt-4">
                <Label htmlFor="customService">Describe tu servicio personalizado *</Label>
                <Input
                  id="customService"
                  placeholder="Ej: Servicio de limpieza especializada, Consultoría en marketing digital, Reparación de equipos..."
                  {...register("customService")}
                />
                {errors.customService && (
                  <p className="text-sm text-destructive">{errors.customService.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Precios */}
          <div className="space-y-4">
            <Label>¿Ya tienen precios definidos? *</Label>
            <RadioGroup
              value={watchedHasPrices}
              onValueChange={(value) => setValue("hasPrices", value as "yes" | "no")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="prices-yes" />
                <Label htmlFor="prices-yes">Sí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="prices-no" />
                <Label htmlFor="prices-no">Aún no</Label>
              </div>
            </RadioGroup>
            {errors.hasPrices && (
              <p className="text-sm text-destructive">{errors.hasPrices.message}</p>
            )}
          </div>

          {/* Detalles de precios */}
          {watchedHasPrices === "yes" && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <Label className="text-base font-medium">Escriban sus precios aquí:</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service1">Servicio 1</Label>
                  <Input
                    id="service1"
                    placeholder="Ej: Consultoría individual - $500"
                    {...register("prices.service1")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service2">Servicio 2</Label>
                  <Input
                    id="service2"
                    placeholder="Ej: Servicio grupal - $800"
                    {...register("prices.service2")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service3">Servicio 3</Label>
                  <Input
                    id="service3"
                    placeholder="Ej: Producto/servicio adicional - $300"
                    {...register("prices.service3")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="packages">Paquetes o promociones</Label>
                  <Input
                    id="packages"
                    placeholder="Ej: Paquete completo - $2,000"
                    {...register("prices.packages")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Promoción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasPromotion"
                checked={watchedHasPromotion}
                onCheckedChange={(checked) => setValue("hasPromotion", checked as boolean)}
              />
              <Label htmlFor="hasPromotion">
                ¿Van a ofrecer alguna promoción para el lanzamiento?
              </Label>
            </div>
            
            {watchedHasPromotion && (
              <div className="space-y-2">
                <Label htmlFor="promotionDetails">Detalles de la promoción</Label>
                <Textarea
                  id="promotionDetails"
                  placeholder="Describa la promoción, descuentos, condiciones..."
                  rows={3}
                  {...register("promotionDetails")}
                />
              </div>
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
