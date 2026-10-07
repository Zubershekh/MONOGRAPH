/**
 * MONOGRAPH ATELIER — PRODUCT DETAIL PAGE ENGINE (js/product-detail.js)
 * Live image gallery switching, interactive monogram foil preview, reviews & specs.
 */

let currentProduct = null;
let detailQty = 1;
let isMonogramActive = false;
let selectedFoil = 'gold'; // 'gold', 'silver', 'deboss'

function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 101;
  currentProduct = getProductById(productId);

  if (!currentProduct) {
    currentProduct = getProductById(101); // fallback
  }

  renderProductDetailPage();
  initMonogramListeners();
}

function renderProductDetailPage() {
  if (!currentProduct) return;
  const p = currentProduct;

  // Page title
  document.title = `${p.title} — MONOGRAPH Atelier`;

  // Breadcrumbs
  const crumbCat = document.getElementById('crumbCategory');
  const crumbTitle = document.getElementById('crumbTitle');
  if (crumbCat) {
    crumbCat.innerText = p.categoryName;
    crumbCat.href = `${p.category === 'notebooks' ? 'archival-notebooks' : p.category === 'pens' ? 'fountain-pens' : p.category === 'desk' ? 'desk-objects' : p.category === 'gifts' ? 'curated-gifts' : 'catalog'}.html`;
  }
  if (crumbTitle) crumbTitle.innerText = p.title;

  // Images & Gallery
  const mainImg = document.getElementById('productMainImg');
  const thumbsContainer = document.getElementById('productThumbnailsContainer');
  if (mainImg && p.images && p.images.length > 0) {
    mainImg.src = p.images[0];
    mainImg.alt = p.title;
  }

  if (thumbsContainer && p.images) {
    thumbsContainer.innerHTML = p.images.map((imgSrc, idx) => `
      <button 
        onclick="switchDetailImage('${imgSrc}', this)" 
        class="w-16 h-20 rounded-lg overflow-hidden border-2 ${idx === 0 ? 'border-amber-600' : 'border-transparent'} hover:border-amber-600 transition opacity-80 hover:opacity-100 flex-shrink-0"
      >
        <img src="${imgSrc}" alt="${p.title}" class="w-full h-full object-cover">
      </button>
    `).join('');
  }

  // Meta & Titles
  const originBadge = document.getElementById('detailOriginBadge');
  const catBadge = document.getElementById('detailCategoryBadge');
  const titleEl = document.getElementById('detailTitle');
  const ratingEl = document.getElementById('detailRating');
  const reviewsCountEl = document.getElementById('detailReviewsCount');
  const priceEl = document.getElementById('detailPrice');
  const mrpEl = document.getElementById('detailMrp');
  const summaryEl = document.getElementById('detailSummary');
  const descEl = document.getElementById('detailDesc');

  if (originBadge) originBadge.innerText = `${p.origin} • ${p.originCity || 'Import'}`;
  if (catBadge) catBadge.innerText = p.categoryName;
  if (titleEl) titleEl.innerText = p.title;
  if (ratingEl) ratingEl.innerText = p.rating;
  if (reviewsCountEl) reviewsCountEl.innerText = `(${p.reviewsCount} atelier reviews)`;
  if (priceEl) priceEl.innerText = formatPrice(p.price);
  if (mrpEl) {
    if (p.originalPrice) {
      mrpEl.innerText = formatPrice(p.originalPrice);
      mrpEl.classList.remove('hidden');
    } else {
      mrpEl.classList.add('hidden');
    }
  }
  if (summaryEl) summaryEl.innerText = p.summary;
  if (descEl) descEl.innerText = p.description;

  // Specifications Table
  const specsContainer = document.getElementById('detailSpecsTable');
  if (specsContainer && p.specs) {
    specsContainer.innerHTML = Object.entries(p.specs).map(([key, val]) => `
      <tr class="border-b border-zinc-100 dark:border-zinc-800">
        <td class="py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-zinc-500 w-1/3 bg-zinc-50/50 dark:bg-zinc-800/30">${key}</td>
        <td class="py-2.5 px-4 text-xs font-medium text-zinc-900 dark:text-zinc-200">${val}</td>
      </tr>
    `).join('');
  }

  // Monogram box visibility
  const monoCard = document.getElementById('monogramPersonalizerCard');
  if (monoCard) {
    if (!p.monogrammable) {
      monoCard.classList.add('hidden');
    } else {
      monoCard.classList.remove('hidden');
    }
  }

  // Wishlist heart sync
  const wishBtn = document.getElementById('detailWishlistBtn');
  if (wishBtn) {
    const isWished = isInWishlist(p.id);
    wishBtn.classList.toggle('active', isWished);
  }

  // Related products
  renderRelatedProducts(p.id);
}

