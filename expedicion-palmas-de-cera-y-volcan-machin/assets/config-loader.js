// Configuración centralizada para la expedición
class ExpeditionConfig {
  constructor() {
    this.config = null;
  }

  isLocalhost() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.protocol === 'file:';
  }

  getBasePath() {
    const path = window.location.pathname.replace(/\/$/, '');
    const parts = path.split('/').filter(Boolean);
    return parts.length ? `/${parts[0]}` : '';
  }

  getAssetsPath() {
    return `${this.getBasePath()}/assets`;
  }

  async loadConfig() {
    try {
      const basePath = this.getBasePath();
      const response = await fetch(`${basePath}/config.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.config = await response.json();
      
      // Ajustar las rutas base según el entorno
      this.config.paths = {
        base: this.getBasePath(),
        assets: `${this.getBasePath()}/assets`
      };
      
      return this.config;
    } catch (error) {
      console.error('Error cargando configuración:', error);
      return null;
    }
  }

  // Actualizar elementos del DOM con datos de configuración
  updatePageContent() {
    if (!this.config) return;

    console.log('Updating page content from config...');

    // Título principal
    this.updateElement('.hero-title h1', this.config.expedition.name);
    
    // Fechas
    this.updateElement('.gp-hero-dates', this.config.expedition.dates.display);
    
    // Lista de incluye
    this.updateList('#incluye .includes ul', this.config.includes);
    
    // Lista de no incluye
    this.updateList('#incluye .excludes ul', this.config.notIncluded);
    
    // Enlaces de WhatsApp
    this.updateWhatsAppLinks();
    
    // Enlaces sociales
    this.updateSocialLinks();
    
    console.log('Page content updated successfully');
  }

  updateElement(selector, text) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  }

  updateList(selector, items) {
    const list = document.querySelector(selector);
    if (list) {
      list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
    }
  }

  updateItinerary() {
    // El itinerario está hardcodeado en el HTML
    // No necesitamos actualizar desde config.json
    console.log('Itinerary is hardcoded in HTML');
  }

  updateGallery() {
    // La galería ahora se maneja con JavaScript dinámico
    // No necesitamos actualizar desde config.json
    console.log('Gallery updated dynamically');
  }

  updateWhatsAppLinks() {
    const registrationText = encodeURIComponent(this.config.contact.whatsapp.texts.registration);
    const infoText = encodeURIComponent(this.config.contact.whatsapp.texts.info);
    
    // CTA principal
    const mainCTA = document.querySelector('.cta-actions .btn-primary');
    if (mainCTA) {
      mainCTA.href = `${this.config.contact.whatsapp.url}?text=${registrationText}`;
    }
    
    // Botón flotante
    const floatingWhatsApp = document.querySelector('.floating-whatsapp');
    if (floatingWhatsApp) {
      floatingWhatsApp.href = `${this.config.contact.whatsapp.url}?text=${infoText}`;
    }
    
    // Barra sticky
    const stickyCTA = document.querySelector('.sticky-cta .btn-primary');
    if (stickyCTA) {
      stickyCTA.href = `${this.config.contact.whatsapp.url}?text=${registrationText}`;
    }
  }

  updateSocialLinks() {
    const socialLinks = document.querySelectorAll('.icons a');
    if (socialLinks.length >= 4) {
      socialLinks[0].href = this.config.contact.social.instagram;
      socialLinks[1].href = `${this.config.contact.whatsapp.url}?text=${encodeURIComponent(this.config.contact.whatsapp.texts.info)}`;
      socialLinks[2].href = this.config.contact.social.facebook;
      socialLinks[3].href = this.config.contact.social.youtube;
      socialLinks[4].href = this.config.contact.social.tiktok;
    }
  }

  // Obtener datos específicos
  getDates() {
    return this.config?.expedition.dates;
  }

  getPricing() {
    return this.config?.pricing;
  }

  getContact() {
    return this.config?.contact;
  }

  getRefundPolicy() {
    return this.config?.refundPolicy;
  }
}

// Exportar para uso global
window.ExpeditionConfig = ExpeditionConfig;
