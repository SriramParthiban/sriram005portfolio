

# Dark Mode Toggle Implementation

## What we're building
A sun/moon toggle in the navbar that switches the entire portfolio between light and dark themes. The dark theme will use deep greens and muted earth tones to complement the existing nature aesthetic.

## Technical approach

### 1. Dark theme CSS variables (`src/index.css`)
Add a `.dark` block under `:root` with inverted/dark values for all existing CSS custom properties — dark green-black backgrounds, light text, muted green accents, amber accent preserved.

### 2. Theme provider hook (`src/hooks/use-theme.tsx`)
- Reads/writes `localStorage` key `"theme"` (values: `light` | `dark`)
- Defaults to `light`
- Toggles `.dark` class on `<html>` element
- Exposes `{ theme, toggleTheme }` via React context

### 3. Toggle button in Navbar (`src/components/Navbar.tsx`)
- Sun/Moon icon button next to the Resume download button
- Smooth icon transition using framer-motion
- Works on both desktop and mobile nav

### 4. Component adjustments
Several components use hardcoded colors (e.g., `bg-white`, `text-gray-900`, inline hex values). These need updating to use theme-aware classes like `bg-background`, `text-foreground`, or `dark:` variants. Key files to audit:
- `Hero.tsx` — background overlay colors
- `Experience.tsx`, `Projects.tsx`, `Skills.tsx` — card backgrounds
- `Footer.tsx`, `Contact.tsx` — section backgrounds
- `ChatWidget.tsx` — widget colors
- `Playground.tsx` — background/text
- `TrustStats.tsx`, `SkillsTicker.tsx` — backgrounds

### 5. Smooth transition
Add `transition-colors duration-300` to `<body>` so the switch feels seamless.

## Files to create/modify
- **Create**: `src/hooks/use-theme.tsx`
- **Modify**: `src/index.css`, `src/components/Navbar.tsx`, `src/App.tsx` (wrap with provider), and ~10 component files for hardcoded color fixes

