/**
 * MONOGRAPH ATELIER — MASTER STORE ENGINE (js/store.js)
 * Global state management for Cart, Wishlist, Currency, Auth, Search, Toast & Audio.
 */

// --- 1. MULTI-CURRENCY CONVERTER ---
const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
  GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
  JPY: { symbol: '¥', rate: 155.0, name: 'Japanese Yen' },
  INR: { symbol: '₹', rate: 83.5, name: 'Indian Rupee' }
};

let currentCurrency = localStorage.getItem('monograph_currency') || 'USD';

function getCurrency() {
  return CURRENCIES[currentCurrency] || CURRENCIES.USD;
}

function setCurrency(code) {
  if (CURRENCIES[code]) {
    currentCurrency = code;
    localStorage.setItem('monograph_currency', code);
    updateCurrencyUI();
    renderCartDrawer();
    renderWishlistDrawer();
    
    // Re-render prices if page-specific renderer exists
    if (typeof renderCurrentPageCatalog === 'function') {
      renderCurrentPageCatalog();
    }
    if (typeof renderProductDetailPage === 'function') {
      renderProductDetailPage();
    }
    showToast(`Currency switched to ${code} (${CURRENCIES[code].symbol})`, 'success');
  }
}

function formatPrice(usdAmount) {
  const c = getCurrency();
  const converted = usdAmount * c.rate;
  if (currentCurrency === 'JPY') {
    return `${c.symbol}${Math.round(converted).toLocaleString()}`;
  } else if (currentCurrency === 'INR') {
    return `${c.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${c.symbol}${converted.toFixed(2)}`;
}

function updateCurrencyUI() {
  const c = getCurrency();
  const labelEls = document.querySelectorAll('.currency-current-label');
  labelEls.forEach(el => {
    el.innerText = `${currentCurrency} (${c.symbol})`;
  });

  // Re-format all elements with data-price
  document.querySelectorAll('[data-usd-price]').forEach(el => {
    const usd = parseFloat(el.getAttribute('data-usd-price'));
    if (!isNaN(usd)) {
      el.innerText = formatPrice(usd);
    }
  });
}

// --- 2. AUDIO SYNTHESIZER (Tactile sound feedback like luxury sites) ---
const AudioEngine = {
  ctx: null,
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  },
  playCartAdd() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, this.ctx.currentTime + 0.12); // G5
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch(e) {}
  }
};

