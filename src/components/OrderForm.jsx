import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { waLink } from '../config.js'

const EASE = [0.16, 1, 0.3, 1]

const empty = { nombre: '', telefono: '', tipo: 'Torta de cumpleaños', fecha: '', mensaje: '' }

export default function OrderForm() {
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const msg = `Hola Delicias de Azúcar! 🎂 Quiero encargar:\n\n• Pedido: ${form.tipo}\n• Para: ${form.nombre}\n• Teléfono: ${form.telefono}\n• Fecha: ${form.fecha}\n• Detalle: ${form.mensaje || '—'}`
    window.open(waLink(msg), '_blank', 'noopener,noreferrer')
    setSent(true)
    setTimeout(() => setSent(false), 6000)
  }

  const input =
    'w-full rounded-2xl border border-cocoa/15 bg-ivory px-5 py-3.5 text-sm outline-none transition-colors placeholder:text-mocha/60 focus:border-caramel'

  return (
    <section id="pedidos" className="bg-cream px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.35em] text-caramel">Pedidos</span>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
            Encargá tu próxima <em className="italic text-caramel">celebración.</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-mocha">
            Tortas de cumpleaños, mesas dulces, cupcakes personalizados o lo que sueñes. Completá el
            formulario y te respondemos por WhatsApp con presupuesto y disponibilidad.
          </p>
          <div className="mt-8 space-y-3 text-sm text-cocoa/80">
            <p className="flex items-center gap-3">
              <span className="text-caramel">✦</span> Pedidos con 72 hs de antelación
            </p>
            <p className="flex items-center gap-3">
              <span className="text-caramel">✦</span> Opciones sin TACC y veganas disponibles
            </p>
            <p className="flex items-center gap-3">
              <span className="text-caramel">✦</span> Envíos el mismo día en la zona
            </p>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl bg-ivory p-7 shadow-xl sm:p-9"
        >
          <input required value={form.nombre} onChange={set('nombre')} placeholder="Tu nombre" className={input} />
          <input required value={form.telefono} onChange={set('telefono')} placeholder="Tu WhatsApp (ej: 51936028001)" className={input} />
          <select value={form.tipo} onChange={set('tipo')} className={input}>
            {['Torta de cumpleaños', 'Cupcakes personalizados', 'Macarons', 'Mesa dulce', 'Box de postres', 'Otro'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <input type="date" value={form.fecha} onChange={set('fecha')} className={input} />
          <textarea
            value={form.mensaje}
            onChange={set('mensaje')}
            rows={3}
            placeholder="Contanos tu idea… (relleno, sabor, cantidades)"
            className={`${input} resize-none`}
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-4 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-caramel"
          >
            {sent ? (
              <>
                <CheckCircle2 size={16} /> Pedido enviado
              </>
            ) : (
              <>
                <Send size={15} /> Enviar por WhatsApp
              </>
            )}
          </button>
          {sent && (
            <p className="text-center text-xs text-mocha">
              Se abrió WhatsApp con tu pedido. Si no se abrió, escribinos al contacto de abajo. ✨
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
