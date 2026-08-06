import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu as MenuIcon, X, ShoppingBag } from 'lucide-react'
import Logo from './Logo.jsx'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#menu', label: 'Menú' },
  { href: '#pedidos', label: 'Pedidos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count, setOpen: setCartOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onDark = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/85 shadow-[0_1px_0_rgba(0,0,0,0.05)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Logo size={30} className="text-caramel" />
          <span
            className={`font-display text-xl tracking-wide transition-colors ${
              onDark ? 'text-ivory' : 'text-espresso'
            }`}
          >
            Delicias de Azúcar
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                onDark ? 'text-ivory/75 hover:text-ivory' : 'text-cocoa/70 hover:text-espresso'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Abrir carrito"
            className={`relative rounded-full border p-2 transition-colors ${
              onDark
                ? 'border-ivory/25 text-ivory hover:border-caramel'
                : 'border-cocoa/15 text-cocoa hover:border-caramel'
            }`}
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-caramel text-[10px] font-semibold text-ivory">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className={`rounded-full border p-2 md:hidden ${
              onDark ? 'border-ivory/25 text-ivory' : 'border-cocoa/15 text-cocoa'
            }`}
          >
            <MenuIcon size={18} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-72 flex-col gap-6 bg-ivory p-8"
            >
              <div className="flex items-center justify-between">
                <Logo size={34} className="text-caramel" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="rounded-full border border-cocoa/15 p-2"
                >
                  <X size={18} />
                </button>
              </div>
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl text-espresso transition-colors hover:text-caramel"
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
