"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reviewSchema, Review, OnboardingData } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SummaryAccordion } from "../SummaryAccordion"
import { BrandPreview } from "../BrandPreview"
import { useState } from "react"

interface Step5ReviewProps {
  data: OnboardingData
  onNext: (data: Review) => void
  onBack: () => void
  isSubmitting?: boolean
}

export function Step5Review({ data, onNext, onBack, isSubmitting = false }: Step5ReviewProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<Review>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      dataVerified: false
    },
    mode: "onChange"
  })

  const watchedVerified = watch("dataVerified")

  const onSubmit = (formData: Review) => {
    onNext(formData)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <span className="text-3xl">📋</span>
            <div>
              <h2 className="text-2xl font-bold">Revisión final</h2>
              <p className="text-gray-600 font-normal">
                Revisa toda la información antes de enviar tu Brand Brief
              </p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resumen detallado */}
        <div className="space-y-6">
          <SummaryAccordion data={data} />
        </div>

        {/* Vista previa */}
        <div className="space-y-6">
          <BrandPreview
            basicData={data.basicData}
            visualIdentity={data.visualIdentity}
            styleTone={data.styleTone}
          />
        </div>
      </div>

      {/* Verificación y envío */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Verificación final</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="dataVerified"
                    {...register("dataVerified")}
                    className="mt-1"
                  />
                  <div className="space-y-2">
                    <Label 
                      htmlFor="dataVerified" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      He revisado toda la información y confirmo que es correcta
                    </Label>
                    <p className="text-xs text-gray-600">
                      Al marcar esta casilla, confirmas que toda la información proporcionada 
                      es precisa y que estás de acuerdo con el procesamiento de estos datos 
                      para crear tu Brand Brief.
                    </p>
                  </div>
                </div>
                {errors.dataVerified && (
                  <p className="text-sm text-red-500">{errors.dataVerified.message}</p>
                )}
              </div>

              {/* Información sobre el proceso */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 text-blue-900">
                  ¿Qué sucede después?
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Se guardará toda tu información en nuestra base de datos</li>
                  <li>• Se subirán tus archivos de manera segura</li>
                  <li>• Se generará un PDF con tu Brand Brief completo</li>
                  <li>• Recibirás un enlace para descargar el documento</li>
                  <li>• Te contactaremos pronto para agendar una consulta</li>
                </ul>
              </div>

              {/* Términos y condiciones */}
              <div className="text-xs text-gray-500 space-y-2">
                <p>
                  Al enviar este formulario, aceptas nuestros términos de servicio y 
                  política de privacidad. Tus datos serán utilizados únicamente para 
                  crear tu Brand Brief y contactarte sobre el proyecto.
                </p>
                <p>
                  Puedes solicitar la eliminación de tus datos en cualquier momento 
                  contactándonos directamente.
                </p>
              </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                disabled={isSubmitting}
              >
                Atrás
              </Button>
              <Button 
                type="submit" 
                disabled={!isValid || isSubmitting}
                className="ml-auto min-w-32"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </div>
                ) : (
                  "Enviar Brand Brief"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
