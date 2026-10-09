import { useState } from 'react'
import { VACANTES } from '../config/vacantes.js'

// TODO(dueño): reemplazar con la URL real del Apps Script Web App una vez
// desplegado (ver docs/apps-script-bolsa-trabajo.md). Mientras tanto el
// formulario no envía nada y muestra un aviso.
const GOOGLE_SCRIPT_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT'

const STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function PostulacionForm() {
  const [nombre, setNombre] = useState('')
  const [contacto, setContacto] = useState('')
  const [vacanteIndex, setVacanteIndex] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!nombre.trim()) next.nombre = 'Escribe tu nombre.'
    if (!contacto.trim()) next.contacto = 'Déjanos un teléfono o correo para contactarte.'
    if (!vacanteIndex) next.vacante = 'Selecciona la vacante que te interesa.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    if (GOOGLE_SCRIPT_URL === 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT') {
      setStatus(STATUS.ERROR)
      setErrors({ config: 'El formulario todavía no está conectado a Google Sheets.' })
      return
    }

    setStatus(STATUS.SENDING)

    const vacante = VACANTES[Number(vacanteIndex)]
    const payload = new FormData()
    payload.append('nombre', nombre)
    payload.append('contacto', contacto)
    payload.append('puesto', vacante.puesto)
    payload.append('sucursal', vacante.sucursal)
    payload.append('mensaje', mensaje)
    payload.append('fecha', new Date().toISOString())

    try {
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 20000))
      const request = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: payload,
        mode: 'no-cors',
      })
      await Promise.race([request, timeout])
      setStatus(STATUS.SUCCESS)
    } catch {
      setStatus(STATUS.ERROR)
    }
  }

  if (status === STATUS.SUCCESS) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-xl font-bold text-brand-dark">¡Listo, recibimos tu postulación!</h2>
        <p className="text-slate-500 mt-2">Te contactaremos pronto si tu perfil encaja con la vacante.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-5">
      <h2 className="font-bold text-brand-dark text-lg">Postúlate desde aquí</h2>
      <p className="text-slate-500 mt-1 mb-6 text-sm">
        Llena tus datos y te contactamos directamente.
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
          <label htmlFor="contacto" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Teléfono o correo
          </label>
          <input
            type="text"
            id="contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="Para contactarte"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          />
          {errors.contacto && <p className="text-sm text-brand-red mt-1">{errors.contacto}</p>}
        </div>

        <div>
          <label htmlFor="vacante" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Vacante que te interesa
          </label>
          <select
            id="vacante"
            value={vacanteIndex}
            onChange={(e) => setVacanteIndex(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow"
          >
            <option value="">Selecciona una vacante...</option>
            {VACANTES.map((v, i) => (
              <option key={i} value={i}>
                {v.puesto} — {v.sucursal}
              </option>
            ))}
          </select>
          {errors.vacante && <p className="text-sm text-brand-red mt-1">{errors.vacante}</p>}
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Cuéntanos de tu experiencia <span className="font-normal text-slate-400">(opcional)</span>
          </label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            placeholder="Experiencia previa, disponibilidad, etc."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/30 outline-none transition-shadow resize-none"
          />
        </div>

        {errors.config && (
          <div className="rounded-xl bg-yellow-50 border border-brand-yellow/40 px-4 py-3 text-sm text-yellow-800">
            {errors.config}
          </div>
        )}

        {status === STATUS.ERROR && !errors.config && (
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
