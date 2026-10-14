/**
 * Tailwind CSS Configuration Template
 * 
 * Supports:
 * 1. Tailwind CSS v4 Browser CDN (HTML/JS via @tailwindcss/browser@4)
 * 2. Tailwind CSS v4 Build / Vite (@theme in CSS)
 * 3. Tailwind CSS v3 Legacy (tailwind.config.js)
 */

/*
========================================================================
OPTION 1: Tailwind CSS v4 Browser CDN (Zero-Build HTML + Vanilla JS)
Place in <head> of HTML document:
========================================================================

<script src="https://unpkg.com/@tailwindcss/browser@4"></script>
<style type="text/tailwindcss">
  @import "tailwindcss";

  @custom-variant dark (&:where(.dark, .dark *));

  :root {
    --color-background: #ffffff;
    --color-foreground: #09090b;
    --color-surface: #fafafa;
    --color-surface-elevated: #ffffff;
    --color-muted: #f4f4f5;
    --color-muted-foreground: #71717a;
    --color-border: #e4e4e7;
    --color-border-subtle: #f4f4f5;
    --color-primary: #7c3aed;
    --color-primary-foreground: #ffffff;
    --color-primary-hover: #6d28d9;
    --color-ring: #7c3aed;
    --color-success: #059669;
    --color-success-foreground: #ffffff;
    --color-warning: #d97706;
    --color-warning-foreground: #ffffff;
    --color-destructive: #dc2626;
    --color-destructive-foreground: #ffffff;
    --color-info: #0284c7;
    --color-info-foreground: #ffffff;
    --radius-card: 16px;
    --radius-input: 12px;
  }

  .dark {
    --color-background: #09090b;
    --color-foreground: #fafafa;
    --color-surface: #121215;
    --color-surface-elevated: #18181b;
    --color-muted: #27272a;
    --color-muted-foreground: #a1a1aa;
    --color-border: #27272a;
    --color-border-subtle: #1c1c1f;
    --color-primary: #8b5cf6;
    --color-primary-foreground: #09090b;
    --color-primary-hover: #a78bfa;
    --color-ring: #8b5cf6;
    --color-success: #10b981;
    --color-success-foreground: #09090b;
    --color-warning: #f59e0b;
    --color-warning-foreground: #09090b;
    --color-destructive: #ef4444;
    --color-destructive-foreground: #ffffff;
    --color-info: #38bdf8;
    --color-info-foreground: #09090b;
  }

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
*/

/*
========================================================================
OPTION 2: Tailwind CSS v3 Legacy (tailwind.config.js)
========================================================================
*/
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte}',
    './index.html',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
          hover: 'var(--color-primary-hover)',
        },
        ring: 'var(--color-ring)',
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          foreground: 'var(--color-info-foreground)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card, 16px)',
        input: 'var(--radius-input, 12px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
