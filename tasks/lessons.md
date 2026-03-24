# Lessons Learned

## Bug Fixes

### 1. Generator Return Value Handling for Tree Algorithms
- **Context**: Tree algorithms (BST Insert, Search, Traversals) were only yielding steps but not updating visualization after completion. The generator returned modified tree structure, but the return value was ignored.
- **Lesson**: Generators that mutate data structures (trees, graphs) must have their return values captured and used to update the visualization. Yielding steps only shows the process; the return value shows the final state.
- **Pattern**: When a generator completes (result.done === true), check result.value. If it contains updated state (e.g., new tree root, modified array), update the visualization immediately.
- **Rule**: For mutating algorithms, always capture and apply the generator's return value to the visualization state.

### 2. Step Object Property Variability Across Algorithm Types
- **Context**: `processStepStats()` function accessed `step.indices` without checking if it exists, causing "Cannot read properties of undefined (reading 'length')" error when running tree algorithms. Sorting/searching steps have `indices` array, but tree/graph steps use `nodeId` instead.
- **Lesson**: Different algorithm families can have different step object structures. Functions that process steps must be defensive and check for property existence before accessing it.
- **Pattern**: Use optional chaining (`step.indices && step.indices.length > 0`) or property existence checks before accessing nested properties. Update JSDoc comments to reflect optional properties.
- **Rule**: Before accessing step properties in shared utility functions, verify they exist for the current algorithm type. Type annotations should use `?` for optional properties (e.g., `indices?: number[]`).

## Planning and Development

### 3. Planning First for New Data Structure Types
- **Context**: Request to add linked list visualizers to complement existing trees and graphs. This is a substantial new feature requiring renderer, algorithms, UI integration, and testing.
- **Lesson**: Before implementing new data structure types, create a comprehensive specification covering all aspects: renderer design, algorithm list, step object structure, visual design, complexity requirements, UI integration, and success criteria. Store the specification in `docs/` directory.
- **Pattern**: Write detailed spec document in `docs/<structure>s.md` before writing any code. Include algorithm list, data structures, step object formats, visual design choices, CSS requirements, and file structure. Keep `tasks/todo.md` as a clean checklist of tasks only.
- **Rule**: For non-trivial new features (new data structures, major functionality), always plan first. Create spec file in `docs/`, add task checklist to `tasks/todo.md`, and record lessons learned in `tasks/lessons.md`.

### 4. Incremental Implementation of New Features
- **Context**: Started implementing linked list visualizers by creating renderer, algorithms, and basic operations, then integrating into main.js.
- **Lesson**: Build incrementally starting with the foundation (renderer and basic algorithms), then add complexity (multi-language code snippets), then integrate, and finally add advanced features. Test at each stage if possible.
- **Pattern**: For new data structure types: (1) Create renderer module first with basic rendering, (2) Add a few basic algorithm generators with simple step logic and code snippets in all 10 languages, (3) Integrate with main.js by adding imports, constants, state variables, and updating switchVizMode/initGenerator/executeStep functions, (4) Test end-to-end to ensure rendering works, (5) Add CSS for node states, (6) Add more algorithms incrementally, (7) Add ambiguity features after core works.
- **Rule**: Test renderer independently before integration. Ensure all basic algorithms (insert, delete, search, traverse) have full 10-language code snippets before considering it "complete" for that phase. Always update documentation (todo.md, changelog.md, lessons.md) after each milestone.

## Code Integration

### 5. Avoid Orphaned Temporary Files
- **Context**: During linked list advanced operations implementation, temporary files (linked-lists-advanced.js, linked-list-merge.js) were created but never integrated into the main codebase. This led to duplicate implementations and confusion.
- **Lesson**: When adding new functionality, integrate directly into existing files rather than creating temporary files. If temporary files are created during exploration, they must be cleaned up and integrated immediately.
- **Pattern**: Add new algorithm generators to the existing algorithms file (e.g., linked-lists.js), update the exports, update the main.js algorithm array, and ensure HTML dropdown has the option. Delete temporary files after integration.
- **Rule**: No orphaned files. Every new feature must be: (1) added to existing modules, (2) exported, (3) registered in main.js, (4) added to UI, (5) documented. Delete temp files immediately after integration.

### 6. Complete CODE and COMPLEXITY Entries Before Integration
- **Context**: llInsertAfterValue and llDetectCycle had partial implementations - generator functions existed but CODE snippets and COMPLEXITY entries were missing, causing incomplete info panel display.
- **Lesson**: An algorithm is not complete until it has: (1) Generator function, (2) CODE snippets in all 10 languages, (3) COMPLEXITY entry with best/avg/worst/space, (4) UI dropdown option, (5) Handler in main.js. All five must be present before marking complete.
- **Pattern**: When adding a new algorithm, follow the checklist: Generator -> CODE (10 langs) -> COMPLEXITY -> HTML option -> main.js handler -> test -> mark complete.
- **Rule**: Use the 5-point checklist for every new algorithm. Do not mark a task complete in todo.md until all 5 points are verified working.

