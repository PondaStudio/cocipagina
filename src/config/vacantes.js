// TODO(dueño): actualizar con vacantes reales. El "contacto" recibe el
// mensaje directo (no la tienda) — puede ser whatsapp (formato wa.me) o email.
export const VACANTES = [
  {
    puesto: 'Vendedor(a) de piso',
    sucursal: 'Javier Mina 453-B',
    salario: '$7,500 – $9,500 MXN/mes + comisiones',
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
    salario: '$10,000 – $13,000 MXN/mes',
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
    salario: '$7,000 – $8,000 MXN/mes',
    requisitos: [
      'Disponibilidad de tiempo completo',
      'Capacidad de carga y trabajo físico',
      'Puntualidad',
    ],
    contacto: { tipo: 'email', valor: 'rh@cocimashogargdl.com.mx' },
  },
]
