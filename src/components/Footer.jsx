import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Logo from './Logo.jsx'
import { CONTACT } from '../config.js'

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export default function Footer({ onLegal }) {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      const list = JSON.parse(localStorage.getItem('dda-newsletter')) || []
      list.push({ email: email.trim(), date: new Date().toISOString() })
      localStorage.setItem('dda-newsletter', JSON.stringify(list))
      setOk(true)
      setEmail('')
    } catch {
      /* ignore */
    }
  }

  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo size={34} className="text-caramel" />
              <span className="font-display text-2xl">Delicias de Azúcar</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              Postres artesanales hechos con amor. Cada bocado, una pequeña celebración.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full border border-ivory/20 p-2.5 transition-colors hover:border-caramel hover:text-caramel">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="X (Twitter)" className="rounded-full border border-ivory/20 p-2.5 transition-colors hover:border-caramel hover:text-caramel">
                <XIcon />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full border border-ivory/20 p-2.5 transition-colors hover:border-caramel hover:text-caramel">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-20">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-caramel">Navegación</p>
              <ul className="space-y-2.5 text-sm text-ivory/70">
                <li><a href="#inicio" className="transition-colors hover:text-caramel">Inicio</a></li>
                <li><a href="#nosotros" className="transition-colors hover:text-caramel">Nosotros</a></li>
                <li><a href="#menu" className="transition-colors hover:text-caramel">Menú</a></li>
                <li><a href="#pedidos" className="transition-colors hover:text-caramel">Pedidos</a></li>
                <li><a href="#contacto" className="transition-colors hover:text-caramel">Contacto</a></li>
                <li><a href="#faq" className="transition-colors hover:text-caramel">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-caramel">Legal</p>
              <ul className="space-y-2.5 text-sm text-ivory/70">
                <li>
                  <button onClick={() => onLegal('terminos')} className="transition-colors hover:text-caramel">
                    Términos y condiciones
                  </button>
                </li>
                <li>
                  <button onClick={() => onLegal('privacidad')} className="transition-colors hover:text-caramel">
                    Política de privacidad
                  </button>
                </li>
                <li><a href={CONTACT.email && `mailto:${CONTACT.email}`} className="transition-colors hover:text-caramel">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-ivory/10 bg-ivory/5 p-8 md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <p className="font-display text-2xl">Recibí nuestras novedades</p>
            <p className="mt-1 text-sm text-ivory/60">
              Ofertas, lanzamientos y sabores de temporada. Sin spam.
            </p>
          </div>
          <form onSubmit={subscribe} className="mt-5 flex w-full max-w-md gap-2 md:mt-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 rounded-full border border-ivory/20 bg-transparent px-5 py-3 text-sm outline-none transition-colors placeholder:text-ivory/40 focus:border-caramel"
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-caramel px-6 py-3 text-xs uppercase tracking-widest text-espresso transition-colors hover:bg-ivory"
            >
              {ok ? <CheckCircle2 size={15} /> : <ArrowRight size={15} />}
              {ok ? 'Listo' : 'Unirme'}
            </button>
          </form>
          {ok && <p className="mt-2 text-xs text-caramel md:absolute">¡Gracias! Te avisamos cuando haya algo dulce. 🍩</p>}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 py-6 text-xs text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Delicias de Azúcar. Todos los derechos reservados.</p>
          <p>
            Hecho con <span className="text-caramel">♥</span> y mucha azúcar.
          </p>
        </div>
      </div>
    </footer>
  )
}
