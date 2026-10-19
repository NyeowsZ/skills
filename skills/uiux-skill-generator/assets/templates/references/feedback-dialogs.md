# Feedback, Modals & Dialogs Reference

This document provides canonical, copy-pasteable recipes for modal dialogs, status banners, toast alerts, and empty states in **{{SKILL_NAME}}**.

---

## 1. Accessible Modal Dialog

Includes dark backdrop overlay, surface elevation, and clear action boundaries.

```html
<div 
  class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-headline"
>
  <div class="relative w-full max-w-md rounded-xl bg-surface border border-border shadow-lg p-6 space-y-4">
    <!-- Header -->
    <div class="space-y-1">
      <h3 id="modal-headline" class="text-base font-semibold text-foreground">
        Revoke API Key
      </h3>
      <p class="text-xs text-muted-foreground">
        Are you sure you want to deactivate this API key? Applications using this token will fail immediately.
      </p>
    </div>

    <!-- Alert Note -->
    <div class="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>This action cannot be undone.</span>
    </div>

    <!-- Modal Actions -->
    <div class="flex items-center justify-end gap-2 pt-2">
      <button type="button" class="px-3 py-1.5 text-xs font-medium rounded-md bg-surface text-foreground border border-border hover:bg-muted">
        Cancel
      </button>
      <button type="button" class="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Revoke Key
      </button>
    </div>
  </div>
</div>
```

---

## 2. Status Banners (Alerts)

### Success Notification
```html
<div role="status" class="p-3.5 rounded-lg bg-success-subtle border border-success/30 text-success text-xs flex items-start gap-2.5">
  <span class="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0"></span>
  <div class="space-y-0.5">
    <strong class="font-medium text-foreground">Deployment Successful</strong>
    <p class="text-muted-foreground">Version 2.4.1 has rolled out to 100% of global edge nodes.</p>
  </div>
</div>
```

### Warning Notice
```html
<div role="alert" class="p-3.5 rounded-lg bg-warning-subtle border border-warning/30 text-warning text-xs flex items-start gap-2.5">
  <span class="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0"></span>
  <div class="space-y-0.5">
    <strong class="font-medium text-foreground">Approaching Rate Limit</strong>
    <p class="text-muted-foreground">You have consumed 88% of your monthly API request quota.</p>
  </div>
</div>
```

---

## 3. Empty State

```html
<div class="p-12 text-center rounded-lg border border-dashed border-border bg-surface/50 space-y-3">
  <div class="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center text-muted-foreground">
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  </div>
  <div class="space-y-1">
    <h4 class="text-sm font-semibold text-foreground">No Webhooks Configured</h4>
    <p class="text-xs text-muted-foreground max-w-sm mx-auto">
      Connect external endpoints to receive real-time notifications about deployment lifecycle changes.
    </p>
  </div>
  <button class="mt-2 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
    Add Webhook
  </button>
</div>
```

---

## 4. Accessibility Checklist

- [ ] Modals MUST have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="headline-id"`.
- [ ] Banners MUST use `role="status"` for non-critical updates and `role="alert"` for errors/warnings.
- [ ] Modals MUST include a visible mechanism to close or cancel.
