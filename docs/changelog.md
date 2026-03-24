# Changelog

All notable changes to the DSA Visualizer project will be documented in this file.

## [Unreleased]

### Added
- **Phase 3 Complete**: All Phase 3 algorithms implemented

- **Phase 3.3 Additional Searching Algorithms**: Three new searching algorithms with full 10-language snippets, complexity info, and generators
  - `Interpolation Search` — estimates probe position via value interpolation; O(log log n) average on uniform data
  - `Exponential Search` — doubles index to find range then binary searches within it; O(log n); best for unbounded arrays
  - `Sentinel Linear Search` — places target as sentinel at end to eliminate bounds check per iteration; `sentinelLinearSearch` correctly skips pre-sort (works on unsorted arrays like `linearSearch`)

- **Phase 3.2 Meme Sorting Algorithms**: Two new novelty sorts added to `sorting-meme.js`
  - `Sleep Sort` — simulates value-proportional thread sleep; smaller values "wake up" first; visualised as threads launching then arriving in value order
  - `Miracle Sort` — scans array hoping for cosmic ray intervention; runs 3 futile passes then the miracle strikes and all elements are sorted

- **Phase 3.1 Practical Sorting Algorithms**: Added five new sorting algorithms with full 10-language code snippets, complexity info, and step-by-step generators
  - `Comb Sort` — shrinking-gap variant of Bubble Sort; gap starts at n and shrinks by factor 1.3 each pass
  - `Odd-Even Sort` — parallel variant alternating between odd-indexed and even-indexed pair comparisons
  - `Radix Sort` — LSD digit-by-digit counting sort; visualises each digit pass with compare and overwrite steps
  - `Bucket Sort` — distributes elements into value-range buckets, insertion-sorts each bucket, then concatenates
  - `Tim Sort` — hybrid insertion-sort + merge-sort; identifies natural runs then merges them in ascending size order

- **Algorithm file split (sorting.js)**: `sorting.js` (6,400 lines) split into three files for maintainability
  - `sorting.js` — core comparison sorts: Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, Counting (~2,640 lines)
  - `sorting-extended.js` — extended/practical sorts: Gnome, Cocktail Shaker, Pancake, Comb, Odd-Even, Radix, Bucket, Tim (~2,836 lines)
  - `sorting-meme.js` — novelty sorts: Bogo, Thanos, Stalin (~1,075 lines)
  - `sorting.js` imports and re-exports from the other two; `main.js` unchanged

- **Build optimisation — Vite chunk splitting**: Added `manualChunks` in `vite.config.js` to separate all algorithm files into a dedicated `algorithms` chunk; main bundle reduced from 533 KB to 36 KB

- **Manual input for Size and Speed controls**: Added editable number inputs alongside the Size and Speed sliders; typing a value and pressing Enter (or tabbing out) clamps to the valid range and syncs the slider; Size input respects the List[int] 10-element cap

### Fixed
- **Bug — List[int] mode rendering as bars**: Switching view mode to `List[int]` rendered bars instead of list cells when array size exceeded 10. `Visualizer.setMode()` was being called after `generateArray()`, so the first render still used the old mode. Fixed by calling `setMode()` before any array regeneration.

- **Bug — Heap Sort code panel empty**: `Heap Sort` (`heapSort`) matched the `algoKey.startsWith('heap')` guard intended only for tree-heap operations (`heapInsertMin`, `heapExtractMin`). This caused `loadAlgorithm()` to look up code in `TreeAlgorithms.HEAP_CODE` (which has no `heapSort` key) instead of `SortingAlgorithms.CODE`. Fixed all four `startsWith('heap')` occurrences to explicit key checks.

- **Bug — Linked List visualizer completely empty**: Three separate issues caused the linked list panel to show nothing
  1. `loadAlgorithm()` had no branch for linked list algorithms — they fell through to `SortingAlgorithms.CODE`, yielding empty code, description, and complexity panels. Added explicit `isLinkedListAlgorithm` branch routing to `LinkedListAlgorithms.CODE` and `COMPLEXITY`.
  2. `reset()` only called `switchVizMode()` for tree/graph algorithms. Added linked list to the condition so Reset rebuilds the list.
  3. `.linked-list-container` had no CSS dimensions. Added `width: 100%; height: 100%; display: flex;` rule mirroring `.tree-graph-container`.

- **Bug — Detect Cycle empties the linked list**: `llDetectCycle` returns a boolean (`true`/`false`). The `result.done` handler unconditionally assigned this to `currentLinkedList`, causing `LinkedListRenderer.render(false)` to display "Empty List". Fixed by only updating `currentLinkedList` when the return value is a non-null object.

- **Bug — Linked list nodes clipped on right edge**: The SVG `viewBox` width was calculated from node top-left positions only, omitting `NODE_WIDTH` (50 px) for the rightmost node. Added `NODE_WIDTH` and `NODE_HEIGHT` to the viewBox dimensions so all nodes are fully visible.

### Technical Notes
- `sorting-extended.js` and `sorting-meme.js` export plain objects `{ CODE, COMPLEXITY, ...generators }`; `sorting.js` merges them via spread before exporting `SortingAlgorithms`
- The `algorithms` Vite chunk now includes all five algorithm files; parallel loading replaces the single 533 KB bundle
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
