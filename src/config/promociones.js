// TODO(dueño): agrega, edita o quita promociones aquí. `vigenciaHasta` decide
// automáticamente si la promo se muestra como activa o pasa a "Promociones
// pasadas" en la página de Promociones.
export const PROMOCIONES = [
  {
    id: 'hotspot-15',
    titulo: 'Fiestas Patrias — Equipa tu cocina',
    marca: 'HotSpot',
    imagen: '/promos/promo-hotspot-15.webp',
    descuento: '15% de descuento',
    descripcion:
      'Grandes descuentos en batería de cocina, sartenes, ollas y más artículos HotSpot para equipar tu cocina esta temporada patria.',
    aplica: 'Línea de batería de cocina HotSpot participante.',
    noAplica: 'Productos fuera de la línea HotSpot mostrada en la promoción.',
    vigenciaDesde: '2026-09-10',
    vigenciaHasta: '2026-09-30',
  },
  {
    id: 'hamilton-proctor-15',
    titulo: 'Gran venta de Mes Patrio',
    marca: 'Hamilton Beach / Proctor Silex',
    imagen: '/promos/promo-hamilton-proctor-15.jpg',
    descuento: '15% de descuento',
    descripcion:
      'Prepara tus platillos favoritos con electrodomésticos Hamilton Beach y Proctor Silex: procesadores, tostadores, hornos, vaporeras y más.',
    aplica: 'Productos Hamilton Beach y Proctor Silex participantes en tienda.',
    noAplica: 'Aplican restricciones según modelo; consulta en tienda.',
    vigenciaDesde: '2026-09-02',
    vigenciaHasta: '2026-09-30',
  },
  {
    id: 'oster-10',
    titulo: 'Oferta de Mes Patrio Oster',
    marca: 'Oster',
    imagen: '/promos/promo-oster-10.jpg',
    descuento: '10% de descuento',
    descripcion:
      'Descuento especial en licuadoras Oster seleccionadas, modelos 869-16G y 4108.',
    aplica: 'Únicamente licuadoras Oster modelo 869-16G y 4108.',
    noAplica: 'No aplica para el resto de la línea Oster.',
    vigenciaDesde: '2026-09-02',
    vigenciaHasta: '2026-09-30',
  },
  {
    id: 'tfal-10',
    titulo: '¡Viva México! y T-fal',
    marca: 'T-fal',
    imagen: '/promos/promo-tfal-10.jpg',
    descuento: '10% de descuento',
    descripcion: 'Descuento en todas las ollas de presión T-fal.',
    aplica: 'Todas las ollas de presión T-fal.',
    noAplica: 'Otros productos T-fal fuera de ollas de presión.',
    vigenciaDesde: '2026-09-08',
    vigenciaHasta: '2026-09-30',
  },
  {
    id: 'tramontina-10',
    titulo: 'Tramontina Caribe',
    marca: 'Tramontina',
    imagen: '/promos/promo-tramontina-10.jpg',
    descuento: '10% de descuento',
    descripcion:
      'Descuento en la línea Tramontina Caribe: sartenes, ollas y utensilios antiadherentes.',
    aplica: 'Línea Tramontina Caribe.',
    noAplica: 'Otras líneas Tramontina no incluidas en esta promoción.',
    vigenciaDesde: '2026-09-10',
    vigenciaHasta: '2026-09-30',
  },
]

export function estaVigente(promo, hoy = new Date()) {
  const desde = new Date(`${promo.vigenciaDesde}T00:00:00`)
  const hasta = new Date(`${promo.vigenciaHasta}T23:59:59`)
  return hoy >= desde && hoy <= hasta
}
