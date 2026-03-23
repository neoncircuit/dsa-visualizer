# Linked List Visualizer - Implementation Guide

## Overview

Add comprehensive linked list visualization to DSA Visualizer with the same quality and feature set as existing data structure visualizers. Linked lists will support random operations for ambiguity, step-by-step visualization with code highlighting, and multi-language code snippets.

## Implementation Status

| Algorithm | Status | Notes |
|---|---|---|
| Insert at Head | Complete | |
| Insert at Tail | Complete | |
| Insert at Position | Complete | Position input shown in controls bar |
| Insert After Value | Pending | |
| Delete Head | Complete | |
| Delete Tail | Complete | |
| Delete at Position | Complete | Position input shown in controls bar |
| Delete by Value | Complete | 80% existing / 20% missing ambiguity |
| Search | Complete | |
| Traverse | Complete | |
| Reverse | Complete | |
| Detect Cycle | Pending | |
| Merge Sorted Lists | Pending | |
| Merge Sort | Pending | |

---

## Algorithms to Implement

### Basic Operations

1. **Insert Operations**
   - Insert at Head
   - Insert at Tail
   - Insert at Position
   - Insert After Value

2. **Delete Operations**
   - Delete Head
   - Delete Tail
   - Delete at Position
   - Delete by Value

3. **Traversal & Search**
   - Traverse (visit all nodes)
   - Search for Value
   - Find Middle Node (for learning)

4. **Advanced Operations**
   - Reverse Linked List
   - Detect Cycle
   - Merge Two Sorted Lists

### Sorting Algorithms

- **Merge Sort** - Natural for linked lists, O(n log n)
- Selection Sort (optional) - O(n^2) for learning purposes

## Technical Specifications

### Node Structure

```javascript
{
    value: number,
    next: Node | null,
    id: number  // For tracking visualization state
}
```

### Step Object Structure

```javascript
{
    type: string,      // 'visit', 'compare', 'found', 'insert', 'delete', 'reverse', 'notFound'
    nodeId: number,     // Node being visited/modified
    targetId?: number,  // For search operations
    codeLine: number    // Code line to highlight
}
```

## Visual Design

- **Nodes**: Rectangular boxes with value inside (distinct from circular tree nodes)
- **Pointers**: Arrows showing next references
- **Animations**:
  - New nodes fade in when inserted
  - Deleted nodes fade out
  - Arrows animate to show pointer updates
  - Highlighting colors: visiting (yellow), comparing (blue), found (green), deleted (red)

### Renderer Requirements

- **Layout**: Horizontal or vertical layout option
- **Positioning**:
  - Horizontal: Nodes arranged left-to-right
  - Vertical: Nodes arranged top-to-bottom
  - Adaptive: Switch based on list length
- **Spacing**: Dynamic spacing between nodes
- **ViewBox**: Auto-fit to show entire list with padding

## Ambiguity Implementation

### Random Value Generation

- Values from 5-95 range (like tree values)
- Unique values initially (for search operations)

### Random Operation Points

- Insert at: Randomly choose head, tail, or random position
- Delete: Randomly choose head, tail, random position, or by value
- Search: Random target value (sometimes present, sometimes not)

### List Generation Patterns

- **Random**: Random values in random order
- **Sorted**: Values in ascending order
- **Reversed**: Values in descending order
- **Few Unique**: Limited value set (1-5) for pattern recognition

## Code Snippet Requirements

Each algorithm needs code snippets in:
- Pseudocode
- Python (with type hints)
- Java
- C++
- C
- C#
- JavaScript
- TypeScript
- Go
- Rust

Example insert at head structure:

```pseudocode
procedure insertAtHead(head, value):
    newNode = Node(value)
    newNode.next = head
    return newNode
```

```python
def insert_at_head(head: Optional[Node], value: int) -> Node:
    new_node = Node(value)
    new_node.next = head
    return new_node
```

## Complexity Information Required

