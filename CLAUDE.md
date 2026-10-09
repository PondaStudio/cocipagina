# CociPagina — Instrucciones para agentes IA (local y nube)

Sitio web público de Cocimas Hogar. Repo: `PondaStudio/cocipagina`.
Este repo se despliega automáticamente a Hostinger (dominio `cocimashogargdl.com.mx`) vía GitHub Actions al hacer push/merge a `main`.

## Estado actual → objetivo

El sitio ya se migró a:

- **React 18 + Vite + Tailwind CSS**
- **React Router DOM v7** (modo declarativo, `BrowserRouter`) para navegación por secciones (SPA de una sola página con pestañas, NO tienda en línea)
- Mobile-first, responsive para PC y celular

Estructura: `src/pages/*.jsx` (una página por sección), `src/components/` (Layout, Header, BottomNav, Footer), `src/config/` (`sucursales.js`, `vacantes.js` — datos editables sin tocar lógica). El HTML/PHP legacy previo a la migración vive en `legacy/` solo como referencia histórica, no se despliega.

No reintroducir PHP. No usar frameworks distintos a los aquí listados sin confirmarlo con el usuario primero.

## Secciones del sitio (todas dentro de la SPA)

1. **Inicio / Acceso QR** — pantalla de entrada al escanear el QR en tienda.
2. **Encuesta de satisfacción** — sucursal, quién atendió, calificación (bueno/malo/regular), sugerencias. Al enviar: guarda la respuesta en **Google Sheets** (vía Google Sheets API, el usuario ya tiene la API key) y redirige a la reseña de Google Maps de la sucursal + invitación a seguir redes sociales.
3. **Promociones** — galería de flyers/imágenes de descuentos (10–50%), remates, ofertas. Editable por el dueño desde `/admin` (login con usuario/contraseña, ícono en el Header) sin tocar código ni hacer deploy. Una o varias promociones marcadas como "destacada" se muestran en un popup al entrar a Inicio.
4. **Garantías y Políticas** — contenido estático: 30 días en tienda / 3 meses con proveedor / sin garantía según producto; política explícita de "no cambios".
5. **Contacto** — links directos de WhatsApp (`wa.me/<numero>`) por vendedora activa por sucursal, y número específico de facturación.
6. **Bolsa de Trabajo** — vacantes (puesto, sucursal, salario, requisitos) con botón de contacto directo (WhatsApp/email) al dueño. Pensada para enlazar QR de publicidad impresa.

Sucursales existentes (mismos códigos que en el ERP interno CocimasApp): JM437, JM453B, JM511, LV168, LV167, JDC265.

## Datos: Google Sheets, no base de datos

La encuesta de satisfacción escribe directo a un Google Sheet (no Supabase, no MySQL), vía un **Google Apps Script Web App** (`script.google.com/.../exec`), igual que el sitio legacy — el script corre con su propia autorización de servidor, así que el navegador nunca ve ninguna credencial. La URL ya está configurada en `src/components/EncuestaForm.jsx` como constante `GOOGLE_SCRIPT_URL` (mismo Apps Script que usaba el sitio legacy).

`GOOGLE_SHEETS_API_KEY` (GitHub Secret) no se usa: una API key simple de Google Sheets solo permite **lectura** de hojas públicas, no escritura — no sirve para este flujo. Si en el futuro se requiere leer datos desde el cliente con esa key, evaluar de nuevo si conviene exponerla (aunque sea restringida) o pasar por el mismo Apps Script.

## Login y promociones: Supabase

El login de `/admin` y el CRUD de promociones (antes en `src/config/promociones.js`, hoy solo quedan ahí los helpers `estaVigente`/`esPasadaVisible`) usan **Supabase** (proyecto `cocipagina`, organización `Pondaxems`, ref `bwvkmdjogvaueinccvpf`): tabla `promociones` con RLS (lectura pública, escritura solo autenticado) + bucket de Storage `promos` para las imágenes que se suban desde el editor. El cliente vive en `src/lib/supabaseClient.js` y lee `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (variables de build de Vite, no secretas del lado servidor — la anon key es pública por diseño, la seguridad la da RLS). En local van en `.env` (gitignored); en el deploy, en GitHub Secrets del mismo nombre, inyectadas en el paso `Build` de `.github/workflows/deploy.yml`.

Los usuarios que pueden iniciar sesión en `/admin` se crean manualmente en el dashboard de Supabase (Authentication → Users) — el agente nunca debe crear ni conocer la contraseña del dueño.

Esto es independiente de la encuesta, que sigue sin Supabase (ver sección anterior).

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
