// Función para inicializar el slider
const initSlider = async () => {
  // Función local para obtener rutas de assets
  const getSliderImagePath = (path) => {
    const base = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? '/bosque-palmas-machin/assets'
      : '/4x4-travel-eje/bosque-palmas-machin/assets';
    return `${base}/${path}`;
  };
  const slider = document.querySelector('.hero-background-slider');
  if (!slider || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  try {
    // Definir las rutas de las imágenes
    const images = [
      getSliderImagePath('images/hero_3.webp'),
      getSliderImagePath('images/hero_1.webp'),
      getSliderImagePath('images/hero_2.webp')
    ];
    console.log('Slider images:', images);

    // Precargar las imágenes
    await Promise.all(images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log(`Image loaded successfully: ${src}`);
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
      });
    }));

    console.log('All slider images loaded successfully');

    // Iniciar el slider
    let idx = 0;
    const setBg = () => {
      const imageUrl = images[idx % images.length];
      console.log('Setting background to:', imageUrl);
      slider.style.backgroundImage = `url(${imageUrl})`;
      idx += 1;
    };

    setBg(); // Establecer la primera imagen
    setInterval(setBg, 6000);
  } catch (error) {
    console.error('Error initializing slider:', error);
  }
};

// Función principal de inicialización
const init = async () => {
  console.log('Initializing app...');
  
  try {
    // Inicializar el slider primero
    await initSlider();
    console.log('Slider initialized successfully');

    // Cargar configuración después
    if (typeof ExpeditionConfig !== 'undefined') {
      const config = new ExpeditionConfig();
      await config.loadConfig();
      config.updatePageContent();
      console.log('Config loaded successfully');
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting initialization...');
  init();

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
  const initSlider = async () => {
    const slider = document.querySelector('.hero-background-slider');
    if (!slider || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      // Definir las rutas de las imágenes
      const images = [
        getAssetPath('images/hero_3.webp'),
        getAssetPath('images/hero_1.webp'),
        getAssetPath('images/hero_2.webp')
      ];
      console.log('Slider images:', images);

      // Precargar las imágenes
      await Promise.all(images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
          img.src = src;
        });
      }));

      console.log('All slider images loaded successfully');

      // Iniciar el slider
      let idx = 0;
      const setBg = () => {
        const imageUrl = images[idx % images.length];
        console.log('Setting background to:', imageUrl);
        slider.style.backgroundImage = `url(${imageUrl})`;
        idx += 1;
      };

      setBg(); // Establecer la primera imagen
      setInterval(setBg, 6000);
    } catch (error) {
      console.error('Error initializing slider:', error);
    }
  };

});
});