document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM loaded, initializing...');
  
  // Cargar configuración (opcional)
  if (typeof ExpeditionConfig !== 'undefined') {
    try {
      const config = new ExpeditionConfig();
      await config.loadConfig();
      config.updatePageContent();
      console.log('Config loaded successfully');
    } catch (error) {
      console.log('Config loading failed:', error);
    }
  } else {
    console.log('ExpeditionConfig not available, continuing without config');
  }

  // Mobile menu functionality
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  
  console.log('Nav element:', nav);
  console.log('Toggle element:', toggle);
  
  if (toggle && nav) {
    console.log('Adding click listener to toggle');
    toggle.addEventListener('click', (e) => {
      console.log('Toggle clicked!');
      e.preventDefault();
      e.stopPropagation();
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      console.log('Menu toggled, open class:', nav.classList.contains('open'));
    });
  } else {
    console.log('Toggle or nav not found!');
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu when clicking a link
      if (nav && nav.classList.contains('open') && toggle) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Hero background slider
  const slider = document.querySelector('.hero-background-slider');
  if (slider && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const images = [
      '/4x4-travel-eje/bosque-palmas-machin/assets/images/hero_1.png',
      '/4x4-travel-eje/bosque-palmas-machin/assets/images/hero_2.png'
    ];
    let idx = 0;
    const setBg = () => {
      slider.style.backgroundImage = `url(${images[idx % images.length]})`;
      idx += 1;
    };
    setBg();
    setInterval(setBg, 6000);
  }
});