function switchDetailImage(src, thumbBtn) {
  const mainImg = document.getElementById('productMainImg');
  if (mainImg) mainImg.src = src;

  document.querySelectorAll('#productThumbnailsContainer button').forEach(btn => {
    btn.classList.remove('border-amber-600');
    btn.classList.add('border-transparent');
  });
  if (thumbBtn) {
    thumbBtn.classList.remove('border-transparent');
    thumbBtn.classList.add('border-amber-600');
  }
}

// --- MONOGRAM FOIL SIMULATOR ---
function initMonogramListeners() {
  const checkbox = document.getElementById('monogramEnableToggle');
  const input = document.getElementById('monogramTextInput');
  const overlay = document.getElementById('monogramOverlay');
  const previewText = document.getElementById('monogramPreviewText');
  const controlsBox = document.getElementById('monogramOptionsBox');

  if (checkbox) {
    checkbox.addEventListener('change', e => {
      isMonogramActive = e.target.checked;
      if (controlsBox) controlsBox.classList.toggle('hidden', !isMonogramActive);
      if (overlay) overlay.classList.toggle('hidden', !isMonogramActive);
      updateMonogramVisuals();
    });
  }

  if (input) {
    input.addEventListener('input', () => {
      updateMonogramVisuals();
    });
  }
}

function selectFoilColor(foilType) {
  selectedFoil = foilType;
  document.querySelectorAll('.foil-selector-btn').forEach(btn => {
    const type = btn.getAttribute('data-foil');
    if (type === foilType) {
      btn.classList.add('ring-2', 'ring-amber-500', 'border-amber-600');
    } else {
      btn.classList.remove('ring-2', 'ring-amber-500', 'border-amber-600');
    }
  });
  updateMonogramVisuals();
}

function updateMonogramVisuals() {
  const input = document.getElementById('monogramTextInput');
  const previewText = document.getElementById('monogramPreviewText');
  if (!previewText) return;

  const rawVal = input ? input.value.trim().toUpperCase() : 'A.K.';
  previewText.innerText = rawVal || 'A.K.';

  // Remove existing foil classes
  previewText.classList.remove('foil-gold', 'foil-silver', 'foil-deboss');
  if (selectedFoil === 'gold') previewText.classList.add('foil-gold');
  else if (selectedFoil === 'silver') previewText.classList.add('foil-silver');
  else if (selectedFoil === 'deboss') previewText.classList.add('foil-deboss');
}

// Quantity steppers
function incrementDetailQty() {
  detailQty++;
  const el = document.getElementById('detailQtyValue');
  if (el) el.innerText = detailQty;
}

function decrementDetailQty() {
  if (detailQty > 1) {
    detailQty--;
    const el = document.getElementById('detailQtyValue');
    if (el) el.innerText = detailQty;
  }
}

// Add current product to cart
function addDetailProductToCart() {
  if (!currentProduct) return;
  const monoInput = document.getElementById('monogramTextInput');
  const monogramText = isMonogramActive && monoInput ? monoInput.value.trim().toUpperCase() : '';

  addToCart(currentProduct.id, detailQty, {
    monogram: monogramText,
    foil: isMonogramActive ? selectedFoil : ''
  });
}

function toggleDetailWishlist() {
  if (!currentProduct) return;
  toggleWishlist(currentProduct.id);
  const wishBtn = document.getElementById('detailWishlistBtn');
  if (wishBtn) {
    wishBtn.classList.toggle('active', isInWishlist(currentProduct.id));
  }
}

// Reviews
function submitProductReview(event) {
  event.preventDefault();
  const nameInp = document.getElementById('reviewAuthorInput');
  const textInp = document.getElementById('reviewTextInput');
  const list = document.getElementById('reviewsListContainer');

  if (!nameInp || !textInp || !list) return;

  const name = nameInp.value.trim() || 'Valued Patron';
  const text = textInp.value.trim();
  if (!text) return;

  const newRevHTML = `
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-4 space-y-1.5 animate-fade-in">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs text-zinc-900 dark:text-zinc-100">${name}</span>
        <span class="text-[10px] text-zinc-400">Just now • Verified Atelier Order</span>
      </div>
      <div class="text-amber-500 text-xs">★★★★★</div>
      <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">${text}</p>
    </div>
  `;

  list.insertAdjacentHTML('afterbegin', newRevHTML);
  nameInp.value = '';
  textInp.value = '';
  showToast('Thank you! Your atelier review was posted.', 'success');
}

function renderRelatedProducts(currentId) {
  const container = document.getElementById('relatedProductsGrid');
  if (!container) return;
  const related = getRelatedProducts(currentId, 4);
  container.innerHTML = related.map(p => createProductCardHTML(p)).join('');
}
