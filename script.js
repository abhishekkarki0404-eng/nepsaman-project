
let products = [
  // iPhones
  {id:1, name:"iPhone 16 Pro 256GB", cat:"phones", price:124999, orig:149999, image:"https://picsum.photos/id/1015/800/600", badge:"NEW"},
  {id:2, name:"iPhone 15 Pro Max 256GB", cat:"phones", price:98999, orig:139999, image:"https://picsum.photos/id/106/800/600", badge:""},
  {id:3, name:"iPhone 14 Pro 128GB", cat:"phones", price:74999, orig:109999, image:"https://picsum.photos/id/133/800/600", badge:""},
  {id:4, name:"iPhone 13 Pro 128GB", cat:"phones", price:62999, orig:89999, image:"https://picsum.photos/id/180/800/600", badge:""},
  {id:5, name:"iPhone 12 Pro Max 128GB", cat:"phones", price:54999, orig:79999, image:"https://picsum.photos/id/201/800/600", badge:""},
  {id:6, name:"iPhone 11 Pro 64GB", cat:"phones", price:39999, orig:69999, image:"https://picsum.photos/id/251/800/600", badge:""},
  {id:7, name:"iPhone 17 Pro", cat:"phones", price:139999, orig:169999, image:"https://picsum.photos/id/1015/800/600", badge:"COMING"},
  {id:8, name:"iPhone 15 128GB", cat:"phones", price:67999, orig:89999, image:"https://picsum.photos/id/106/800/600", badge:""},
  {id:9, name:"iPhone 14 128GB", cat:"phones", price:59999, orig:79999, image:"https://picsum.photos/id/133/800/600", badge:""},
  {id:10, name:"iPhone 13 Mini", cat:"phones", price:44999, orig:69999, image:"https://picsum.photos/id/180/800/600", badge:""},
  {id:11, name:"iPhone 16 Pro Max", cat:"phones", price:144999, orig:169999, image:"https://picsum.photos/id/1015/800/600", badge:"NEW"},

  // Samsung Phones
  {id:12, name:"Samsung Galaxy S25 Ultra", cat:"phones", price:134999, orig:159999, image:"https://picsum.photos/id/367/800/600", badge:""},
  {id:13, name:"Samsung Galaxy S24 Ultra", cat:"phones", price:114999, orig:139999, image:"https://picsum.photos/id/201/800/600", badge:"BEST"},
  {id:14, name:"Samsung Galaxy S23 FE", cat:"phones", price:54999, orig:74999, image:"https://picsum.photos/id/106/800/600", badge:""},
  {id:15, name:"Samsung Galaxy A55 5G", cat:"phones", price:42999, orig:52999, image:"https://picsum.photos/id/367/800/600", badge:""},
  {id:16, name:"Samsung Galaxy S24+", cat:"phones", price:89999, orig:109999, image:"https://picsum.photos/id/201/800/600", badge:""},
  {id:17, name:"Samsung Galaxy Z Fold6", cat:"phones", price:179999, orig:209999, image:"https://picsum.photos/id/106/800/600", badge:""},
  {id:18, name:"Samsung Galaxy A35", cat:"phones", price:32999, orig:42999, image:"https://picsum.photos/id/367/800/600", badge:""},
  {id:19, name:"Samsung Galaxy S23 Ultra", cat:"phones", price:94999, orig:119999, image:"https://picsum.photos/id/201/800/600", badge:""},
  {id:20, name:"Samsung Galaxy Z Flip6", cat:"phones", price:99999, orig:119999, image:"https://picsum.photos/id/106/800/600", badge:""},
  {id:21, name:"Samsung Galaxy A25", cat:"phones", price:25999, orig:32999, image:"https://picsum.photos/id/367/800/600", badge:""},

  // Apple Laptops
  {id:22, name:"MacBook Air M3 13\"", cat:"laptops", price:139999, orig:169999, image:"https://picsum.photos/id/201/800/600", badge:"BEST"},
  {id:23, name:"MacBook Pro M3 14\"", cat:"laptops", price:189999, orig:229999, image:"https://picsum.photos/id/367/800/600", badge:""},
  {id:24, name:"MacBook Air M2 13\"", cat:"laptops", price:109999, orig:139999, image:"https://picsum.photos/id/201/800/600", badge:""},
  {id:25, name:"MacBook Pro M4 Pro", cat:"laptops", price:249999, orig:289999, image:"https://picsum.photos/id/367/800/600", badge:"NEW"},
  {id:26, name:"MacBook Air 15\" M3", cat:"laptops", price:159999, orig:189999, image:"https://picsum.photos/id/201/800/600", badge:""},

  // Apple Watches
  {id:27, name:"Apple Watch Ultra 2", cat:"watches", price:89999, orig:105000, image:"https://picsum.photos/id/866/800/600", badge:"HOT"},
  {id:28, name:"Apple Watch Series 10", cat:"watches", price:52999, orig:62999, image:"https://picsum.photos/id/870/800/600", badge:""},
  {id:29, name:"Apple Watch Series 9", cat:"watches", price:42999, orig:52999, image:"https://picsum.photos/id/866/800/600", badge:""},
  {id:30, name:"Apple Watch SE 2nd Gen", cat:"watches", price:28999, orig:35999, image:"https://picsum.photos/id/870/800/600", badge:""},
  {id:31, name:"Apple Watch Ultra", cat:"watches", price:79999, orig:94999, image:"https://picsum.photos/id/866/800/600", badge:""}
];

