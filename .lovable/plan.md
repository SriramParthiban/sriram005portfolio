

## Unique Visual Styles for Each Section

Since **Skills** already uses the **sticky note** style, here are 5 distinct creative approaches — one per remaining section. No two sections will look alike.

---

### 1. Professional Experience → **Vertical Timeline with Polaroid Snapshots**
- A glowing vertical timeline line running down the center (desktop) or left edge (mobile)
- Each job entry appears as a **polaroid-style card** — white border, slight drop shadow, tape/pin at the top
- Cards alternate left/right on desktop; stack on mobile
- The timeline has animated glowing dots at each node
- Bullet points inside each polaroid with a typewriter-style font feel

---

### 2. Projects → **Interactive File Folder / Case Study Tabs**
- Each project is presented as a **manila file folder tab** — the tab sticks up with the project name
- Clicking a tab "opens" the folder to reveal the project details, images, metrics
- Folder has a paper texture background, a paperclip graphic holding the proof images
- Only one folder open at a time (accordion-style)
- Color-coded folder tabs per project

---

### 3. Certifications & Education → **Achievement Wall / Trophy Shelf**
- Certifications displayed as **framed certificates** hanging on a dark wall — gold/bronze frame borders, slight 3D perspective tilt
- Each frame has a subtle shine/gloss animation on hover
- Education section below styled as a **diploma scroll** — rolled parchment edges with the degree info inside
- Ribbon/seal graphic for the degree

---

### 4. GitHub Repos → **Terminal / Code Console**
- Styled as a **retro terminal window** — dark background, green/amber monospace text, window chrome (close/minimize/maximize dots)
- Each repo is a "command output" row: `$ ls repo-name` with description, language dot, stars
- Typing cursor animation at the top
- Links styled as underlined terminal hyperlinks
- Scanline overlay for CRT monitor effect (subtle)

---

### 5. Contact → **Postcard / Letter**
- The contact form styled as a **handwritten postcard** — cream/off-white card with stamp graphic in the corner, postmark overlay
- Form fields appear as dotted lines on the postcard (like "write here" lines)
- "Send" button styled as a wax seal or "mail it" stamp
- Address side shows your contact details in a handwritten font style

---

### Summary Table

| Section | Visual Metaphor | Key Elements |
|---------|----------------|--------------|
| Skills | Sticky Notes *(done)* | Colored cards, tape, rotations |
| Experience | Polaroid Timeline | Center line, alternating cards, pins |
| Projects | File Folders | Tabbed manila folders, paperclips |
| Certs + Education | Trophy Wall + Diploma | Gold frames, scroll, ribbons |
| GitHub | Terminal Console | CRT window, monospace, scanlines |
| Contact | Postcard / Letter | Stamp, dotted lines, wax seal |

### Files to change
- `src/components/Experience.tsx`
- `src/components/Projects.tsx`
- `src/components/Certifications.tsx`
- `src/components/Education.tsx`
- `src/components/GitHubRepos.tsx`
- `src/components/Contact.tsx`

Each component will be fully restyled while keeping the same data/content. All use `framer-motion` for entrance and hover animations. Let me know which ones you'd like me to proceed with (all at once, or one by one).

