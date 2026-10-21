/* =============================================================
   LA FARINA — products.js
   ESTE É O ÚNICO FICHEIRO QUE PRECISAS DE EDITAR PARA:
     - mudar um preço
     - mudar o nome ou a descrição de um produto
     - adicionar ou remover um produto
     - trocar a foto de um produto
     - traduzir um produto para inglês (bloco PRODUCTS_EN, no fim do ficheiro)

   NÃO precisas de mexer no script.js — ele lê os dados que estão
   aqui automaticamente.

   ---------------------------------------------------------------
   FOTOS DOS PRODUTOS — como colocar
   ---------------------------------------------------------------
   Todas as fotos vivem na pasta "img/produtos/" (cria esta pasta, ao
   lado da pasta "icons/", se ainda não existir).

   Cada produto já sabe o nome exato do ficheiro que precisa —
   está escrito no campo "img" de cada produto, em baixo. Por
   exemplo, o produto com id 'pao-chorizo' espera encontrar o
   ficheiro:
        img/produtos/pao-chorizo.jpg

   Ou seja: só precisas de tirar a foto, dar-lhe exatamente esse
   nome (respeita maiúsculas/minúsculas) e colocá-la nessa pasta.
   Não precisas de mudar mais nada neste ficheiro — assim que o
   ficheiro existir com o nome certo, aparece automaticamente no
   site, em todos os sítios onde esse produto é mostrado (loja e
   sugestões do carrinho).

   Sugestões para a foto:
     - Formato quadrado (ex: 1000x1000px) — o site corta para
       quadrado automaticamente, mas fica melhor se já vier
       enquadrada assim, com o produto centrado.
     - Ficheiro .jpg (é o que está à espera; se só tiveres .png,
       muda a extensão no campo "img" desse produto para .png).
     - Enquanto a foto não existir, o card mostra só o fundo
       dourado, sem foto partida — não há problema em ires
       adicionando aos poucos.

   ---------------------------------------------------------------
   COMO ADICIONAR UM PRODUTO NOVO
   ---------------------------------------------------------------
   1. Escolhe a categoria certa em baixo: pao, focaccia, massas ou molhos.
   2. Copia uma linha existente dessa categoria e cola-a por baixo.
   3. Muda os valores:
        id    -> um código único, sem espaços nem acentos (ex: 'pao-alho')
        name  -> o nome que aparece no site
        price -> o preço em dólares, só o número (ex: 6, ou 6.50)
        img   -> o caminho da foto — usa sempre 'img/produtos/' seguido
                 do mesmo id que escolheste acima + '.jpg'
                 (ex: 'img/produtos/pao-alho.jpg')
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
    { id: 'pao-chorizo',    name: 'Pão de Chorizo',     price: 6, img: 'shop-img/pao-choriço.jpg', desc: 'Massa artesanal recheada com chorizo.' },
    { id: 'pao-parmesan',   name: 'Pão de Parmesão',    price: 6, img: 'shop-img/pao-parmesao.jpg', desc: 'Crosta dourada, miolo macio, parmesão.' },
    { id: 'pao-blue',       name: 'Pão de Queijo Azul', price: 6, img: 'shop-img/pao-queijo-azul.jpg', desc: 'Sabor intenso de queijo azul.' },
    { id: 'pao-ciabatta',   name: 'Ciabatta',           price: 4, img: 'shop-img/ciabata.jpg', desc: 'Clássica, crocante por fora, alveolada por dentro.' },
    { id: 'pao-multigrain', name: 'Pão Multigrãos',     price: 8, img: 'shop-img/pao-multigraos.jpg', badge: 'Mais vendido', desc: 'Mistura de grãos, textura densa e nutritiva.' },
    { id: 'cinnamon-roll',  name: 'Cinnamon Roll',      price: 2, img: 'shop-img/cinamon-roll.jpg', desc: 'Rolinho de canela individual.' },
    { id: 'soft-rolls',     name: 'Pãezinhos Macios (8un)', price: 6, img: 'shop-img/paes-macios.jpg', desc: 'Pacote com 8 unidades, ideais para o dia a dia.' },
  ],
  focaccia: [
    { id: 'foc-herb',       name: 'Focaccia de Ervas',                price: 10, img: 'shop-img/foccacias-ervas.jpg', desc: 'Azeite, ervas frescas e flor de sal.' },
    { id: 'foc-rosolive',   name: 'Focaccia de Alecrim e Azeitona',   price: 10, img: 'shop-img/foccacias-azeitona.jpg', desc: 'Alecrim fresco e azeitonas inteiras.' },
    { id: 'foc-tompesto',   name: 'Focaccia de Tomate e Pesto',      price: 10, img: 'shop-img/foccacia-tomate-pesto.jpg', desc: 'Tomate maduro e pesto caseiro.' },
    { id: 'foc-chorolive',  name: 'Focaccia de Chorizo e Azeitona',  price: 10, img: 'shop-img/foccacia-chorizo-azeitona.jpg', desc: 'Chorizo fatiado com azeitonas.' },
    { id: 'foc-bluewalnut', name: 'Focaccia de Queijo Azul e Noz',   price: 10, img: 'shop-img/foccacia-queijo-azul-noz.jpg', desc: 'Queijo azul com nozes torradas.' },
    { id: 'sf-choc',        name: 'Focaccia Doce de Chocolate',       price: 10, img: 'shop-img/foccacia-chocolate.jpg', desc: 'Massa fofa com pedaços de chocolate.' },
    { id: 'sf-bancin',      name: 'Focaccia Doce de Banana e Canela', price: 10, img: 'shop-img/foccacia-banana-canela.jpg', desc: 'Banana caramelizada e canela.' },
    { id: 'sf-bannut',      name: 'Focaccia Doce de Banana e Nutella', price: 10, img: 'shop-img/foccacia-banana-nutella.jpg', desc: 'Banana com Nutella derretida.' },
    { id: 'sf-applecin',    name: 'Focaccia Doce de Maçã e Canela',   price: 10, img: 'shop-img/foccacia-maca-nutella.jpg', desc: 'Maçã salteada com canela.' },
  ],
  massas: [
    { id: 'pasta-small',      name: 'Massa Artesanal Pequena (500g)',  price: 6,  img: 'shop-img/massa-artesanal-p.jpg', desc: 'Formatos espiral e concha.' },
    { id: 'pasta-fettuccine', name: 'Fettuccine (500g)',               price: 5,  img: 'shop-img/fetucini.jpg', desc: 'Sabores limão, beterraba, espinafre ou natural.' },
    { id: 'gnocchi-trad',     name: 'Nhoque Tradicional (500g)',       price: 8,  img: 'shop-img/gnocchi.jpg', desc: 'Pré-cozido, pronto para saltear.' },
    { id: 'gnocchi-cheese',   name: 'Nhoque Recheado de Queijo (500g)',price: 14, img: 'shop-img/gnocchi-queijo.jpg', desc: 'Pré-cozido, recheio cremoso de queijo.' },
    { id: 'lasagne-beef',     name: 'Lasanha de Carne (1,7kg)',        price: 20, img: 'shop-img/lasanha.jpg', desc: 'Ingredientes frescos, pronta para o forno.' },
    { id: 'lasagne-veg',      name: 'Lasanha Vegetariana (1,7kg)',     price: 15, img: 'shop-img/lasanha-veg.jpg', desc: 'Ingredientes frescos, pronta para o forno.' },
  ],
  molhos: [
    { id: 'garlic-confit',    name: 'Confit de Alho',               price: 3,  img: 'shop-img/confit-alho.jpg', desc: 'Alho confitado lentamente em azeite.' },
    { id: 'chimichurri',      name: 'Chimichurri',                  price: 5,  img: 'shop-img/chimichurri.jpg', desc: 'Molho fresco de ervas, alho e vinagre.' },
    { id: 'caponata',         name: 'Caponata de Berinjela',        price: 4,  img: 'shop-img/caponata-berinjela.jpg', desc: 'Berinjela agridoce ao estilo siciliano.' },
    { id: 'peperonata',       name: 'Peperonata',                   price: 10, img: 'shop-img/peperonata.jpg', desc: 'Pimentões salteados em azeite e ervas.' },
    { id: 'tomato-sauce-s',   name: 'Molho de Tomate',              price: 4,  img: 'shop-img/molho-tomate.jpg', desc: 'Molho de tomate tradicional, base para massas.' },
    { id: 'brazil-chilli',    name: 'Pimenta Brasileira',           price: 4,  img: 'shop-img/pimenta-brasileira.jpg', desc: 'Molho de pimenta com toque brasileiro.' },
    { id: 'plum-merlot',      name: 'Compota de Ameixa com Merlot', price: 10, img: 'shop-img/compota-ameixa.jpg', desc: 'Compota encorpada de ameixa reduzida em Merlot.' },
    { id: 'pineapple-ginger', name: 'Compota de Abacaxi e Gengibre', price: 5,  img: 'shop-img/compota-ananas.jpg', desc: 'Doce e picante, ótima com queijos.' },
    { id: 'mango-passion',    name: 'Compota de Manga e Maracujá',  price: 5,  img: 'shop-img/compota-manga.jpg', desc: 'Sabor tropical de manga e maracujá.' },
    { id: 'chili-jam',        name: 'Compota de Pimenta',           price: 5,  img: 'shop-img/compota-pimenta.jpg', desc: 'Compota agridoce com pimenta.' },
    { id: 'tangerine-jam',    name: 'Compota de Tangerina',         price: 7,  img: 'shop-img/compota-tangerina.jpg', desc: 'Compota cítrica de tangerina.' },
    { id: 'tomato-sauce-600', name: 'Molho de Tomate (600g)',       price: 5,  img: 'shop-img/molho-tomate.jpg', desc: 'Frasco de 600g, ideal para a semana.' },
    { id: 'bolognese-600',    name: 'Molho Bolonhesa (600g)',       price: 8,  img: 'shop-img/molho-bolonhesa.jpg', desc: 'Molho de carne encorpado, frasco de 600g.' },
    { id: 'white-sauce-600',  name: 'Molho Branco (600g)',          price: 5,  img: 'shop-img/molho-branco.jpg', desc: 'Molho branco cremoso, frasco de 600g.' },
    { id: 'cassava-powder',   name: 'Farinha de Mandioca (400g)',   price: 5,  img: 'shop-img/farinha-mandioca.jpg', desc: 'Farinha torrada, produto local.' },
    { id: 'potato-sticks',    name: 'Batata Palha (200g)',          price: 3,  img: 'shop-img/batata-palha.jpg', desc: 'Crocante, ótima para acompanhar.' },
  ],
};

// Atribui a categoria a cada produto automaticamente (evita repetir o campo
// à mão em cada um dos ~30 produtos). Usado, por exemplo, nas abas da loja
// e nas sugestões do carrinho.
// NÃO apagar — isto tem de correr sempre que os produtos acima mudam.
Object.entries(PRODUCTS).forEach(([cat, lista]) => {
  lista.forEach(p => { p.categoria = cat; });
});

const PRODUCTS_EN = {
  'pao-chorizo': { name: 'Chorizo Bread', desc: 'Artisan dough filled with chorizo.' },
  'pao-parmesan': { name: 'Parmesan Bread', desc: 'Golden crust, soft crumb, parmesan.' },
  'pao-blue': { name: 'Blue Cheese Bread', desc: 'Bold blue cheese flavour.' },
  'pao-ciabatta': { name: 'Ciabatta', desc: 'Classic: crisp outside, airy inside.' },
  'pao-multigrain': { name: 'Multigrain Bread', desc: 'A blend of grains, dense and nutritious texture.', badge: 'Best seller' },
  'cinnamon-roll': { name: 'Cinnamon Roll', desc: 'Individual cinnamon roll.' },
  'soft-rolls': { name: 'Soft Rolls (8 pcs)', desc: 'Pack of 8, perfect for everyday.' },
  'foc-herb': { name: 'Herb Focaccia', desc: 'Olive oil, fresh herbs and flaky sea salt.' },
  'foc-rosolive': { name: 'Rosemary & Olive Focaccia', desc: 'Fresh rosemary and whole olives.' },
  'foc-tompesto': { name: 'Tomato & Pesto Focaccia', desc: 'Ripe tomato and homemade pesto.' },
  'foc-chorolive': { name: 'Chorizo & Olive Focaccia', desc: 'Sliced chorizo with olives.' },
  'foc-bluewalnut': { name: 'Blue Cheese & Walnut Focaccia', desc: 'Blue cheese with toasted walnuts.' },
  'sf-choc': { name: 'Sweet Chocolate Focaccia', desc: 'Fluffy dough with chocolate chunks.' },
  'sf-bancin': { name: 'Sweet Banana & Cinnamon Focaccia', desc: 'Caramelised banana and cinnamon.' },
  'sf-bannut': { name: 'Sweet Banana & Nutella Focaccia', desc: 'Banana with melted Nutella.' },
  'sf-applecin': { name: 'Sweet Apple & Cinnamon Focaccia', desc: 'Sautéed apple with cinnamon.' },
  'pasta-small': { name: 'Small Artisan Pasta (500g)', desc: 'Spiral and shell shapes.' },
  'pasta-fettuccine': { name: 'Fettuccine (500g)', desc: 'Flavours: lemon, beetroot, spinach or plain.' },
  'gnocchi-trad': { name: 'Traditional Gnocchi (500g)', desc: 'Pre-cooked, ready to sauté.' },
  'gnocchi-cheese': { name: 'Cheese-Filled Gnocchi (500g)', desc: 'Pre-cooked, creamy cheese filling.' },
  'lasagne-beef': { name: 'Beef Lasagna (1.7kg)', desc: 'Fresh ingredients, ready for the oven.' },
  'lasagne-veg': { name: 'Vegetarian Lasagna (1.7kg)', desc: 'Fresh ingredients, ready for the oven.' },
  'garlic-confit': { name: 'Garlic Confit', desc: 'Garlic slowly confited in olive oil.' },
  'chimichurri': { name: 'Chimichurri', desc: 'Fresh sauce of herbs, garlic and vinegar.' },
  'caponata': { name: 'Eggplant Caponata', desc: 'Sweet-and-sour eggplant, Sicilian style.' },
  'peperonata': { name: 'Peperonata', desc: 'Peppers sautéed in olive oil and herbs.' },
  'tomato-sauce-s': { name: 'Tomato Sauce', desc: 'Traditional tomato sauce, a base for pasta.' },
  'brazil-chilli': { name: 'Brazilian Chilli Sauce', desc: 'Chilli sauce with a Brazilian twist.' },
  'plum-merlot': { name: 'Plum & Merlot Preserve', desc: 'Rich plum preserve reduced in Merlot.' },
  'pineapple-ginger': { name: 'Pineapple & Ginger Preserve', desc: 'Sweet and spicy, great with cheese.' },
  'mango-passion': { name: 'Mango & Passion Fruit Preserve', desc: 'Tropical flavour of mango and passion fruit.' },
  'chili-jam': { name: 'Chilli Jam', desc: 'Sweet-and-sour jam with chilli.' },
  'tangerine-jam': { name: 'Tangerine Preserve', desc: 'Citrusy tangerine preserve.' },
  'tomato-sauce-600': { name: 'Tomato Sauce (600g)', desc: 'A 600g jar, ideal for the week.' },
  'bolognese-600': { name: 'Bolognese Sauce (600g)', desc: 'Rich meat sauce, 600g jar.' },
  'white-sauce-600': { name: 'White Sauce (600g)', desc: 'Creamy white sauce, 600g jar.' },
  'cassava-powder': { name: 'Cassava Flour (400g)', desc: 'Toasted flour, a local product.' },
  'potato-sticks': { name: 'Potato Sticks (200g)', desc: 'Crunchy, great as a side.' },
};
