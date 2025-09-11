"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Mail, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const searchParams = useSearchParams()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [onboardingId] = useState(searchParams.get('id'))

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      // Aquí se generaría el PDF real basado en el ID
      // Por ahora simulamos la descarga
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Crear un enlace de descarga simulado
      const link = document.createElement('a')
      link.href = '#'
      link.download = 'brand-brief.pdf'
      link.click()
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const handleEmailPDF = () => {
    // Aquí se enviaría el PDF por email
    window.open('mailto:hola@digitads.com?subject=Brand Brief - Solicitud de envío por email')
  }

  const handleScheduleCall = () => {
    // Aquí se abriría un modal de Calendly o similar
    window.open('https://calendly.com/digitads/consulta-marca', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="text-center">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-green-800">
              ¡Brand Brief Completado!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Tu solicitud ha sido enviada exitosamente. Te contactaremos pronto.
            </p>
            {onboardingId && (
              <p className="text-sm text-gray-500 mt-2">
                ID de solicitud: {onboardingId}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Confetti effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center space-x-1"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, rotate: 0 }}
                  animate={{ y: [-10, 10, -5, 5, 0], rotate: [0, 180, 360] }}
                  transition={{
                    delay: 0.6 + i * 0.1,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="text-2xl"
                >
                  {['🎉', '✨', '🎊', '🌟', '💫', '🎈'][i]}
                </motion.div>
              ))}
            </motion.div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Próximos pasos:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• Revisaremos tu Brand Brief en las próximas 24 horas</li>
                <li>• Te enviaremos un email de confirmación</li>
                <li>• Agendaremos una llamada para discutir tu proyecto</li>
                <li>• Comenzaremos a trabajar en tu identidad de marca</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isGeneratingPDF ? 'Generando PDF...' : 'Descargar Brand Brief'}
                </span>
              </Button>

              <Button
                variant="outline"
                onClick={handleEmailPDF}
                className="flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar por email</span>
              </Button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                ¿Listo para el siguiente paso?
              </h3>
              <p className="text-sm text-purple-800 mb-4">
                Agenda una consulta gratuita para discutir tu proyecto en detalle.
              </p>
              <Button
                onClick={handleScheduleCall}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Agendar consulta gratuita
              </Button>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="text-sm text-gray-500">
                <p>¿Necesitas ayuda? Contáctanos:</p>
                <p className="font-medium">hola@digitads.com | +1 (555) 123-4567</p>
              </div>
              
              <Link href="/">
                <Button variant="ghost" className="text-gray-500">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
