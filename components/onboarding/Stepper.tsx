"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepperProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function Stepper({ currentStep, totalSteps, steps }: StepperProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
                          <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                {
                  "bg-black border-black text-white": isCompleted || isCurrent,
                  "border-gray-300 text-gray-400": isUpcoming,
                }
              )}
            >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center max-w-20",
                  {
                    "text-black": isCompleted || isCurrent,
                    "text-gray-400": isUpcoming,
                  }
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
      
      {/* Progress bar */}
                  <div className="mt-4 w-full bg-gray-200 rounded-sm h-2">
              <div
                className="bg-black h-2 rounded-sm transition-all duration-300 ease-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              />
            </div>
    </div>
  )
}