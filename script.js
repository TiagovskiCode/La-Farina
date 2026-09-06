/* =============================================================
   LA FARINA — script.js
   Índice:
     1. Dados dos produtos (loja)
     2. Estado do carrinho
     3. Renderização da loja
     4. Lógica do carrinho (adicionar, remover, quantidades)
     5. Painel do carrinho (abrir/fechar)
     6. Checkout via WhatsApp
     7. Menu mobile
     8. Barra do carrinho x footer
     9. Subscrição semanal
   ============================================================= */

/* ---------- 1. DADOS DOS PRODUTOS ---------- */
const CATEGORY_LABELS = {
  pao: 'Pão',
  focaccia: 'Focaccias',
  massas: 'Massas Frescas',
  molhos: 'Molhos & Conservas',
};

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
Object.entries(PRODUCTS).forEach(([cat, lista]) => {
  lista.forEach(p => { p.categoria = cat; });
});

// Rótulos do corte, usados na etiqueta do carrinho e na mensagem do WhatsApp
const CORTE_LABELS = { inteiro: 'Inteiro', fatiado: 'Fatiado' };

const WHATSAPP_NUMBER = '67077467853'; // TODO: confirmar número

function money(n){ return '$' + n.toFixed(2).replace(/\.00$/, ''); }

// Planos de subscrição semanal, usados na secção "assinaturas" da loja
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

/* ---------- 2. ESTADO DO CARRINHO ---------- */
// carregado do localStorage para o carrinho sobreviver entre páginas
let cart = {};
try{
  cart = JSON.parse(localStorage.getItem('lafarina-cart') || '{}');
}catch(e){
  cart = {};
}

function guardarCarrinho(){
  localStorage.setItem('lafarina-cart', JSON.stringify(cart));
}

function encontrarProduto(id){
  for (const cat in PRODUCTS){
    const p = PRODUCTS[cat].find(item => item.id === id);
    if (p) return p;
  }
  return null;
}

/**
 * O carrinho pode guardar variantes do mesmo produto (ex: pão inteiro vs
 * fatiado) usando uma "chave composta" no formato "id::corte". Estas duas
 * funções separam a chave nas suas duas partes.
 */
function idBase(chave){
  return chave.split('::')[0];
}
function corteDeChave(chave){
  const partes = chave.split('::');
  return partes.length > 1 ? partes[1] : null;
}

/** Nome do produto com o corte anexado, quando aplicável (ex: "Ciabatta (Fatiado)") */
function nomeComCorte(p, corte){
  return corte ? `${p.name} (${CORTE_LABELS[corte]})` : p.name;
}

// Migração: carrinhos guardados antes desta funcionalidade tinham o pão
// guardado só com o id simples (sem corte). Ao carregar, migramos essas
// entradas para "id::inteiro", que passa a ser o valor por omissão.
Object.keys(cart).forEach(chave => {
  if (!chave.includes('::')){
    const p = encontrarProduto(chave);
    if (p && p.categoria === 'pao'){
      const novaChave = `${chave}::inteiro`;
      cart[novaChave] = (cart[novaChave] || 0) + cart[chave];
      delete cart[chave];
    }
  }
});
guardarCarrinho();

/* ---------- 3. RENDERIZAÇÃO DA LOJA (só existe em shop.html) ---------- */
const grid = document.getElementById('productGrid');
const tabs = document.querySelectorAll('.tab');

function criarCardHTML(p, i){
  return `
    <article class="card produto-card" style="animation-delay:${i * 0.04}s">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="card-top">
        <h3 class="card-name">${p.name}</h3>
        <span class="card-price">${money(p.price)}</span>
      </div>
      <p class="card-desc">${p.desc || ''}</p>
      ${criarAreaProdutoHTML(p)}
    </article>
  `;
}

// Guarda, por produto, qual o corte escolhido AGORA na loja (não é o
// carrinho em si — é só a opção selecionada antes de clicar "Adicionar").
// Só é relevante para produtos da categoria "pao".
const corteEscolhido = {};

