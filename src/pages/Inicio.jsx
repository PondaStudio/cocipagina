import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import EncuestaForm from '../components/EncuestaForm.jsx'
import PromoCarousel from '../components/PromoCarousel.jsx'
import { PROMOCIONES, estaVigente } from '../config/promociones.js'

export default function Inicio() {
  const promosActivas = PROMOCIONES.filter((p) => estaVigente(p))

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-brand-blue to-blue-700 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-brand-yellow/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        />

        <div className="relative mx-auto max-w-5xl px-4 pt-14 pb-24 sm:pt-20 sm:pb-32 flex flex-col items-center text-center gap-5">
          <div className="rounded-3xl bg-white/95 p-4 shadow-2xl shadow-black/20 animate-[fadeIn_0.6s_ease-out]">
            <img
              src="/logococimas.png"
              alt="Cocimas Hogar"
              className="h-28 sm:h-36 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            Bienvenido a Cocimas Hogar
          </h1>
          <p className="max-w-md text-sky-50 text-base sm:text-lg">
            Artículos para el hogar y cocina. Elige una opción para continuar.
          </p>
          <a
            href="#encuesta"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-blue font-bold text-lg px-8 py-4 shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all"
          >
            Calificar mi experiencia
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full text-slate-50"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,48 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      <section id="encuesta" className="bg-slate-50 px-4 py-14 sm:py-16 scroll-mt-20">
        <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">
          <EncuestaForm title="Encuesta de satisfacción" className="max-w-none" />
        </div>
      </section>

      {promosActivas.length > 0 && (
        <section id="promociones" className="bg-white border-t border-slate-200">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:py-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-dark">Promociones</h2>
              <Link to="/promociones" className="text-sm font-semibold text-brand-blue hover:underline">
                Ver todas →
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
