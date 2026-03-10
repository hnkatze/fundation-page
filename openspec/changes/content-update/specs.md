# Specifications: content-update

## Overview

These specifications define the exact content requirements for replacing placeholder/fictional data on the Fundación Honduras Social website with verified information from the organization's official context document. All text values specified here are authoritative and MUST be used verbatim unless noted otherwise.

RFC 2119 keywords: MUST, SHALL, SHOULD, MAY are used per their standard definitions.

---

## SPEC-01: Hero Section

### Scenario 01.1: Founding year display

**Given** a visitor loads the homepage
**When** the Hero section renders
**Then** the section MUST NOT display "desde 2020"
**And** the section MUST display either "desde 2011" (referencing when the social work began) or "constituida en 2018" (legal incorporation date)
**And** the section SHOULD clarify the distinction: work started in 2011, legally constituted on March 23, 2018

### Scenario 01.2: Hero messaging

**Given** the Hero section is visible
**When** the visitor reads the primary tagline
**Then** the messaging MUST align with the organization's identity: strengthening communities of women, youth, and persons with disabilities through entrepreneurship, education, volunteering, and international cooperation
**And** the city reference MUST be "San Pedro Sula, Honduras" (NOT "Tegucigalpa")

---

## SPEC-02: QuienesSomos Section

### Scenario 02.1: Mission text

**Given** the QuienesSomos section renders
**When** the mission block is displayed
**Then** the mission text MUST read:
> "Brindar e implementar nuevas estrategias para incluir socialmente y empoderar económicamente a nuestras poblaciones beneficiadas en Honduras; por medio de diferentes programas, actividades y alianzas estratégicas nacionales e internacionales."

### Scenario 02.2: Vision text

**Given** the QuienesSomos section renders
**When** the vision block is displayed
**Then** the vision text MUST read:
> "Ser la fundación líder en Honduras que brinde nuevas oportunidades socioeconómicas a través de las conexiones y las alianzas internacionales, implementando alternativas creativas, de impacto social y ambiental para fortalecer y replicar más programas inclusivos e innovadores que potencien la educación, el voluntariado y el emprendimiento."

### Scenario 02.3: Founding narrative

**Given** the QuienesSomos section renders
**When** the founding story is displayed
**Then** it MUST state that the organization was constituted on March 23, 2018 ("23 de marzo de 2018")
**And** it MUST state that the social work began in 2011 ("nuestro trabajo inició como un emprendimiento social desde 2011")
**And** it MUST identify "Karen Yesenia Madrid Morales" as the founder
**And** it MUST state the legal name: "Fundación No Gubernamental de Desarrollo Honduras Social"

### Scenario 02.4: Target population (Público meta)

**Given** the QuienesSomos section renders
**When** the target population information is displayed
**Then** the section MUST list three primary target groups:
1. **Jóvenes** (Youth)
2. **Mujeres** (Women)
3. **Personas con Discapacidad** (Persons with Disabilities)

**And** it SHOULD mention "Familias de Escasos Recursos" for social development projects
**And** it MAY mention "grupos étnicos" (ethnic groups) as an additional beneficiary group

### Scenario 02.5: Organizational description

**Given** the QuienesSomos section renders
**Then** it MUST include the description:
> "Somos una organización dedicada a fortalecer comunidades, especialmente mujeres, jóvenes, personas con discapacidad y grupos étnicos, a través del emprendimiento, la educación, el voluntariado, la cooperación internacional, y ahora también mediante programas de ambiente y salud, promoviendo el desarrollo sostenible y el bienestar comunitario."

**And** it MUST mention the organization's national coverage ("cobertura a nivel nacional")
**And** it SHOULD list the types of activities offered:
- Entrenamientos
- Talleres
- Conferencias
- Capacitaciones
- Eventos nacionales e internacionales
- Programas de mentoría e incubación para emprendedores
- Actividades de Voluntariado
- Actividades de Desarrollo Social

---

## SPEC-03: Pilares (Áreas de Trabajo) Section

### Scenario 03.1: Five areas of work

