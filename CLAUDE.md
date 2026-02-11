# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fundation is a website built with Astro 5 and Tailwind CSS v4. It is currently in the early starter/scaffold stage.

## Commands

- `npm run dev` — Start dev server at localhost:4321
- `npm run build` — Production build to `./dist/`
- `npm run preview` — Preview production build locally

## Tech Stack

- **Astro 5** (static site generator, `.astro` components)
- **Tailwind CSS v4** — integrated via `@tailwindcss/vite` plugin in `astro.config.mjs`; imported in `src/styles/global.css` with `@import "tailwindcss"`
- **TypeScript** — strict mode via `astro/tsconfigs/strict`

## Architecture

- `src/pages/` — File-based routing (Astro convention)
- `src/layouts/` — Page layout wrappers (e.g., `Layout.astro` sets `<html>`, `<head>`, and imports global CSS)
- `src/components/` — Reusable Astro components
- `src/assets/` — Images and SVGs processed by Astro's asset pipeline
- `src/styles/global.css` — Global stylesheet entry point (Tailwind import)
- `public/` — Static assets served as-is (favicons)

## Styling Rules

- **Full Tailwind always** — All styling must use Tailwind CSS utility classes
- **CSS only for animations** — `<style>` tags are only allowed for CSS animations (@keyframes, transitions that Tailwind can't handle)
- **JS only for animations** — `<script>` tags should only contain animation/interaction logic, not styling
