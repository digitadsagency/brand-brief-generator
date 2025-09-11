"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { styleToneSchema, StyleTone, STYLE_OPTIONS, TONE_OPTIONS } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToneChips } from "../ToneChips"
import { Sliders } from "../Sliders"
import { useState } from "react"

interface Step3StyleToneProps {
  data?: Partial<StyleTone>
  onNext: (data: StyleTone) => void
  onBack: () => void
}

export function Step3StyleTone({ data, onNext, onBack }: Step3StyleToneProps) {
  const [includeKeywords, setIncludeKeywords] = useState<string[]>(data?.keywords?.include || [])
  const [excludeKeywords, setExcludeKeywords] = useState<string[]>(data?.keywords?.exclude || [])
  const [currentKeyword, setCurrentKeyword] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<StyleTone>({
    resolver: zodResolver(styleToneSchema),
    defaultValues: {
      styleTags: data?.styleTags || [],
      tone: data?.tone || "casual",
      sliders: data?.sliders || {
        innovacion: 50,
        seriedad: 50,
        diversion: 50
      },
      keywords: data?.keywords || { include: [], exclude: [] },
      ...data
    },
    mode: "onChange"
  })

  const watchedStyleTags = watch("styleTags")
  const watchedTone = watch("tone")
  const watchedSliders = watch("sliders")

  const onSubmit = (formData: StyleTone) => {
    const processedData = {
      ...formData,
      keywords: {
        include: includeKeywords,
        exclude: excludeKeywords
      }
    }
    onNext(processedData)
  }

  const handleStyleChange = (styles: string[]) => {
    setValue("styleTags", styles, { shouldValidate: true })
  }

  const handleToneChange = (tone: string) => {
    setValue("tone", tone as any, { shouldValidate: true })
  }

  const handleSlidersChange = (sliders: { innovacion: number; seriedad: number; diversion: number }) => {
    setValue("sliders", sliders, { shouldValidate: true })
  }

  const addKeyword = (keyword: string, type: "include" | "exclude") => {
    if (keyword.trim()) {
      if (type === "include") {
        if (!includeKeywords.includes(keyword)) {
          setIncludeKeywords([...includeKeywords, keyword])
        }
      } else {
        if (!excludeKeywords.includes(keyword)) {
          setExcludeKeywords([...excludeKeywords, keyword])
        }
      }
    }
  }

  const removeKeyword = (keyword: string, type: "include" | "exclude") => {
    if (type === "include") {
      setIncludeKeywords(includeKeywords.filter(k => k !== keyword))
    } else {
      setExcludeKeywords(excludeKeywords.filter(k => k !== keyword))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <span className="text-3xl">✨</span>
          <div>
            <h2 className="text-2xl font-bold">Estilo y tono</h2>
            <p className="text-gray-600 font-normal">
              Define la personalidad y el estilo de comunicación de tu marca
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Estilos */}
          <div className="space-y-4">
            <ToneChips
              options={STYLE_OPTIONS}
              selected={watchedStyleTags || []}
              onChange={handleStyleChange}
              title="Estilos de marca"
              description="Selecciona los estilos que mejor representen tu marca (puedes elegir varios)"
            />
            {errors.styleTags && (
              <p className="text-sm text-red-500">{errors.styleTags.message}</p>
            )}
          </div>

          {/* Tono de comunicación */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tono de comunicación</h3>
              <p className="text-sm text-gray-600 mb-4">
                ¿Cómo quieres que se comunique tu marca?
              </p>
            </div>

            <RadioGroup
              value={watchedTone}
              onValueChange={handleToneChange}
              className="grid grid-cols-2 gap-4"
            >
              {TONE_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.tone && (
              <p className="text-sm text-red-500">{errors.tone.message}</p>
            )}
          </div>

          {/* Palabras clave */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Palabras clave</h3>
              <p className="text-sm text-gray-600 mb-4">
                ¿Qué palabras quieres asociar o evitar en tu marca?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Palabras a incluir */}
              <div className="space-y-3">
                <Label className="text-green-700 font-medium">
                  ✅ Palabras que SÍ quieres asociar
                </Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ej: innovación, calidad..."
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addKeyword(currentKeyword, "include")
                        setCurrentKeyword("")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addKeyword(currentKeyword, "include")
                      setCurrentKeyword("")
                    }}
                    size="sm"
                  >
                    Agregar
                  </Button>
                </div>
                {includeKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {includeKeywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{keyword}</span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword, "include")}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Palabras a evitar */}
              <div className="space-y-3">
                <Label className="text-red-700 font-medium">
                  ❌ Palabras que NO quieres asociar
                </Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ej: barato, básico..."
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addKeyword(currentKeyword, "exclude")
                        setCurrentKeyword("")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addKeyword(currentKeyword, "exclude")
                      setCurrentKeyword("")
                    }}
                    size="sm"
                    variant="outline"
                  >
                    Agregar
                  </Button>
                </div>
                {excludeKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {excludeKeywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{keyword}</span>
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword, "exclude")}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sliders de personalidad */}
          <div className="space-y-4">
            <Sliders
              values={watchedSliders || { innovacion: 50, seriedad: 50, diversion: 50 }}
              onChange={handleSlidersChange}
              title="Personalidad de marca"
              description="Ajusta estos sliders para definir la personalidad de tu marca"
            />
            {errors.sliders && (
              <p className="text-sm text-red-500">{errors.sliders.message}</p>
            )}
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">💡 Consejos para definir tu estilo</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Piensa en cómo quieres que se sientan tus clientes</li>
              <li>• El tono debe ser consistente en todos los canales</li>
              <li>• Las palabras clave ayudan a mantener coherencia</li>
              <li>• Los sliders te ayudan a balancear diferentes aspectos</li>
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
