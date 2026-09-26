import { Link, useParams } from 'react-router-dom'
import { PROMOCIONES, estaVigente } from '../config/promociones.js'

function formatoFecha(iso) {
  const [y, m, d] = iso.split('-')
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function PromocionDetalle() {
  const { id } = useParams()
  const promo = PROMOCIONES.find((p) => p.id === id)

  if (!promo) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Promoción no encontrada</h1>
        <Link to="/promociones" className="text-brand-blue font-semibold hover:underline mt-4 inline-block">
          Volver a promociones
        </Link>
      </div>
    )
  }

  const vigente = estaVigente(promo)

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link to="/promociones" className="text-sm font-semibold text-brand-blue hover:underline">
        ← Todas las promociones
      </Link>

      <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
        <div className="aspect-[4/3] sm:aspect-[16/9] bg-slate-900 relative overflow-hidden">
          <img
            src={promo.imagen}
            aria-hidden="true"
            alt=""
            className={`absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-50 ${
              vigente ? '' : 'grayscale'
            }`}
          />
          <img
            src={promo.imagen}
            alt={promo.titulo}
            className={`relative h-full w-full object-contain ${vigente ? '' : 'grayscale opacity-70'}`}
          />
          {!vigente && (
            <span className="absolute top-3 right-3 rounded-full bg-slate-800/80 text-white text-xs font-semibold px-3 py-1">
              Promoción finalizada
            </span>
          )}
        </div>

        <div className="p-6">
          <span className="inline-block rounded-full bg-brand-yellow/20 text-yellow-800 text-sm font-bold px-3 py-1">
            {promo.descuento}
          </span>
          <h1 className="text-2xl font-bold text-brand-dark mt-3">{promo.titulo}</h1>
          <p className="text-slate-400 text-sm">{promo.marca}</p>

          <p className="text-slate-600 mt-4 leading-relaxed">{promo.descripcion}</p>

          <div className="mt-6 space-y-3 text-sm">
            <div>
              <span className="font-semibold text-slate-700">Aplica a: </span>
              <span className="text-slate-600">{promo.aplica}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">No aplica a: </span>
              <span className="text-slate-600">{promo.noAplica}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-700">Vigencia: </span>
              <span className={vigente ? 'text-slate-600' : 'text-brand-red font-medium'}>
                Del {formatoFecha(promo.vigenciaDesde)} al {formatoFecha(promo.vigenciaHasta)}
                {!vigente && ' (finalizada)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
