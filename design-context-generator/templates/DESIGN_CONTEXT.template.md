# DESIGN CONTEXT: {{PROJECT_NAME}}

> Architecture: {{ARCHETYPE_NAME}} | Radius: {{INPUT_RADIUS}} / {{CARD_RADIUS}} | Styling Engine: Tailwind CSS v4 Browser CDN (`@tailwindcss/browser@4`) + Vanilla HTML/JS

---

## 1. Core Principles & Constraints
- **Zero-Build CDN Architecture**: Executes in-browser via `<script src="https://unpkg.com/@tailwindcss/browser@4"></script>` paired with `<style type="text/tailwindcss">` `@theme`. No bundler or JS config file required.
- **Color Discipline**: Strict 60-30-10 distribution. Never introduce one-off hex codes; always use semantic Tailwind utility classes (`bg-background`, `bg-surface`, `bg-primary`, etc.).
- **Visual Hygiene**: Solid surfaces (no heavy gradient backgrounds). No emojis in code or UI (use clean SVG icons with 1.5px or 2px stroke). Generous whitespace and distraction-free layouts.
- **Corner Radii**: Cards & Modals: `{{CARD_RADIUS}}` | Inputs & Standard Buttons: `{{INPUT_RADIUS}}` | Tags & Pills: `rounded-full`.
- **Borders & Elevation**: Hairline `1px` subtle borders (`border-border`). Shadows are diffused and ambient (`shadow-sm` or `shadow-md`), never harsh drop-shadows.

---

## 2. Semantic Color System (60-30-10 & Functional Tokens)

| Token Name | Tailwind Class | Light Mode Hex | Dark Mode Hex | Role / Purpose | WCAG Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `background` | `bg-background` | `{{LIGHT_BG}}` | `{{DARK_BG}}` | 60% Dominant canvas | Base |
| `surface` | `bg-surface` | `{{LIGHT_SURFACE}}` | `{{DARK_SURFACE}}` | 60% Card / container surfaces | Surface |
| `surface-elevated`| `bg-surface-elevated`| `{{LIGHT_SURFACE_ELEV}}`| `{{DARK_SURFACE_ELEV}}`| Floating popovers, modals | Surface |
| `foreground` | `text-foreground` | `{{LIGHT_FG}}` | `{{DARK_FG}}` | Primary high-contrast text | > 15:1 (AAA) |
| `muted` | `bg-muted` | `{{LIGHT_MUTED}}` | `{{DARK_MUTED}}` | 30% Secondary chip/subtle bg | Base |
| `muted-foreground`| `text-muted-foreground`| `{{LIGHT_MUTED_FG}}`| `{{DARK_MUTED_FG}}`| 30% Secondary text/labels | > 4.5:1 (AA) |
| `border` | `border-border` | `{{LIGHT_BORDER}}` | `{{DARK_BORDER}}` | 30% Structural lines | Hairline |
| `border-subtle` | `border-border-subtle` | `{{LIGHT_BORDER_SUBTLE}}` | `{{DARK_BORDER_SUBTLE}}` | Inner dividers / cell borders | 1px |
| `primary` | `bg-primary` | `{{LIGHT_PRIMARY}}` | `{{DARK_PRIMARY}}` | 10% Accent CTA / active state | > 4.5:1 (AA) |
| `primary-fg` | `text-primary-foreground`| `{{LIGHT_PRIMARY_FG}}`| `{{DARK_PRIMARY_FG}}`| High-contrast text on primary | > 4.5:1 (AA) |
| `ring` | `ring-ring` | `{{LIGHT_RING}}` | `{{DARK_RING}}` | 2px accessible focus ring indicator | > 3:1 (AA) |
| `success` | `text-success` / `bg-success` | `{{LIGHT_SUCCESS}}` | `{{DARK_SUCCESS}}` | Positive state / online / success | > 4.5:1 (AA) |
| `success-fg` | `text-success-foreground`| `{{LIGHT_SUCCESS_FG}}`| `{{DARK_SUCCESS_FG}}`| High-contrast text on success | > 4.5:1 (AA) |
| `warning` | `text-warning` / `bg-warning` | `{{LIGHT_WARNING}}` | `{{DARK_WARNING}}` | Caution / pending review | > 4.5:1 (AA) |
| `warning-fg` | `text-warning-foreground`| `{{LIGHT_WARNING_FG}}`| `{{DARK_WARNING_FG}}`| High-contrast text on warning | > 4.5:1 (AA) |
| `destructive` | `text-destructive` / `bg-destructive` | `{{LIGHT_DESTRUCTIVE}}`| `{{DARK_DESTRUCTIVE}}`| Errors and delete actions | > 4.5:1 (AA) |
| `destructive-fg`| `text-destructive-foreground`| `{{LIGHT_DESTRUCTIVE_FG}}`| `{{DARK_DESTRUCTIVE_FG}}`| High-contrast text on destructive | > 4.5:1 (AA) |
| `info` | `text-info` / `bg-info` | `{{LIGHT_INFO}}` | `{{DARK_INFO}}` | Syncing / informational callout | > 4.5:1 (AA) |
| `info-fg` | `text-info-foreground` | `{{LIGHT_INFO_FG}}` | `{{DARK_INFO_FG}}` | High-contrast text on info | > 4.5:1 (AA) |

