"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, getContrastRatio } from "@/lib/utils"
import { BasicData, VisualIdentity, StyleTone } from "@/lib/schemas"

interface BrandPreviewProps {
  basicData?: Partial<BasicData>
  visualIdentity?: Partial<VisualIdentity>
  styleTone?: Partial<StyleTone>
  className?: string
}

export function BrandPreview({ 
  basicData, 
  visualIdentity, 
  styleTone,
  className 
}: BrandPreviewProps) {
  const primaryColor = visualIdentity?.palette?.[0] || "#3B82F6"
  const secondaryColor = visualIdentity?.palette?.[1] || "#1E40AF"
  const accentColor = visualIdentity?.palette?.[2] || "#F59E0B"

  // Calcular contraste para texto
  const textColor = getContrastRatio(primaryColor, "#FFFFFF") > 4.5 ? "#FFFFFF" : "#000000"
  const secondaryTextColor = getContrastRatio(secondaryColor, "#FFFFFF") > 4.5 ? "#FFFFFF" : "#000000"

  const companyName = basicData?.company || "Tu Empresa"
  const objective = basicData?.objective || "Objetivo principal de tu marca"
  const selectedStyles = styleTone?.styleTags || []
  const tone = styleTone?.tone || "casual"

  const toneEmojis: Record<string, string> = {
    formal: "🎩",
    casual: "😎", 
    creativo: "✨",
    cercano: "🤝"
  }

  const toneLabels: Record<string, string> = {
    formal: "Formal",
    casual: "Casual",
    creativo: "Creativo", 
    cercano: "Cercano"
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Vista previa de tu marca</h3>
        <p className="text-sm text-gray-600">
          Así se verá tu identidad visual en acción
        </p>
      </div>

      {/* Mock de tarjeta de presentación */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Header con colores de la marca */}
          <div
            className="p-6 text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-2xl font-bold"
                style={{ color: textColor }}
              >
                {companyName}
              </h2>
              {visualIdentity?.logo && (
                <div className="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center">
                  <span className="text-xs font-bold">LOGO</span>
                </div>
              )}
            </div>
            
            <p 
              className="text-sm opacity-90"
              style={{ color: textColor }}
            >
              {objective}
            </p>
          </div>

          {/* Contenido principal */}
          <div className="p-6 space-y-4">
            {/* Paleta de colores */}
            {visualIdentity?.palette && visualIdentity.palette.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Paleta de colores</h4>
                <div className="flex space-x-2">
                  {visualIdentity.palette.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-sm border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Estilos seleccionados */}
            {selectedStyles.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Estilo</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedStyles.map((style) => (
                    <Badge key={style} variant="secondary" className="text-xs">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tono de comunicación */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Tono</h4>
              <Badge 
                variant="outline" 
                className="text-xs"
              >
                {toneEmojis[tone]} {toneLabels[tone]}
              </Badge>
            </div>

            {/* Mock de botón */}
            <div className="pt-4">
              <button
                className="px-6 py-2 rounded-md font-medium text-sm transition-colors duration-200 hover:opacity-90"
                style={{ 
                  backgroundColor: secondaryColor,
                  color: secondaryTextColor
                }}
              >
                Conoce más
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de accesibilidad */}
      {visualIdentity?.palette && visualIdentity.palette.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              📊 Análisis de contraste
            </h4>
            <div className="space-y-2 text-xs text-blue-800">
              <div className="flex justify-between">
                <span>Contraste texto principal:</span>
                <span className="font-mono">
                  {getContrastRatio(primaryColor, textColor).toFixed(1)}:1
                </span>
              </div>
              <div className="flex justify-between">
                <span>Contraste botón:</span>
                <span className="font-mono">
                  {getContrastRatio(secondaryColor, secondaryTextColor).toFixed(1)}:1
                </span>
              </div>
              <div className="text-xs text-blue-600 mt-2">
                {getContrastRatio(primaryColor, textColor) >= 4.5 && 
                 getContrastRatio(secondaryColor, secondaryTextColor) >= 4.5 ? 
                  "✅ Cumple estándares de accesibilidad (AA)" : 
                  "⚠️ Considera ajustar los colores para mejor contraste"
                }
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
