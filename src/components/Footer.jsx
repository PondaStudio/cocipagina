import { REDES_SOCIALES } from '../config/sucursales.js'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-slate-500 space-y-3">
        <div className="flex justify-center gap-4">
          <a
            href={REDES_SOCIALES.facebook}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-blue transition-colors"
          >
            Facebook
          </a>
          <a
            href={REDES_SOCIALES.instagram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-blue transition-colors"
          >
            Instagram
          </a>
        </div>
        <p>© {new Date().getFullYear()} Cocimas Hogar. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
