let products = [
      {id:1, name:"iPhone 16 Pro 256GB", cat:"phones", price:124999, orig:149999, emoji:"📱", badge:"NEW"},
      {id:2, name:"Samsung Galaxy S25 Ultra", cat:"phones", price:134999, orig:159999, emoji:"📱", badge:""},
      {id:3, name:"MacBook Air M4 16GB", cat:"laptops", price:139999, orig:169999, emoji:"💻", badge:"BEST"},
      {id:4, name:"Dell XPS 14 OLED", cat:"laptops", price:112000, orig:145000, emoji:"💻", badge:""},
      {id:5, name:"Apple Watch Ultra 2", cat:"watches", price:89999, orig:105000, emoji:"⌚", badge:"HOT"},
      {id:6, name:"Samsung Galaxy Watch 7", cat:"watches", price:42999, orig:52999, emoji:"⌚", badge:""},
      {id:7, name:"iPhone 15 Pro Max", cat:"phones", price:98999, orig:139999, emoji:"📱", badge:""},
      {id:8, name:"Lenovo Legion Pro 7i", cat:"laptops", price:189999, orig:229999, emoji:"💻", badge:"GAMING"}
    ];

    let cart = [];

    function fmt(price) {
      return "Rs. " + price.toLocaleString('en-IN');
    }

    function renderProducts(filteredProducts) {
      const grid = document.getElementById("product-grid");
      grid.innerHTML = filteredProducts.map(p => `
        <div class="product-card">
          <div class="product-image">
            ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
            <span>${p.emoji}</span>
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
      document.getElementById("result-count").textContent = `${filteredProducts.length} products`;
    }

    function filterProducts(category) {
      if (category === 'all') {
        renderProducts(products);
      } else {
        renderProducts(products.filter(p => p.cat === category));
      }
    }

    function switchCategory(cat) {
      // Update active tab
      document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.toggle('active', (tab.id === `tab-${cat}` || (cat==='all' && tab.id==='tab-all')));
      });
      filterProducts(cat);
    }

    function addToCart(id) {
      const product = products.find(p => p.id === id);
      if (!product) return;
      
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        cart.push({...product, qty: 1});
      }
      
      updateCartCount();
      showToast(`${product.name} added to cart! 🛒`);
    }

    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
      document.getElementById("cart-count").textContent = count;
    }

    function openCart() {
      document.getElementById("cart-overlay").style.display = "block";
      const sidebar = document.getElementById("cart-sidebar");
      sidebar.style.right = "0";

      const itemsContainer = document.getElementById("cart-items");
      if (cart.length === 0) {
        itemsContainer.innerHTML = `<p style="text-align:center;padding:60px 20px;color:#64748b;">Your cart is empty</p>`;
        document.getElementById("cart-footer").style.display = "none";
        return;
      }

      document.getElementById("cart-footer").style.display = "block";
      
      let html = '';
      let total = 0;
      
      cart.forEach((item, index) => {
        const itemTotal = item.price * (item.qty || 1);
        total += itemTotal;
        html += `
          <div style="display:flex;gap:16px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid #e2e8f0;">
            <div style="font-size:3rem;">${item.emoji}</div>
            <div style="flex:1">
              <div style="font-weight:600;">${item.name}</div>
              <div style="color:#64748b;">Qty: ${item.qty || 1}</div>
              <div style="margin-top:8px;font-weight:700;">${fmt(itemTotal)}</div>
            </div>
            <button onclick="removeFromCart(${index});" style="background:none;border:none;color:#ef4444;cursor:pointer;">Remove</button>
          </div>
        `;
      });
      
      itemsContainer.innerHTML = html;
      document.getElementById("cart-total").textContent = fmt(total);
    }

    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartCount();
      openCart();
    }

    function closeCart() {
      document.getElementById("cart-overlay").style.display = "none";
      document.getElementById("cart-sidebar").style.right = "-420px";
    }

    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2800);
    }

    function showLoginModal() {
      document.getElementById("login-modal").style.display = "flex";
    }

    function switchToRegister() {
      closeModals();
      setTimeout(() => {
        document.getElementById("register-modal").style.display = "flex";
      }, 300);
    }

    function closeModals() {
      document.getElementById("login-modal").style.display = "none";
      document.getElementById("register-modal").style.display = "none";
    }

    function loginUser() {
      const email = document.getElementById("login-email").value;
      if (email) {
        showToast("✅ Logged in successfully!");
        closeModals();
      } else {
        showToast("Please enter your email");
      }
    }

    function registerUser() {
      const name = document.getElementById("reg-name").value;
      if (name) {
        showToast(`🎉 Welcome, ${name.split(" ")[0]}! Account created.`);
        closeModals();
      } else {
        showToast("Please enter your name");
      }
    }

    function checkout() {
      if (cart.length > 0) {
        showToast("🎉 Thank you for your purchase! (Demo)");
        cart = [];
        updateCartCount();
        closeCart();
      }
    }

    // Initialize
    window.onload = function() {
      renderProducts(products);
      updateCartCount();
      
      // Keyboard support for search (demo)
      document.addEventListener('keydown', e => {
        if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
          e.preventDefault();
          showToast("Search coming soon ✨");
        }
      });
    };
