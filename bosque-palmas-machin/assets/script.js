// Slider simple y funcional
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - Starting enhanced slider');
  
  // Detectar si estamos en localhost o GitHub Pages
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.protocol === 'file:';
  
  const basePath = isLocalhost ? '/bosque-palmas-machin/assets/' : '/4x4-travel-eje/bosque-palmas-machin/assets/';
  
  // Cargar imágenes estáticas (logos)
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = basePath + img.dataset.src;
  });
  
  // Enhanced Slider functionality
  const slider = document.querySelector('.hero-background-slider');
  if (!slider) {
    console.log('Slider element not found');
    return;
  }

  // Imágenes del slider
  const images = [
    'images/hero_3.webp',
    'images/hero_1.webp', 
    'images/hero_2.webp'
  ];
  
  let currentIndex = 0;
  let isTransitioning = false;
  
  function changeImage() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const imagePath = basePath + images[currentIndex];
    console.log('Setting background to:', imagePath);
    
    // Fade out current image
    slider.style.opacity = '0';
    
    setTimeout(() => {
      // Change background image
      slider.style.backgroundImage = `url('${imagePath}')`;
      
      // Fade in new image
      slider.style.opacity = '0.7';
      
      // Update index
      currentIndex = (currentIndex + 1) % images.length;
      
      // Reset transition flag after animation completes
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }, 300);
  }
  
  // Establecer la primera imagen inmediatamente
  const firstImagePath = basePath + images[0];
  slider.style.backgroundImage = `url('${firstImagePath}')`;
  slider.style.opacity = '0.7';
  
  // Cambiar imagen cada 6 segundos
  setInterval(changeImage, 6000);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      const el = document.querySelector(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  
  // Cargar configuración si está disponible
  if (typeof ExpeditionConfig !== 'undefined') {
    try {
      const config = new ExpeditionConfig();
      config.loadConfig().then(() => {
        config.updatePageContent();
        console.log('Config loaded successfully');
      }).catch(error => {
        console.error('Error loading config:', error);
      });
    } catch (error) {
      console.error('Error initializing ExpeditionConfig:', error);
    }
  }
});