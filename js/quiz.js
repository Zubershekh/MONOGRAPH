/**
 * MONOGRAPH ATELIER — GIFT FINDER & QUIZ ENGINE (js/quiz.js)
 * Step-by-step interactive questionnaire with personalized bundle recommendation.
 */

let quizStep = 1;
let quizAnswers = {
  recipient: 'writer',
  aesthetic: 'brass',
  budget: 'mid'
};

function initGiftQuiz() {
  quizStep = 1;
  showQuizStep(1);
}

function selectQuizOption(questionKey, val, btnEl) {
  quizAnswers[questionKey] = val;
  
  // Highlight chosen option
  const parent = btnEl.closest('.quiz-options-group');
  if (parent) {
    parent.querySelectorAll('.quiz-opt-btn').forEach(b => {
      b.classList.remove('border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/30', 'text-amber-900', 'dark:text-amber-200');
      b.classList.add('border-zinc-200', 'dark:border-zinc-800');
    });
    btnEl.classList.add('border-amber-600', 'bg-amber-50', 'dark:bg-amber-950/30', 'text-amber-900', 'dark:text-amber-200');
    btnEl.classList.remove('border-zinc-200', 'dark:border-zinc-800');
  }

  AudioEngine.playClick();
  
  // Auto-advance after 300ms
  setTimeout(() => {
    nextQuizStep();
  }, 320);
}

function showQuizStep(step) {
  quizStep = step;
  document.querySelectorAll('.quiz-step-pane').forEach((pane, idx) => {
    pane.classList.toggle('hidden', idx + 1 !== step);
  });

  const progressFill = document.getElementById('quizProgressFill');
  if (progressFill) {
    progressFill.style.width = `${((step - 1) / 3) * 100}%`;
  }
}

function nextQuizStep() {
  if (quizStep < 3) {
    showQuizStep(quizStep + 1);
  } else {
    calculateQuizResult();
  }
}

function prevQuizStep() {
  if (quizStep > 1) {
    showQuizStep(quizStep - 1);
  }
}

function calculateQuizResult() {
  const resultPane = document.getElementById('quizResultPane');
  const quizStepsWrapper = document.getElementById('quizStepsWrapper');
  if (!resultPane || !quizStepsWrapper) return;

  quizStepsWrapper.classList.add('hidden');
  resultPane.classList.remove('hidden');

  const progressFill = document.getElementById('quizProgressFill');
  if (progressFill) progressFill.style.width = '100%';

  // Determine recommendation
  let recProduct = null;
  if (quizAnswers.recipient === 'architect' || quizAnswers.aesthetic === 'technical') {
    recProduct = getProductById(402) || getProductById(203); // Architect kit
  } else if (quizAnswers.recipient === 'student' || quizAnswers.aesthetic === 'pastel') {
    recProduct = getProductById(202) || getProductById(102); // Pastel set or Washi journal
  } else if (quizAnswers.budget === 'luxury') {
    recProduct = getProductById(401); // Master Scribe Box
  } else {
    recProduct = getProductById(101) || getProductById(201); // Leather journal or Brass pen
  }

  const titleEl = document.getElementById('quizResultTitle');
  const descEl = document.getElementById('quizResultDesc');
  const priceEl = document.getElementById('quizResultPrice');
  const imgEl = document.getElementById('quizResultImg');
  const addBtn = document.getElementById('quizResultAddBtn');
  const linkEl = document.getElementById('quizResultLink');

  if (recProduct) {
    if (titleEl) titleEl.innerText = recProduct.title;
    if (descEl) descEl.innerText = recProduct.summary;
    if (priceEl) priceEl.innerText = formatPrice(recProduct.price);
    if (imgEl) imgEl.src = recProduct.images[0];
    if (linkEl) linkEl.href = `product-detail.html?id=${recProduct.id}`;
    if (addBtn) {
      addBtn.onclick = () => {
        addToCart(recProduct.id);
      };
    }
  }

  showToast('Curated recommendation ready!', 'success');
}

function restartQuiz() {
  quizStep = 1;
  const resultPane = document.getElementById('quizResultPane');
  const quizStepsWrapper = document.getElementById('quizStepsWrapper');
  if (resultPane) resultPane.classList.add('hidden');
  if (quizStepsWrapper) quizStepsWrapper.classList.remove('hidden');
  showQuizStep(1);
}
