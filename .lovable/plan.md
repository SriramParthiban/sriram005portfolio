

# Easter Egg: "Hacker Mode" with Secret Code "Sriram005"

## What it does
When the user types `Sriram005` anywhere on the page (no input field needed — just keyboard), the site transforms into a **retro hacker/terminal theme** with a Matrix-style rain animation overlay, green-on-black colors, and monospace fonts. A small terminal prompt appears confirming access. Typing the code again (or pressing `Escape`) reverts to normal.

## Implementation

### 1. Create `src/components/EasterEgg.tsx`
- Global `keydown` listener that tracks typed characters in a buffer
- When buffer matches `Sriram005`, toggle "hacker mode"
- Adds/removes `.hacker-mode` class on `<html>`
- Shows a brief "ACCESS GRANTED" terminal-style overlay animation (fades after 3s)
- Matrix-style falling green characters canvas animation behind the overlay
- Press `Escape` or type code again to exit

### 2. Add `.hacker-mode` CSS overrides in `src/index.css`
- `html.hacker-mode` overrides all CSS variables: black background, neon green text, green borders
- All fonts switch to monospace (`'Courier New', monospace`)
- Subtle scanline overlay effect via repeating-linear-gradient
- Green glow on primary elements

### 3. Wire into `src/App.tsx`
- Render `<EasterEgg />` component at app root level (always listening)

## Files
- **Create**: `src/components/EasterEgg.tsx`
- **Edit**: `src/index.css` (add `.hacker-mode` variable overrides + scanline effect)
- **Edit**: `src/App.tsx` (add `<EasterEgg />`)

