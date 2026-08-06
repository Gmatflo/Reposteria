import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT } from '../config.js'

const MAPS_QUERY = encodeURIComponent(CONTACT.address)
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`

const items = [
  {
    icon: MapPin,
    label: 'Ubicación',
    value: CONTACT.address,
    href: MAPS_URL,
  },
  { icon: Phone, label: 'Teléfono / WhatsApp', value: CONTACT.phone, href: undefined },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Clock, label: 'Horarios', value: CONTACT.hours, href: undefined },
]

export default function Contact() {
  return (
    <section id="contacto" className="bg-ivory px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.35em] text-caramel">Contacto</span>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] text-espresso sm:text-5xl lg:text-6xl">
            ¿Dónde encontrarnos?
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-mocha">
            Escribinos, visitanos o seguí nuestras novedades. Nos encanta hablar de postres.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it, i) => {
              const Wrapper = it.href ? 'a' : 'div'
              return (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="rounded-2xl bg-cream p-5 transition-colors hover:bg-latte/60"
                >
                  <Wrapper href={it.href} target={it.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    <it.icon size={20} className="text-caramel" />
                    <p className="mt-3 text-[10px] uppercase tracking-widest text-mocha">
                      {it.label}
                    </p>
                    <p className="mt-1 text-sm text-cocoa">{it.value}</p>
                  </Wrapper>
                </motion.div>
              )
            })}
          </div>
          <motion.a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-caramel transition-colors hover:text-gold"
          >
            <MapPin size={14} /> Cómo llegar
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-cocoa/10 shadow-xl">
            <iframe
              title="Mapa — Delicias de Azúcar"
              src={MAPS_EMBED}
              className="h-[420px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="absolute -bottom-4 left-6 rounded-2xl bg-espresso px-6 py-4 text-ivory shadow-xl">
            <p className="font-display text-lg">Delicias de Azúcar</p>
            <p className="text-xs text-ivory/70">{CONTACT.address}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
