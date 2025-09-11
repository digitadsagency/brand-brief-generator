# Configuración de Supabase - Guía Paso a Paso

Esta guía te llevará a través de la configuración completa de Supabase para el proyecto Brand Onboarding.

## 📋 Prerrequisitos

- Cuenta de GitHub, Google o email
- Navegador web moderno
- Acceso a internet

## 🚀 Paso 1: Crear Cuenta en Supabase

1. **Visita Supabase**
   - Ve a [supabase.com](https://supabase.com)
   - Haz clic en "Start your project"

2. **Iniciar sesión**
   - Selecciona "Sign in with GitHub" (recomendado)
   - O usa Google/email
   - Autoriza los permisos necesarios

3. **Crear organización** (si es tu primera vez)
   - Nombra tu organización
   - Selecciona el plan gratuito

## 🏗️ Paso 2: Crear Proyecto

1. **Nuevo proyecto**
   - Haz clic en "New Project"
   - Selecciona tu organización

2. **Configurar proyecto**
   - **Name**: `brand-onboarding` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura y guárdala
   - **Region**: Selecciona la más cercana a tu ubicación
   - **Pricing Plan**: Free (suficiente para desarrollo)

3. **Crear proyecto**
   - Haz clic en "Create new project"
   - Espera 2-3 minutos mientras se configura

## 🔑 Paso 3: Obtener Credenciales

1. **Ir a Settings**
   - En el dashboard de tu proyecto
   - Haz clic en el ícono de engranaje (Settings)
   - Selecciona "API"

2. **Copiar credenciales**
   - **Project URL**: Copia la URL completa
   - **anon public**: Copia la clave pública anónima

3. **Configurar variables de entorno**
   ```bash
   # En tu archivo .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
   ```

## 🗄️ Paso 4: Configurar Base de Datos

1. **Abrir SQL Editor**
   - En el dashboard de Supabase
   - Haz clic en "SQL Editor" en el menú lateral

2. **Ejecutar script de base de datos**
   - Haz clic en "New query"
   - Copia y pega el contenido completo de `supabase-schema.sql`
   - Haz clic en "Run" (o Ctrl+Enter)

3. **Verificar tablas creadas**
   - Ve a "Table Editor" en el menú lateral
   - Deberías ver las tablas `clients` y `brand_onboardings`

## 📁 Paso 5: Configurar Storage

1. **Ir a Storage**
   - En el dashboard de Supabase
   - Haz clic en "Storage" en el menú lateral

2. **Verificar bucket**
   - El bucket `brand-assets` debería haberse creado automáticamente
   - Si no existe, créalo manualmente:
     - Haz clic en "New bucket"
     - Nombre: `brand-assets`
     - Marca como público: ✅

3. **Configurar políticas** (si es necesario)
   - Ve a "Policies" en la sección de Storage
   - Deberían existir políticas automáticas
   - Si no, crea una política que permita lectura/escritura

## 🔒 Paso 6: Configurar Seguridad (RLS)

1. **Verificar RLS**
   - Ve a "Authentication" > "Policies"
   - Las tablas deberían tener RLS habilitado
   - Las políticas básicas deberían estar configuradas

2. **Políticas recomendadas** (ya incluidas en el script)
   ```sql
   -- Permitir todas las operaciones (ajustar según necesidades)
   CREATE POLICY "Allow all operations on clients" ON clients
     FOR ALL USING (true) WITH CHECK (true);
   
   CREATE POLICY "Allow all operations on brand_onboardings" ON brand_onboardings
     FOR ALL USING (true) WITH CHECK (true);
   ```

## 🧪 Paso 7: Probar la Configuración

1. **Ejecutar la aplicación**
   ```bash
   npm run dev
   ```

2. **Probar funcionalidades**
   - Completar el onboarding
   - Verificar que los datos se guarden
   - Probar la subida de archivos
   - Generar y descargar PDF

3. **Verificar en Supabase**
   - Ve a "Table Editor"
   - Revisa que los datos aparezcan en las tablas
   - Ve a "Storage" y verifica los archivos subidos

## 🚨 Solución de Problemas Comunes

### Error: "Invalid API key"
- **Causa**: Credenciales incorrectas en `.env.local`
- **Solución**: Verifica que las credenciales estén correctas y sin espacios

### Error: "Failed to fetch"
- **Causa**: URL de Supabase incorrecta
- **Solución**: Verifica que la URL incluya `https://` y termine con `.supabase.co`

### Error: "Permission denied"
- **Causa**: RLS bloqueando operaciones
- **Solución**: Verifica que las políticas estén configuradas correctamente

### Error: "Bucket not found"
- **Causa**: Bucket `brand-assets` no existe
- **Solución**: Crea el bucket manualmente en Storage

### Error: "File upload failed"
- **Causa**: Políticas de Storage restrictivas
- **Solución**: Verifica que el bucket sea público o las políticas permitan escritura

## 📊 Monitoreo y Mantenimiento

### Dashboard de Supabase
- **Overview**: Estadísticas generales del proyecto
- **Database**: Monitoreo de consultas y rendimiento
- **Storage**: Uso de almacenamiento
- **Logs**: Registros de errores y actividad

### Límites del Plan Gratuito
- **Base de datos**: 500MB
- **Storage**: 1GB
- **Bandwidth**: 2GB/mes
- **API requests**: 50,000/mes

### Escalabilidad
- Considera actualizar al plan Pro para producción
- Monitorea el uso regularmente
- Implementa limpieza de datos antiguos si es necesario

## 🔐 Seguridad en Producción

### Configuración Recomendada
1. **Políticas RLS más restrictivas**
2. **Autenticación de usuarios**
3. **Validación de archivos más estricta**
4. **Monitoreo de actividad**
5. **Backups regulares**

### Variables de Entorno de Producción
```env
# Producción
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_prod
SUPABASE_SERVICE_ROLE_KEY=tu_clave_service_role
```

## 📞 Soporte Adicional

### Recursos de Supabase
- [Documentación oficial](https://supabase.com/docs)
- [Discord community](https://discord.supabase.com)
- [GitHub issues](https://github.com/supabase/supabase/issues)

### Recursos del Proyecto
- [README.md](./README.md) - Documentación principal
- [GitHub Issues](https://github.com/tu-usuario/brand-onboarding/issues) - Reportar problemas

---

**¡Configuración completada!** 🎉

Tu proyecto Brand Onboarding ahora está listo para usar con Supabase. Si encuentras algún problema, revisa la sección de solución de problemas o contacta al equipo de soporte.
