import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PromoCarousel({ promos }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (promos.length <= 1) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % promos.length)
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [promos.length])

  if (promos.length === 0) return null

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 bg-white">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {promos.map((promo) => (
            <Link
              key={promo.id}
              to={`/promociones/${promo.id}`}
              className="w-full shrink-0 relative aspect-[4/3] sm:aspect-[16/9] bg-slate-900 overflow-hidden"
            >
              <img
                src={promo.imagen}
                aria-hidden="true"
                alt=""
                className="absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-50"
              />
              <img
                src={promo.imagen}
                alt={promo.titulo}
                loading="lazy"
                className="relative h-full w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                <span className="inline-block rounded-full bg-brand-yellow text-brand-dark text-xs font-bold px-2.5 py-1 mb-1.5">
                  {promo.descuento}
                </span>
                <p className="text-white font-semibold leading-snug">{promo.titulo}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {promos.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {promos.map((promo, i) => (
            <button
              key={promo.id}
              onClick={() => setIndex(i)}
              aria-label={`Ver promoción ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-brand-blue' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
