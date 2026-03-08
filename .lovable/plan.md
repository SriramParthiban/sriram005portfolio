

## Plan: Transform Skills Cards into Sticky Note Style

### What changes
Replace the current glassmorphic skill cards with colorful sticky-note-styled cards, matching the paper aesthetic from the About section — folded corners, notebook lines, tape strips, and distinct colors per category.

### Design approach
- Each of the 6 skill categories becomes a large sticky note with the same visual language used in About: `clip-path` folded corner, repeating-linear-gradient paper lines, semi-transparent tape strip at top
- Color palette: yellow, pink, green, blue, purple, orange — one per category
- Skills inside each note rendered as small handwritten-style badges
- Category icon and title at the top of each note
- Subtle rotation per card (alternating -2deg to 3deg) for that "pinned to a board" feel

### Responsive behavior
- **Desktop**: 3-column grid of sticky notes with slight rotations
- **Tablet**: 2-column grid
- **Mobile**: Single column, full width, reduced rotations

### Animations
- Keep existing `FadeInSection` staggered entry
- Add subtle `framer-motion` hover: slight lift + shadow increase (no rotation change on hover to keep it clean)

### File changed
- `src/components/Skills.tsx` — full restyle of the card rendering

