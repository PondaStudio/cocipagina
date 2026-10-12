import { useState } from 'react'
import { SUCURSALES, VENTAS_TELEFONOS, FACTURACION_TELEFONO, RH_TELEFONO } from '../config/sucursales.js'

function waLink(numero, mensaje) {
  const clean = numero.replace(/\D/g, '')
  const text = encodeURIComponent(mensaje)
  return `https://wa.me/${clean}?text=${text}`
}

function telLink(numero) {
  return `tel:${numero.replace(/\D/g, '')}`
}

function mapsLink(direccion) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(direccion)}`
}

function IconWhatsApp(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.58-.49-.5-.67-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
      <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.33A9.96 9.96 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.2c-1.69 0-3.26-.5-4.58-1.36l-.33-.2-3.01.79.8-2.93-.21-.3A8.17 8.17 0 0 1 3.82 12c0-4.53 3.68-8.2 8.2-8.2 4.52 0 8.2 3.67 8.2 8.2 0 4.53-3.68 8.2-8.2 8.2z" />
    </svg>
  )
}

function IconReceipt(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3z" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
    </svg>
  )
}

function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5" />
      <circle cx="17" cy="8.5" r="2.6" />
      <path d="M15.5 14.3c2.48.27 4.5 2.47 4.5 5.2" />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 4h3.5l1.3 4.5-2 1.6a12.5 12.5 0 0 0 6.1 6.1l1.6-2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
    </svg>
  )
}

function IconCopy(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </svg>
  )
}

function ContactCard({ icon, label, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center gap-3">
      <div className="h-16 w-16 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
        {icon}
      </div>
      <span className="font-bold text-brand-dark text-lg uppercase tracking-wide">{label}</span>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <ContactCard icon={<IconWhatsApp className="h-8 w-8" />} label="Ventas">
          <div className="flex flex-col gap-2 w-full mt-1">
            {VENTAS_TELEFONOS.map((tel) => (
              <a
                key={tel}
                href={waLink(tel, 'Hola, te escribo desde la página de Cocimas Hogar.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white font-mono font-bold text-base sm:text-lg tracking-tight px-4 py-2.5 shadow-sm hover:bg-green-700 transition-colors"
              >
                <IconWhatsApp className="h-4 w-4 shrink-0" />
                {tel}
              </a>
            ))}
          </div>
        </ContactCard>

        <ContactCard icon={<IconReceipt className="h-8 w-8" />} label="Facturación">
          <div className="flex items-center gap-2 w-full mt-1">
            <a
              href={telLink(FACTURACION_TELEFONO)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-mono font-bold text-base sm:text-lg tracking-tight px-4 py-2.5 shadow-sm hover:bg-sky-600 transition-colors"
            >
              <IconPhone className="h-4 w-4 shrink-0" />
              {FACTURACION_TELEFONO}
            </a>
            <button
              onClick={() => copiar(FACTURACION_TELEFONO)}
              aria-label="Copiar número"
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-brand-blue hover:border-brand-blue transition-colors"
            >
              <IconCopy className="h-4 w-4" />
            </button>
          </div>
          {copiado === FACTURACION_TELEFONO && <span className="text-xs text-brand-blue">¡Copiado!</span>}
        </ContactCard>

        <ContactCard icon={<IconUsers className="h-8 w-8" />} label="Recursos Humanos">
          <div className="flex items-center gap-2 w-full mt-1">
            <a
              href={telLink(RH_TELEFONO)}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-blue text-white font-mono font-bold text-base sm:text-lg tracking-tight px-4 py-2.5 shadow-sm hover:bg-sky-600 transition-colors"
            >
              <IconPhone className="h-4 w-4 shrink-0" />
              {RH_TELEFONO}
            </a>
            <button
              onClick={() => copiar(RH_TELEFONO)}
              aria-label="Copiar número"
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-brand-blue hover:border-brand-blue transition-colors"
            >
              <IconCopy className="h-4 w-4" />
            </button>
          </div>
          {copiado === RH_TELEFONO && <span className="text-xs text-brand-blue">¡Copiado!</span>}
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
