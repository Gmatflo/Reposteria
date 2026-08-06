import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, Loader2, Lock, Minus, MessageCircle, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { API_URL, waLink } from '../config.js'

const EASE = [0.16, 1, 0.3, 1]

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, subtotal, count, clear } = useCart()
  const { push } = useToast()
  const [paying, setPaying] = useState(false)

  const orderLines = () =>
    items.map((i) => `• ${i.qty} × ${i.name} — $${i.price * i.qty}`).join('\n')

  const checkoutMP = async () => {
    if (!items.length || paying) return
    setPaying(true)
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })) }),
      })
      const data = await res.json().catch(() => ({}))
      if (data?.init_point) {
        window.open(data.init_point, '_blank', 'noopener,noreferrer')
        push('Abriendo pago seguro de Mercado Pago…')
      } else {
        throw new Error(data?.error || 'Error de pago')
      }
    } catch {
      const msg = `Hola Delicias de Azúcar! Quiero pagar este pedido online:\n\n${orderLines()}\n\nTotal: $${subtotal}`
      window.open(waLink(msg), '_blank', 'noopener,noreferrer')
      push('No se pudo conectar al pago: te pasamos el link por WhatsApp')
    } finally {
      setPaying(false)
    }
  }

  const checkoutWA = () => {
    const msg = `Hola Delicias de Azúcar! 🌟 Quiero hacer este pedido:\n\n${orderLines()}\n\nTotal: $${subtotal}`
    window.open(waLink(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-espresso/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: EASE }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-caramel" />
                <h3 className="font-display text-2xl text-espresso">Tu pedido</h3>
                {count > 0 && (
                  <span className="rounded-full bg-caramel px-2 py-0.5 text-xs text-ivory">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar carrito"
                className="rounded-full border border-cocoa/10 p-2 transition-colors hover:border-caramel"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag size={42} className="text-latte" />
                  <p className="text-mocha">Tu carrito está vacío</p>
                  <a
                    href="#menu"
                    onClick={() => setOpen(false)}
                    className="text-sm text-caramel underline underline-offset-4"
                  >
                    Ver el menú
                  </a>
                </div>
              ) : (
                <ul className="space-y-5">
                  <AnimatePresence initial={false}>
                    {items.map((i) => (
                      <motion.li
                        key={i.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        className="flex gap-4"
                      >
                        <div className="img-blend h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                          <img src={i.image} alt={i.name} className="img-tint h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <h4 className="font-display text-lg text-espresso">{i.name}</h4>
                            <button
                              onClick={() => removeItem(i.id)}
                              aria-label="Quitar del carrito"
                              className="text-mocha transition-colors hover:text-caramel"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <p className="text-sm text-caramel">
                            ${i.price} {i.price > 0 ? 'c/u' : '(a cotizar)'}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-cocoa/15 px-3 py-1">
                              <button
                                onClick={() => updateQty(i.id, i.qty - 1)}
                                aria-label="Restar"
                                className="text-mocha transition-colors hover:text-espresso"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-5 text-center text-sm font-medium">{i.qty}</span>
                              <button
                                onClick={() => updateQty(i.id, i.qty + 1)}
                                aria-label="Sumar"
                                className="text-mocha transition-colors hover:text-espresso"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <p className="font-display text-lg text-espresso">
                              {i.price > 0 ? `$${i.price * i.qty}` : 'A medida'}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-cocoa/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-widest text-mocha">Total</p>
                  <p className="font-display text-3xl text-espresso">${subtotal}</p>
                </div>

                <button
                  onClick={checkoutMP}
                  disabled={paying}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-caramel disabled:opacity-60"
                >
                  {paying ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Procesando…
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} /> Pagar con Mercado Pago
                    </>
                  )}
                </button>

                <button
                  onClick={checkoutWA}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-cocoa/15 py-3.5 text-xs uppercase tracking-[0.2em] text-cocoa transition-colors hover:border-caramel hover:text-caramel"
                >
                  <MessageCircle size={15} /> Pedir por WhatsApp
                </button>

                <div className="flex items-center justify-center gap-4 pt-1 text-[10px] uppercase tracking-widest text-mocha">
                  <span className="flex items-center gap-1.5">
                    <Lock size={11} className="text-caramel" /> Pago 100% seguro
                  </span>
                  <span>·</span>
                  <span>Envío gratis +$50</span>
                </div>

                <button
                  onClick={clear}
                  className="w-full text-center text-[10px] uppercase tracking-widest text-mocha transition-colors hover:text-caramel"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
