import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { waLink } from '../config.js'
import { products } from '../data/products.js'

const EASE = [0.16, 1, 0.3, 1]

const quickReplies = ['Precios 🍰', 'Horarios ⏰', 'Envíos 🛵', 'Hacer un pedido 📝', 'Ubicación 📍']

const priceLine = products
  .slice(0, 4)
  .map((p) => `• ${p.name}: $${p.price}`)
  .join('\n')

function getReply(raw) {
  const t = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (/hola|buen(a|o|as|os)|hey|hi |hello|que tal|saludos|que onda/.test(t))
    return '¡Hola! 🍰 Soy el bot de *Delicias de Azúcar*. ¿En qué te ayudo? Podés preguntarme por precios, horarios, envíos o pedidos.'
  if (/precio|cuanto|costo|tarifa|cu[aá]nto vale|menu|men[uú]/.test(t))
    return `Estos son algunos precios de referencia:\n${priceLine}\n\nPodés ver el menú completo en la sección "Menú" o agregar al carrito. 🛒`
  if (/horario|abre|cierra|atend|cuando funcion/.test(t))
    return 'Atendemos de *Lun a Sáb de 9 a 20 h* y Domingos de 10 a 18 h. 🕘'
  if (/env[ií]o|delivery|entrega|domicilio|reparto/.test(t))
    return 'Hacemos envíos el mismo día en la zona 📦. El envío es *gratis en pedidos de +$50*. Fuera de la zona, consultanos por WhatsApp.'
  if (/vegan|vegano|gluten|tacc|vegetarian|sin lactosa/.test(t))
    return '¡Sí! Tenemos opciones *sin TACC* y *veganas* en tortas y macarons. Contanos tu pedido y lo preparamos. 🌱'
  if (/macaron/.test(t))
    return 'Nuestros macarons son 100% artesanales: vainilla, chocolate, pistacho y frutos rojos. Caja de 6 por *$18*. 😋'
  if (/torta|cumple|pastel|cake|mesa dulce/.test(t))
    return '¡Nos encanta hacer tortas de cumpleaños y mesas dulces! 🎂 Se encargan con *72 hs de antelación*. Completá el formulario de pedidos o escribinos por WhatsApp.'
  if (/pago|pagas|mercado|efectivo|tarjeta|transferencia/.test(t))
    return 'Aceptamos *efectivo, transferencia y Mercado Pago*. 💳 Coordinamos el pago por WhatsApp.'
  if (/pedir|pedido|orden|comprar|carrito|encargar|reservar/.test(t))
    return 'Es súper fácil: agregá productos al *carrito* 🛒 y al finalizar elegí "Pedir por WhatsApp". También tenés un formulario de pedidos personalizados en la sección "Pedidos". 📝'
  if (/ubicaci|direcci|donde estan|local|hasta donde/.test(t))
    return 'Nos encontrás en *Av. Corrientes 1234, Buenos Aires*. 🗺️'
  if (/gracias|thank|genial|excelente|buenisimo|buen[ií]simo/.test(t))
    return '¡A vos por escribirnos! 🧡 Si querés, te ayudo a hacer un pedido.'
  if (/chau|adios|hasta luego|bye|nos vemos/.test(t))
    return '¡Hasta pronto! 👋 Que tengas un día muy dulce.'
  if (/persona|humano|whatsapp|atencion real|hablar con/.test(t))
    return '¡Claro! Te dejo el WhatsApp para que te atienda una persona. 🧡'
  return '¡Muy buena pregunta! 😅 Soy un bot nuevo y todavía aprendo. Probá preguntar por *precios*, *horarios*, *envíos* o *pedidos*. También podés escribirnos por WhatsApp.'
}

function renderText(text) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
        seg.startsWith('**') ? (
          <strong key={j} className="font-semibold">
            {seg.slice(2, -2)}
          </strong>
        ) : (
          seg
        ),
      )}
    </span>
  ))
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! 👋 Soy *Delicias Bot*. ¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (raw) => {
    const text = (raw ?? input).trim()
    if (!text || typing) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text }])
    setTyping(true)
    const delay = 650 + Math.min(1400, text.length * 40)
    setTimeout(() => {
      const wantsHuman = /persona|humano|whatsapp|atencion real/.test(text)
      setMessages((m) => [...m, { from: 'bot', text: getReply(text) }])
      setTyping(false)
      if (wantsHuman) {
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            { from: 'bot', text: `👉 Abrí nuestro WhatsApp: ${waLink('Hola! Necesito ayuda con un pedido. 😊')}` },
          ])
        }, 600)
      }
    }, delay)
  }

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: EASE }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-caramel shadow-xl transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-caramel/20" style={{ animationIterationCount: 'infinite' }} />
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-24 right-5 z-30 flex h-[520px] max-h-[72vh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl bg-ivory shadow-2xl"
          >
            <div className="flex items-center gap-3 bg-espresso px-5 py-4">
              <div className="relative">
                <Logo size={38} className="text-caramel" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-espresso bg-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight text-ivory">Delicias Bot</p>
                <p className="text-[10px] uppercase tracking-widest text-ivory/50">en línea · responde al instante</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-espresso text-ivory'
                        : 'rounded-bl-md bg-cream text-cocoa'
                    }`}
                  >
                    {renderText(m.text)}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-cream px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-mocha/70"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-cocoa/10 px-4 pt-3">
              <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none]">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={typing}
                    className="whitespace-nowrap rounded-full border border-cocoa/15 px-3.5 py-1.5 text-xs text-cocoa/70 transition-colors hover:border-caramel hover:text-caramel"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send()
                }}
                className="flex items-center gap-2 pb-4"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribí tu consulta…"
                  className="flex-1 rounded-full border border-cocoa/15 bg-cream px-4 py-3 text-sm outline-none transition-colors placeholder:text-mocha/60 focus:border-caramel"
                />
                <button
                  type="submit"
                  aria-label="Enviar mensaje"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-caramel transition-colors hover:bg-caramel hover:text-espresso"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
