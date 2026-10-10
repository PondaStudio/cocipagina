// TODO(dueño): agrega, edita o quita promociones aquí. `vigenciaHasta` decide
// automáticamente si la promo se muestra como activa o pasa a "Promociones
// pasadas" en la página de Promociones. Marca `destacada: true` en las que
// quieras que aparezcan en la ventana emergente de Inicio.
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
    descripcion: 'Descuento especial en toda la línea de productos Oster.',
    aplica: 'Toda la línea de productos Oster.',
    noAplica: 'No aplica a otras marcas.',
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
  {
    id: 'oster-10-octubre',
    titulo: 'Gran promoción Oster',
    marca: 'Oster',
    imagen: '/promos/promo-oster-10-octubre.jpg',
    descuento: '10% de descuento',
    descripcion: 'Descuento especial en toda la línea Oster.',
    aplica: 'Toda la línea de productos Oster.',
    noAplica: 'No aplica en chocomileras, licuadora 4108, licuadora 869-16 ni en aspas marca Oster.',
    vigenciaDesde: '2026-10-06',
    vigenciaHasta: '2026-10-31',
    destacada: true,
  },
  {
    id: 'tfal-licuadoras-10',
    titulo: 'Licuadoras T-fal',
    marca: 'T-fal',
    imagen: '/promos/promo-tfal-licuadoras-10.jpg',
    descuento: '10% de descuento',
    descripcion: 'Descuento en todas las licuadoras marca T-fal.',
    aplica: 'Todas las licuadoras T-fal.',
    noAplica: 'Otros productos T-fal fuera de licuadoras.',
    vigenciaDesde: '2026-10-04',
    vigenciaHasta: '2026-10-31',
    destacada: true,
  },
  {
    id: 'tfal-sartenes-10',
    titulo: 'Juego de sartenes T-fal',
    marca: 'T-fal',
    imagen: '/promos/promo-tfal-sartenes-10.jpg',
    descuento: '10% de descuento',
    descripcion: 'Descuento en juego de sartenes marca T-fal.',
    aplica: 'Juego de sartenes T-fal.',
    noAplica: 'Otros productos T-fal fuera del juego de sartenes.',
    vigenciaDesde: '2026-10-04',
    vigenciaHasta: '2026-10-31',
    destacada: true,
  },
  {
    id: 'tfal-baterias-10',
    titulo: 'Baterías de cocina T-fal',
    marca: 'T-fal',
    imagen: '/promos/promo-tfal-baterias-10.jpg',
    descuento: '10% de descuento',
    descripcion: 'Descuento en baterías de cocina marca T-fal.',
    aplica: 'Baterías de cocina T-fal.',
    noAplica: 'Otros productos T-fal fuera de baterías de cocina.',
    vigenciaDesde: '2026-10-04',
    vigenciaHasta: '2026-10-31',
    destacada: true,
  },
]

export function estaVigente(promo, hoy = new Date()) {
  const desde = new Date(`${promo.vigenciaDesde}T00:00:00`)
  const hasta = new Date(`${promo.vigenciaHasta}T23:59:59`)
  return hoy >= desde && hoy <= hasta
}

// Una promoción vencida se sigue mostrando (oscurecida) en "Promociones
// pasadas" durante este número de días después de su vigenciaHasta; pasado
// ese plazo desaparece del todo del sitio.
const DIAS_VISIBLE_DESPUES_DE_VENCER = 30

export function esPasadaVisible(promo, hoy = new Date()) {
  const hasta = new Date(`${promo.vigenciaHasta}T23:59:59`)
  if (hoy <= hasta) return false
  const limite = new Date(hasta)
  limite.setDate(limite.getDate() + DIAS_VISIBLE_DESPUES_DE_VENCER)
  return hoy <= limite
}
