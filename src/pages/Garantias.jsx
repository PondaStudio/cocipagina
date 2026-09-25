const GARANTIAS = [
  {
    plazo: '30 días',
    titulo: 'Garantía en tienda',
    detalle:
      'Productos con garantía directa de Cocimas Hogar: 30 días naturales a partir de la fecha de compra, presentando tu ticket o comprobante.',
    color: 'border-brand-blue',
  },
  {
    plazo: '3 meses',
    titulo: 'Garantía con proveedor',
    detalle:
      'Algunos productos cuentan con garantía extendida directa del proveedor por 3 meses. Aplica según fabricante y línea de producto.',
    color: 'border-brand-yellow',
  },
  {
    plazo: 'Sin garantía',
    titulo: 'Productos sin garantía',
    detalle:
      'Ciertos artículos (por ejemplo, en remate o liquidación) se venden sin garantía. Esto se indica claramente al momento de la compra.',
    color: 'border-brand-red',
  },
]

export default function Garantias() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-dark">Garantías y políticas</h1>
      <p className="text-slate-500 mt-1 mb-8">
        Consulta las condiciones de garantía y nuestra política de cambios.
      </p>

      <section className="space-y-4">
        {GARANTIAS.map((g) => (
          <div
            key={g.titulo}
            className={`rounded-xl border-l-4 ${g.color} bg-white shadow-sm px-5 py-4`}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-wide text-slate-400">
              {g.plazo}
            </span>
            <h2 className="font-bold text-lg text-brand-dark mt-0.5">{g.titulo}</h2>
            <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">{g.detalle}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-xl bg-brand-dark text-white px-5 py-6">
        <h2 className="font-bold text-lg">Política de "no cambios"</h2>
        <p className="text-slate-200 text-sm mt-2 leading-relaxed">
          En Cocimas Hogar nos esforzamos porque cada producto llegue en perfectas condiciones y
          cumpla con lo ofrecido. Por eso, <strong className="text-white">no realizamos cambios
          por gusto</strong>: es decir, una vez concretada la compra, no se aceptan cambios porque
          el color, modelo o funcionalidad "no gustó" después de haberlo comprado.
        </p>
        <p className="text-slate-200 text-sm mt-3 leading-relaxed">
          Sí atendemos, dentro de los plazos de garantía correspondientes, cualquier defecto de
          fabricación o falla real del producto. Te pedimos revisar bien tu compra antes de
          retirarla de la tienda — con gusto resolvemos tus dudas antes de decidir.
        </p>
      </section>

      <p className="text-xs text-slate-400 mt-8">
        Texto de referencia — el dueño puede solicitar ajustes a la redacción o los plazos exactos.
      </p>
    </div>
  )
}
