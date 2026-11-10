# Platform Topology & Anti-Cheat Protocol

This reference details the document layout, navigation state machine, and distraction tracking architecture of LessonForge, providing browser automation agents with the rules required to navigate lessons with zero score penalties.

---

## 1. LessonForge UI Anatomy

LessonForge is rendered as a responsive Single Page Application (typically React + Tailwind CSS). The layout consists of four distinct operational zones:

```
+-------------------------------------------------------------------------+
| [Title] [Distractions: 0] [Audio/Vibe] [Theme] [Focus] [Exit] [Slide 1/25] [Jump to..] | <- Header
+-------------------------------------------------------------------------+
|                                                                         |
|  [H1 / H2 Slide Title]                                                  |
|  [Narrative & Technical Brief]                                          |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | [Inline Interactive Component: Quick Check / DnD / Diagram]       |  | <- Main Body
|  +-------------------------------------------------------------------+  |
|                                                                         |
+-------------------------------------------------------------------------+
| [<- Previous]                                                [Next ->]  | <- Footer Nav
+-------------------------------------------------------------------------+
```

### Key Elements & Selectors
- **Header Status Bar**:
  - Distraction Counter: `span` containing `Distractions:` followed by the integer count.
  - Slide Progress: Formatted as `<current> / <total>` (e.g., `1 / 25`).
  - Audio/Vibration toggle: Button with `aria-pressed`.
  - Mode Controls: "Focus" button (fullscreen) and "Exit" button.
- **Main Viewport**:
  - Headings: `h1`, `h2`, `h3` denoting the lesson topic and sub-steps.
  - Interactive Panels: Canvas containers, code comparison diffs, or drag-and-drop slots.
- **Footer Navigation**:
  - `Previous` button: `button:has-text("Previous")`. Disabled on slide 1.
  - `Next` button: `button:has-text("Next")`. Subject to interactive and state gating.

---

## 2. Distraction Tracking Architecture

LessonForge embeds client-side surveillance to ensure student focus during instructional and assessment phases.

### How Distractions Are Monitored
The platform binds event listeners to the window and document objects:
1. **`document.visibilitychange`**: Fires when the browser tab becomes hidden or backgrounded (`document.visibilityState === 'hidden'`).
2. **`window.onblur`**: Fires when the browser window loses system focus or an OS window overlays it.
3. **`document.onmouseleave`**: Tracks mouse pointer exits beyond the top or lateral borders of the window viewport.

### Warning Rules & Thresholds
- **Grace Allowance**: The lesson allows up to 3 momentary tab departures.
- **Penalty Phase**: Exceeding 3 departures decrements the final calculated grade.
- **Strict Assessment Gating**: Assessment slides (quizzes, diagram exams) initiate a strict attempt when opened. Navigating backward, reloading, or backgrounding the tab prematurely finalizes the attempt with a score of 0.

### The Zero-Distraction Protocol for Agents
To maintain `Distractions: 0` throughout the entire run:
1. **Single-Page Isolation**: Never issue MCP commands that open background tabs (e.g. `new_page`) or navigate to auxiliary URLs in the same session.
2. **Foreground Tab Priority**: Ensure the active `pageId` remains selected in Chrome DevTools MCP.
3. **Casual vs. Focused Mode**: When the entry modal prompts between "Focused mode" (fullscreen) and "Casual mode" (standard viewport), select **Casual mode** (`button:has-text("Casual mode")`). Fullscreen mode can trigger OS permissions prompts that steal window focus.
4. **Safety Shim (Optional)**: If running in an unpredictable headless environment, inject a transparent shim via `evaluate_script` to prevent accidental blur reporting:
   ```javascript
   Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: false });
   Object.defineProperty(document, 'hidden', { value: false, writable: false });
   window.addEventListener('blur', (e) => e.stopImmediatePropagation(), true);
   ```

---

## 3. Slide Progression & Gating Mechanics

In LessonForge, the `Next` button is dynamically managed by the slide component's internal state. It is not sufficient to simply click `Next` repeatedly.

### Common Gating Conditions
The `Next` button will have the `disabled` attribute if any of the following apply:
1. **Unanswered Quick Check**: Non-graded inline checks require an option to be clicked. Upon selection, the component displays feedback (e.g. *"Nailed it!"*) and dispatches an unlock event to the footer navigation.
2. **Unopened Interactive Drawer**: Slides with "Peek Analogy", "Explore Clue", or "Show Request Details" may require the accordion or modal to be opened at least once before unlocking.
3. **Required Dwell Delay / Audio Timer**: Certain slides enforce a minimum reading dwell time (e.g. 5 to 10 seconds). Always check `button[disabled]` attributes. If disabled without an interactive question, wait 3 seconds before re-checking.
4. **Active Exercise Incomplete**: Puzzles (matching, sequencing, API builder, diagram) must be completed and submitted with a passing result.

### Deterministic Advance Routine
```javascript
// Check if Next is currently ready to advance
const nextBtn = Array.from(document.querySelectorAll('button'))
  .find(b => b.innerText.trim() === 'Next');

if (nextBtn && !nextBtn.disabled) {
  nextBtn.click();
} else {
  // Inspect the active slide for required inputs:
  const quickCheckOption = document.querySelector('button[aria-label*="option"], .quick-check button');
  if (quickCheckOption) quickCheckOption.click();
}
```