function corteAtualDoProduto(p){
  if (p.categoria !== 'pao') return null;
  return corteEscolhido[p.id] || 'inteiro';
}

/** Devolve a chave usada no objeto `cart` para este produto, já com o corte incluído quando aplicável */
function chaveCarrinho(p){
  const corte = corteAtualDoProduto(p);
  return corte ? `${p.id}::${corte}` : p.id;
}

/**
 * Área completa de um produto no card: o seletor de corte (só para pão)
 * + o controlo de quantidade correspondente à opção selecionada.
 */
function criarAreaProdutoHTML(p){
  const seletor = p.categoria === 'pao' ? criarSeletorCorteHTML(p) : '';
  return `
    <div class="produto-area" data-produto="${p.id}">
      ${seletor}
      ${criarControloHTML(p)}
    </div>
  `;
}

/** Seletor "Inteiro / Fatiado" — só aparece nos produtos da categoria pão */
function criarSeletorCorteHTML(p){
  const corte = corteAtualDoProduto(p);
  return `
    <div class="produto-corte" role="group" aria-label="Escolher corte de ${p.name}">
      <button class="corte-btn ${corte === 'inteiro' ? 'ativo' : ''}" data-produto="${p.id}" data-corte="inteiro" type="button">Inteiro</button>
      <button class="corte-btn ${corte === 'fatiado' ? 'ativo' : ''}" data-produto="${p.id}" data-corte="fatiado" type="button">Fatiado</button>
    </div>
  `;
}

/**
 * Devolve o HTML do controlo de quantidade de um produto (considerando já
 * o corte selecionado, quando aplicável), consoante o estado do carrinho:
 *  - qty === 0 -> botao "Adicionar"
 *  - qty > 0   -> stepper "- qty +" (permite ajustar sem sair do card)
 */
function criarControloHTML(p){
  const chave = chaveCarrinho(p);
  const qty = cart[chave] || 0;

  if (qty > 0){
    return `
      <div class="produto-controlo produto-controlo--ativo" data-id="${chave}">
        <button class="produto-qty-btn" data-id="${chave}" data-delta="-1" type="button" aria-label="Diminuir quantidade de ${p.name}">−</button>
        <span class="produto-qty-valor">${qty}</span>
        <button class="produto-qty-btn" data-id="${chave}" data-delta="1" type="button" aria-label="Aumentar quantidade de ${p.name}">+</button>
      </div>
    `;
  }

  return `
    <div class="produto-controlo" data-id="${chave}">
      <button class="button button--sm produto-add" data-id="${chave}" type="button">Adicionar</button>
    </div>
  `;
}

/**
 * Liga os eventos de clique de uma área de produto completa: o seletor de
 * corte (se existir) e o controlo de quantidade (Adicionar / stepper).
 */
function ligarAreaProduto(areaEl){
  if (!areaEl) return;

  areaEl.querySelectorAll('.corte-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      corteEscolhido[btn.dataset.produto] = btn.dataset.corte;
      atualizarAreaProduto(btn.dataset.produto, false);
    });
  });

  const btnAdd = areaEl.querySelector('.produto-add');
  if (btnAdd){
    btnAdd.addEventListener('click', () => adicionarAoCarrinho(btnAdd.dataset.id));
  }

  areaEl.querySelectorAll('.produto-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => alterarQuantidade(btn.dataset.id, Number(btn.dataset.delta)));
  });
}

/**
 * Substitui, no DOM, a área inteira de UM produto (seletor de corte +
 * controlo de quantidade) — evita re-renderizar a grelha toda a cada
 * clique (o que reiniciaria as animacoes de entrada e faria a grelha
 * "saltar"). Chamada sempre que o corte OU a quantidade mudam.
 */
