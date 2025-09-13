// Slider simple y funcional
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - Starting enhanced slider');
  
  // Detectar si estamos en localhost o GitHub Pages
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.port === '5500' ||
                     window.location.protocol === 'file:';
  
  const basePath = 'assets/';
  
  // Cargar imágenes optimizadas con WebP support
  document.querySelectorAll('picture').forEach(picture => {
    const source = picture.querySelector('source[data-srcset]');
    const img = picture.querySelector('img[data-src]');
    
    if (source && img) {
      // Cargar WebP
      source.srcset = basePath + source.dataset.srcset;
      // Cargar fallback
      img.src = basePath + img.dataset.src;
    }
  });
  
  // Cargar imágenes simples (sin picture element)
  document.querySelectorAll('img[data-src]:not(picture img)').forEach(img => {
    img.src = basePath + img.dataset.src;
  });
  
  // Defer non-critical slider init slightly to let CSS settle
  setTimeout(() => initializeHeroSlider(), 0);
  
  // Enhanced Slider functionality
  function initializeHeroSlider() {
  const slider = document.querySelector('.hero-background-slider');
  if (!slider) {
    console.log('Slider element not found');
    return;
  }
  
  // Verificar si ya está inicializado
  if (slider.dataset.initialized === 'true') {
    console.log('Slider already initialized, skipping');
    return;
  }
  
  slider.dataset.initialized = 'true';

  // Imágenes del slider
  const images = [
    'images/hero_1.webp',
    'images/hero_2.webp', 
    'images/hero_3.webp'
  ];
  
  let currentIndex = 0;
  let isTransitioning = false;
  
  function changeImage() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Avanzar al siguiente índice ANTES de cargar la imagen
    currentIndex = (currentIndex + 1) % images.length;
    const imagePath = basePath + images[currentIndex];
    console.log(`Slider: Changing to image ${currentIndex + 1}/${images.length} - ${images[currentIndex]}`);
    
    // Fade out current image
    slider.style.opacity = '0';
    
    setTimeout(() => {
      // Change background image
      slider.style.backgroundImage = `url('${imagePath}')`;
      
      // Fade in new image
      slider.style.opacity = '0.7';
      
      console.log(`Slider: Next image will be ${((currentIndex + 1) % images.length) + 1}/${images.length} - ${images[(currentIndex + 1) % images.length]}`);
      
      // Reset transition flag after animation completes
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }, 300);
  }
  
  // Establecer la primera imagen inmediatamente
  const firstImagePath = basePath + images[0];
  console.log(`Slider: Initial image set to ${images[0]}`);
  slider.style.backgroundImage = `url('${firstImagePath}')`;
  slider.style.opacity = '0.7';
  
  // Cambiar imagen cada 6 segundos
  setInterval(changeImage, 6000);
  
  }

  // Enhanced Smooth Scrolling System
  initializeSmoothScrolling();
  
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
  
  // Gallery Image Loading System
  initializeGalleryImages();
  initializeGallerySlider();
  
  // Initialize Countdown Timer
  initializeCountdownTimer();
  
  // Initialize Sticky CTA Behavior
  initializeStickyCTA();

  // Initialize Scroll Reveal Animations
  initializeScrollReveal();

  // Animate spots counter when visible
  initializeSpotsCounterAnimation();
});

// Gallery Image Loading - Static Images with WebP Support
function initializeGalleryImages() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    const picture = item.querySelector('picture');
    if (!picture) return;
    
    const source = picture.querySelector('source');
    const img = picture.querySelector('img');
    
    if (!source || !img) return;
    
    // Mostrar loading state
    showLoadingState(img);
    
    // Cargar imágenes optimizadas con WebP
    const webpUrl = getWebPUrl(index + 1);
    const fallbackUrl = getFallbackUrl(index + 1);
    
    console.log(`Loading optimized images for album ${index + 1}:`, { webp: webpUrl, fallback: fallbackUrl });
    
    // Cargar WebP y fallback
    loadOptimizedImage(source, img, webpUrl, fallbackUrl);
  });
}

