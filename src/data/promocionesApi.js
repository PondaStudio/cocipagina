import { supabase } from '../lib/supabaseClient.js'

function mapRow(row) {
  return {
    id: row.id,
    titulo: row.titulo,
    marca: row.marca,
    imagen: row.imagen_path,
    descuento: row.descuento,
    descripcion: row.descripcion,
    aplica: row.aplica,
    noAplica: row.no_aplica,
    vigenciaDesde: row.vigencia_desde,
    vigenciaHasta: row.vigencia_hasta,
    destacada: row.destacada,
    orden: row.orden,
  }
}

export async function fetchPromociones() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('promociones')
    .select('*')
    .order('orden', { ascending: true })
    .order('vigencia_desde', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

export async function crearPromocion(promo) {
  const { data, error } = await supabase
    .from('promociones')
    .insert({
      titulo: promo.titulo,
      marca: promo.marca,
      imagen_path: promo.imagen,
      descuento: promo.descuento,
      descripcion: promo.descripcion,
      aplica: promo.aplica,
      no_aplica: promo.noAplica,
      vigencia_desde: promo.vigenciaDesde,
      vigencia_hasta: promo.vigenciaHasta,
      destacada: promo.destacada ?? false,
      orden: promo.orden ?? 0,
    })
    .select()
    .single()
  if (error) throw error
  return mapRow(data)
}

export async function actualizarPromocion(id, promo) {
  const { data, error } = await supabase
    .from('promociones')
    .update({
      titulo: promo.titulo,
      marca: promo.marca,
      imagen_path: promo.imagen,
      descuento: promo.descuento,
      descripcion: promo.descripcion,
      aplica: promo.aplica,
      no_aplica: promo.noAplica,
      vigencia_desde: promo.vigenciaDesde,
      vigencia_hasta: promo.vigenciaHasta,
      destacada: promo.destacada ?? false,
      orden: promo.orden ?? 0,
    })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return mapRow(data)
}

export async function borrarPromocion(id) {
  const { error } = await supabase.from('promociones').delete().eq('id', id)
  if (error) throw error
}

export async function subirImagenPromocion(file) {
  const ext = file.name.split('.').pop()
  const nombre = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('promos').upload(nombre, file)
  if (error) throw error
  const { data } = supabase.storage.from('promos').getPublicUrl(nombre)
  return data.publicUrl
}