---

## 3. Tailwind CSS v4 CDN HTML Integration

Copy and paste this exact block into the HTML `<head>`:

```html
<!-- Google Fonts: Inter & JetBrains Mono -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Tailwind CSS v4 Browser CDN -->
<script src="https://unpkg.com/@tailwindcss/browser@4"></script>

<!-- CSS-First Theme Configuration in <style type="text/tailwindcss"> -->
<style type="text/tailwindcss">
  @import "tailwindcss";

  /* Enables class-based dark mode (<html class="dark">) */
  @custom-variant dark (&:where(.dark, .dark *));

  /* Light mode tokens */
  :root {
    --color-background: {{LIGHT_BG}};
    --color-foreground: {{LIGHT_FG}};
    --color-surface: {{LIGHT_SURFACE}};
    --color-surface-elevated: {{LIGHT_SURFACE_ELEV}};
    --color-muted: {{LIGHT_MUTED}};
    --color-muted-foreground: {{LIGHT_MUTED_FG}};
    --color-border: {{LIGHT_BORDER}};
    --color-border-subtle: {{LIGHT_BORDER_SUBTLE}};
    --color-primary: {{LIGHT_PRIMARY}};
    --color-primary-foreground: {{LIGHT_PRIMARY_FG}};
    --color-primary-hover: {{LIGHT_PRIMARY_HOVER}};
    --color-ring: {{LIGHT_RING}};
    --color-success: {{LIGHT_SUCCESS}};
    --color-success-foreground: {{LIGHT_SUCCESS_FG}};
    --color-warning: {{LIGHT_WARNING}};
    --color-warning-foreground: {{LIGHT_WARNING_FG}};
    --color-destructive: {{LIGHT_DESTRUCTIVE}};
    --color-destructive-foreground: {{LIGHT_DESTRUCTIVE_FG}};
    --color-info: {{LIGHT_INFO}};
    --color-info-foreground: {{LIGHT_INFO_FG}};
    --radius-card: {{CARD_RADIUS_PX}};
    --radius-input: {{INPUT_RADIUS_PX}};
  }

  /* Dark mode tokens */
  .dark {
    --color-background: {{DARK_BG}};
    --color-foreground: {{DARK_FG}};
    --color-surface: {{DARK_SURFACE}};
    --color-surface-elevated: {{DARK_SURFACE_ELEV}};
    --color-muted: {{DARK_MUTED}};
    --color-muted-foreground: {{DARK_MUTED_FG}};
    --color-border: {{DARK_BORDER}};
    --color-border-subtle: {{DARK_BORDER_SUBTLE}};
    --color-primary: {{DARK_PRIMARY}};
    --color-primary-foreground: {{DARK_PRIMARY_FG}};
    --color-primary-hover: {{DARK_PRIMARY_HOVER}};
    --color-ring: {{DARK_RING}};
    --color-success: {{DARK_SUCCESS}};
    --color-success-foreground: {{DARK_SUCCESS_FG}};
    --color-warning: {{DARK_WARNING}};
    --color-warning-foreground: {{DARK_WARNING_FG}};
    --color-destructive: {{DARK_DESTRUCTIVE}};
    --color-destructive-foreground: {{DARK_DESTRUCTIVE_FG}};
    --color-info: {{DARK_INFO}};
    --color-info-foreground: {{DARK_INFO_FG}};
  }

  /* Map CSS variables to Tailwind v4 @theme */
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
</style>
```

