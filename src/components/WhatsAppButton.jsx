import { MessageCircle } from 'lucide-react'
import { waLink } from '../config.js'

export default function WhatsAppButton() {
  return (
    <a
      href={waLink('Hola Delicias de Azúcar! Quiero hacer una consulta. 😊')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat por WhatsApp"
      className="fixed bottom-5 right-[5.5rem] z-20 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
    >
      <MessageCircle size={20} />
    </a>
  )
}