function atualizarAreaProduto(produtoId, comPulso){
  if (!grid) return;
  const areaAtual = grid.querySelector(`.produto-area[data-produto="${produtoId}"]`);
  if (!areaAtual) return;

  const p = encontrarProduto(produtoId);
  if (!p) return;

  areaAtual.outerHTML = criarAreaProdutoHTML(p);
  const areaNova = grid.querySelector(`.produto-area[data-produto="${produtoId}"]`);
  ligarAreaProduto(areaNova);

  if (comPulso && areaNova){
    const controloNovo = areaNova.querySelector('.produto-controlo--ativo');
    if (controloNovo){
      controloNovo.classList.add('pulso');
      controloNovo.addEventListener('animationend', () => controloNovo.classList.remove('pulso'), { once: true });
    }
  }
}

function renderCategoria(cat){
  if (!grid) return;

  if (cat === 'todos'){
    grid.classList.add('product-grid--todos');
    const todosOsProdutos = Object.values(PRODUCTS).flat();
    grid.innerHTML = todosOsProdutos.map((p, i) => criarCardHTML(p, i)).join('');
  } else {
    grid.classList.remove('product-grid--todos');
    grid.innerHTML = PRODUCTS[cat].map((p, i) => criarCardHTML(p, i)).join('');
  }

  grid.querySelectorAll('.produto-area').forEach(areaEl => ligarAreaProduto(areaEl));
}

if (tabs.length){
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderCategoria(tab.dataset.cat);
    });
  });
  renderCategoria('todos');
}

/* ---------- 4. LÓGICA DO CARRINHO ---------- */
function adicionarAoCarrinho(chave){
  cart[chave] = (cart[chave] || 0) + 1;
  guardarCarrinho();
  atualizarInterfaceCarrinho();
  atualizarAreaProduto(idBase(chave), true); // true = mostra o pulso de feedback ao passar de 0 para 1
}

function alterarQuantidade(chave, delta){
  if (!cart[chave]) return;
  cart[chave] += delta;
  if (cart[chave] <= 0) delete cart[chave];
  guardarCarrinho();
  atualizarInterfaceCarrinho();
  atualizarAreaProduto(idBase(chave), false); // mantém o card da loja sincronizado com o painel lateral
}

