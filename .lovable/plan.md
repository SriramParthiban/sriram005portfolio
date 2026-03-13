

# Plan: Scroll-Driven Storytelling "Sub Theme" Page

## Overview
Create a new `/sub-theme` route with a full scroll-driven storytelling animation page. The page uses Framer Motion's scroll-based animations to guide an animated object through 4 stages of a professional journey, ending with a CTA scene.

## Architecture

### New Files
1. **`src/pages/SubThemePage.tsx`** — The main page component containing all scroll-driven sections
2. **`src/App.tsx`** — Add route for `/sub-theme`

### Design Approach
- Dark theme page (isolated from main site's light theme) using inline/scoped styles
- Framer Motion `useScroll` + `useTransform` for scroll-driven animations
- Each section is a full viewport height (`100vh`) acting as a scroll segment
- A small animated "automation node" object tracks scroll progress, moving horizontally then upward
- Floating tech icons fade in/out per stage using scroll-linked opacity transforms
- Minimalist typography, subtle glow effects via CSS box-shadow/text-shadow

### Section Breakdown

```text
┌─────────────────────────────┐
│  HERO (100vh)               │
│  Dark bg, centered headline │
│  Animated glowing orb       │
├─────────────────────────────┤
│  STAGE 1 — Foundations      │
│  Python, SQL, ML icons      │
├─────────────────────────────┤
│  STAGE 2 — Automation Tools │
│  n8n, Zapier, API icons     │
├─────────────────────────────┤
│  STAGE 3 — AI Systems       │
│  AI agents, dashboards      │
├─────────────────────────────┤
│  STAGE 4 — Real Impact      │
│  Metrics: 1000+ daily etc   │
├─────────────────────────────┤
│  FINAL SCENE                │
│  Orb fades up, CTA message  │
│  LinkedIn / GitHub / Contact│
└─────────────────────────────┘
```

### Animation Strategy
- Use `useScroll({ target: containerRef })` on a parent container
- `useTransform(scrollYProgress, [...], [...])` to map scroll to:
  - Orb X position (left → right across stages 1-4)
  - Orb Y position (moves up in final scene)
  - Orb opacity (fades out at end)
  - Stage content opacity (each stage fades in/out at its scroll range)
- GPU-friendly: only `transform` and `opacity` animated
- Mobile responsive: stages stack naturally, orb hidden on small screens replaced with simpler fade transitions

### Tech Icons
- Use existing logo assets from `/public/logos/` and `src/assets/logos/` (python.svg, n8n.svg, zapier.png, etc.)
- Additional icons from Lucide (Brain, Workflow, BarChart3, Zap, Globe, etc.)

### Mobile
- On screens < 768px, the horizontal orb animation simplifies to vertical progression
- All sections remain full-height with centered content
- Touch scroll works naturally

## Changes Summary
| File | Action |
|------|--------|
| `src/pages/SubThemePage.tsx` | Create — full scroll storytelling page |
| `src/App.tsx` | Edit — add `/sub-theme` route |

