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

## End-to-End Testing with Playwright

### 14. Verify HTML Selectors Before Writing E2E Tests
- **What happened**: E2E tests failed because selectors like `#visualizer-container`, `#play-btn`, and `.language-tab` didn't exist in the HTML. The actual IDs were `#viz-panel`, `#btn-play`, and `.lang-tab`.
- **Rule**: Always inspect the actual HTML structure before writing E2E tests. Use `grep -n "id=" index.html` to find element IDs, and verify class names match the implementation. Test one simple case first to validate selectors before writing comprehensive tests.
- **How to apply**: Run a single basic test (`should load the page successfully`) first. If it passes, incrementally add more tests. Fix selector issues immediately when found rather than continuing to write tests with wrong selectors.

### 15. Playwright webServer Configuration Must Match Dev Server Port
- **What happened**: Playwright tests timed out waiting for the dev server because `baseURL` was set to port 5173 but Vite was configured to use port 3000. When ports 3000 and 3001 were already in use, Vite picked 3002, causing all tests to fail.
- **Rule**: Ensure `playwright.config.js` baseURL and webServer URL match the Vite configured port. Use `reuseExistingServer: !process.env.CI` to allow reusing a running server in development but start fresh in CI.
- **How to apply**: Check `vite.config.js` server.port setting. Update `playwright.config.js` baseURL and webServer.url to match. Kill conflicting processes or configure Vite with `strictPort: true` if needed.

### 16. Duplicate Function Declarations Cause Syntax Errors
- **What happened**: After editing test utilities multiple times, `enterCompareMode` and `exitCompareMode` functions were declared twice, causing a syntax error that prevented all tests from running.
- **Rule**: When editing files incrementally, check for duplicate declarations before running tests. Use `grep -n "export async function functionName"` to verify uniqueness.
- **How to apply**: After multiple edits to a file, scan for duplicate function names. Remove duplicates immediately. Run a simple syntax check (`node --check file.js`) before running tests.

### 17. Test Utilities Should Reflect Actual UI Behavior
- **What happened**: The `getStatistics()` utility parsed `#stats-container` text with regex, but the actual stats are in separate elements like `#comparisons-count`, `#swaps-count`, and `#elapsed-time`.
- **Rule**: Test utilities should query actual DOM elements directly rather than parsing text content with regex, unless the text format is guaranteed stable. Check the HTML to find the right selectors.
- **How to apply**: Inspect the HTML to find the actual element IDs for dynamic content. Update test utilities to use `page.textContent('#element-id')` instead of parsing parent container text. This makes tests more robust and readable.

### 18. Some UI Changes Require Explicit User Action
- **What happened**: Changing the array size input doesn't immediately regenerate the bars. The test expected bars to update immediately, but they stayed at the old size.
- **Rule**: When testing UI controls that require a secondary action (like Generate button after size change), include that action in the test. Don't assume UI will auto-update.
- **How to apply**: For size/distribution/speed changes, call `clickGenerate(page)` after setting the value. Verify the change took effect by checking the actual result (bar count, etc.) rather than assuming immediate update.

### 19. Organize E2E Tests by Feature Category
- **Context**: E2E tests were organized into separate files by algorithm type (sorting, searching, trees, graphs, linked lists) and feature (core functionality, advanced features).
- **Lesson**: Organizing tests by feature category makes them easier to maintain, debug, and run selectively. Each test file focuses on a specific domain.
- **Pattern**: Create separate test files for: (1) Core UI functionality, (2) Each algorithm family, (3) Advanced features (compare mode, keyboard shortcuts, etc.). Use shared test utilities to avoid duplication.
- **Rule**: One test file per major feature area. Group related tests with `test.describe()`. Extract common operations into test utilities.

### 20. Test Utilities Enable Consistent Test Patterns
- **Context**: Test utilities like `waitForVisualizerReady`, `selectAlgorithm`, and `clickPlay` provide a consistent API for interacting with the application.
- **Lesson**: Test utilities encapsulate implementation details (selectors, waits, error handling), making tests more readable and maintainable. When selectors change, only utilities need updating.
- **Pattern**: Create utility functions for: (1) Page initialization, (2) Common UI interactions, (3) Waiting for states, (4) Reading results. Export them from a single test-utils.js file.
- **Rule**: Every repeated interaction pattern should be a utility function. Tests should read like user stories, not implementation details.

## Backend Integration for Static SPAs

### 21. Prefer BaaS Over Self-Hosted for Simple Features
- **Context**: Adding a feedback feature to a static SPA that currently has no backend. Options include Supabase, Firebase, self-hosted PostgreSQL, or serverless functions.
- **Lesson**: For simple features (feedback submission, analytics, user preferences) in static SPAs, Backend-as-a-Service (BaaS) platforms like Supabase or Firebase are preferable to self-hosted solutions. They eliminate the need for API routes, authentication infrastructure, and server maintenance.
- **Pattern**: Evaluate feature requirements against BaaS capabilities. If the feature needs only CRUD operations without complex business logic, BaaS is the right choice. Self-host only when: (1) data sovereignty is required, (2) complex server-side processing is needed, or (3) cost at scale favors owned infrastructure.
- **Rule**: Default to BaaS (Supabase for SQL, Firebase for NoSQL) for new features in static SPAs. Self-host only when BaaS cannot meet requirements.

