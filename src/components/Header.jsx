import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Garantías queda oculta del menú por ahora (a petición del dueño) pero su
// ruta sigue accesible por URL directa.
const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/encuesta', label: 'Encuesta' },
  { to: '/promociones', label: 'Promociones' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/trabajo', label: 'Bolsa de trabajo' },
]

export default function Header() {
  const { session } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-24">
        <NavLink to="/" className="flex items-center shrink-0">
          <img src="/logococimas.png" alt="Cocimas Hogar" className="h-20 w-auto object-contain" />
        </NavLink>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-sm shadow-brand-blue/30'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-brand-blue'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/admin"
            aria-label={session ? 'Editor de promociones' : 'Iniciar sesión'}
            className={({ isActive }) =>
              `flex items-center justify-center h-10 w-10 rounded-full border transition-all ${
                isActive || session
                  ? 'bg-brand-blue text-white border-brand-blue'
                  : 'text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-brand-blue'
              }`
            }
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
            </svg>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export { LINKS }
