# Sistema de Diseño Profesional - 4X4 Travel Eje

## 📋 Descripción General

Este sistema de diseño implementa las mejores prácticas de la industria para garantizar consistencia visual, legibilidad y experiencia de usuario profesional en todas las resoluciones (desktop, tablet y mobile).

## 🎯 Pilares Fundamentales

### 1. Sistema de Espaciado Consistente (8-Point Grid)

Basado en el sistema de 8 puntos, todos los espaciados son múltiplos de 8px para crear armonía visual.

#### Variables de Espaciado
```css
--spacing-xs: 8px;    /* Extra pequeño */
--spacing-s: 16px;    /* Pequeño */
--spacing-m: 24px;    /* Mediano */
--spacing-l: 32px;    /* Grande */
--spacing-xl: 48px;   /* Extra grande */
--spacing-xxl: 64px;  /* Extra extra grande */
--spacing-xxxl: 96px; /* Extra extra extra grande */
```

#### Espaciado Adicional
```css
--spacing-4: 4px;     /* Para casos muy específicos */
--spacing-12: 12px;   /* Entre xs y s */
--spacing-20: 20px;   /* Entre s y m */
--spacing-28: 28px;   /* Entre m y l */
--spacing-40: 40px;   /* Entre l y xl */
--spacing-56: 56px;   /* Entre xl y xxl */
--spacing-80: 80px;   /* Para secciones grandes */
```

### 2. Control de Viudas y Huérfanas Tipográficas

#### Para Títulos
```css
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
  line-height: var(--leading-tight);
  margin-bottom: var(--spacing-m);
}
```

#### Para Párrafos
```css
p {
  text-wrap: pretty;
  line-height: var(--leading-normal);
  margin-bottom: var(--spacing-m);
  orphans: 2;
  widows: 2;
}
```

#### Para Textos Largos
```css
.section-intro {
  text-wrap: pretty;
  line-height: var(--leading-relaxed);
  orphans: 3;
  widows: 3;
}
```

### 3. Componentes de Botón Estandarizados

#### Clase Base
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  font-weight: var(--font-semibold);
  border-radius: var(--radius);
  transition: all var(--transition-bounce);
}
```

#### Variantes de Jerarquía

**Botón Primario**
```html
<a href="#" class="btn btn--primary">Reservar Ahora</a>
```

**Botón Secundario**
```html
<a href="#" class="btn btn--secondary">Más Información</a>
```

**Botón Terciario**
```html
<a href="#" class="btn btn--tertiary">Ver Detalles</a>
```

#### Variantes de Tamaño

```html
<a href="#" class="btn btn--primary btn--sm">Pequeño</a>
<a href="#" class="btn btn--primary btn--md">Mediano</a>
<a href="#" class="btn btn--primary btn--lg">Grande</a>
<a href="#" class="btn btn--primary btn--xl">Extra Grande</a>
```

#### Botones Especializados

**WhatsApp**
```html
<a href="#" class="btn btn--whatsapp btn--lg">
  <svg>...</svg>
  Contactar por WhatsApp
</a>
```

**Call-to-Action**
```html
<a href="#" class="btn btn--cta btn--xl">
  ¡Reserva tu Cupo!
</a>
```

## 🛠️ Utilidades de Espaciado

### Márgenes
```css
.m-xs { margin: var(--spacing-xs); }
.m-s { margin: var(--spacing-s); }
.m-m { margin: var(--spacing-m); }
.m-l { margin: var(--spacing-l); }
.m-xl { margin: var(--spacing-xl); }
.m-xxl { margin: var(--spacing-xxl); }

/* Direccionales */
.mt-xs { margin-top: var(--spacing-xs); }
.mb-s { margin-bottom: var(--spacing-s); }
.ml-m { margin-left: var(--spacing-m); }
.mr-l { margin-right: var(--spacing-l); }
```

### Padding
```css
.p-xs { padding: var(--spacing-xs); }
.p-s { padding: var(--spacing-s); }
.p-m { padding: var(--spacing-m); }
.p-l { padding: var(--spacing-l); }
.p-xl { padding: var(--spacing-xl); }
.p-xxl { padding: var(--spacing-xxl); }

/* Direccionales */
.pt-xs { padding-top: var(--spacing-xs); }
.pb-s { padding-bottom: var(--spacing-s); }
.pl-m { padding-left: var(--spacing-m); }
.pr-l { padding-right: var(--spacing-l); }
```

### Gap (Flexbox/Grid)
```css
.gap-xs { gap: var(--spacing-xs); }
.gap-s { gap: var(--spacing-s); }
.gap-m { gap: var(--spacing-m); }
.gap-l { gap: var(--spacing-l); }
.gap-xl { gap: var(--spacing-xl); }
.gap-xxl { gap: var(--spacing-xxl); }
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

