import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider, useToast } from './context/ToastContext.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Menu from './components/Menu.jsx'
import Testimonials from './components/Testimonials.jsx'
import OrderForm from './components/OrderForm.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Chatbot from './components/Chatbot.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import BackToTop from './components/BackToTop.jsx'
import LegalModal from './components/LegalModal.jsx'

function PaymentStatusToast() {
  const { push } = useToast()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const status = params.get('pago')
    if (status === 'exito') push('¡Pago aprobado! 🎉 Estamos preparando tu pedido')
    if (status === 'pendiente') push('Tu pago quedó pendiente. Te contactamos para confirmar')
    if (status === 'error') push('El pago no se completó. Probá de nuevo o pedí por WhatsApp')
    if (status) window.history.replaceState({}, '', window.location.pathname)
  }, [push])

  return null
}

function AppInner() {
  const [phase, setPhase] = useState('loading')
  const [legal, setLegal] = useState({ open: false, tab: 'terminos' })

  useEffect(() => {
    if (phase !== 'loading') return
    const t = setTimeout(() => setPhase('intro'), 4400)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <div className="noise min-h-screen">
      <AnimatePresence mode="wait">
        {phase === 'loading' && <LoadingScreen key="loading" />}
        {phase === 'intro' && <IntroScreen key="intro" onStart={() => setPhase('main')} />}
      </AnimatePresence>

      {phase === 'main' && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Menu />
            <Testimonials />
            <OrderForm />
            <Faq />
            <Contact />
          </main>
          <Footer onLegal={(tab) => setLegal({ open: true, tab })} />
        </motion.div>
      )}

      {phase === 'main' && (
        <>
          <CartDrawer />
          <Chatbot />
          <WhatsAppButton />
          <BackToTop />
        </>
      )}

      <LegalModal
        open={legal.open}
        tab={legal.tab}
        setOpen={(open) => setLegal((l) => ({ ...l, open }))}
        setTab={(tab) => setLegal((l) => ({ ...l, tab }))}
      />
      <PaymentStatusToast />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </CartProvider>
  )
}
