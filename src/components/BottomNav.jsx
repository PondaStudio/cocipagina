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
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3">
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold transition-all ${
                isActive ? 'text-brand-blue' : 'text-slate-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-base leading-none transition-transform ${isActive ? 'scale-110' : ''}`}
                >
                  {item.icon}
                </span>
                <span className="leading-none">{item.label}</span>
                <span
                  className={`mt-1 h-1 w-1 rounded-full bg-brand-blue transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