**Given** the Pilares section renders
**When** the areas of work are displayed
**Then** the section MUST display exactly 5 areas (NOT 4):

| # | Area | Description |
|---|------|-------------|
| 1 | **Emprendimiento** | "Formación, capacitación, Entrenamiento, Vinculación" |
| 2 | **Educación y Discapacidad** | "Inclusión Educativa y Laboral" |
| 3 | **Vinculación Internacional** | "Alianzas Globales para generación de oportunidades" |
| 4 | **Democracia** | "Formación en Liderazgo ético, valores y civismo" |
| 5 | **Desarrollo Social** | "Ayuda social para poblaciones vulnerables y de escasos recursos" |

**And** the area "Democracia" MUST be present (it is missing in the current site)
**And** no invented/placeholder areas SHALL appear

---

## SPEC-04: Proyectos Section

### Scenario 04.1: Replace fictional projects with real ones

**Given** the Proyectos section renders
**When** the project list is displayed
**Then** all 6 fictional projects MUST be removed
**And** the section MUST display real projects from the following list (minimum 12):

| # | Project Name | Key Details |
|---|-------------|-------------|
| 1 | Diagnóstico Cacao / USAID | Barreras de mujeres en cadena de valor del cacao — Rainforest Alliance, USAID — 2021 — 10 meses |
| 2 | Programa de Liderazgo para Jóvenes | Jóvenes en zonas de violencia — 2019-2022 — 3 años |
| 3 | Tejiendo Conexiones / CONECTA | Incubación digital — Bridge for Billions España y Centroamérica — 2024 — 1 año |
| 4 | Girls Well Being Project | Niñas líderes — Fundación AHAM Education, Ictia (Trinidad & Tobago), Abu Dhabi, UN Women — 2024 — 10 meses |
| 5 | Inclusión al emprendimiento para personas con discapacidad | Asistencia técnica — 2020 — 3 meses |
| 6 | Copa Creativa de Negocios | Hackathon de emprendimiento — 2019-2022 — 15 eventos nacionales |
| 7 | Damnificados Huracanes ETA y IOTA | Recaudación con Asociación de Hondureños Solidarios en Barcelona — 2020 — 1 mes |
| 8 | Voluntarios Internacionales | Jornadas con voluntarios de USA, Europa y África — 2022-2024 — 5 jornadas/año |
| 9 | Kits de Robótica para discapacidad | Donación para niños/jóvenes con discapacidad — Villanueva, Rayito de Sol — 2025 |
| 10 | Talleres Liderazgo, Ética y Democracia | Red de Cambio, Pastoral Penitenciaria, Caritas Honduras — 2025 — 4 meses |
| 11 | Diplomado Construyendo Democracia | Consorcio con Pasos por Honduras y Ghapers (Personas Sordas) — 2025 — 10 meses |
| 12 | Professional Fellows | Departamento de Estado de EE.UU. — ITD |

### Scenario 04.2: Project data accuracy

**Given** each project card renders
**When** the visitor reads the project details
**Then** each project MUST display the project name as listed above
**And** each project SHOULD display the year(s) and duration when available
**And** each project SHOULD display partner/donor information when available
**And** no fictional project names, descriptions, or partners SHALL appear

---

## SPEC-05: Equipo Section

### Scenario 05.1: Remove fictional team members

**Given** the Equipo section renders
**When** the team information is displayed
**Then** all fictional team members MUST be removed
**And** the only confirmed team member MUST be:
- **Name**: Karen Yesenia Madrid Morales (display as "Karen Madrid")
- **Title**: "Fundadora & Directora Ejecutiva" (or "Fundadora & CEO")
- **Nationality**: Hondureña
- **Description**: Emprendedora Social

### Scenario 05.2: Section restructuring

**Given** only one team member is confirmed
**When** the Equipo section renders
**Then** the section SHOULD be restructured as a "founder spotlight" or leadership profile rather than a team grid
**And** it MAY include a call-to-action for joining the team or volunteering
**And** it MUST NOT display any fictional names, photos, or biographies

