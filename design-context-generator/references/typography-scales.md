# Typography Scales & Pairings Reference

Typography establishes visual hierarchy before colors or borders are even noticed. Downstream AI agents must use these standardized Tailwind typography utility classes to avoid mismatched font sizing or improper line-heights.

---

## Curated Font Pairings

| Aesthetic / Persona | Primary Sans (Headings & Body) | Monospace / Data (Metrics & Code) | Google Font Embed / System Fallback |
| :--- | :--- | :--- | :--- |
| **Ultra-Minimal** | `Inter` or `Geist` | `JetBrains Mono` | `Inter:wght@400;500;600;700` |
| **Linear / SaaS Dark** | `Inter` or `Geist Sans` | `JetBrains Mono` or `Geist Mono` | `Inter:wght@400;500;600;700` |
| **Modern Clean** | `Plus Jakarta Sans` | `Roboto Mono` | `Plus+Jakarta+Sans:wght@500;600;700;800` |
| **Editorial Minimal** | `Outfit` (Headings) + `Inter` (Body) | `JetBrains Mono` | `Outfit:wght@600;700&family=Inter:wght@400;500` |

---

## Standard Tailwind Typography Scale

| Level | Tailwind Classes | Rem / Px | Line Height & Tracking | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Hero / Display** | `text-4xl md:text-5xl font-bold tracking-tight` | `36px - 48px` | `leading-tight` | Landing page hero titles, marketing headers. |
| **Page Title (H1)** | `text-2xl md:text-3xl font-bold tracking-tight` | `24px - 30px` | `leading-snug` | Top of page title, primary dashboard section title. |
| **Section Header (H2)** | `text-xl font-semibold tracking-tight` | `20px` | `leading-snug` | Card group titles, major section headings. |
| **Subsection (H3)** | `text-base font-semibold` | `16px` | `leading-normal` | Card titles, modal headers, table headers. |
| **Body (Default)** | `text-sm font-normal text-foreground` | `14px` | `leading-relaxed` | Standard body copy, form labels, table cells, descriptions. |
| **Muted / Caption** | `text-xs text-muted-foreground font-normal` | `12px` | `leading-normal` | Timestamps, helper text, breadcrumbs, badge labels. |
| **Micro / Overline** | `text-[11px] font-semibold uppercase tracking-wider text-muted-foreground` | `11px` | `leading-none` | Category tags, metric labels, stat descriptors. |

---

## Typography Rules for Downstream Agents
1. **Never use generic browser fonts** without declaring a system fallback stack (`font-sans: 'Inter', system-ui, -apple-system, sans-serif`).
2. **Apply `tracking-tight`** on all headers `text-xl` and above to make headings crisp and modern.
3. **Use Tabular Numbers** (`tabular-nums` / `font-mono`) for metrics, currency, counters, and table rows to prevent jitter during updates.
