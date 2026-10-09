# Apps Script para el formulario de Bolsa de Trabajo

Este formulario (`src/components/PostulacionForm.jsx`) guarda las postulaciones
en un Google Sheet, igual que el formulario de Encuesta de satisfacción.

## 1. Crea el Google Sheet

1. Crea una hoja de cálculo nueva en Google Sheets (o usa una existente).
2. En la primera hoja, agrega estos encabezados en la fila 1:

   `Fecha | Nombre | Contacto | Puesto | Sucursal | Mensaje`

## 2. Crea el Apps Script

1. En el Sheet, ve a **Extensiones → Apps Script**.
2. Borra el contenido de `Código.gs` y pega esto:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = e.parameter;

  sheet.appendRow([
    p.fecha || new Date().toISOString(),
    p.nombre || '',
    p.contacto || '',
    p.puesto || '',
    p.sucursal || '',
    p.mensaje || '',
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. Guarda el proyecto (p. ej. "Bolsa de trabajo - Apps Script").

## 3. Despliega como Web App

1. Haz clic en **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:
   - Ejecutar como: **Yo** (tu cuenta de Google).
   - Quién tiene acceso: **Cualquier usuario**.
4. Haz clic en **Implementar** y autoriza los permisos que pida.
5. Copia la URL que termina en `/exec`.

## 4. Conecta el formulario del sitio

Abre `src/components/PostulacionForm.jsx` y reemplaza:

```javascript
const GOOGLE_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT'
```

con la URL que copiaste en el paso 3. Haz commit y push a `main` para que
se despliegue.

## Si actualizas el script después

Cada cambio al código del Apps Script requiere una **nueva implementación**
(Implementar → Gestionar implementaciones → ✏️ → Nueva versión), o la URL
seguirá usando la versión anterior del código.
