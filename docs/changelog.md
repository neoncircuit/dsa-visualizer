# Changelog

All notable changes to the DSA Visualizer project will be documented in this file.

## [Unreleased]

### Added
- **Linked List Visualizer - CRUD Operations (Phase 2.2)**: Extended linked list support with three new operations
  - `llInsertPos` — Insert a new node at a specified 0-based position; position 0 behaves as insert at head, position >= length appends at tail
  - `llDeletePos` — Delete the node at a specified 0-based position with graceful out-of-range handling
  - `llDeleteVal` — Delete the first node matching a target value; yields `compare` steps during traversal and `notFound` when absent
  - Each operation includes code snippets in all 10 languages (Pseudo, Python, Java, C++, C, C#, JavaScript, TypeScript, Go, Rust)
  - Added `ll-position-group` input control to `index.html`, shown only for position-based algorithms
  - Generator return values now update `currentLinkedList` and re-render after completion (same pattern as tree algorithms)
  - Ambiguity for `llDeleteVal`: 80% chance picks an existing node value, 20% picks a non-existent value

- **Linked List Visualizer - Basic Implementation**: Implemented core linked list visualization system
  - Created `src/static/js/linked-list-renderer.js` with SVG-based renderer (rectangular nodes, arrow pointers)
  - Created `src/static/js/algorithms/linked-lists.js` with generators for: Insert at Head, Delete Head, Search, Traverse, Reverse
  - Each algorithm includes code snippets in 10 languages (Pseudo, Python, Java, C++, C, C#, JavaScript, TypeScript, Go, Rust)
  - Added complexity information for all implemented algorithms
  - Added `generateRandomLinkedListValues()` function for random 6-10 value generation (5-95 range)
  - Integrated into main.js controller with linked list support (dropdown, init generator, execute step, process step)
  - Added CSS styles for linked list nodes, arrows, and states in `main.css`
  - Added linked list container div to `index.html`
  - Added linked list algorithm options to dropdown (Insert at Head, Delete Head, Search, Traverse, Reverse)
  - See `tasks/lessons.md` entry #4 for linked list implementation lesson learned

### Fixed
- **Bug #1 - Tree not updating after completion**: BST Insert, Search, and Traversal algorithms now properly re-render tree after completion by capturing and applying generator's return value.
- **Linked List Visualizers**: Comprehensive implementation plan created for adding linked list operations and algorithms
  - Full specification documented in `docs/linked-lists.md`
  - Planned algorithms: Insert (head/tail/position), Delete (head/tail/position/value), Search, Traverse, Reverse, Detect Cycle, Merge Sorted Lists, Merge Sort
  - Renderer design: SVG-based with node boxes and arrow pointers, horizontal/vertical layout options
  - Ambiguity implementation: Random operation points, random targets, multiple list generation patterns
  - UI integration: Algorithm dropdown, position/value input controls
  - Success criteria defined for complete, educational linked list visualizer
  - Updated approach: Specs go to `docs/`, task checklists to `tasks/todo.md`, lessons to `tasks/lessons.md`
  - See `tasks/lessons.md` entry #3 for planning lesson learned

### Fixed
- **Bug #1 - Tree not updating after completion**: BST Insert, Search, and Traversal algorithms now properly re-render tree after completion by capturing and applying generator's return value. Previously, tree would only show step highlights but not reflect updated structure (e.g., newly inserted nodes were not visible after algorithm finished).
  - Modified `src/static/js/main.js` `executeStep()` function to capture `result.value` when generator completes
  - For tree algorithms, returned tree root is now stored in `currentTree` and re-rendered via `TreeRenderer.render()`
  - See `tasks/lessons.md` entry #12 for detailed lesson learned about generator return value handling

- **Bug #2 - TypeError on tree algorithm execution**: Fixed "Cannot read properties of undefined (reading 'length')" error that occurred when pressing Play on tree visualizers. The `processStepStats()` function attempted to access `step.indices` without checking if it exists. Tree algorithms use `nodeId` in step objects instead of `indices`.
  - Modified `src/static/js/main.js` `processStepStats()` function to add defensive checks: `step.indices && step.indices.length > 0`
  - Updated JSDoc to reflect that `indices` is optional: `indices?: number[]`
  - See `tasks/lessons.md` entry #13 for detailed lesson learned about step object variability

- **Bug #3 - Missing closing brace in `llInsertTail` CODE entry**: The `llInsertTail` entry in the `CODE` constant was missing its closing `},`, causing `llDeleteTail` to be parsed as a nested property inside `llInsertTail`. The brace imbalance was latent until strict ES module parsing surfaced it.
  - Added missing `},` after the `rust` language array in `llInsertTail` (`src/static/js/algorithms/linked-lists.js`)

### Technical Notes
- Bug #1 fix applies to all tree algorithms that mutate structure: `bstInsert`, `bstSearch`, `bstInorder`, `bstPreorder`, `bstPostorder`
- Graph algorithms are unaffected by Bug #1 as they operate on adjacency lists without returning new structure
- Sorting and searching algorithms are unaffected by both bugs as they use `indices` array in step objects
- Bug #2 affected any algorithm type that doesn't include `indices` in step objects (trees, graphs)
