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
    { replaceAllText: { containsText: { text: '[NOMBRE_EMPRESA]' }, replaceText: data.basicData.company || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[PROYECTO]' }, replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[FUNDADORES]' }, replaceText: data.basicData.name || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[MOTIVACION]' }, replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[IDENTIDAD]' }, replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[SERVICIOS]' }, replaceText: data.basicData.sector || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[PRECIOS]' }, replaceText: data.brandUsage.budgetRange || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[PROMOCIONES]' }, replaceText: data.brandUsage.notes || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[EDAD]' }, replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[DECISIONES]' }, replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[MIEDOS]' }, replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[OBJETIVOS]' }, replaceText: data.basicData.objective || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[ESTILO]' }, replaceText: data.styleTone.styleTags?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[REDES]' }, replaceText: data.brandUsage.channels?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[EVITAR]' }, replaceText: data.styleTone.keywords?.exclude?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[VIDEOS]' }, replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[TIPOS_VIDEO]' }, replaceText: 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[MENSAJES]' }, replaceText: data.styleTone.keywords?.include?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[DISPONIBILIDAD]' }, replaceText: data.brandUsage.timeline || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[TEMAS_EXPLICAR]' }, replaceText: data.brandUsage.notes || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[TEMAS_ABORDAR]' }, replaceText: data.brandUsage.deliverables?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[INFO_EXISTENTE]' }, replaceText: data.brandUsage.notes || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[LOGO]' }, replaceText: data.visualIdentity.logo || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[MOODBOARD]' }, replaceText: data.visualIdentity.references?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[REFERENCIAS]' }, replaceText: data.visualIdentity.references?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: { text: '[FECHA]' }, replaceText: new Date().toLocaleDateString('es-ES') } },
    { replaceAllText: { containsText: { text: '[EMAIL]' }, replaceText: data.basicData.email || 'Sin especificar' } }
  ]

  await docs.documents.batchUpdate({
    documentId,
    requestBody: { requests }
  })
}
