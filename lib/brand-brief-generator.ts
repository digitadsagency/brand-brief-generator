import { docs, drive, auth } from './google-docs'
import { OnboardingData } from './schemas'

export async function createBrandBriefDocument(data: OnboardingData) {
  try {
    // Verificar si tenemos tokens de autenticación
    if (!auth.credentials.access_token) {
      throw new Error('No authentication token. Please authenticate first.')
    }

    // 1. Copiar template
    const templateId = process.env.GOOGLE_DOCS_TEMPLATE_ID!
    const copyResponse = await drive.files.copy({
      fileId: templateId,
      requestBody: {
        name: `Brand Brief - ${data.basicData.company} - ${new Date().toLocaleDateString()}`
      }
    })

    const documentId = copyResponse.data.id!

    // 2. Llenar con datos
    await fillDocumentWithData(documentId, data)

    // 3. Hacer público para que puedas acceder
    await drive.permissions.create({
      fileId: documentId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    return {
      documentId,
      url: `https://docs.google.com/document/d/${documentId}/edit`
    }
  } catch (error) {
    console.error('Error creating document:', error)
    throw error
  }
}

async function fillDocumentWithData(documentId: string, data: OnboardingData) {
  const requests = [
    // Reemplazar placeholders con datos reales
    { replaceAllText: { containsText: '[NOMBRE_EMPRESA]', replaceText: data.basicData.company || 'Sin especificar' } },
    { replaceAllText: { containsText: '[PROYECTO]', replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: '[FUNDADORES]', replaceText: data.basicData.name || 'Sin especificar' } },
    { replaceAllText: { containsText: '[MOTIVACION]', replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: '[IDENTIDAD]', replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: '[SERVICIOS]', replaceText: data.basicData.sector || 'Sin especificar' } },
    { replaceAllText: { containsText: '[PRECIOS]', replaceText: data.brandUsage.budgetRange || 'Sin especificar' } },
    { replaceAllText: { containsText: '[PROMOCIONES]', replaceText: data.brandUsage.notes || 'Sin especificar' } },
    { replaceAllText: { containsText: '[EDAD]', replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: '[DECISIONES]', replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: '[MIEDOS]', replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: '[OBJETIVOS]', replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: '[ESTILO]', replaceText: data.styleTone.styleTags?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[REDES]', replaceText: data.brandUsage.channels?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[EVITAR]', replaceText: data.styleTone.keywords?.exclude?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[VIDEOS]', replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: '[TIPOS_VIDEO]', replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: '[MENSAJES]', replaceText: data.styleTone.keywords?.include?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[DISPONIBILIDAD]', replaceText: data.brandUsage.timeline || 'Sin especificar' } },
    { replaceAllText: { containsText: '[TEMAS_EXPLICAR]', replaceText: data.brandUsage.notes || 'Sin especificar' } },
    { replaceAllText: { containsText: '[TEMAS_ABORDAR]', replaceText: data.brandUsage.deliverables?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[INFO_EXISTENTE]', replaceText: data.brandUsage.notes || 'Sin especificar' } },
    { replaceAllText: { containsText: '[LOGO]', replaceText: data.visualIdentity.logo || 'Sin especificar' } },
    { replaceAllText: { containsText: '[MOODBOARD]', replaceText: data.visualIdentity.references?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[REFERENCIAS]', replaceText: data.visualIdentity.references?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[FECHA]', replaceText: new Date().toLocaleDateString('es-ES') } },
    { replaceAllText: { containsText: '[EMAIL]', replaceText: data.basicData.email || 'Sin especificar' } }
  ]

  await docs.documents.batchUpdate({
    documentId,
    requestBody: { requests }
  })
}
