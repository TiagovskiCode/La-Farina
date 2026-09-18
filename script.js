const CORTE_LABELS = { inteiro: 'Inteiro', fatiado: 'Fatiado' };

const WHATSAPP_NUMBER = '67077192888';

function money(n){ return '$' + n.toFixed(2).replace(/\.00$/, ''); }

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

function idBase(chave){
  return chave.split('::')[0];
}
function corteDeChave(chave){
  const partes = chave.split('::');
  return partes.length > 1 ? partes[1] : null;
}

function nomeComCorte(p, corte){
  return corte ? `${p.name} (${CORTE_LABELS[corte]})` : p.name;
}

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

const corteEscolhido = {};

function corteAtualDoProduto(p){
  if (p.categoria !== 'pao') return null;
  return corteEscolhido[p.id] || 'inteiro';
}

function chaveCarrinho(p){
  const corte = corteAtualDoProduto(p);
  return corte ? `${p.id}::${corte}` : p.id;
}

function criarAreaProdutoHTML(p){
  const seletor = p.categoria === 'pao' ? criarSeletorCorteHTML(p) : '';
  return `
    <div class="produto-area" data-produto="${p.id}">
      ${seletor}
      ${criarControloHTML(p)}
    </div>
  `;
}

function criarSeletorCorteHTML(p){
  const corte = corteAtualDoProduto(p);
  return `
    <div class="produto-corte" role="group" aria-label="Escolher corte de ${p.name}">
      <button class="corte-btn ${corte === 'inteiro' ? 'ativo' : ''}" data-produto="${p.id}" data-corte="inteiro" type="button">Inteiro</button>
      <button class="corte-btn ${corte === 'fatiado' ? 'ativo' : ''}" data-produto="${p.id}" data-corte="fatiado" type="button">Fatiado</button>
    </div>
  `;
}

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

function adicionarAoCarrinho(chave){
  cart[chave] = (cart[chave] || 0) + 1;
  guardarCarrinho();
  atualizarInterfaceCarrinho();
  atualizarAreaProduto(idBase(chave), true);
}

function alterarQuantidade(chave, delta){
  if (!cart[chave]) return;
  cart[chave] += delta;
  if (cart[chave] <= 0) delete cart[chave];
  guardarCarrinho();
  atualizarInterfaceCarrinho();
  atualizarAreaProduto(idBase(chave), false);
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

  const contadorTopo = document.getElementById('contadorTopo');
  if (contadorTopo) contadorTopo.textContent = items;

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

const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');

const CATEGORIAS_COMPLEMENTARES = {
  pao: ['molhos'],
  focaccia: ['molhos'],
  massas: ['molhos'],
  molhos: ['massas', 'pao'],
};

function baralhar(array){
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

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

  if (candidatos.length === 0){
    candidatos = Object.values(PRODUCTS).flat().filter(p => !idsNoCarrinho.has(p.id));
  }

  return baralhar(candidatos).slice(0, maxItens);
}

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
      const chave = p.categoria === 'pao' ? `${p.id}::inteiro` : p.id;
      adicionarAoCarrinho(chave);
      renderizarRecomendacoes();
    });
  });
}

function abrirCarrinho(){
  if (!cartPanel) return;
  cartPanel.classList.add('open');
  cartOverlay.classList.add('visible');
  renderizarRecomendacoes();
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

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', fecharMenuMobile);
  });
}

atualizarInterfaceCarrinho();

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