## Algorithm Routing and Display

### 9. Algorithm Key Prefix Matching Is Fragile
- **What happened**: `algoKey.startsWith('heap')` was used to route heap tree operations, but it also matched `heapSort` (a sorting algorithm). Heap Sort ended up looking for its code in `TreeAlgorithms.HEAP_CODE`, found nothing, and showed an empty panel.
- **Rule**: Never use prefix matching (`startsWith`) to classify algorithm keys when two different algorithm families share a prefix. Use explicit key sets (`TREE_ALGORITHMS.includes(key)`) or exact checks (`key === 'heapInsertMin' || key === 'heapExtractMin'`).

### 10. Every Algorithm Family Needs an Explicit Branch in loadAlgorithm
- **What happened**: Linked list algorithms had no branch in `loadAlgorithm()`'s `codeSource` / `complexitySource` logic. They fell through to `SortingAlgorithms.CODE`, which has no linked list keys, so code, description, and complexity all showed nothing.
- **Rule**: When adding a new algorithm family, update every dispatch table in `main.js` that routes by algorithm type: `loadAlgorithm()` (code/complexity source), `switchVizMode()` (container visibility), `reset()` (state rebuild), `initGenerator()` (generator construction), and `executeStep()` (step processing). Missing any one of these leaves the feature partially broken.

### 11. Generator Return Values Must Be Type-Checked Before Assigning to State
- **What happened**: `llDetectCycle` returns `true`/`false`. The `result.done` handler blindly assigned this to `currentLinkedList`, causing `LinkedListRenderer.render(false)` to show "Empty List".
- **Rule**: Before assigning a generator's return value to a data-structure state variable, check that it is actually the expected type (e.g., `typeof updatedValue === 'object' && updatedValue !== null`). Algorithms that only query structure (search, detect cycle) return a result value, not a mutated structure.

### 12. SVG viewBox Must Cover Full Node Bounds, Not Just Origins
- **What happened**: The linked list SVG viewBox width was calculated from node top-left positions. The rightmost node's right edge (`x + NODE_WIDTH`) was outside the viewBox, clipping it.
- **Rule**: When calculating an SVG viewBox from a collection of positioned rectangles, always add `NODE_WIDTH` and `NODE_HEIGHT` to the bounding box so the full extent of every node is visible, not just its origin point.

## Architecture and File Organisation

### 13. Split Large Algorithm Files Before They Grow Further
- **What happened**: `sorting.js` reached 6,400 lines after Phase 3.1 additions. Navigating it became painful and adding more algorithms would make it worse.
- **Rule**: When an algorithm file exceeds ~2,500–3,000 lines, split it by category. Keep a thin aggregator (e.g., `sorting.js`) that imports sub-modules and re-exports a merged object — this means `main.js` never needs to change. Natural split boundaries: core/classic, extended/practical, meme/novelty.
- **How to apply**: The aggregator pattern: `export default { CODE: { ...CoreCODE, ...ExtCODE }, COMPLEXITY: { ...CoreCOMPLEXITY, ...ExtCOMPLEXITY }, ...coreGenerators, ...extGenerators }` keeps the public API identical.

## CI/CD and Build Verification

### 7. Always Verify Build Before Committing
- **Context**: After adding multiple features (A*, Bellman-Ford, Kruskal's, Topological Sort, linked list operations), the build failed due to an orphaned import in main.js and a malformed CODE block in sorting.js.
- **Lesson**: Always run `pnpm build` before marking work complete. The dev server (`pnpm dev`) can mask some issues that will fail in production builds.
- **Pattern**: After implementing new features: (1) Run `node --check` on modified files, (2) Run `pnpm build` to verify production build, (3) Run `pnpm dev` to test interactively, (4) Only then mark tasks complete.
- **Rule**: `pnpm build` must pass before any commit. This ensures CI/CD pipelines will pass.

### 8. Clean Up Orphaned Imports Immediately
- **Context**: An import for `LinkedListMerge` from a non-existent file `./algorithms/linked-list-merge.js` was left in main.js after integration work, causing build failures.
- **Lesson**: When integrating features from temporary files, remove all references to those files immediately after integration. Check all import statements.
- **Pattern**: After integrating code from a temp file: (1) Verify the import is removed, (2) Search for any remaining references to the temp file, (3) Delete the temp file, (4) Run build to verify.
- **Rule**: Never leave imports to non-existent files. Use `grep -r "filename" src/` to find all references before deleting temp files.
