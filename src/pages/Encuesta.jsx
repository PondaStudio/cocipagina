import EncuestaForm from '../components/EncuestaForm.jsx'

export default function Encuesta() {
  return (
    <div className="bg-slate-50 px-4 py-10 sm:py-14 min-h-[calc(100vh-6rem)]">
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">
        <EncuestaForm className="max-w-none" />
      </div>
    </div>
  )
}
