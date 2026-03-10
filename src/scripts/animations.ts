import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ── Reduced motion fallback ─────────────────────────────
function setFinalStates(): void {
  const selectors = [
    '.hero-badge', '.hero-title', '.hero-subtitle',
    '.hero-cta > *', '.hero-stats > div',
    '.section-header > *',
    '.contacto-content',
    '.valor-card', '.pilares-card', '.stat-card',
    '.proyecto-card', '.testimonio-card', '.ayudar-card',
    '.equipo-card', '.documento-card',
    '.premio-card', '.membresia-card', '.socio-card',
  ];
  gsap.set(selectors.join(', '), { opacity: 1, y: 0, scale: 1 });

  // Set counters to final values
  document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    el.textContent = el.dataset.count || '';
  });

  // Set progress bars to full width
  document.querySelectorAll<HTMLElement>('.progress-fill').forEach(el => {
    el.style.transform = 'scaleX(1)';
  });

  // Remove gsap-hidden so content is visible
  document.querySelectorAll('.gsap-hidden').forEach(el => el.classList.remove('gsap-hidden'));
}

// ── Phase 3: Hero entrance (no scroll trigger) ─────────
function initHero(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo('.hero-badge',
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' })
    .fromTo('.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
    .fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
    .fromTo('.hero-cta > *',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 }, '-=0.3')
    .fromTo('.hero-stats > div',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2');
}

// ── Phase 4: Section headers scroll reveal ──────────────
function initScrollReveals(): void {
  gsap.utils.toArray<HTMLElement>('.section-header').forEach(header => {
    gsap.fromTo(header.children,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
  });

  const contactoContent = document.querySelector('.contacto-content');
  if (contactoContent) {
    gsap.fromTo(contactoContent,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactoContent,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
  }
}

// ── Phase 4: Card/grid stagger reveals ──────────────────
function initStaggerReveals(): void {
  const grids = [
    { selector: '.valores-grid', cards: '.valor-card' },
    { selector: '.pilares-grid', cards: '.pilares-card' },
    { selector: '.stats-grid', cards: '.stat-card' },
    { selector: '.proyectos-grid', cards: '.proyecto-card' },
    { selector: '.testimonios-grid', cards: '.testimonio-card' },
    { selector: '.ayudar-grid', cards: '.ayudar-card' },
    { selector: '.equipo-grid', cards: '.equipo-card' },
    { selector: '.documentos-list', cards: '.documento-card' },
    { selector: '.premios-grid', cards: '.premio-card' },
    { selector: '.membresias-grid', cards: '.membresia-card' },
    { selector: '.socios-grid', cards: '.socio-card' },
  ];

  grids.forEach(({ selector, cards }) => {
    const grid = document.querySelector(selector);
    if (!grid) return;

    gsap.fromTo(grid.querySelectorAll(cards),
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
  });
}

// ── Phase 4: Progress bars (Transparencia) ──────────────
function initProgressBars(): void {
  const bars = document.querySelector('.progress-bars');
  if (!bars) return;

  gsap.fromTo(bars.querySelectorAll('.progress-fill'),
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1, transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: bars,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
}

// ── Phase 5: Counter animations ─────────────────────────
function initCounters(): void {
  const grid = document.querySelector('.stats-grid');
  if (!grid) return;

  grid.querySelectorAll<HTMLElement>('[data-count]').forEach(counter => {
    const raw = counter.dataset.count || '';
    const prefix = raw.match(/^[^0-9]*/)?.[0] || '';
    const suffix = raw.match(/[^0-9]*$/)?.[0] || '';
    const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (isNaN(target)) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power1.out',
      snap: { value: 1 },
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        counter.textContent = prefix + Math.round(obj.value).toLocaleString() + suffix;
      },
    });
  });
}

// ── Phase 5: Parallax on background blobs ───────────────
function initParallax(): void {
  gsap.utils.toArray<HTMLElement>('.parallax-blob').forEach(blob => {
    gsap.to(blob, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: blob.closest('section') || blob.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}

// ── Phase 5: Navbar scroll behavior ─────────────────────
function initNavbar(): void {
  const nav = document.querySelector<HTMLElement>('nav');
  if (!nav) return;

  let lastScrollY = 0;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      const scrollY = self.scroll();

      // Show/hide navbar based on scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.in' });
      } else {
        gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
      }
      lastScrollY = scrollY;

      // Toggle navbar style based on scroll position
      const logos = nav.querySelectorAll<HTMLElement>('a[href="/"] span');
      const navLinks = nav.querySelectorAll('.hidden.md\\:flex a:not(.bg-secondary)');

      if (scrollY > 80) {
        nav.classList.add('bg-white/90', 'backdrop-blur-md', 'border-gray-100', 'shadow-sm');
        nav.classList.remove('bg-transparent', 'border-transparent');
        logos.forEach((el, i) => {
          el.classList.remove('text-white');
          el.classList.add(i === 0 ? 'text-primary' : 'text-secondary');
        });
        navLinks.forEach(l => {
          l.classList.remove('text-white/80');
          l.classList.add('text-gray-600');
        });
      } else {
        nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'border-gray-100', 'shadow-sm');
        nav.classList.add('bg-transparent', 'border-transparent');
        logos.forEach(el => {
          el.classList.remove('text-primary', 'text-secondary');
          el.classList.add('text-white');
        });
        navLinks.forEach(l => {
          l.classList.remove('text-gray-600');
          l.classList.add('text-white/80');
        });
      }
    },
  });
}

function init(): void {
  if (prefersReducedMotion()) {
    setFinalStates();
    return;
  }

  document.querySelectorAll('.gsap-hidden').forEach(el => el.classList.remove('gsap-hidden'));

  initHero();
  initScrollReveals();
  initStaggerReveals();
  initCounters();
  initParallax();
  initNavbar();
  initProgressBars();
}

document.addEventListener('DOMContentLoaded', init);
