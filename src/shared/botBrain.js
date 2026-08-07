import { products } from '../data/products.js'

export const defaultBotContext = {
  currency: '$',
  address: 'Av. Corrientes 1234, Buenos Aires',
  hoursText: 'Lun a Sáb de 9 a 20 h y Domingos de 10 a 18 h',
  freeDeliveryFrom: 50,
  products,
}

const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const priceLine = (p, ctx) => `• ${p.name}: ${ctx.currency}${p.price}`

export function getBotReply(raw, ctx = defaultBotContext) {
  const t = normalize(raw)
  const c = ctx.currency
  const prices = (ctx.products || products).slice(0, 4).map((p) => priceLine(p, ctx)).join('\n')

  if (/hola|buen(a|o|as|os)|hey|hi |hello|que tal|saludos|que onda/.test(t))
    return '¡Hola! 🍰 Soy el bot de *Delicias de Azúcar*. ¿En qué te ayudo? Podés preguntarme por precios, horarios, envíos, pedidos o tu pedido personalizado.'
  if (/precio|cuanto|costo|tarifa|cu[aá]nto vale|menu|men[uú]/.test(t))
    return `Estos son algunos precios de referencia:\n${prices}\n\nPodés pedirme el menú completo o escribir "quiero pedir" para armar tu pedido. 🛒`
  if (/horario|abre|cierra|atend|cuando funcion/.test(t))
    return `Atendemos de ${ctx.hoursText}. 🕘`
  if (/env[ií]o|delivery|entrega|domicilio|reparto/.test(t))
    return `Hacemos envíos el mismo día 📦. El envío es *gratis en pedidos de +${c}${ctx.freeDeliveryFrom}*. Fuera de la zona, consultanos por acá mismo.`
  if (/vegan|vegano|gluten|tacc|vegetarian|sin lactosa|intoleran/.test(t))
    return '¡Sí! Tenemos opciones *sin TACC* y *veganas* en tortas y macarons. Contame tu pedido y lo preparamos. 🌱'
  if (/macaron/.test(t))
    return `Nuestros macarons son 100% artesanales: vainilla, chocolate, pistacho y frutos rojos. Caja de 6 por ${c}18. 😋`
  if (/torta|cumple|pastel|cake|mesa dulce/.test(t))
    return '¡Nos encanta hacer tortas de cumpleaños y mesas dulces! 🎂 Se encargan con *72 hs de antelación*. Mandame tu idea y fecha y te armo el presupuesto.'
  if (/pago|pagas|mercado|efectivo|tarjeta|transferencia|deposito/.test(t))
    return 'Aceptamos *efectivo, transferencia y pago online con Mercado Pago*. 💳 Para personalizados coordinamos el pago por acá.'
  if (/pedir|pedido|orden|comprar|carrito|encargar|reservar|quiero/.test(t))
    return '¡Genial! Decime *qué querés*, *cantidad* y *para cuándo*, y te armo el pedido. 🧾 Si tenés el carrito en la web, también podés pedirlo directo desde ahí.'
  if (/ubicaci|direcci|donde estan|donde quedan|como llego|local|hasta donde|retira/.test(t))
    return `Nos encontrás en ${ctx.address}. 🗺️`
  if (/gracias|thank|genial|excelente|buenisimo|buen[ií]simo|perfecto/.test(t))
    return '¡A vos por escribirnos! 🧡 Si querés, te ayudo a armar tu pedido.'
  if (/chau|adios|hasta luego|bye|nos vemos|gracias.*adios/.test(t))
    return '¡Hasta pronto! 👋 Que tengas un día muy dulce.'
  if (/persona|humano|atencion real|hablar con|agente|soporte/.test(t))
    return '¡Claro! Te paso con una persona ahora mismo, un momento. 🧡'
  return `¡Muy buena pregunta! 😅 Probá preguntar por *precios*, *horarios*, *envíos*, *pedidos* o escribí "quiero pedir". También podés escribir *"hablar con una persona"* y te atiendo al toque.`
}

export const quickTopics = [
  'Precios 🍰',
  'Horarios ⏰',
  'Envíos 🛵',
  'Quiero pedir 📝',
  'Ubicación 📍',
]
