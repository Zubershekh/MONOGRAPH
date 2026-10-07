/**
 * MONOGRAPH ATELIER — CATALOG & FILTER ENGINE (js/catalog.js)
 * Used across catalog.html and specialized collection pages.
 */

let activeCategoryFilter = 'all';
let activeOriginFilters = [];
let maxPriceFilter = 150;
let activeSortOption = 'featured';
let activeSearchQuery = '';

function initCatalog(defaultCategory = 'all') {
  activeCategoryFilter = defaultCategory;
  
  // Set up price slider listener
  const slider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceRangeDisplay');
  if (slider && priceDisplay) {
    slider.addEventListener('input', e => {
      maxPriceFilter = parseFloat(e.target.value);
      priceDisplay.innerText = formatPrice(maxPriceFilter);
      renderCatalogGrid();
    });
    priceDisplay.innerText = formatPrice(maxPriceFilter);
  }

  // Set up search box listener if present
  const searchInp = document.getElementById('catalogSearchInput');
  if (searchInp) {
    searchInp.addEventListener('input', e => {
      activeSearchQuery = e.target.value.toLowerCase().trim();
      renderCatalogGrid();
    });
  }

  // Set up sort listener
  const sortSelect = document.getElementById('catalogSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      activeSortOption = e.target.value;
      renderCatalogGrid();
    });
  }

  renderCatalogGrid();
}

function filterByCategory(cat) {
  activeCategoryFilter = cat;
  
  // Update UI pill buttons
  document.querySelectorAll('.cat-pill-btn').forEach(btn => {
    const btnCat = btn.getAttribute('data-cat');
    if (btnCat === cat) {
      btn.classList.add('bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950');
      btn.classList.remove('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800', 'dark:text-zinc-300');
    } else {
      btn.classList.remove('bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950');
      btn.classList.add('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800', 'dark:text-zinc-300');
    }
  });

  renderCatalogGrid();
}

function toggleOriginFilter(originCheckbox) {
  const origin = originCheckbox.value;
  if (originCheckbox.checked) {
    if (!activeOriginFilters.includes(origin)) activeOriginFilters.push(origin);
  } else {
    activeOriginFilters = activeOriginFilters.filter(o => o !== origin);
  }
  renderCatalogGrid();
}

