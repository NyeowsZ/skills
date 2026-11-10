# Assessment Engine, API Builders & Diagnostics

This reference provides procedures for assembling simulated HTTP event payloads, solving root-cause diagnostics on distributed failures, and running automated loops through LessonForge multi-question assessment exams.

---

## 1. REST API Event Payload Assembler

In lessons covering API integrations (e.g., *"Send the Release Event"*), students must assemble an HTTP request from discrete components to simulate an event hand-off (such as an RFID tag scan event).

```
+-------------------------------------------------------------------------+
| SIMULATED HTTP REQUEST BUILDER                                          |
|                                                                         |
| Method:  [ POST v ]   Path: [ /rfid                       ]             |
|                                                                         |
| Headers: [ Content-Type: application/json                 ]             |
|                                                                         |
| Body (JSON):                                                            |
| {                                                                       |
|   "tagId":  "HDMI-045",                                                 |
|   "event":  "released",                                                 |
|   "reader": "Storeroom Exit A"                                          |
| }                                                                       |
|                                                                         |
|                                       [ Send Request -> ]               |
+-------------------------------------------------------------------------+
| Response: [ 201 Created ] { "status": "processed", "id": "ev_8812" }    |
+-------------------------------------------------------------------------+
```

### Automation Flow for API Builders
1. **Method Selection**: Locate method buttons or select options (`GET`, `POST`, `PUT`, `DELETE`). Click `POST`.
2. **Endpoint Path**: Set or verify the route input (e.g. `/rfid` or `/orders/118/release`).
3. **Headers & Body Slots**:
   - For slot-based builders, drag or map the corresponding chips: `Content-Type: application/json`, item identifier `"HDMI-045"`, and state transition `"released"`.
4. **Trigger Request**: Click `button:has-text("Send Request")` or `button:has-text("Fire Event")`.
5. **Verify Mock Response**: Confirm that a `200 OK` or `201 Created` status code chip is rendered in the response viewer.

---

## 2. Distributed Architecture Diagnostics ("Solve the Missing Cable")

Diagnostic exercises challenge students to isolate where a multi-service hand-off failed. 

### The Diagnostic Case Archetype: "The 200 OK Trap"
- **Symptom**: User places a request on Friday and receives a green `200 OK (Approved)` response screen. On Monday, the warehouse has no order record, yet storeroom physical inventory is missing 1 item.
- **Root Cause Analysis**:
  1. **System Boundary**: The initial `200 OK` only proves the front Requisition module accepted the request; it does **not** prove asynchronous downstream microservices (Inventory reservation, Courier dispatch) succeeded.
  2. **Shared Database Anti-Pattern**: If Support CRM and Inventory share a raw database table rather than communicating through explicit API interfaces, schema changes break downstream services silently.
  3. **Event Token Mismatch**: The RFID reader sent `POST /orders/118/pick` to the Integration Gateway, but the request was rejected with `401 Unauthorized` due to a missing or expired `x-demo-token` auth header.

### Automated Answering Protocol
Inspect the slide narrative and diagnostic options, matching the questions with architectural evidence:
- *Why did the screen say Approved?* -> The front module completed e-commerce requisition; background e-business hand-offs failed subsequently.
- *What HTTP status indicates missing credentials?* -> `401 Unauthorized`.
- *What HTTP status indicates bad payload shape?* -> `400 Bad Request`.
- *What should happen when an external courier returns 503?* -> Hold the order in pending state, display quote as unavailable, and schedule an exponential retry.

---

## 3. Sequential Assessment Loop (20-Question Final Exam)

The final slide often presents a strict multi-question assessment (e.g., *"Supply Chain Integration Check"*). 

### Assessment State Machine
1. The quiz presents one question at a time.
2. Clicking an answer option selects it.
3. The student must click `Check Answer` to reveal immediate feedback.
4. Once feedback is displayed, the button transforms into `Next Question` (or a separate `Next Question` button enables).
5. On the final question, the button transforms to `Submit Assessment` or `View Results`.

### Automated Quiz Loop Script
The following pattern iterates through the questions deterministically by matching question keywords to pre-verified solutions:

```javascript
// Example helper to answer the active question in the DOM
function answerActiveQuestion(knowledgeBase) {
  // 1. Identify active question text
  const bodyText = document.body.innerText;
  
  // 2. Find matching question entry in knowledge base
  const match = knowledgeBase.find(kb => bodyText.includes(kb.snippet));
  if (!match) return { status: "not_found" };
  
  // 3. Find and click option button containing the correct answer text
  const buttons = Array.from(document.querySelectorAll('button'));
  const targetOption = buttons.find(b => b.innerText.includes(match.correct));
  if (targetOption) {
    targetOption.click();
    
    // 4. Click Check Answer if present
    const checkBtn = buttons.find(b => b.innerText.trim() === 'Check Answer');
    if (checkBtn) checkBtn.click();
    return { status: "answered", selected: match.correct };
  }
  return { status: "option_not_found" };
}

// 5. Advance to next question
function advanceQuiz() {
  const nextBtn = Array.from(document.querySelectorAll('button'))
    .find(b => b.innerText.trim() === 'Next Question' || b.innerText.trim() === 'Finish Assessment');
  if (nextBtn && !nextBtn.disabled) {
    nextBtn.click();
    return true;
  }
  return false;
}
```

---

## 4. Completion Hand-Off & LMS Integration

Upon completing the final assessment question or slide 25:
1. **Verify Results Screen**:
   - Title: `Lesson Complete!`.
   - Score badges: Verify 100% on individual challenges and final assessment.
   - Distraction report: Verify `0` distractions.
2. **LMS Return Callback**:
   - Inspect the query parameter `returnUrl` (e.g., `https://rush-b.vercel.app/student/lessons`).
   - Click `Return to lessons` or `Back to portal`.
   - Ensure the parent LMS receives the completion beacon before terminating the agent turn.

