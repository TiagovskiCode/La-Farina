// =========================================================
// LA FARINA — dados dos produtos
// Edita aqui para adicionar / alterar produtos e preços.
// =========================================================
const PRODUCTS = {
  pao: [
    { id: 'pao-chorizo',    name: 'Pão de Chorizo',        price: 6, desc: 'Massa artesanal recheada com chorizo.' },
    { id: 'pao-parmesan',   name: 'Pão de Parmesão',       price: 6, desc: 'Crosta dourada, miolo macio, parmesão.' },
    { id: 'pao-blue',       name: 'Pão de Queijo Azul',    price: 6, desc: 'Sabor intenso de queijo azul.' },
    { id: 'pao-ciabatta',   name: 'Ciabatta',              price: 4, desc: 'Clássica, crocante por fora, alveolada por dentro.' },
    { id: 'pao-multigrain', name: 'Pão Multigrãos',        price: 8, badge: 'Mais vendido', desc: 'Mistura de grãos, textura densa e nutritiva.' },
  ],
  focaccia: [
    { id: 'foc-herb',    name: 'Focaccia de Ervas',              price: 10, desc: 'Azeite, ervas frescas e flor de sal.' },
    { id: 'foc-rosolive',name: 'Focaccia de Alecrim e Azeitona',  price: 10, desc: 'Alecrim fresco e azeitonas inteiras.' },
    { id: 'foc-tompesto',name: 'Focaccia de Tomate e Pesto',      price: 10, desc: 'Tomate maduro e pesto caseiro.' },
    { id: 'foc-chorolive',name:'Focaccia de Chorizo e Azeitona',  price: 10, desc: 'Chorizo fatiado com azeitonas.' },
    { id: 'foc-bluewalnut',name:'Focaccia de Queijo Azul e Noz',  price: 10, desc: 'Queijo azul com nozes torradas.' },
  ],
  doces: [
    { id: 'sf-choc',    name: 'Focaccia Doce de Chocolate',        price: 10, desc: 'Massa fofa com pedaços de chocolate.' },
    { id: 'sf-bancin',  name: 'Focaccia Doce de Banana e Canela',  price: 10, desc: 'Banana caramelizada e canela.' },
    { id: 'sf-bannut',  name: 'Focaccia Doce de Banana e Nutella', price: 10, desc: 'Banana com Nutella derretida.' },
    { id: 'sf-applecin',name: 'Focaccia Doce de Maçã e Canela',    price: 10, desc: 'Maçã salteada com canela.' },
    { id: 'cinnamon-roll', name: 'Cinnamon Roll',                  price: 2,  desc: 'Rolinho de canela individual.' },
    { id: 'soft-rolls', name: 'Pãezinhos Macios (8un)',            price: 6,  desc: 'Pacote com 8 unidades, ideais para o dia a dia.' },
  ],
  molhos: [
    { id: 'garlic-confit', name: 'Confit de Alho',              price: 3 },
    { id: 'chimichurri',   name: 'Chimichurri',                 price: 5 },
    { id: 'caponata',      name: 'Caponata de Beringela',       price: 4 },
    { id: 'peperonata',    name: 'Peperonata',                  price: 10 },
    { id: 'tomato-sauce-s',name: 'Molho de Tomate',              price: 4 },
    { id: 'brazil-chilli', name: 'Pimenta Brasileira',          price: 4 },
    { id: 'plum-merlot',   name: 'Compota de Ameixa com Merlot',price: 10 },
    { id: 'pineapple-ginger', name: 'Compota de Ananás e Gengibre', price: 5 },
    { id: 'mango-passion', name: 'Compota de Manga e Maracujá', price: 5 },
    { id: 'chili-jam',     name: 'Compota de Pimenta',          price: 5 },
    { id: 'tangerine-jam', name: 'Compota de Tangerina',        price: 7 },
    { id: 'tomato-sauce-600', name: 'Molho de Tomate (600g)',    price: 5 },
    { id: 'bolognese-600', name: 'Molho Bolonhesa (600g)',      price: 8 },
    { id: 'white-sauce-600', name: 'Molho Branco (600g)',       price: 5 },
    { id: 'cassava-powder',name: 'Farinha de Mandioca (400g)',  price: 5 },
    { id: 'potato-sticks', name: 'Batata Palha (200g)',         price: 3 },
  ],
  massas: [
    { id: 'pasta-small',   name: 'Massa Artesanal Pequena (500g)', price: 6,  desc: 'Formatos espiral e concha.' },
    { id: 'pasta-fettuccine', name: 'Fettuccine (500g)',           price: 5,  desc: 'Sabores limão, beterraba, espinafre ou natural.' },
    { id: 'gnocchi-trad',  name: 'Nhoque Tradicional (500g)',       price: 8,  desc: 'Pré-cozido, pronto a saltear.' },
    { id: 'gnocchi-cheese',name: 'Nhoque Recheado de Queijo (500g)',price: 14, desc: 'Pré-cozido, recheio cremoso de queijo.' },
    { id: 'lasagne-beef',  name: 'Lasanha de Carne (1,7kg)',        price: 20, desc: 'Ingredientes frescos, pronta para o forno.' },
    { id: 'lasagne-veg',   name: 'Lasanha Vegetariana (1,7kg)',     price: 15, desc: 'Ingredientes frescos, pronta para o forno.' },
  ],
};