function renderCatalogGrid() {
  const grid = document.getElementById('catalogProductGrid');
  const countEl = document.getElementById('catalogResultsCount');
  if (!grid) return;

  const allProducts = (typeof getAllProducts === 'function') ? getAllProducts() : [];
  let filtered = allProducts.filter(p => {
    // Category check
    if (activeCategoryFilter !== 'all' && p.category !== activeCategoryFilter) {
      return false;
    }
    // Price check
    if (p.price > maxPriceFilter) {
      return false;
    }
    // Origin check
    if (activeOriginFilters.length > 0 && !activeOriginFilters.includes(p.origin)) {
      return false;
    }
    // Search query check
    if (activeSearchQuery) {
      const matchTitle = p.title.toLowerCase().includes(activeSearchQuery);
      const matchDesc = p.summary.toLowerCase().includes(activeSearchQuery);
      const matchOrigin = p.origin.toLowerCase().includes(activeSearchQuery);
      if (!matchTitle && !matchDesc && !matchOrigin) return false;
    }
    return true;
  });

  // Sorting
  if (activeSortOption === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSortOption === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (activeSortOption === 'name') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (countEl) {
    countEl.innerText = `${filtered.length} Instrument${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center space-y-3">
        <p class="font-serif text-2xl text-zinc-800 dark:text-zinc-200">No items match your filter selection</p>
        <p class="text-xs text-zinc-500">Try widening your price range slider or clearing the origin filter checkboxes.</p>
        <button onclick="resetCatalogFilters()" class="btn-secondary text-xs mt-3">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
  
  // Re-sync wishlist heart active states
  const wishIds = (typeof getWishlist === 'function') ? getWishlist() : [];
  wishIds.forEach(id => {
    document.querySelectorAll(`[data-wishlist-id="${id}"]`).forEach(btn => btn.classList.add('active'));
  });
}

function resetCatalogFilters() {
  activeCategoryFilter = 'all';
  activeOriginFilters = [];
  maxPriceFilter = 150;
  activeSearchQuery = '';
  
  const slider = document.getElementById('priceRangeSlider');
  if (slider) slider.value = 150;
  
  document.querySelectorAll('input[type="checkbox"][onchange*="toggleOriginFilter"]').forEach(cb => {
    cb.checked = false;
  });

  filterByCategory('all');
}

function createProductCardHTML(p) {
  const isWished = (typeof isInWishlist === 'function') && isInWishlist(p.id);
  return `
    <div class="product-card group">
      <div class="product-image-box">
        <span class="product-origin-badge">${p.origin}</span>
        ${p.badge ? `<span class="absolute top-2.5 left-20 badge-tag highlight text-[9px] shadow-sm">${p.badge}</span>` : ''}
        
        <button 
          class="product-wishlist-btn ${isWished ? 'active' : ''}" 
          data-wishlist-id="${p.id}" 
          onclick="toggleWishlist(${p.id}); event.stopPropagation();" 
          title="Save to Wishlist"
        >
          <svg class="w-4 h-4 text-zinc-700" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>

        <a href="product-detail.html?id=${p.id}" class="block w-full h-full">
          <img src="${p.images[0]}" alt="${p.title}" loading="lazy">
        </a>

        <div class="product-overlay-actions">
          <button onclick="openQuickViewModal(${p.id})" class="btn-secondary text-[11px] py-1.5 px-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">
            Quick View
          </button>
          <button onclick="addToCart(${p.id})" class="btn-primary text-[11px] py-1.5 px-3 bg-amber-600 hover:bg-amber-500 text-white">
            + Quick Add
          </button>
        </div>
      </div>

      <div class="product-info-box">
        <div class="product-category-meta">${p.categoryName}</div>
        <a href="product-detail.html?id=${p.id}" class="product-title">${p.title}</a>
        
        <div class="product-rating">
          <span>★</span><span>${p.rating}</span>
          <span>(${p.reviewsCount})</span>
          ${p.monogrammable ? `<span class="ml-auto text-[9px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">Foil Emboss</span>` : ''}
        </div>

        <div class="product-price-row">
          <div>
            <span class="product-price" data-usd-price="${p.price}">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="product-mrp" data-usd-price="${p.originalPrice}">${formatPrice(p.originalPrice)}</span>` : ''}
          </div>
          <button onclick="addToCart(${p.id})" class="btn-quick-add text-[11px]">Add</button>
        </div>
      </div>
    </div>
  `;
}

// Quick View Modal
function openQuickViewModal(productId) {
  const p = getProductById(productId);
  if (!p) return;

  let modal = document.getElementById('quickViewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden animate-fade-in">
      <button onclick="closeQuickViewModal()" class="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-1 rounded-full text-xl font-bold">✕</button>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div class="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img src="${p.images[0]}" alt="${p.title}" class="w-full h-full object-cover">
        </div>
        <div class="space-y-3">
          <span class="badge-tag highlight">${p.categoryName} • ${p.origin}</span>
          <h3 class="font-serif text-2xl font-bold text-zinc-950 dark:text-zinc-50">${p.title}</h3>
          <div class="text-xl font-mono font-bold text-amber-700 dark:text-amber-400">${formatPrice(p.price)}</div>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">${p.summary}</p>
          <div class="pt-4 flex gap-3">
            <button onclick="addToCart(${p.id}); closeQuickViewModal();" class="btn-primary flex-1">Add To Atelier Cart</button>
            <a href="product-detail.html?id=${p.id}" class="btn-secondary text-xs">Full Details</a>
          </div>
        </div>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// --- HOME STOREFRONT INTERACTION ENGINE ---
let currentHomeCat = 'all';
let currentHomeSort = 'featured';

function filterHomeStore(cat, btn) {
  currentHomeCat = cat;
  document.querySelectorAll('.home-cat-tab').forEach(t => {
    t.classList.remove('active', 'bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950', 'shadow-sm');
    t.classList.add('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
  });
  if (btn) {
    btn.classList.add('active', 'bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950', 'shadow-sm');
    btn.classList.remove('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
  }
  renderHomeStoreGrid();
}

function sortHomeStore(sortVal) {
  currentHomeSort = sortVal;
  renderHomeStoreGrid();
}

function renderHomeStoreGrid() {
  const grid = document.getElementById('homeProductGrid');
  const countEl = document.getElementById('homeStoreItemCount');
  if (!grid || typeof getAllProducts !== 'function') return;

  const all = getAllProducts();
  let list = all.filter(p => {
    if (currentHomeCat === 'all') return true;
    if (currentHomeCat === 'international') return p.origin === 'Japan' || p.origin === 'S. Korea';
    return p.category === currentHomeCat;
  });

  if (currentHomeSort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentHomeSort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentHomeSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  // Cap preview at 8 items
  const displayList = list.slice(0, 8);

  if (countEl) {
    countEl.innerText = `Showing ${displayList.length} of ${list.length} Instrument${list.length === 1 ? '' : 's'}`;
  }

  if (displayList.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center space-y-2">
        <p class="font-serif text-2xl text-zinc-800 dark:text-zinc-200">No instruments found in this collection</p>
        <p class="text-xs text-zinc-500">Try selecting 'All Curated' or visiting the full catalog.</p>
        <button onclick="filterHomeStore('all')" class="btn-secondary text-xs mt-2">Reset Filter</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = displayList.map(p => createProductCardHTML(p)).join('');

  // Re-sync wishlist heart buttons
  if (typeof getWishlist === 'function') {
    const wishIds = getWishlist();
    wishIds.forEach(id => {
      document.querySelectorAll(`[data-wishlist-id="${id}"]`).forEach(b => b.classList.add('active'));
    });
  }

  // Re-sync currency pricing
  if (typeof updateCurrencyUI === 'function') {
    updateCurrencyUI();
  }
}

// Auto-init on home page if homeProductGrid exists
document.addEventListener('DOMContentLoaded', () => {
  const homeGrid = document.getElementById('homeProductGrid');
  if (homeGrid) {
    renderHomeStoreGrid();
  }
});
