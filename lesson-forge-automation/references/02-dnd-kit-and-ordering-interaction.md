# Drag-and-Drop & Sequence Ordering Interaction

This reference details how to interact with modern React drag-and-drop interfaces—specifically `@dnd-kit` and interactive card reordering widgets—encountered in LessonForge activities such as *"Who Owns This Job?"* and *"Number the Cable's Hand-offs"*.

---

## 1. The `@dnd-kit` Challenge in Browser Automation

Standard browser automation tools (such as Chrome DevTools MCP `drag` or Puppeteer `page.mouse.dragAndDrop`) frequently fail when targeting modern web courseware. This occurs because modern React applications do not use the legacy HTML5 Drag and Drop API (`ondragstart`, `ondragover`, `ondrop`). 

Instead, `@dnd-kit` relies on:
1. **Pointer Sensors with Pointer Capture**: Listening to `pointerdown`, `pointermove`, and `pointerup` while locking the pointer via `element.setPointerCapture(pointerId)`. Synthetic mouse events without an active pointer capture context are discarded.
2. **Dynamic Coordinate Calculation**: Drop zones calculate hitboxes dynamically via `getBoundingClientRect()`. Micro-jitters or canvas scale factors can cause drops to miss target slots.
3. **Decoupled React State**: The DOM elements are ephemeral reflections of an internal placement map (e.g., `{ [slotId: string]: chipId }`).

---

## 2. Strategy A: React Fiber Hook Injection (Recommended)

The most deterministic, atomic method to solve `@dnd-kit` puzzles is to interact directly with the React Fiber node managing the component's state. This bypasses pointer coordinate physics entirely.

### Step 1: Identify the Fiber and Prop Handlers
Every React DOM node has an internal property beginning with `__reactFiber$`. Traversing upward reveals the parent component hosting the exercise's dispatch handlers.

```javascript
// Locate any draggable chip or drop target
const draggable = document.querySelector('button[aria-roledescription="draggable"]');
const fiberKey = Object.keys(draggable).find(k => k.startsWith('__reactFiber$'));
let fiber = draggable[fiberKey];

// Walk up the tree to find the parent state controller
while (fiber) {
  if (fiber.memoizedProps && (fiber.memoizedProps.onPlacementsChange || fiber.memoizedProps.onDragEnd)) {
    break;
  }
  fiber = fiber.return;
}
```

### Step 2: Inspect Expected Slot IDs and Chip IDs
Inspect the props to extract available chips and target slots:

```javascript
const chips = fiber.memoizedProps.chips;       // Array of { id, label, role }
const slots = fiber.memoizedProps.slots;       // Array of { id, title, targetKey }
const currentPlacements = fiber.memoizedProps.placements; // Current state object
```

### Step 3: Dispatch Placements Directly
Invoke the change handler with the resolved mapping:

```javascript
// Example: Pairing 5 responsibilities to 5 system modules
const solutionMap = {
  "wb1": "ans:wb1", // Requisition & Approval
  "wb2": "ans:wb2", // Inventory
  "wb3": "ans:wb3", // Warehouse Fulfillment
  "wb4": "ans:wb4", // Logistics (Courier)
  "wb5": "ans:wb5"  // Support (CRM)
};

// Dispatch the solved state
fiber.memoizedProps.onPlacementsChange(solutionMap);
```

### Step 4: Submit & Verify
After updating the placements:
1. Locate the submission button: `button:has-text("Check Answer")` or `button:has-text("Submit")`.
2. Click the button and check for the success banner (e.g. `Score: 5/5, 100%`).

---

## 3. Strategy B: Accessible Keyboard Sensor

If direct fiber access is restricted by a shadow root or minified bundler wrapper, `@dnd-kit` provides first-class keyboard accessibility out of the box.

### The Keyboard Protocol
1. **Focus Draggable**: Focus the draggable chip:
   ```javascript
   const chip = document.querySelectorAll('button[aria-roledescription="draggable"]')[0];
   chip.focus();
   ```
2. **Lift Item**: Dispatch a `Space` key event:
   ```javascript
   chip.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
   ```
3. **Move to Target Slot**: Dispatch `ArrowDown` or `ArrowRight` repeatedly to move between droppable slots:
   ```javascript
   chip.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', key: 'ArrowDown', bubbles: true }));
   ```
4. **Drop Item**: Dispatch a terminating `Space` key event:
   ```javascript
   chip.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
   ```

---

## 4. Sequence Ordering Widgets ("Number the Hand-offs")

Chronological sequencing activities require arranging a list of distributed events into the correct chronological order (e.g., 7 stages of an order hand-off).

### Implementation Patterns
1. **Numbered Selectors / Slot Dropdowns**: Some widgets provide a sequential drop target for steps 1 through 7.
2. **Up / Down Reorder Buttons**: Each row may render up (`↑`) and down (`↓`) buttons.
3. **Internal Array State**: If using fiber injection, locate the state hook managing the array of step IDs and dispatch the sorted array:
   ```javascript
   const stepComponent = fiber.memoizedProps;
   if (stepComponent.onOrderChange) {
     stepComponent.onOrderChange([
       "step-req",      // 1. Requisition submitted
       "step-appr",     // 2. Department approval
       "step-resv",     // 3. Inventory reserved
       "step-pick",     // 4. Warehouse pick scan
       "step-rel",      // 5. RFID release event
       "step-cour",     // 6. Courier hand-off
       "step-recv"      // 7. Requester receipt scan
     ]);
   }
   ```
4. Always click the verification button (`Check Sequence`) to lock in points before advancing the slide.

