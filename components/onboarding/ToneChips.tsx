"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ToneChipsProps {
  options: Array<{
    value: string
    label: string
    emoji: string
  }>
  selected: string[]
  onChange: (selected: string[]) => void
  multiple?: boolean
  title?: string
  description?: string
}

export function ToneChips({
  options,
  selected,
  onChange,
  multiple = true,
  title,
  description
}: ToneChipsProps) {
  const handleSelect = (value: string) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter(item => item !== value))
      } else {
        onChange([...selected, value])
      }
    } else {
      onChange([value])
    }
  }

  return (
    <div className="space-y-4">
      {title && (
        <div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.value)
          
          return (
            <Button
              key={option.value}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "hover:bg-gray-50 hover:border-gray-300"
              )}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              <span className="text-2xl">{option.emoji}</span>
              <span className="text-sm font-medium">{option.label}</span>
            </Button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const option = options.find(opt => opt.value === value)
            return (
              <div
                key={value}
                className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                <span>{option?.emoji}</span>
                <span>{option?.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
