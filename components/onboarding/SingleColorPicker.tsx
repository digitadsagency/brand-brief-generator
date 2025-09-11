"use client"

import { HexColorPicker } from "react-colorful"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { validateHexColor } from "@/lib/utils"

interface SingleColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
}

export function SingleColorPicker({ color, onChange, label = "Color" }: SingleColorPickerProps) {
  const handleColorChange = (newColor: string) => {
    onChange(newColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Permitir escribir aunque no sea válido aún (para que puedan escribir # y luego el código)
    onChange(value)
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">{label}</Label>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Vista previa del color */}
            <div className="flex items-center space-x-4">
              <div
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: color }}
              />
              <div className="flex-1">
                <Label htmlFor="color-input">Código hexadecimal</Label>
                <Input
                  id="color-input"
                  value={color}
                  onChange={handleInputChange}
                  className="font-mono mt-1"
                  placeholder="#000000"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {color.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Selector visual */}
            <div className="space-y-2">
              <Label>Selector visual</Label>
              <div className="flex justify-center">
                <HexColorPicker
                  color={color}
                  onChange={handleColorChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
