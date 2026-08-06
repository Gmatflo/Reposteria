import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1]

const faqs = [
  {
    q: '¿Cuánto tarda un pedido?',
    a: 'Los productos del menú se preparan a diario y se entregan en el día. Las tortas y pedidos personalizados se encargan con 72 hs de antelación.',
  },
  {
    q: '¿Hacen envíos a domicilio?',
    a: 'Sí. Hacemos envíos el mismo día en la zona y es gratis en pedidos superiores a $50. Fuera de la zona, consultanos por WhatsApp.',
  },
  {
    q: '¿Aceptan pagos online?',
    a: 'Sí. Podés pagar de forma segura con tarjeta, débito o dinero en cuenta a través de Mercado Pago directamente desde el carrito.',
  },
  {
    q: '¿Tienen opciones sin TACC o veganas?',
    a: 'Sí. Contamos con opciones sin TACC y veganas en tortas, macarons y repostería. Indicá tu preferencia al hacer el pedido.',
  },
  {
    q: '¿Cómo encargo una torta personalizada?',
    a: 'Completá el formulario de pedidos con tu idea, fecha y contacto. Te respondemos por WhatsApp con presupuesto, diseños y disponibilidad.',
  },
  {
    q: '¿Hacen pedidos para empresas y eventos?',
    a: 'Sí. Armamos mesas dulces, boxes corporativos y entregas para eventos. Escribinos por WhatsApp y coordinamos todo.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-cream px-6 py-24 md:py-36">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-caramel">FAQ</span>
          <h2 className="mt-4 font-display text-4xl text-espresso sm:text-5xl lg:text-6xl">
            Preguntas <em className="italic text-caramel">frecuentes</em>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-caramel/40 bg-ivory' : 'border-cocoa/10 bg-ivory/60'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-xl text-espresso">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                      isOpen ? 'border-caramel text-caramel' : 'border-cocoa/15 text-mocha'
                    }`}
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-mocha">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
