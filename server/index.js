import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MP_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN
const MP_CURRENCY = process.env.MERCADOPAGO_CURRENCY || 'ARS'
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mp: !!MP_TOKEN })
})

app.post('/api/checkout', async (req, res) => {
  try {
    const { items, buyer } = req.body || {}
    if (!items || !items.length) return res.status(400).json({ error: 'El carrito está vacío' })
    if (!MP_TOKEN) return res.status(503).json({ error: 'Mercado Pago no configurado' })

    const preference = {
      items: items.map((i) => ({
        title: i.name,
        quantity: i.qty,
        unit_price: Number(i.price),
        currency_id: MP_CURRENCY,
      })),
      payer: buyer?.email ? { email: buyer.email } : undefined,
      external_reference: `DDA-${Date.now()}`,
      back_urls: {
        success: `${SITE_URL}?pago=exito`,
        pending: `${SITE_URL}?pago=pendiente`,
        failure: `${SITE_URL}?pago=error`,
      },
      auto_return: 'approved',
      notification_url: `${SITE_URL.replace(/\/$/, '')}/api/webhook`,
    }

    const mp = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    })

    const data = await mp.json()
    if (!mp.ok) throw new Error(data.message || 'Error al crear el pago')

    res.json({ init_point: data.init_point, preference_id: data.id, external_reference: preference.external_reference })
  } catch (e) {
    console.error('checkout error:', e.message)
    res.status(500).json({ error: e.message })
  }
})

app.post('/api/webhook', (req, res) => {
  console.log('webhook:', JSON.stringify(req.body))
  res.sendStatus(200)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Delicias de Azúcar API escuchando en http://localhost:${PORT}`)
  console.log(`Mercado Pago: ${MP_TOKEN ? 'configurado' : 'NO configurado (pon MERCADOPAGO_ACCESS_TOKEN en .env)'}`)
})
