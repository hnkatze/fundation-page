# Design: content-update

## 1. Architecture Decisions

- **Modify in-place**: All 12 existing components are updated with real content. No structural refactors.
- **Data in frontmatter**: Following the established pattern (see `Proyectos.astro`, `Equipo.astro`), all data arrays/objects live in the `---` frontmatter block. No external data files.
- **Tailwind-only styling**: New components reuse the same Tailwind patterns: `py-20 lg:py-28`, `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, `data-animate` for scroll animations, card-based grids.
- **No new dependencies**: Pure Astro + Tailwind. No JS frameworks, no external embeds (Every.org is a simple link, not an iframe).

---

## 2. New Components

### 2.1 Premios.astro

**Purpose**: Display 9 awards/recognitions (2013-2021).

**Frontmatter data**:
```ts
const premios = [
  {
    nombre: string,      // "Premio Yo Emprendedor"
    entidad: string,     // "UNITEC, Laureate University, ..."
    anio: number,        // 2013
    descripcion?: string // optional short note
  },
  // ... 9 items
]
```

**Layout**: Timeline-style vertical list on mobile, 3-column card grid on desktop. Each card shows year badge, award name, and granting entity. Background: `bg-white` section (alternating with `bg-warm`).

### 2.2 Membresias.astro

**Purpose**: Display 12+ network memberships.

**Frontmatter data**:
```ts
const membresias = [
  {
    red: string,          // "Youth Action Net"
    institucion: string,  // "Laureate University"
    descripcion?: string  // optional context
  },
  // ... 12 items
]
```

**Layout**: Compact badge/chip grid. 2 columns on mobile, 3-4 on desktop. Each item is a small card with network name prominent and institution below. Use `bg-warm` background.

### 2.3 Georgetown.astro

**Purpose**: Highlight the Georgetown University partnership as a prestige signal.

**Frontmatter data**: No array needed -- single block of content, hardcoded in template.

**Layout**: Full-width highlight banner with distinct visual treatment. Dark background (`bg-primary-dark` or `bg-gray-900`) with white text to stand out from regular sections. Contains: headline, descriptive paragraph, and key facts (1 of 2 in LatAm, 10-month program, Master's in Public Policy).

### 2.4 Socios.astro

**Purpose**: Display 2 international partners.

**Frontmatter data**:
```ts
const socios = [
  {
    nombre: string,      // "Creative Business Cup Networks"
    pais: string,        // "Dinamarca"
    desde: number,       // 2019
    descripcion: string  // partnership details
  },
  // 2 items
]
```

**Layout**: Side-by-side cards (2-column grid). Each card shows partner name, country flag/label, year, and description. `bg-white` background.

### 2.5 Donaciones.astro

**Purpose**: Donation CTA with Every.org link and optional bank details.

**Frontmatter data**:
```ts
const everyOrgUrl = "https://www.every.org/fundacion-no-gubernamental-de-desarrollo-honduras-social";