function totalItens(){
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function totalPreco(){
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = encontrarProduto(idBase(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function atualizarInterfaceCarrinho(){
  const items = totalItens();
  const preco = totalPreco();

  // barra fixa no fundo (shop.html)
  const cartBar = document.getElementById('cartBar');
  const cartSummary = document.getElementById('cartSummary');
  if (cartBar && cartSummary){
    if (items > 0){
      cartSummary.textContent = `${items} ${items === 1 ? 'item' : 'itens'} · ${money(preco)}`;
      cartBar.classList.add('visible');
    } else {
      cartBar.classList.remove('visible');
    }
  }

  // contador no header (todas as páginas)
  const contadorTopo = document.getElementById('contadorTopo');
  if (contadorTopo) contadorTopo.textContent = items;

  // total no painel
  const cartTotal = document.getElementById('cartTotal');
  if (cartTotal) cartTotal.textContent = money(preco);

  renderizarListaCarrinho();
}

function renderizarListaCarrinho(){
  const lista = document.getElementById('cartLista');
  if (!lista) return;

  const entries = Object.entries(cart);
  if (entries.length === 0){
    lista.innerHTML = '<p class="cart-vazio">O teu carrinho está vazio. Vai à loja e adiciona os teus favoritos!</p>';
    return;
  }

  lista.innerHTML = entries.map(([id, qty]) => {
    const p = encontrarProduto(idBase(id));
    if (!p) return '';
    const corte = corteDeChave(id);
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-nome">${nomeComCorte(p, corte)}</span>
          <span class="cart-item-preco">${money(p.price)}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-id="${id}" data-delta="-1" type="button" aria-label="Diminuir">−</button>
          <span>${qty}</span>
          <button class="qty-btn" data-id="${id}" data-delta="1" type="button" aria-label="Aumentar">+</button>
        </div>
      </div>
    `;
  }).join('');

  lista.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => alterarQuantidade(btn.dataset.id, Number(btn.dataset.delta)));
  });
}

/* ---------- 5. PAINEL DO CARRINHO ---------- */
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');

// Categorias que fazem bom par com cada categoria já presente no carrinho
// (ex: quem leva massa, é natural sugerir um molho para acompanhar).
const CATEGORIAS_COMPLEMENTARES = {
  pao: ['molhos'],
  focaccia: ['molhos'],
  massas: ['molhos'],
  molhos: ['massas', 'pao'],
};

/** Baralha um array sem alterar o original (Fisher-Yates) */
function baralhar(array){
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Escolhe até `maxItens` produtos para recomendar no carrinho, com base
 * nas categorias já presentes (ex: massas -> sugere molhos). Nunca sugere
 * um produto que já esteja no carrinho.
 */
function obterRecomendacoes(maxItens){
  const idsNoCarrinho = new Set(Object.keys(cart).map(idBase));

  const categoriasNoCarrinho = new Set();
  idsNoCarrinho.forEach(id => {
    const p = encontrarProduto(id);
    if (p) categoriasNoCarrinho.add(p.categoria);
  });

  const categoriasAlvo = new Set();
  categoriasNoCarrinho.forEach(cat => {
    (CATEGORIAS_COMPLEMENTARES[cat] || []).forEach(c => categoriasAlvo.add(c));
  });

  let candidatos = [];
  categoriasAlvo.forEach(cat => candidatos.push(...(PRODUCTS[cat] || [])));
  candidatos = candidatos.filter(p => !idsNoCarrinho.has(p.id));

  // Sem categorias complementares (ou já tudo adicionado) -> sugere de todo o catálogo
  if (candidatos.length === 0){
    candidatos = Object.values(PRODUCTS).flat().filter(p => !idsNoCarrinho.has(p.id));
  }

  return baralhar(candidatos).slice(0, maxItens);
}

/**
 * Desenha o bloco "Também podes gostar" dentro do painel do carrinho.
 * Só aparece quando há pelo menos 1 item no carrinho.
 */
function renderizarRecomendacoes(){
  const bloco = document.getElementById('cartRecomendacoes');
  if (!bloco) return;

  if (Object.keys(cart).length === 0){
    bloco.classList.remove('visible');
    bloco.innerHTML = '';
    return;
  }

  const recomendados = obterRecomendacoes(3);
  if (recomendados.length === 0){
    bloco.classList.remove('visible');
    bloco.innerHTML = '';
    return;
  }

  bloco.classList.add('visible');
  bloco.innerHTML = `
    <h3 class="cart-recomendacoes-titulo">Também podes gostar</h3>
    <div class="cart-recomendacoes-lista">
      ${recomendados.map(p => `
        <div class="recomendacao-item">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <div class="recomendacao-info">
            <span class="recomendacao-nome">${p.name}</span>
            <span class="recomendacao-preco">${money(p.price)}</span>
          </div>
          <button class="recomendacao-add" data-id="${p.id}" type="button" aria-label="Adicionar ${p.name} ao carrinho">+</button>
        </div>
      `).join('')}
    </div>
  `;

  bloco.querySelectorAll('.recomendacao-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = encontrarProduto(btn.dataset.id);
      if (!p) return;
      // pão recomendado entra sempre como "Inteiro" por omissão
      const chave = p.categoria === 'pao' ? `${p.id}::inteiro` : p.id;
      adicionarAoCarrinho(chave);
      renderizarRecomendacoes(); // já não sugere o mesmo produto outra vez
    });
  });
}

function abrirCarrinho(){
  if (!cartPanel) return;
  cartPanel.classList.add('open');
  cartOverlay.classList.add('visible');
  renderizarRecomendacoes(); // recalcula as sugestões sempre que o carrinho abre
}
function fecharCarrinho(){
  if (!cartPanel) return;
  cartPanel.classList.remove('open');
  cartOverlay.classList.remove('visible');
}

document.getElementById('cartAbrirBtn')?.addEventListener('click', abrirCarrinho);
document.getElementById('abrirCarrinhoTopo')?.addEventListener('click', abrirCarrinho);
document.getElementById('cartFecharBtn')?.addEventListener('click', fecharCarrinho);
cartOverlay?.addEventListener('click', fecharCarrinho);

/* ---------- 6. CHECKOUT VIA WHATSAPP ---------- */
document.getElementById('cartCheckout')?.addEventListener('click', () => {
  const entries = Object.entries(cart);
  if (entries.length === 0) return;

  const linhas = entries.map(([id, qty]) => {
    const p = encontrarProduto(idBase(id));
    const corte = corteDeChave(id);
    return p ? `• ${qty}x ${nomeComCorte(p, corte)} — ${money(p.price * qty)}` : '';
  });

  const mensagem = [
    'Olá! Gostaria de fazer uma encomenda na La Farina:',
    '',
    ...linhas,
    '',
    `Total: ${money(totalPreco())}`,
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`, '_blank');
});

/* ---------- 7. MENU MOBILE ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav){
  const fecharMenuMobile = () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const aberto = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', aberto);
    navToggle.setAttribute('aria-expanded', String(aberto));
  });

  // fecha o menu assim que se escolhe uma página
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', fecharMenuMobile);
  });
}

/* ---------- INIT ---------- */
atualizarInterfaceCarrinho();

/* ---------- 8. BARRA DO CARRINHO x FOOTER ---------- */
// esconde a cart-bar assim que o footer entra em vista, para nunca sobrepor
const cartBarEl = document.getElementById('cartBar');
const footerEl = document.querySelector('.main-footer');
if (cartBarEl && footerEl && 'IntersectionObserver' in window){
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      cartBarEl.classList.toggle('perto-footer', entry.isIntersecting);
    });
  }, { threshold: 0 });
  footerObserver.observe(footerEl);
}

