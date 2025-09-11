"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OnboardingData } from "@/lib/schemas"
import { formatDate } from "@/lib/utils"

interface SummaryAccordionProps {
  data: OnboardingData
}

export function SummaryAccordion({ data }: SummaryAccordionProps) {
  const { basicData, visualIdentity, styleTone, brandUsage } = data

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Resumen de tu Brand Brief</h3>
        <p className="text-gray-600">
          Revisa toda la información antes de enviar tu solicitud
        </p>
      </div>

      <Accordion type="multiple" className="w-full">
        {/* Datos básicos */}
        <AccordionItem value="basic">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👤</span>
              <div>
                <h4 className="font-semibold">Datos básicos</h4>
                <p className="text-sm text-gray-500 font-normal">
                  {basicData.company} • {basicData.sector}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Empresa</label>
                    <p className="text-sm">{basicData.company}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sector</label>
                    <p className="text-sm capitalize">{basicData.sector}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contacto</label>
                    <p className="text-sm">{basicData.name}</p>
                    <p className="text-sm text-gray-600">{basicData.email}</p>
                    {basicData.phone && <p className="text-sm text-gray-600">{basicData.phone}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Sitio web</label>
                    <p className="text-sm">{basicData.website || "No especificado"}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Objetivo principal</label>
                  <p className="text-sm mt-1">{basicData.objective}</p>
                </div>
                {basicData.social && Object.values(basicData.social).some(Boolean) && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Redes sociales</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {basicData.social.instagram && (
                        <Badge variant="outline">Instagram</Badge>
                      )}
                      {basicData.social.facebook && (
                        <Badge variant="outline">Facebook</Badge>
                      )}
                      {basicData.social.tiktok && (
                        <Badge variant="outline">TikTok</Badge>
                      )}
                      {basicData.social.linkedin && (
                        <Badge variant="outline">LinkedIn</Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Identidad visual */}
        <AccordionItem value="visual">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h4 className="font-semibold">Identidad visual</h4>
                <p className="text-sm text-gray-500 font-normal">
                  {visualIdentity?.palette?.length || 0} colores • {visualIdentity?.fonts?.length || 0} tipografías
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-4 space-y-4">
                {visualIdentity?.palette && visualIdentity.palette.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Paleta de colores</label>
                    <div className="flex space-x-2 mt-2">
                      {visualIdentity.palette.map((color, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-mono">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {visualIdentity?.fonts && visualIdentity.fonts.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tipografías</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {visualIdentity.fonts.map((font, index) => (
                        <Badge key={index} variant="secondary">{font}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {visualIdentity?.logo && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Logo</label>
                    <p className="text-sm text-gray-600">Archivo subido</p>
                  </div>
                )}
                {visualIdentity?.references && visualIdentity.references.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Referencias</label>
                    <p className="text-sm text-gray-600">{visualIdentity.references.length} archivo(s) subido(s)</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Estilo y tono */}
        <AccordionItem value="style">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-semibold">Estilo y tono</h4>
                <p className="text-sm text-gray-500 font-normal">
                  {styleTone?.styleTags?.length || 0} estilos • {styleTone?.tone}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-4 space-y-4">
                {styleTone?.styleTags && styleTone.styleTags.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Estilos</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {styleTone.styleTags.map((style, index) => (
                        <Badge key={index} variant="outline">{style}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {styleTone?.tone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tono de comunicación</label>
                    <Badge variant="secondary" className="mt-1">
                      {styleTone.tone}
                    </Badge>
                  </div>
                )}
                {styleTone?.sliders && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Personalidad de marca</label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{styleTone.sliders.innovacion}%</div>
                        <div className="text-xs text-gray-600">Innovación</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{styleTone.sliders.seriedad}%</div>
                        <div className="text-xs text-gray-600">Seriedad</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{styleTone.sliders.diversion}%</div>
                        <div className="text-xs text-gray-600">Diversión</div>
                      </div>
                    </div>
                  </div>
                )}
                {styleTone?.keywords && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Palabras clave</label>
                    <div className="mt-1 space-y-2">
                      {styleTone.keywords.include && styleTone.keywords.include.length > 0 && (
                        <div>
                          <span className="text-xs text-green-600 font-medium">Incluir:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {styleTone.keywords.include.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-green-700">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {styleTone.keywords.exclude && styleTone.keywords.exclude.length > 0 && (
                        <div>
                          <span className="text-xs text-red-600 font-medium">Evitar:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {styleTone.keywords.exclude.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-red-700">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Uso de marca */}
        <AccordionItem value="usage">
          <AccordionTrigger className="text-left">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🚀</span>
              <div>
                <h4 className="font-semibold">Uso de marca</h4>
                <p className="text-sm text-gray-500 font-normal">
                  {brandUsage?.channels?.length || 0} canales • {brandUsage?.deliverables?.length || 0} entregables
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-4 space-y-4">
                {brandUsage?.channels && brandUsage.channels.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Canales</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {brandUsage.channels.map((channel, index) => (
                        <Badge key={index} variant="outline">{channel}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {brandUsage?.deliverables && brandUsage.deliverables.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Entregables</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {brandUsage.deliverables.map((deliverable, index) => (
                        <Badge key={index} variant="secondary">{deliverable}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {brandUsage?.timeline && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Plazo</label>
                      <p className="text-sm">{brandUsage.timeline}</p>
                    </div>
                  )}
                  {brandUsage?.budgetRange && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Presupuesto</label>
                      <p className="text-sm">{brandUsage.budgetRange}</p>
                    </div>
                  )}
                </div>
                {brandUsage?.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notas adicionales</label>
                    <p className="text-sm mt-1">{brandUsage.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="text-xs text-gray-500 text-center">
        Generado el {formatDate(new Date())}
      </div>
    </div>
  )
}
