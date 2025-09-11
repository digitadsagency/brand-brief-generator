"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard"
import { OnboardingData } from "@/lib/validations"
import { CheckCircle } from "lucide-react"

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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl text-center"
        >
          {/* Ícono de éxito */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-green-800 mb-4"
          >
            ¡Brand Brief Completado!
          </motion.h1>

          {/* Mensaje */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg mb-8 max-w-lg mx-auto"
          >
            Tu Brand Brief ha sido enviado exitosamente a Digit Ads. 
            Nuestro equipo lo revisará y te contactará pronto para comenzar a trabajar en tu estrategia de marca.
          </motion.p>

          {/* Próximos pasos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 p-6 rounded-lg mb-8 max-w-md mx-auto"
          >
            <h3 className="font-semibold text-green-900 mb-4 text-lg">
              Próximos pasos con Digit Ads:
            </h3>
            <ul className="text-sm text-green-800 space-y-2 text-left">
              <li>• Nuestro equipo revisará tu Brand Brief en las próximas 24 horas</li>
              <li>• Te enviaremos un email de confirmación con los próximos pasos</li>
              <li>• Agendaremos una llamada para discutir tu estrategia de marketing</li>
              <li>• Comenzaremos a crear campañas personalizadas para tu marca</li>
            </ul>
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleStartOver}
              variant="outline"
              className="border-black text-black hover:bg-black/5 px-6 py-3"
            >
              Crear otro Brand Brief
            </Button>
            <Button
              onClick={() => setCurrentView('landing')}
              className="bg-black text-white hover:bg-black/90 px-6 py-3"
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
                src="/logo-DIGI.png" 
                alt="Digit Ads Logo" 
                className="h-12 w-auto object-contain"
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
              Crea tu
              <span className="text-blue-600"> Brand Brief</span>
              <br />
              con Digit Ads
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestra herramienta interactiva te ayuda a definir la identidad visual 
              y de marca de tu empresa. Obtén un documento profesional que nos permitirá 
              crear estrategias de marketing más efectivas para tu negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => setCurrentView('onboarding')}
                className="text-lg px-8 py-6 bg-black text-white hover:bg-black/90"
              >
                Comenzar ahora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-black text-black hover:bg-black/5"
              >
                Ver ejemplo
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
                  src="/logo-DIGI.png" 
                  alt="Digit Ads Logo" 
                  className="h-12 w-auto object-contain"
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