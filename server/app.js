import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { readOrders, writeOrders, ordersSource } from './storage.js'
import { verifyWebhook, isValidSignature, handleIncoming, notifyOwnerPaidOrder, waConfigured } from './whatsapp.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MP_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN
const MP_CURRENCY = process.env.MERCADOPAGO_CURRENCY || 'ARS'
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173'
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'cambiar-admin-token'
const NOTIFY_WEBHOOK_URL = process.env.NOTIFY_WEBHOOK_URL

const notify = async (order) => {
  if (!NOTIFY_WEBHOOK_URL) return
  try {
    await fetch(NOTIFY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'order.paid',
        order,
        sent_at: new Date().toISOString(),
      }),
    })
  } catch (e) {
    console.error('notify error:', e.message)
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mp: !!MP_TOKEN, wa: waConfigured() })
})

app.get('/api/orders', async (req, res) => {
  const token = (req.headers.authorization || '').replace(/^Bearer /i, '')
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'No autorizado' })
  res.json(await readOrders())
})

app.post('/api/checkout', async (req, res) => {
  try {
    const { items, buyer } = req.body || {}
    if (!items || !items.length) return res.status(400).json({ error: 'El carrito está vacío' })
    if (!MP_TOKEN) return res.status(503).json({ error: 'Mercado Pago no configurado' })

    const external_reference = `DDA-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const preference = {
      items: items.map((i) => ({
        title: i.name,
        quantity: i.qty,
        unit_price: Number(i.price),
        currency_id: MP_CURRENCY,
      })),
      payer: buyer?.email ? { email: buyer.email } : undefined,
      external_reference,
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

    const orders = await readOrders()
    orders.unshift({
      id: external_reference,
      external_reference,
      preference_id: data.id,
      items,
      buyer: buyer || {},
      total: items.reduce((s, i) => s + i.qty * i.price, 0),
      status: 'pending',
      createdAt: new Date().toISOString(),
    })
    await writeOrders(orders)

    res.json({ init_point: data.init_point, preference_id: data.id, external_reference })
  } catch (e) {
    console.error('checkout error:', e.message)
    res.status(500).json({ error: e.message })
  }
})

app.post('/api/webhook', async (req, res) => {
  console.log('webhook:', JSON.stringify(req.body))
  const body = req.body || {}
  const ref = body.external_reference || body?.data?.external_reference
  const paymentId = body?.data?.id || body?.id
  const orders = await readOrders()
  const order = ref && orders.find((o) => o.external_reference === ref)

  if (order) {
    order.status = 'paid'
    order.payment_id = paymentId
    order.paidAt = new Date().toISOString()
    await writeOrders(orders)
    console.log(`Pedido ${order.id} marcado como PAGADO`)
    notify(order).catch(() => {})
    notifyOwnerPaidOrder(order).catch(() => {})
  } else {
    console.log(`webhook sin pedido local (ref=${ref}, payment=${paymentId})`)
  }

  res.sendStatus(200)
})

app.get('/api/wa/webhook', (req, res) => {
  const challenge = verifyWebhook(req.query)
  if (challenge !== null) return res.send(challenge)
  res.status(403).send('Token de verificación inválido')
})

app.post('/api/wa/webhook', async (req, res) => {
  if (!isValidSignature(JSON.stringify(req.body), req.get('x-hub-signature-256'))) {
    return res.status(403).send('Firma inválida')
  }
  try {
    await handleIncoming(req.body)
  } catch (e) {
    console.error('wa handler error:', e.message)
  }
  res.sendStatus(200)
})

export { app, MP_TOKEN, ordersSource }