---

## SPEC-06: Testimonios Section

### Scenario 06.1: Remove fictional testimonials

**Given** the Testimonios section renders
**When** the testimonials are displayed
**Then** all fictional testimonials MUST be removed
**And** the section MUST NOT display quotes attributed to invented people referencing invented projects

### Scenario 06.2: Section handling

**Given** no verified testimonials are available from the context document
**When** the Testimonios section renders
**Then** the section SHOULD either:
- (a) Be temporarily hidden/removed from the page, OR
- (b) Display a placeholder indicating testimonials are coming soon

**And** it MAY be restructured to show institutional profile text instead

---

## SPEC-07: Contacto Section

### Scenario 07.1: Contact email

**Given** the Contacto section renders
**When** the email address is displayed
**Then** the primary email MUST be `karen.madrid@hondurassocial.org`
**And** it MAY additionally display `hondurasocialhn@gmail.com` as a secondary email
**And** it MUST NOT display `info@hondurassocial.org` or any other placeholder email

### Scenario 07.2: Contact phone

**Given** the Contacto section renders
**When** the phone number is displayed
**Then** the phone MUST be `(504) 3238-3460`
**And** it MUST NOT display `+504 2222-3333` or any other placeholder phone

### Scenario 07.3: Contact city

**Given** the Contacto section renders
**When** the location is displayed
**Then** the city MUST be "San Pedro Sula, Honduras"
**And** it MUST NOT display "Tegucigalpa" as the operational city

### Scenario 07.4: Website URL

**Given** the Contacto section renders
**Then** the website MUST be displayed as `www.hondurassocial.org`

---

## SPEC-08: Footer Section

### Scenario 08.1: Legal number

**Given** the Footer renders
**When** the legal/registration information is displayed
**Then** the Personería Jurídica number MUST be `PJ-09022018-87`
**And** it MUST NOT display any placeholder legal number

### Scenario 08.2: Footer location

**Given** the Footer renders
**When** the organization's location is displayed
**Then** the city MUST be "San Pedro Sula, Honduras"
**And** it MUST NOT display "Tegucigalpa"

### Scenario 08.3: Footer contact info

**Given** the Footer renders
**Then** it MUST display the correct contact info consistent with SPEC-07
**And** it SHOULD display the RTN: `05019019089184`
**And** it SHOULD display the legal name: "Fundación No Gubernamental de Desarrollo Honduras Social"

---

## SPEC-09: ImpactoNumeros Section

### Scenario 09.1: Verifiable statistics

**Given** the ImpactoNumeros section renders
**When** the impact statistics are displayed
**Then** the stats MUST be derived from verifiable data in the context document
**And** the following stats MUST be included:

| Stat | Value | Source |
|------|-------|--------|
| Years of experience | 10+ | "más de 10 años de experiencia" |
| Copa Creativa events | 15 | "15 Eventos nacionales" |
| Projects executed | 12+ | 12 projects listed in context |
| Awards received | 9 | 9 premios listed |
| International networks | 14+ | 14 memberships listed |

**And** no unverifiable or invented statistics SHALL appear
**And** each stat SHOULD have a brief label in Spanish

---

## SPEC-10: Premios Section (NEW)

### Scenario 10.1: Awards list

**Given** the Premios section renders
**When** the awards are displayed
**Then** the section MUST display exactly 9 awards in chronological order (newest first or oldest first, consistently):

| # | Award | Granting Entity | Year |
|---|-------|-----------------|------|
| 1 | Premio Yo Emprendedor | UNITEC, Laureate University, Sylvan Foundation, Youth Action Net | 2013 |
| 2 | Premio Reto Emprendedor | Centromype, SICA, Gobierno de Taiwán | 2016 |
| 3 | Premio Honduras Innova | Gobierno de Honduras, Universidad Tecnológica de Honduras | 2017 |
| 4 | Premio Voces Vitales — Mujeres Transformando Honduras | Voces Vitales | 2018 |
| 5 | Premio Quetglas | Un premio a la caridad hecha persona | 2018 |
| 6 | Reconocimiento Agente de Cambio | JCI San Pedro Sula | 2018 |
| 7 | Premios Indio Lempira a la Excelencia | Comunidad hondureña migrante en Barcelona | 2019 |
| 8 | Reconocimiento Finalista Premio Mujeres Adelante | Banco Ficohsa | 2021 |
| 9 | Premio Global Resiliency Fund | International Youth Foundation, N. Conrad Hilton, Burberry (USA) | 2021 |

