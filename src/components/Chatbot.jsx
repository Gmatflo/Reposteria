import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { waLink, CONTACT } from '../config.js'
import { getBotReply, quickTopics } from '../shared/botBrain.js'

const EASE = [0.16, 1, 0.3, 1]

const botContext = {
  address: CONTACT.address,
  hoursText: CONTACT.hours.replace(/[·]/g, '').replace(/\s+/g, ' ').trim(),
}

function renderText(text) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line.split(/(\*[^*]+\*)/g).map((seg, j) =>
        seg.startsWith('*') && seg.endsWith('*') && seg.length > 1 ? (
          <strong key={j} className="font-semibold">
            {seg.slice(1, -1)}
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
      setMessages((m) => [...m, { from: 'bot', text: getBotReply(text, botContext) }])
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
                {quickTopics.map((q) => (
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