// --- 3. TOAST NOTIFICATION ENGINE ---
function showToast(message, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  
  let iconSvg = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  if (type === 'success') {
    iconSvg = `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === 'heart') {
    iconSvg = `<svg class="w-4 h-4 text-rose-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-text">${message}</div>
  `;
  toast.classList.add('active');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 3200);
}

// --- 4. CART ENGINE ---
let activeCoupon = null;
const COUPONS = {
  'MONO10': { discountPct: 0.10, label: '10% Off Atelier Coupon' },
  'ATELIER15': { discountPct: 0.15, label: '15% Off Guild Discount' },
  'WELCOME': { discountPct: 0.10, label: '10% Welcome Gift' }
};

function getCart() {
  try {
    const raw = localStorage.getItem('monograph_cart');
    if (!raw) {
      // Seed default demo item
      const initial = [
        {
          id: 101,
          title: 'Smyth-Sewn Archival Leather Journal',
          price: 34.00,
          img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
          qty: 1,
          monogram: 'A.K.',
          foil: 'gold'
        },
        {
          id: 201,
          title: 'Solid Matte Brass Fountain Pen',
          price: 48.00,
          img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=300&q=80',
          qty: 1,
          monogram: '',
          foil: ''
        }
      ];
      localStorage.setItem('monograph_cart', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch(e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('monograph_cart', JSON.stringify(cart));
  updateCartBadges();
  renderCartDrawer();
}

function addToCart(productId, qty = 1, options = {}) {
  const product = (typeof getProductById === 'function') ? getProductById(productId) : null;
  if (!product && !options.customTitle) return;

  const cart = getCart();
  const title = options.customTitle || product.title;
  const price = options.customPrice !== undefined ? options.customPrice : product.price;
  const img = options.customImg || (product.images ? product.images[0] : '');
  const monogram = options.monogram || '';
  const foil = options.foil || '';

  // Match by id AND monogram text if applicable
  const existing = cart.find(item => item.id === productId && item.monogram === monogram);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: productId,
      title,
      price,
      img,
      qty,
      monogram,
      foil
    });
  }

  saveCart(cart);
  AudioEngine.playCartAdd();
  showToast(`Added "${title}" to Atelier Cart`, 'success');
  openCartDrawer();
}

function updateCartQty(productId, newQty, monogram = '') {
  let cart = getCart();
  if (newQty <= 0) {
    cart = cart.filter(item => !(item.id === productId && (item.monogram || '') === monogram));
  } else {
    const item = cart.find(item => item.id === productId && (item.monogram || '') === monogram);
    if (item) item.qty = newQty;
  }
  saveCart(cart);
}

function removeFromCart(productId, monogram = '') {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && (item.monogram || '') === monogram));
  saveCart(cart);
  showToast('Item removed from cart', 'info');
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartTotal() {
  let subtotal = getCartSubtotal();
  if (activeCoupon) {
    subtotal = subtotal * (1 - activeCoupon.discountPct);
  }
  return subtotal;
}

function updateCartBadges() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.innerText = count;
  });
}

function applyCoupon(code) {
  const upper = code.trim().toUpperCase();
  if (COUPONS[upper]) {
    activeCoupon = COUPONS[upper];
    showToast(`Applied ${COUPONS[upper].label}!`, 'success');
    renderCartDrawer();
  } else {
    showToast('Invalid promo code. Try MONO10 or ATELIER15', 'info');
  }
}

// Drawer DOM functions
function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (!drawer || !backdrop) return;
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeCartDrawer();
  } else {
    openCartDrawer();
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    renderCartDrawer();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderCartDrawer() {
  const listEl = document.getElementById('cartDrawerItemsList');
  const subtotalEl = document.getElementById('cartDrawerSubtotal');
  const freeShipBar = document.getElementById('freeShippingFill');
  const freeShipMsg = document.getElementById('freeShippingMsg');
  if (!listEl) return;

  const cart = getCart();
  const subtotal = getCartSubtotal();
  const total = getCartTotal();
  const freeThreshold = 75.00;

  // Free shipping progress bar
  if (freeShipBar && freeShipMsg) {
    const pct = Math.min(100, (subtotal / freeThreshold) * 100);
    freeShipBar.style.width = `${pct}%`;
    if (subtotal >= freeThreshold) {
      freeShipMsg.innerHTML = `<span class="text-emerald-500 font-bold">✨ You unlocked complimentary express shipping!</span>`;
    } else {
      const remaining = freeThreshold - subtotal;
      freeShipMsg.innerHTML = `Add <span class="font-bold text-amber-500">${formatPrice(remaining)}</span> more for complimentary express delivery`;
    }
  }

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="text-center py-16 space-y-3">
        <div class="w-16 h-16 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <p class="font-serif text-lg font-semibold text-zinc-800 dark:text-zinc-200">Your Atelier Cart is empty</p>
        <p class="text-xs text-zinc-500">Discover handpicked archival journals and Japanese fountain pens.</p>
        <a href="catalog.html" onclick="closeCartDrawer()" class="inline-block mt-2 btn-secondary text-xs">Explore Shop Collection</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = formatPrice(0);
    return;
  }

  listEl.innerHTML = cart.map(item => `
    <div class="drawer-item">
      <img src="${item.img}" alt="${item.title}" class="drawer-item-img">
      <div class="drawer-item-details">
        <a href="product-detail.html?id=${item.id}" class="drawer-item-title">${item.title}</a>
        ${item.monogram ? `<span class="text-[10px] font-mono font-bold text-amber-600 mt-0.5">✦ Monogram: ${item.monogram} (${item.foil || 'Gold'})</span>` : ''}
        <div class="drawer-item-price">${formatPrice(item.price)}</div>
        <div class="drawer-item-controls">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.qty - 1}, '${item.monogram || ''}')">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.qty + 1}, '${item.monogram || ''}')">+</button>
          </div>
          <button class="text-xs text-zinc-400 hover:text-red-500 transition font-medium" onclick="removeFromCart(${item.id}, '${item.monogram || ''}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  if (subtotalEl) {
    if (activeCoupon) {
      subtotalEl.innerHTML = `<span class="line-through text-xs text-zinc-400 mr-2">${formatPrice(subtotal)}</span><span>${formatPrice(total)}</span>`;
    } else {
      subtotalEl.innerText = formatPrice(total);
    }
  }
}

