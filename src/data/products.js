const img = (id) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`

const TORTAS = [
  img('1578985545062-69928b1d9587'),
  img('1533134242443-d4fd215305ad'),
  img('1558961363-fa8fdf82db35'),
  img('1512058564366-18510be2db19'),
  img('1571115177098-24ec42ed204d'),
  img('1565958011703-44f9829ba187'),
  img('1541781774459-bb2af2f05b55'),
  img('1519861531473-9200262188bf'),
]

const POSTRES = [
  img('1569864358642-9d1684040f43'),
  img('1587668178277-295251f900ce'),
  img('1551106652-a5bcf4b29ab6'),
  img('1563805042-7684c019e1cb'),
  img('1464349095431-e9a21285b5f3'),
  img('1488477181946-6428a0291777'),
  img('1528207776546-365bb710ee93'),
  img('1567620905732-2d1ec7ab7445'),
]

const REPOSTERIA = [
  img('1555507036-ab1f4038808a'),
  img('1499636136210-6f4ee915583e'),
  img('1606313564200-e75d5e30476c'),
  img('1551024601-bec78aea704b'),
]

const HELADOS = [img('1563805042-7684c019e1cb')]

const DESAYUNO = [img('1528207776546-365bb710ee93'), img('1567620905732-2d1ec7ab7445'), img('1555507036-ab1f4038808a')]

const BOXES = [img('1488477181946-6428a0291777'), img('1464349095431-e9a21285b5f3'), img('1519861531473-9200262188bf')]

const EVENTOS = [img('1519861531473-9200262188bf'), img('1512058564366-18510be2db19'), img('1541781774459-bb2af2f05b55')]

export const products = [
  // ───────── TORTAS ─────────
  { id: 1, name: 'Tarta de Chocolate Intenso', category: 'Tortas', price: 28, desc: 'Biscocho húmedo de cacao, ganache y corazón fundente.', image: TORTAS[0] },
  { id: 2, name: 'Cheesecake de Frutos Rojos', category: 'Tortas', price: 32, desc: 'Crema suave sobre base de galleta y frutos de estación.', image: TORTAS[1] },
  { id: 3, name: 'Tarta de Frutos Rojos', category: 'Tortas', price: 30, desc: 'Masa sablée, crema pastelera y glaseado de frutos rojos.', image: TORTAS[2] },
  { id: 4, name: 'Red Velvet Clásica', category: 'Tortas', price: 35, desc: 'Bizcocho terciopelo rojo con frosting de queso crema.', image: TORTAS[3] },
  { id: 5, name: 'Torta de Zanahoria', category: 'Tortas', price: 26, desc: 'Nueces, canela y frosting de queso crema.', image: TORTAS[4] },
  { id: 6, name: 'Lemon Pie Artesanal', category: 'Tortas', price: 22, desc: 'Base sablée, curd de limón y merengue italiano.', image: TORTAS[5] },
  { id: 7, name: 'Tarta de Dulce de Leche', category: 'Tortas', price: 24, desc: 'Capas de bizcochuelo, dulce de leche repostero y merengue.', image: TORTAS[6] },
  { id: 8, name: 'Torta de Vainilla y Frutillas', category: 'Tortas', price: 27, desc: 'Vainilla esponjosa con crema y frutillas frescas.', image: TORTAS[7] },
  { id: 9, name: 'Torta de Chocolate Blanco', category: 'Tortas', price: 29, desc: 'Ganache de chocolate blanco y bizcocho de almendras.', image: TORTAS[3] },
  { id: 10, name: 'Torta de Coco y Lima', category: 'Tortas', price: 25, desc: 'Fresca, perfumada y suave. Ideal para el verano.', image: TORTAS[2] },
  { id: 11, name: 'Chocotorta Clásica', category: 'Tortas', price: 20, desc: 'El clásico argentino: galletitas y dulce de leche.', image: TORTAS[6] },
  { id: 12, name: 'Tarta Oreo', category: 'Tortas', price: 26, desc: 'Crema de chocolate y galletitas Oreo crocantes.', image: TORTAS[0] },
  { id: 13, name: 'Torta de Banana Bread', category: 'Tortas', price: 23, desc: 'Banana, nuez y un toque de ron. Esponjosa y húmeda.', image: TORTAS[4] },
  { id: 14, name: 'Tarta de Pistacho', category: 'Tortas', price: 36, desc: 'Crema de pistacho con base de almendras.', image: TORTAS[1] },
  { id: 15, name: 'Torta de Cumpleaños Personalizada', category: 'Tortas', price: 45, desc: 'Diseño a medida. Pedila con 72 hs de antelación.', image: TORTAS[7] },
  { id: 16, name: 'Torta 3 Pisos', category: 'Tortas', price: 120, desc: 'Tres pisos de pura dulzura para tu gran celebración.', image: TORTAS[3] },

  // ───────── POSTRES ─────────
  { id: 17, name: 'Macarons Franceses (x6)', category: 'Postres', price: 18, desc: 'Vainilla, chocolate, pistacho y frutos rojos.', image: POSTRES[0] },
  { id: 18, name: 'Macarons Frutos Rojos (x6)', category: 'Postres', price: 19, desc: 'Ganache de frutos rojos y cáscara crocante.', image: POSTRES[0] },
  { id: 19, name: 'Cupcakes de Vainilla (x3)', category: 'Postres', price: 12, desc: 'Esponjosos con frosting de vainilla y sprinkles.', image: POSTRES[1] },
  { id: 20, name: 'Cupcakes Red Velvet (x3)', category: 'Postres', price: 13, desc: 'Terciopelo rojo con queso crema.', image: POSTRES[1] },
  { id: 21, name: 'Cupcakes de Chocolate (x3)', category: 'Postres', price: 12, desc: 'Cacao intenso con ganache cremoso.', image: POSTRES[1] },
  { id: 22, name: 'Éclair de Vainilla', category: 'Postres', price: 10, desc: 'Pasta choux con crema de vainilla y glaseado.', image: POSTRES[2] },
  { id: 23, name: 'Éclair de Chocolate', category: 'Postres', price: 10, desc: 'Relleno de crema de chocolate y ganache brillante.', image: POSTRES[2] },
  { id: 24, name: 'Tiramisú', category: 'Postres', price: 16, desc: 'Mascarpone, café y cacao. Un clásico italiano.', image: POSTRES[5] },
  { id: 25, name: 'Panqueques con Frutos Rojos', category: 'Postres', price: 15, desc: 'Manteca, frutos rojos y dulce de leche.', image: POSTRES[6] },
  { id: 26, name: 'Waffles de Manteca', category: 'Postres', price: 14, desc: 'Crocantes por fuera, tiernos por dentro.', image: POSTRES[7] },
  { id: 27, name: 'Panna Cotta de Vainilla', category: 'Postres', price: 12, desc: 'Cremosa, con coulis de frutos rojos.', image: POSTRES[4] },
  { id: 28, name: 'Crème Brûlée', category: 'Postres', price: 14, desc: 'Caramelo crujiente y crema de vainilla.', image: POSTRES[5] },
  { id: 29, name: 'Mousse de Chocolate', category: 'Postres', price: 13, desc: 'Aireado y profundo, con chocolate 70%.', image: POSTRES[2] },
  { id: 30, name: 'Mousse de Maracuyá', category: 'Postres', price: 13, desc: 'Fresca y ácida, con base de galleta.', image: POSTRES[4] },
  { id: 31, name: 'Cheesecake en Vasito', category: 'Postres', price: 11, desc: 'La porción perfecta para llevar.', image: POSTRES[1] },
  { id: 32, name: 'Churros con Chocolate (x6)', category: 'Postres', price: 15, desc: 'Recién fritos con chocolate caliente para mojar.', image: POSTRES[7] },
  { id: 33, name: 'Alfajores de Maicena (x6)', category: 'Postres', price: 12, desc: 'Clásicos, rellenos de dulce de leche.', image: POSTRES[5] },
  { id: 34, name: 'Tarta de Manzana a la Canela', category: 'Postres', price: 21, desc: 'Manzana caramelizada y crumble de avena.', image: POSTRES[6] },
  { id: 35, name: 'Brownie con Helado', category: 'Postres', price: 14, desc: 'Brownie tibio, helado de vainilla y salsa de chocolate.', image: POSTRES[3] },
  { id: 36, name: 'Porción de Tarta de Limón', category: 'Postres', price: 11, desc: 'El corte ideal para un antojo rápido.', image: POSTRES[2] },

  // ───────── REPOSTERÍA ─────────
  { id: 37, name: 'Croissant de Manteca', category: 'Repostería', price: 8, desc: 'Hojaldrado, dorado y con mucho laminado.', image: REPOSTERIA[0] },
  { id: 38, name: 'Croissant de Almendras', category: 'Repostería', price: 8, desc: 'Relleno de crema de almendras y almendra tostada.', image: REPOSTERIA[0] },
  { id: 39, name: 'Croissant de Chocolate', category: 'Repostería', price: 8, desc: 'Con corazón de chocolate semiamargo.', image: REPOSTERIA[0] },
  { id: 40, name: 'Galletas con Chips (x6)', category: 'Repostería', price: 10, desc: 'Clásicas con chips de chocolate y sal marina.', image: REPOSTERIA[1] },
  { id: 41, name: 'Galletas de Avena y Miel (x6)', category: 'Repostería', price: 9, desc: 'Suaves, saludables y muy adictivas.', image: REPOSTERIA[1] },
  { id: 42, name: 'Galletas de Chocolate Blanco (x6)', category: 'Repostería', price: 10, desc: 'Bordes crocantes, centro fundido.', image: REPOSTERIA[1] },
  { id: 43, name: 'Scones de Queso y Romero', category: 'Repostería', price: 9, desc: 'Ideales para acompañar un té.', image: REPOSTERIA[0] },
  { id: 44, name: 'Muffin de Arándanos', category: 'Repostería', price: 7, desc: 'Jugoso, con arándanos enteros.', image: REPOSTERIA[1] },
  { id: 45, name: 'Muffin de Banana', category: 'Repostería', price: 7, desc: 'Con nueces y un toque de canela.', image: REPOSTERIA[1] },
  { id: 46, name: 'Muffin de Chocolate', category: 'Repostería', price: 7, desc: 'Cacao intenso y pepitas fundidas.', image: REPOSTERIA[1] },
  { id: 47, name: 'Brownie con Nueces', category: 'Repostería', price: 11, desc: 'Denso, húmedo y con nueces tostadas.', image: REPOSTERIA[2] },
  { id: 48, name: 'Brownie sin TACC', category: 'Repostería', price: 11, desc: 'Igual de rico, apto celíaco.', image: REPOSTERIA[2] },
  { id: 49, name: 'Donas Glaseadas', category: 'Repostería', price: 9, desc: 'Esponjosas, glaseadas y recién fritas.', image: REPOSTERIA[3] },
  { id: 50, name: 'Donas con Chocolate', category: 'Repostería', price: 10, desc: 'Cubiertas con ganache y chispas.', image: REPOSTERIA[3] },
  { id: 51, name: 'Donas de Frutilla', category: 'Repostería', price: 10, desc: 'Glaseado rosa de frutilla natural.', image: REPOSTERIA[3] },
  { id: 52, name: 'Bagels Artesanales (x2)', category: 'Repostería', price: 9, desc: 'Horneados a la piedra, dorados y masticables.', image: REPOSTERIA[0] },
  { id: 53, name: 'Tortitas de Avena (x3)', category: 'Repostería', price: 8, desc: 'Ideales para el desayuno, con miel.', image: REPOSTERIA[1] },
  { id: 54, name: 'Bizcochitos de Grasa (x10)', category: 'Repostería', price: 6, desc: 'Crocantes y perfectos para el mate.', image: REPOSTERIA[1] },

  // ───────── HELADOS ─────────
  { id: 55, name: 'Helado Artesanal (2 bochas)', category: 'Helados', price: 13, desc: 'Elegí tus sabores del día.', image: HELADOS[0] },
  { id: 56, name: 'Helado de Dulce de Leche', category: 'Helados', price: 13, desc: 'Cremoso, con hilos de dulce de leche.', image: HELADOS[0] },
  { id: 57, name: 'Helado de Chocolate Belga', category: 'Helados', price: 14, desc: 'Intenso y aterciopelado.', image: HELADOS[0] },
  { id: 58, name: 'Helado de Frutilla', category: 'Helados', price: 13, desc: 'Con trozos de frutilla real.', image: HELADOS[0] },
  { id: 59, name: 'Cono de Pistacho', category: 'Helados', price: 11, desc: 'Pistacho premium, crocante de waffle.', image: HELADOS[0] },
  { id: 60, name: 'Cono de Vainilla', category: 'Helados', price: 10, desc: 'El clásico de siempre.', image: HELADOS[0] },
  { id: 61, name: 'Sundae de Frutos Rojos', category: 'Helados', price: 15, desc: 'Helado, frutos rojos, crema y granola.', image: HELADOS[0] },
  { id: 62, name: 'Banana Split', category: 'Helados', price: 16, desc: 'Banana, tres bochas, chocolate y frutos.', image: HELADOS[0] },
  { id: 63, name: 'Helado de Maracuyá y Mango', category: 'Helados', price: 14, desc: 'Sorbete tropical bien refrescante.', image: HELADOS[0] },
  { id: 64, name: 'Helado Vegano de Coco', category: 'Helados', price: 14, desc: 'Cremoso, sin lácteos y delicioso.', image: HELADOS[0] },

  // ───────── DESAYUNOS ─────────
  { id: 65, name: 'Desayuno Clásico', category: 'Desayunos', price: 9, desc: 'Café de especialidad + medialuna de manteca.', image: DESAYUNO[2] },
  { id: 66, name: 'Desayuno Completo para 2', category: 'Desayunos', price: 28, desc: 'Tostadas, huevos, jugo, café y dulces.', image: DESAYUNO[0] },
  { id: 67, name: 'Tostadas Francesas', category: 'Desayunos', price: 14, desc: 'Pan brioche, canela y maple.', image: DESAYUNO[0] },
  { id: 68, name: 'Panqueques con Maple', category: 'Desayunos', price: 15, desc: 'Esponjosos con manteca y jarabe de arce.', image: DESAYUNO[1] },
  { id: 69, name: 'Bowl de Yogur con Granola', category: 'Desayunos', price: 12, desc: 'Yogur natural, granola casera y frutas.', image: DESAYUNO[0] },
  { id: 70, name: 'Granola Artesanal (frasco)', category: 'Desayunos', price: 11, desc: 'Avena, miel, frutos secos y semillas.', image: DESAYUNO[1] },
  { id: 71, name: 'Medialunas de Manteca (x4)', category: 'Desayunos', price: 8, desc: 'Espejadas y tiernas, horneadas cada mañana.', image: DESAYUNO[2] },
  { id: 72, name: 'Scones con Té', category: 'Desayunos', price: 10, desc: 'Dos scones con manteca, mermelada y té.', image: DESAYUNO[2] },
  { id: 73, name: 'Porridge de Avena y Banana', category: 'Desayunos', price: 10, desc: 'Caliente, cremoso y con canela.', image: DESAYUNO[0] },
  { id: 74, name: 'Budín de Limón (rebanada)', category: 'Desayunos', price: 7, desc: 'Glaseado con azúcar y limón real.', image: DESAYUNO[1] },

  // ───────── BEBIDAS ─────────
  { id: 75, name: 'Café de Especialidad', category: 'Bebidas', price: 6, desc: 'Granos de origen, molienda en el momento.', image: BOXES[1] },
  { id: 76, name: 'Capuchino de Canela', category: 'Bebidas', price: 7, desc: 'Espresso, leche vaporizada y canela.', image: BOXES[1] },
  { id: 77, name: 'Chocotaza de Chocolate', category: 'Bebidas', price: 9, desc: 'Chocolate derretido con marshmallows.', image: BOXES[1] },
  { id: 78, name: 'Latte de Dulce de Leche', category: 'Bebidas', price: 8, desc: 'Cremoso, dulce y adictivo.', image: BOXES[1] },
  { id: 79, name: 'Batido de Frutilla', category: 'Bebidas', price: 10, desc: 'Frutilla fresca, helado y crema.', image: BOXES[1] },
  { id: 80, name: 'Batido de Banana y Cacao', category: 'Bebidas', price: 10, desc: 'Energía natural para empezar el día.', image: BOXES[1] },
  { id: 81, name: 'Milkshake de Oreo', category: 'Bebidas', price: 11, desc: 'Helado de vainilla y galletitas Oreo.', image: BOXES[1] },
  { id: 82, name: 'Té de Frutos Rojos', category: 'Bebidas', price: 6, desc: 'Infusión aromática con miel opcional.', image: BOXES[1] },

  // ───────── BOXES Y COMBOS ─────────
  { id: 83, name: 'Box Degustación (4 piezas)', category: 'Boxes', price: 22, desc: 'Cuatro delicias sorpresa para probar.', image: BOXES[0] },
  { id: 84, name: 'Box Degustación Premium (6 piezas)', category: 'Boxes', price: 32, desc: 'La selección del pastelero, para regalar.', image: BOXES[1] },
  { id: 85, name: 'Box de Macarons (12)', category: 'Boxes', price: 34, desc: 'Sabores surtidos en caja elegante.', image: BOXES[1] },
  { id: 86, name: 'Box de Cupcakes Surtidos (6)', category: 'Boxes', price: 24, desc: 'Seis sabores para compartir.', image: BOXES[0] },
  { id: 87, name: 'Box Dulce para Regalo', category: 'Boxes', price: 40, desc: 'Caja armada con tarjeta y lazo.', image: BOXES[2] },
  { id: 88, name: 'Combo Picnic para 2', category: 'Boxes', price: 45, desc: 'Sándwiches, postres, jugo y mantel.', image: BOXES[0] },
  { id: 89, name: 'Combo Brunch', category: 'Boxes', price: 38, desc: 'Salado + dulce + bebida. Todo incluido.', image: BOXES[0] },
  { id: 90, name: 'Box de Galletas Artesanales', category: 'Boxes', price: 18, desc: 'Variedad de galletas de la casa.', image: BOXES[1] },
  { id: 91, name: 'Box de Alfajores (12)', category: 'Boxes', price: 20, desc: 'Maicena y de chocolate, mixtos.', image: BOXES[0] },
  { id: 92, name: 'Combo Café + 2 Porciones', category: 'Boxes', price: 16, desc: 'Dos cafés y dos porciones a elección.', image: BOXES[1] },

  // ───────── EVENTOS ─────────
  { id: 93, name: 'Mesa Dulce para 20 personas', category: 'Eventos', price: 350, desc: 'Surtido completo con instalación incluida.', image: EVENTOS[0] },
  { id: 94, name: 'Mesa Dulce para 50 personas', category: 'Eventos', price: 750, desc: 'Gran despliegue para celebraciones grandes.', image: EVENTOS[0] },
  { id: 95, name: 'Torre de Cupcakes (24)', category: 'Eventos', price: 60, desc: 'Torre armada de cupcakes surtidos.', image: EVENTOS[1] },
  { id: 96, name: 'Torre de Macarons (30)', category: 'Eventos', price: 80, desc: 'Espectacular torre de macarons premium.', image: EVENTOS[1] },
  { id: 97, name: 'Candy Bar de Chocolates', category: 'Eventos', price: 90, desc: 'Chocolates, bombones y delicias para tu fiesta.', image: EVENTOS[2] },
  { id: 98, name: 'Box de Fiestas (para 10)', category: 'Eventos', price: 70, desc: 'Surtido ideal para cumpleaños infantiles.', image: EVENTOS[2] },
  { id: 99, name: 'Torta de Boda Personalizada', category: 'Eventos', price: 150, desc: 'Diseño exclusivo para el gran día.', image: EVENTOS[1] },
  { id: 100, name: 'Cotización a Medida', category: 'Eventos', price: 0, desc: 'Contanos tu idea y armamos una propuesta.', image: EVENTOS[0] },
]
