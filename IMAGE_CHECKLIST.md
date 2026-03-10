# Checklist de Imagenes - Honduras Social

Listado de todas las imagenes necesarias para completar el sitio web.
Cuando consigas una imagen, colocala en la carpeta indicada y marca el checkbox.

---

## PRIORIDAD CRITICA

### Hero
- [ ] `/images/hero-bg.webp` — Foto de fondo hero (comunidad, empoderamiento, voluntariado)
  - Tamano: 1920x1080 min
  - Nota: Debe verse bien oscurecida (se aplica overlay), preferiblemente de actividades de la fundacion

### Equipo
- [ ] `/images/team/karen-madrid.webp` — Foto profesional de Karen Madrid
  - Tamano: 400x400 min, cuadrada
  - Nota: Headshot profesional, se recorta en circulo

### Open Graph / SEO
- [ ] `/public/og-image.png` — Imagen para compartir en redes sociales
  - Tamano: 1200x630 exacto
  - Nota: Incluir logo + nombre de la fundacion + tagline

---

## PRIORIDAD ALTA

### Testimonios (fotos de beneficiarios)
- [ ] `/images/testimonials/maria-elena.webp` — Maria Elena Reyes
- [ ] `/images/testimonials/carlos-mejia.webp` — Carlos Mejia
- [ ] `/images/testimonials/dona-santos.webp` — Dona Santos
  - Tamano: 150x150 min, cuadrada
  - Nota: Se muestran en circulo pequeno, pueden ser fotos casuales

### Proyectos (fotos de actividades)
- [ ] `/images/projects/diagnostico-cacao.webp` — Diagnostico Cacao USAID
- [ ] `/images/projects/liderazgo-jovenes.webp` — Liderazgo para Jovenes
- [ ] `/images/projects/tejiendo-conexiones.webp` — Tejiendo Conexiones / CONECTA
- [ ] `/images/projects/girls-wellbeing.webp` — Girls Well Being Project
- [ ] `/images/projects/inclusion-emprendimiento.webp` — Inclusion al Emprendimiento
- [ ] `/images/projects/copa-creativa.webp` — Copa Creativa de Negocios
- [ ] `/images/projects/damnificados-eta.webp` — Damnificados ETA e IOTA
- [ ] `/images/projects/voluntarios-internacionales.webp` — Voluntarios Internacionales
- [ ] `/images/projects/kits-robotica.webp` — Kits de Robotica
- [ ] `/images/projects/talleres-liderazgo.webp` — Talleres Liderazgo y Democracia
- [ ] `/images/projects/diplomado-democracia.webp` — Diplomado Democracia e Inclusion
- [ ] `/images/projects/professional-fellows.webp` — Professional Fellows
  - Tamano: 800x450 min (16:9 landscape)
  - Nota: Fotos de las actividades del proyecto, se muestran como thumbnail en la card

---

## PRIORIDAD MEDIA

### Logo de la Fundacion
- [ ] `/images/logos/logo-white.svg` — Logo blanco (para navbar transparente/hero)
- [ ] `/images/logos/logo-color.svg` — Logo a color (para navbar scrolleado/footer)
  - Formato: SVG preferible, PNG si no hay SVG

### Socios Internacionales (logos)
- [ ] `/images/partners/creative-business-cup.webp` — Creative Business Cup Networks
- [ ] `/images/partners/itd.webp` — Institute for Training and Development
- [ ] `/images/partners/georgetown.webp` — Georgetown University
  - Tamano: 300x120 min, fondo transparente

### Membresias (logos, opcional)
- [ ] `/images/partners/youth-action-net.webp`
- [ ] `/images/partners/viva-trust.webp`
- [ ] `/images/partners/vital-voices.webp`
- [ ] `/images/partners/world-youth-academy.webp`
- [ ] `/images/partners/mashav.webp`
- [ ] `/images/partners/oij.webp`
- [ ] `/images/partners/cainem.webp`
- [ ] `/images/partners/cna-usaid.webp`
- [ ] `/images/partners/ylai.webp`
- [ ] `/images/partners/yabt-oea.webp`
- [ ] `/images/partners/oxfam.webp`
- [ ] `/images/partners/instituto-holandes.webp`
  - Tamano: 200x80 min
  - Nota: Estos son opcionales, la seccion se ve bien sin ellos

---

## PRIORIDAD BAJA

### Extras
- [ ] `/public/apple-touch-icon.png` — Icono iOS (180x180)

---

## Notas Tecnicas

- **Formato preferido**: WebP (mejor compresion). SVG para logos vectoriales.
- **Nombrar archivos**: kebab-case, sin acentos ni caracteres especiales.
- **Colocar en**: `public/images/` (servidas directamente, sin procesamiento Astro).
- **Activar en codigo**: Buscar `TODO [IMAGEN]` en los componentes para saber donde descomentar/activar cada imagen.

### Como activar una imagen

1. Colocar el archivo en la ruta indicada dentro de `public/`
2. Buscar el `TODO [IMAGEN]` correspondiente en el componente
3. Para imagenes con propiedad `imagen: ''`, llenar la ruta: `imagen: '/images/projects/nombre.webp'`
4. Para imagenes comentadas (Hero, Georgetown, Navbar), descomentar el bloque de `<img>`
