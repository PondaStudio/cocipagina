import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'

const ACCESOS = [
  {
    to: '/encuesta',
    title: 'Encuesta de satisfacción',
    description: 'Cuéntanos cómo fue tu experiencia de compra.',
    color: 'bg-brand-blue',
  },
  {
    to: '/promociones',
    title: 'Promociones',
    description: 'Descuentos, remates y ofertas vigentes.',
    color: 'bg-brand-red',
  },
  {
    to: '/garantias',
    title: 'Garantías y políticas',
    description: 'Todo sobre garantías y cambios.',
    color: 'bg-brand-dark',
  },
  {
    to: '/contacto',
    title: 'Contacto',
    description: 'Escríbenos directo por WhatsApp.',
    color: 'bg-green-600',
  },
  {
    to: '/trabajo',
    title: 'Bolsa de trabajo',
    description: 'Vacantes activas en nuestras sucursales.',
    color: 'bg-brand-yellow',
    textDark: true,
  },
]

export default function Inicio() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-brand-blue to-sky-600 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20 flex flex-col items-center text-center gap-5">
          <img
            src="/logococimas.png"
            alt="Cocimas Hogar"
            className="h-24 sm:h-28 w-auto object-contain drop-shadow-lg animate-[fadeIn_0.6s_ease-out]"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bienvenido a Cocimas Hogar
          </h1>
          <p className="max-w-md text-sky-50/90 text-base sm:text-lg">
            Muebles y artículos para el hogar. Elige una opción para continuar.
          </p>
          <Link
            to="/encuesta"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-brand-blue font-semibold px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Calificar mi experiencia
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACCESOS.map((acceso) => (
            <Link
              key={acceso.to}
              to={acceso.to}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <span className={`inline-block h-2 w-10 rounded-full ${acceso.color} mb-4`} />
              <h2 className="font-bold text-lg text-brand-dark group-hover:text-brand-blue transition-colors">
                {acceso.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{acceso.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
