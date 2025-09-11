"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { basicDataSchema, BasicData, SECTORS } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Step1BasicDataProps {
  data?: Partial<BasicData>
  onNext: (data: BasicData) => void
  onBack?: () => void
}

export function Step1BasicData({ data, onNext, onBack }: Step1BasicDataProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BasicData>({
    resolver: zodResolver(basicDataSchema),
    defaultValues: data,
    mode: "onChange"
  })

  const watchedSocial = watch("social")

  const onSubmit = (formData: BasicData) => {
    onNext(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-3xl">👤</span>
          <div>
            <h2 className="text-2xl font-bold">Datos básicos</h2>
            <p className="text-gray-600 font-normal">
              Cuéntanos sobre ti y tu empresa
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Información personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de contacto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Tu nombre completo"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="tu@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa *</Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Nombre de tu empresa"
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && (
                  <p className="text-sm text-red-500">{errors.company.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Información de la empresa */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de la empresa</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Sector de la empresa *</Label>
                <Select
                  value={watch("sector")}
                  onValueChange={(value) => setValue("sector", value as any)}
                >
                  <SelectTrigger className={errors.sector ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona un sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sector && (
                  <p className="text-sm text-red-500">{errors.sector.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Sitio web</Label>
                <Input
                  id="website"
                  type="url"
                  {...register("website")}
                  placeholder="https://tu-empresa.com"
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Redes sociales</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instagram" className="text-sm text-gray-600">
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      {...register("social.instagram")}
                      placeholder="@tu_empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook" className="text-sm text-gray-600">
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      {...register("social.facebook")}
                      placeholder="@tu.empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiktok" className="text-sm text-gray-600">
                      TikTok
                    </Label>
                    <Input
                      id="tiktok"
                      {...register("social.tiktok")}
                      placeholder="@tu_empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin" className="text-sm text-gray-600">
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      {...register("social.linkedin")}
                      placeholder="Tu Empresa"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Objetivo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Objetivo principal</h3>
            
            <div className="space-y-2">
              <Label htmlFor="objective">
                ¿Cuál es el objetivo principal de tu marca? *
              </Label>
              <Textarea
                id="objective"
                {...register("objective")}
                placeholder="Describe qué quieres lograr con tu identidad de marca, qué mensaje quieres transmitir y cómo quieres que te perciban tus clientes..."
                rows={4}
                className={errors.objective ? "border-red-500" : ""}
              />
              {errors.objective && (
                <p className="text-sm text-red-500">{errors.objective.message}</p>
              )}
              <p className="text-xs text-gray-500">
                Mínimo 10 caracteres. Sé específico sobre tus objetivos.
              </p>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between pt-6">
            {onBack && (
              <Button type="button" variant="outline" onClick={onBack}>
                Atrás
              </Button>
            )}
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
