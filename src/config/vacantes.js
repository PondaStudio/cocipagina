// TODO(dueño): actualizar con vacantes reales. El "contacto" recibe el
// mensaje directo (no la tienda) — puede ser whatsapp (formato wa.me) o email.
export const VACANTES = [
  {
    puesto: 'Vendedor(a) de piso',
    sucursal: 'Javier Mina 453-B',
    requisitos: [
      'Disponibilidad de tiempo completo',
      'Experiencia en ventas (deseable, no indispensable)',
      'Buena actitud de servicio',
    ],
    contacto: { tipo: 'whatsapp', valor: '523300000000' },
  },
  {
    puesto: 'Encargado(a) de sucursal',
    sucursal: 'Leona Vicario 168',
    requisitos: [
      'Experiencia previa en manejo de personal',
      'Disponibilidad de horario',
      'Responsabilidad y honestidad comprobable',
    ],
    contacto: { tipo: 'whatsapp', valor: '523300000000' },
  },
  {
    puesto: 'Auxiliar de almacén',
    sucursal: 'Juan Díaz Covarrubias 265',
    requisitos: [
      'Disponibilidad de tiempo completo',
      'Capacidad de carga y trabajo físico',
      'Puntualidad',
    ],
    contacto: { tipo: 'email', valor: 'rh@cocimashogargdl.com.mx' },
  },
]
