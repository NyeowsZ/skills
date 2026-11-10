# React Flow Interactive Diagram Builder

This reference covers the architecture and automated manipulation of the interactive system mapping canvas in LessonForge (such as *"Draw the Integration Map"*), powered by **React Flow** (`@xyflow/react`).

---

## 1. Canvas Architecture & Component Layout

The diagramming activity allows students to construct microservice topologies, data boundaries, and event pipelines.

```
+---------------------------------------------------------------------------------------+
| TOOLBAR: [ + Client ] [ + Service / API ] [ + Database ] [ + External service ] [ + Rel ]|
+------------------------------------------------------------------+--------------------+
|                                                                  | LIVE GUIDANCE:     |
|   REACT FLOW CANVAS (.react-flow__viewport)                      |                    |
|                                                                  | [x] Requester App  |
|   [ Requester App ] ---> [ Integration Gateway ]                 | [x] Gateway drawn  |
|         (Client)                 (Service)                       | [x] DB connected   |
|                                      |                           | [x] RFID Reader    |
|                                      v                           | [x] Courier quote  |
|                           [ Inventory Database ]                 |                    |
|                                 (Database)                       | Total: 19/19 pts   |
|                                                                  +--------------------+
|                                                                  | [ Submit diagram ] |
+------------------------------------------------------------------+--------------------+
```

### Critical DOM Components
1. **Creation Toolbar**: Buttons labeled with component archetypes:
   - `Client` (frontends, mobile apps, requester portals)
   - `Service / API` (microservices, API gateways, order orchestrators)
   - `Database` (relational DBs, cache stores, inventory records)
   - `External service` (third-party payment, logistics courier APIs)
   - `Queue` (event brokers, message buses)
   - `System boundary` (organizational perimeter boxes)
2. **Element Properties Drawer**: Appears when a node is selected. Contains:
   - Name input: `input[aria-label="Element name"]` (or placeholder `"Element name"`).
   - Kind dropdown / delete node button.
3. **Relationship Drawer**: Modal or sidebar to connect two nodes:
   - Source node selector.
   - Target node selector.
   - Label / protocol text input (e.g., `POST /orders`, `RFID scan event`).
4. **Live Guidance Panel (`LIVE GUIDANCE`)**: Real-time evaluator that parses the active node/edge graph against instructional criteria (e.g. 11 rules scoring up to 19 points).
5. **Submit Diagram Button**: Submits the current graph to the grading endpoint.

---

## 2. Approach 1: Programmatic React State Dispatch (Fastest & Exact)

Connecting handles and dragging nodes using browser mouse events is notoriously fragile due to zoom transformations, SVG handle offsets, and drag friction. 

Directly dispatching the nodes and edges state into React Flow's state hooks guarantees 100% accuracy in a single turn.

### Step 1: Hook into the Diagram Parent Fiber
```javascript
// Locate any component button in the toolbar
const compBtn = Array.from(document.querySelectorAll('button'))
  .find(b => b.innerText.trim() === 'Service / API');

const fiberKey = Object.keys(compBtn).find(k => k.startsWith('__reactFiber$'));
let fiber = compBtn[fiberKey];

// Traverse up to find the diagram controller component (e.g. 'eT' or DiagramBuilder)
while (fiber && !(fiber.memoizedState && fiber.memoizedState.queue)) {
  fiber = fiber.return;
}

// In React Flow wrappers, hook 0 is nodes state and hook 1 is edges state:
const setNodes = fiber.memoizedState.queue.dispatch;
const setEdges = fiber.memoizedState.next.queue.dispatch;
```

### Step 2: Define Complete Node & Edge Topology
```javascript
const newNodes = [
  {
    id: "app",
    position: { x: 60, y: 100 },
    type: "diagramNode",
    data: { kind: "client", semanticLabel: "Requester App", details: [], locked: false },
    draggable: true
  },
  {
    id: "orders",
    position: { x: 280, y: 100 },
    type: "diagramNode",
    data: { kind: "service", semanticLabel: "Order Service", details: [], locked: false },
    draggable: true
  },
  {
    id: "inventory-db",
    position: { x: 520, y: 100 },
    type: "diagramNode",
    data: { kind: "database", semanticLabel: "Inventory Database", details: [], locked: false },
    draggable: true
  },
  {
    id: "gateway",
    position: { x: 280, y: 260 },
    type: "diagramNode",
    data: { kind: "service", semanticLabel: "Integration Gateway", details: [], locked: false },
    draggable: true
  },
  {
    id: "crm",
    position: { x: 520, y: 260 },
    type: "diagramNode",
    data: { kind: "service", semanticLabel: "Support CRM", details: [], locked: false },
    draggable: true
  },
  {
    id: "rfid",
    position: { x: 60, y: 260 },
    type: "diagramNode",
    data: { kind: "external", semanticLabel: "RFID Reader", details: [], locked: false },
    draggable: true
  },
  {
    id: "courier",
    position: { x: 280, y: 400 },
    type: "diagramNode",
    data: { kind: "external", semanticLabel: "Courier Service", details: [], locked: false },
    draggable: true
  }
];

const newEdges = [
  { id: "e1", source: "app", target: "orders", label: "Place Request" },
  { id: "e2", source: "orders", target: "inventory-db", label: "Reserve Stock" },
  { id: "e3", source: "rfid", target: "gateway", label: "POST /rfid (Tag Scan)" },
  { id: "e4", source: "gateway", target: "inventory-db", label: "Update Status" },
  { id: "e5", source: "gateway", target: "crm", label: "Sync Hand-off" },
  { id: "e6", source: "gateway", target: "courier", label: "Dispatch Booking" }
];

// Dispatch state updates
setNodes(newNodes);
setEdges(newEdges);
```

---

## 3. Approach 2: Structured DOM Automation via Toolbar

If script execution is constrained to pure DOM events, use the native input setter pattern to prevent React input value desynchronization.

### Setting Native Input Values Safely
```javascript
function setNativeInputValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  valueSetter.call(element, value);
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
  element.dispatchEvent(new Event('blur', { bubbles: true }));
}

// 1. Click node category in toolbar
const addBtn = Array.from(document.querySelectorAll('button'))
  .find(b => b.innerText.trim() === 'Database');
addBtn.click();

// 2. Locate the newly created element's name input and rename
const nameInput = document.querySelector('input[aria-label="Element name"]');
setNativeInputValue(nameInput, 'Inventory Database');
```

---

## 4. Live Guidance Verification & Submission

Always audit the real-time scoring rules before calling the submit action:

```javascript
// Extract all criteria items from the LIVE GUIDANCE block
const criteriaItems = Array.from(document.querySelectorAll('*'))
  .filter(el => el.innerText && el.innerText.includes('pts'))
  .map(el => el.parentElement?.innerText || el.innerText);

// Ensure no criteria are failing or unfulfilled
const submitBtn = Array.from(document.querySelectorAll('button'))
  .find(b => b.innerText.trim() === 'Submit diagram');

if (submitBtn && !submitBtn.disabled) {
  submitBtn.click();
}
```
Observe the response banner to confirm the 100% score (e.g. `Score: 19/19 (100%)`).