let cart = [];

function fmt(price) { return "Rs. " + price.toLocaleString('en-IN'); }

function renderProducts(filtered) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-image">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div style="color:#64748b;font-size:0.95rem;">Brand New • 1 Year Warranty</div>
        <div style="margin-top:12px;display:flex;align-items:baseline;gap:12px;">
          <span class="product-price">${fmt(p.price)}</span>
          <span style="text-decoration:line-through;color:#94a3b8;font-size:0.95rem;">${fmt(p.orig)}</span>
        </div>
        <button onclick="addToCart(${p.id});" class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `).join('');
  document.getElementById("result-count").textContent = `${filtered.length} products`;
}

function filterProducts(cat) {
  if (cat === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.cat === cat));
}

function switchCategory(cat) {
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.classList.toggle('active', (tab.id === `tab-${cat}` || (cat==='all' && tab.id==='tab-all')));
  });
  filterProducts(cat);
}

function goToAllProducts() {
  switchCategory('all');
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else cart.push({...product, qty: 1});
  updateCartCount();
  showToast(`${product.name} added to cart! 🛒`);
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document.getElementById("cart-count").textContent = count;
}

function openCart() {
  document.getElementById("cart-overlay").style.display = "block";
  document.getElementById("cart-sidebar").classList.add("open");
  renderCart();
}

function renderCart() {
  const el = document.getElementById("cart-items");
  if (!cart.length) {
    el.innerHTML = `<p style="text-align:center;padding:60px;color:#64748b;">Your cart is empty</p>`;
    document.getElementById("cart-footer").style.display = "none";
    return;
  }
  document.getElementById("cart-footer").style.display = "block";
  let html = '', total = 0;
  cart.forEach((item, i) => {
    const t = item.price * (item.qty || 1);
    total += t;
    html += `
      <div style="display:flex;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid #e2e8f0;">
        <div style="width:80px;height:80px;flex-shrink:0;">
          <img src="${item.image}" style="width:100%;height:100%;object-fit:contain;border-radius:8px;">
        </div>
        <div style="flex:1">
          <div style="font-weight:600;">${item.name}</div>
          <div style="color:#64748b;">Qty: ${item.qty || 1}</div>
          <div style="margin-top:8px;font-weight:700;">${fmt(t)}</div>
        </div>
        <button onclick="removeFromCart(${i});" style="background:none;border:none;color:#ef4444;cursor:pointer;">Remove</button>
      </div>`;
  });
  el.innerHTML = html;
  document.getElementById("cart-total").textContent = fmt(total);
}

function removeFromCart(i) {
  cart.splice(i, 1);
  updateCartCount();
  renderCart();
}

function closeCart() {
  document.getElementById("cart-overlay").style.display = "none";
  document.getElementById("cart-sidebar").classList.remove("open");
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

function showLoginModal() { document.getElementById("login-modal").style.display = "flex"; }
function switchToRegister() {
  closeModals();
  setTimeout(() => document.getElementById("register-modal").style.display = "flex", 300);
}
function closeModals() {
  document.getElementById("login-modal").style.display = "none";
  document.getElementById("register-modal").style.display = "none";
}
function loginUser() {
  if (document.getElementById("login-email").value) {
    showToast("✅ Logged in successfully!");
    closeModals();
  } else showToast("Please enter email");
}
function registerUser() {
  if (document.getElementById("reg-name").value) {
    showToast("🎉 Account created successfully!");
    closeModals();
  } else showToast("Please enter name");
}
function checkout() {
  if (cart.length) {
    showToast("🎉 Thank you for your purchase!");
    cart = [];
    updateCartCount();
    closeCart();
  }
}

function showExchangePage() {
  const offerIds = [1,12,13,22,27,28,29];
  let html = `
    <div class="exchange-page" id="exchange-page" style="position:fixed;inset:0;background:white;z-index:4000;overflow:auto;">
      <span onclick="closeExchange()" style="position:absolute;top:20px;right:30px;font-size:2.5rem;cursor:pointer;color:#333;">×</span>
      <div style="max-width:1280px;margin:40px auto;padding:0 24px;">
        <h1 style="text-align:center;margin-bottom:30px;font-size:2.5rem;">🔥 Exchange Offer - Limited Devices</h1>
        <div class="product-grid">
          ${products.filter(p => offerIds.includes(p.id)).map(p => `
            <div class="product-card">
              <div class="product-image"><img src="${p.image}" alt="${p.name}"></div>
              <div class="product-info">
                <div class="product-name">${p.name}</div>
                <p style="color:#10b981;font-weight:700;">10% Extra Off on Exchange!</p>
                <button onclick="addToCart(${p.id});closeExchange();" class="add-to-cart">Add to Cart</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function closeExchange() {
  const el = document.getElementById('exchange-page');
  if (el) el.remove();
}

// Initialize
window.onload = () => {
  renderProducts(products);
  updateCartCount();
};
