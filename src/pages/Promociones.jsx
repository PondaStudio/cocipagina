import { Link } from 'react-router-dom'
import { PROMOCIONES, estaVigente, esPasadaVisible } from '../config/promociones.js'

function PromoCard({ promo, agotada = false }) {
  return (
    <Link
      to={`/promociones/${promo.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      <div className="aspect-square overflow-hidden bg-slate-100 relative">
        <img
          src={promo.imagen}
          aria-hidden="true"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-60 ${
            agotada ? 'grayscale' : ''
          }`}
        />
        <img
          src={promo.imagen}
          alt={promo.titulo}
          loading="lazy"
          className={`relative h-full w-full object-contain transition-transform group-hover:scale-[1.02] ${
            agotada ? 'grayscale opacity-70' : ''
          }`}
        />
        {agotada && (
          <span className="absolute top-2 right-2 rounded-full bg-slate-800/80 text-white text-xs font-semibold px-2.5 py-1">
            Finalizada
          </span>
        )}
      </div>
      <div className="p-4">
        <span className="inline-block rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold px-2.5 py-1">
          {promo.descuento}
        </span>
        <p className="font-semibold text-brand-dark leading-snug mt-2">{promo.titulo}</p>
        <p className="text-xs text-slate-400 mt-1">{promo.marca}</p>
      </div>
    </Link>
  )
}

export default function Promociones() {
  const activas = PROMOCIONES.filter((p) => estaVigente(p))
  const pasadas = PROMOCIONES.filter((p) => esPasadaVisible(p))

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-dark">Promociones</h1>
      <p className="text-slate-500 mt-1 mb-8">
        Descuentos y ofertas vigentes en nuestras sucursales. Da clic en una promoción para ver
        el detalle completo.
      </p>

      {activas.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {activas.map((promo) => (
            <PromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500">No hay promociones vigentes por el momento.</p>
      )}

      {pasadas.length > 0 && (
        <div className="mt-14">
          <h2 className="text-lg font-bold text-slate-400 mb-4">Promociones pasadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pasadas.map((promo) => (
              <PromoCard key={promo.id} promo={promo} agotada />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
