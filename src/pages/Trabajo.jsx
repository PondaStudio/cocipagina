import { useState } from 'react'
import { VACANTES } from '../config/vacantes.js'
import PostulacionForm from '../components/PostulacionForm.jsx'

function contactoLink(contacto, vacante) {
  if (contacto.tipo === 'whatsapp') {
    const text = encodeURIComponent(`Hola, me interesa la vacante de ${vacante.puesto}.`)
    return `https://wa.me/${contacto.valor.replace(/\D/g, '')}?text=${text}`
  }
  const subject = encodeURIComponent(`Vacante: ${vacante.puesto}`)
  return `mailto:${contacto.valor}?subject=${subject}`
}

function VacanteAccordion({ vacante }) {
  const [abierta, setAbierta] = useState(false)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-5 text-left"
      >
        <h2 className="font-bold text-lg text-brand-dark">{vacante.puesto}</h2>
        <span
          className={`shrink-0 text-brand-blue transition-transform ${abierta ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {abierta && (
        <div className="px-5 pb-5">
          <ul className="space-y-1">
            {vacante.requisitos.map((r) => (
              <li key={r} className="text-sm text-slate-600 flex gap-2">
                <span className="text-brand-blue">•</span>
                {r}
              </li>
            ))}
          </ul>

          <a
            href={contactoLink(vacante.contacto, vacante)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-blue text-white font-semibold px-5 py-2.5 text-sm shadow-sm hover:bg-sky-600 hover:shadow-md transition-all"
          >
            {vacante.contacto.tipo === 'whatsapp' ? '💬 Contactar por WhatsApp' : '✉️ Enviar email'}
          </a>
        </div>
      )}
    </div>
  )
}

export default function Trabajo() {
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-dark to-slate-800 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/patterns/columna-blanco-azul.jpg')" }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-10">
          <h1 className="text-2xl font-bold">Bolsa de trabajo</h1>
          <p className="text-slate-300 mt-1">
            Vacantes activas en Cocimas Hogar. Da clic en una vacante para ver el detalle.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">

      <div className="space-y-4">
        {VACANTES.map((v, i) => (
          <VacanteAccordion key={i} vacante={v} />
        ))}
      </div>

      <div className="mt-8 mb-8">
        <PostulacionForm />
      </div>
      </div>
    </div>
  )
}
