import { useState } from 'react'
import { SUCURSALES } from '../config/sucursales.js'

function waLink(numero, mensaje) {
  const clean = numero.replace(/\D/g, '')
  const text = encodeURIComponent(mensaje)
  return `https://wa.me/${clean}?text=${text}`
}

export default function Contacto() {
  const [copiado, setCopiado] = useState('')

  async function copiar(telefono) {
    try {
      await navigator.clipboard.writeText(telefono)
      setCopiado(telefono)
      setTimeout(() => setCopiado(''), 2000)
    } catch {
      setCopiado('')
    }
  }

  const facturacionTelefonos = [...new Set(SUCURSALES.map((s) => s.facturacionTelefono))]

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-dark">Contacto</h1>
      <p className="text-slate-500 mt-1 mb-8">
        Escríbenos directo por WhatsApp a la vendedora de tu sucursal, o contáctanos para
        facturación.
      </p>

      <section className="rounded-xl bg-white border border-slate-200 shadow-sm px-5 py-5 mb-8">
        <h2 className="font-bold text-brand-dark mb-3">Facturación</h2>
        <div className="flex flex-wrap gap-3">
          {facturacionTelefonos.map((tel) => (
            <button
              key={tel}
              onClick={() => copiar(tel)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-mono text-sm text-slate-700 hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              📞 {tel}
              {copiado === tel && <span className="text-xs text-green-600">¡Copiado!</span>}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        {SUCURSALES.map((s) => (
          <div key={s.codigo} className="rounded-xl border border-slate-200 bg-white shadow-sm px-5 py-4">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <h2 className="font-bold text-brand-dark">{s.nombre}</h2>
              <span className="text-xs font-mono text-slate-400">{s.codigo}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{s.direccion}</p>
            <p className="text-sm text-slate-500">{s.horario}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {s.vendedoras.map((v) => (
                <a
                  key={v.nombre}
                  href={waLink(v.whatsapp, `Hola, te escribo desde la página de Cocimas Hogar (${s.nombre}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 px-3.5 py-1.5 text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  💬 {v.nombre}
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