---

## 4. Typography Hierarchy

- **Font Family**: Primary: `font-sans` (`{{PRIMARY_FONT}}`, system-ui, sans-serif) | Tabular / Metrics: `font-mono` (`{{MONO_FONT}}`, monospace)
- **H1 / Page Title**: `text-2xl md:text-3xl font-bold tracking-tight text-foreground`
- **H2 / Section Title**: `text-xl font-semibold tracking-tight text-foreground`
- **H3 / Card Title**: `text-base font-semibold text-foreground`
- **Body Text**: `text-sm font-normal text-foreground leading-relaxed`
- **Muted Text / Meta**: `text-xs font-normal text-muted-foreground`
- **Metric / Counter**: `text-2xl md:text-3xl font-bold tabular-nums font-mono text-foreground`

---

## 5. Component Utility Blueprints

Copy and use these exact class combinations for UI components:

### Buttons
- **Primary Action**:
  `inline-flex items-center justify-center gap-2 px-4 py-2.5 {{INPUT_RADIUS}} bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all`
- **Secondary / Surface**:
  `inline-flex items-center justify-center gap-2 px-4 py-2.5 {{INPUT_RADIUS}} bg-surface border border-border text-foreground text-sm font-medium shadow-sm hover:bg-muted active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all`
- **Ghost / Tertiary**:
  `inline-flex items-center justify-center gap-2 px-3 py-2 {{INPUT_RADIUS}} text-muted-foreground hover:text-foreground hover:bg-muted text-sm font-medium transition-colors`
- **Destructive**:
  `inline-flex items-center justify-center gap-2 px-4 py-2.5 {{INPUT_RADIUS}} bg-destructive text-destructive-foreground text-sm font-medium shadow-sm hover:opacity-90 active:scale-[0.98] transition-all`

### Inputs & Controls
- **Standard Input**:
  `w-full px-3.5 py-2.5 {{INPUT_RADIUS}} bg-surface-elevated border border-border text-foreground text-sm placeholder:text-muted-foreground/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all`
- **Search Input (with icon)**:
  `w-full pl-9 pr-3.5 py-2.5 {{INPUT_RADIUS}} bg-surface-elevated border border-border text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`

### Cards & Surfaces
- **Standard Card**:
  `p-6 {{CARD_RADIUS}} bg-surface border border-border shadow-sm`
- **Interactive / Clickable Card**:
  `p-6 {{CARD_RADIUS}} bg-surface border border-border shadow-sm hover:border-border/80 hover:shadow-md transition-all cursor-pointer`

### Badges & Status Pills
- **Accent Pill**:
  `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20`
- **Success Pill**:
  `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/15 text-success border border-success/30`
- **Warning Pill**:
  `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/15 text-warning border border-warning/30`
- **Destructive Pill**:
  `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/15 text-destructive border border-destructive/30`
- **Info Pill**:
  `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-info/15 text-info border border-info/30`
- **Muted Pill**:
  `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border`

### Navigation & Header Blueprints
- **Top Application Navbar**:
  `w-full bg-surface-elevated/90 backdrop-blur-md border border-border {{CARD_RADIUS}} p-3 sm:px-5 flex items-center justify-between gap-4 shadow-sm`
