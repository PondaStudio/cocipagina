# Apps Script para el formulario de Bolsa de Trabajo

Este formulario (`src/components/PostulacionForm.jsx`) guarda cada postulación
en un Google Sheet (con el CV subido a una carpeta de Drive), igual que el
formulario de Encuesta de satisfacción. Además, al enviarse abre WhatsApp con
el mensaje ya escrito hacia el número configurado en `WHATSAPP_NOTIFICACIONES`
del componente — eso no requiere Apps Script, solo falta que la persona toque
"Enviar" en WhatsApp.

## 1. Crea el Google Sheet

1. Crea una hoja de cálculo nueva en Google Sheets (o usa una existente).
2. En la primera hoja, agrega estos encabezados en la fila 1:

   `Fecha | Nombre | Teléfono | Puesto | Experiencia | CV`

## 2. Crea el Apps Script

1. En el Sheet, ve a **Extensiones → Apps Script**.
2. Borra el contenido de `Código.gs` y pega esto:

```javascript
// ID de una carpeta de Drive donde se guardarán los CVs recibidos.
// Créala una vez, ábrela y copia el ID de la URL (drive.google.com/drive/folders/ESTE_ID).
var CARPETA_CV_ID = 'PEGA_AQUI_EL_ID_DE_LA_CARPETA';

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = e.parameter;

  var cvLink = '';
  if (p.cvBase64) {
    var carpeta = DriveApp.getFolderById(CARPETA_CV_ID);
    var bytes = Utilities.base64Decode(p.cvBase64);
    var blob = Utilities.newBlob(bytes, p.cvTipo || 'application/octet-stream', p.cvNombre || 'cv');
    var archivo = carpeta.createFile(blob);
    cvLink = archivo.getUrl();
  }

  sheet.appendRow([
    p.fecha || new Date().toISOString(),
    p.nombre || '',
    p.telefono || '',
    p.puesto || '',
    p.experiencia || '',
    cvLink,
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

3. Reemplaza `PEGA_AQUI_EL_ID_DE_LA_CARPETA` con el ID de una carpeta de Drive
   (créala en drive.google.com, ábrela y copia el ID que aparece en la URL).
4. Guarda el proyecto (p. ej. "Bolsa de trabajo - Apps Script").

## 3. Despliega como Web App

1. Haz clic en **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Configuración:
   - Ejecutar como: **Yo** (tu cuenta de Google).
   - Quién tiene acceso: **Cualquier usuario**.
4. Haz clic en **Implementar** y autoriza los permisos que pida (incluye acceso
   a Drive, porque el script guarda los archivos ahí).
5. Copia la URL que termina en `/exec`.

## 4. Conecta el formulario del sitio

Abre `src/components/PostulacionForm.jsx` y reemplaza:

```javascript
const GOOGLE_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT'
```

con la URL que copiaste en el paso 3. Si el número que debe recibir el aviso
de WhatsApp es distinto a `523319423903` (RH), cámbialo también en
`WHATSAPP_NOTIFICACIONES` del mismo archivo. Haz commit y push a `main` para
que se despliegue.

## Nota sobre el "WhatsApp automático"

Un sitio estático no puede enviar mensajes de WhatsApp sin intervención humana
sin usar una API de pago (WhatsApp Business API o Twilio). Lo que hace este
formulario es abrir el chat de WhatsApp con el mensaje ya escrito al terminar
de llenar el formulario — la persona solo necesita tocar "Enviar". La hoja de
Google siempre se guarda primero, así que ninguna postulación se pierde aunque
la persona no llegue a enviar el WhatsApp.

## Si actualizas el script después

Cada cambio al código del Apps Script requiere una **nueva implementación**
(Implementar → Gestionar implementaciones → ✏️ → Nueva versión), o la URL
seguirá usando la versión anterior del código.
