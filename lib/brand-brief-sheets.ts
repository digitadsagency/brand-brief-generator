import { sheets } from './google-sheets'
import { OnboardingData } from './validations'

export async function addBrandBriefToSheet(data: OnboardingData) {
  try {
    console.log('=== INICIANDO PROCESO ===')
    console.log('Spreadsheet ID:', process.env.GOOGLE_SHEETS_ID)
    console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)

    const spreadsheetId = process.env.GOOGLE_SHEETS_ID!

    // Función helper para convertir arrays y objetos a strings
    const formatValue = (value: any): string => {
      if (value === null || value === undefined) return 'Sin especificar'
      if (Array.isArray(value)) return value.join(', ')
      if (typeof value === 'object') {
        // Para objetos complejos, extraer solo los valores relevantes
        if (value.services) return value.services.join(', ')
        if (value.visualStyle) return value.visualStyle.join(', ')
        if (value.inspirationLinks) return value.inspirationLinks.map((link: any) => link.url).join(', ')
        return JSON.stringify(value)
      }
      return String(value)
    }

    // Preparar los datos para la fila - accediendo a la estructura correcta
    const rowData = [
      new Date().toLocaleDateString('es-ES'), // Fecha
      'Sin especificar', // Empresa (no está en el esquema)
      formatValue(data.aboutYou?.projectName), // Nombre del Proyecto
      formatValue(data.aboutYou?.founders?.map(f => `${f.name} (${f.role})`)), // Fundadores
      formatValue(data.aboutYou?.motivation), // Motivación
      formatValue(data.aboutYou?.brandIdentity), // Identidad de Marca
      formatValue(data.services?.services?.map(service => 
        service === "Otro" && data.services?.customService 
          ? data.services.customService 
          : service
      )), // Servicios
      formatValue(data.services?.prices ? Object.values(data.services.prices).filter(v => v).join(', ') : null), // Precios
      formatValue(data.services?.promotionDetails), // Promociones
      formatValue(data.targetAudience?.ageRange), // Edad Cliente
      formatValue(data.targetAudience?.decisionMaker), // Tomador de Decisiones
      formatValue(data.targetAudience?.clientConcerns), // Miedos Cliente
      formatValue(data.targetAudience?.clientGoals), // Objetivos Cliente
      formatValue(data.visualStyle?.visualStyle), // Estilo Visual
      formatValue(data.visualStyle?.inspirationLinks?.map(link => link.url)), // Redes Sociales
      formatValue(data.visualStyle?.avoidContent), // Contenido a Evitar
      formatValue(data.branding?.primaryColor), // Color Primario
      formatValue(data.branding?.secondaryColor), // Color Secundario
      formatValue(data.branding?.logoUrl), // Logo
      formatValue(data.branding?.moodboardUrl), // Moodboard
      formatValue(data.branding?.typographyStyle), // Estilo Tipografía
      formatValue(data.branding?.visualElements), // Elementos Visuales
      data.contentProduction?.willingToAppear ? 'Sí' : 'No', // Aparecer en Videos
      formatValue(data.contentProduction?.videoTypes), // Tipos de Video
      formatValue(data.contentProduction?.keyMessages), // Mensajes Clave
      formatValue(data.contentProduction?.availability), // Disponibilidad
      formatValue(data.contentProduction?.location), // Ubicación
      formatValue(data.contentProduction?.resources), // Recursos
      formatValue(data.valueContent?.topicsToCover), // Temas a Explicar
      formatValue(data.targetAudience?.idealClients?.map(c => c.description)), // Temas a Abordar
      formatValue(data.valueContent?.existingContent), // Información Existente
      'Sin especificar', // Referencias (no está en el esquema)
      'Sin especificar', // Email (no está en el esquema)
    ]

    console.log('=== DATOS PREPARADOS ===')
    console.log('Row data prepared:', rowData)
    console.log('Logo URL:', data.branding?.logoUrl)
    console.log('Moodboard URL:', data.branding?.moodboardUrl)

    // PASO 1: Verificar si la hoja existe
    console.log('=== PASO 1: VERIFICANDO HOJA ===')
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId
      })
      console.log('Hoja encontrada:', sheetInfo.data.properties?.title)
      console.log('Hojas disponibles:', sheetInfo.data.sheets?.map(s => s.properties?.title))
    } catch (error) {
      console.error('Error al verificar la hoja:', error)
      throw error
    }

    // PASO 2: Verificar si ya hay datos en la hoja
    console.log('=== PASO 2: VERIFICANDO CONTENIDO ===')
    let hasHeaders = false
    try {
      const contentCheck = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Hoja 1!A1:A1' // Usar el nombre correcto de la hoja
      })
      
      if (contentCheck.data.values && contentCheck.data.values.length > 0) {
        hasHeaders = true
        console.log('Ya hay contenido en la hoja')
      } else {
        console.log('La hoja está vacía, creando headers...')
      }
    } catch (error) {
      console.log('Error al verificar contenido, asumiendo que está vacía')
    }

    // PASO 3: Crear headers si no existen
    if (!hasHeaders) {
      console.log('=== CREANDO HEADERS ===')
      const headers = [
        'Fecha', 'Empresa', 'Proyecto', 'Fundadores', 'Motivación', 'Identidad',
        'Servicios', 'Precios', 'Promociones', 'Edad Cliente', 'Tomador Decisiones',
        'Miedos Cliente', 'Objetivos Cliente', 'Estilo Visual', 'Redes Sociales',
        'Contenido a Evitar', 'Color Primario', 'Color Secundario', 'Logo', 'Moodboard',
        'Estilo Tipografía', 'Elementos Visuales', 'Aparecer en Videos', 'Tipos de Video',
        'Mensajes Clave', 'Disponibilidad', 'Ubicación', 'Recursos', 'Temas a Explicar',
        'Temas a Abordar', 'Información Existente', 'Referencias', 'Email'
      ]
      
      try {
        const headerResult = await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Hoja 1!A1', // Usar el nombre correcto de la hoja
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers]
          }
        })
        console.log('Headers creados exitosamente')
      } catch (error) {
        console.error('Error creando headers:', error)
        throw error
      }
    }

    // PASO 4: Agregar la fila de datos
    console.log('=== AGREGANDO DATOS ===')
    try {
      const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Hoja 1', // Usar el nombre correcto de la hoja
        valueInputOption: 'RAW',
        requestBody: {
          values: [rowData]
        }
      })

      console.log('=== RESULTADO FINAL ===')
      console.log('Sheet append result:', result.data)

      return {
        success: true,
        message: 'Brand Brief agregado a Google Sheets exitosamente'
      }
    } catch (error) {
      console.error('Error agregando datos:', error)
      throw error
    }
  } catch (error) {
    console.error('=== ERROR COMPLETO ===')
    console.error('Error adding to sheet:', error)
    throw error
  }
}