**And** each award MUST display the award name, granting entity, and year
**And** no fictional awards SHALL appear

### Scenario 10.2: Section design

**Given** the Premios section is a new component
**When** it renders
**Then** it MUST use the existing site's visual language (Tailwind classes, color scheme, spacing)
**And** it MUST be responsive (mobile, tablet, desktop)
**And** it SHOULD use a timeline, grid, or card-based layout

---

## SPEC-11: Membresías / Redes Section (NEW)

### Scenario 11.1: Network memberships list

**Given** the Membresías section renders
**When** the memberships are displayed
**Then** the section MUST display the following networks/memberships:

1. Red Mundial de Jóvenes Emprendedores — Youth Action Net
2. Emprendedores Sociales de Latinoamérica — Viva Trust / INCAE Business School
3. Voces Vitales Honduras — US Embassy — Vital Voices
4. Red de Emprendedores Sociales, Líderes y Agentes de Cambio — World Youth Academy, ONU Viena (Austria)
5. Emprendedores Innovadores en Israel — Mashav — YABT — Golda Meir
6. Red de juventud Internacional — OIJ (Organización Iberoamericana para la Juventud)
7. Cámara Internacional de Emprendedores Honduras — CAINEM
8. Veedores Sociales — Consejo Nacional Anticorrupción CNA / USAID
9. Young Leaders of the Americas Initiative — YLAI Honduras y Embajada Americana
10. Red Juvenil de las Américas — RJA, YABT, OEA, Cumbre de las Américas
11. OXFAM Internacional (Juventudes líderes)
12. Jóvenes líderes por la democracia — Instituto Holandés y Unión Europea

**And** each membership MUST display the network name and affiliated institution(s)
**And** no fictional memberships SHALL appear

### Scenario 11.2: Section design

**Given** the Membresías section is a new component
**When** it renders
**Then** it MUST follow the site's existing Tailwind styling
**And** it SHOULD use a logo grid, badge layout, or compact list format
**And** it MUST be responsive

---

## SPEC-12: Georgetown Section (NEW)

### Scenario 12.1: Georgetown partnership content

**Given** the Georgetown section renders
**When** the partnership information is displayed
**Then** the section MUST state that the organization was selected by Georgetown University
**And** it MUST state they were one of two nonprofits in Latin America selected annually
**And** it MUST state the consultancy duration is 10 months
**And** it MUST state the consultancy is conducted by faculty and students of the Master's in Public Policy program in Washington, USA
**And** it MUST describe the purpose as "acompañamiento estratégico de alto nivel orientado al fortalecimiento institucional y la mejora de nuestro impacto"

### Scenario 12.2: Section design

**Given** the Georgetown section is a new component
**When** it renders
**Then** it SHOULD be styled as a highlight/spotlight section (distinct visual treatment)
**And** it MUST follow the site's Tailwind styling conventions
**And** it MUST be responsive

---

## SPEC-13: Socios Section (NEW)

### Scenario 13.1: Partners list

**Given** the Socios section renders
**When** the partner information is displayed
**Then** the section MUST display exactly 2 international partners:

| Partner | Details |
|---------|---------|
| **Creative Business Cup Networks** | Sede: Dinamarca — Desde 2019 |
| **Institute for Training and Development (ITD)** | Sede: Estados Unidos de América — Desde 2021 — Programa Professional Fellows del Departamento de Estado de EE.UU. |

**And** no fictional partners SHALL appear
**And** each partner MUST display: name, country/headquarters, and year of partnership start

### Scenario 13.2: Section design