const cuentasBancarias = [
  {
    banco: string,       // "Banco Atlantida"
    tipo: string,        // "Lempiras"
    cuenta: string       // "2010-0581-68"
  },
  // 2 items
]
```

**Layout**: Two-tier design:
1. **Primary CTA**: Large prominent button/card linking to Every.org (opens in new tab). This is the hero of the section.
2. **Secondary**: Collapsible/expandable area with bank account details and SAM tracking ID. Uses a `<details>` element or initially-hidden div for progressive disclosure.

---

## 3. Page Order (index.astro)

Updated component order with rationale:

```
<Navbar />
<Hero />
<QuienesSomos />
<Pilares />
<ImpactoNumeros />
<Proyectos />
<Georgetown />          <!-- NEW: prestige signal right after projects -->
<Premios />             <!-- NEW: credibility through awards -->
<Membresias />          <!-- NEW: network reach -->
<Socios />              <!-- NEW: international partners -->
<Equipo />              <!-- restructured as founder spotlight -->
<ComoAyudar />
<Donaciones />          <!-- NEW: specific donation mechanisms -->
<Transparencia />
<Contacto />
<Footer />
```

**Rationale**:
- Georgetown, Premios, Membresias, Socios form a "credibility block" between projects and the call-to-action sections
- Donaciones sits after ComoAyudar as the specific mechanism (ComoAyudar = why/how, Donaciones = where)
- Testimonios is **removed from the page** (see section 6)

---

## 4. Data Structures for Modified Components

### Proyectos.astro
```ts
const proyectos = [
  {
    titulo: string,       // "Diagnostico Cacao / USAID"
    categoria: string,    // maps to area: "Emprendimiento", "Educacion", etc.
    descripcion: string,  // real project description
    anio: string,         // "2021" or "2019-2022"
    duracion?: string,    // "10 meses", "3 anos"
    socios?: string,      // "Rainforest Alliance, USAID"
    estado: string,       // "Completado" | "En curso"
    color: string         // existing color classes
  },
  // 12 items
]
```

### Pilares.astro
```ts
const pilares = [
  {
    titulo: string,       // "Emprendimiento"
    descripcion: string,  // "Formacion, capacitacion, ..."
    icono: string         // SVG string (reuse existing pattern)
  },
  // 5 items (was 4)
]
```

### ImpactoNumeros.astro
```ts
const stats = [
  { valor: "10+", etiqueta: "Anos de Experiencia" },
  { valor: "15",  etiqueta: "Eventos Copa Creativa" },
  { valor: "12+", etiqueta: "Proyectos Ejecutados" },
  { valor: "9",   etiqueta: "Premios y Reconocimientos" },
  { valor: "14+", etiqueta: "Redes Internacionales" },
]
```

### Equipo.astro (restructured)
```ts
const fundadora = {
  nombre: "Karen Madrid",
  nombreCompleto: "Karen Yesenia Madrid Morales",
  cargo: "Fundadora & Directora Ejecutiva",
  descripcion: "Emprendedora Social hondurena, ...",
}
```

---

## 5. Equipo Section Strategy

**Decision**: Restructure from team grid to **founder spotlight**.

**Implementation**:
- Remove the 6-person grid layout
- Replace with a centered single-person feature layout: large initials circle (or photo placeholder), name, title, and a 2-3 sentence bio
- Add a secondary CTA below: "Unete a nuestro equipo" linking to `#contacto`
- Keep the section id as `equipo` for nav compatibility
- The `equipo` array is replaced with a single `fundadora` object

---

## 6. Testimonios Section Strategy

**Decision**: **Remove from page entirely**.

**Rationale**:
- All current testimonials are fictional and reference invented projects
- No real testimonials are available in the context document
- A "coming soon" placeholder adds no value and looks unprofessional
- Better to have no section than a fake or empty one

**Implementation**:
- Remove `<Testimonios />` from `index.astro`
- Remove the import statement
- **Keep `Testimonios.astro` file** in the codebase (don't delete) so it can be restored when real testimonials are gathered
- Remove "Testimonios" from Navbar links if present

---

## 7. Donaciones vs ComoAyudar Integration

**Decision**: Keep both as separate components with distinct purposes.

| Component | Purpose | Primary CTA |
|-----------|---------|-------------|
| **ComoAyudar** | General ways to help (donate, volunteer, partner, in-kind) | Links to `#contacto` and `#donaciones` |
| **Donaciones** | Specific donation mechanisms (Every.org, bank accounts) | Links to Every.org (external) |

**Changes to ComoAyudar**:
- Update the "Donar Ahora" CTA to link to `#donaciones` instead of `#contacto`
- Keep the 4-card layout (Donacion Monetaria, Voluntariado, Alianzas, Donacion en Especie)
- No structural changes needed

---

## 8. Sensitive Data Handling

### Bank Account Numbers

**Decision**: Display with progressive disclosure.

- Bank account numbers **are displayed** (they are necessary for donors) but behind a `<details><summary>` toggle or a "Mostrar cuentas bancarias" button
- This keeps them off the initial viewport and requires intentional user action
- The numbers are not sensitive in the same way as passwords -- they are routinely shared for receiving transfers
- The Every.org link is the primary/promoted donation path

### RTN (Tax ID)

- Display in Transparencia and Footer. This is public legal information required for transparency.

### Personal Phone Number

- Display as specified: `(504) 3238-3460`. This is the organization's contact number, already published.

### SAM/DUNS Tracking ID

- Display in Donaciones section, within the secondary/collapsible area. This is public government registration data.

---

## 9. Navbar Updates

Add anchor links for new sections. To avoid overcrowding, group related items:

**Visible nav items** (desktop): Inicio, Quienes Somos, Pilares, Proyectos, Equipo, Donaciones, Contacto

**Under a "Mas" dropdown or scroll-accessible** (not in primary nav): Premios, Membresias, Georgetown, Socios, Transparencia

This keeps the navbar clean while all sections remain scroll-accessible via page flow and have proper `id` attributes for deep linking.

---

## 10. Section IDs for Navigation

| Component | Section ID |
|-----------|-----------|
| Georgetown | `georgetown` |
| Premios | `premios` |
| Membresias | `membresias` |
| Socios | `socios` |
| Donaciones | `donaciones` |

All existing sections keep their current IDs unchanged.
