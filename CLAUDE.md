# CociPagina — Instrucciones para agentes IA (local y nube)

Sitio web público de Cocimas Hogar. Repo: `PondaStudio/cocipagina`.
Este repo se despliega automáticamente a Hostinger (dominio `cocimashogargdl.com.mx`) vía GitHub Actions al hacer push/merge a `main`.

## Estado actual → objetivo

El sitio hoy es PHP/HTML estático simple (`default.php`, `index.html`) sin build. Se va a migrar a:

- **React 18 + Vite + Tailwind CSS**
- **React Router DOM** para navegación por secciones (SPA de una sola página con pestañas, NO tienda en línea)
- Mobile-first, responsive para PC y celular

No reintroducir PHP. No usar frameworks distintos a los aquí listados sin confirmarlo con el usuario primero.

## Secciones del sitio (todas dentro de la SPA)

1. **Inicio / Acceso QR** — pantalla de entrada al escanear el QR en tienda.
2. **Encuesta de satisfacción** — sucursal, quién atendió, calificación (bueno/malo/regular), sugerencias. Al enviar: guarda la respuesta en **Google Sheets** (vía Google Sheets API, el usuario ya tiene la API key) y redirige a la reseña de Google Maps de la sucursal + invitación a seguir redes sociales.
3. **Promociones** — galería de flyers/imágenes de descuentos (10–50%), remates, ofertas.
4. **Garantías y Políticas** — contenido estático: 30 días en tienda / 3 meses con proveedor / sin garantía según producto; política explícita de "no cambios".
5. **Contacto** — links directos de WhatsApp (`wa.me/<numero>`) por vendedora activa por sucursal, y número específico de facturación.
6. **Bolsa de Trabajo** — vacantes (puesto, sucursal, salario, requisitos) con botón de contacto directo (WhatsApp/email) al dueño. Pensada para enlazar QR de publicidad impresa.

Sucursales existentes (mismos códigos que en el ERP interno CocimasApp): JM437, JM453B, JM511, LV168, LV167, JDC265.

## Datos: Google Sheets, no base de datos

La encuesta de satisfacción escribe directo a un Google Sheet (no Supabase, no MySQL). La API key ya existe como GitHub Secret: `GOOGLE_SHEETS_API_KEY`. Referénciala en el workflow/build (`${{ secrets.GOOGLE_SHEETS_API_KEY }}` o como env var inyectada en build) — **nunca la hardcodees en el código ni la commitees**.

## Despliegue (GitHub Actions → FTP Hostinger)

Workflow en `.github/workflows/deploy.yml`: en cada push a `main`, hace `npm ci && npm run build` y sube `dist/` a `public_html` en Hostinger vía FTP.

Credenciales FTP como GitHub Secrets (configúralas en Settings → Secrets → Actions del repo, el agente en la nube no las necesita ver):
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

Nunca pidas al usuario que pegue estas credenciales en el chat ni las escribas en ningún archivo del repo.

## Legacy

`sistema_RH/` fue removido del sitio (ya existe otra plataforma para RH, la app CocimasApp). No debe reaparecer en `public_html` ni en el build. Si encuentras referencias a él, elimínalas.

## Convenciones

- Sin comentarios obvios en el código.
- Colores de marca (mismos que CocimasApp): `#2397D2` (azul), `#FAC914` (amarillo), `#E52527` (rojo), `#22c55e` (verde).
- Responder al usuario en español.
- Actualizar este archivo si cambian decisiones de arquitectura importantes.
