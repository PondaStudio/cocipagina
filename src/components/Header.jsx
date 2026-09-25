import { NavLink } from 'react-router-dom'

// Garantías, Contacto y Bolsa de trabajo quedan ocultas del menú por ahora
// (a petición del dueño) pero sus rutas siguen accesibles por URL directa.
const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/encuesta', label: 'Encuesta' },
  { to: '/promociones', label: 'Promociones' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-24">
        <NavLink to="/" className="flex items-center shrink-0">
          <img src="/logococimas.png" alt="Cocimas Hogar" className="h-20 w-auto object-contain" />
        </NavLink>

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
      </div>
    </header>
  )
}

export { LINKS }