**Given** the Socios section is a new component
**When** it renders
**Then** it MUST follow the site's existing Tailwind styling
**And** it SHOULD use a card or side-by-side layout to feature each partner
**And** it MUST be responsive

---

## SPEC-14: Donaciones Section (NEW)

### Scenario 14.1: Every.org integration

**Given** the Donaciones section renders
**When** the donation options are displayed
**Then** the section MUST include a link or embed to the Every.org profile:
`https://www.every.org/fundacion-no-gubernamental-de-desarrollo-honduras-social`
**And** the link MUST be clickable and open in a new tab

### Scenario 14.2: Bank information display

**Given** the Donaciones section renders
**When** bank account information is displayed
**Then** the section SHOULD display the following bank details:

| Bank | Account Type | Account Number |
|------|-------------|----------------|
| Banco Atlántida | Lempiras | 2010-0581-68 |
| Banco Atlántida | Dólares | 2010-0581-69 |

**And** the section MAY mention BANRURAL as an additional banking option (account number pending)

### Scenario 14.3: International verification

**Given** the Donaciones section renders
**Then** it SHOULD display the SAM/DUNS tracking information: Tracking ID `2107264`
**And** it MAY display the organization's fiscal representative status in the USA

### Scenario 14.4: Section design

**Given** the Donaciones section is a new component
**When** it renders
**Then** it MUST include a prominent call-to-action button linking to Every.org
**And** bank details SHOULD be in a collapsible or secondary section (not the primary CTA)
**And** it MUST follow the site's Tailwind styling
**And** it MUST be responsive

---

## SPEC-15: Navigation Updates

### Scenario 15.1: Navbar additions

**Given** the Navbar component renders
**When** the navigation items are displayed
**Then** the Navbar MUST include anchor links for all new sections (Premios, Membresías, Georgetown, Socios, Donaciones)
**And** the navigation order SHOULD follow a logical flow
**And** new items MAY be grouped under dropdown menus to avoid overcrowding

### Scenario 15.2: Page integration

**Given** the index.astro page renders
**When** all sections are displayed
**Then** the new components MUST be added in a logical order within the page
**And** each new section MUST have an `id` attribute matching the navbar anchor

---

## SPEC-16: ComoAyudar Section Update

### Scenario 16.1: Donation link

**Given** the ComoAyudar section renders
**When** a donation CTA is displayed
**Then** it MUST link to:
`https://www.every.org/fundacion-no-gubernamental-de-desarrollo-honduras-social`
**And** it MUST NOT contain placeholder donation links

---

## SPEC-17: Transparencia Section

### Scenario 17.1: Legal and fiscal data

**Given** the Transparencia section renders
**When** the legal information is displayed
**Then** it MUST display:
- Legal name: "Fundación No Gubernamental de Desarrollo Honduras Social"
- Personería Jurídica: `PJ-09022018-87`
- RTN: `05019019089184`
- Date of constitution: "23 de Marzo de 2018"
- Place of constitution: "Tegucigalpa, Honduras" (legal registration city)
- Operational address: "San Pedro Sula, Honduras"
- Signatory: "Karen Yesenia Madrid Morales / Fundadora & Directora Ejecutiva"

**And** no placeholder legal data SHALL appear

---

## Cross-Cutting Requirements

### CX-01: Language

All content MUST be in Spanish, consistent with the existing site language.

### CX-02: No fictional content

No section SHALL contain fictional names, quotes, project names, statistics, or contact information. All displayed content MUST be traceable to the `contexto.text` source document or explicitly marked as pending verification.

### CX-03: Visual consistency

All new and updated components MUST use Tailwind CSS utility classes following the site's existing design patterns (color scheme, spacing, typography, responsive breakpoints).

### CX-04: Responsive design

All new and updated components MUST render correctly on mobile (< 640px), tablet (640px-1024px), and desktop (> 1024px) viewports.

### CX-05: Accessibility

All new sections MUST have appropriate semantic HTML (headings, landmarks, alt text for images). Interactive elements MUST be keyboard accessible.
