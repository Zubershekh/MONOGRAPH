/**
 * MONOGRAPH ATELIER — GIFT BOX BUILDER ENGINE (js/builder.js)
 * Interactive box packaging, item selector, handwritten wax seal card, and bundle calculator.
 */

let selectedPackaging = { name: 'Linen Keepsake Box', price: 15.00, img: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80' };
let selectedBoxItemIds = [101, 201]; // defaults
let waxSealColor = 'gold';

function initBoxBuilder() {
  renderBoxPackagingOptions();
  renderBoxBuilderItems();
  initCardNoteListener();
  updateBoxBuilderTotal();
}

function renderBoxPackagingOptions() {
  const container = document.getElementById('packagingOptionsContainer');
  if (!container) return;

  const packages = [
    { name: 'Linen Keepsake Box', price: 15.00, desc: 'Museum-grade magnetic bookcloth with gold foil logo' },
    { name: 'Solid Walnut Heirloom Chest', price: 35.00, desc: 'Handcrafted Oregon walnut with brass hinges' },
    { name: 'Royal Velvet Coffer', price: 18.00, desc: 'Plush midnight navy velvet with satin pull ribbon' }
  ];

  container.innerHTML = packages.map((pkg, idx) => `
    <div 
      onclick="selectPackaging('${pkg.name}', ${pkg.price}, this)" 
      class="packaging-card p-4 rounded-xl border-2 ${pkg.name === selectedPackaging.name ? 'border-amber-600 bg-amber-50/40 dark:bg-amber-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'} cursor-pointer transition"
    >
      <div class="flex items-center justify-between">
        <span class="font-serif font-bold text-base text-zinc-900 dark:text-zinc-100">${pkg.name}</span>
        <span class="font-mono font-bold text-xs text-amber-700 dark:text-amber-400">${formatPrice(pkg.price)}</span>
      </div>
      <p class="text-xs text-zinc-500 mt-1">${pkg.desc}</p>
    </div>
  `).join('');
}

function selectPackaging(name, price, cardEl) {
  selectedPackaging = { name, price };
  document.querySelectorAll('.packaging-card').forEach(c => {
    c.classList.remove('border-amber-600', 'bg-amber-50/40', 'dark:bg-amber-950/20');
    c.classList.add('border-zinc-200', 'dark:border-zinc-800');
  });
  if (cardEl) {
    cardEl.classList.remove('border-zinc-200', 'dark:border-zinc-800');
    cardEl.classList.add('border-amber-600', 'bg-amber-50/40', 'dark:bg-amber-950/20');
  }
  updateBoxBuilderTotal();
}

function renderBoxBuilderItems() {
  const container = document.getElementById('builderItemsGrid');
  if (!container) return;

  const allProducts = (typeof getAllProducts === 'function') ? getAllProducts() : [];
  container.innerHTML = allProducts.map(p => {
    const isSelected = selectedBoxItemIds.includes(p.id);
    return `
      <div 
        onclick="toggleBoxItem(${p.id}, this)"
        class="builder-item-card p-3 rounded-xl border-2 ${isSelected ? 'border-amber-600 bg-amber-50/30 dark:bg-amber-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'} cursor-pointer flex items-center gap-3 transition"
      >
        <img src="${p.images[0]}" alt="${p.title}" class="w-14 h-16 object-cover rounded-lg">
        <div class="flex-grow min-w-0">
          <div class="text-[10px] font-bold text-amber-700 uppercase tracking-wider">${p.categoryName}</div>
          <div class="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">${p.title}</div>
          <div class="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 mt-0.5">${formatPrice(p.price)}</div>
        </div>
        <div class="w-6 h-6 rounded-full border-2 ${isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-zinc-300'} flex items-center justify-center text-xs font-bold flex-shrink-0">
          ${isSelected ? '✓' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleBoxItem(productId) {
  if (selectedBoxItemIds.includes(productId)) {
    if (selectedBoxItemIds.length <= 1) {
      showToast('A bespoke gift box needs at least 1 instrument', 'info');
      return;
    }
    selectedBoxItemIds = selectedBoxItemIds.filter(id => id !== productId);
  } else {
    selectedBoxItemIds.push(productId);
  }
  renderBoxBuilderItems();
  updateBoxBuilderTotal();
}

function initCardNoteListener() {
  const input = document.getElementById('giftCardNoteInput');
  const cardPreview = document.getElementById('giftCardLivePreview');
  if (input && cardPreview) {
    input.addEventListener('input', () => {
      cardPreview.innerText = input.value.trim() || '“May your writing flow with effortless clarity and purpose.”';
    });
  }
}

function selectWaxSeal(color) {
  waxSealColor = color;
  const sealEl = document.getElementById('waxSealPreview');
  if (sealEl) {
    sealEl.className = `w-8 h-8 rounded-full flex items-center justify-center font-serif text-white font-bold text-xs shadow-md border border-white/30 ${
      color === 'gold' ? 'bg-amber-500' : color === 'burgundy' ? 'bg-red-800' : 'bg-emerald-800'
    }`;
  }
  showToast(`Wax seal set to ${color}`, 'info');
}

function updateBoxBuilderTotal() {
  const allProducts = (typeof getAllProducts === 'function') ? getAllProducts() : [];
  const itemsTotal = selectedBoxItemIds.reduce((sum, id) => {
    const prod = allProducts.find(p => p.id === id);
    return sum + (prod ? prod.price : 0);
  }, 0);

  const grandTotal = selectedPackaging.price + itemsTotal;

  const totalEl = document.getElementById('boxBuilderTotalPrice');
  const countEl = document.getElementById('boxBuilderItemsCount');

  if (totalEl) totalEl.innerText = formatPrice(grandTotal);
  if (countEl) countEl.innerText = `${selectedBoxItemIds.length} item${selectedBoxItemIds.length === 1 ? '' : 's'}`;
}

function addCustomBoxToCart() {
  const allProducts = (typeof getAllProducts === 'function') ? getAllProducts() : [];
  const selectedProds = allProducts.filter(p => selectedBoxItemIds.includes(p.id));
  const titles = selectedProds.map(p => p.title).join(', ');
  const noteInp = document.getElementById('giftCardNoteInput');
  const noteText = noteInp ? noteInp.value.trim() : '';

  const itemsTotal = selectedProds.reduce((s, p) => s + p.price, 0);
  const total = selectedPackaging.price + itemsTotal;

  addToCart(Date.now(), 1, {
    customTitle: `Bespoke Gift Box: ${selectedPackaging.name}`,
    customPrice: total,
    customImg: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    monogram: noteText ? `Note: "${noteText.substring(0, 20)}..."` : `Seal: ${waxSealColor}`,
    foil: waxSealColor
  });

  showToast('Custom Gift Box added to your Atelier Cart!', 'success');
}
