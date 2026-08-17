# Editorial Portfolio System

## Design read

This portfolio is designed for recruiters and design-conscious clients. It uses an editorial, kinetic-type visual language with framed portraiture, asymmetric case-study placement, and a single coral accent.

## Visual dials

- Design variance: 9
- Motion intensity: 6
- Visual density: 3

## Palette

- Light hero background: `#e9e8e3`
- Primary charcoal canvas: `#141513`
- Raised surface: `#1b1c19`
- Primary light text: `#f1f0ea`
- Muted text: `#a7a69f`
- Coral accent: `#e7604b`

The page makes one deliberate transition from the light hero into a continuous dark portfolio canvas. The accent remains consistent throughout.

## Typography

The system uses Bahnschrift Condensed and compatible neo-grotesk fallbacks for display type, paired with Aptos or Segoe UI for body copy. Large text uses tight spacing and short line lengths. Supporting copy remains compact but readable.

Supporting typography uses a larger minimum scale for navigation, metadata, descriptions, skill details, and buttons. The page rhythm is deliberately compact: sections connect directly after the intentional Approach-to-Projects overlap, while Skills, Profile, and Contact use reduced asymmetric padding instead of empty full-screen transitions.

Major sections use a numbered editorial chapter system: `01 / Approach`, `02 / Projects`, `03 / Skills`, `04 / About`, and `05 / Contact`. Each chapter pairs a descriptive H2 with concise supporting copy, while project, technology, and capability names use H3 headings beneath it.

## Shape and material

- Primary card radius: `16px`
- Secondary control radius: `6px` to `8px`
- Borders: dark 2px to 3px outlines
- Shadows: restrained and tinted toward the surrounding surface

## Layout

The hero uses a full-viewport composition with an oversized name layered through a softly masked monochrome portrait. It has no outer card, inset frame, border, radius, or shadow. The fixed navigation changes surface treatment after the hero and marks the current section. Dark sections use offset cards and substantial negative space. The dedicated skills section uses an oversized title followed by four full-width editorial rows, with coral hover feedback. Below `820px`, every multi-column section collapses into a strict single column.

## Motion

Motion is limited to hierarchy, feedback, and section entry. Hero layers enter in sequence, react with restrained pointer depth, and compress as the hero leaves the viewport. Individual letters in the full name use a proximity-based magnetic response with a limited radius and low movement strength. The navigation reports scroll progress. GSAP ScrollTrigger drives scrubbed background type, project-image depth, staggered skill rows, profile reveals, and the closing contact sequence without pinning or changing layout dimensions. Hover feedback remains CSS-driven so it works independently from scrolling. All automatic motion is disabled when reduced motion is requested.

## Accessibility

- Visible keyboard focus uses the coral accent.
- The mobile menu supports Escape and restores page scrolling on close.
- Images have descriptive alternative text.
- The page includes a skip link and semantic section headings.
- The contact form uses explicit labels, inline field errors, focus recovery, preserved input, and a live submission status. Successful validation prepares a message in the visitor's email application without sending data through an unconfigured third party.
