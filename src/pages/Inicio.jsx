import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import EncuestaForm from '../components/EncuestaForm.jsx'
import PromoCarousel from '../components/PromoCarousel.jsx'
import { PROMOCIONES, estaVigente } from '../config/promociones.js'

export default function Inicio() {
  const promosActivas = PROMOCIONES.filter((p) => estaVigente(p))

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-brand-blue to-sky-600 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20 flex flex-col items-center text-center gap-5">
          <img
            src="/logococimas.png"
            alt="Cocimas Hogar"
            className="h-36 sm:h-44 w-auto object-contain drop-shadow-lg animate-[fadeIn_0.6s_ease-out]"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bienvenido a Cocimas Hogar
          </h1>
          <p className="max-w-md text-sky-50/90 text-base sm:text-lg">
            Artículos para el hogar y cocina. Elige una opción para continuar.
          </p>
          <a
            href="#encuesta"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-white text-brand-blue font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Calificar mi experiencia
          </a>
        </div>
      </section>

      <section id="encuesta" className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-16 scroll-mt-20">
        <EncuestaForm title="Encuesta de satisfacción" />
      </section>

      {promosActivas.length > 0 && (
        <section id="promociones" className="bg-white border-t border-slate-200">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-dark">Promociones</h2>
              <Link to="/promociones" className="text-sm font-semibold text-brand-blue hover:underline">
                Ver todas
              </Link>
            </div>
            <PromoCarousel promos={promosActivas} />
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