// Simple slider for gallery cards
function initializeGallerySlider() {
  const slider = document.querySelector('.gallery-slider');
  if (!slider) return;

  const viewport = slider.querySelector('.slider-viewport');
  const track = slider.querySelector('.slider-track');
  const items = Array.from(slider.querySelectorAll('.gallery-item'));
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const isNativeScroll = false;

  if (!viewport || !track || items.length === 0) return;

  // Settings (modelo por índices)
  const gap = 24;
  let itemWidth = 0;
  let currentIndex = 0; // índice del primer elemento visible
  let offset = 0; // desplazamiento residual durante drag
  let lastTs = 0;
  const speedPxPerSec = parseFloat(slider.dataset.speed || '50');
  let running = window.innerWidth > 768; // autoplay solo desktop
  let dragging = false;

  function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function measureAndLayout() {
    const perView = getItemsPerView();
    if (perView === 1) {
      // En móvil: mostrar "peek" de la siguiente card (p.ej. 88% del ancho)
      const vw = Math.round(viewport.getBoundingClientRect().width);
      itemWidth = Math.floor(vw * 0.73); // 27% peek (aumentado +10%)
      items.forEach((el) => {
        el.style.minWidth = `${itemWidth}px`;
        el.style.maxWidth = `${itemWidth}px`;
        el.style.flex = `0 0 ${itemWidth}px`;
      });
    } else {
      // En tablet/desktop: calcular por columna y no exceder 400px para no pixelar
      const theoretical = (viewport.clientWidth - gap * (perView - 1)) / perView;
      itemWidth = Math.min(Math.round(theoretical), 400);
      items.forEach((el) => {
        el.style.minWidth = `${itemWidth}px`;
        el.style.maxWidth = `${itemWidth}px`;
        el.style.flex = `0 0 ${itemWidth}px`;
      });
    }
    applyTransform();
  }

  function tick(ts) {
    if (!running) return;
    if (!lastTs) lastTs = ts;
    const delta = ts - lastTs;
    lastTs = ts;

    // Desktop: loop infinito por transform; Móvil: no autoplay
    if (window.innerWidth > 768) {
      const step = itemWidth + gap;
      offset += (speedPxPerSec * delta) / 1000;
      let recycled = false;
      while (offset >= step) {
        track.appendChild(track.firstElementChild);
        offset -= step;
        recycled = true;
      }
      if (recycled) {
        // Evitar rebote: aplicar el nuevo offset sin transición en este frame
        const prevTransition = track.style.transition;
        track.style.transition = 'none';
        track.style.transform = `translateX(${-offset}px)`;
        // Restaurar transición en el siguiente frame
        requestAnimationFrame(() => {
          track.style.transition = prevTransition || 'transform 300ms linear';
        });
      } else {
        track.style.transition = 'transform 300ms linear';
        track.style.transform = `translateX(${-offset}px)`;
      }
    }
    requestAnimationFrame(tick);
  }

  function pause() { running = false; lastTs = 0; }
  function resume() { if (!running) { running = true; requestAnimationFrame(tick); } }

  function applyTransform() {
    const base = -(currentIndex * (itemWidth + gap));
    track.style.transition = dragging ? 'none' : 'transform 300ms ease-out';
    track.style.transform = `translateX(${base - offset}px)`;
  }

  window.addEventListener('resize', () => { measureAndLayout(); });

  nextBtn?.addEventListener('click', () => { pause(); slideBy(1); });
  prevBtn?.addEventListener('click', () => { pause(); slideBy(-1); });

  function slideBy(direction) {
    const perView = getItemsPerView();
    const total = items.length;
    currentIndex = (currentIndex + direction * perView + total) % total;
    offset = 0;
    applyTransform();
  }

  viewport.addEventListener('mouseenter', pause);
  viewport.addEventListener('mouseleave', () => { if (window.innerWidth > 768) resume(); });

  // Drag support con axis-lock + fix para enlaces
  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  let startOffset = 0;
  let moved = false;
  let lockedAxis = null; // 'x' | 'y' | null
  function onPointerDown(e){
    // Si el evento proviene de un enlace, no interceptar
    if (e.target && typeof e.target.closest === 'function' && e.target.closest('a')) return;
    isPointerDown = true; moved = false; dragging = false; lockedAxis = null; viewport.classList.remove('dragging');
    startX = (e.touches ? e.touches[0].clientX : e.clientX) || 0;
    startY = (e.touches ? e.touches[0].clientY : e.clientY) || 0;
    startOffset = 0; offset = 0;
  }
  function onPointerMove(e){
    if(!isPointerDown) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX) || 0;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) || 0;
    const dx = startX - x;
    const dy = startY - y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (!lockedAxis) {
      if (absDx > 6 || absDy > 6) {
        lockedAxis = absDx > absDy ? 'x' : 'y';
        if (lockedAxis === 'x') {
          dragging = true; viewport.classList.add('dragging');
          viewport.setPointerCapture?.(e.pointerId);
          pause();
        } else {
          // Dejar que el scroll vertical proceda
          dragging = false; viewport.classList.remove('dragging');
        }
      } else {
        return;
      }
    }
    if (lockedAxis === 'y') {
      // No interferir con el scroll vertical
      return;
    }
    // lockedAxis === 'x'
    if (absDx > 3) moved = true;
    if (moved) e.preventDefault && e.preventDefault();
    const step = itemWidth + gap;
    offset = dx;
    if (dx > step/2) { currentIndex = (currentIndex + 1) % items.length; startX = x; offset = 0; }
    if (dx < -step/2) { currentIndex = (currentIndex - 1 + items.length) % items.length; startX = x; offset = 0; }
    applyTransform();
  }
  function onPointerUp(){
    if(!isPointerDown) return;
    isPointerDown = false; dragging = false; viewport.classList.remove('dragging'); lockedAxis = null;
    offset = 0; applyTransform();
    if (window.innerWidth > 768) resume();
  }
  viewport.addEventListener('pointerdown', onPointerDown, { passive: false });
  viewport.addEventListener('pointermove', onPointerMove, { passive: false });
  viewport.addEventListener('pointerup', onPointerUp, { passive: false });
  viewport.addEventListener('pointercancel', onPointerUp, { passive: false });
  viewport.addEventListener('touchstart', onPointerDown, { passive: false });
  viewport.addEventListener('touchmove', onPointerMove, { passive: false });
  viewport.addEventListener('touchend', onPointerUp, { passive: false });

  measureAndLayout();
  if (window.innerWidth > 768) requestAnimationFrame(tick);
}

