import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN
const KV_KEY = process.env.KV_ORDERS_KEY || 'dda:orders'

try {
  fs.mkdirSync(DATA_DIR, { recursive: true })
} catch {
  /* read-only FS: KV debe estar configurado */
}

const usingKV = () => Boolean(KV_URL && KV_TOKEN)

async function kvGet() {
  try {
    const res = await fetch(`${KV_URL.replace(/\/$/, '')}/get/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    })
    const data = await res.json().catch(() => ({}))
    const raw = data?.result
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('KV get error:', e.message)
    return []
  }
}

async function kvSet(orders) {
  try {
    await fetch(`${KV_URL.replace(/\/$/, '')}/set/${KV_KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(JSON.stringify(orders)),
    })
  } catch (e) {
    console.error('KV set error:', e.message)
  }
}

export async function readOrders() {
  if (usingKV()) return kvGet()
  try {
    const parsed = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function writeOrders(orders) {
  if (usingKV()) return kvSet(orders)
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
}

export const ordersSource = () => (usingKV() ? `Vercel KV (${KV_URL})` : ORDERS_FILE)
