import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import {
  fetchPromociones,
  crearPromocion,
  actualizarPromocion,
  borrarPromocion,
  subirImagenPromocion,
} from '../data/promocionesApi.js'

const VACIO = {
  titulo: '',
  marca: '',
  imagen: '',
  descuento: '',
  descripcion: '',
  aplica: '',
  noAplica: '',
  vigenciaDesde: '',
  vigenciaHasta: '',
  destacada: false,
  orden: 0,
}

function PromoForm({ inicial, onGuardado, onCancelar }) {
  const [form, setForm] = useState(inicial ?? VACIO)
  const [archivo, setArchivo] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  function campo(nombre) {
    return {
      value: form[nombre] ?? '',
      onChange: (e) => setForm((f) => ({ ...f, [nombre]: e.target.value })),
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setGuardando(true)
    try {
      let imagen = form.imagen
      if (archivo) {
        imagen = await subirImagenPromocion(archivo)
      }
      const datos = { ...form, imagen }
      if (inicial?.id) {
        await actualizarPromocion(inicial.id, datos)
      } else {
        await crearPromocion(datos)
      }
      onGuardado()
    } catch (err) {
      setError(err.message ?? 'No se pudo guardar.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Título</label>
          <input required className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('titulo')} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Marca</label>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('marca')} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Descuento</label>
          <input
            placeholder="15% de descuento"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            {...campo('descuento')}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          {form.imagen && !archivo && (
            <img src={form.imagen} alt="" className="mt-2 h-16 w-16 object-contain rounded border border-slate-200" />
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Vigencia desde</label>
          <input type="date" required className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('vigenciaDesde')} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Vigencia hasta</label>
          <input type="date" required className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('vigenciaHasta')} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">Descripción</label>
        <textarea rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('descripcion')} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">Aplica a</label>
        <textarea rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('aplica')} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">No aplica a</label>
        <textarea rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2" {...campo('noAplica')} />
      </div>

      <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <input
          type="checkbox"
          checked={!!form.destacada}
          onChange={(e) => setForm((f) => ({ ...f, destacada: e.target.checked }))}
          className="h-4 w-4"
        />
        Destacada (aparece en el popup de Inicio)
      </label>

      {error && <p className="text-sm text-brand-red font-medium">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={guardando}
          className="rounded-full bg-brand-blue text-white font-semibold px-5 py-2 hover:bg-blue-600 transition-colors disabled:opacity-60"
        >
          {guardando ? 'Guardando…' : 'Guardar'}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-full border border-slate-300 text-slate-600 font-semibold px-5 py-2 hover:bg-slate-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default function AdminPromociones() {
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null)
  const [creando, setCreando] = useState(false)

  async function recargar() {
    setLoading(true)
    const data = await fetchPromociones()
    setPromociones(data)
    setLoading(false)
    setEditando(null)
    setCreando(false)
  }

  useEffect(() => {
    recargar()
  }, [])

  async function onBorrar(id) {
    if (!window.confirm('¿Borrar esta promoción?')) return
    await borrarPromocion(id)
    recargar()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">Editor de promociones</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm font-semibold text-slate-500 hover:text-brand-red"
        >
          Cerrar sesión
        </button>
      </div>

      {!creando && !editando && (
        <button
          onClick={() => setCreando(true)}
          className="mb-6 rounded-full bg-brand-blue text-white font-semibold px-5 py-2.5 hover:bg-blue-600 transition-colors"
        >
          + Nueva promoción
        </button>
      )}

      {creando && <PromoForm onGuardado={recargar} onCancelar={() => setCreando(false)} />}
      {editando && (
        <PromoForm inicial={editando} onGuardado={recargar} onCancelar={() => setEditando(null)} />
      )}

      {loading ? (
        <p className="text-slate-400 mt-6">Cargando…</p>
      ) : (
        <div className="mt-6 space-y-3">
          {promociones.map((promo) => (
            <div
              key={promo.id}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3"
            >
              {promo.imagen && (
                <img src={promo.imagen} alt="" className="h-14 w-14 rounded-lg object-contain bg-slate-50 border border-slate-100" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-brand-dark">
                  {promo.titulo}
                  {promo.destacada && (
                    <span className="ml-2 inline-block rounded-full bg-brand-yellow/20 text-yellow-800 text-xs font-bold px-2 py-0.5">
                      Destacada
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-400">
                  {promo.vigenciaDesde} → {promo.vigenciaHasta}
                </p>
              </div>
              <button
                onClick={() => {
                  setEditando(promo)
                  setCreando(false)
                }}
                className="text-sm font-semibold text-brand-blue hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onBorrar(promo.id)}
                className="text-sm font-semibold text-brand-red hover:underline"
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
