# Tasks: content-update

## Phase 1: Critical Fixes
> Fix factually wrong data that could mislead visitors (contact info, dates, city).

- [x] **1.1** Update `src/components/Contacto.astro` — Change email to `karen.madrid@hondurassocial.org`, phone to `(504) 3238-3460`, city to "San Pedro Sula, Honduras", add website `www.hondurassocial.org`. *(SPEC-07: Scenarios 07.1–07.4)*

- [x] **1.2** Update `src/components/Footer.astro` — Change Personeria Juridica to `PJ-09022018-87`, city to "San Pedro Sula, Honduras", add RTN `05019019089184`, add legal name. *(SPEC-08: Scenarios 08.1–08.3)*

- [x] **1.3** Update `src/components/Hero.astro` — Change "desde 2020" to "desde 2011", align messaging with real identity. *(SPEC-01: Scenarios 01.1–01.2)*

---

## Phase 2: Core Identity
> Replace invented mission/vision/pillars with real organizational identity.

- [x] **2.1** Update `src/components/QuienesSomos.astro` — Real mission, vision, founding story, público meta, activities list. *(SPEC-02: Scenarios 02.1–02.5)*

- [x] **2.2** Update `src/components/Pilares.astro` — 5 real areas of work replacing 4 invented ones. *(SPEC-03: Scenario 03.1)*

---

## Phase 3: Real Projects & Impact
> Replace all fictional projects and unverified stats with real data.

- [x] **3.1** Update `src/components/Proyectos.astro` — 12 real projects replacing 6 fictional ones. *(SPEC-04: Scenarios 04.1–04.2)*

- [x] **3.2** Update `src/components/ImpactoNumeros.astro` — 5 verifiable stats. *(SPEC-09: Scenario 09.1)*

---

## Phase 4: Team & Testimonials Restructure
> Handle sections with fictional people/quotes.

- [x] **4.1** Restructure `src/components/Equipo.astro` — Founder spotlight for Karen Madrid. *(SPEC-05: Scenarios 05.1–05.2)*

- [x] **4.2** Remove `<Testimonios />` from `src/pages/index.astro`. *(SPEC-06: Scenarios 06.1–06.2)*

---

## Phase 5: New Sections
> Create the 5 new components that add credibility and donation capability.

- [x] **5.1** Create `src/components/Georgetown.astro` — Georgetown University partnership highlight. *(SPEC-12)*

- [x] **5.2** Create `src/components/Premios.astro` — 9 awards (2013-2021). *(SPEC-10)*

- [x] **5.3** Create `src/components/Membresias.astro` — 12 network memberships. *(SPEC-11)*

- [x] **5.4** Create `src/components/Socios.astro` — 2 international partners. *(SPEC-13)*

- [x] **5.5** Create `src/components/Donaciones.astro` — Every.org + bank details. *(SPEC-14)*

---

## Phase 6: Integration
> Wire everything together: page layout, navigation, and cross-component links.

- [x] **6.1** Update `src/pages/index.astro` — New imports, component order per design doc. *(SPEC-15)*

- [x] **6.2** Update `src/components/Navbar.astro` — Updated nav links. *(SPEC-15)*

- [x] **6.3** Update `src/components/ComoAyudar.astro` — Donation CTA links to `#donaciones`. *(SPEC-16)*

- [x] **6.4** Update `src/components/Transparencia.astro` — Real legal/fiscal data. *(SPEC-17)*

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| 1: Critical Fixes | 3 | ✅ Complete |
| 2: Core Identity | 2 | ✅ Complete |
| 3: Real Projects & Impact | 2 | ✅ Complete |
| 4: Team & Testimonials | 2 | ✅ Complete |
| 5: New Sections | 5 | ✅ Complete |
| 6: Integration | 4 | ✅ Complete |
| **Total** | **18/18** | **✅ All Complete** |
