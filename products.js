/* =============================================================
   LA FARINA — products.js
   ESTE É O ÚNICO FICHEIRO QUE PRECISAS DE EDITAR PARA:
     - mudar um preço
     - mudar o nome ou a descrição de um produto
     - adicionar ou remover um produto
     - trocar a foto de um produto
     - mudar os planos de assinatura semanal (preço / conteúdo)

   NÃO precisas de mexer no script.js — ele lê os dados que estão
   aqui automaticamente.

   ---------------------------------------------------------------
   COMO ADICIONAR UM PRODUTO NOVO
   ---------------------------------------------------------------
   1. Escolhe a categoria certa em baixo: pao, focaccia, massas ou molhos.
   2. Copia uma linha existente dessa categoria e cola-a por baixo.
   3. Muda os valores:
        id    -> um código único, sem espaços nem acentos (ex: 'pao-alho')
        name  -> o nome que aparece no site
        price -> o preço em dólares, só o número (ex: 6, ou 6.50)
        img   -> o link da foto do produto
        desc  -> a descrição curta que aparece no card
        badge -> opcional. Só usar em produtos que queiras destacar
                 (ex: 'Mais vendido'). Para não usar, apaga a linha toda.
   4. Não te esqueças da vírgula "," no fim de cada linha de produto
      (menos na última linha de cada categoria).

   Para REMOVER um produto, apaga a linha toda dele (com a vírgula).
   Para mudar só o PREÇO ou o NOME, edita apenas esse valor.
   ============================================================= */

/* ---------- CATEGORIAS DA LOJA ---------- */
const CATEGORY_LABELS = {
  pao: 'Pão',
  focaccia: 'Focaccias',
  massas: 'Massas Frescas',
  molhos: 'Molhos & Conservas',
};

