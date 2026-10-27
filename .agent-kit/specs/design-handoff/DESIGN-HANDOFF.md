# 01a9feeb-c912-4150-90d3-384d28167220 implementation handoff

This archive is the source of truth for turning the design into production code. Start from `index.html`, then preserve the visual system, responsive behavior, and interactions found in the exported files.

## Implementation target
- Build production UI from the exported design, not a loose reinterpretation.
- Preserve typography scale, spacing rhythm, color tokens, border radii, shadows, motion timing, and component states.
- Replace static placeholders only when the target app has real data or functional equivalents.
- Keep generated product UI free of OpenDesign chrome, preview labels, or design-process annotations.
- Treat this handoff as a visual contract: if implementation choices conflict, match the exported pixels and behavior first, then refactor internals.

## Source map
- Primary entry: `index.html`
- HTML screens detected: 3
- Stylesheets detected: 1
- Script/component files detected: 2
- Supporting assets detected: 0

## Responsive contract
Validate the implementation across this 2025–2026 viewport matrix:
- Mobile compact: 360×800
- Mobile standard: 390×844
- Mobile large: 430×932
- Foldable / small tablet: 600×960
- Tablet portrait: 820×1180
- Tablet landscape: 1024×768
- Laptop: 1366×768
- Desktop: 1440×900
- Wide desktop: 1920×1080

For responsive web exports, treat these as a modern breakpoint system for one adaptive web experience, not three fixed screenshots. Do not split responsive web into unrelated native app screens unless the project explicitly includes native targets. Use semantic layout thresholds, fluid `clamp()` type/spacing, and container queries where component width matters more than viewport width. Preserve any CSS media queries, container queries, fluid `clamp()` scales, and layout changes already present in the exported files.

## Design fidelity contract
- Extract reusable tokens before writing components: background, surface, foreground, muted text, border, accent, radius, shadow, spacing, type scale, and motion duration/easing.
- Map product screens, in-app modules/components, optional landing page, and optional OS widget surfaces before coding. Keep these surfaces separate in the target architecture.
- Match layout geometry: max-widths, gutters, grid columns, card proportions, sticky/fixed elements, and viewport-specific navigation.
- Preserve real copy, labels, and data shown in the export. Do not replace specific text with generic marketing filler.
- Preserve interactive affordances: hover, focus, pressed, disabled, loading, validation, copy/share, tab/accordion, modal/sheet, and keyboard states where present.
- Preserve accessibility semantics when converting: headings stay hierarchical, controls remain buttons/links/inputs, focus states stay visible.
- Do not keep prototype-only annotations, frame labels, or OpenDesign chrome in the production UI.

## CJX-ready UX contract (Updated & Canonicalized by PM — Supersedes generic export boilerplate)
- Use `DESIGN-MANIFEST.json` and `.agent-kit/specs/DESIGN.md` as the canonical map for screens, app modules, tokens, interactions, and viewport checks.
- Canonical 3-HTML-Entry & Route Architecture (matching the actual exported DOM in `index.html`, `overlay.html`, and `design-system.html`):
  1. `index.html`: The main Studio web application containing the top navigation bar, the 6-state round bar, and the three hash-routed views (`#/stage` → `#view-stage`, `#/overlay` → `#view-overlay`, `#/deck` → `#view-deck`).
  2. `overlay.html`: The standalone transparent OBS Browser Source surface (`1920×1080`, no page chrome).
  3. `design-system.html`: The standalone Design System v1.0 reference page.
- Preserve modular JS/CSS separation (`client/`, `server/`, `shared/`) with each source code file ≤ 250 physical lines per project code standards while keeping the exact visual layout, CSS tokens, and behavior of the three HTML entries above.

## Color and brand contract
- Use the exported design tokens and product/domain context as the color source of truth.
- Do not introduce warm beige / cream / peach / pink / orange-brown background washes unless they are already explicit brand/reference colors in the export.
- A stylesheet or design/token file was detected; inspect it for canonical color variables before choosing framework theme tokens.

## Implementation sequence for AI coding tools
1. Open `index.html` and `DESIGN-MANIFEST.json`; identify the 3 HTML entry points (`index.html` with `#/stage`, `#/overlay`, `#/deck`; standalone `overlay.html`; standalone `design-system.html`), app modules, and interactions before coding.
2. Implement the 3 HTML entry points (`index.html`, `overlay.html`, `design-system.html`); inside `index.html`, preserve the 3 hash-switched views (`#/stage` → `#view-stage`, `#/overlay` → `#view-overlay`, `#/deck` → `#view-deck`). To comply with the project's ≤250 physical lines per file rule, split CSS into modular files (`client/styles/*.css`) and modularize HTML/DOM view rendering via ES modules (`client/ui/*.js`) while preserving the exact rendered DOM structure, IDs, classes, tokens, and visual geometry.
3. Extract a token table from CSS/root styles and inline styles before building components.
4. Build product screens and domain-specific in-app modules from largest layout regions down to controls; avoid starting with isolated atoms that lose spatial intent.
5. Port responsive behavior across the modern viewport matrix and test each semantic breakpoint before cleanup.
6. Port interactions and states, then replace static placeholders only with real app data or functional equivalents.
7. Keep optional landing page and OS widget surfaces as separate surfaces if present.
8. Compare final screenshots against the export at 360×800, 390×844, 430×932, 820×1180, 1024×768, 1366×768, 1440×900, and 1920×1080 before declaring done.

## Entry points
- `design-system.html`
- `index.html`
- `overlay.html`

## Styles
- `styles.css`

## Scripts/components
- `app.js`
- `overlay.js`

## Assets and supporting files
- None detected

## Coding checklist for AI tools
1. Inspect `index.html` and `DESIGN-MANIFEST.json` first and identify reusable components before coding.
2. Implement the 3 canonical HTML entry surfaces (`index.html` hosting `#/stage`, `#/overlay`, `#/deck`; standalone `overlay.html`; standalone `design-system.html`), keeping every production `.html`, `.css`, and `.js` file ≤ 250 physical lines via clean modularization.
3. Extract design tokens into the target stack: colors, type scale, spacing, radius, shadows, and motion.
4. Implement layout with real 2025–2026 responsive breakpoints, fluid type/spacing, and container-query-aware component behavior; test with no horizontal overflow.
5. Preserve interactive controls, hover/focus/pressed states, form behavior, validation, and copy actions where present.
6. Implement domain-specific in-app modules with real states; do not flatten them into generic cards.
7. Keep landing page, product screens, and OS widget/quick-access surfaces separate when present.
8. Confirm the production result visually matches the exported design before refactoring internals.
9. Reject implementation shortcuts that flatten the design into generic cards, generic gradients, placeholder stats, or framework-default typography.
10. If a detail is ambiguous, keep the exported HTML/CSS/JS behavior rather than inventing a new pattern.
