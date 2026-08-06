export const WHATSAPP_NUMBER = '5491122334455'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const CONTACT = {
  whatsapp: WHATSAPP_NUMBER,
  phone: '+54 11 2233-4455',
  email: 'hola@deliciasdeazucar.com',
  address: 'Av. Corrientes 1234, Buenos Aires',
  hours: 'Lun a Sáb · 9:00 — 20:00 · Dom 10:00 — 18:00',
}

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