/* ---------- 9. SUBSCRIÇÃO SEMANAL ---------- */

/** HTML de um card de plano de subscrição */
function criarAssinaturaHTML(sub){
  return `
    <div class="assinatura-card ${sub.destaque ? 'assinatura-card--destaque' : ''}">
      ${sub.destaque ? '<span class="assinatura-badge">Mais popular</span>' : ''}
      <h3>${sub.nome}</h3>
      <p class="assinatura-desc">${sub.desc}</p>
      <div class="assinatura-preco">${money(sub.preco)}<span>/semana</span></div>
      <ul class="assinatura-lista">
        ${sub.itens.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button class="button ${sub.destaque ? 'button--accent' : ''} assinatura-btn" data-id="${sub.id}" type="button">Subscrever</button>
    </div>
  `;
}

/**
 * Desenha os planos de subscrição na loja e liga o botão "Subscrever" a
 * uma mensagem de WhatsApp pré-formatada (não há pagamento recorrente
 * automático — a Nélia/Verônica combinam os detalhes e o pagamento
 * diretamente com o cliente, tal como as encomendas normais).
 */
function renderizarAssinaturas(){
  const grid = document.getElementById('assinaturasGrid');
  if (!grid) return;

  grid.innerHTML = SUBSCRIPTIONS.map(criarAssinaturaHTML).join('');

  grid.querySelectorAll('.assinatura-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = SUBSCRIPTIONS.find(s => s.id === btn.dataset.id);
      if (!sub) return;

      const mensagem = [
        `Olá! Quero subscrever a "${sub.nome}" (${money(sub.preco)}/semana) na La Farina.`,
        '',
        'Inclui:',
        ...sub.itens.map(item => `• ${item}`),
        '',
        'Podem confirmar-me o dia de entrega e como funciona o pagamento semanal?',
      ].join('\n');

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`, '_blank');
    });
  });
}

renderizarAssinaturas();