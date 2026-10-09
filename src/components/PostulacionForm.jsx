import { useState } from 'react'
import { VACANTES } from '../config/vacantes.js'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxHvSxXYsV22QC6wXl1i8fjUpPtWyoxZgqTEJaj4cV_2978aG5wt5-PFb5WGYwYc0jA/exec'

// Número de WhatsApp (RH) al que se abre el chat prellenado con cada
// postulación. El navegador no puede enviar WhatsApp 100% automático sin una
// API de pago (WhatsApp Business API/Twilio) — esto abre el chat con el
// mensaje ya escrito, solo falta que la persona toque "Enviar". El respaldo
// confiable es siempre la hoja de Google, que se guarda sin depender de eso.
const WHATSAPP_NOTIFICACIONES = '523319423903'

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

function waLink(numero, mensaje) {
  const clean = numero.replace(/\D/g, '')
  const text = encodeURIComponent(mensaje)
  return `https://wa.me/${clean}?text=${text}`
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function PostulacionForm() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [vacanteIndex, setVacanteIndex] = useState('')
  const [experiencia, setExperiencia] = useState('')
  const [cv, setCv] = useState(null)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [errors, setErrors] = useState({})

  const MAX_CV_MB = 8

  function validate() {
    const next = {}
    if (!nombre.trim()) next.nombre = 'Escribe tu nombre.'
    if (!telefono.trim()) next.telefono = 'Déjanos un teléfono para contactarte.'
    if (!vacanteIndex) next.vacante = 'Selecciona el puesto que te interesa.'
    if (cv && cv.size > MAX_CV_MB * 1024 * 1024) {
      next.cv = `El archivo pesa demasiado (máx. ${MAX_CV_MB} MB).`
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleCvChange(e) {
    setCv(e.target.files?.[0] ?? null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const vacante = VACANTES[Number(vacanteIndex)]

    if (GOOGLE_SCRIPT_URL !== 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT') {
      setStatus(STATUS.SENDING)

      const payload = new FormData()
      payload.append('nombre', nombre)
      payload.append('telefono', telefono)
      payload.append('puesto', vacante.puesto)
      payload.append('experiencia', experiencia)
      payload.append('fecha', new Date().toISOString())

      try {
        if (cv) {
          const base64 = await fileToBase64(cv)
          payload.append('cvBase64', base64)
          payload.append('cvNombre', cv.name)
          payload.append('cvTipo', cv.type || 'application/octet-stream')
        }

        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 45000))
        const request = fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: payload,
          mode: 'no-cors',
        })
        await Promise.race([request, timeout])
      } catch {
        // La hoja de Google es el respaldo; si falla, seguimos abriendo
        // WhatsApp para no perder la postulación.
      }
    }

    const mensajeWhatsapp = [
      'Nueva postulación desde el sitio:',
      `Nombre: ${nombre}`,
      `Puesto: ${vacante.puesto}`,
      `Teléfono: ${telefono}`,
      experiencia ? `Experiencia: ${experiencia}` : null,
      cv ? `Adjuntó CV: ${cv.name} (revisa la hoja de Google para descargarlo)` : null,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(waLink(WHATSAPP_NOTIFICACIONES, mensajeWhatsapp), '_blank')
    setStatus(STATUS.SUCCESS)
  }

  if (status === STATUS.SUCCESS) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-xl font-bold text-brand-dark">¡Listo, recibimos tu postulación!</h2>
        <p className="text-slate-500 mt-2">
          Te abrimos WhatsApp con tu información lista para enviar — solo toca "Enviar" para
          avisarnos al instante.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-5">
      <h2 className="font-bold text-brand-dark text-lg">Postúlate desde aquí</h2>
      <p className="text-slate-500 mt-1 mb-6 text-sm">
        Llena tus datos, adjunta tu CV y te contactamos directamente.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          />
          {errors.nombre && <p className="text-sm text-brand-red mt-1">{errors.nombre}</p>}
        </div>

        <div>
          <label htmlFor="vacante" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Puesto de interés
          </label>
          <select
            id="vacante"
            value={vacanteIndex}
            onChange={(e) => setVacanteIndex(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          >
            <option value="">Selecciona un puesto...</option>
            {VACANTES.map((v, i) => (
              <option key={i} value={i}>
                {v.puesto}
              </option>
            ))}
          </select>
          {errors.vacante && <p className="text-sm text-brand-red mt-1">{errors.vacante}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Para contactarte"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          />
          {errors.telefono && <p className="text-sm text-brand-red mt-1">{errors.telefono}</p>}
        </div>

        <div>
          <label htmlFor="experiencia" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Experiencia <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <textarea
            id="experiencia"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            rows={4}
            placeholder="Experiencia previa, disponibilidad, etc."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow resize-none"
          />
        </div>

        <div>
          <label htmlFor="cv" className="block text-sm font-semibold text-slate-700 mb-1.5">
            CV o solicitud de empleo <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <label
            htmlFor="cv"
            className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 cursor-pointer hover:border-brand-blue transition-colors"
          >
            <span className="text-2xl">📄</span>
            <span className="text-sm text-slate-500 truncate">
              {cv ? cv.name : 'Toca para subir tu CV (PDF, Word o foto)'}
            </span>
          </label>
          <input
            type="file"
            id="cv"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleCvChange}
            className="hidden"
          />
          {errors.cv && <p className="text-sm text-brand-red mt-1">{errors.cv}</p>}
        </div>

        {status === STATUS.ERROR && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-brand-red">
            No pudimos enviar tu postulación por un problema de conexión. Intenta de nuevo.
          </div>
        )}

        <button
          type="submit"
          disabled={status === STATUS.SENDING}
          className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-blue text-white font-semibold py-3.5 shadow-md shadow-brand-blue/20 hover:bg-sky-600 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none disabled:shadow-none"
        >
          {status === STATUS.SENDING && (
            <span
              aria-hidden="true"
              className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
            />
          )}
          {status === STATUS.SENDING ? 'Enviando...' : 'Enviar postulación'}
        </button>
      </form>
    </div>
  )
}