const CATEGORY_LABELS = {
  pao: 'Pão', focaccia: 'Focaccias', doces: 'Doces & Rolls',
  molhos: 'Molhos & Conservas', massas: 'Massas Artesanais',
};

// =========================================================
// STATE
// =========================================================
const cart = {}; // id -> { name, price, qty }
const grid = document.getElementById('productGrid');
const tabs = document.querySelectorAll('.tab');
const cartBar = document.getElementById('cartBar');
const cartSummary = document.getElementById('cartSummary');

function money(n){ return '$' + n.toFixed(2).replace(/\.00$/, ''); }

function renderCategory(cat){
  grid.innerHTML = '';
  PRODUCTS[cat].forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML = `
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      <div class="card-top">
        <h3 class="card-name">${p.name}</h3>
        <span class="card-price">${money(p.price)}</span>
      </div>
      ${p.desc ? `<p class="card-desc">${p.desc}</p>` : '<p class="card-desc"></p>'}
      <button class="card-add" data-id="${p.id}">Adicionar</button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.card-add').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id, cat, btn));
  });
}

function addToCart(id, cat, btn){
  const product = PRODUCTS[cat].find(p => p.id === id);
  if (!product) return;
  if (!cart[id]) cart[id] = { name: product.name, price: product.price, qty: 0 };
  cart[id].qty += 1;
  updateCartBar();
  btn.textContent = 'Adicionado ✓';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = 'Adicionar'; btn.classList.remove('added'); }, 900);
}

function updateCartBar(){
  const totalItems = Object.values(cart).reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = Object.values(cart).reduce((sum, i) => sum + i.qty * i.price, 0);
  if (totalItems > 0){
    cartSummary.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'} · ${money(totalPrice)}`;
    cartBar.classList.add('visible');
  } else {
    cartBar.classList.remove('visible');
  }
}

document.getElementById('cartCheckout').addEventListener('click', () => {
  const lines = Object.values(cart).map(i => `• ${i.qty}x ${i.name} — ${money(i.qty * i.price)}`);
  const total = Object.values(cart).reduce((sum, i) => sum + i.qty * i.price, 0);
  const message = [
    'Olá! Gostaria de fazer uma encomenda na La Farina:',
    '',
    ...lines,
    '',
    `Total: ${money(total)}`,
  ].join('\n');
  window.open(`https://wa.me/67077467853?text=${encodeURIComponent(message)}`, '_blank');
});

// tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderCategory(tab.dataset.cat);
  });
});

// mobile nav
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// scroll reveal — usa unobserve() para evitar o bug de elementos que desaparecem
const revealTargets = document.querySelectorAll('.card, .order-step, .portrait-card');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  // aplicado dinamicamente após cada render, ver renderCategory acima
}

// init
renderCategory('pao');
