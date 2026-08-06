import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Search } from 'lucide-react'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const cats = ['Todos', 'Tortas', 'Postres', 'Repostería', 'Helados', 'Desayunos', 'Bebidas', 'Boxes', 'Eventos']

export default function Menu() {
  const [cat, setCat] = useState('Todos')
  const [q, setQ] = useState('')
  const { addItem, setOpen } = useCart()
  const { push } = useToast()

  const list = products.filter((p) => {
    const okCat = cat === 'Todos' || p.category === cat
    const s = q.trim().toLowerCase()
    const okQ = !s || p.name.toLowerCase().includes(s) || p.desc.toLowerCase().includes(s)
    return okCat && okQ
  })

  return (
    <section id="menu" className="bg-ivory px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.35em] text-caramel">El menú</span>
          <h2 className="mt-4 font-display text-4xl text-espresso sm:text-5xl lg:text-6xl">
            Nuestras delicias
          </h2>
          <p className="mx-auto mt-4 max-w-md text-mocha">
            Más de <strong className="font-semibold text-espresso">100 delicias</strong> horneadas
            fresco todos los días. Elegí, agregá al carrito y pedí en dos toques.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="flex items-center gap-3 rounded-full border border-cocoa/15 bg-cream/60 px-5 py-3.5 transition-colors focus-within:border-caramel">
            <Search size={16} className="shrink-0 text-mocha" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscá por nombre… (ej: macarons, torta, brownie)"
              className="w-full bg-transparent text-sm outline-none placeholder:text-mocha/60"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                cat === c
                  ? 'bg-espresso text-ivory'
                  : 'border border-cocoa/15 text-cocoa/70 hover:border-caramel hover:text-caramel'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-widest text-mocha">
          {list.length} {list.length === 1 ? 'producto' : 'productos'}
          {q.trim() && ` · resultados para “${q.trim()}”`}
        </p>

        <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {list.map((p) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-cream"
              >
                <div className="img-blend relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="img-tint h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-ivory/85 px-3 py-1 text-[10px] uppercase tracking-widest text-cocoa backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl text-espresso">{p.name}</h3>
                    <p className="font-display text-2xl text-caramel">
                      {p.price > 0 ? `$${p.price}` : 'A medida'}
                    </p>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mocha">{p.desc}</p>
                  <button
                    onClick={() => {
                      addItem(p)
                      push(`Agregado al carrito: ${p.name}`)
                      setOpen(true)
                    }}
                    className="mt-5 flex items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-caramel"
                  >
                    <Plus size={14} /> Agregar
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-mocha">
            No encontramos productos con “{q}”. Probá con otra palabra.
          </p>
        )}
      </div>
    </section>
  )
}
