/**
 * MONOGRAPH ATELIER — AUTHENTICATION & PROFILE ENGINE (js/auth.js)
 * Login, Signup, 1-Click Demo Profiles, Password Toggles, and Member Dashboard.
 */

// Toggle password visibility
function togglePasswordVisibility(inputId, iconBtn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  if (iconBtn) {
    iconBtn.innerHTML = isPass ? `
      <svg class="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path></svg>
    ` : `
      <svg class="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
    `;
  }
}

// 1-Click Demo Login
function quickDemoLogin(profileType) {
  let profile = {
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

  if (profileType === 'marcus') {
    profile = {
      name: 'Marcus Vance',
      email: 'marcus.vance@studio.de',
      tier: 'Master Architect Member',
      points: 720,
      orders: [
        {
          id: 'MG-91044',
          date: 'April 02, 2026',
          total: 104.00,
          status: 'In Transit',
          items: ['The Architect & Designer Ideation Kit', 'Titanium Drafting Pencil']
        }
      ]
    };
  }

  localStorage.setItem('monograph_user', JSON.stringify(profile));
  showToast(`Welcome back, ${profile.name}!`, 'success');
  setTimeout(() => {
    window.location.href = 'account.html';
  }, 400);
}

// Standard Login Form Handler
function handleLoginForm(event) {
  event.preventDefault();
  const emailInp = document.getElementById('loginEmailInput');
  const passInp = document.getElementById('loginPasswordInput');

  if (!emailInp || !passInp) return;

  const email = emailInp.value.trim();
  const nameFromEmail = email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());

  const user = {
    name: nameFromEmail || 'Patron Member',
    email: email,
    tier: 'Member Guild Patron',
    points: 100,
    orders: []
  };

  localStorage.setItem('monograph_user', JSON.stringify(user));
  showToast(`Signed in successfully as ${user.name}`, 'success');
  setTimeout(() => {
    window.location.href = 'account.html';
  }, 400);
}

// Signup Form Handler
function handleSignupForm(event) {
  event.preventDefault();
  const nameInp = document.getElementById('signupNameInput');
  const emailInp = document.getElementById('signupEmailInput');

  if (!nameInp || !emailInp) return;

  const user = {
    name: nameInp.value.trim(),
    email: emailInp.value.trim(),
    tier: 'New Guild Member',
    points: 150, // bonus on signup
    orders: []
  };

  localStorage.setItem('monograph_user', JSON.stringify(user));
  showToast(`Welcome to MONOGRAPH Atelier, ${user.name}! 150 Guild Points credited.`, 'success');
  setTimeout(() => {
    window.location.href = 'account.html';
  }, 500);
}

// Logout Handler
function handleLogout() {
  localStorage.removeItem('monograph_user');
  showToast('You have signed out of MONOGRAPH Atelier', 'info');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 400);
}

// Account Dashboard Rendering
function initAccountDashboard() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const nameEl = document.getElementById('accountProfileName');
  const emailEl = document.getElementById('accountProfileEmail');
  const tierEl = document.getElementById('accountProfileTier');
  const pointsEl = document.getElementById('accountProfilePoints');
  const avatarEl = document.getElementById('accountProfileAvatar');

  if (nameEl) nameEl.innerText = user.name;
  if (emailEl) emailEl.innerText = user.email;
  if (tierEl) tierEl.innerText = user.tier || 'Guild Member';
  if (pointsEl) pointsEl.innerText = `${user.points || 100} pts`;
  if (avatarEl) {
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    avatarEl.innerText = initials;
  }

  renderAccountOrders(user.orders || []);
}

function switchAccountTab(tabName) {
  document.querySelectorAll('.account-tab-content').forEach(pane => {
    pane.classList.add('hidden');
  });
  document.querySelectorAll('.account-tab-btn').forEach(btn => {
    btn.classList.remove('bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950');
    btn.classList.add('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800', 'dark:text-zinc-300');
  });

  const targetPane = document.getElementById(`accountTab_${tabName}`);
  const targetBtn = document.getElementById(`tabBtn_${tabName}`);
  if (targetPane) targetPane.classList.remove('hidden');
  if (targetBtn) {
    targetBtn.classList.remove('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800', 'dark:text-zinc-300');
    targetBtn.classList.add('bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950');
  }
}

function renderAccountOrders(orders) {
  const container = document.getElementById('accountOrdersContainer');
  if (!container) return;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-zinc-400">
        <p class="font-serif text-lg text-zinc-700 dark:text-zinc-300">No previous orders on file</p>
        <p class="text-xs mt-1">Your bespoke orders will appear here with live tracking.</p>
        <a href="catalog.html" class="btn-primary text-xs mt-4 inline-block">Start Shopping</a>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(ord => `
    <div class="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div>
          <span class="font-mono font-bold text-xs text-amber-700 dark:text-amber-400">${ord.id}</span>
          <span class="text-xs text-zinc-400 ml-3">${ord.date}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="badge-tag ${ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}">${ord.status}</span>
          <span class="font-mono font-bold text-sm">${formatPrice(ord.total)}</span>
        </div>
      </div>
      <div class="text-xs text-zinc-600 dark:text-zinc-400">
        <span class="font-semibold text-zinc-800 dark:text-zinc-200">Items: </span>
        ${ord.items.join(' • ')}
      </div>
    </div>
  `).join('');
}
