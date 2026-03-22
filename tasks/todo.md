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
- [x] Both algorithms run on the same starting array
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

## Phase 2 - Trees and Graphs (Partial)

### 2.1 Tree Visualizations
- [x] BST insert and search
- [x] Tree traversals (in-order, pre-order, post-order)
- [ ] BST delete
- [ ] AVL Tree rotations and balancing
- [ ] Heap (Min/Max) insert and extract
- [ ] Level-order traversal

### 2.2 Graph Visualizations
- [x] BFS (Breadth-First Search)
- [x] DFS (Depth-First Search)
- [x] Dijkstra's shortest path
- [ ] A* pathfinding
- [ ] Bellman-Ford shortest path
- [ ] Kruskal's / Prim's minimum spanning tree
- [ ] Topological sort

### 2.3 Graph Representations and Matrices
- [ ] Adjacency matrix visualization (grid with weighted edges)
- [ ] Adjacency list visualization (linked nodes)
- [ ] Side-by-side matrix vs list comparison for the same graph
- [ ] Interactive graph builder (add/remove nodes and edges)

### 2.4 Tree/Graph Rendering
- [x] SVG node-and-edge renderer (tree-renderer.js, graph-renderer.js)
- [x] Step-by-step traversal highlighting
- [x] Weighted edge labels
- [x] Visited/unvisited/current node color states
- [ ] Animated insert/delete/rebalance operations

## Phase 3 - Additional Algorithms

### 3.1 Practical Sorting
- [x] Gnome Sort
- [x] Cocktail Shaker Sort
- [x] Pancake Sort
- [ ] Radix Sort
- [ ] Bucket Sort
- [ ] Tim Sort
- [ ] Comb Sort
- [ ] Odd-Even Sort

### 3.2 Fun / Meme Sorting
- [x] Bogo Sort (shuffles randomly until sorted)
- [x] Thanos Sort (removes half randomly until sorted)
- [x] Stalin Sort (removes elements that are out of order)
- [ ] Sleep Sort (uses time delays to sort)
- [ ] Miracle Sort (checks if sorted, otherwise waits and hopes)

### 3.3 Additional Searching
- [x] Ternary Search
- [x] Fibonacci Search
- [ ] Interpolation Search
- [ ] Exponential Search
- [ ] Sentinel Linear Search

## Phase 4 - Polish and Quality

### 4.1 User Experience
- [ ] Mobile responsive layout improvements
- [ ] Dark/light theme toggle
- [ ] Custom array input (manual entry)

### 4.2 Quality
- [ ] Unit tests for algorithm generators
- [ ] End-to-end tests with Playwright
- [ ] CI/CD pipeline (lint, test, build, deploy)

### 4.3 Export
- [ ] Algorithm performance benchmarking (run N times, show average)
