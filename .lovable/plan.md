

## Fix: White Header / Light Mode Issue

### Root Cause
The site is designed as a dark-themed portfolio, but the `dark` class is never applied to the `<html>` element. This means the light-mode CSS variables are active (e.g., `--background: 40 20% 97%` which is near-white). The navbar uses `bg-transparent` when not scrolled, so the light page background bleeds through, creating that white strip you see.

### Fix
Add `class="dark"` to the `<html>` tag in `index.html`. This activates the dark CSS variables already defined in `index.css` under `.dark { ... }`, making the entire site consistently dark-themed.

### File Changed
- **`index.html`** — Add `class="dark"` to the `<html>` element

This is a one-line fix that will resolve the white header across all pages.

