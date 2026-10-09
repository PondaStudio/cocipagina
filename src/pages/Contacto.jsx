import { useState } from 'react'
import { SUCURSALES, VENTAS_TELEFONOS, FACTURACION_TELEFONO, RH_TELEFONO } from '../config/sucursales.js'

function waLink(numero, mensaje) {
  const clean = numero.replace(/\D/g, '')
  const text = encodeURIComponent(mensaje)
  return `https://wa.me/${clean}?text=${text}`
}

function mapsLink(direccion) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(direccion)}`
}

function ContactCard({ icon, label, children }) {
  return (
    <div className="aspect-square rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col items-center justify-center text-center gap-2">
      <span className="text-5xl sm:text-6xl leading-none">{icon}</span>
      <span className="font-bold text-brand-dark text-base sm:text-lg">{label}</span>
      {children}
    </div>
  )
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-dark">Contacto</h1>
      <p className="text-slate-500 mt-1 mb-8">
        Escríbenos por WhatsApp para ventas, o contáctanos para facturación y recursos humanos.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-10">
        <ContactCard icon="💬" label="Ventas">
          <div className="flex flex-col gap-1 mt-1">
            {VENTAS_TELEFONOS.map((tel) => (
              <a
                key={tel}
                href={waLink(tel, 'Hola, te escribo desde la página de Cocimas Hogar.')}
                target="_blank"
                rel="noreferrer"
                className="font-mono font-semibold text-sm sm:text-base tracking-tight text-green-700 hover:underline"
              >
                {tel}
              </a>
            ))}
          </div>
        </ContactCard>

        <ContactCard icon="🧾" label="Facturación">
          <button
            onClick={() => copiar(FACTURACION_TELEFONO)}
            className="font-mono font-semibold text-sm sm:text-base tracking-tight text-slate-600 hover:text-brand-blue mt-1"
          >
            {copiado === FACTURACION_TELEFONO ? '¡Copiado!' : FACTURACION_TELEFONO}
          </button>
        </ContactCard>

        <ContactCard icon="🧑‍💼" label="Recursos Humanos">
          <button
            onClick={() => copiar(RH_TELEFONO)}
            className="font-mono font-semibold text-sm sm:text-base tracking-tight text-slate-600 hover:text-brand-blue mt-1"
          >
            {copiado === RH_TELEFONO ? '¡Copiado!' : RH_TELEFONO}
          </button>
        </ContactCard>
      </div>

      <h2 className="font-bold text-brand-dark mb-3">Nuestras sucursales</h2>
      <section className="space-y-3">
        {SUCURSALES.map((s) => (
          <div
            key={s.codigo}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow px-5 py-4 flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-brand-dark">{s.nombre}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{s.direccion}</p>
              <p className="text-sm text-slate-500">{s.horario}</p>
            </div>
            <a
              href={mapsLink(s.direccion)}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-brand-blue text-white font-semibold px-4 py-2 text-sm shadow-sm hover:bg-sky-600 hover:shadow-md transition-all"
            >
              📍 Ir
            </a>
          </div>
        ))}
      </section>
    </div>
  )
}
