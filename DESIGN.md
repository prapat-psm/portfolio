# Portfolio Design System: High-End Editorial Specification

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Luminary"
This design system is built to reflect the expertise of a senior frontend developer who balances technical precision with high-end aesthetic sensibility. The "Digital Luminary" concept moves away from the flat, predictable grids of standard templates, instead favoring an editorial layout that feels curated and immersive. 

We achieve this through **Atmospheric Depth**: using "neon" light as a functional tool to guide the eye, rather than just decoration. The system breaks the traditional "box" model by using intentional asymmetry, overlapping elements that "break the container," and high-contrast typography scales that command authority. The interface should feel less like a website and more like a high-performance terminal viewed through a premium lens.

---

## 2. Colors: Tonal Depth & Neon Accents

The palette is rooted in the deep obsidian of the `surface` (`#060e20`) and elevated by vibrant indigo pulses.

*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background shifts. For example, a project gallery section should use `surface-container-low` (`#091328`) to distinguish itself from the main `background`.
*   **Surface Hierarchy & Nesting:** Use surface tiers to create "nested" depth.
    *   **Base:** `surface` (#060e20)
    *   **Sectioning:** `surface-container-low` (#091328)
    *   **Interactive Cards:** `surface-container` (#0f1930) or `surface-variant` (#192540)
*   **The "Glass & Gradient" Rule:** Floating elements (like navigation bars or hovering cards) must utilize Glassmorphism. Use `surface-bright` (`#1f2b49`) at 60% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** Main CTAs and Hero backgrounds should utilize a linear gradient: `primary` (#a3a6ff) to `primary-dim` (#6063ee) at a 135-degree angle to provide a "lit from within" neon effect.

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to balance technical clarity with bold, high-end branding.

*   **Display & Headlines (Manrope):** Chosen for its geometric modernism.
    *   `display-lg` (3.5rem): Reserved for hero statements. Letter-spacing should be set to `-0.02em` for a tight, editorial feel.
    *   `headline-lg` (2rem): Used for project titles. Always use a Bold weight to contrast against the dark background.
*   **Body & Labels (Inter):** Chosen for maximum legibility in technical contexts.
    *   `body-lg` (1rem): Standard reading text. Use `on-surface-variant` (`#a3aac4`) for secondary descriptions to reduce visual noise.
    *   `label-md` (0.75rem): Used for "Skills" chips and technical metadata. Always uppercase with `0.05em` tracking.

---

## 4. Elevation & Depth: Atmospheric Layering

Instead of traditional drop shadows, this system uses light and tone to simulate physical presence.

*   **The Layering Principle:** Depth is achieved by "stacking." A card (`surface-container-highest`) placed on a section (`surface-container-low`) creates natural elevation without needing lines.
*   **Ambient Glows:** For "Neon" components, replace shadows with a glow effect. Use a multi-layered shadow:
    *   `shadow-1`: 0px 4px 20px rgba(163, 166, 255, 0.1) (Primary color tint)
    *   `shadow-2`: 0px 0px 40px rgba(163, 166, 255, 0.05)
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use `outline-variant` (`#40485d`) at **15% opacity**. This creates a hint of a container without breaking the seamless "dark-mode" flow.
*   **Backdrop Blur:** Any element positioned "above" the main content (e.g., modals, dropdowns) must use a `12px` to `20px` blur to maintain the glass-like quality of the UI.

---

## 5. Components: Precision Primitives

### Buttons
*   **Primary:** Gradient background (`primary` to `primary-dim`), `full` roundedness, and a subtle neon glow on hover. Text: `on-primary-fixed` (#000000).
*   **Secondary:** Ghost style. Transparent background with a `Ghost Border` and `primary` text.
*   **Tertiary:** No background or border. `primary` text with an underline that appears on hover.

### Cards (Project Showcases)
*   **Construction:** Forbid divider lines. Use `spacing-6` (2rem) of internal padding.
*   **Asymmetry:** Images within cards should either bleed to one edge or be offset using `spacing-4` to create an "editorial" overlap.
*   **Interaction:** On hover, the card should transition from `surface-container` to `surface-bright` and scale by 1.02.

### Chips (Tech Stack)
*   **Style:** `surface-variant` background, `label-md` typography.
*   **Roundedness:** `md` (0.375rem) to maintain a tech-forward, slightly sharp look.

### Input Fields
*   **Style:** Minimalist. Underline only using `outline` (#6d758c) when inactive.
*   **Active State:** The underline transforms into a `primary` neon glow. Helper text uses `body-sm`.

---

## 6. Do's and Don'ts

### Do:
*   **Use Whitespace as a Separator:** Use `spacing-16` (5.5rem) or `spacing-20` (7rem) between major sections rather than lines.
*   **Embrace Asymmetry:** Align text to the left while keeping certain decorative "glow" elements off-center to the right.
*   **Limit "Neon":** Use the high-vibrancy `secondary` (#c180ff) and `tertiary` (#8ce7ff) sparingly—only for status indicators or specific callouts.

### Don't:
*   **Don't use 100% white (#FFFFFF):** Always use `on-background` (`#dee5ff`) or `on-surface-variant` (`#a3aac4`) to prevent harsh eye strain on dark backgrounds.
*   **Don't use standard "Drop Shadows":** Avoid black or grey shadows. Shadows should always be a low-opacity tint of the brand's indigo.
*   **Don't crowd the content:** A senior portfolio should feel confident. Give the typography room to breathe; do not try to fill every "empty" dark space.