/* ---------- PRODUTOS ---------- */
const PRODUCTS = {
  pao: [
    { id: 'pao-chorizo',    name: 'Pão de Chorizo',     price: 6, img: 'https://images.pexels.com/photos/8633662/pexels-photo-8633662.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Massa artesanal recheada com chorizo.' },
    { id: 'pao-parmesan',   name: 'Pão de Parmesão',    price: 6, img: 'https://images.pexels.com/photos/30350350/pexels-photo-30350350.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Crosta dourada, miolo macio, parmesão.' },
    { id: 'pao-blue',       name: 'Pão de Queijo Azul', price: 6, img: 'https://images.pexels.com/photos/30890566/pexels-photo-30890566.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Sabor intenso de queijo azul.' },
    { id: 'pao-ciabatta',   name: 'Ciabatta',           price: 4, img: 'https://images.pexels.com/photos/36202913/pexels-photo-36202913.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Clássica, crocante por fora, alveolada por dentro.' },
    { id: 'pao-multigrain', name: 'Pão Multigrãos',     price: 8, img: 'https://images.pexels.com/photos/6608542/pexels-photo-6608542.jpeg?auto=compress&cs=tinysrgb&w=800', badge: 'Mais vendido', desc: 'Mistura de grãos, textura densa e nutritiva.' },
    { id: 'cinnamon-roll',  name: 'Cinnamon Roll',      price: 2, img: 'https://images.pexels.com/photos/3951306/pexels-photo-3951306.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Rolinho de canela individual.' },
    { id: 'soft-rolls',     name: 'Pãezinhos Macios (8un)', price: 6, img: 'https://images.pexels.com/photos/1287278/pexels-photo-1287278.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Pacote com 8 unidades, ideais para o dia a dia.' },
  ],
  focaccia: [
    { id: 'foc-herb',       name: 'Focaccia de Ervas',                price: 10, img: 'https://images.pexels.com/photos/29653173/pexels-photo-29653173.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Azeite, ervas frescas e flor de sal.' },
    { id: 'foc-rosolive',   name: 'Focaccia de Alecrim e Azeitona',   price: 10, img: 'https://images.pexels.com/photos/33657315/pexels-photo-33657315.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Alecrim fresco e azeitonas inteiras.' },
    { id: 'foc-tompesto',   name: 'Focaccia de Tomate e Pesto',      price: 10, img: 'https://images.pexels.com/photos/36863149/pexels-photo-36863149.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Tomate maduro e pesto caseiro.' },
    { id: 'foc-chorolive',  name: 'Focaccia de Chorizo e Azeitona',  price: 10, img: 'https://images.pexels.com/photos/30666816/pexels-photo-30666816.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Chorizo fatiado com azeitonas.' },
    { id: 'foc-bluewalnut', name: 'Focaccia de Queijo Azul e Noz',   price: 10, img: 'https://images.pexels.com/photos/30666812/pexels-photo-30666812.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Queijo azul com nozes torradas.' },
    { id: 'sf-choc',        name: 'Focaccia Doce de Chocolate',       price: 10, img: 'https://images.pexels.com/photos/6829491/pexels-photo-6829491.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Massa fofa com pedaços de chocolate.' },
    { id: 'sf-bancin',      name: 'Focaccia Doce de Banana e Canela', price: 10, img: 'https://images.pexels.com/photos/33739660/pexels-photo-33739660.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Banana caramelizada e canela.' },
    { id: 'sf-bannut',      name: 'Focaccia Doce de Banana e Nutella', price: 10, img: 'https://images.pexels.com/photos/4114141/pexels-photo-4114141.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Banana com Nutella derretida.' },
    { id: 'sf-applecin',    name: 'Focaccia Doce de Maçã e Canela',   price: 10, img: 'https://images.pexels.com/photos/4610166/pexels-photo-4610166.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Maçã salteada com canela.' },
  ],
  massas: [
    { id: 'pasta-small',      name: 'Massa Artesanal Pequena (500g)',  price: 6,  img: 'https://images.pexels.com/photos/2998955/pexels-photo-2998955.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Formatos espiral e concha.' },
    { id: 'pasta-fettuccine', name: 'Fettuccine (500g)',               price: 5,  img: 'https://images.pexels.com/photos/5710178/pexels-photo-5710178.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Sabores limão, beterraba, espinafre ou natural.' },
    { id: 'gnocchi-trad',     name: 'Nhoque Tradicional (500g)',       price: 8,  img: 'https://images.pexels.com/photos/6659620/pexels-photo-6659620.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Pré-cozido, pronto a saltear.' },
    { id: 'gnocchi-cheese',   name: 'Nhoque Recheado de Queijo (500g)',price: 14, img: 'https://images.pexels.com/photos/6659628/pexels-photo-6659628.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Pré-cozido, recheio cremoso de queijo.' },
    { id: 'lasagne-beef',     name: 'Lasanha de Carne (1,7kg)',        price: 20, img: 'https://images.pexels.com/photos/5949922/pexels-photo-5949922.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Ingredientes frescos, pronta para o forno.' },
    { id: 'lasagne-veg',      name: 'Lasanha Vegetariana (1,7kg)',     price: 15, img: 'https://images.pexels.com/photos/4079520/pexels-photo-4079520.jpeg', desc: 'Ingredientes frescos, pronta para o forno.' },
  ],
  // NOTA: várias imagens desta categoria ainda estão repetidas (placeholders
  // do Pexels). Por marcar com fotos reais dos produtos assim que as tivermos.
  molhos: [
    { id: 'garlic-confit',    name: 'Confit de Alho',               price: 3,  img: 'https://images.pexels.com/photos/3273989/pexels-photo-3273989.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Alho confitado lentamente em azeite.' },
    { id: 'chimichurri',      name: 'Chimichurri',                  price: 5,  img: 'https://images.pexels.com/photos/9685273/pexels-photo-9685273.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Molho fresco de ervas, alho e vinagre.' },
    { id: 'caponata',         name: 'Caponata de Beringela',        price: 4,  img: 'https://images.pexels.com/photos/8580763/pexels-photo-8580763.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Beringela agridoce ao estilo siciliano.' },
    { id: 'peperonata',       name: 'Peperonata',                   price: 10, img: 'https://images.pexels.com/photos/1051849/pexels-photo-1051849.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Pimentos salteados em azeite e ervas.' },
    { id: 'tomato-sauce-s',   name: 'Molho de Tomate',              price: 4,  img: 'https://images.pexels.com/photos/9685273/pexels-photo-9685273.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Molho de tomate tradicional, base para massas.' },
    { id: 'brazil-chilli',    name: 'Pimenta Brasileira',           price: 4,  img: 'https://images.pexels.com/photos/8896839/pexels-photo-8896839.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Molho de pimenta com toque brasileiro.' },
    { id: 'plum-merlot',      name: 'Compota de Ameixa com Merlot', price: 10, img: 'https://images.pexels.com/photos/1051849/pexels-photo-1051849.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compota encorpada de ameixa reduzida em Merlot.' },
    { id: 'pineapple-ginger', name: 'Compota de Ananás e Gengibre', price: 5,  img: 'https://images.pexels.com/photos/8896839/pexels-photo-8896839.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Doce e picante, ótima com queijos.' },
    { id: 'mango-passion',    name: 'Compota de Manga e Maracujá',  price: 5,  img: 'https://images.pexels.com/photos/1051849/pexels-photo-1051849.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Sabor tropical de manga e maracujá.' },
    { id: 'chili-jam',        name: 'Compota de Pimenta',           price: 5,  img: 'https://images.pexels.com/photos/8896839/pexels-photo-8896839.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compota agridoce com pimenta.' },
    { id: 'tangerine-jam',    name: 'Compota de Tangerina',         price: 7,  img: 'https://images.pexels.com/photos/1051849/pexels-photo-1051849.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Compota cítrica de tangerina.' },
    { id: 'tomato-sauce-600', name: 'Molho de Tomate (600g)',       price: 5,  img: 'https://images.pexels.com/photos/9685273/pexels-photo-9685273.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Frasco de 600g, ideal para a semana.' },
    { id: 'bolognese-600',    name: 'Molho Bolonhesa (600g)',       price: 8,  img: 'https://images.pexels.com/photos/5949922/pexels-photo-5949922.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Molho de carne encorpado, frasco de 600g.' },
    { id: 'white-sauce-600',  name: 'Molho Branco (600g)',          price: 5,  img: 'https://images.pexels.com/photos/8580763/pexels-photo-8580763.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Molho branco cremoso, frasco de 600g.' },
    { id: 'cassava-powder',   name: 'Farinha de Mandioca (400g)',   price: 5,  img: 'https://images.pexels.com/photos/3273989/pexels-photo-3273989.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Farinha torrada, produto local.' },
    { id: 'potato-sticks',    name: 'Batata Palha (200g)',          price: 3,  img: 'https://images.pexels.com/photos/8580763/pexels-photo-8580763.jpeg?auto=compress&cs=tinysrgb&w=800', desc: 'Crocante, ótima para acompanhar.' },
  ],
};

