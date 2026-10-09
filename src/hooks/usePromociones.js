import { useEffect, useState } from 'react'
import { fetchPromociones } from '../data/promocionesApi.js'

export function usePromociones() {
  const [promociones, setPromociones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    fetchPromociones()
      .then((data) => {
        if (activo) setPromociones(data)
      })
      .catch((err) => {
        if (activo) setError(err)
      })
      .finally(() => {
        if (activo) setLoading(false)
      })
    return () => {
      activo = false
    }
  }, [])

  return { promociones, loading, error }
}