For each algorithm:
- Name
- Best/Average/Worst Time Complexity
- Space Complexity
- Plain English description
- Best use case
- When to avoid

Example for Insert at Head:
- Best: O(1)
- Average: O(1)
- Worst: O(1)
- Space: O(1)
- Description: Create new node, set its next to current head, return new node as new head.
- Use Case: Stack implementations, queue implementations via deque, frequent insertions at beginning.
- Avoid: When random access by index is needed (use array instead).

## UI Integration

### Algorithm Dropdown (index.html)

```html
<optgroup label="Linked Lists">
    <option value="llInsertHead">Insert at Head</option>
    <option value="llInsertTail">Insert at Tail</option>
    <option value="llInsertPos">Insert at Position</option>
    <option value="llDeleteHead">Delete Head</option>
    <option value="llDeleteTail">Delete Tail</option>
    <option value="llDeletePos">Delete at Position</option>
    <option value="llDeleteVal">Delete by Value</option>
    <option value="llSearch">Search Value</option>
    <option value="llTraverse">Traverse All</option>
    <option value="llReverse">Reverse List</option>
    <option value="llMergeSort">Merge Sort</option>
</optgroup>
```

### Main Controller Updates (main.js)

```javascript
const LINKED_LIST_ALGORITHMS = [
    'llInsertHead', 'llInsertTail', 'llInsertPos',
    'llDeleteHead', 'llDeleteTail', 'llDeletePos', 'llDeleteVal',
    'llSearch', 'llTraverse', 'llReverse', 'llMergeSort'
];

function isLinkedListAlgorithm(key) {
    return LINKED_LIST_ALGORITHMS.includes(key);
}
```

### Controls to Add

- Input field for position value (only show when needed)
- Input field for value to insert/delete (for insert at position, delete by value)

## File Structure

```
src/static/js/
    linked-list-renderer.js    # NEW - SVG renderer for linked lists
    algorithms/
        linked-lists.js         # NEW - Algorithm generators + code + complexity
```

## CSS Requirements (main.css)

```css
/* Linked list container */
.ll-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ll-svg {
    width: 100%;
    height: 100%;
}

/* Linked list nodes */
.ll-node rect {
    fill: var(--bg-tertiary);
    stroke: var(--accent);
    stroke-width: 2;
    transition: fill 0.2s, stroke 0.2s;
}

.ll-node-text {
    fill: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
}

/* Arrow (next pointer) */
.ll-arrow {
    stroke: var(--border-color);
    stroke-width: 2;
    marker-end: url(#arrowhead);
}

/* Node states */
.ll-node.visiting rect { fill: var(--color-visiting); }
.ll-node.comparing rect { fill: var(--color-comparing); }
.ll-node.found rect { fill: var(--color-found); }
.ll-node.deleting rect { fill: var(--color-delete); }
.ll-node.inserted rect { fill: var(--color-insert); }
```

## Implementation Order

1. **Renderer First**: Build `linked-list-renderer.js` to display static lists
2. **Algorithms Second**: Implement algorithm generators in `linked-lists.js`
3. **Integration Third**: Wire into main.js controller
4. **UI Fourth**: Add HTML controls and CSS
5. **Code Snippets Fifth**: Add multi-language code
6. **Testing Sixth**: Verify all operations work correctly

## Success Criteria

- All basic operations (insert, delete, search, traverse) work
- Visual representation is clear and matches linked list structure
- Arrows correctly show pointer relationships
- Animations make pointer updates visible
- Random ambiguity keeps operations unpredictable
- Code snippets available in all 10 languages
- Complexity info is accurate and educational
- User can step through operations
- Merge sort works correctly for linked lists
- Existing tree/graph/bar visualizers unaffected

## Future Enhancements (Optional)

- Doubly linked list visualization
- Circular linked list visualization
- Skip list visualization
- Comparison mode: array operations vs linked list operations
- Interactive node dragging