// Atribui a categoria a cada produto automaticamente (evita repetir o campo
// à mão em cada um dos ~30 produtos). Usado, por exemplo, para saber que
// só o Pão tem a opção de corte (inteiro / fatiado).
// NÃO apagar — isto tem de correr sempre que os produtos acima mudam.
Object.entries(PRODUCTS).forEach(([cat, lista]) => {
  lista.forEach(p => { p.categoria = cat; });
});

/* ---------------------------------------------------------------
   PLANOS DE ASSINATURA SEMANAL
   ---------------------------------------------------------------
   Para mudar o preço ou o conteúdo de um plano, edita os campos
   "preco" e "itens" abaixo. "destaque: true" põe a etiqueta
   "Mais popular" e destaca visualmente o cartão — só deve haver
   UM plano com "destaque: true" de cada vez.
   ============================================================= */
const SUBSCRIPTIONS = [
  {
    id: 'sub-pao',
    nome: 'Cesta de Pão',
    preco: 18,
    desc: 'Um pão à tua escolha, toda a semana, sem teres de encomendar.',
    itens: [
      '1x pão artesanal à escolha (inteiro ou fatiado)',
      'Entrega semanal, sempre no mesmo dia',
      'Podes trocar o pão quando quiseres',
    ],
  },
  {
    id: 'sub-mix',
    nome: 'Cesta Mista',
    preco: 32,
    desc: 'Pão + focaccia toda a semana — para quem gosta de variedade.',
    itens: [
      '1x pão artesanal à escolha',
      '1x focaccia à escolha',
      'Entrega semanal, sempre no mesmo dia',
    ],
    destaque: true,
  },
  {
    id: 'sub-completa',
    nome: 'Cesta Completa',
    preco: 45,
    desc: 'Pão, focaccia e massa fresca — tudo o que precisas para a semana.',
    itens: [
      '1x pão artesanal à escolha',
      '1x focaccia à escolha',
      '1x massa fresca (500g)',
      'Entrega semanal, sempre no mesmo dia',
    ],
  },
];
