# Delicias de Azúcar 🍰

Tienda online superminimalista de postres artesanales. React + Vite + Tailwind v4 + Express + Mercado Pago.

## Puesta en marcha local

```bash
npm install
cp .env.example .env        # completar tokens
npm run dev:all             # web http://localhost:5173 + API http://localhost:3001
```

## Producción

```bash
npm run build               # genera dist/
node server/index.js        # sirve la web + la API en el mismo puerto (SITE_URL apunta al dominio real)
```

Deploy listo para **Render**, **Railway**, **Fly.io** o cualquier VPS: solo correr el server con `npm run build` previo.

### Deploy en Vercel (gratis) ⚡

El proyecto ya viene preparado (`vercel.json` + `api/index.js`):

1. Creá el proyecto en https://vercel.com conectando el repo de GitHub (o con la CLI: `npm i -g vercel && vercel`).
2. En **Settings → Environment Variables** pegá todas las del `.env` (son las mismas variables, sin crear archivo local):
   `SITE_URL`, `ADMIN_TOKEN`, `MERCADOPAGO_ACCESS_TOKEN`, `WA_ACCESS_TOKEN`, `WA_PHONE_ID`, `WA_VERIFY_TOKEN`, `WA_OWNER_NUMBER`, y opcionalmente `WA_APP_SECRET`, `VITE_GA4_ID`, `VITE_META_PIXEL_ID`.
3. **Pedidos persistidos**: Vercel no tiene disco permanente, así que creá un **KV Store** en el dashboard (`Storage → Create Database → KV`) y copiá `KV_REST_API_URL` y `KV_REST_API_TOKEN` a las variables de entorno. Sin KV, los pedidos se guardan en memoria del serverless y pueden perderse.
4. Deploy → te da `https://tuproyecto.vercel.app`. Ese dominio va en `SITE_URL`.
5. En Meta, el webhook del bot apunta a `https://tuproyecto.vercel.app/api/wa/webhook` y el de Mercado Pago a `https://tuproyecto.vercel.app/api/webhook`.

Nota: el backend corre como función serverless (Express adaptado). Los mensajes del bot responden igual; solo aplica lo de persistir con KV.

## Variables de entorno (`.env`)

| Variable | Uso | Obligatoria |
|---|---|---|
| `MERCADOPAGO_ACCESS_TOKEN` | Cobrar online. Sin token, el checkout cae a WhatsApp | Sí para vender |
| `SITE_URL` | URL pública del sitio (para back_urls y webhook) | Sí en prod |
| `ADMIN_TOKEN` | Ver los pedidos recibidos (`GET /api/orders` con `Authorization: Bearer <token>`) | Sí en prod |
| `NOTIFY_WEBHOOK_URL` | URL que recibe un POST cuando un pedido se paga (Zapier/n8n/WhatsApp API/Slack) | Recomendado |
| `VITE_API_URL` | URL de la API en dev (default `http://localhost:3001`) | No |
| `VITE_GA4_ID` | Google Analytics 4 | Opcional |
| `VITE_META_PIXEL_ID` | Meta Pixel para anuncios | Opcional |
| `MERCADOPAGO_CURRENCY` | Moneda (default `ARS`) | No |
| `DATA_DIR` | Dónde guardar `orders.json` | No |

## Cómo ver los pedidos

```bash
curl -H "Authorization: Bearer TU_ADMIN_TOKEN" http://localhost:3001/api/orders
```

Cada pedido guarda: productos, total, comprador, `preference_id` y estado (`pending` → `paid` vía webhook). El webhook de Mercado Pago debe configurarse en el panel de MP apuntando a `https://tudominio.com/api/webhook`.

## Chatbot automático en WhatsApp 🤖

El mismo "cerebro" que responde en la web (`src/shared/botBrain.js`) responde los mensajes que te lleguen por WhatsApp. Cuando alguien te escribe, el bot contesta solo precios, horarios, envíos, pedidos, etc., y si pide *"hablar con una persona"* podés retomar el chat manualmente.

Configuración (Meta WhatsApp Cloud API):

