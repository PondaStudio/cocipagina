import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/encuesta', label: 'Encuesta' },
  { to: '/promociones', label: 'Promociones' },
  { to: '/garantias', label: 'Garantías' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/trabajo', label: 'Bolsa de trabajo' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logococimas.png" alt="Cocimas Hogar" className="h-10 w-auto object-contain" />
          <span className="font-bold text-lg text-brand-dark hidden sm:inline">Cocimas Hogar</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-blue text-white'
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
