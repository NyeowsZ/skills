---
name: design-context-generator
description: >-
  Interactively generate a high-density, semantic Tailwind-powered DESIGN_CONTEXT.md and live visual preview for frontend development. Use when the user asks to initialize design context, create UI guidelines, define design tokens, or build a design system for Tailwind CSS v4 (CDN or CLI/Vite) or v3.
---

# Design Context Generator (Semantic Tailwind Architect)

A modular skill to interactively co-design and generate a token-efficient `DESIGN_CONTEXT.md` paired with a zero-dependency live HTML preview (`design-preview.html`). Strictly enforces the **60-30-10 color rule**, **WCAG 2.1 AA accessibility standards**, **Tailwind CSS v4 browser CDN architecture (`@tailwindcss/browser@4`)**, and **compact semantic utility recipes**.

---

## When to Use

- When the user asks to initialize, generate, or overhaul a `DESIGN_CONTEXT.md`.
- When setting up design tokens, UI guidelines, or styling standards for HTML/JS web projects using Tailwind CSS v4 CDN or Tailwind v3.
- When creating or refining frontend component blueprints with minimal prompt token overhead.

---

## Core Directives & Constraints

1. **NO ONE-SHOT DUMPS**: Do not generate the final `DESIGN_CONTEXT.md` immediately. Follow the multi-step state machine below to co-design and visually verify the system first.
2. **TOKEN-EFFICIENT SEMANTIC RECIPES**: Blueprints in `DESIGN_CONTEXT.md` must be written in compact semantic Tailwind CSS classes (e.g., `px-4 py-2 rounded-input bg-primary text-primary-foreground`) rather than verbose custom CSS blocks.
3. **NO EMOJIS**: Never use emojis in generated design contexts, code files, or user communications. Use clean SVG icon specs or concise text labels.
4. **WCAG 2.1 AA COMPLIANCE**: All color combinations must meet minimum contrast ratios:
   - Body text against surfaces: **4.5:1** (AAA standard targets 7:1)
   - Essential icons, borders, and controls: **3:1**
   - High-contrast text on primary CTA: **4.5:1**
5. **TAILWIND CSS V4 CDN ARCHITECTURE**:
   - For standalone HTML/JS, use `<script src="https://unpkg.com/@tailwindcss/browser@4"></script>`.
   - Never use `tailwind.config = { ... }` with Tailwind v4 CDN; configure via `<style type="text/tailwindcss">` using `@theme` and `@custom-variant dark (&:where(.dark, .dark *));`.
   - Dynamic dark mode is controlled via `.dark` class on `<html>` with CSS variable token swapping in `:root` and `.dark`.

---

## Skill Modular References & Templates

Reference the modular resources located in this skill directory:
- [semantic-tokens.md](./references/semantic-tokens.md): Semantic token contract mapping 60-30-10 and functional tokens to Tailwind utilities.
- [archetypes.md](./references/archetypes.md): Curated presets (Ultra-Minimal, Ultra-Minimal + Modern Clean, Linear / SaaS Dark, Modern Clean).
- [typography-scales.md](./references/typography-scales.md): Font pairings and Tailwind typography scales.
- [preview.template.html](./templates/preview.template.html): Standalone Tailwind CSS v4 CDN live preview layout.
- [DESIGN_CONTEXT.template.md](./templates/DESIGN_CONTEXT.template.md): Token-efficient context blueprint.
- [tailwind.config.template.js](./templates/tailwind.config.template.js): Exportable configuration for Tailwind v4 CDN, v4 CSS, and v3.

---

## Procedural Workflow (4 Phases)

### Phase 1: Intake & Discovery
1. Check if the user specified:
   - Desired brand/accent color (or prompt them with curated seed colors).
   - Target archetype: **Ultra-Minimal** (default), **Ultra-Minimal + Modern Clean**, **Linear / SaaS Dark**, or **Modern Clean**.
   - Target theme preference (Dual-mode default, Dark-first, or Light-first).
   - Target stack (Default: Tailwind CSS v4 Browser CDN for instant zero-build HTML/JS, or Vite/CLI).
2. If unspecified, use `ask_question` to clarify preferences interactively.

### Phase 2: Semantic Harmonization & WCAG Validation
1. Map the colors to the strict **60-30-10 distribution** + functional states:
   - **60% Dominant**: `bg-background`, `bg-surface`, `text-foreground`.
   - **30% Secondary**: `bg-surface-elevated`, `bg-muted`, `text-muted-foreground`, `border-border`, `border-border-subtle`.
   - **10% Accent**: `bg-primary`, `text-primary-foreground`, `hover:bg-primary-hover`, `ring-ring`.
   - **Functional**: `bg-success`, `bg-warning`, `bg-destructive`, `bg-info` and their respective foregrounds.
2. Mathematically check contrast ratios:
   - If `primary` is dark, pair with white foreground (`#ffffff`).
   - If `primary` is light or neon, pair with dark slate foreground (`#09090b`).
3. Present the proposed palette table to the user with exact hex values and contrast status.

### Phase 3: Live Visual Preview Generation (`design-preview.html`)
1. Generate a standalone `design-preview.html` file in the project root by populating [preview.template.html](./templates/preview.template.html) with resolved tokens.
2. Inform the user that `design-preview.html` is ready to open in their browser to test:
   - Live color swatches with contrast ratings.
   - Interactive button hover, active, and focus-ring states.
   - Input fields with focus states and error validation.
   - Metric cards and elevation depth.
   - Functional state badges (success, warning, error, info).
   - Light/Dark theme toggle with local storage persistence.
3. Solicit user feedback or approval.

### Phase 4: Final Artifact & Token Export
Upon user approval of the preview:
1. Write the finalized `DESIGN_CONTEXT.md` in the project root using [DESIGN_CONTEXT.template.md](./templates/DESIGN_CONTEXT.template.md).
2. Include the exact Tailwind CSS v4 CDN HTML `<head>` snippet.
3. Clean up or preserve `design-preview.html` based on user preference.
