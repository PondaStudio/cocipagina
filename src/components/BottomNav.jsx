import { NavLink } from 'react-router-dom'

// Garantías, Contacto y Bolsa de trabajo quedan ocultas del menú por ahora
// (a petición del dueño) pero sus rutas siguen accesibles por URL directa.
const ITEMS = [
  { to: '/', label: 'Inicio', end: true, icon: '🏠' },
  { to: '/encuesta', label: 'Encuesta', icon: '⭐' },
  { to: '/promociones', label: 'Promos', icon: '🏷️' },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                isActive ? 'text-brand-blue' : 'text-slate-500'
              }`
            }
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span className="leading-none">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
