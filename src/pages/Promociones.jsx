// TODO(dueño): reemplaza estas imágenes de placeholder por los flyers reales.
// Cada entrada es { src, alt }. Puedes poner los archivos en /public/promos/
// y referenciarlos como '/promos/nombre.jpg'.
const PROMOS = [
  {
    src: 'https://placehold.co/600x800/2397D2/ffffff?text=Promo+1',
    alt: 'Promoción 1 — placeholder',
  },
  {
    src: 'https://placehold.co/600x800/E52527/ffffff?text=Promo+2',
    alt: 'Promoción 2 — placeholder',
  },
  {
    src: 'https://placehold.co/600x800/FAC914/1a1d26?text=Promo+3',
    alt: 'Promoción 3 — placeholder',
  },
  {
    src: 'https://placehold.co/600x800/22c55e/ffffff?text=Promo+4',
    alt: 'Promoción 4 — placeholder',
  },
]

export default function Promociones() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-dark">Promociones</h1>
      <p className="text-slate-500 mt-1 mb-8">
        Descuentos de 10% a 50%, remates y ofertas vigentes en nuestras sucursales.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {PROMOS.map((promo, i) => (
          <div
            key={i}
            className="aspect-[3/4] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={promo.src}
              alt={promo.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-8">
        Imágenes de muestra. El contenido real se actualizará próximamente.
      </p>
    </div>
  )
}
