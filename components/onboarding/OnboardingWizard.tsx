"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Stepper } from "./Stepper"
import { Step1AboutYou } from "./steps/Step1AboutYou"
import { Step2Services } from "./steps/Step2Services"
import { Step3TargetAudience } from "./steps/Step3TargetAudience"
import { Step4VisualStyle } from "./steps/Step4VisualStyle"
import { Step4Branding } from "./steps/Step4Branding"
import { Step5ContentProduction } from "./steps/Step5ContentProduction"
import { Step6ValueContent } from "./steps/Step6ValueContent"
import { OnboardingData } from "@/lib/validations"

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void
}

const steps = [
  "Sobre ustedes",
  "Qué ofrecen", 
  "A quién ayudan",
  "Estilo visual",
  "Branding",
  "Producción",
  "Contenido"
]

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<OnboardingData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleStepComplete = async (stepData: any) => {
    const newFormData = { ...formData, ...stepData }
    setFormData(newFormData)

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    } else {
      // Formulario completo - crear documento en Google Docs
      await handleSubmit(newFormData as OnboardingData)
    }
  }

  const handleSubmit = async (data: OnboardingData) => {
    setIsSubmitting(true)
    try {
      // Crear documento en Google Docs
      const response = await fetch('/api/create-brand-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Mostrar éxito con enlace al documento
        console.log('Documento creado:', result.documentUrl)
        onComplete(data)
      } else {
        throw new Error('Error creating document')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear el documento. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1AboutYou
            data={formData.aboutYou || { projectName: "", founders: [], motivation: "", brandIdentity: "" }}
            onNext={(data) => handleStepComplete({ aboutYou: data })}
          />
        )
      case 2:
        return (
          <Step2Services
            data={formData.services || { services: [], customService: "", hasPrices: undefined, hasPromotion: false }}
            onNext={(data) => handleStepComplete({ services: data })}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <Step3TargetAudience
            data={formData.targetAudience || { idealClients: [], ageRange: "", decisionMaker: "", clientConcerns: "", clientGoals: "" }}
            onNext={(data) => handleStepComplete({ targetAudience: data })}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <Step4VisualStyle
            data={formData.visualStyle || { visualStyle: [], inspirationLinks: [], avoidContent: "" }}
            onNext={(data) => handleStepComplete({ visualStyle: data })}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <Step4Branding
            data={formData.branding || { primaryColor: "#000000", secondaryColor: "#FFFFFF", logoUrl: "", moodboardUrl: "", typographyStyle: "", visualElements: "" }}
            onNext={(data) => handleStepComplete({ branding: data })}
            onBack={handleBack}
          />
        )
      case 6:
        return (
          <Step5ContentProduction
            data={formData.contentProduction || { willingToAppear: false, videoTypes: [], keyMessages: "", availability: "", location: "", resources: "" }}
            onNext={(data) => handleStepComplete({ contentProduction: data })}
            onBack={handleBack}
          />
        )
      case 7:
        return (
          <Step6ValueContent
            data={formData.valueContent || { explainServices: false, topicsToCover: [], existingContent: "" }}
            onNext={(data) => handleStepComplete({ valueContent: data })}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Brand Brief - Digit Ads
          </h1>
          <p className="text-gray-600">
            Paso {currentStep} de {steps.length}
          </p>
        </div>

        {/* Stepper */}
        <Stepper currentStep={currentStep} totalSteps={steps.length} steps={steps} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}