import { app, MP_TOKEN, ordersSource } from './app.js'
import { waConfigured } from './whatsapp.js'

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Delicias de Azúcar API escuchando en http://localhost:${PORT}`)
  console.log(`Mercado Pago: ${MP_TOKEN ? 'configurado' : 'NO configurado (pon MERCADOPAGO_ACCESS_TOKEN en .env)'}`)
  console.log(`WhatsApp Cloud API: ${waConfigured() ? 'configurado' : 'NO configurado (ver README)'}`)
  console.log(`Pedidos guardados en: ${ordersSource()}`)
})
