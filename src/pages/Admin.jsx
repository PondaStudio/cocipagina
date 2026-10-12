import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../lib/supabaseClient.js'
import AdminPromociones from '../components/AdminPromociones.jsx'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setEnviando(false)
    if (authError) setError('Usuario o contraseña incorrectos.')
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-brand-dark text-center mb-6">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Usuario</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>
        {error && <p className="text-sm text-brand-red font-medium">{error}</p>}
        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-brand-blue text-white font-semibold py-2.5 hover:bg-blue-600 transition-colors disabled:opacity-60"
        >
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const { session, loading } = useAuth()

  if (!supabase) {
    return (
      <p className="mx-auto max-w-md px-4 py-16 text-center text-slate-500">
        El login no está configurado todavía en este sitio.
      </p>
    )
  }

  if (loading) {
    return <p className="mx-auto max-w-md px-4 py-16 text-center text-slate-400">Cargando…</p>
  }

  if (!session) {
    return <LoginForm />
  }

  return <AdminPromociones />
}
