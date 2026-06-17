const EMOJIS = {
  Smartphones:'📱', Laptop:'💻', TV:'📺',
  Audio:'🎧', Camera:'📷', Gaming:'🎮',
  Accessories:'🔌', Tablets:'📟'
};

let products = [
  { id:1,  name:'iPhone 13 Pro 128GB', cat:'Smartphones', cond:'Like New', price:55000, orig:105000, seller:'Ram Sharma', loc:'Kathmandu', badge:'HOT', rating:4.8, reviews:23 },
  { id:2,  name:'Samsung Galaxy S22 Ultra', cat:'Smartphones', cond:'Good', price:48000, orig:95000, seller:'Sita Devi', loc:'Pokhara', badge:'', rating:4.6, reviews:15 },
  { id:3,  name:'MacBook Air M1 8GB 256GB', cat:'Laptop', cond:'Like New', price:85000, orig:140000, seller:'Bikash Rai', loc:'Butwal', badge:'HOT', rating:4.9, reviews:31 },
  { id:4,  name:'Dell XPS 15 i7 16GB', cat:'Laptop', cond:'Good', price:70000, orig:130000, seller:'Hari Karki', loc:'Lalitpur', badge:'', rating:4.5, reviews:9 },
  { id:5,  name:'Sony 55" 4K OLED Smart TV', cat:'TV', cond:'Good', price:62000, orig:120000, seller:'Gita Poudel', loc:'Chitwan', badge:'SALE', rating:4.7, reviews:12 },
  { id:6,  name:'Sony WH-1000XM4 Headphones', cat:'Audio', cond:'Like New', price:18000, orig:38000, seller:'Arun Thapa', loc:'Biratnagar', badge:'', rating:4.8, reviews:18 },
  { id:7,  name:'Canon EOS 90D DSLR', cat:'Camera', cond:'Good', price:75000, orig:130000, seller:'Priya Limbu', loc:'Dharan', badge:'', rating:4.6, reviews:7 },
  { id:8,  name:'PlayStation 5 Console', cat:'Gaming', cond:'Like New', price:65000, orig:85000, seller:'Suraj Magar', loc:'Kathmandu', badge:'HOT', rating:4.9, reviews:42 },
  { id:9,  name:'Samsung Galaxy Tab S8', cat:'Tablets', cond:'Good', price:35000, orig:65000, seller:'Nisha Gurung', loc:'Pokhara', badge:'', rating:4.5, reviews:11 },
  { id:10, name:'Realme GT Neo 5 256GB', cat:'Smartphones', cond:'Like New', price:32000, orig:55000, seller:'Deep Shrestha', loc:'Butwal', badge:'SALE', rating:4.4, reviews:8 },
  { id:11, name:'Lenovo ThinkPad X1 Carbon', cat:'Laptop', cond:'Fair', price:55000, orig:110000, seller:'Kumar KC', loc:'Lalitpur', badge:'', rating:4.3, reviews:5 },
  { id:12, name:'Apple AirPods Pro 2nd Gen', cat:'Audio', cond:'Like New', price:16000, orig:30000, seller:'Mina Tamang', loc:'Kathmandu', badge:'', rating:4.7, reviews:29 },
  { id:13, name:'GoPro Hero 11 Black', cat:'Camera', cond:'Good', price:28000, orig:55000, seller:'Raj Bist', loc:'Nepalgunj', badge:'SALE', rating:4.6, reviews:14 },
  { id:14, name:'Nintendo Switch OLED', cat:'Gaming', cond:'Good', price:38000, orig:58000, seller:'Pradeep Oli', loc:'Pokhara', badge:'', rating:4.5, reviews:19 },
  { id:15, name:'Xiaomi Mi 13 Pro 256GB', cat:'Smartphones', cond:'Good', price:42000, orig:75000, seller:'Anita Bhatt', loc:'Dhangadhi', badge:'', rating:4.4, reviews:6 },
  { id:16, name:'USB-C Fast Charge Hub 7-in-1', cat:'Accessories', cond:'Like New', price:2500, orig:5000, seller:'Tech Store NP', loc:'Kathmandu', badge:'', rating:4.3, reviews:34 },
];

let cart = [];
let wishlist = new Set();
let activeFilter = 'all';
let activeCat = 'all';
let searchTerm = '';

/* ────────────────────────────────────────────────────────────────
   RENDER
──────────────────────────────────────────────────────────────── */
function getFiltered() {
  let list = [...products];
  if (activeCat !== 'all') list = list.filter(p => p.cat === activeCat);
  if (activeFilter === 'Like New' || activeFilter === 'Good' || activeFilter === 'Fair')
    list = list.filter(p => p.cond === activeFilter);
  if (activeFilter === 'price-low') list.sort((a,b) => a.price - b.price);
  if (activeFilter === 'price-high') list.sort((a,b) => b.price - a.price);
  if (searchTerm) list = list.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return list;
}

