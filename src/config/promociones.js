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
