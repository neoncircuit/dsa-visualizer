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