// --- 5. WISHLIST ENGINE ---
function getWishlist() {
  try {
    const raw = localStorage.getItem('monograph_wishlist');
    if (!raw) {
      // Seed default wishlist items
      const initial = [101, 201];
      localStorage.setItem('monograph_wishlist', JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch(e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem('monograph_wishlist', JSON.stringify(list));
  updateWishlistBadges();
  renderWishlistDrawer();
}

function isInWishlist(productId) {
  const list = getWishlist();
  return list.includes(Number(productId));
}

function toggleWishlist(productId) {
  const numericId = Number(productId);
  let list = getWishlist();
  if (list.includes(numericId)) {
    list = list.filter(id => id !== numericId);
    showToast('Removed from Wishlist', 'info');
  } else {
    list.push(numericId);
    AudioEngine.playClick();
    showToast('Saved to your Atelier Wishlist', 'heart');
  }
  saveWishlist(list);

  // Sync heart button states on the page
  document.querySelectorAll(`[data-wishlist-id="${numericId}"]`).forEach(btn => {
    btn.classList.toggle('active', list.includes(numericId));
  });
}

function updateWishlistBadges() {
  const list = getWishlist();
  document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
    badge.innerText = list.length;
  });
}

function toggleWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const backdrop = document.getElementById('wishlistDrawerBackdrop');
  if (!drawer || !backdrop) return;
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeWishlistDrawer();
  } else {
    openWishlistDrawer();
  }
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const backdrop = document.getElementById('wishlistDrawerBackdrop');
  if (drawer && backdrop) {
    renderWishlistDrawer();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlistDrawer');
  const backdrop = document.getElementById('wishlistDrawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderWishlistDrawer() {
  const listEl = document.getElementById('wishlistDrawerItemsList');
  if (!listEl) return;
  const wishlistIds = getWishlist();
  const products = (typeof getAllProducts === 'function') ? getAllProducts() : [];
  const wishItems = products.filter(p => wishlistIds.includes(p.id));

  if (wishItems.length === 0) {
    listEl.innerHTML = `
      <div class="text-center py-16 space-y-3">
        <div class="w-16 h-16 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-rose-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </div>
        <p class="font-serif text-lg font-semibold text-zinc-800 dark:text-zinc-200">Your Wishlist is empty</p>
        <p class="text-xs text-zinc-500">Tap the heart icon on any fine instrument or leather journal to save it here.</p>
        <a href="catalog.html" onclick="closeWishlistDrawer()" class="inline-block mt-2 btn-secondary text-xs">Browse Full Catalog</a>
      </div>
    `;
    return;
  }

  listEl.innerHTML = wishItems.map(item => `
    <div class="drawer-item">
      <img src="${item.images[0]}" alt="${item.title}" class="drawer-item-img">
      <div class="drawer-item-details">
        <a href="product-detail.html?id=${item.id}" class="drawer-item-title">${item.title}</a>
        <div class="drawer-item-price">${formatPrice(item.price)}</div>
        <div class="drawer-item-controls">
          <button class="btn-quick-add text-[10px] py-1 px-3" onclick="addToCart(${item.id}); toggleWishlist(${item.id});">Move To Cart</button>
          <button class="text-xs text-zinc-400 hover:text-red-500 transition font-medium" onclick="toggleWishlist(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// --- 6. AUTH & USER PROFILE ---
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('monograph_user');
    if (!raw) {
      // Default demo signed-in user
      const demoUser = {
        name: 'Ayesha Khan',
        email: 'ayesha.khan@monograph.com',
        tier: 'Atelier Guild Patron',
        points: 480,
        orders: [
          {
            id: 'MG-89421',
            date: 'March 18, 2026',
            total: 82.00,
            status: 'Delivered',
            items: ['Solid Matte Brass Fountain Pen', 'Smyth-Sewn Archival Journal']
          },
          {
            id: 'MG-76110',
            date: 'February 04, 2026',
            total: 42.00,
            status: 'Delivered',
            items: ['Solid American Walnut Desk Caddy Tray']
          }
        ]
      };
      localStorage.setItem('monograph_user', JSON.stringify(demoUser));
      return demoUser;
    }
    return JSON.parse(raw);
  } catch(e) {
    return null;
  }
}

function updateAuthUI() {
  const user = getCurrentUser();
  const labelEls = document.querySelectorAll('.nav-account-label');
  labelEls.forEach(el => {
    if (user && user.name) {
      el.innerText = user.name.split(' ')[0];
    } else {
      el.innerText = 'Sign In';
    }
  });
}

function handleAccountClick() {
  const user = getCurrentUser();
  if (user) {
    window.location.href = 'account.html';
  } else {
    window.location.href = 'login.html';
  }
}

// --- 7. THEME TOGGLE (LIGHT / DARK) ---
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.body?.classList.add('dark', 'dark-mode');
  } else {
    document.documentElement.classList.remove('dark');
    document.body?.classList.remove('dark', 'dark-mode');
  }
}

function initTheme() {
  const saved = localStorage.getItem('monograph_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  applyTheme(isDark);
}

function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains('dark') || (document.body && document.body.classList.contains('dark-mode'));
  const newDark = !isCurrentlyDark;
  applyTheme(newDark);
  localStorage.setItem('monograph_theme', newDark ? 'dark' : 'light');
  showToast(`Switched to ${newDark ? 'Dark Mode 🌙' : 'Light Mode ☀️'}`);
}



// --- 9. LIVE SEARCH AUTOCOMPLETE MODAL ---
function toggleSearchModal() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  const isOpen = modal.classList.contains('open');
  if (isOpen) {
    closeSearchModal();
  } else {
    openSearchModal();
  }
}

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('open');
    const input = document.getElementById('searchModalInput');
    if (input) {
      setTimeout(() => input.focus(), 100);
      handleSearchInput('');
    }
    document.body.style.overflow = 'hidden';
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleSearchInput(query) {
  const container = document.getElementById('searchResultsContainer');
  if (!container) return;
  const q = query.trim().toLowerCase();
  const products = (typeof getAllProducts === 'function') ? getAllProducts() : [];

  const matched = products.filter(p => {
    return p.title.toLowerCase().includes(q) ||
           p.categoryName.toLowerCase().includes(q) ||
           p.origin.toLowerCase().includes(q) ||
           (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
  }).slice(0, 6);

  if (matched.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-zinc-400 text-sm">
        No instruments matched "${query}". Try searching for "brass", "journal", "japan", or "leather".
      </div>
    `;
    return;
  }

  container.innerHTML = matched.map(p => `
    <a href="product-detail.html?id=${p.id}" class="search-result-item">
      <img src="${p.images[0]}" alt="${p.title}" class="search-thumb">
      <div class="flex-grow min-w-0">
        <div class="text-xs font-bold text-amber-700 uppercase tracking-wider">${p.categoryName} • ${p.origin}</div>
        <div class="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">${p.title}</div>
      </div>
      <div class="text-sm font-mono font-bold text-zinc-950 dark:text-zinc-200">${formatPrice(p.price)}</div>
    </a>
  `).join('');
}

// --- 10. MOBILE MENU TOGGLE ---
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.remove('open');
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.classList.add('hidden');
    }
    document.body.style.overflow = '';
  } else {
    drawer.classList.add('open');
    if (backdrop) {
      backdrop.classList.add('open');
      backdrop.classList.remove('hidden');
    }
    document.body.style.overflow = 'hidden';
  }
}

// Global initialization when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateCurrencyUI();
  updateCartBadges();
  updateWishlistBadges();
  updateAuthUI();
  // Close drawers with ESC key
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeWishlistDrawer();
      closeSearchModal();
      const mobileDrawer = document.getElementById('mobileNavDrawer');
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    }
  });
});
