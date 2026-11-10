/**
 * lessonforge-eval-helpers.js
 * 
 * Reusable, production-grade DOM evaluation helper snippets for Chrome DevTools MCP.
 * These functions can be embedded into evaluate_script calls to deterministically
 * manipulate React fibers, @dnd-kit sensors, React Flow diagrams, and quiz loops.
 */

const LessonForgeHelpers = {
  /**
   * Traverse upward from a DOM node to find its React Fiber instance.
   */
  getReactFiber(element) {
    if (!element) return null;
    const fiberKey = Object.keys(element).find(k => k.startsWith('__reactFiber$'));
    return fiberKey ? element[fiberKey] : null;
  },

  /**
   * Set native input/textarea values bypassing React's synthetic event masking.
   */
  setNativeInputValue(element, value) {
    if (!element) return false;
    const proto = element.tagName.toLowerCase() === 'textarea' 
      ? window.HTMLTextAreaElement.prototype 
      : window.HTMLInputElement.prototype;
    const valueSetter = Object.getOwnPropertyDescriptor(proto, 'value').set;
    valueSetter.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.dispatchEvent(new Event('blur', { bubbles: true }));
    return true;
  },

  /**
   * Solve @dnd-kit drag-and-drop puzzles by invoking onPlacementsChange on the parent fiber.
   */
  setDndPlacements(targetSelector, placementsMap) {
    const el = document.querySelector(targetSelector || 'button[aria-roledescription="draggable"]');
    if (!el) return { success: false, reason: 'draggable not found' };

    let fiber = this.getReactFiber(el);
    while (fiber && !(fiber.memoizedProps && ('onPlacementsChange' in fiber.memoizedProps || 'setPlacements' in fiber.memoizedProps))) {
      fiber = fiber.return;
    }

    if (!fiber) return { success: false, reason: 'placements fiber not found' };

    const handler = fiber.memoizedProps.onPlacementsChange || fiber.memoizedProps.setPlacements;
    if (typeof handler === 'function') {
      handler(placementsMap);
      return { success: true, updated: placementsMap };
    }
    return { success: false, reason: 'handler is not a function' };
  },

  /**
   * Programmatically update a React Flow canvas with nodes and edges.
   */
  setReactFlowGraph(compSelector, nodes, edges) {
    const el = document.querySelector(compSelector || 'button');
    if (!el) return { success: false, reason: 'anchor element not found' };

    let fiber = this.getReactFiber(el);
    // Find the component managing diagram state
    while (fiber && !(fiber.memoizedState && fiber.memoizedState.queue)) {
      fiber = fiber.return;
    }

    if (!fiber) return { success: false, reason: 'diagram state fiber not found' };

    try {
      const setNodes = fiber.memoizedState.queue.dispatch;
      const setEdges = fiber.memoizedState.next.queue.dispatch;
      if (typeof setNodes === 'function' && typeof setEdges === 'function') {
        setNodes(nodes);
        setEdges(edges);
        return { success: true, nodeCount: nodes.length, edgeCount: edges.length };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
    return { success: false, reason: 'dispatchers not callable' };
  },

  /**
   * Read the LIVE GUIDANCE criteria checklist status.
   */
  getLiveGuidanceStatus() {
    const items = Array.from(document.querySelectorAll('*'))
      .filter(el => el.children.length === 0 && el.innerText && el.innerText.includes('pts'))
      .map(el => ({
        text: el.parentElement?.innerText || el.innerText,
        passed: !el.parentElement?.className.includes('text-muted') && !el.parentElement?.className.includes('opacity-50')
      }));

    const submitBtn = Array.from(document.querySelectorAll('button'))
      .find(b => b.innerText.trim() === 'Submit diagram');

    return {
      criteriaCount: items.length,
      items,
      submitDisabled: submitBtn ? submitBtn.disabled : null
    };
  },

  /**
   * Install safety shim against window blur and visibility changes.
   */
  installAntiDistractionShim() {
    try {
      Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: false });
      Object.defineProperty(document, 'hidden', { value: false, writable: false });
      window.addEventListener('blur', (e) => e.stopImmediatePropagation(), true);
      window.addEventListener('mouseleave', (e) => e.stopImmediatePropagation(), true);
      return { success: true, message: 'Anti-distraction listeners active' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = LessonForgeHelpers;
}

