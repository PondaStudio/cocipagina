// TODO(dueño): reemplazar nombres, whatsapp, direcciones y horarios con los
// datos reales de cada sucursal (los números de whatsapp aquí son
// placeholders). mapsReviewUrl ya usa el link real de reseñas de Google;
// si cada sucursal tiene su propia ficha de Google Maps, reemplázalo por
// sucursal.
export const SUCURSALES = [
  {
    codigo: 'JM437',
    nombre: 'Javier Mina 443',
    direccion: 'Javier Mina 443, Guadalajara, Jal.',
    horario: 'Lun a Sáb 10:00–20:00, Dom 11:00–17:00',
    mapsReviewUrl: 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8',
    facturacionTelefono: '3334718271',
    vendedoras: [
      { nombre: 'Vendedora ejemplo 1', whatsapp: '523300000001' },
      { nombre: 'Vendedora ejemplo 2', whatsapp: '523300000002' },
    ],
  },
  {
    codigo: 'JM453B',
    nombre: 'Javier Mina 453-B',
    direccion: 'Javier Mina 453-B, Guadalajara, Jal.',
    horario: 'Lun a Sáb 10:00–20:00, Dom 11:00–17:00',
    mapsReviewUrl: 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8',
    facturacionTelefono: '3334718271',
    vendedoras: [
      { nombre: 'Vendedora ejemplo 1', whatsapp: '523300000003' },
      { nombre: 'Vendedora ejemplo 2', whatsapp: '523300000004' },
    ],
  },
  {
    codigo: 'JM511',
    nombre: 'Javier Mina 511-A',
    direccion: 'Javier Mina 511-A, Guadalajara, Jal.',
    horario: 'Lun a Sáb 10:00–20:00, Dom 11:00–17:00',
    mapsReviewUrl: 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8',
    facturacionTelefono: '3334718271',
    vendedoras: [
      { nombre: 'Vendedora ejemplo 1', whatsapp: '523300000005' },
    ],
  },
  {
    codigo: 'LV168',
    nombre: 'Leona Vicario 168',
    direccion: 'Leona Vicario 168, Guadalajara, Jal.',
    horario: 'Lun a Sáb 10:00–20:00, Dom 11:00–17:00',
    mapsReviewUrl: 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8',
    facturacionTelefono: '3331774615',
    vendedoras: [
      { nombre: 'Vendedora ejemplo 1', whatsapp: '523300000006' },
      { nombre: 'Vendedora ejemplo 2', whatsapp: '523300000007' },
    ],
  },
  {
    codigo: 'LV167',
    nombre: 'Leona Vicario 147',
    direccion: 'Leona Vicario 147, Guadalajara, Jal.',
    horario: 'Lun a Sáb 10:00–20:00, Dom 11:00–17:00',
    mapsReviewUrl: 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8',
    facturacionTelefono: '3331774615',
    vendedoras: [
      { nombre: 'Vendedora ejemplo 1', whatsapp: '523300000008' },
    ],
  },
  {
    codigo: 'JDC265',
    nombre: 'Juan Díaz Covarrubias 265',
    direccion: 'Juan Díaz Covarrubias 265, Guadalajara, Jal.',
    horario: 'Lun a Sáb 10:00–20:00, Dom 11:00–17:00',
    mapsReviewUrl: 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8',
    facturacionTelefono: '3334718271',
    vendedoras: [
      { nombre: 'Vendedora ejemplo 1', whatsapp: '523300000009' },
    ],
  },
]

export const REDES_SOCIALES = {
  facebook: 'https://www.facebook.com/profile.php?id=61581038925331',
  instagram: 'https://www.instagram.com/cocimashogargdl/',
}

export const GOOGLE_REVIEW_DEFAULT_URL = 'https://maps.app.goo.gl/SqYHG9izt7v41yFY8'
