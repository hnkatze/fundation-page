# Proposal: content-update

## Intent

Replace all placeholder/invented content across the Fundación Honduras Social website with real, verified information sourced from the organization's official context document (`contexto.text`). The current site contains fictional team members, invented projects, wrong contact details, incorrect founding dates, and missing sections — making it unsuitable for public launch. This change brings the site to content-accurate, launch-ready status.

## Scope

### Content Corrections (existing components)

| Component | What's Wrong | Fix |
|-----------|-------------|-----|
| **Hero** | Says "desde 2020" | Change to "desde 2011" (work started) or "constituida en 2018" |
| **QuienesSomos** | Wrong founding narrative, wrong mission/vision text, missing público meta | Replace with real mission, vision, founding story from context. Add público meta: Jóvenes, Mujeres, Personas con Discapacidad |
| **Pilares** | 4 pillars with invented descriptions; missing "Democracia" | Update to 5 real áreas: Emprendimiento, Educación y Discapacidad, Vinculación Internacional, Democracia, Desarrollo Social — with real descriptions |
| **Proyectos** | All 6 projects are fictional | Replace with 12 real projects (Diagnóstico Cacao/USAID, Professional Fellows, Tejiendo Conexiones, Girls Well Being, Copa Creativa, Kits Robótica, Diplomado Democracia, Liderazgo Jóvenes, Voluntarios Internacionales, Damnificados ETA/IOTA, Inclusión Discapacidad, Talleres Democracia) |
| **Equipo** | All team members fictional | Replace with Karen Madrid (Fundadora & CEO) as only confirmed member. Remove or restructure fictional entries |
| **Testimonios** | All testimonials fictional, reference invented projects | Remove or replace with real testimonials (may need to be sourced separately) |
| **Contacto** | Wrong email (info@), wrong phone (+504 2222-3333), wrong city (Tegucigalpa) | Fix to: karen.madrid@hondurassocial.org, (504) 3238-3460, San Pedro Sula |
| **Footer** | Placeholder legal number, wrong city | Fix to: PJ-09022018-87, San Pedro Sula, RTN 05019019089184 |
| **ImpactoNumeros** | Stats are unverified/invented | Update with verifiable numbers from context (10+ años experiencia, 15 eventos Copa Creativa, 12+ proyectos, 9 premios, 14+ redes) |
| **Transparencia** | May contain placeholder data | Verify and update with real legal/fiscal info |

### New Sections (components to create)

| New Component | Content |
|---------------|---------|
| **Premios** | 9 awards/recognitions (2013–2021): Yo Emprendedor, Honduras Innova, Quetglas, Voces Vitales, JCI Agente de Cambio, Indio Lempira, Mujeres Adelante, Global Resiliency Fund, Reto Emprendedor |
| **Membresias** | 14 networks/memberships: Youth Action Net, Viva Trust/INCAE, Voces Vitales, YLAI, OXFAM, Red Juvenil Américas, etc. |
| **Georgetown** | Georgetown University partnership — selected as 1 of 2 LatAm nonprofits for 10-month strategic consulting |
| **Socios** | International partners: Creative Business Cup (Denmark, since 2019), ITD/Professional Fellows (USA, since 2021) |
| **Donaciones** | Every.org fundraising link: https://www.every.org/fundacion-no-gubernamental-de-desarrollo-honduras-social |

### Navigation & Layout Updates

- **Navbar**: Add navigation items for new sections
- **index.astro**: Add new components in logical page order
- **ComoAyudar**: Update with real Every.org donation link

## Affected Files

### Modify (13 files)

- `src/components/Hero.astro` — Fix founding year
- `src/components/QuienesSomos.astro` — Replace mission, vision, founding story, add público meta
- `src/components/Pilares.astro` — 5 real áreas with real descriptions
- `src/components/Proyectos.astro` — 12 real projects replacing 6 fictional
- `src/components/Equipo.astro` — Real team (Karen Madrid), restructure section
- `src/components/Testimonios.astro` — Remove fictional testimonials or mark as pending
- `src/components/Contacto.astro` — Correct email, phone, city
- `src/components/Footer.astro` — Correct legal number, city, contact info
- `src/components/ImpactoNumeros.astro` — Verified stats from real data
- `src/components/Transparencia.astro` — Real legal/fiscal info
- `src/components/ComoAyudar.astro` — Add Every.org link
- `src/components/Navbar.astro` — Add new section nav items
- `src/pages/index.astro` — Integrate new components

### Create (5 files)

- `src/components/Premios.astro` — Awards & recognitions section
- `src/components/Membresias.astro` — Network memberships section
- `src/components/Georgetown.astro` — Georgetown partnership highlight
- `src/components/Socios.astro` — International partners section
- `src/components/Donaciones.astro` — Donation CTA with Every.org integration

## Approach

### Phase 1: Fix Critical Incorrect Info
Update Contacto, Footer, and Hero with correct contact details, city, and founding year. These are factual errors that could mislead visitors.

### Phase 2: Replace Core Content
Update QuienesSomos (mission/vision/story), Pilares (5 real áreas), and Equipo (real team). These define the organization's identity.

### Phase 3: Replace Projects & Impact
Replace all 6 fictional projects in Proyectos with 12 real ones. Update ImpactoNumeros with verifiable stats. Handle Testimonios (remove fictional or mark pending).

### Phase 4: Add Missing Sections
Create Premios, Membresias, Georgetown, Socios, and Donaciones components. These add credibility and completeness.

### Phase 5: Integration & Navigation
Add new components to index.astro in logical order. Update Navbar with new section anchors. Update ComoAyudar with donation link.

### Design Approach
- Maintain existing Tailwind styling patterns and component structure
- New components follow the established visual language (color scheme, spacing, typography)
- All content in Spanish matching the site's language
- Responsive design consistent with existing components

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Missing project images/assets for 12 real projects | High | Medium | Use placeholder icons initially; flag for future asset collection |
| Testimonios section empty after removing fictional content | Medium | Low | Temporarily hide section or show "coming soon" until real testimonials are gathered |
| Equipo section looks sparse with only 1 confirmed member | Medium | Medium | Restructure as a founder spotlight rather than a team grid |
| ImpactoNumeros stats not all directly stated in context | Medium | Low | Only use numbers directly derivable from context; mark others for verification |
| Page becomes significantly longer with 5 new sections | Low | Medium | Use compact layouts, collapsible sections, or tabbed interfaces where appropriate |
| Some project details (donors, exact dates) incomplete in context | Medium | Low | Include what's available; use generic descriptions where specifics are missing |

## Rollback Plan

All changes are content-only (text, component additions). No structural, configuration, or dependency changes.

- **Git revert**: All changes will be committed incrementally by phase. Any phase can be reverted independently via `git revert`.
- **Component isolation**: New components (Premios, Membresias, Georgetown, Socios, Donaciones) can be removed from `index.astro` without affecting existing components.
- **No breaking changes**: No APIs, routes, or build configuration are modified. Rollback is a simple content restoration.
