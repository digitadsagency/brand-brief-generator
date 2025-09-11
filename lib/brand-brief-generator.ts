import { docs, drive, auth } from './google-docs'
import { OnboardingData } from './validations'

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
        name: `Brand Brief - ${data.company} - ${new Date().toLocaleDateString()}`
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
    { replaceAllText: { containsText: '[NOMBRE_EMPRESA]', replaceText: data.company || 'Sin especificar' } },
    { replaceAllText: { containsText: '[PROYECTO]', replaceText: data.projectName || 'Sin especificar' } },
    { replaceAllText: { containsText: '[FUNDADORES]', replaceText: data.founders || 'Sin especificar' } },
    { replaceAllText: { containsText: '[MOTIVACION]', replaceText: data.motivation || 'Sin especificar' } },
    { replaceAllText: { containsText: '[IDENTIDAD]', replaceText: data.brandIdentity || 'Sin especificar' } },
    { replaceAllText: { containsText: '[SERVICIOS]', replaceText: data.services?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[PRECIOS]', replaceText: data.prices || 'Sin especificar' } },
    { replaceAllText: { containsText: '[PROMOCIONES]', replaceText: data.launchPromotions || 'Sin especificar' } },
    { replaceAllText: { containsText: '[EDAD]', replaceText: data.clientAge || 'Sin especificar' } },
    { replaceAllText: { containsText: '[DECISIONES]', replaceText: data.decisionMaker || 'Sin especificar' } },
    { replaceAllText: { containsText: '[MIEDOS]', replaceText: data.clientFears || 'Sin especificar' } },
    { replaceAllText: { containsText: '[OBJETIVOS]', replaceText: data.clientGoals || 'Sin especificar' } },
    { replaceAllText: { containsText: '[ESTILO]', replaceText: data.visualStyle?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[REDES]', replaceText: data.socialMedia?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[EVITAR]', replaceText: data.contentToAvoid || 'Sin especificar' } },
    { replaceAllText: { containsText: '[VIDEOS]', replaceText: data.appearInVideos ? 'Sí' : 'No' } },
    { replaceAllText: { containsText: '[TIPOS_VIDEO]', replaceText: data.videoTypes?.join(', ') || 'Sin especificar' } },
    { replaceAllText: { containsText: '[MENSAJES]', replaceText: data.keyMessages || 'Sin especificar' } },
    { replaceAllText: { containsText: '[DISPONIBILIDAD]', replaceText: data.recordingAvailability || 'Sin especificar' } },
    { replaceAllText: { containsText: '[TEMAS_EXPLICAR]', replaceText: data.topicsToExplain || 'Sin especificar' } },
    { replaceAllText: { containsText: '[TEMAS_ABORDAR]', replaceText: data.topicsToAddress || 'Sin especificar' } },
    { replaceAllText: { containsText: '[INFO_EXISTENTE]', replaceText: data.existingInformation || 'Sin especificar' } },
    { replaceAllText: { containsText: '[LOGO]', replaceText: data.logoUrl || 'Sin especificar' } },
    { replaceAllText: { containsText: '[MOODBOARD]', replaceText: data.moodboardUrl || 'Sin especificar' } },
    { replaceAllText: { containsText: '[REFERENCIAS]', replaceText: data.references || 'Sin especificar' } },
    { replaceAllText: { containsText: '[FECHA]', replaceText: new Date().toLocaleDateString('es-ES') } },
    { replaceAllText: { containsText: '[EMAIL]', replaceText: data.email || 'Sin especificar' } }
  ]

  await docs.documents.batchUpdate({
    documentId,
    requestBody: { requests }
  })
}
