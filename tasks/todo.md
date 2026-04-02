# DSA Visualizer - Task Tracker

## Phase 1 - Core Application (Complete)

### 1.1 Project Setup
- [x] Project scaffolding (Vite + pnpm setup, directory structure)
- [x] Setup script with self-healing dependency installation
- [x] Docker and docker-compose multi-stage build
- [x] CLAUDE.md, README, and documentation

### 1.2 User Interface
- [x] 3-panel layout: Info (left) | Code (center) | Visualizer (right)
- [x] CSS styling (dark theme, bar animations, code highlighting)
- [x] Language tabs (Pseudo, Python, Java, C++, C, C#, JavaScript, TypeScript, Go, Rust)
- [x] Algorithm selector with sorting and searching groups
- [x] Array configuration controls (size, type, speed)
- [x] Landscape / Portrait layout toggle (9:16 column for YouTube Shorts)
- [x] Keyboard shortcuts (Space, Right Arrow, R, G)

### 1.3 Visualization Engine
- [x] Bar rendering with height-mapped values
- [x] Color states (comparing, swapping, sorted, found, searching, pivot)
- [x] Smooth transitions between states
- [x] Fisher-Yates shuffle for truly randomized starting arrays

### 1.4 Algorithm Implementations (8 Sorting + 3 Searching)
- [x] Bubble Sort
- [x] Selection Sort
- [x] Insertion Sort
- [x] Merge Sort
- [x] Quick Sort
- [x] Heap Sort
- [x] Shell Sort
- [x] Counting Sort
- [x] Linear Search
- [x] Binary Search
- [x] Jump Search

### 1.5 Code Display
- [x] Multi-language code snippets per algorithm (10 languages: Pseudo, Python, Java, C++, C, C#, JS, TS, Go, Rust)
- [x] Line-by-line highlight synchronized with visualization steps
- [x] Inline comments with step numbers (e.g., `# [3] Compare neighbors`)
- [x] Section spacing between logical code blocks
- [x] Comment vs code color differentiation (gray italic vs bright)
- [x] Python type hints on all Python snippets

### 1.6 Info Panel
- [x] Algorithm name, description (plain English), best use case, when to avoid
- [x] Time complexity table (best, average, worst)
- [x] Space complexity display
- [x] Live stats (comparisons, swaps, elapsed time)

### 1.7 Playback Controls
- [x] Play, Pause, Step, Reset (re-randomizes), Generate
- [x] Speed slider with exponential curve
- [x] Reset generates fresh randomized array

### 1.8 Audio
- [x] Sound effects via Web Audio API (compare, swap, complete, not found)
- [x] Sound toggle and volume controls

### 1.9 Compare Mode
- [x] Toggle button to enter/exit compare mode
- [x] Second algorithm dropdown
- [x] Split visualizer into two side-by-side panels
- [x] Both algorithms run on same starting array
- [x] Stats comparison table: name, time, comparisons, swaps, avg time, space

### 1.10 Reference
- [x] Collapsible DSA cheat sheet (bottom drawer)
- [x] Sorting table (name, best, avg, worst, space, stable) - all 8 algorithms
- [x] Searching table (name, best, avg, worst, needs) - all 3 algorithms
- [x] Key ideas quick reference

### 1.11 Recording
- [x] Built-in tab recording via MediaRecorder API
- [x] 6 quality presets (Shorts 720p/1080p/4K, Landscape 720p/1080p/4K)
- [x] Configurable bitrate and FPS per preset
- [x] Auto-downloads WebM file on stop
- [x] Captures audio (sound effects) when available
- [x] Record/Stop button with pulse animation

## Phase 2 - Trees, Graphs, and Linked Lists (Partial)

### 2.1 Tree Visualizations
- [x] BST insert and search
- [x] Tree traversals (in-order, pre-order, post-order, level-order)
- [x] Bug Fix #1: Generator return value handling - tree algorithms now properly re-render after completion
- [x] Bug Fix #2: Step object property variability - fixed undefined indices error in processStepStats
- [x] Added: countNodes() helper function for debugging
- [x] BST delete (with visualization for leaf, one-child, and two-child cases)
- [x] AVL Tree insert with self-balancing and rotation visualization
- [x] Heap (Min) insert and extract with visualization
- [x] Level-order (BFS) traversal

### 2.2 Linked List Visualizers

See [docs/linked-lists.md](../docs/linked-lists.md) for complete implementation guide.

- [x] Create linked list renderer (SVG-based, horizontal/vertical layouts)
- [x] Implement basic operations (insert at head, delete head, search, traverse, reverse)
- [x] Implement additional insert operations (at tail)
- [x] Implement additional delete operations (at tail)
- [x] Implement additional insert operations (at position)
- [x] Implement additional delete operations (at position, by value)
- [x] Integrate UI (position input control shown/hidden per algorithm)
- [x] Implement ambiguity for delete by value (80% picks existing value, 20% picks missing)
- [x] Test and verify all operations work correctly
- [x] Implement insert after value
- [x] Implement detect cycle (Floyd's algorithm)
- [x] Update cheat sheet with linked list complexity table
- [x] Implement merge sorted lists
- [x] Implement linked list Merge Sort (natural O(n log n) for linked lists)

### 2.3 Graph Visualizations
- [x] BFS (Breadth-First Search)
- [x] DFS (Depth-First Search)
- [x] Dijkstra's shortest path
- [x] A* pathfinding
- [x] Bellman-Ford shortest path
- [x] Kruskal's / Prim's minimum spanning tree
- [x] Topological sort

### 2.4 Graph Representations and Matrices
- [x] Adjacency matrix visualization (grid with weighted edges)
- [x] Adjacency list visualization (linked nodes)
- [x] Side-by-side matrix vs list comparison for same graph
- [x] Interactive graph builder (add/remove nodes and edges)

### 2.5 Tree/Graph Rendering
- [x] SVG node-and-edge renderer (tree-renderer.js, graph-renderer.js)
- [x] Step-by-step traversal highlighting
- [x] Weighted edge labels
- [x] Visited/unvisited/current node color states
- [x] Animated insert/delete/rebalance operations

## Phase 3 - Additional Algorithms

### 3.1 Practical Sorting
- [x] Gnome Sort
- [x] Cocktail Shaker Sort
- [x] Pancake Sort
- [x] Radix Sort
- [x] Bucket Sort
- [x] Tim Sort
- [x] Comb Sort
- [x] Odd-Even Sort

### 3.2 Fun / Meme Sorting
- [x] Bogo Sort (shuffles randomly until sorted)
- [x] Thanos Sort (removes half randomly until sorted)
- [x] Stalin Sort (removes elements that are out of order)
- [x] Sleep Sort (simulates value-proportional thread sleep, elements wake in sorted order)
- [x] Miracle Sort (checks if sorted, waits for cosmic rays; miracle strikes after 3 passes)

### 3.3 Additional Searching
- [x] Ternary Search
- [x] Fibonacci Search
- [x] Interpolation Search
- [x] Exponential Search
- [x] Sentinel Linear Search

## Phase 4 - Polish and Quality

### 4.1 User Experience
- [x] Mobile responsive layout improvements (breakpoints at 1024px, 768px, 480px)
- [x] Dark/light theme toggle (persisted via localStorage)
- [x] Custom array input (manual entry, Enter key support, validation feedback)
- [x] Landscape mode: all content visible without scrolling (header, controls, visualizer, info panel all fit in viewport)
- [x] Array State Panel: live numeric value + index cells below the visualizer, aligned with bars, with colour-coded states and swap animation; hidden for tree/graph/linked-list and list[int] mode
- [x] Manual value inputs for Size and Speed sliders (number field syncs with range slider bidirectionally)
- [x] Speed/Size input field: spinner arrows removed; field widened to 48px to correctly display 3-digit values

### 4.2 Quality
- [x] Unit tests for algorithm generators (Vitest — test files written, `pnpm add -D vitest` required to run)
- [x] End-to-end tests with Playwright
  - [x] Install and configure Playwright
  - [x] Create test utilities and helpers
  - [x] Test core UI controls (algorithm selection, size, speed, playback)
  - [x] Test sorting algorithm visualizations
  - [x] Test searching algorithm visualizations
  - [x] Test tree algorithm visualizations
  - [x] Test graph algorithm visualizations
  - [x] Test linked list algorithm visualizations
  - [x] Test advanced features (compare mode, keyboard shortcuts, sound)
  - [x] Test UI/UX (responsive layout, accessibility)
  - [x] Add to CI/CD pipeline
  - [x] Document in docs/e2e-testing.md
  - [x] Update lessons.md with patterns learned
- [x] CI/CD pipeline (build check + test step in .github/workflows/deploy.yml)

### 4.3 Export
- [x] Algorithm performance benchmarking (Benchmark button → modal with table + bar chart, 20 runs × 4 sizes)

## Phase 5 - User Feedback System

See [docs/feedback.md](../docs/feedback.md) for architecture, adapter pattern, and setup instructions.

### 5.1 Adapter Pattern Infrastructure
- [x] Create feature flag system (`src/static/js/config.js`)
- [x] Create feedback service interface (`src/static/js/feedback-service.js`)
- [x] Implement Supabase adapter (`src/static/js/adapters/supabase-adapter.js`)
- [x] Implement Firebase adapter as reference (`src/static/js/adapters/firebase-adapter.js`)
- [x] Document adapter interface contract (input/output types)

### 5.2 UI Component
- [x] Create feedback modal with rating, category, and message fields
- [x] Implement form validation (rating 1-5, category whitelist, message 10-1000 chars)
- [x] Add success/error toast notifications
- [x] Add client-side rate limiting (30s cooldown)
- [x] Add feedback button to header controls bar
- [x] Create CSS styles using existing theme variables
- [x] Wire up in main.js with feature flag gate

### 5.3 Configuration and Deployment
- [x] Update `.env.example` with Supabase and Firebase variables
- [x] Auto-hide feedback button when adapter is not configured
- [x] Add Supabase environment variables to Vercel project settings
- [x] Create Supabase project and feedback table with RLS policies

### 5.4 Testing and Documentation
- [x] E2E tests for feedback form submission
- [x] Unit tests for form validation logic
- [x] Document architecture and adapter switching in docs/feedback.md

## Phase 6 - User Experience Enhancements

See [docs/enhancements.md](../docs/enhancements.md) for complete architecture and implementation guide.

### 6.1 Event Bus Infrastructure
- [x] Create lightweight event emitter module (`src/static/js/event-bus.js`)
- [x] Identify emission points in main.js (algorithm start, step, complete, reset)
- [x] Document event types and payloads

### 6.2 Visual Polish Module
- [x] Create `src/static/js/enhancements/visual-polish.js`
- [x] Implement completion particle effects (confetti on algorithm finish)
- [x] Create additional color themes (Ocean, Forest, Sunset, Monochrome)
- [x] Add theme selector to settings panel
- [x] Persist theme preference to localStorage

### 6.3 Gamification Module
- [x] Create `src/static/js/enhancements/gamification.js`
- [x] Implement streak tracking (consecutive days of use)
- [x] Create achievement system:
  - [x] "First Sort" - Complete first sorting algorithm
  - [x] "Speed Demon" - Complete algorithm under 1 second
  - [x] "Perfectionist" - Complete all sorting algorithms
  - [x] "Explorer" - Try all algorithm categories
  - [x] "Comparator" - Use compare mode 10 times
  - [x] "Night Owl" - Use the app after midnight
  - [x] "Marathon" - Run 100 algorithms in one session
  - [x] "Quick Learner" - Complete 5 different algorithms in 5 minutes
- [x] Add achievement notification toast
- [x] Create achievements panel in UI
- [x] Persist progress to localStorage

### 6.4 Educational Module
- [x] Create `src/static/js/enhancements/educational.js`
- [x] Add quiz questions per algorithm (3-5 questions each)
- [x] Show quiz modal after algorithm completion (optional)
- [x] Track quiz scores per algorithm
- [x] Add "Challenge Mode" - random algorithm + quiz
- [x] Provide explanations for incorrect answers

### 6.5 Interactivity Module
- [x] Create `src/static/js/enhancements/interactivity.js`
- [x] Implement drag-and-drop bar reordering (for custom arrays)
- [x] Add undo/redo for interactive operations
- [x] Add node drag functionality for graphs/trees
- [x] Create custom graph builder with edge drawing (already implemented in main.js attachGraphEditHandlers)
- [x] Export custom configurations to JSON

### 6.6 Integration and Testing
- [x] Integrate all enhancement modules with event bus
- [x] Ensure modules can be disabled independently
- [x] Add feature flags for gradual rollout
- [x] Write E2E tests for each enhancement
- [x] Update README with enhancement features
- [x] Create user documentation for new features

## Phase 7 - Real World Use Cases

### 7.1 Real World Use Case Descriptions
- [x] Add `realWorld` field to all sorting algorithm COMPLEXITY entries (19 algorithms across sorting.js, sorting-extended.js, sorting-meme.js)
- [x] Add `realWorld` field to all searching algorithm COMPLEXITY entries (8 algorithms)
- [x] Add `realWorld` field to all tree algorithm COMPLEXITY entries (10 algorithms across 3 COMPLEXITY objects)
- [x] Add `realWorld` field to all graph algorithm COMPLEXITY entries (7 algorithms)
- [x] Add `realWorld` field to all linked list algorithm COMPLEXITY entries (14 algorithms)

### 7.2 UI Integration
- [x] Add "Real World Use Cases" section to info panel in index.html
- [x] Wire up `realWorld` field display in main.js loadAlgorithm()
- [x] Existing CSS classes handle styling (no additional CSS needed)

## Phase 8 - Interesting Algorithms (Maze & Grid Pathfinding)

Grid: 21x21 `number[][]` (0=WALL 1=PASSAGE 2=START 3=END 4=VISITED 5=EXPLORING 6=PATH 7=FRONTIER 8=CURRENT). Step objects: `{ type, row, col, codeLine }`.

### 8.1 Maze Generation Algorithms
- [x] `mazeRecursiveDFS` — Recursive Backtracker: iterative DFS stack, shuffle directions, carve/visit/backtrack steps, full 10-language CODE + COMPLEXITY
- [x] `mazePrims` — Prim's (randomised): random frontier set, carve/frontier steps, full 10-language CODE + COMPLEXITY
- [x] `mazeBinaryTree` — Binary Tree: for each odd cell carve N or E, visit/carve steps, full 10-language CODE + COMPLEXITY

### 8.2 Grid Pathfinding Algorithms
- [x] `pathBFS` — BFS on grid: queue, prev Map (string keys), visit/explore/found/path steps, full 10-language CODE + COMPLEXITY
- [x] `pathDFS` — DFS on grid: explicit stack, prev Map, visit/explore/found/path steps, full 10-language CODE + COMPLEXITY
- [x] `pathAStar` — A* (Manhattan heuristic): MinHeap, f=g+h, visit/explore/found/path steps, full 10-language CODE + COMPLEXITY
- [x] `pathGreedy` — Greedy Best-First: MinHeap sorted by h only, visit/explore/found/path steps, full 10-language CODE + COMPLEXITY

### 8.3 Renderer and Algorithm File
- [x] Create `src/static/js/maze-renderer.js` — canvas-based IIFE: `init`, `render`, `processStep`, `clearAllStates`; ResizeObserver; dark/light palettes; STEP_STATE_MAP; start/end persistent refresh
- [x] Create `src/static/js/algorithms/maze.js` — IIFE exporting CODE, COMPLEXITY, `buildMazeGrid`, and all 7 generator functions; MinHeap class inside IIFE for pathfinders

### 8.4 Integration
- [x] Add `<div class="maze-container compare-hidden" id="maze-container">` to `index.html` viz-single; add "Interesting" optgroup with 7 options to algorithm dropdown
- [x] Add `.maze-container` CSS rules to `main.css`
- [x] Add `maze.js` to `manualChunks.algorithms` in `vite.config.js`
- [x] Add imports, `MAZE_ALGORITHMS` array, `isMazeAlgorithm()`, `currentMaze` state, `mazeContainer` DOM ref, and `generateMaze()` helper to `main.js`
- [x] Update `switchVizMode()`, `initGenerator()`, `executeStep()`, `loadAlgorithm()` in `main.js` with maze branches
- [x] Update `initCotPanel()`: add `|| isMazeAlgorithm(algoKey)` to show CoT panel for maze algorithms
- [x] Update `initArrayState()`: add `&& !isMazeAlgorithm(algoKey)` to `isArrayAlgo` check to hide array state panel for maze
- [x] Add THOUGHTS entries for all 7 maze/path algorithms to the THOUGHTS object in `main.js`
- [x] Wire Generate button handler to call `generateMaze()` instead of `generateArray()` when a maze algorithm is selected

### 8.5 Verification
- [x] `pnpm build` passes with no errors
- [x] Maze generation: each of 3 algorithms animates cell-by-cell carving with CoT entries
- [x] Pathfinding: each of 4 algorithms explores and traces path on a completed maze
- [x] Switching from sort to maze: bars hidden, canvas shown
- [x] Generate on pathfinding algo: generates fresh maze (not array)
- [x] Pathfinding with no prior maze: fallback synchronous maze generated before pathfinder runs

## Phase 8 Bug Fixes

### BF-1: Maze generators produce checkerboard instead of valid maze
Root cause: `getMazeNeighbors` in `maze.js` (line 88) has no `grid` parameter and never filters for unvisited walls — the DFS re-visits already-carved cells forever, never carving corridor walls.
- [x] Fix `getMazeNeighbors` signature: add `grid` as first parameter; filter `grid[nr][nc] === WALL` (maze.js line 88)
- [x] Update call site in `mazeRecursiveDFS`: `getMazeNeighbors(grid, r, c, rows, cols)` (maze.js line 2033)

### BF-2: Pathfinding algorithms end immediately after first step
Root cause: Synchronous maze pre-generation loop in `main.js` uses `while (!gen.done)` — `gen.done` is never a property on a JS generator object (always `undefined`); `gen.value` is similarly `undefined`. Pathfinding receives an all-walls grid and finds no passable neighbors.
- [x] Fix sync loop in `generateMaze()` (main.js ~line 293): replace `while (!gen.done) gen.next(); currentMaze = gen.value;` with `let r = gen.next(); while (!r.done) r = gen.next(); currentMaze = r.value ?? currentMaze;`
- [x] Fix same sync loop in `initGenerator()` (main.js ~line 941-943)

### BF-3: Verification
- [x] DFS maze carves full corridors — no checkerboard
- [x] Prim's and Binary Tree also produce valid mazes
- [x] Pathfinding explores full maze and traces path to end
- [x] Pathfinding with no prior maze: fallback sync generation works correctly

### BF-4: Maze pathfinding ends immediately after reset/algorithm change
Root cause: `switchVizMode()` creates a fresh wall grid (all walls, only start/end passages) and assigns it to `currentMaze`. `initGenerator()` checks `if (!currentMaze)` which is false because the variable is a wall grid, not null. The pathfinder runs on the all-walls grid, finds no passable neighbors, and terminates immediately. Additionally, `reset()` unconditionally calls `generateArray()` even for maze algorithms, which further clobbers state.
- [x] Add `mazeReady` boolean flag to track whether `currentMaze` has been properly carved (main.js state declarations)
- [x] Set `mazeReady = true` in `generateMaze()` after maze is carved (main.js)
- [x] Set `mazeReady = false` in `generateArray()`, `switchVizMode()` when creating fresh wall grid (main.js)
- [x] Change `initGenerator()` guard from `if (!currentMaze)` to `if (!currentMaze || !mazeReady)` for pathfinding algorithms (main.js)
- [x] Set `mazeReady = true` after synchronous fallback maze generation in `initGenerator()` (main.js)
- [x] Fix `reset()` to call `generateMaze()` for maze algorithms instead of `generateArray()` (main.js)
- [x] `pnpm build` passes

### BF-5: Endpoint cell isolated -- maze generators cannot carve path to end
Root cause: `buildMazeGrid()` pre-marks both (1,1) and (rows-2, cols-2) as PASSAGE (1). The maze generators' neighbor filter (`getMazeNeighbors`) only returns cells where `grid[nr][nc] === WALL`. Since the endpoint is already a passage, no cell ever tries to carve a corridor toward it. The wall between the endpoint and its nearest neighbor remains intact, isolating the end cell. Pathfinders reach cells adjacent to the endpoint but cannot enter it, so they terminate without finding a path (or with trivially short searches).
- [x] Remove pre-marking of (1,1) and (rows-2, cols-2) in `buildMazeGrid()` -- all maze generators already mark (1,1) themselves, and the endpoint is carved naturally by the generator (maze.js)
- [x] Add `refreshStartEnd()` call at the end of `MazeRenderer.render()` so START/END markers appear on initial render (maze-renderer.js)
- [x] `pnpm build` passes

### BF-6: Greedy Best-First pathfinding ends after one step
Root cause: `pathGreedy` initialises `visited` with `['1,1']` (the start node). The lazy-deletion loop pops (1,1) from the heap, checks `visited.has(key)`, finds it already present, and skips it. The heap is now empty, so the loop terminates after yielding only the initial frontier step.
- [x] Remove `'1,1'` from the initial `visited` Set in `pathGreedy` -- the start node is correctly added to `visited` when popped from the heap (maze.js line 2281)
- [x] `pnpm build` passes
