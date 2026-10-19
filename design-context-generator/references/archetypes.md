# Design Archetypes Reference

Archetypes provide distinct visual personalities while maintaining strict adherence to semantic tokens and token-efficient Tailwind classes.

---

## 1. Ultra-Minimal (Default)
Clean, sparse, distraction-free aesthetic with generous whitespace and high-contrast solids.

- **Vibe**: Modern architectural portfolio, Notion-like productivity tool, minimalist SaaS.
- **Constraints**:
  - **Strict No Gradients**: Solid colors only.
  - **No Emojis**: Crisp SVG icons with 1.5px or 2px stroke.
  - **Surfaces**: Stark white canvas (`#FFFFFF`) with contrasting dark navigation, or stark obsidian dark mode (`#09090B`).
  - **Borders**: Hairline 1px solid (`#E4E4E7` in light, `#27272A` in dark).
  - **Border Radius**: Heavy, soft rounding (`rounded-input` / `12px` for controls; `rounded-card` / `16px` for containers; `rounded-full` for badges/pills).
  - **Shadows**: Large, diffused, subtle ambient elevation (`shadow-sm` or `shadow-md` with low alpha). Never harsh drop-shadows.

---

## 2. Ultra-Minimal + Modern Clean (Hybrid / Operational)
Blends the distraction-free restraint of Ultra-Minimalism with the operational utility and multi-status feedback of Modern Clean.

- **Vibe**: High-efficiency operational counters, logistics dashboards, productivity suites, dev platforms.
- **Constraints**:
  - **Surfaces**: Solid neutral backgrounds with hairline 1px borders (`border-border`).
  - **Accent**: Electric single-hue focus (Electric Violet `#7C3AED`/`#8B5CF6`, Tech Blue `#2563EB`/`#3B82F6`).
  - **Functional State Palette**: Full support for dedicated semantic tokens (`success`, `warning`, `destructive`, `info`) in badges, alerts, and counters.
  - **Border Radius**: Controlled ergonomic rounding (12px inputs / 16px cards).
  - **Typography**: Primary sans (Inter) paired with tabular monospace numbers (JetBrains Mono) for metric cards and record IDs.

---

## 3. Linear / SaaS Dark
Engineering-first, ultra-sleek dark aesthetic inspired by Linear, Raycast, and Vercel.

- **Vibe**: Developer platforms, high-performance developer tools, crypto/fintech terminals.
- **Constraints**:
  - **Base Canvas**: Deep obsidian pitch (`#08090A` or `#0B0D0E`), never flat gray.
  - **Surfaces**: Layered elevation with translucent white borders (`bg-zinc-900/60`, `border-white/10`).
  - **Accents**: Electric single-hue focus (Electric Violet `#8B5CF6`, Cyan `#06B6D4`, or Emerald `#10B981`).
  - **Typography**: Crisp mono-influenced sans (Inter, Geist Sans) paired with monospace numbers (`font-mono` / tabular nums).
  - **Border Radius**: Refined medium rounding (`rounded-lg` / `8px` to `rounded-xl` / `12px`).
  - **Micro-interactions**: Subtle hover brightening (`hover:border-white/20`, `hover:bg-white/[0.04]`).

---

## 4. Modern Clean / High-Density
Professional, structured, highly legible design system built for data clarity and enterprise workflows.

- **Vibe**: Cloud dashboards, analytics suites, enterprise SaaS, CRM platforms.
- **Constraints**:
  - **Base Canvas**: Soft cool slate (`#F8FAFC`) with bright white cards (`#FFFFFF`).
  - **Surfaces**: Distinct card grouping with clear 1px borders (`border-slate-200`).
  - **Accents**: Trustworthy deep blues or indigos (e.g., `#2563EB`, `#4F46E5`).
  - **Typography**: Clean corporate sans with strong weight contrasts (Plus Jakarta Sans, Inter).
  - **Border Radius**: Controlled compact rounding (`rounded-lg` / `8px` for inputs/buttons, `rounded-xl` for cards).
  - **Information Density**: Compact padding (`px-3 py-1.5` for table cells, `gap-4` layout grids).
