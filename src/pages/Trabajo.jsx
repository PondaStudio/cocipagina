import { VACANTES } from '../config/vacantes.js'

function contactoLink(contacto, vacante) {
  if (contacto.tipo === 'whatsapp') {
    const text = encodeURIComponent(`Hola, me interesa la vacante de ${vacante.puesto} (${vacante.sucursal}).`)
    return `https://wa.me/${contacto.valor.replace(/\D/g, '')}?text=${text}`
  }
  const subject = encodeURIComponent(`Vacante: ${vacante.puesto} (${vacante.sucursal})`)
  return `mailto:${contacto.valor}?subject=${subject}`
}

export default function Trabajo() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-dark">Bolsa de trabajo</h1>
      <p className="text-slate-500 mt-1 mb-8">
        Vacantes activas en Cocimas Hogar. Contáctanos directamente para aplicar.
      </p>

      <div className="space-y-4">
        {VACANTES.map((v, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white shadow-sm px-5 py-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h2 className="font-bold text-lg text-brand-dark">{v.puesto}</h2>
                <p className="text-sm text-slate-500">{v.sucursal}</p>
              </div>
              <span className="rounded-full bg-brand-yellow/20 text-yellow-800 text-sm font-semibold px-3 py-1 whitespace-nowrap">
                {v.salario}
              </span>
            </div>

            <ul className="mt-3 space-y-1">
              {v.requisitos.map((r) => (
                <li key={r} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-brand-blue">•</span>
                  {r}
                </li>
              ))}
            </ul>

            <a
              href={contactoLink(v.contacto, v)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue text-white font-semibold px-4 py-2.5 text-sm hover:bg-sky-600 transition-colors"
            >
              {v.contacto.tipo === 'whatsapp' ? '💬 Contactar por WhatsApp' : '✉️ Enviar email'}
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-8">
        Vacantes de ejemplo — actualízalas en src/config/vacantes.js.
      </p>
    </div>
  )
}