1. Entrá a https://developers.facebook.com → **Crear app** → tipo *Business* → agregá el producto **WhatsApp**.
2. En *WhatsApp → Configuración de API* agregá el número **+51 936 028 001** (te piden verificación por SMS/llamada).
3. Copiá el **access token** → `WA_ACCESS_TOKEN`, y el **Phone number ID** → `WA_PHONE_ID`.
4. Creá tu propio `WA_VERIFY_TOKEN` (cualquier string secreto).
5. En *Configuración de API → Webhooks* → *Configurar webhook*:
   - URL de callback: `https://tudominio.com/api/wa/webhook`
   - Token de verificación: tu `WA_VERIFY_TOKEN`
   - Suscribí el evento **messages**.
6. Reiniciá el servidor y probá enviándole un WhatsApp al número.

Opcional: `WA_OWNER_NUMBER=51936028001` para que te llegue un WhatsApp cuando alguien **paga** un pedido. Meta exige un *template* aprobado para ese mensaje proactivo: crealo en el panel de WhatsApp con 3 variables (nº de pedido, productos, total) y poné su nombre en `WA_ORDER_TEMPLATE`. `WA_APP_SECRET` verifica la firma de los webhooks (recomendado en producción).

> Nota: la API oficial de Meta es gratuita para contestar mensajes entrantes dentro de la ventana de 24 h (justo el caso del chatbot). Los mensajes *proactivos* (como el aviso al dueño) requieren template aprobado.

---

## Checklist para empezar a VENDER 🚀

### 1. Datos reales del negocio
- [ ] `src/config.js`: número de WhatsApp real, dirección real, email, horarios.
- [ ] Precios reales en `src/data/products.js` (hoy son placeholders; el producto de precio `0` se muestra como "A medida").
- [ ] Fotos propias (reemplazá las de Unsplash por fotos reales de tus productos: vende muchísimo más).

### 2. Pagos
- [ ] Crear cuenta de **Mercado Pago** y obtener el `MERCADOPAGO_ACCESS_TOKEN` **de producción** (no test).
- [ ] Configurar en el panel de MP la URL de notificaciones → `https://tudominio.com/api/webhook`.
- [ ] Probar una compra real de $1 (después reembolsarla) para validar el flujo completo.

### 3. Dominio y hosting
- [ ] Comprar dominio (ej. `deliciasdeazucar.com`) y apuntarlo al hosting.
- [ ] `SITE_URL=https://tudominio.com` en el servidor.
- [ ] HTTPS activo (cualquier hosting moderno lo da gratis).
- [ ] Actualizar `public/sitemap.xml` y `public/robots.txt` con el dominio real y enviar a Google Search Console.

### 4. Recibir y cumplir pedidos
- [ ] Dejar `ADMIN_TOKEN` fuerte y revisar `GET /api/orders` a diario (o conectarlo a un bot de WhatsApp con `NOTIFY_WEBHOOK_URL`).
- [ ] Definir método de envío (cadete, retiro en local, correo) y dejar claras las zonas en la sección de pedidos.

### 5. Marketing
- [ ] `VITE_GA4_ID` y `VITE_META_PIXEL_ID` para medir tráfico y hacer anuncios.
- [ ] Crear Instagram/X/Facebook reales y poner los links en el footer (hoy son `#`).
- [ ] Foto de portada, bio con link al sitio, y publicar 2-3 veces por semana.

### 6. Legal
- [ ] Revisar los textos de Términos y Privacidad (`src/components/LegalModal.jsx`) y adaptarlos a tu país (Argentina: Ley 24.240 de Defensa del Consumidor; en muchas provincias se exige un **Libro de Quejas** QR).
- [ ] Inscribir el emprendimiento si corresponde (monotributo).

### 7. Lanzamiento
- [ ] `npm run build` + deploy y test completo en producción (comprar, webhook, notificación).
- [ ] Test en móvil (el 70%+ del tráfico será celular).
- [ ] Estrenar con una promo de lanzamiento y arrancar con los primeros pedidos.

> Nota: mientras no esté `MERCADOPAGO_ACCESS_TOKEN`, el botón de pago redirige al pedido por WhatsApp para no perder ventas.
