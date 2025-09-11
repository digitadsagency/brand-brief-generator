"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SliderConfig {
  key: string
  label: string
  description: string
  emoji: string
  color: string
}

interface SlidersProps {
  values: {
    innovacion: number
    seriedad: number
    diversion: number
  }
  onChange: (values: { innovacion: number; seriedad: number; diversion: number }) => void
  title?: string
  description?: string
}

const sliderConfigs: SliderConfig[] = [
  {
    key: "innovacion",
    label: "Innovación",
    description: "Qué tan innovadora y moderna es tu marca",
    emoji: "💡",
    color: "bg-blue-500"
  },
  {
    key: "seriedad",
    label: "Seriedad",
    description: "Qué tan profesional y seria es tu marca",
    emoji: "🎩",
    color: "bg-gray-600"
  },
  {
    key: "diversion",
    label: "Diversión",
    description: "Qué tan divertida y lúdica es tu marca",
    emoji: "🎉",
    color: "bg-pink-500"
  }
]

export function Sliders({ values, onChange, title, description }: SlidersProps) {
  const handleSliderChange = (key: keyof typeof values, newValue: number[]) => {
    onChange({
      ...values,
      [key]: newValue[0]
    })
  }

  const getSliderColor = (value: number) => {
    if (value < 33) return "bg-red-500"
    if (value < 66) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      {title && (
        <div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-6">
        {sliderConfigs.map((config) => {
          const value = values[config.key as keyof typeof values]
          
          return (
            <Card key={config.key}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{config.emoji}</span>
                    <div className="flex-1">
                      <Label className="text-base font-medium">
                        {config.label}
                      </Label>
                      <p className="text-sm text-gray-600">
                        {config.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {value}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) => 
                        handleSliderChange(config.key as keyof typeof values, newValue)
                      }
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Indicador visual */}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-300",
                          getSliderColor(value)
                        )}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 min-w-0">
                      {value < 33 && "Bajo"}
                      {value >= 33 && value < 66 && "Medio"}
                      {value >= 66 && "Alto"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Resumen de valores */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h4 className="text-sm font-medium mb-3">Resumen de personalidad</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            {sliderConfigs.map((config) => {
              const value = values[config.key as keyof typeof values]
              return (
                <div key={config.key} className="space-y-1">
                  <div className="text-lg">{config.emoji}</div>
                  <div className="text-xs font-medium">{config.label}</div>
                  <div className="text-lg font-bold text-primary">{value}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
