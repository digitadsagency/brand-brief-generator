import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { OnboardingData } from './schemas'

export async function generateBrandBriefPDF(data: OnboardingData): Promise<Uint8Array> {
  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create()
  
  // Obtener fuentes
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  
  // Crear página
  const page = pdfDoc.addPage([595.28, 841.89]) // A4
  const { width, height } = page.getSize()
  
  // Colores
  const primaryColor = data.visualIdentity?.palette?.[0] || '#3B82F6'
  const secondaryColor = data.visualIdentity?.palette?.[1] || '#1E40AF'
  
  // Convertir colores HEX a RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0.23, g: 0.51, b: 0.96 }
  }
  
  const primaryRgb = hexToRgb(primaryColor)
  const secondaryRgb = hexToRgb(secondaryColor)
  
  // Función para dibujar texto
  const drawText = (text: string, x: number, y: number, options: {
    size?: number
    font?: any
    color?: { r: number; g: number; b: number }
    maxWidth?: number
  } = {}) => {
    const {
      size = 12,
      font = helvetica,
      color = { r: 0, g: 0, b: 0 },
      maxWidth = width - 100
    } = options
    
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(color.r, color.g, color.b),
      maxWidth
    })
  }
  
  // Función para dibujar línea
  const drawLine = (x1: number, y1: number, x2: number, y2: number, color = { r: 0.8, g: 0.8, b: 0.8 }) => {
    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: 1,
      color: rgb(color.r, color.g, color.b)
    })
  }
  
  // Función para dibujar rectángulo
  const drawRect = (x: number, y: number, width: number, height: number, color = { r: 0.95, g: 0.95, b: 0.95 }) => {
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color: rgb(color.r, color.g, color.b)
    })
  }
  
  let currentY = height - 50
  
  // Header
  drawText('BRAND BRIEF', 50, currentY, {
    size: 24,
    font: helveticaBold,
    color: primaryRgb
  })
  
  currentY -= 20
  
  drawText('Generado por Digit Ads', 50, currentY, {
    size: 12,
    color: { r: 0.2, g: 0.4, b: 0.8 }
  })
  
  currentY -= 20
  
  drawText(`Cliente: ${data.basicData.company}`, 50, currentY, {
    size: 14,
    color: { r: 0.4, g: 0.4, b: 0.4 }
  })
  
  currentY -= 20
  
  drawText(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 50, currentY, {
    size: 10,
    color: { r: 0.5, g: 0.5, b: 0.5 }
  })
  
  currentY -= 40
  
  // Línea separadora
  drawLine(50, currentY, width - 50, currentY, primaryRgb)
  currentY -= 30
  
  // Sección 1: Información básica
  drawText('1. INFORMACIÓN BÁSICA', 50, currentY, {
    size: 16,
    font: helveticaBold,
    color: primaryRgb
  })
  
  currentY -= 25
  
  drawText(`Empresa: ${data.basicData.company}`, 50, currentY, { size: 12 })
  currentY -= 20
  
  drawText(`Sector: ${data.basicData.sector}`, 50, currentY, { size: 12 })
  currentY -= 20
  
  drawText(`Contacto: ${data.basicData.name} (${data.basicData.email})`, 50, currentY, { size: 12 })
  currentY -= 20
  
  if (data.basicData.phone) {
    drawText(`Teléfono: ${data.basicData.phone}`, 50, currentY, { size: 12 })
    currentY -= 20
  }
  
  if (data.basicData.website) {
    drawText(`Sitio web: ${data.basicData.website}`, 50, currentY, { size: 12 })
    currentY -= 20
  }
  
  drawText('Objetivo principal:', 50, currentY, { size: 12, font: helveticaBold })
  currentY -= 20
  
  drawText(data.basicData.objective, 50, currentY, { size: 11, maxWidth: width - 100 })
  currentY -= 40
  
  // Sección 2: Identidad visual
  drawText('2. IDENTIDAD VISUAL', 50, currentY, {
    size: 16,
    font: helveticaBold,
    color: primaryRgb
  })
  
  currentY -= 25
  
  if (data.visualIdentity?.palette && data.visualIdentity.palette.length > 0) {
    drawText('Paleta de colores:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    data.visualIdentity.palette.forEach((color, index) => {
      drawText(`${index + 1}. ${color}`, 70, currentY, { size: 11 })
      currentY -= 15
    })
    
    currentY -= 10
  }
  
  if (data.visualIdentity?.fonts && data.visualIdentity.fonts.length > 0) {
    drawText('Tipografías:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    data.visualIdentity.fonts.forEach((font, index) => {
      drawText(`${index + 1}. ${font}`, 70, currentY, { size: 11 })
      currentY -= 15
    })
    
    currentY -= 10
  }
  
  if (data.visualIdentity?.logo) {
    drawText('Logo: Incluido', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
  }
  
  if (data.visualIdentity?.references && data.visualIdentity.references.length > 0) {
    drawText(`Referencias: ${data.visualIdentity.references.length} archivo(s)`, 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
  }
  
  currentY -= 20
  
  // Sección 3: Estilo y tono
  drawText('3. ESTILO Y TONO', 50, currentY, {
    size: 16,
    font: helveticaBold,
    color: primaryRgb
  })
  
  currentY -= 25
  
  if (data.styleTone?.styleTags && data.styleTone.styleTags.length > 0) {
    drawText('Estilos:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    drawText(data.styleTone.styleTags.join(', '), 70, currentY, { size: 11 })
    currentY -= 30
  }
  
  if (data.styleTone?.tone) {
    drawText(`Tono de comunicación: ${data.styleTone.tone}`, 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
  }
  
  if (data.styleTone?.sliders) {
    drawText('Personalidad de marca:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    drawText(`Innovación: ${data.styleTone.sliders.innovacion}%`, 70, currentY, { size: 11 })
    currentY -= 15
    
    drawText(`Seriedad: ${data.styleTone.sliders.seriedad}%`, 70, currentY, { size: 11 })
    currentY -= 15
    
    drawText(`Diversión: ${data.styleTone.sliders.diversion}%`, 70, currentY, { size: 11 })
    currentY -= 30
  }
  
  if (data.styleTone?.keywords) {
    if (data.styleTone.keywords.include && data.styleTone.keywords.include.length > 0) {
      drawText('Palabras clave (incluir):', 50, currentY, { size: 12, font: helveticaBold })
      currentY -= 20
      
      drawText(data.styleTone.keywords.include.join(', '), 70, currentY, { size: 11 })
      currentY -= 20
    }
    
    if (data.styleTone.keywords.exclude && data.styleTone.keywords.exclude.length > 0) {
      drawText('Palabras clave (evitar):', 50, currentY, { size: 12, font: helveticaBold })
      currentY -= 20
      
      drawText(data.styleTone.keywords.exclude.join(', '), 70, currentY, { size: 11 })
      currentY -= 20
    }
  }
  
  currentY -= 20
  
  // Sección 4: Uso de marca
  drawText('4. USO DE MARCA', 50, currentY, {
    size: 16,
    font: helveticaBold,
    color: primaryRgb
  })
  
  currentY -= 25
  
  if (data.brandUsage?.channels && data.brandUsage.channels.length > 0) {
    drawText('Canales:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    drawText(data.brandUsage.channels.join(', '), 70, currentY, { size: 11 })
    currentY -= 30
  }
  
  if (data.brandUsage?.deliverables && data.brandUsage.deliverables.length > 0) {
    drawText('Entregables:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    drawText(data.brandUsage.deliverables.join(', '), 70, currentY, { size: 11 })
    currentY -= 30
  }
  
  if (data.brandUsage?.timeline) {
    drawText(`Plazo: ${data.brandUsage.timeline}`, 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
  }
  
  if (data.brandUsage?.budgetRange) {
    drawText(`Presupuesto: ${data.brandUsage.budgetRange}`, 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
  }
  
  if (data.brandUsage?.notes) {
    drawText('Notas adicionales:', 50, currentY, { size: 12, font: helveticaBold })
    currentY -= 20
    
    drawText(data.brandUsage.notes, 70, currentY, { size: 11, maxWidth: width - 120 })
    currentY -= 40
  }
  
  // Footer
  drawLine(50, currentY, width - 50, currentY, { r: 0.8, g: 0.8, b: 0.8 })
  currentY -= 20
  
  drawText('Este documento fue generado automáticamente por Digit Ads', 50, currentY, {
    size: 10,
    color: { r: 0.5, g: 0.5, b: 0.5 }
  })
  
  // Generar PDF
  return await pdfDoc.save()
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string = 'brand-brief.pdf') {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}
