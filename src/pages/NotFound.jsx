import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-4xl font-extrabold text-brand-dark">404</h1>
      <p className="text-slate-500 mt-2 mb-6">No encontramos esta página.</p>
      <Link to="/" className="text-brand-blue font-semibold hover:underline">
        Volver al inicio
      </Link>
    </div>
  )
}
