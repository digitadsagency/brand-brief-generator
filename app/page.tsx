"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard"
import { OnboardingData } from "@/lib/validations"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'landing' | 'onboarding' | 'success'>('landing')
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)

  const handleOnboardingComplete = async (data: OnboardingData) => {
    setOnboardingData(data)
    setCurrentView('success')
    
    // Aquí se guardaría en Supabase
    console.log('Onboarding data:', data)
  }


  const handleStartOver = () => {
    setCurrentView('landing')
    setOnboardingData(null)
  }

  if (currentView === 'onboarding') {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />
  }

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl text-center"
        >
          {/* Ícono de éxito con animación mejorada */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
            className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6"
          >
            ¡Brand Brief Completado!
          </motion.h1>

          {/* Mensaje principal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-700 text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Con esto se inicia la experiencia y a llevar tu marca al siguiente nivel. 
            Tu Brand Brief ha sido enviado exitosamente a Digit Ads.
          </motion.p>

          {/* Próximos pasos con diseño mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-2xl mb-12 max-w-2xl mx-auto shadow-xl border border-gray-100"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <h3 className="font-bold text-2xl text-gray-800">
                Próximos pasos con Digit Ads:
              </h3>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-lg text-gray-700 font-medium">
                  Nuestro equipo revisará tu Brand Brief en las próximas 24 horas
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sección de experiencia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-2xl mb-12 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">🚀 La experiencia comienza ahora</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Estás a punto de descubrir el poder de una marca bien definida. 
              Nuestro equipo de expertos trabajará contigo para transformar tu visión 
              en una identidad visual que conecte con tu audiencia y impulse tu negocio.
            </p>
          </motion.div>

          {/* Botones con diseño mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleStartOver}
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Crear otro Brand Brief
            </Button>
            <Button
              onClick={() => setCurrentView('landing')}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg"
            >
              Volver al inicio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-full">
      {/* Header */}
      <header className="bg-white text-black border-b border-black/10">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Digit Ads Logo" 
                className="h-12 w-auto object-contain"
                style={{ width: '48px', height: '48px' }}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-black text-black hover:bg-black/5"
              onClick={() => window.open('mailto:contacto@digitads.com.mx?subject=Consulta sobre Brand Brief')}
            >
              Contacto
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center max-w-4xl mx-auto bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Lleva tu marca al
              <span className="text-blue-600"> siguiente nivel</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              En Digit Ads sabemos cómo transformar ideas en marcas memorables. Nuestro Brand Brief te ofrece un documento claro, estratégico y hecho con la experiencia de quienes entienden el valor de la comunicación visual y el impacto de una identidad bien definida.
            </p>

            <div className="flex justify-center mb-12">
              <Button
                size="lg"
                onClick={() => setCurrentView('onboarding')}
                className="text-lg px-8 py-6 bg-black text-white hover:bg-black/90"
              >
                Comenzar ahora
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 bg-white"
          >
            <Card className="border-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,.06)]">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <span className="text-3xl">🎨</span>
                </div>
                <CardTitle className="text-center text-black">Identidad Visual</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600">
                  Define colores, tipografías y elementos visuales que representen tu marca.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,.06)]">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <CardTitle className="text-center text-black">Personalidad</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600">
                  Establece el tono de comunicación y la personalidad de tu marca.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-[0_8px_24px_rgba(0,0,0,.06)]">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <span className="text-3xl">📄</span>
                </div>
                <CardTitle className="text-center text-black">Brand Brief</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600">
                  Nos ayuda a entender mejor tu marca y crear estrategias personalizadas para tu negocio.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-white text-black py-16 mt-16">
        <div className="container mx-auto px-4 text-center bg-white">
          <h2 className="text-3xl font-bold mb-4 text-black">
            ¿Listo para potenciar tu marca?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Completa el proceso en menos de 10 minutos y obtén un Brand Brief profesional 
            que nos ayudará a crear campañas más efectivas para tu negocio.
          </p>
          <Button
            size="lg"
            onClick={() => setCurrentView('onboarding')}
            className="text-lg px-8 py-6 bg-black text-white hover:bg-black/90"
          >
            Comenzar Brand Brief
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo y descripción */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Digit Ads Logo" 
                  className="h-12 w-auto object-contain"
                  style={{ width: '48px', height: '48px' }}
                />
              </div>
              <p className="text-gray-300 mb-4">
                Agencia de marketing digital especializada en estrategias de marca
              </p>
            </div>

            {/* Contacto */}
            <div className="text-center">
              <h3 className="font-bold text-lg mb-4">Contacto</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <a href="mailto:contacto@digitads.com.mx" className="hover:text-white transition-colors">
                    contacto@digitads.com.mx
                  </a>
                </p>
                <p className="text-gray-300">
                  <a href="tel:+34678244089" className="hover:text-white transition-colors">
                    +34 678 24 40 89
                  </a>
                </p>
                <p className="text-gray-300">
                  <a href="tel:+34674570682" className="hover:text-white transition-colors">
                    +34 674 57 06 82
                  </a>
                </p>
              </div>
            </div>

            {/* Información adicional */}
            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-4">Servicios</h3>
              <div className="space-y-2 text-gray-300">
                <p>Brand Brief</p>
                <p>Estrategia de Marca</p>
                <p>Marketing Digital</p>
                <p>Diseño Gráfico</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Digit Ads. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}