function showLoadingState(imgElement) {
  imgElement.style.opacity = '0.3';
  imgElement.style.filter = 'blur(2px)';
  
  // Agregar spinner de loading
  const spinner = document.createElement('div');
  spinner.className = 'image-loading-spinner';
  spinner.innerHTML = '🔄';
  spinner.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    z-index: 10;
    animation: spin 1s linear infinite;
  `;
  
  imgElement.parentElement.style.position = 'relative';
  imgElement.parentElement.appendChild(spinner);
}

// Función para cargar imágenes de Google Photos (removida - usando imágenes estáticas)

function loadOptimizedImage(sourceElement, imgElement, webpUrl, fallbackUrl) {
  console.log('Loading optimized images:', { webp: webpUrl, fallback: fallbackUrl });
  
  // Cargar WebP primero
  const webpImg = new Image();
  
  webpImg.onload = function() {
    console.log('WebP loaded successfully:', webpUrl);
    // Establecer WebP
    sourceElement.srcset = webpUrl;
    
    // Remover loading state
    imgElement.style.opacity = '1';
    imgElement.style.filter = 'none';
    const spinner = imgElement.parentElement.querySelector('.image-loading-spinner');
    if (spinner) spinner.remove();
    
    // Establecer fallback
    imgElement.src = fallbackUrl;
  };
  
  webpImg.onerror = function() {
    console.log('WebP failed, loading fallback:', fallbackUrl);
    // Si WebP falla, cargar solo fallback
    loadFallbackImage(imgElement, fallbackUrl);
  };
  
  webpImg.src = webpUrl;
}

function loadFallbackImage(imgElement, fallbackUrl) {
  const fallbackImg = new Image();
  
  fallbackImg.onload = function() {
    console.log('Fallback image loaded successfully:', fallbackUrl);
    // Remover loading state
    imgElement.style.opacity = '1';
    imgElement.style.filter = 'none';
    const spinner = imgElement.parentElement.querySelector('.image-loading-spinner');
    if (spinner) spinner.remove();
    
    // Establecer la imagen
    imgElement.src = fallbackUrl;
  };
  
  fallbackImg.onerror = function() {
    console.log('Fallback image failed to load:', fallbackUrl);
    // Mostrar placeholder CSS como fallback final
    imgElement.style.opacity = '1';
    imgElement.style.filter = 'none';
    const spinner = imgElement.parentElement.querySelector('.image-loading-spinner');
    if (spinner) spinner.remove();
    imgElement.style.display = 'none'; // Ocultar imagen y mostrar placeholder CSS
  };
  
  fallbackImg.src = fallbackUrl;
}

function getWebPUrl(albumNumber) {
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.port === '5500' ||
                     window.location.protocol === 'file:';
  
  // Para Live Server en puerto 5500
  const basePath = 'assets/';
  const imageUrl = `${basePath}images/gallery-preview-${albumNumber}.webp`;
  
  console.log(`Loading WebP ${albumNumber}:`, imageUrl, 'isLocalhost:', isLocalhost);
  return imageUrl;
}

function getFallbackUrl(albumNumber) {
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.port === '5500' ||
                     window.location.protocol === 'file:';
  
  // Para Live Server en puerto 5500
  const basePath = 'assets/';
  const imageUrl = `${basePath}images/gallery-preview-${albumNumber}.jpg`;
  
  console.log(`Loading fallback ${albumNumber}:`, imageUrl, 'isLocalhost:', isLocalhost);
  return imageUrl;
}

// Enhanced Smooth Scrolling System
function initializeSmoothScrolling() {
  console.log('Initializing enhanced smooth scrolling');
  
  // Configuración del smooth scrolling
  const scrollConfig = {
    duration: 800, // Duración de la animación en ms
    easing: 'easeInOutCubic', // Función de easing
    offset: 80, // Offset para evitar que el contenido se oculte bajo el header
    tolerance: 5 // Tolerancia para considerar que llegamos al destino
  };
  
  // Función de easing personalizada
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  // Función principal de smooth scroll
  function smoothScrollTo(targetElement, options = {}) {
    const config = { ...scrollConfig, ...options };
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop - config.offset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    // Si la distancia es muy pequeña, no hacer scroll
    if (Math.abs(distance) < config.tolerance) {
      return;
    }
    
    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / config.duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + (distance * easedProgress));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Scroll final para asegurar precisión
        window.scrollTo(0, targetPosition);
      }
    }
    
    requestAnimationFrame(animateScroll);
  }
  
  // Agregar event listeners a todos los enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Agregar clase activa al enlace clickeado
      document.querySelectorAll('a[href^="#"]').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Realizar smooth scroll
      smoothScrollTo(targetElement);
      
      // Actualizar URL sin recargar la página
      history.pushState(null, null, targetId);
    });
  });
  
  // Smooth scroll para botones con data-scroll-to
  document.querySelectorAll('[data-scroll-to]').forEach((button) => {
    button.addEventListener('click', (e) => {
      const targetId = button.getAttribute('data-scroll-to');
      const targetElement = document.querySelector(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      smoothScrollTo(targetElement);
    });
  });
  
  // Detectar scroll para actualizar navegación activa y indicador
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateActiveNavigation();
      updateScrollIndicator();
    }, 100);
  });
  
  // Función para actualizar navegación activa basada en scroll
  function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + scrollConfig.offset + 100;
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Actualizar enlaces activos
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Scroll suave para botones de CTA
  document.querySelectorAll('.btn[href^="#"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Agregar efecto visual al botón
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 150);
      
      smoothScrollTo(targetElement, { duration: 1000 });
    });
  });
  
  // Función para actualizar el indicador de scroll
  function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
  }
  
  console.log('Enhanced smooth scrolling initialized');
}

// Countdown Timer System
function initializeCountdownTimer() {
  console.log('Initializing countdown timer');
  
  // Fecha límite: 15 de noviembre de 2025
  const deadline = new Date('November 15, 2025 23:59:59').getTime();
  
  // Elementos del countdown
  const daysElement = document.getElementById('countdown-days');
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');
  const secondsElement = document.getElementById('countdown-seconds');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.error('Countdown elements not found');
    return;
  }
  
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    
    // Si ya pasó la fecha límite
    if (timeLeft < 0) {
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      
      // Ocultar countdown y mostrar mensaje de cierre
      const urgencyContainer = document.querySelector('.urgency-container');
      if (urgencyContainer) {
        urgencyContainer.innerHTML = `
          <div class="spots-urgency">
            <div class="spots-counter-large">
              <div class="counter-number-large">🔒</div>
              <div class="counter-label-large">Inscripciones Cerradas</div>
            </div>
            <div class="urgency-message">
              <p class="spots-left">El período de inscripción ha finalizado</p>
              <p class="guarantee">¡Gracias por tu interés en nuestra expedición!</p>
            </div>
          </div>
          
          <div class="unified-cta">
            <p class="urgency-text">Mantente atento a nuestras próximas aventuras</p>
            <a class="btn btn-secondary" href="https://www.instagram.com/4x4traveleje/" target="_blank" rel="noopener noreferrer">
              Síguenos en Instagram →
            </a>
          </div>
        `;
        urgencyContainer.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.08), rgba(185, 28, 28, 0.08))';
      }
      return;
    }
    
    // Calcular días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Actualizar elementos con formato de dos dígitos
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    // Efecto de pulso cuando quedan menos de 24 horas
    if (days === 0 && hours < 24) {
      const urgencyContainer = document.querySelector('.urgency-container');
      if (urgencyContainer) {
        urgencyContainer.style.animation = 'countdownPulse 1s ease-in-out infinite';
        urgencyContainer.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.12), rgba(185, 28, 28, 0.12))';
      }
    }
    
    // Efecto de pulso cuando quedan menos de 1 hora
    if (days === 0 && hours === 0 && minutes < 60) {
      const urgencyContainer = document.querySelector('.urgency-container');
      if (urgencyContainer) {
        urgencyContainer.style.animation = 'countdownPulse 0.5s ease-in-out infinite';
      }
    }
  }
  
  // Actualizar countdown cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  console.log('Countdown timer initialized');
}

// Sticky CTA Behavior System
function initializeStickyCTA() {
  console.log('Initializing sticky CTA behavior');
  
  const stickyCTA = document.querySelector('.sticky-whatsapp-cta');
  const footer = document.querySelector('.footer-section');
  
  if (!stickyCTA || !footer) {
    console.error('Sticky CTA or footer not found');
    return;
  }
  
  function handleStickyCTA() {
    const footerTop = footer.offsetTop;
    const windowBottom = window.pageYOffset + window.innerHeight;
    const ctaHeight = stickyCTA.offsetHeight;
    
    // Si estamos cerca del footer, ocultar el CTA
    if (windowBottom > footerTop - ctaHeight - 20) {
      stickyCTA.style.opacity = '0';
      stickyCTA.style.transform = 'translateY(20px)';
      stickyCTA.style.pointerEvents = 'none';
    } else {
      stickyCTA.style.opacity = '1';
      stickyCTA.style.transform = 'translateY(0)';
      stickyCTA.style.pointerEvents = 'auto';
    }
  }
  
  // Escuchar scroll para manejar visibilidad del CTA
  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleStickyCTA);
  });
  
  // Manejar resize de ventana
  window.addEventListener('resize', () => {
    requestAnimationFrame(handleStickyCTA);
  });
  
  // Agregar efecto de click al CTA
  stickyCTA.addEventListener('click', (e) => {
    if (e.target.closest('.sticky-whatsapp-btn')) {
      // Efecto de click
      stickyCTA.style.transform = 'scale(0.95)';
      setTimeout(() => {
        stickyCTA.style.transform = 'scale(1)';
      }, 150);
    }
  });
  
  console.log('Sticky CTA behavior initialized');
}

// Spots (Cupos disponibles) - animación limitada a .spots-counter
function initializeSpotsCounterAnimation(){
  const container = document.querySelector('.spots-counter');
  if (!container) return;
  const numberEl = container.querySelector('.counter-number');
  const barEl = container.querySelector('.counter-bar');
  const progressEl = container.querySelector('.counter-progress');
  if (!numberEl || !barEl || !progressEl) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Extraer "X de Y" del texto actual
  const match = (numberEl.textContent || '').match(/(\d+)\s*de\s*(\d+)/i);
  if (!match) return;
  const target = parseInt(match[1], 10);
  const total = parseInt(match[2], 10) || Math.max(target, 1);
  const targetPct = Math.max(0, Math.min(100, Math.round((target/total)*100)));

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      if (reduced) {
        numberEl.textContent = `${target} de ${total}`;
        progressEl.style.width = `${targetPct}%`;
        return;
      }

      const duration = 1000;
      const start = performance.now();
      function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

      function step(ts){
        const t = Math.min(1, (ts - start) / duration);
        const eased = easeOutCubic(t);
        // Descender de total -> target
        const currentVal = Math.round(total - eased * (total - target));
        const currentPct = Math.round((currentVal / total) * 100);
        numberEl.textContent = `${currentVal} de ${total}`;
        progressEl.style.width = `${currentPct}%`;
        if (t < 1) requestAnimationFrame(step);
      }

      // Estado inicial (comienza en total disponibles)
      numberEl.textContent = `${total} de ${total}`;
      progressEl.style.width = '100%';
      requestAnimationFrame(step);
    });
  }, { threshold: 0.35 });

  io.observe(container);
}

// Scroll Reveal System
function initializeScrollReveal(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Forzar reflow ligero antes de aplicar in-view para asegurar transición
        void el.offsetWidth;
        el.classList.add('in-view');
        obs.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealEls.forEach((el) => io.observe(el));
}