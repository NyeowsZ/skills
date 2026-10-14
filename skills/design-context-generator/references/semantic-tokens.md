# Semantic Design Tokens (Tailwind CSS v4 & v3)

This reference defines the universal semantic token schema for frontend design systems. Downstream AI coding agents use these standardized tokens rather than hardcoded hex colors or arbitrary values, ensuring consistent visual hierarchy with minimum token overhead.

---

## 60-30-10 Semantic Token Mapping

| Role | Distribution | Semantic Token | Tailwind Class Equivalent | Purpose & Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Dominant (60%)** | Main Canvas | `background` | `bg-background` | Base application canvas / page background. |
| | Canvas Text | `foreground` | `text-foreground` | High-contrast body text and headers. |
| | Surface Layer | `surface` | `bg-surface` | Cards, panels, table rows, and main containers. |
| **Secondary (30%)** | Elevated Surfaces | `surface-elevated` | `bg-surface-elevated` | Floating cards, popovers, modals, dropdowns. |
| | Muted Background | `muted` | `bg-muted` | Inactive tab backgrounds, subtle tags, disabled states. |
| | Structural Lines | `border` | `border-border` | Subtle 1px structural boundaries. |
| | Subtle Lines | `border-subtle` | `border-border-subtle` | Nested dividers, table cell lines. |
| | Secondary Text | `muted-foreground` | `text-muted-foreground` | Secondary labels, timestamps, metadata, captions. |
| **Accent (10%)** | Key Actions | `primary` | `bg-primary`, `text-primary` | Primary CTA buttons, active tab indicators, selected radio/checkbox. |
| | Action Text | `primary-fg` | `text-primary-foreground` | Text directly on top of `bg-primary` (must pass 4.5:1 contrast). |
| | Hover Action | `primary-hover` | `hover:bg-primary-hover` | Interactive state for primary CTA (lightened or darkened). |
| | Focus Rings | `ring` | `ring-ring`, `focus-visible:ring-ring` | Keyboard focus indicator ring (2px with offset). |
| **Functional** | Positive / Success | `success` | `bg-success`, `text-success` | Positive indicators, badges, confirmations, online state. |
| | Success Text | `success-fg` | `text-success-foreground` | High-contrast label on solid success background. |
| | Caution / Warning | `warning` | `bg-warning`, `text-warning` | Pending states, alerts, expiring deadlines. |
| | Warning Text | `warning-fg` | `text-warning-foreground` | High-contrast label on solid warning background. |
| | Danger / Destructive | `destructive` | `bg-destructive`, `text-destructive` | Errors, deletion modals, critical failures. |
| | Destructive Text | `destructive-fg`| `text-destructive-foreground`| High-contrast label on solid destructive background. |
| | Informational | `info` | `bg-info`, `text-info` | System hints, synchronization notices, informational banners. |
| | Info Text | `info-fg` | `text-info-foreground` | High-contrast label on solid info background. |

---

## Tailwind CSS v4 `@theme` Integration

In Tailwind CSS v4, tokens are declared in `<style type="text/tailwindcss">` or CSS files using CSS variables and `@theme`:

```css
@import "tailwindcss";

/* Enable class-based dark mode (<html class="dark">) */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-surface: var(--color-surface);
  --color-surface-elevated: var(--color-surface-elevated);

  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-muted-foreground);
  --color-border: var(--color-border);
  --color-border-subtle: var(--color-border-subtle);

  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-primary-hover: var(--color-primary-hover);
  --color-ring: var(--color-ring);

  --color-success: var(--color-success);
  --color-success-foreground: var(--color-success-foreground);
  --color-warning: var(--color-warning);
  --color-warning-foreground: var(--color-warning-foreground);
  --color-destructive: var(--color-destructive);
  --color-destructive-foreground: var(--color-destructive-foreground);
  --color-info: var(--color-info);
  --color-info-foreground: var(--color-info-foreground);

  --radius-card: var(--radius-card);
  --radius-input: var(--radius-input);

  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## Interactive State Conventions

To maintain tactile feedback without token bloat, all interactive components must use these standard state modifiers:

- **Hover**: `hover:opacity-90` or `hover:bg-primary-hover` + `transition-colors duration-150`
- **Active / Pressed**: `active:scale-[0.98]`
- **Focus Visible**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **Disabled**: `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none`

---

## Accessibility & Contrast Rules (WCAG 2.1 AA)

1. **Body Text (`text-foreground` on `bg-background` / `bg-surface`)**: Minimum contrast ratio of **4.5:1** (AAA standard targets 7:1).
2. **Muted Text (`text-muted-foreground` on `bg-surface`)**: Minimum contrast ratio of **4.5:1** for essential text, or **3:1** for strictly secondary/decorative text.
3. **Primary Button Text (`text-primary-foreground` on `bg-primary`)**: Strict **4.5:1** contrast. Dark accents require pure white text (`#FFFFFF`); bright accents require deep slate text (`#09090B`).
4. **Interactive Controls & Focus Indicators (`border-border`, `ring`)**: Minimum contrast ratio of **3:1** against adjacent backgrounds.
