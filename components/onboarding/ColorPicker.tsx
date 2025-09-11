"use client"

import { useState } from "react"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { X, Plus } from "lucide-react"
import { cn, validateHexColor } from "@/lib/utils"

interface ColorPickerProps {
  colors: string[]
  onChange: (colors: string[]) => void
  maxColors?: number
}

export function ColorPicker({ colors, onChange, maxColors = 3 }: ColorPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [customColor, setCustomColor] = useState("#000000")

  const addColor = () => {
    if (colors.length < maxColors && validateHexColor(customColor)) {
      onChange([...colors, customColor])
      setCustomColor("#000000")
    }
  }

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index)
    onChange(newColors)
    if (selectedIndex === index) {
      setSelectedIndex(null)
    } else if (selectedIndex !== null && selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const updateColor = (index: number, newColor: string) => {
    const newColors = [...colors]
    newColors[index] = newColor
    onChange(newColors)
  }

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color)
  }

  return (
    <div className="space-y-6">
      {/* Colores actuales */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">
          Paleta de colores ({colors.length}/{maxColors})
        </Label>
        
        {colors.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <Card key={index} className="relative group">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1 min-w-0">
                      <Input
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="font-mono text-sm"
                        placeholder="#000000"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {color.toUpperCase()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeColor(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Selector de color */}
        {colors.length < maxColors && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: customColor }}
                  />
                  <div className="flex-1">
                    <Label htmlFor="custom-color">Color personalizado</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="custom-color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="font-mono"
                        placeholder="#000000"
                      />
                      <Button
                        type="button"
                        onClick={addColor}
                        disabled={!validateHexColor(customColor)}
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Selector visual</Label>
                  <div className="flex justify-center">
                    <HexColorPicker
                      color={customColor}
                      onChange={handleCustomColorChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Información de accesibilidad */}
      {colors.length > 0 && (
        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">💡 Consejos de accesibilidad:</p>
          <ul className="space-y-1 text-xs">
            <li>• Asegúrate de que haya suficiente contraste entre colores</li>
            <li>• Considera cómo se verán en diferentes dispositivos</li>
            <li>• Prueba la combinación con texto blanco y negro</li>
          </ul>
        </div>
      )}
    </div>
  )
}
