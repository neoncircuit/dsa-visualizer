# Changelog

All notable changes to the DSA Visualizer project will be documented in this file.

## [Unreleased]

### Added

- **Phase 8: Maze Generation and Grid Pathfinding**: Added 7 new "Interesting" algorithms under a new optgroup in the algorithm dropdown
  - Maze generation (3 algorithms): Recursive Backtracker (iterative DFS), Prim's (randomised frontier), Binary Tree (random N/E carving)
  - Grid pathfinding (4 algorithms): BFS (shortest path guarantee), DFS (any path), A* (optimal with Manhattan heuristic), Greedy Best-First (heuristic-only)
  - Canvas-based renderer (`maze-renderer.js`): per-cell state colours, dark/light theme palettes, ResizeObserver, step-by-step animation
  - Algorithm file (`algorithms/maze.js`): all 7 generators, MinHeap class for A*/Greedy, full 10-language CODE snippets, COMPLEXITY entries with real-world use cases
  - Integration: maze container in HTML, visibility toggling, CoT panel support, Generate button routing, fallback maze generation for pathfinding without a prior maze

### Added (Previous)

- **Array State Panel**: Added a persistent two-row panel below the visualizer showing live numeric values and indices for every array element
  - One cell per element; cells align horizontally with the bars above them
  - Cell background colour mirrors bar state: compare (orange), swap (red), sorted (green), found (yellow), pivot (yellow), searching (purple)
  - Swap animation: cells visually cross using CSS `translateX` at a duration scaled to playback speed; values update after the animation completes
  - Hidden automatically for tree, graph, and linked-list algorithms (no array state) and for `list[int]` mode (per-item display is redundant)
  - Hidden in portrait/vertical layout via `body.vertical .array-state-panel { display: none }`
  - Initialised with the starting array immediately after Generate, before Play is pressed

- **Manual value inputs for Size and Speed sliders**: Added editable `<input type="number">` fields alongside each range slider; typing a value and pressing Enter (or tabbing out) clamps to the valid range and syncs the slider in both directions. Size input respects the List[int] 10-element cap.

- **Info Panel Readability**: Improved visual hierarchy across the left info panel
  - Section headings now carry a 2px accent-colour left border stripe, making sections instantly scannable
  - Algorithm title separated from content by a bottom border line; font size bumped to 1rem
  - Section gap and line-height increased for breathing room between description text
  - Space complexity value enlarged (0.8rem → 0.9rem)
  - Live stats values (Comparisons, Swaps, Elapsed) coloured green (`--bar-found`) to distinguish them from static complexity values; section separated by a top border
  - No layout changes — panel width and structure unchanged

- **Phase 7: Real World Use Cases**: Added `realWorld` field to all 62 algorithm COMPLEXITY entries across 7 algorithm files (sorting, searching, trees, graphs, linked lists). Each entry now includes concrete real-world applications and examples. A new "Real World Use Cases" section in the info panel displays this information alongside "Best Used For" and "When to Avoid".

- **Phase 6 Complete**: All enhancement modules implemented and integrated

- **Challenge Mode**: Random sorting algorithm auto-play followed by a timed quiz (15 seconds per question). Accessible via the Challenge button in the controls bar. Tracks best scores per algorithm separately from regular quiz scores in localStorage.

- **Graph Node Dragging**: Drag-and-drop repositioning of graph nodes in node-edge view. Edges connected to the dragged node follow in real time. Uses SVG coordinate space conversion from mouse events.

- **Graph Export to JSON**: Export button (visible when a graph algorithm is selected) downloads the current graph structure as a JSON file containing nodes, edges, and adjacency list.

- **Custom Graph Builder**: Interactive graph editing with click-to-add nodes, click-click-to-add weighted edges, and right-click to delete. Previously listed as a todo item; confirmed already implemented in `main.js`.

- **User Guide**: Comprehensive end-user documentation at `docs/user-guide.md` covering all features, controls, enhancement modules, keyboard shortcuts, and usage tips.

- **README Overhaul**: Updated all algorithm counts (19 sorting, 8 searching, 10 tree, 7 graph, 14 linked list). Removed stale "Planned" annotations for linked lists. Added enhancement features, updated project structure, and updated architecture diagram to include event bus, enhancement modules, and feedback adapters.

- **Lessons Learned**: Added entries 28-32 covering Challenge Mode design, SVG coordinate conversion, renderer edge caching, JSON export patterns, and README maintenance.

### Technical Notes
- **Phase 5 Complete**: Feedback system with adapter pattern
- **Phase 4 Complete**: Polish, quality, and UX improvements

- **Dark/Light Theme Toggle**: `Light` / `Dark` button in second controls row; toggles `body.light` CSS class with smooth 0.2s transitions on all colour properties; preference persisted via `localStorage`

- **Custom Array Input**: Text field (e.g. `5,3,8,1,9`) with Apply button and Enter key support; visible only for sort/search algorithms; values clamped to [1, 200]; flashes green on success, red on invalid input

- **Mobile Responsive Layout**: Media query breakpoints at 1024px (tablet), 768px (mobile stacked panels), and 480px (compact); touch-friendly 36px min button heights; panels stack vertically on mobile with fixed heights for viz area

- **Algorithm Performance Benchmarking**: Benchmark button (visible for sort/search algorithms) opens a modal running 20 iterations across array sizes [10, 25, 50, 100]; displays min/avg/max timing table and CSS bar chart per size

- **Phase 2.4 Graph Representations**: Graph View selector (Graph / Matrix / Adj List / Both) visible when a graph algorithm is selected
  - Adjacency Matrix: weighted grid table with edge highlights
  - Adjacency List: per-node neighbour chain view
  - Both: 50/50 split panel showing matrix and list side by side
  - Interactive Graph Builder: Edit Graph toggle; click empty space to add node; click two nodes to add weighted edge; right-click node/edge to delete

- **Phase 2.5 Animated Tree Operations**: Tree nodes now animate between renders using CSS `transform: translate` transitions (420ms ease); new nodes fade in; removed nodes scale down and fade out before DOM removal; edges redraw instantly per render

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

- **Bug — Speed input field truncating 3-digit values**: `input[type="number"]` browser spinner arrows (up/down) consumed approximately 17px of the 44px field width, leaving only ~27px for text — enough to render two digits but clipping the third. Fixed by removing spinners via `-webkit-appearance: none` and `-moz-appearance: textfield` and widening the field to 48px. Applies to both Size and Speed inputs.

- **Bug — Bars completely gone after viz-wrapper restructure**: Applying `display: flex; flex-direction: column` to both `html` and `body` caused `body` to become a flex child of `html` without `flex: 1`, shrinking it to zero usable height. Fixed by splitting the rule: `html { height: 100% }` and `body { height: 100%; display: flex; flex-direction: column }`.

- **Bug — `height: 100%` not resolving on bars container**: `.viz-single` had `flex: 65; min-height: 0`, which does not give the browser a resolved pixel height for percentage-height children to inherit. Fixed with `flex: 1 1 0; height: 0` — the `height: 0` baseline lets flex expand it to a concrete pixel height that `.bars-container { height: 100% }` can resolve against.

- **Bug — `stateCells` ReferenceError before initialisation**: `let stateCells = []` was declared inside the IIFE near `initArrayState` (~line 980), but `clearArrayState()` called at `generateArray()` (~line 247) executed before the declaration was reached, triggering a Temporal Dead Zone `ReferenceError`. Fixed by moving the declaration to the top of the state variable block alongside `sortedIndices`.

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
