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
    '.premio-card', '.nuevo-proyecto-card', '.membresia-card', '.socio-card',
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

// ── Split text nodes into per-word spans (preserves highlight spans) ──
function splitIntoWords(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];
  const nodes = Array.from(el.childNodes);

  el.innerHTML = '';
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      text.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          el.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'inline-block';
          span.textContent = part;
          el.appendChild(span);
          words.push(span);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const child = node as HTMLElement;
      const text = child.textContent || '';
      text.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          el.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = `inline-block ${child.className}`;
          span.textContent = part;
          el.appendChild(span);
          words.push(span);
        }
      });
    }
  });

  return words;
}

// ── Phase 3: Hero entrance (no scroll trigger) ─────────
function initHero(): void {
  // Split hero title into per-word spans for stagger animation
  const titleWords: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>('[data-split-text]').forEach(el => {
    titleWords.push(...splitIntoWords(el));
  });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.fromTo('.hero-badge',
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });

  if (titleWords.length) {
    tl.set('.hero-title', { opacity: 1 })
      .fromTo(titleWords,
        { y: 60, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out' }, '-=0.2');
  } else {
    tl.fromTo('.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, '-=0.3');
  }

  tl.fromTo('.hero-subtitle',
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
    { selector: '.nuevos-proyectos-grid', cards: '.nuevo-proyecto-card' },
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
function animateCounter(counter: HTMLElement, trigger: Element, useScrollTrigger: boolean): void {
  const raw = counter.dataset.count || '';
  const prefix = raw.match(/^[^0-9]*/)?.[0] || '';
  const suffix = raw.match(/[^0-9]*$/)?.[0] || '';
  const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
  if (isNaN(target)) return;

  const obj = { value: 0 };
  counter.textContent = prefix + '0' + suffix;

  gsap.to(obj, {
    value: target,
    duration: 2,
    ease: 'power1.out',
    snap: { value: 1 },
    delay: useScrollTrigger ? 0 : 1.2,
    ...(useScrollTrigger && {
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }),
    onUpdate: () => {
      counter.textContent = prefix + Math.round(obj.value).toLocaleString() + suffix;
    },
  });
}

function initCounters(): void {
  // Hero stats — animate on load (no scroll trigger needed)
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    heroStats.querySelectorAll<HTMLElement>('[data-count]').forEach(c =>
      animateCounter(c, heroStats, false)
    );
  }

  // Impacto stats — animate on scroll
  const grid = document.querySelector('.stats-grid');
  if (grid) {
    grid.querySelectorAll<HTMLElement>('[data-count]').forEach(c =>
      animateCounter(c, grid, true)
    );
  }
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

// ── Scroll progress bar ─────────────────────────────────
function initScrollProgress(): void {
  const bar = document.querySelector<HTMLElement>('#scroll-progress');
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: 0.2,
    },
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
      const logoWhite = nav.querySelector<HTMLElement>('#logo-white');
      const logoColor = nav.querySelector<HTMLElement>('#logo-color');
      const navLinks = nav.querySelectorAll('.hidden.md\\:flex a:not(.bg-secondary)');

      if (scrollY > 80) {
        nav.classList.add('bg-white/90', 'backdrop-blur-md', 'border-gray-100', 'shadow-sm');
        nav.classList.remove('bg-transparent', 'border-transparent');
        logoWhite?.classList.add('opacity-0');
        logoColor?.classList.remove('opacity-0');
        navLinks.forEach(l => {
          l.classList.remove('text-white/80');
          l.classList.add('text-gray-600');
        });
      } else {
        nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'border-gray-100', 'shadow-sm');
        nav.classList.add('bg-transparent', 'border-transparent');
        logoWhite?.classList.remove('opacity-0');
        logoColor?.classList.add('opacity-0');
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
  initScrollProgress();
}

document.addEventListener('DOMContentLoaded', init);
