import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CONTACT } from '../config.js'

const EASE = [0.16, 1, 0.3, 1]

function Terminos() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-mocha">
      <p>
        Estos términos regulan el uso del sitio web de Delicias de Azúcar y la compra de nuestros
        productos. Al realizar un pedido aceptás estas condiciones.
      </p>
      <h4 className="font-semibold text-cocoa">Pedidos y tiempos</h4>
      <p>
        Los productos del menú se entregan en el día. Los pedidos personalizados (tortas, mesas
        dulces, eventos) requieren 72 horas de antelación y se confirman por WhatsApp.
      </p>
      <h4 className="font-semibold text-cocoa">Pagos</h4>
      <p>
        Los pagos online se procesan de forma segura a través de Mercado Pago. También aceptamos
        efectivo, transferencia y pagos coordinados por WhatsApp al momento de la entrega.
      </p>
      <h4 className="font-semibold text-cocoa">Envíos y retiro</h4>
      <p>
        Realizamos envíos el mismo día en nuestra zona de cobertura. El costo se informa antes de
        confirmar el pedido. También podés retirar por nuestro local en {CONTACT.address}.
      </p>
      <h4 className="font-semibold text-cocoa">Cancelaciones</h4>
      <p>
        Los pedidos personalizados pueden cancelarse sin cargo hasta 48 horas antes de la entrega.
        Pasado ese plazo, se retiene un 50% del valor por los insumos ya adquiridos.
      </p>
      <h4 className="font-semibold text-cocoa">Alérgenos</h4>
      <p>
        Todos nuestros productos pueden contener gluten, lácteos, huevo, frutos secos y soja.
        Consultá los ingredientes de cada producto antes de pedir si tenés alergias.
      </p>
      <h4 className="font-semibold text-cocoa">Contacto</h4>
      <p>
        Ante cualquier consulta escribinos a {CONTACT.email} o por WhatsApp al {CONTACT.phone}.
      </p>
    </div>
  )
}

function Privacidad() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-mocha">
      <p>
        En Delicias de Azúcar respetamos tu privacidad. Esta política explica qué datos recopilamos
        y cómo los usamos.
      </p>
      <h4 className="font-semibold text-cocoa">Qué datos recopilamos</h4>
      <p>
        Nombre, teléfono, email y los datos necesarios para gestionar tu pedido (tipo de producto,
        fecha y dirección de entrega).
      </p>
      <h4 className="font-semibold text-cocoa">Cómo los usamos</h4>
      <p>
        Solo usamos tus datos para procesar pedidos, coordinar entregas, responderte consultas y
        enviarte información que aceptaste recibir. Nunca los vendemos ni compartimos con terceros.
      </p>
      <h4 className="font-semibold text-cocoa">Pagos</h4>
      <p>
        Los datos de tu tarjeta son procesados exclusivamente por Mercado Pago. No almacenamos
        información de pagos en nuestros servidores.
      </p>
      <h4 className="font-semibold text-cocoa">Tus derechos</h4>
      <p>
        Podés pedir la modificación o eliminación de tus datos en cualquier momento escribiéndonos a{' '}
        {CONTACT.email}.
      </p>
    </div>
  )
}

export default function LegalModal({ open, tab, setOpen, setTab }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-espresso/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-ivory sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-7 py-5">
              <div className="flex gap-2">
                <button
                  onClick={() => setTab('terminos')}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    tab === 'terminos' ? 'bg-espresso text-ivory' : 'text-mocha hover:text-espresso'
                  }`}
                >
                  Términos
                </button>
                <button
                  onClick={() => setTab('privacidad')}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                    tab === 'privacidad' ? 'bg-espresso text-ivory' : 'text-mocha hover:text-espresso'
                  }`}
                >
                  Privacidad
                </button>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="rounded-full border border-cocoa/10 p-2 transition-colors hover:border-caramel"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-7 py-6">
              {tab === 'terminos' ? <Terminos /> : <Privacidad />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
