import { useEffect, useState } from 'react'

const VISTO_KEY = 'cocimas_popup_canal_visto'

export default function CanalPopup({ enlace, onCerrar }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(VISTO_KEY)) return
    } catch {
      // si no hay sessionStorage, mostramos el popup de todas formas
    }
    setVisible(true)
  }, [])

  function cerrar() {
    setVisible(false)
    try {
      sessionStorage.setItem(VISTO_KEY, '1')
    } catch {
      // sin sessionStorage simplemente no se recuerda entre vistas
    }
    onCerrar?.()
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={cerrar}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-lg md:max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/50 text-white flex items-center justify-center text-lg sm:text-2xl hover:bg-black/70 transition-colors"
        >
          ×
        </button>

        <a href={enlace} target="_blank" rel="noreferrer" onClick={cerrar} className="block">
          <div className="aspect-square sm:aspect-[4/3] bg-green-50 relative flex items-center justify-center p-8 sm:p-10">
            <img
              src="/whatsapp-canal-qr.png"
              alt="Código QR del canal de WhatsApp"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="p-4 sm:p-6 text-center">
            <span className="inline-block rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5">
              WhatsApp
            </span>
            <p className="font-semibold text-brand-dark leading-snug mt-2 text-base sm:text-xl">
              Únete a nuestro canal de WhatsApp
            </p>
            <p className="text-slate-500 text-sm mt-1">Entérate primero de promociones y novedades.</p>
          </div>
        </a>
      </div>
    </div>
  )
}