## Enhancement Module Architecture

### 22. Use Event Bus for Loosely Coupled Enhancement Modules
- **Context**: Adding visual polish, gamification, educational, and interactivity enhancements to a mature application with working core functionality. Need to add features without risking existing behavior.
- **Lesson**: Enhancement modules should be completely decoupled from core application logic. An event bus pattern allows modules to subscribe to lifecycle events without modifying core code. This makes enhancements optional, swappable, and safe to disable.
- **Pattern**: Core application emits events at key lifecycle points (`algorithm:start`, `algorithm:step`, `algorithm:complete`, `algorithm:reset`). Enhancement modules import the event bus and subscribe to relevant events. Modules maintain their own state and localStorage persistence. No enhancement module imports from or depends on other enhancement modules.
- **Rule**: Enhancement modules must: (1) only subscribe to events, never emit control events, (2) maintain independent state, (3) be completely removable without breaking the app, (4) be feature-flaggable for gradual rollout.

### 23. Design for Replaceability from the Start
- **Context**: Enhancement features (gamification, themes, quizzes) may have better implementations available in the future, or may be replaced with third-party services.
- **Lesson**: Build enhancement modules as thin wrappers around core functionality, with clear interfaces. This allows swapping implementations without touching the integration points. A gamification module should define clear methods (`init`, `onComplete`, `getAchievements`) that any implementation must satisfy.
- **Pattern**: Define a module interface with required methods. The implementation can be swapped by changing only the module file. Event payloads should be versioned and documented to allow future consumers to handle changes gracefully.
- **Rule**: Every enhancement module must have a documented interface. If replacing the module requires changes outside its file, the module is too tightly coupled.

### 24. Feature Flags Enable Gradual Rollout and Safe Rollback
- **Context**: New enhancement features may have bugs, performance issues, or negative user feedback. Need ability to disable without code changes or redeployment.
- **Lesson**: All enhancement modules should be feature-flagged from the start. Flags can be stored in a config file, URL parameters, or remote feature flag service. This enables: (1) developing features in production without user exposure, (2) gradual rollout to percentage of users, (3) instant rollback if issues detected.
- **Pattern**: Create a `config.js` with `FEATURES` object mapping feature names to boolean or rollout percentage. Wrap module initialization in feature flag check. Consider URL override for testing (`?features=gamification,visual-polish`).
- **Rule**: No enhancement module initializes without a feature flag. The flag check happens before import/initialization, not inside the module.

## Adapter Pattern for Backend Services

### 25. Decouple UI from Storage via Adapter Interface
- **Context**: Adding a feedback system with Supabase, but wanting the option to switch to Firebase or a custom backend without rewriting code.
- **Lesson**: Use an adapter pattern where the UI layer talks to a service interface, and the service delegates to a swappable adapter. The UI never imports or knows about the specific backend. Switching backends means changing one import and one assignment in the service file.
- **Pattern**: Define a service module (`feedback-service.js`) that imports one adapter and exposes `submit()`, `isReady()`, `getName()`. Each adapter (`adapters/supabase-adapter.js`, `adapters/firebase-adapter.js`) implements the same three methods. The UI imports only the service, never the adapter.
- **Rule**: The UI layer must never import an adapter directly. All backend communication goes through the service module. Each adapter must be a single file that can be swapped by changing one import line in the service.

### 26. Use Native fetch Over SDKs for Simple CRUD Operations
- **Context**: Implementing Supabase and Firebase adapters for a simple feedback insert operation. The official SDKs would add 40-100KB to the bundle.
- **Lesson**: For simple REST API calls (insert a row, read a document), the native `fetch` API is sufficient. SDKs are warranted when you need real-time subscriptions, authentication flows, or complex queries. A single `POST` request with the correct headers is all that is needed for anonymous feedback submission.
- **Pattern**: Use `fetch` with the provider's REST API. Supabase: `POST /rest/v1/{table}` with `apikey` and `Authorization` headers. Firebase: `POST /v1/projects/{id}/databases/(default)/documents/{collection}` with `key` header.
- **Rule**: Before adding a third-party SDK, check if the native `fetch` API can accomplish the same task with comparable effort. Only reach for SDKs when the complexity justifies the bundle size increase.

### 27. Auto-Hide Features When Configuration Is Missing
- **Context**: The feedback module should not show a broken button when Supabase credentials are not configured (e.g., during local development or before initial setup).
- **Lesson**: Features that depend on external services should gracefully degrade. If the adapter reports `isReady() === false`, hide the feature's entry point (button, menu item) entirely. This is preferable to showing a button that errors on click or showing a "not configured" message.
- **Pattern**: In the module's `init()`, call `adapter.isReady()`. If false, find the UI trigger element and set `display: none`. Combined with the feature flag, this creates two gates: the feature flag controls whether the module loads, and `isReady()` controls whether it is visible.
- **Rule**: Any feature that requires external credentials must check `isReady()` during initialization and hide its UI entry point if not configured. Never show a button that leads to an expected failure.
