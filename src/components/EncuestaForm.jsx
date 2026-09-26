import { useMemo, useState } from 'react'
import { SUCURSALES, GOOGLE_REVIEW_DEFAULT_URL, REDES_SOCIALES } from '../config/sucursales.js'

// El Web App corre con la autorización del propio script, así que no expone
// ninguna API key en el navegador del cliente.
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyL8w4T31zYjOJJddqbtCz9r-855iu6ADWwpSfvJeayvOT1pynbPUD0nd5kYvEO1y3S/exec'

const CALIFICACIONES = [
  { value: 'bueno', label: 'Bueno', emoji: '😀', color: 'border-green-500 bg-green-50 text-green-700' },
  { value: 'regular', label: 'Regular', emoji: '😐', color: 'border-brand-yellow bg-yellow-50 text-yellow-800' },
  { value: 'malo', label: 'Malo', emoji: '☹️', color: 'border-brand-red bg-red-50 text-red-700' },
]

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function EncuestaForm({
  title = '¡Tu opinión nos importa!',
  className = 'mx-auto max-w-md px-4',
}) {
  const [sucursalCodigo, setSucursalCodigo] = useState('')
  const [vendedora, setVendedora] = useState('')
  const [calificacion, setCalificacion] = useState('')
  const [sugerencias, setSugerencias] = useState('')
  const [ticketFoto, setTicketFoto] = useState(null)
  const [status, setStatus] = useState(STATUS.IDLE)
  const [errors, setErrors] = useState({})

  const sucursal = useMemo(
    () => SUCURSALES.find((s) => s.codigo === sucursalCodigo),
    [sucursalCodigo],
  )

  const MAX_FOTO_MB = 8

  function validate() {
    const next = {}
    if (!sucursalCodigo) next.sucursal = 'Selecciona una sucursal.'
    if (!calificacion) next.calificacion = 'Selecciona una calificación.'
    if (ticketFoto && ticketFoto.size > MAX_FOTO_MB * 1024 * 1024) {
      next.ticketFoto = `La foto pesa demasiado (máx. ${MAX_FOTO_MB} MB).`
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleFotoChange(e) {
    const file = e.target.files?.[0] ?? null
    setTicketFoto(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setStatus(STATUS.SENDING)

    // Nombres de campo iguales a los que ya espera el Google Apps Script
    // Web App existente (el mismo que usaba el sitio legacy).
    const payload = new FormData()
    payload.append('sucursal', sucursal?.nombre ?? sucursalCodigo)
    payload.append('sucursalCodigo', sucursalCodigo)
    payload.append('employeeName', vendedora)
    payload.append('rating', calificacion)
    payload.append('suggestions', sugerencias)
    payload.append('fecha', new Date().toISOString())
    if (ticketFoto) {
      payload.append('ticketFoto', ticketFoto, ticketFoto.name)
    }

    try {
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 8000))
      const request = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: payload,
        mode: 'no-cors',
      })
      await Promise.race([request, timeout])
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setStatus(STATUS.ERROR)
    }
  }

  if (status === STATUS.SUCCESS) {
    return (
      <div className={`${className} text-center`}>
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-brand-dark">¡Gracias por tu opinión!</h2>
        <p className="text-slate-500 mt-2">Tu feedback nos ayuda a mejorar cada día.</p>

        <div className="mt-8 space-y-3">
          <a
            href={sucursal?.mapsReviewUrl ?? GOOGLE_REVIEW_DEFAULT_URL}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-xl bg-brand-blue text-white font-semibold py-3 hover:bg-sky-600 transition-colors"
          >
            Dejar reseña en Google
          </a>
          <div className="flex gap-3">
            <a
              href={REDES_SOCIALES.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl border border-slate-200 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Facebook
            </a>
            <a
              href={REDES_SOCIALES.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl border border-slate-200 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <h2 className="text-2xl font-bold text-brand-dark">{title}</h2>
      <p className="text-slate-500 mt-1 mb-8">
        Ayúdanos a mejorar compartiendo tu experiencia de compra.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="sucursal" className="block text-sm font-semibold text-slate-700 mb-1.5">
            ¿En qué sucursal compraste?
          </label>
          <select
            id="sucursal"
            value={sucursalCodigo}
            onChange={(e) => {
              setSucursalCodigo(e.target.value)
              setVendedora('')
            }}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          >
            <option value="">Selecciona una sucursal...</option>
            {SUCURSALES.map((s) => (
              <option key={s.codigo} value={s.codigo}>
                {s.nombre}
              </option>
            ))}
          </select>
          {errors.sucursal && <p className="text-sm text-brand-red mt-1">{errors.sucursal}</p>}
        </div>

        <div>
          <label htmlFor="vendedora" className="block text-sm font-semibold text-slate-700 mb-1.5">
            ¿Quién te atendió? <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <input
            type="text"
            id="vendedora"
            value={vendedora}
            onChange={(e) => setVendedora(e.target.value)}
            placeholder="Nombre de quien te atendió"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          />
        </div>

        <div>
          <span className="block text-sm font-semibold text-slate-700 mb-1.5">
            ¿Cómo fue la atención?
          </span>
          <div className="grid grid-cols-3 gap-3">
            {CALIFICACIONES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCalificacion(c.value)}
                className={`flex flex-col items-center gap-1 rounded-xl border-2 py-4 font-semibold transition-all ${
                  calificacion === c.value
                    ? `${c.color} shadow-md scale-105`
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:-translate-y-0.5'
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-sm">{c.label}</span>
              </button>
            ))}
          </div>
          {errors.calificacion && (
            <p className="text-sm text-brand-red mt-1">{errors.calificacion}</p>
          )}
        </div>

        <div>
          <label htmlFor="sugerencias" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Sugerencias <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <textarea
            id="sugerencias"
            value={sugerencias}
            onChange={(e) => setSugerencias(e.target.value)}
            rows={4}
            placeholder="Comparte tus comentarios..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow resize-none"
          />
        </div>

        <div>
          <label htmlFor="ticketFoto" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Foto del ticket <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <label
            htmlFor="ticketFoto"
            className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 cursor-pointer hover:border-brand-blue transition-colors"
          >
            <span className="text-2xl">📷</span>
            <span className="text-sm text-slate-500 truncate">
              {ticketFoto ? ticketFoto.name : 'Toca para tomar o subir una foto'}
            </span>
          </label>
          <input
            type="file"
            id="ticketFoto"
            accept="image/*"
            capture="environment"
            onChange={handleFotoChange}
            className="hidden"
          />
          {errors.ticketFoto && (
            <p className="text-sm text-brand-red mt-1">{errors.ticketFoto}</p>
          )}
        </div>

        {status === STATUS.ERROR && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-brand-red">
            No pudimos enviar tu calificación por un problema de conexión. Por favor intenta de
            nuevo en unos segundos.
          </div>
        )}

        <button
          type="submit"
          disabled={status === STATUS.SENDING}
          className="w-full rounded-xl bg-brand-blue text-white font-semibold py-3.5 shadow-md shadow-brand-blue/20 hover:bg-sky-600 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none disabled:shadow-none"
        >
          {status === STATUS.SENDING ? 'Enviando...' : 'Enviar calificación'}
        </button>
      </form>
    </div>
  )
}
