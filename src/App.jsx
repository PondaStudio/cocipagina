import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Encuesta from './pages/Encuesta.jsx'
import Promociones from './pages/Promociones.jsx'
import PromocionDetalle from './pages/PromocionDetalle.jsx'
import Garantias from './pages/Garantias.jsx'
import Contacto from './pages/Contacto.jsx'
import Trabajo from './pages/Trabajo.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/encuesta" element={<Encuesta />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/promociones/:id" element={<PromocionDetalle />} />
        <Route path="/garantias" element={<Garantias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/trabajo" element={<Trabajo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