function fmt(n) { return 'Rs. ' + n.toLocaleString('en-IN'); }

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const list = getFiltered();
  document.getElementById('listingCount').textContent = `${list.length} listing${list.length!==1?'s':''} found`;

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--muted)">
      <div style="font-size:3rem;margin-bottom:12px">🔍</div>
      <p>No products found. Try a different search or filter.</p>
    </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const save = Math.round((1 - p.price/p.orig)*100);
    const badgeCls = p.badge==='HOT'?'hot':p.badge==='SALE'?'sale':'';
    const w = wishlist.has(p.id);
    return `<div class="product-card">
      <div class="card-img">
        ${p.badge?`<span class="card-badge ${badgeCls}">${p.badge}</span>`:''}
        <span style="user-select:none">${EMOJIS[p.cat]||'📦'}</span>
        <button class="wishlist-btn ${w?'active':''}" onclick="toggleWish(${p.id},this)">${w?'❤️':'🤍'}</button>
      </div>
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        <span class="card-condition">${p.cond}</span>
        <div class="card-price">
          <span class="price-now">${fmt(p.price)}</span>
          <span class="price-old">${fmt(p.orig)}</span>
          <span class="price-save">-${save}%</span>
        </div>
        <div class="card-meta">
          <span class="seller-info">👤 ${p.seller} · 📍 ${p.loc}</span>
          <span class="rating">⭐ ${p.rating} (${p.reviews})</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
      </div>
    </div>`;
  }).join('');
}

/* ────────────────────────────────────────────────────────────────
   INTERACTIONS
──────────────────────────────────────────────────────────────── */
function toggleWish(id, btn) {
  if (wishlist.has(id)) { wishlist.delete(id); btn.textContent='🤍'; btn.classList.remove('active'); }
  else { wishlist.add(id); btn.textContent='❤️'; btn.classList.add('active'); showToast('Added to Wishlist ❤️'); }
}

function addToCart(id) {
  const p = products.find(x => x.id===id);
  const ex = cart.find(x => x.id===id);
  if (ex) { ex.qty++; } else { cart.push({...p, qty:1}); }
  updateCartCount();
  showToast(`${p.name} added to cart 🛒`);
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.reduce((s,i)=>s+i.qty,0);
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCart();
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

function renderCart() {
  const el = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    el.innerHTML = `<div class="empty-cart"><div class="ec-icon">🛒</div><p>Your cart is empty.<br>Start adding items!</p></div>`;
    footer.style.display='none'; return;
  }
  footer.style.display='block';
  el.innerHTML = cart.map(i => `<div class="cart-item">
    <div class="cart-item-icon">${EMOJIS[i.cat]||'📦'}</div>
    <div class="cart-item-info">
      <div class="cart-item-name">${i.name}</div>
      <div class="cart-item-price">${fmt(i.price)} × ${i.qty}</div>
    </div>
    <button class="cart-item-remove" onclick="removeFromCart(${i.id})">🗑</button>
  </div>`).join('');
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cartTotal').textContent = fmt(total);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id!==id);
  updateCartCount();
  renderCart();
}

function filterCat(cat, el) {
  activeCat = cat;
  document.querySelectorAll('.cat-item').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  renderProducts();
}

function applyFilter(f, el) {
  activeFilter = f;
  document.querySelectorAll('.filter-chip').forEach(e=>e.classList.remove('active'));
  el.classList.add('active');
  renderProducts();
}

function doSearch() {
  searchTerm = document.getElementById('searchInput').value.trim();
  renderProducts();
}

function searchQuick(term) {
  document.getElementById('searchInput').value = term;
  searchTerm = term;
  renderProducts();
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key==='Enter') doSearch();
});

/* ────────────────────────────────────────────────────────────────
   SELL MODAL
──────────────────────────────────────────────────────────────── */
function openSellModal() { document.getElementById('sellModal').classList.add('open'); }
function closeSellModal() { document.getElementById('sellModal').classList.remove('open'); }
document.getElementById('sellModal').addEventListener('click', e => {
  if (e.target===document.getElementById('sellModal')) closeSellModal();
});

function submitListing() {
  const name = document.getElementById('f_name').value.trim();
  const cat  = document.getElementById('f_cat').value;
  const cond = document.getElementById('f_cond').value;
  const price= parseInt(document.getElementById('f_price').value);
  const orig = parseInt(document.getElementById('f_orig').value) || price*2;
  const seller=document.getElementById('f_seller').value.trim();
  const loc  = document.getElementById('f_loc').value.trim() || 'Nepal';

  if (!name||!price||!seller) { showToast('⚠️ Please fill in required fields'); return; }

  const newProd = {
    id: Date.now(), name, cat, cond, price, orig,
    seller, loc, badge:'NEW', rating:5.0, reviews:0
  };
  products.unshift(newProd);
  activeCat='all'; activeFilter='all'; searchTerm='';
  document.querySelectorAll('.cat-item').forEach((e,i)=>e.classList.toggle('active',i===0));
  document.querySelectorAll('.filter-chip').forEach((e,i)=>e.classList.toggle('active',i===0));
  renderProducts();
  closeSellModal();

  // Reset form
  ['f_name','f_price','f_orig','f_seller','f_loc','f_desc'].forEach(id=>{
    document.getElementById(id).value='';
  });

  showToast(`🎉 "${name}" listed successfully!`);
}

/* ────────────────────────────────────────────────────────────────
   TOAST
──────────────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2400);
}

/* ── INIT ───────────────────────────────────────────────────── */
renderProducts();
