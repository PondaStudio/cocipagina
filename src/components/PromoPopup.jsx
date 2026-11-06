import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const VISTO_KEY = 'cocimas_popup_promos_visto'

export default function PromoPopup({ promos }) {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (promos.length === 0) return
    try {
      if (sessionStorage.getItem(VISTO_KEY)) return
    } catch {
      // si no hay sessionStorage, mostramos el popup de todas formas
    }
    setVisible(true)
  }, [promos.length])

  function cerrar() {
    setVisible(false)
    try {
      sessionStorage.setItem(VISTO_KEY, '1')
    } catch {
      // sin sessionStorage simplemente no se recuerda entre vistas
    }
  }

  if (!visible || promos.length === 0) return null

  const promo = promos[index]

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

        <Link to="/promociones" onClick={cerrar} className="block">
          <div className="aspect-square sm:aspect-[4/3] bg-slate-100 relative">
            <img
              src={promo.imagen}
              aria-hidden="true"
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-60"
            />
            <img
              src={promo.imagen}
              alt={promo.titulo}
              className="relative h-full w-full object-contain"
            />
          </div>
          <div className="p-4 sm:p-6">
            <span className="inline-block rounded-full bg-brand-blue/10 text-brand-blue text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5">
              {promo.descuento}
            </span>
            <p className="font-semibold text-brand-dark leading-snug mt-2 text-base sm:text-xl">{promo.titulo}</p>
          </div>
        </Link>

        {promos.length > 1 && (
          <div className="flex justify-center gap-1.5 sm:gap-2 pb-4 sm:pb-6">
            {promos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setIndex(i)}
                aria-label={`Ver promoción ${i + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  i === index ? 'w-6 sm:w-8 bg-brand-blue' : 'w-1.5 sm:w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
