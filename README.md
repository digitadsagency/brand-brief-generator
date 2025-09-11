# Brand Brief - Digit Ads

Una aplicación de onboarding interactiva para crear Brand Briefs profesionales. Permite a los clientes definir su identidad visual, servicios, audiencia objetivo y preferencias de contenido a través de un formulario multi-paso.

## 🚀 Características

- **Formulario Multi-paso**: 6 pasos organizados con validación en tiempo real
- **Interfaz Moderna**: Diseño limpio con Tailwind CSS y shadcn/ui
- **Animaciones Suaves**: Transiciones fluidas con Framer Motion
- **Validación Robusta**: Esquemas Zod para validación de datos
- **Subida de Archivos**: Soporte para logos, moodboards y referencias
- **Vista Previa en Tiempo Real**: Panel de preview que se actualiza dinámicamente
- **Generación de PDF**: Brand Brief profesional descargable
- **Integración Supabase**: Base de datos y almacenamiento de archivos

## 📋 Pasos del Formulario

1. **Sobre ustedes**: Información del proyecto y equipo
2. **Qué ofrecen**: Servicios y precios
3. **A quién ayudan**: Buyer persona y audiencia objetivo
4. **Estilo visual**: Inspiración y preferencias visuales
5. **Producción de contenido**: Preferencias para videos y contenido
6. **Contenido de valor**: Temas educativos y material existente

## 🛠️ Stack Tecnológico

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (Componentes UI)
- **Framer Motion** (Animaciones)
- **React Hook Form** + **Zod** (Formularios y validación)
- **Supabase** (Base de datos y storage)
- **react-dropzone** (Subida de archivos)
- **@react-pdf/renderer** (Generación de PDFs)

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd brand-brief-digit-ads
```

2. **Instalar dependencias**
```bash
npm install
# o
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env.local
```

4. **Configurar Supabase** (ver sección de configuración)

5. **Ejecutar en desarrollo**
```bash
npm run dev
# o
pnpm dev
```

## 🔧 Configuración de Supabase

### Paso 1: Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en "New Project"
4. Completa la información:
   - **Name**: `brand-brief-digit-ads`
   - **Database Password**: Genera una contraseña segura
   - **Region**: Elige la más cercana a tu ubicación
5. Haz clic en "Create new project"

### Paso 2: Obtener credenciales

1. En el dashboard de Supabase, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Paso 3: Configurar base de datos

1. En el dashboard, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase-setup.sql`
3. Ejecuta el script para crear las tablas y políticas

### Paso 4: Configurar Storage

1. Ve a **Storage** en el dashboard
2. Haz clic en "Create a new bucket"
3. Configura:
   - **Name**: `brand-assets`
   - **Public bucket**: Desactivado (privado)
4. En **Policies**, agrega las políticas del archivo SQL

### Paso 5: Actualizar variables de entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
FROM_EMAIL=contacto@digitads.com.mx
```

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── onboarding/       # Componentes específicos del onboarding
├── lib/                  # Utilidades y configuraciones
│   ├── validations.ts    # Esquemas Zod
│   ├── supabase.ts       # Cliente Supabase
│   └── utils.ts          # Funciones utilitarias
├── public/               # Archivos estáticos
└── supabase-setup.sql    # Script de configuración de BD
```

## 🎨 Personalización

### Colores y Tema

Los colores se pueden personalizar en `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // ... más colores
    }
  }
}
```

### Contenido del Formulario

Los pasos y opciones se pueden modificar en:
- `lib/validations.ts` - Esquemas de validación
- `components/onboarding/steps/` - Componentes de cada paso

## 📧 Configuración de Email (Opcional)

Para enviar PDFs por email:

1. Crea una cuenta en [Resend](https://resend.com)
2. Obtén tu API key
3. Agrega a `.env.local`:
```bash
RESEND_API_KEY=tu-api-key-aqui
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en el dashboard
3. Despliega automáticamente

### Otras plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 Uso

1. **Landing Page**: Los usuarios ven una página de bienvenida
2. **Onboarding**: Formulario de 6 pasos con validación
3. **Success**: Página de confirmación con descarga de PDF
4. **Base de Datos**: Todos los datos se guardan en Supabase

## 🔒 Seguridad

- **Row Level Security (RLS)** habilitado en Supabase
- **Validación de archivos** con tipos y tamaños permitidos
- **Sanitización de inputs** con Zod
- **Políticas de acceso** configuradas para storage

## 🐛 Solución de Problemas

### Error de conexión a Supabase
- Verifica que las variables de entorno estén correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error de subida de archivos
- Verifica que el bucket `brand-assets` exista
- Revisa las políticas de storage

### Error de validación
- Revisa los esquemas en `lib/validations.ts`
- Verifica que todos los campos requeridos estén completos

## 📞 Soporte

Para soporte técnico, contacta a:
- **Email**: contacto@digitads.com.mx
- **Proyecto**: Brand Brief - Digit Ads

## 📄 Licencia

Este proyecto es propiedad de Digit Ads. Todos los derechos reservados.

---

**Desarrollado con ❤️ por Digit Ads**