- **Navbar Active Link**:
  `px-3 py-1.5 {{INPUT_RADIUS}} bg-primary/10 text-primary font-medium border border-primary/20 transition-all`
- **Navbar Inactive Link**:
  `px-3 py-1.5 {{INPUT_RADIUS}} text-muted-foreground hover:text-foreground hover:bg-muted transition-colors`
- **Header Search Bar (with Shortcut Badge)**:
  `w-full pl-8.5 pr-14 py-1.5 text-xs {{INPUT_RADIUS}} bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all`

### Sidebar Navigation Architecture
- **Sidebar Shell Container**:
  `w-full transition-all duration-300 {{CARD_RADIUS}} bg-surface-elevated border border-border shadow-sm flex flex-col justify-between overflow-hidden`
- **Sidebar Active Nav Item**:
  `w-full flex items-center justify-between px-3 py-2 {{INPUT_RADIUS}} bg-primary/10 text-primary font-medium border border-primary/20 transition-all`
- **Sidebar Inactive Nav Item**:
  `w-full flex items-center justify-between px-3 py-2 {{INPUT_RADIUS}} text-muted-foreground hover:text-foreground hover:bg-muted transition-all`
- **Sidebar Section Label**:
  `px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold`
- **Sidebar Pinned Footer Card**:
  `p-2.5 {{INPUT_RADIUS}} bg-surface border border-border flex items-center justify-between shadow-2xs`

### Notification & Toast Blueprints
- **Floating Toast Container**:
  `fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0`
- **Toast Card Item**:
  `pointer-events-auto bg-surface-elevated border border-border shadow-xl {{CARD_RADIUS}} p-4 flex items-start gap-3 transition-all duration-300`
- **Inline Alert Banner**:
  `p-3.5 {{INPUT_RADIUS}} bg-warning/10 border border-warning/30 flex items-start justify-between gap-3 text-xs text-foreground transition-all`
- **Slide-Over Drawer Shell**:
  `fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface-elevated border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col justify-between`

### Motion & Micro-Interactions
- **Hover Lift Elevation**:
  `hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer`
- **Tactile Active Press**:
  `active:scale-[0.98] transition-transform`
- **Loading Skeleton Bar**:
  `h-3 bg-muted rounded animate-pulse`
- **Live Status Ping Beacon**:
  `relative flex h-2 w-2` with child `animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75` and `relative inline-flex rounded-full h-2 w-2 bg-success`
- **Segmented Tab (Active)**:
  `flex-1 py-1.5 rounded-lg text-xs font-medium text-foreground bg-surface shadow-xs transition-all`
- **Segmented Tab (Inactive)**:
  `flex-1 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-all`

### Overlays & Modals
- **Backdrop Overlay**:
  `fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-opacity`
- **Modal Card**:
  `relative bg-surface-elevated border border-border {{CARD_RADIUS}} p-6 max-w-md w-full shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-200`

---

## 6. Theme Toggle JavaScript Utility

```javascript
(function() {
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

---

## 7. Anti-Patterns (Strict Rules)
1. **NO arbitrary colors**: Never use ad-hoc hex classes like `bg-[#1a2b3c]`. Always use semantic classes (`bg-surface`, `bg-primary`, etc.).
2. **NO tailwind.config = { ... } in Tailwind v4**: v4 CDN uses `@theme` in `<style type="text/tailwindcss">`.
3. **NO mixed corner radii**: Do not mix sharp `rounded-none` and heavy `rounded-2xl` arbitrarily. Adhere to `{{INPUT_RADIUS}}` for controls and `{{CARD_RADIUS}}` for containers.
4. **NO raw unstyled outlines**: Never leave default browser focus rings; always apply `focus-visible:ring-2 focus-visible:ring-ring`.
5. **NO emojis**: Use clean SVG icon specs or text labels.
