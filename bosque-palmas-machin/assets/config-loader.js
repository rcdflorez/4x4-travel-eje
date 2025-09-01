// Configuración centralizada para la expedición
class ExpeditionConfig {
  constructor() {
    this.config = null;
  }

  async loadConfig() {
    try {
      const response = await fetch('/bosque-palmas-machin/config.json');
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Error cargando configuración:', error);
      return null;
    }
  }

  // Actualizar elementos del DOM con datos de configuración
  updatePageContent() {
    if (!this.config) return;

    // Título principal
    this.updateElement('.hero-title h1', this.config.expedition.name);
    
    // Fechas
    this.updateElement('.gp-hero-dates', this.config.expedition.dates.display);
    
    // Precios
    this.updateElement('.pricing-info li:first-child strong', 
      `Vehículo + piloto: ${this.config.pricing.vehicleAndDriver.display}`);
    this.updateElement('.pricing-info li:nth-child(2) strong', 
      `Pasajero adicional: ${this.config.pricing.additionalPassenger.display}`);
    
    // Cupos
    this.updateElement('.pricing-info li:nth-child(3) strong', 
      `Cupos: ${this.config.expedition.capacity.maxVehicles} vehículos`);
    
    // Información de pago
    this.updateElement('.payment-info p:first-child strong', 
      `Pagos: ${this.config.payment.display}`);
    
    // Política de reembolsos
    const refundText = `${this.config.refundPolicy.fullRefund.description}; ${this.config.refundPolicy.partialRefund.description}; ${this.config.refundPolicy.noRefund.description}`;
    this.updateElement('.payment-info p:nth-child(2) strong', 
      `Política de reembolsos: ${refundText}`);
    
    // Lista de incluye
    this.updateList('#incluye .includes ul', this.config.includes);
    
    // Lista de no incluye
    this.updateList('#incluye .excludes ul', this.config.notIncluded);
    
    // Itinerario
    this.updateItinerary();
    
    // Galería
    this.updateGallery();
    
    // Enlaces de WhatsApp
    this.updateWhatsAppLinks();
    
    // Enlaces sociales
    this.updateSocialLinks();
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
    const day1 = document.querySelector('#itinerario .itinerary-day:nth-child(1) summary');
    const day1Desc = document.querySelector('#itinerario .itinerary-day:nth-child(1) p');
    const day2 = document.querySelector('#itinerario .itinerary-day:nth-child(2) summary');
    const day2Desc = document.querySelector('#itinerario .itinerary-day:nth-child(2) p');
    
    if (day1) day1.textContent = this.config.itinerary.day1.title;
    if (day1Desc) day1Desc.textContent = this.config.itinerary.day1.description;
    if (day2) day2.textContent = this.config.itinerary.day2.title;
    if (day2Desc) day2Desc.textContent = this.config.itinerary.day2.description;
  }

  updateGallery() {
    const galleryList = document.querySelector('.gallery-links');
    if (galleryList) {
      galleryList.innerHTML = this.config.gallery.albums.map(album => 
        `<li><a href="${album.url}" target="_blank" rel="noopener noreferrer">${album.name}</a></li>`
      ).join('');
    }
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