### Ajustes Automáticos
- Los botones grandes se reducen automáticamente en móviles
- Los espaciados se ajustan proporcionalmente
- Los botones se vuelven full-width en pantallas muy pequeñas

## 🎨 Sistema Tipográfico

### Tamaños de Fuente
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Pesos de Fuente
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## ⚡ Transiciones y Animaciones

### Transiciones
```css
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
--transition-bounce: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Efectos de Botones
- **Hover**: Elevación suave (-2px)
- **Active**: Retorno a posición original
- **Focus**: Outline visible para accesibilidad
- **Ripple**: Efecto de onda al hacer clic

## ♿ Accesibilidad

### Características Implementadas
- **Focus visible**: Outline claro para navegación por teclado
- **Reduced motion**: Respeta preferencias de movimiento
- **High contrast**: Ajustes para alto contraste
- **Screen readers**: Estructura semántica correcta

### Mejores Prácticas
- Contraste de color mínimo 4.5:1
- Tamaños de objetivo mínimo 44px
- Estados de interacción claros
- Texto alternativo para imágenes

## 📋 Guía de Uso

### 1. Estructura HTML Recomendada
```html
<section class="content-section">
  <div class="container">
    <h2 class="section-title">Título de Sección</h2>
    <p class="section-intro">Descripción introductoria...</p>
    
    <div class="benefits-grid gap-m">
      <div class="feature-item p-m">
        <h3 class="feature-title">Característica</h3>
        <p class="feature-description">Descripción...</p>
        <a href="#" class="btn btn--primary btn--md">Acción</a>
      </div>
    </div>
    
    <div class="cta-actions mt-xl">
      <a href="#" class="btn btn--cta btn--lg">CTA Principal</a>
      <a href="#" class="btn btn--secondary btn--md">CTA Secundario</a>
    </div>
  </div>
</section>
```

### 2. Espaciado Consistente
```html
<!-- ✅ Correcto: Usar variables de espaciado -->
<div class="hero-section pt-xxl pb-xl">
  <div class="container">
    <h1 class="hero-title mb-m">Título Principal</h1>
    <p class="hero-intro mb-l">Descripción...</p>
    <div class="cta-actions gap-s">
      <a href="#" class="btn btn--primary">Acción</a>
    </div>
  </div>
</div>

<!-- ❌ Incorrecto: Espaciado inconsistente -->
<div class="hero-section" style="padding: 50px 0;">
  <div class="container">
    <h1 style="margin-bottom: 20px;">Título Principal</h1>
    <p style="margin-bottom: 30px;">Descripción...</p>
  </div>
</div>
```

### 3. Botones Estandarizados
```html
<!-- ✅ Correcto: Usar clases del sistema -->
<a href="#" class="btn btn--primary btn--lg">Reservar Ahora</a>
<a href="#" class="btn btn--secondary btn--md">Más Info</a>
<a href="#" class="btn btn--whatsapp btn--sm">WhatsApp</a>

<!-- ❌ Incorrecto: Estilos inline -->
<a href="#" style="background: orange; padding: 10px 20px;">Reservar</a>
```

## 🔧 Personalización

### Modificar Variables
Para personalizar el sistema, edita las variables CSS en `:root`:

```css
:root {
  /* Cambiar colores de marca */
  --brand: #tu-color-principal;
  --brand-2: #tu-color-secundario;
  
  /* Ajustar espaciado base */
  --spacing-xs: 6px;  /* En lugar de 8px */
  --spacing-s: 12px;  /* En lugar de 16px */
  
  /* Modificar border radius */
  --radius: 8px;      /* En lugar de 10px */
}
```

### Agregar Nuevas Variantes
```css
/* Nueva variante de botón */
.btn--success {
  background: linear-gradient(135deg, var(--brand-2), #22c55e);
  color: white;
  border-color: var(--brand-2);
}

.btn--success:hover {
  background: linear-gradient(135deg, #15803d, #16a34a);
  box-shadow: 0 8px 25px rgba(22, 163, 74, 0.4);
}
```

## 📊 Beneficios del Sistema

1. **Consistencia Visual**: Espaciado predecible en toda la aplicación
2. **Mantenibilidad**: Cambios centralizados en variables CSS
3. **Escalabilidad**: Fácil agregar nuevos componentes
4. **Accesibilidad**: Cumple estándares WCAG
5. **Performance**: CSS optimizado y eficiente
6. **Responsive**: Adaptación automática a todos los dispositivos

## 🚀 Implementación

1. Incluir `design-system.css` antes de `style.css`
2. Usar las clases y variables del sistema
3. Seguir las guías de espaciado
4. Implementar botones estandarizados
5. Aplicar control tipográfico

---

**Nota**: Este sistema de diseño está optimizado para el proyecto 4X4 Travel Eje y puede ser adaptado para otros proyectos manteniendo la estructura base.
