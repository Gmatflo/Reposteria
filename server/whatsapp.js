import crypto from 'node:crypto'
import { getBotReply, defaultBotContext } from '../src/shared/botBrain.js'

const GRAPH_VERSION = process.env.WA_GRAPH_VERSION || 'v22.0'
const ACCESS_TOKEN = process.env.WA_ACCESS_TOKEN
const PHONE_ID = process.env.WA_PHONE_ID
const VERIFY_TOKEN = process.env.WA_VERIFY_TOKEN
const APP_SECRET = process.env.WA_APP_SECRET
const OWNER_NUMBER = process.env.WA_OWNER_NUMBER
const ORDER_TEMPLATE = process.env.WA_ORDER_TEMPLATE

const botContext = {
  ...defaultBotContext,
  currency: process.env.BUSINESS_CURRENCY || defaultBotContext.currency,
  address: process.env.BUSINESS_ADDRESS || defaultBotContext.address,
  hoursText: process.env.BUSINESS_HOURS || defaultBotContext.hoursText,
  freeDeliveryFrom: Number(process.env.BUSINESS_FREE_DELIVERY_FROM || defaultBotContext.freeDeliveryFrom),
}

export const waConfigured = () => Boolean(ACCESS_TOKEN && PHONE_ID && VERIFY_TOKEN)

export function verifyWebhook(query) {
  const mode = query['hub.mode']
  const token = query['hub.verify_token']
  const challenge = query['hub.challenge']
  if (mode === 'subscribe' && token === VERIFY_TOKEN) return challenge
  return null
}

export function isValidSignature(rawBody, signatureHeader) {
  if (!APP_SECRET || !signatureHeader) return !APP_SECRET
  const expected = 'sha256=' + crypto.createHmac('sha256', APP_SECRET).update(rawBody).digest('hex')
  try {
    const a = Buffer.from(expected)
    const b = Buffer.from(signatureHeader)
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
  } catch {
    return false
  }
}

async function sendText(to, text) {
  if (!ACCESS_TOKEN || !PHONE_ID) {
    console.warn('WhatsApp no configurado: faltan WA_ACCESS_TOKEN / WA_PHONE_ID')
    return { ok: false }
  }
  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { preview_url: false, body: text },
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) console.warn('wa send error:', JSON.stringify(data))
  return { ok: res.ok, data }
}

async function sendTemplate(to, templateName, params) {
  if (!ACCESS_TOKEN || !PHONE_ID) return { ok: false }
  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PHONE_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'es' },
        components: [{ type: 'body', parameters: params.map((v) => ({ type: 'text', text: String(v) })) }],
      },
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) console.warn('wa template error:', JSON.stringify(data))
  return { ok: res.ok, data }
}

const lastReplyAt = new Map()

export async function handleIncoming(body) {
  const entries = body?.entry || []
  for (const entry of entries) {
    for (const change of entry?.changes || []) {
      for (const msg of change?.value?.messages || []) {
        if (msg.type !== 'text') continue
        const from = msg.from
        const text = (msg.text?.body || '').trim()
        if (!text) continue

        const now = Date.now()
        const last = lastReplyAt.get(from) || 0
        if (now - last < 2000) continue
        lastReplyAt.set(from, now)

        const reply = getBotReply(text, botContext)
        await sendText(from, reply)
      }
    }
  }
}

export async function notifyOwnerPaidOrder(order) {
  if (!OWNER_NUMBER) return
  const lines = (order.items || []).map((i) => `${i.qty} × ${i.name}`).join('\n')
  const total = `${botContext.currency}${order.total}`
  try {
    if (ORDER_TEMPLATE) {
      await sendTemplate(OWNER_NUMBER, ORDER_TEMPLATE, [order.id, lines, total])
    } else {
      await sendText(OWNER_NUMBER, `✅ *Nuevo pago recibido*\n\nPedido: ${order.id}\n${lines}\n\nTotal: ${total}`)
      console.warn('Aviso al dueño enviado como texto (para mensajes proactivos Meta exige template, ver README).')
    }
  } catch (e) {
    console.error('notifyOwner error:', e.message)
  }
}

export { sendText }
