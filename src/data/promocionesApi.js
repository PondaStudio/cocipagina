import { supabase } from '../lib/supabaseClient.js'

function mapRow(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    marca: row.marca,
    imagen: row.imagen_principal_url,
    descuento: row.descuento,
    descripcion: row.descripcion,
    aplica: row.aplica,
    noAplica: row.no_aplica,
    vigenciaDesde: row.vigencia_desde,
    vigenciaHasta: row.vigencia_hasta,
    destacada: row.destacada,
  }
}

export async function fetchPromociones() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .order('vigencia_desde', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}
