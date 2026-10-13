/**
 * FABRIKA LABS 3D — APP JS
 * Interatividades do Site Oficial, Filtros e Tema
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPortfolioFilters();
  initFaqAccordion();
  initMobileMenu();
  initSmoothScroll();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const logoHeader = document.getElementById('brandLogo');
  const savedTheme = localStorage.getItem('fabrika-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeAssets(true);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('fabrika-theme', isLight ? 'light' : 'dark');
      updateThemeAssets(isLight);
    });
  }

  function updateThemeAssets(isLight) {
    if (toggleBtn) {
      toggleBtn.innerHTML = isLight ? '🌙' : '☀️';
      toggleBtn.setAttribute('title', isLight ? 'Alternar para Modo Noturno' : 'Alternar para Modo Claro');
    }
    if (logoHeader) {
      logoHeader.src = isLight 
        ? 'assets/logos/fabrika_horizontal_light.svg' 
        : 'assets/logos/fabrika_horizontal_dark.svg';
    }
  }
}

/* ==========================================================================
   2. FILTRO DO PORTFÓLIO & GALERIA
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. ACCORDION FAQ
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
}

/* ==========================================================================
   5. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--surface)';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid var(--border)';
      }
    });

    // Fechar ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   6. SCROLL SUAVE & NAVBAR HIGHLIGHT
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
